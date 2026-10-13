import { useEffect, useState } from "react";

/**
 * Live community events from external sources, normalized to one shape.
 *
 * Sources today: La Crypta CRM public API
 *   GET https://crm.lacrypta.ar/api/public/organizations/{org}/events?period=upcoming&limit=3..24
 * The CRM sends no CORS headers, so the browser calls a same-origin proxy (`/api/crm/{org}/events`),
 * configured in vite.config.ts (dev/preview), vercel.json and public/_redirects (Netlify).
 */

export interface CommunityEvent {
  id: string;
  /** Community id from src/data/communities.ts */
  communityId: string;
  title: string;
  /** Plain-text excerpt (source descriptions are markdown) */
  excerpt?: string;
  start: Date;
  /** IANA zone the event happens in; use it to display local time */
  timeZone: string;
  location?: string;
  image?: string;
  /** Public page with details / registration */
  url: string;
  price?: { amount: number; currency: string };
}

interface CrmSource {
  /** Organization slug in the CRM */
  org: string;
  communityId: string;
  timeZone: string;
}

const CRM_ORIGIN = "https://crm.lacrypta.ar";

// Add an org here to pull its events (it must exist in the CRM with public events).
const CRM_SOURCES: CrmSource[] = [{ org: "la-crypta", communityId: "la-crypta", timeZone: "America/Argentina/Buenos_Aires" }];

interface CrmEvent {
  id?: unknown;
  slug?: unknown;
  name?: unknown;
  description?: unknown;
  date?: unknown;
  location?: unknown;
  image_url?: unknown;
  price_currency?: unknown;
  min_price_amount?: unknown;
}

const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : undefined);

/** Markdown → short plain text (rendered as text, never as HTML). */
function excerpt(md: string | undefined, max = 180) {
  if (!md) return undefined;
  const text = md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? `${text.slice(0, max).replace(/\s+\S*$/, "")}…` : text;
}

/** External data is untrusted: keep only well-formed events, https images (no multi-MB data: URIs). */
function normalize(e: CrmEvent, src: CrmSource): CommunityEvent | null {
  const id = str(e.id);
  const slug = str(e.slug);
  const title = str(e.name);
  const start = typeof e.date === "string" ? new Date(e.date) : null;
  if (!id || !slug || !title || !start || Number.isNaN(start.getTime())) return null;
  const image = str(e.image_url);
  const amount = typeof e.min_price_amount === "number" ? e.min_price_amount : undefined;
  return {
    id: `crm:${src.org}:${id}`,
    communityId: src.communityId,
    title,
    excerpt: excerpt(str(e.description)),
    start,
    timeZone: src.timeZone,
    location: str(e.location),
    image: image?.startsWith("https://") ? image : undefined,
    url: `${CRM_ORIGIN}/o/${encodeURIComponent(src.org)}/events/${encodeURIComponent(slug)}`,
    price: amount !== undefined ? { amount, currency: str(e.price_currency) ?? "sats" } : undefined,
  };
}

async function fetchCrmUpcoming(src: CrmSource): Promise<CommunityEvent[]> {
  const res = await fetch(`/api/crm/${encodeURIComponent(src.org)}/events?period=upcoming&limit=24`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`CRM ${src.org}: HTTP ${res.status}`);
  const body: unknown = await res.json();
  const list = (body as { events?: unknown })?.events;
  if (!Array.isArray(list)) throw new Error(`CRM ${src.org}: unexpected response`);
  return list.map((e) => normalize(e as CrmEvent, src)).filter((e): e is CommunityEvent => e !== null);
}

export type EventsState =
  | { status: "loading"; events: CommunityEvent[] }
  | { status: "ready"; events: CommunityEvent[] }
  | { status: "error"; events: CommunityEvent[] };

// One request per page load, shared by every component that needs events.
let cache: Promise<{ events: CommunityEvent[]; failed: boolean }> | null = null;

function loadAll() {
  cache ??= Promise.allSettled(CRM_SOURCES.map(fetchCrmUpcoming)).then((results) => {
    const events = results
      .flatMap((r) => (r.status === "fulfilled" ? r.value : []))
      .filter((e) => e.start.getTime() > Date.now() - 6 * 3600_000) // drop events that already ended
      .sort((a, b) => a.start.getTime() - b.start.getTime());
    // A partial failure still shows what loaded; only report an error if nothing came back.
    return { events, failed: events.length === 0 && results.some((r) => r.status === "rejected") };
  });
  return cache;
}

/** Upcoming events from all sources (optionally only one community's). */
export function useCommunityEvents(communityId?: string): EventsState {
  const [state, setState] = useState<EventsState>({ status: "loading", events: [] });

  useEffect(() => {
    // Prerender (headless) has no proxy: keep the loading state instead of baking an error into HTML.
    if (navigator.webdriver) return;
    let alive = true;
    loadAll().then(
      ({ events, failed }) => {
        if (!alive) return;
        const scoped = communityId ? events.filter((e) => e.communityId === communityId) : events;
        setState({ status: failed ? "error" : "ready", events: scoped });
      },
      () => alive && setState({ status: "error", events: [] })
    );
    return () => {
      alive = false;
    };
  }, [communityId]);

  return state;
}

/** Communities that publish events through a source (used for filters / CTAs). */
export const eventSourceCommunityIds = CRM_SOURCES.map((s) => s.communityId);

// ---------- Formatting (always in the event's own time zone) ----------

const fmtCache = new Map<string, Intl.DateTimeFormat>();
function fmt(timeZone: string, opts: Intl.DateTimeFormatOptions) {
  const key = timeZone + JSON.stringify(opts);
  let f = fmtCache.get(key);
  if (!f) fmtCache.set(key, (f = new Intl.DateTimeFormat("es-AR", { timeZone, ...opts })));
  return f;
}

export const eventDay = (e: CommunityEvent) => fmt(e.timeZone, { day: "2-digit" }).format(e.start);
export const eventMonthShort = (e: CommunityEvent) =>
  fmt(e.timeZone, { month: "short" }).format(e.start).replace(".", "");
export const eventWeekday = (e: CommunityEvent) => fmt(e.timeZone, { weekday: "long" }).format(e.start);
export const eventMonthYear = (e: CommunityEvent) => fmt(e.timeZone, { month: "long", year: "numeric" }).format(e.start);
export const eventTime = (e: CommunityEvent) =>
  `${fmt(e.timeZone, { hour: "2-digit", minute: "2-digit", hour12: false }).format(e.start)} hs`;
export const eventLongDate = (e: CommunityEvent) =>
  fmt(e.timeZone, { weekday: "long", day: "numeric", month: "long" }).format(e.start);

export function priceLabel(p: CommunityEvent["price"]) {
  if (!p) return undefined;
  if (p.amount === 0) return "Gratis";
  const n = p.amount.toLocaleString("es-AR");
  return p.currency.toLowerCase() === "sats" ? `${n} sats` : `${n} ${p.currency.toUpperCase()}`;
}
