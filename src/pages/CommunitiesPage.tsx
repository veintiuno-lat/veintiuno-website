import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Globe2, LayoutGrid, Map as MapIcon, Plus, Search, X } from "lucide-react";
import SEOHead from "../components/seo/SEOHead";
import { communities } from "../data/communities";
import { countries as countryList } from "../data/countries";
import PageHero from "../components/layout/PageHero";
import CommunityCard, { Flag } from "../components/cards/CommunityCard";
import CommunityMap, { type MapPoint } from "../components/map/CommunityMap";
import Globe from "../components/three/Globe";
import { CtaBand } from "../components/ui/Section";
import { AnimatedCounter } from "../components/motion";
import { cn } from "@/lib/utils";

type View = "mapa" | "globo" | "grilla";

const ADD_COMMUNITY_URL =
  "https://github.com/veintiuno-lat/veintiuno-website/issues/new?template=add-community.yml";

const ease = [0.22, 1, 0.36, 1] as const;

// Countries with at least one community, most communities first.
const countryCounts = communities.reduce<Record<string, number>>((acc, c) => {
  acc[c.country] = (acc[c.country] ?? 0) + 1;
  return acc;
}, {});
const countries = Object.keys(countryCounts).sort(
  (a, b) => countryCounts[b] - countryCounts[a] || a.localeCompare(b, "es")
);

const normalize = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const views: { id: View; label: string; icon: React.ReactNode }[] = [
  { id: "mapa", label: "Mapa", icon: <MapIcon className='h-4 w-4' /> },
  { id: "globo", label: "Globo", icon: <Globe2 className='h-4 w-4' /> },
  { id: "grilla", label: "Grilla", icon: <LayoutGrid className='h-4 w-4' /> },
];

const CommunitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const selectedCountry = params.get("pais") ?? "";
  const selectedCity = params.get("ciudad") ?? "";
  const query = params.get("q") ?? "";
  const onlyCruzada = params.get("cruzada") === "1";
  const view = (params.get("vista") as View) || "mapa";

  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const update = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)));
    setParams(next, { replace: true, preventScrollReset: true });
  };

  // Cities scoped to the selected country (all if none)
  const cities = useMemo(() => {
    const source = selectedCountry ? communities.filter((c) => c.country === selectedCountry) : communities;
    return [...new Set(source.map((c) => c.city).filter((c): c is string => Boolean(c)))].sort((a, b) =>
      a.localeCompare(b, "es")
    );
  }, [selectedCountry]);

  // When the country changes, drop a selected city that no longer belongs to it
  const handleCountryChange = (country: string) => {
    const keepCity =
      !country || !selectedCity || communities.some((c) => c.country === country && c.city === selectedCity);
    update({ pais: country || null, ciudad: keepCity ? selectedCity || null : null });
  };

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return communities
      .filter(
        (c) =>
          (!selectedCountry || c.country === selectedCountry) &&
          (!selectedCity || c.city === selectedCity) &&
          (!onlyCruzada || c.cruzade) &&
          (!q || normalize(`${c.title} ${c.city ?? ""} ${c.country}`).includes(q))
      )
      .sort((a, b) => Number(!!b.cruzade) - Number(!!a.cruzade) || a.country.localeCompare(b.country, "es"));
  }, [selectedCountry, selectedCity, onlyCruzada, query]);

  const points: MapPoint[] = useMemo(
    () =>
      filtered.map((c) => ({
        id: c.id,
        lat: c.latitude,
        lng: c.longitude,
        title: c.title,
        subtitle: `${c.city}, ${c.country}`,
        image: c.avatarImage,
        href: `/community/${c.id}`,
      })),
    [filtered]
  );

  // Marker click → reveal the matching list item.
  useEffect(() => {
    if (selected) document.getElementById(`c-${selected}`)?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [selected]);

  const hasFilters = selectedCountry || selectedCity || query || onlyCruzada;
  const cruzadaCount = communities.filter((c) => c.cruzade).length;

  const groups = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    filtered.forEach((c) => map.set(c.country, [...(map.get(c.country) ?? []), c]));
    return [...map.entries()].sort((a, b) => b[1].length - a[1].length);
  }, [filtered]);

  const focus = useMemo(() => {
    const c = communities.find((x) => x.id === (hovered ?? selected));
    if (c) return { lat: c.latitude, lng: c.longitude };
    if (selectedCountry && filtered.length) {
      return {
        lat: filtered.reduce((s, c) => s + c.latitude, 0) / filtered.length,
        lng: filtered.reduce((s, c) => s + c.longitude, 0) / filtered.length,
      };
    }
    return null;
  }, [hovered, selected, selectedCountry, filtered]);

  const list = (
    <div className='space-y-2'>
      <AnimatePresence initial={false}>
        {filtered.map((c) => (
          <motion.div
            key={c.id}
            id={`c-${c.id}`}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease }}
          >
            <CommunityCard community={c} compact active={c.id === selected || c.id === hovered} onHover={setHovered} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      <SEOHead
        title='Comunidades Bitcoin en LATAM · Veintiuno'
        description='Explorá las comunidades Bitcoin activas en toda Latinoamérica. Argentina, México, El Salvador, Chile y más — la red bitcoiner regional.'
        keywords={[
          "comunidades bitcoin",
          "bitcoin latinoamerica",
          "bitcoin LATAM",
          "comunidad bitcoin argentina",
          "comunidad bitcoin mexico",
          "veintiuno",
        ]}
        url='/communities'
        type='website'
      />

      <PageHero
        badge='Directorio'
        title='Comunidades Bitcoin en Latinoamérica'
        subtitle='Meetups, escuelas, espacios físicos y círculos económicos. Encontrá la comunidad más cercana o sumá la tuya a la red.'
        stats={[
          { value: <AnimatedCounter to={communities.length} />, label: "Comunidades" },
          { value: <AnimatedCounter to={countries.length} />, label: "Países" },
          { value: <AnimatedCounter to={cruzadaCount} />, label: "En la cruzada" },
        ]}
      >
        <a href='#explorar' className='btn btn-md btn-primary !text-ink-950'>
          Explorar
        </a>
        <a href={ADD_COMMUNITY_URL} target='_blank' rel='noopener noreferrer' className='btn btn-md btn-secondary'>
          <Plus className='h-4 w-4' /> Sumar comunidad
        </a>
      </PageHero>

      <section id='explorar' className='relative scroll-mt-24 pb-10'>
        {/* Toolbar */}
        <div className='relative z-30 md:sticky md:top-20'>
          <div className='mx-auto max-w-7xl px-3 md:px-8'>
            <div className='rounded-3xl border border-white/10 bg-ink-900/95 p-3 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)]'>
              <div className='flex flex-col gap-3 md:flex-row md:items-center'>
                <label className='relative flex-1'>
                  <span className='sr-only'>Buscar comunidad</span>
                  <Search className='pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500' />
                  <input
                    type='search'
                    value={query}
                    onChange={(e) => update({ q: e.target.value || null })}
                    placeholder='Buscar por nombre o ciudad…'
                    className='h-11 w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-11 pr-4 text-sm text-white placeholder:text-gray-500 focus:border-bitcoin/60 focus:outline-none'
                  />
                </label>
                <div className='flex items-center gap-2'>
                  <select
                    aria-label='Ciudad'
                    value={selectedCity}
                    onChange={(e) => update({ ciudad: e.target.value || null })}
                    className='h-11 min-w-0 flex-1 rounded-2xl border border-white/10 bg-ink-800 px-3 text-sm text-gray-200 focus:border-bitcoin/60 focus:outline-none md:w-48 md:flex-none'
                  >
                    <option value=''>Todas las ciudades</option>
                    {cities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => update({ cruzada: onlyCruzada ? null : "1" })}
                    aria-pressed={onlyCruzada}
                    className={cn("chip h-11 shrink-0 rounded-2xl", onlyCruzada && "chip-active")}
                  >
                    Cruzada
                  </button>
                  <div className='flex h-11 shrink-0 rounded-2xl border border-white/10 bg-white/[0.03] p-1' role='tablist' aria-label='Vista'>
                    {views.map((v) => (
                      <button
                        key={v.id}
                        role='tab'
                        aria-selected={view === v.id}
                        onClick={() => update({ vista: v.id === "mapa" ? null : v.id })}
                        className={cn(
                          "relative flex items-center gap-1.5 rounded-xl px-3 text-sm transition-colors",
                          view === v.id ? "text-ink-950" : "text-gray-400 hover:text-white"
                        )}
                      >
                        {view === v.id && (
                          <motion.span layoutId='view-pill' className='absolute inset-0 rounded-xl bg-bitcoin' transition={{ duration: 0.4, ease }} />
                        )}
                        <span className='relative'>{v.icon}</span>
                        <span className='relative hidden sm:inline'>{v.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {/* Country chips */}
              <div className='no-scrollbar -mx-3 mt-3 flex gap-2 overflow-x-auto px-3 pb-1'>
                <button onClick={() => handleCountryChange("")} className={cn("chip shrink-0", !selectedCountry && "chip-active")}>
                  Todos <span className='text-xs text-gray-400'>{communities.length}</span>
                </button>
                {countries.map((c) => (
                  <button
                    key={c}
                    onClick={() => handleCountryChange(selectedCountry === c ? "" : c)}
                    className={cn("chip shrink-0", selectedCountry === c && "chip-active")}
                  >
                    <Flag country={c} />
                    {c}
                    <span className='text-xs text-gray-400'>{countryCounts[c]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Result summary */}
        <div className='mx-auto mt-8 flex max-w-7xl items-center justify-between px-5 text-sm text-gray-400 md:px-8'>
          <p aria-live='polite'>
            <span className='font-semibold text-white'>{filtered.length}</span>{" "}
            {filtered.length === 1 ? "comunidad" : "comunidades"}
            {selectedCountry && ` en ${selectedCountry}`}
          </p>
          {hasFilters && (
            <button onClick={() => setParams(view === "mapa" ? {} : { vista: view }, { replace: true })} className='inline-flex items-center gap-1 text-bitcoin hover:text-glow'>
              <X className='h-4 w-4' /> Limpiar filtros
            </button>
          )}
        </div>

        <div className='mx-auto mt-6 max-w-7xl px-5 md:px-8'>
          {filtered.length === 0 ? (
            <div className='surface flex flex-col items-center gap-4 px-6 py-20 text-center'>
              <p className='display text-4xl text-white'>Sin resultados</p>
              <p className='max-w-md text-gray-400'>No encontramos comunidades con esos filtros. ¿Conocés una? Sumala a la red.</p>
              <a href={ADD_COMMUNITY_URL} target='_blank' rel='noopener noreferrer' className='btn btn-sm btn-primary !text-ink-950'>
                <Plus className='h-4 w-4' /> Sumar comunidad
              </a>
            </div>
          ) : view === "grilla" ? (
            <div className='space-y-16'>
              {groups.map(([country, items]) => (
                <div key={country}>
                  <div className='sticky top-16 z-10 -mx-2 mb-6 flex items-center gap-3 bg-gradient-to-b from-ink-950 via-ink-950/90 to-transparent px-2 py-3 md:top-[11.5rem]'>
                    <Flag country={country} className='text-2xl' />
                    <h2 className='display text-3xl text-white md:text-4xl'>{country}</h2>
                    <span className='rounded-full bg-white/10 px-2.5 py-0.5 text-sm text-gray-300'>{items.length}</span>
                    {countryList.find((x) => x.name === country) && (
                      <Link to={`/pais/${countryList.find((x) => x.name === country)!.slug}`} className='ml-auto text-sm font-semibold text-bitcoin'>
                        Ver país →
                      </Link>
                    )}
                  </div>
                  <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {items.map((c, i) => (
                      <motion.div
                        key={c.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease }}
                      >
                        <CommunityCard community={c} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='grid grid-cols-1 gap-5 lg:grid-cols-[24rem_1fr]'>
              <div className='order-2 min-w-0 lg:order-1 lg:max-h-[calc(100vh-15rem)] lg:overflow-y-auto lg:pr-2' data-lenis-prevent>
                {list}
              </div>
              <div className='order-1 min-w-0 lg:order-2'>
                <div className='lg:sticky lg:top-60'>
                  {view === "mapa" ? (
                    <CommunityMap
                      points={points}
                      selectedId={selected}
                      highlightId={hovered}
                      onSelect={setSelected}
                      className='h-[55vh] lg:h-[calc(100vh-15rem)]'
                    />
                  ) : (
                    <div className='relative overflow-hidden rounded-3xl border border-white/10 bg-ink-900/60'>
                      <Globe
                        className='mx-auto aspect-square h-[55vh] max-w-full lg:h-[calc(100vh-15rem)]'
                        points={filtered.map((c) => ({ id: c.id, lat: c.latitude, lng: c.longitude, label: c.title, sublabel: c.city }))}
                        focus={focus}
                        selectedId={hovered}
                        onSelect={(p) => navigate(`/community/${p.id}`)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <CtaBand
        title='¿Falta tu comunidad?'
        description='Si estás construyendo una comunidad Bitcoin only en Latinoamérica, sumate a la red.'
        action={{ label: "Agregar comunidad", href: ADD_COMMUNITY_URL, external: true }}
      />
    </>
  );
};

export default CommunitiesPage;
