import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowUpRight, CalendarDays, ExternalLink, List, Map as MapIcon } from "lucide-react";
import SEOHead from "../components/seo/SEOHead";
import PageHero from "../components/layout/PageHero";
import { CommunityAvatar } from "../components/cards/CommunityCard";
import { EventRow } from "../components/cards/EventCard";
import CommunityMap, { type MapPoint } from "../components/map/CommunityMap";
import { AnimatedCounter } from "../components/motion";
import { CalendarProvider } from "../calendar/contexts/calendar-context";
import CalendarContainer from "../calendar/components/calendar-container";
import { getCommunityById } from "../data/communities";
import { eventMonthYear, eventTime, useCommunityEvents, type CommunityEvent } from "../services/communityEvents";
import { cn } from "@/lib/utils";

type View = "agenda" | "calendario" | "mapa";

const CONTACT_URL = "https://tally.so/r/mOv75R";
const ease = [0.22, 1, 0.36, 1] as const;

const views: { id: View; label: string; icon: React.ReactNode }[] = [
  { id: "agenda", label: "Agenda", icon: <List className='h-4 w-4' /> },
  { id: "calendario", label: "Calendario", icon: <CalendarDays className='h-4 w-4' /> },
  { id: "mapa", label: "Mapa", icon: <MapIcon className='h-4 w-4' /> },
];

/** Big centered panel for empty / error states. */
const Notice: React.FC<{
  icon: React.ReactNode;
  eyebrow: string;
  title: React.ReactNode;
  text: string;
  children?: React.ReactNode;
}> = ({ icon, eyebrow, title, text, children }) => (
  <div className='relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] px-6 py-20 text-center md:py-24'>
    <div aria-hidden='true' className='grid-lines absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]' />
    <div aria-hidden='true' className='absolute -top-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(247,147,26,0.2),transparent)]' />
    <div className='relative'>
      <div className='mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-bitcoin/30 bg-bitcoin/10 text-bitcoin shadow-glow'>
        {icon}
      </div>
      <div className='eyebrow mb-6'>{eyebrow}</div>
      <h2 className='display mx-auto max-w-3xl text-4xl text-white md:text-6xl'>{title}</h2>
      <p className='mx-auto mt-5 max-w-xl text-lg text-gray-400'>{text}</p>
      {children && <div className='mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row'>{children}</div>}
    </div>
  </div>
);

const Skeleton = () => (
  <div className='space-y-4' aria-busy='true' aria-label='Cargando eventos'>
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className='surface grid grid-cols-1 animate-pulse gap-5 p-3 md:grid-cols-[5rem_14rem_1fr] md:items-center md:gap-6 md:p-4 lg:grid-cols-[6rem_18rem_1fr]'
      >
        <div className='mx-auto hidden h-16 w-14 rounded-xl bg-white/[0.06] md:block' />
        <div className='aspect-[16/9] rounded-2xl bg-white/[0.06] md:aspect-[4/3]' />
        <div className='space-y-3 px-2 pb-2 md:p-0'>
          <div className='h-4 w-32 rounded-full bg-white/[0.06]' />
          <div className='h-7 w-3/4 rounded-lg bg-white/[0.08]' />
          <div className='h-4 w-1/2 rounded-full bg-white/[0.06]' />
        </div>
      </div>
    ))}
  </div>
);

const MeetupsPage: React.FC = () => {
  const { status, events } = useCommunityEvents();
  const [community, setCommunity] = useState<string>("");
  const [view, setView] = useState<View>("agenda");

  // Communities that actually have upcoming events, for the filter chips.
  const communityIds = useMemo(() => [...new Set(events.map((e) => e.communityId))], [events]);
  const filtered = useMemo(
    () => (community ? events.filter((e) => e.communityId === community) : events),
    [events, community]
  );

  const months = useMemo(() => {
    const map = new Map<string, CommunityEvent[]>();
    filtered.forEach((e) => {
      const key = eventMonthYear(e);
      map.set(key, [...(map.get(key) ?? []), e]);
    });
    return [...map.entries()];
  }, [filtered]);

  // Events happen at their community's venue (the CRM has no coordinates): one marker per community.
  const points: MapPoint[] = communityIds
    .filter((id) => !community || id === community)
    .flatMap((id) => {
      const c = getCommunityById(id);
      if (!c) return [];
      const n = filtered.filter((e) => e.communityId === id).length;
      return [
        {
          id: c.id,
          lat: c.latitude,
          lng: c.longitude,
          title: c.title,
          subtitle: `${n} evento${n !== 1 ? "s" : ""} próximo${n !== 1 ? "s" : ""}`,
          image: c.avatarImage,
          href: `/community/${c.id}`,
        },
      ];
    });

  const calendarEvents = filtered.map((e) => ({
    id: e.id,
    title: e.title,
    description: e.excerpt ?? "",
    startDate: e.start.toISOString(),
    endDate: new Date(e.start.getTime() + 2 * 3600_000).toISOString(),
    color: "orange" as const,
    user: { id: e.communityId, name: getCommunityById(e.communityId)?.title ?? e.communityId },
    url: e.url,
    image: e.image,
    location: e.location,
    timeLabel: eventTime(e),
  }));

  return (
    <>
      <SEOHead
        title='Meetups Bitcoin en Latinoamérica · Veintiuno'
        description='Encontrá meetups y eventos Bitcoin en toda Latinoamérica. Calendario actualizado de encuentros bitcoiners en Argentina, México, Chile y más.'
        keywords={[
          "meetups bitcoin",
          "eventos bitcoin",
          "bitcoin latinoamerica",
          "meetup bitcoin argentina",
          "calendario bitcoin",
          "veintiuno",
        ]}
        url='/meetups'
      />

      <PageHero
        badge='Eventos · LATAM'
        title='Meetups Bitcoin'
        subtitle='Encuentros, talleres y fiestas de las comunidades bitcoiner de Latinoamérica, en vivo desde sus propias agendas.'
        image='/images/layout-images/meetup-bg.png'
        stats={
          status === "ready" && events.length
            ? [
                { value: <AnimatedCounter to={events.length} />, label: "Próximos" },
                {
                  value: <AnimatedCounter to={communityIds.length} />,
                  label: communityIds.length === 1 ? "Comunidad" : "Comunidades",
                },
              ]
            : undefined
        }
      >
        <a href='#agenda' className='btn btn-md btn-primary'>
          Ver agenda
        </a>
        <a href={CONTACT_URL} target='_blank' rel='noopener noreferrer' className='btn btn-md btn-secondary'>
          Sumá tu agenda <ExternalLink className='h-4 w-4' />
        </a>
      </PageHero>

      <section id='agenda' className='relative scroll-mt-24 pb-24 md:pb-32'>
        <div className='mx-auto max-w-7xl px-5 md:px-8'>
          {status === "loading" ? (
            <Skeleton />
          ) : status === "error" ? (
            <Notice
              icon={<AlertTriangle className='h-7 w-7' />}
              eyebrow='Sin conexión'
              title={
                <>
                  No pudimos cargar <span className='text-gradient'>la agenda</span>
                </>
              }
              text='La fuente de eventos no respondió. Probá de nuevo en un rato o mirá la agenda directamente en el sitio de la comunidad.'
            >
              <a href='https://crm.lacrypta.ar/o/la-crypta' target='_blank' rel='noopener noreferrer' className='btn btn-md btn-primary'>
                Agenda de La Crypta <ExternalLink className='h-4 w-4' />
              </a>
            </Notice>
          ) : events.length === 0 ? (
            <Notice
              icon={<CalendarDays className='h-7 w-7' />}
              eyebrow='Agenda'
              title={
                <>
                  Sin eventos <span className='text-gradient'>próximos</span>
                </>
              }
              text='Por ahora no hay eventos publicados. Estamos sumando las agendas de más comunidades de la región.'
            >
              <a href={CONTACT_URL} target='_blank' rel='noopener noreferrer' className='btn btn-md btn-primary'>
                Avisanos de un evento <ExternalLink className='h-4 w-4' />
              </a>
              <Link to='/communities' className='btn btn-md btn-secondary'>
                Explorar comunidades <ArrowUpRight className='h-4 w-4' />
              </Link>
            </Notice>
          ) : (
            <>
              {/* Toolbar */}
              <div className='mb-8 flex flex-col gap-3 rounded-3xl border border-white/10 bg-ink-900/95 p-3 lg:flex-row lg:items-center'>
                <div className='no-scrollbar -mx-3 flex min-w-0 flex-1 items-center gap-2 overflow-x-auto px-3' role='group' aria-label='Comunidad'>
                  <button onClick={() => setCommunity("")} aria-pressed={!community} className={cn("chip shrink-0", !community && "chip-active")}>
                    Todas <span className='text-xs text-gray-400'>{events.length}</span>
                  </button>
                  {communityIds.map((id) => {
                    const c = getCommunityById(id);
                    if (!c) return null;
                    return (
                      <button
                        key={id}
                        onClick={() => setCommunity(community === id ? "" : id)}
                        aria-pressed={community === id}
                        className={cn("chip shrink-0 py-1 pl-1", community === id && "chip-active")}
                      >
                        <CommunityAvatar community={c} className='h-6 w-6 text-[10px] ring-0' />
                        {c.title}
                        <span className='text-xs text-gray-400'>{events.filter((e) => e.communityId === id).length}</span>
                      </button>
                    );
                  })}
                </div>
                <div className='flex h-11 shrink-0 self-start rounded-2xl border border-white/10 bg-white/[0.03] p-1 lg:self-auto' role='tablist' aria-label='Vista'>
                  {views.map((v) => (
                    <button
                      key={v.id}
                      role='tab'
                      aria-selected={view === v.id}
                      aria-label={v.label}
                      onClick={() => setView(v.id)}
                      className={cn(
                        "relative flex items-center gap-1.5 rounded-xl px-3 text-sm transition-colors",
                        view === v.id ? "text-ink-950" : "text-gray-400 hover:text-white"
                      )}
                    >
                      {view === v.id && (
                        <motion.span layoutId='meetups-view-pill' className='absolute inset-0 rounded-xl bg-bitcoin' transition={{ duration: 0.4, ease }} />
                      )}
                      <span className='relative'>{v.icon}</span>
                      <span className='relative hidden min-[360px]:inline'>{v.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {view === "agenda" ? (
                <div className='space-y-14'>
                  {months.map(([month, items]) => (
                    <div key={month} className='relative md:pl-10'>
                      <span
                        aria-hidden='true'
                        className='absolute bottom-0 left-[0.4375rem] top-3 hidden w-px bg-gradient-to-b from-bitcoin/50 via-white/10 to-transparent md:block'
                      />
                      <div className='mb-6 flex items-center gap-3'>
                        <span
                          aria-hidden='true'
                          className='absolute left-0 hidden h-[0.9375rem] w-[0.9375rem] rounded-full border-2 border-bitcoin bg-ink-950 shadow-[0_0_12px_rgba(247,147,26,0.6)] md:block'
                        />
                        <h2 className='display text-3xl text-white md:text-5xl'>{month}</h2>
                        <span className='rounded-full bg-white/10 px-2.5 py-0.5 text-sm text-gray-300'>{items.length}</span>
                      </div>
                      <div className='space-y-4'>
                        {items.map((e, i) => (
                          <motion.div
                            key={e.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: i * 0.06, ease }}
                          >
                            <EventRow event={e} />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : view === "calendario" ? (
                <CalendarProvider
                  events={calendarEvents}
                  users={communityIds.map((id) => ({ id, name: getCommunityById(id)?.title ?? id }))}
                  initialDate={filtered[0]?.start}
                >
                  <CalendarContainer />
                </CalendarProvider>
              ) : (
                <CommunityMap points={points} maxZoom={12} className='h-[60vh] min-h-[24rem]' />
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default MeetupsPage;
