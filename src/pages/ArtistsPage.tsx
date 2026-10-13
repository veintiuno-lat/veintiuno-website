import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ExternalLink } from "lucide-react";
import SEOHead from "../components/seo/SEOHead";
import { artists, getUniqueCountries } from "../data/artists";
import { cards } from "../data/cards";
import { Artist } from "../types/Artist";
import PageHero from "../components/layout/PageHero";
import { Flag } from "../components/cards/CommunityCard";
import { CtaBand } from "../components/ui/Section";
import { AnimatedCounter } from "../components/motion";
import { cn } from "@/lib/utils";

const TALLY_URL = "https://tally.so/r/nGWKk2";
const ease = [0.22, 1, 0.36, 1] as const;

const countries = getUniqueCountries();
const countryCounts = artists.reduce<Record<string, number>>((acc, a) => {
  acc[a.countryName] = (acc[a.countryName] ?? 0) + 1;
  return acc;
}, {});

// Collage layout: center avatar + orbiting ones (percent of the square)
const spots = [
  { left: 50, top: 50, size: 40 },
  { left: 18, top: 27, size: 25 },
  { left: 81, top: 23, size: 27 },
  { left: 84, top: 72, size: 22 },
  { left: 21, top: 75, size: 27 },
  { left: 50, top: 10, size: 16 },
  { left: 54, top: 91, size: 15 },
];

function AvatarCollage() {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden='true' className='relative mx-auto aspect-square w-full max-w-[20rem] sm:max-w-md'>
      <div className='absolute inset-[20%] rounded-full bg-[radial-gradient(closest-side,rgba(247,147,26,0.25),transparent)]' />
      <div className='absolute inset-[8%] rounded-full border border-white/[0.06]' />
      <div className='absolute inset-[24%] rounded-full border border-bitcoin/20' />
      {artists.slice(0, spots.length).map((a, i) => {
        const s = spots[i];
        return (
          <div
            key={a.id}
            className='absolute -translate-x-1/2 -translate-y-1/2'
            style={{ left: `${s.left}%`, top: `${s.top}%`, width: `${s.size}%`, zIndex: i === 0 ? 10 : 1 }}
          >
            <motion.img
              src={a.profileImage}
              alt=''
              decoding='async'
              animate={reduce ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 5 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
              className={cn(
                "aspect-square w-full rounded-full object-cover ring-4 ring-ink-950",
                i === 0 ? "shadow-glow-lg outline outline-2 outline-offset-4 outline-bitcoin/70" : "shadow-2xl"
              )}
            />
          </div>
        );
      })}
    </div>
  );
}

/** Avatar wrapped in a progress ring (completed / total cards). */
function ProgressRing({ value, children }: { value: number; children: React.ReactNode }) {
  const r = 54;
  const c = 2 * Math.PI * r;
  return (
    <div className='relative h-32 w-32'>
      <svg
        viewBox='0 0 120 120'
        aria-hidden='true'
        className='absolute inset-0 -rotate-90 transition duration-500 group-hover:drop-shadow-[0_0_10px_rgba(247,147,26,0.8)]'
      >
        <circle cx='60' cy='60' r={r} fill='none' stroke='rgba(255,255,255,0.08)' strokeWidth='3' />
        <circle
          cx='60'
          cy='60'
          r={r}
          fill='none'
          stroke='#F7931A'
          strokeWidth='3'
          strokeLinecap='round'
          strokeDasharray={c}
          strokeDashoffset={c * (1 - Math.min(1, value))}
        />
      </svg>
      <div className='absolute inset-2.5 overflow-hidden rounded-full'>{children}</div>
    </div>
  );
}

const ArtistsPage: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const filteredArtists = artists.filter(
    (artist) => !selectedCountry || artist.countryName === selectedCountry
  );

  return (
    <>
      <SEOHead
        title='Artistas Bitcoin LATAM · Veintiuno'
        description='Conocé a los artistas que crean cards Bitcoin únicas para las comunidades de Latinoamérica. Arte digital y diseño bitcoiner regional.'
        keywords={[
          "artistas bitcoin",
          "arte bitcoin",
          "cards bitcoin",
          "diseñadores bitcoin",
          "bitcoin latinoamerica",
          "veintiuno",
        ]}
        url='/artists'
        type='website'
      />

      <PageHero
        badge='Creadores Bitcoin'
        title='Artistas'
        subtitle='Cada artista tiene su propia colección distribuida entre diferentes comunidades.'
        aside={<AvatarCollage />}
        stats={[
          { value: <AnimatedCounter to={artists.length} />, label: "Artistas" },
          { value: <AnimatedCounter to={countries.length} />, label: "Países" },
          { value: <AnimatedCounter to={cards.length} />, label: "Cards" },
        ]}
      >
        <a href={TALLY_URL} target='_blank' rel='noopener noreferrer' className='btn btn-md btn-primary !text-ink-950'>
          Sumate como artista <ExternalLink className='h-4 w-4' />
        </a>
        <a href='#artistas' className='btn btn-md btn-secondary'>
          Ver artistas <ArrowDown className='h-4 w-4' />
        </a>
      </PageHero>

      <section id='artistas' className='scroll-mt-24 pb-10'>
        <div className='mx-auto max-w-7xl px-5 md:px-8'>
          {/* Country chips */}
          <div className='flex flex-wrap items-center gap-2' role='group' aria-label='Filtrar por país'>
            <button
              onClick={() => setSelectedCountry("")}
              aria-pressed={!selectedCountry}
              className={cn("chip", !selectedCountry && "chip-active")}
            >
              Todos <span className='text-xs text-gray-400'>{artists.length}</span>
            </button>
            {countries.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCountry(selectedCountry === c ? "" : c)}
                aria-pressed={selectedCountry === c}
                className={cn("chip", selectedCountry === c && "chip-active")}
              >
                <Flag country={c} />
                {c}
                <span className='text-xs text-gray-400'>{countryCounts[c]}</span>
              </button>
            ))}
          </div>

          <p aria-live='polite' className='mt-6 text-sm text-gray-400'>
            <span className='font-semibold text-white'>{filteredArtists.length}</span>{" "}
            {filteredArtists.length === 1 ? "artista" : "artistas"}
            {selectedCountry && ` en ${selectedCountry}`}
          </p>

          <div className='mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {filteredArtists.map((artist, i) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease }}
              >
                <ArtistCard artist={artist} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title='Sumate como artista'
        description='Ilustrá la card de una comunidad Bitcoin y llevá tu arte a toda Latinoamérica.'
        action={{ label: "Postularme", href: TALLY_URL, external: true }}
      />
    </>
  );
};

const ArtistCard: React.FC<{ artist: Artist }> = ({ artist }) => (
  <Link
    to={`/artist/${artist.id}`}
    className='surface surface-hover group flex h-full flex-col items-center px-6 pb-6 pt-8 text-center hover:-translate-y-1'
  >
    <div className='relative'>
      <ProgressRing value={artist.totalCards ? artist.completedCards / artist.totalCards : 0}>
        <img
          src={artist.profileImage}
          alt=''
          loading='lazy'
          decoding='async'
          className='h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110'
        />
      </ProgressRing>
      <span className='absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-ink-900 bg-ink-800'>
        <Flag country={artist.countryName} className='fis !h-full !w-full' />
      </span>
    </div>
    <h3 className='mt-5 max-w-full truncate text-lg font-bold text-white transition-colors group-hover:text-bitcoin'>
      {artist.username}
    </h3>
    <p className='mt-0.5 text-sm text-gray-400'>{artist.countryName}</p>
    <p className='mt-4 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-gray-300'>
      <span className='font-display text-sm text-white'>
        {artist.completedCards}/{artist.totalCards}
      </span>{" "}
      cards
    </p>
  </Link>
);

export default ArtistsPage;
