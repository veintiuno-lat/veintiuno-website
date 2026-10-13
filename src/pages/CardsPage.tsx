import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ExternalLink, X } from "lucide-react";
import SEOHead from "../components/seo/SEOHead";
import { cards, getArtistsWithCardCounts } from "../data/cards";
import { communities } from "../data/communities";
import { artists, getArtistById } from "../data/artists";
import PageHero from "../components/layout/PageHero";
import CommunityCard from "../components/cards/CommunityCard";
import { ArtistRow, CardGrid } from "../components/ArtistCardDetail";
import { CtaBand } from "../components/ui/Section";
import { AnimatedCounter } from "../components/motion";

const TALLY_URL = "https://tally.so/r/nGWKk2";

const selectClass =
  "h-11 w-full min-w-0 rounded-2xl border border-white/10 bg-ink-800 px-3 text-sm text-gray-200 focus:border-bitcoin/60 focus:outline-none sm:w-60";

// Hero wall: 12 cards split into 3 drifting columns
const wallColumns = [0, 1, 2].map((i) => cards.slice(0, 12).filter((_, j) => j % 3 === i));

/** Slowly drifting 3D wall of cards that leans toward the pointer. */
function CardWall() {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 50, damping: 20 };
  const rotateY = useSpring(useTransform(px, [-1, 1], [-30, -12]), spring);
  const rotateX = useSpring(useTransform(py, [-1, 1], [28, 14]), spring);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth) * 2 - 1);
      py.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, px, py]);

  return (
    <div
      aria-hidden='true'
      className='relative h-[22rem] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_72%)] [perspective:1400px] md:h-[34rem]'
    >
      <div className='absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(247,147,26,0.25),transparent)]' />
      <motion.div
        className='absolute left-1/2 top-1/2 grid w-[38rem] grid-cols-3 gap-4 md:w-[46rem]'
        style={{ x: "-50%", y: "-50%", rotateX, rotateY, rotateZ: 8 }}
      >
        {wallColumns.map((col, i) => (
          <motion.div
            key={i}
            animate={reduce ? undefined : { y: i % 2 ? ["-33.333%", "0%"] : ["0%", "-33.333%"] }}
            transition={{ duration: 48 + i * 10, repeat: Infinity, ease: "linear" }}
          >
            {/* 3 copies so the loop is seamless (each copy = exactly 1/3 of the height) */}
            {[0, 1, 2].map((copy) => (
              <div key={copy} className='flex flex-col gap-4 pb-4'>
                {col.map((card) => (
                  <img
                    key={card.id}
                    src={card.imageUrl}
                    alt=''
                    loading='lazy'
                    decoding='async'
                    className='aspect-[370/232] w-full rounded-xl border border-white/10 object-cover shadow-[0_20px_40px_-15px_rgba(0,0,0,0.9)]'
                  />
                ))}
              </div>
            ))}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

const CardsPage: React.FC = () => {
  const [selectedCommunity, setSelectedCommunity] = useState<string>("");
  const [selectedArtist, setSelectedArtist] = useState<string>("");

  const allArtistsWithCounts = getArtistsWithCardCounts();

  // Filter artists based on selected community
  const getFilteredArtists = () => {
    if (!selectedCommunity) {
      return allArtistsWithCounts;
    }

    const artistCounts: { [key: string]: number } = {};
    cards
      .filter((card) => card.communityName === selectedCommunity)
      .forEach((card) => {
        artistCounts[card.artist] = (artistCounts[card.artist] || 0) + 1;
      });

    return Object.entries(artistCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  };

  // Filter communities based on selected artist (only those with cards)
  const getFilteredCommunities = () => {
    const communityCounts: { [key: string]: number } = {};
    cards
      .filter((card) => !selectedArtist || card.artist === selectedArtist)
      .forEach((card) => {
        communityCounts[card.communityName] = (communityCounts[card.communityName] || 0) + 1;
      });

    return communities
      .filter((community) => communityCounts[community.title] > 0)
      .map((community) => ({
        name: community.title,
        count: communityCounts[community.title],
        id: community.id,
      }))
      .sort((a, b) => b.count - a.count);
  };

  const filteredArtists = getFilteredArtists();
  const filteredCommunities = getFilteredCommunities();

  const filteredCards = cards.filter((card) => {
    const matchesCommunity = !selectedCommunity || card.communityName === selectedCommunity;
    const matchesArtist = !selectedArtist || card.artist === selectedArtist;
    return matchesCommunity && matchesArtist;
  });

  // Selected community / artist data for the header cards
  const selectedCommunityData = selectedCommunity
    ? communities.find((c) => c.title === selectedCommunity)
    : undefined;
  const selectedArtistData = selectedArtist ? getArtistById(selectedArtist) : undefined;

  const hasFilters = Boolean(selectedCommunity || selectedArtist);
  const clearFilters = () => {
    setSelectedCommunity("");
    setSelectedArtist("");
  };

  return (
    <>
      <SEOHead
        title='Cards Bitcoin · Veintiuno'
        description='Colección única de cards digitales de las comunidades Bitcoin de Latinoamérica. Cada comunidad tiene 4 diseños creados por artistas locales.'
        keywords={[
          "cards bitcoin",
          "tarjetas bitcoin",
          "colección bitcoin",
          "arte bitcoin LATAM",
          "veintiuno",
          "comunidad",
        ]}
        url='/cards'
        type='website'
      />

      <PageHero
        badge='Arte Bitcoin · LATAM'
        title='Cards'
        subtitle='Cada comunidad tiene 4 diseños únicos, ilustrados por artistas de la región.'
        aside={<CardWall />}
        stats={[
          { value: <AnimatedCounter to={cards.length} />, label: "Cards" },
          { value: <AnimatedCounter to={new Set(cards.map((c) => c.communityId)).size} />, label: "Comunidades" },
          { value: <AnimatedCounter to={artists.length} />, label: "Artistas" },
        ]}
      >
        <a href={TALLY_URL} target='_blank' rel='noopener noreferrer' className='btn btn-md btn-primary !text-ink-950'>
          Diseña tu tarjeta <ExternalLink className='h-4 w-4' />
        </a>
        <a href='#galeria' className='btn btn-md btn-secondary'>
          Ver galería <ArrowDown className='h-4 w-4' />
        </a>
      </PageHero>

      <section id='galeria' className='relative scroll-mt-24 pb-10'>
        {/* Toolbar */}
        <div className='sticky top-[4.5rem] z-30 md:top-20'>
          <div className='mx-auto max-w-7xl px-3 md:px-8'>
            <div className='flex flex-col gap-2 rounded-3xl border border-white/10 bg-ink-900/95 p-3 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] sm:flex-row sm:items-center'>
              <select
                aria-label='Filtrar por comunidad'
                value={selectedCommunity}
                onChange={(e) => setSelectedCommunity(e.target.value)}
                className={selectClass}
              >
                <option value=''>Todas las comunidades</option>
                {filteredCommunities.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name} ({c.count})
                  </option>
                ))}
              </select>
              <select
                aria-label='Filtrar por artista'
                value={selectedArtist}
                onChange={(e) => setSelectedArtist(e.target.value)}
                className={selectClass}
              >
                <option value=''>Todos los artistas</option>
                {filteredArtists.map((a) => (
                  <option key={a.name} value={a.name}>
                    {getArtistById(a.name)?.username ?? a.name} ({a.count})
                  </option>
                ))}
              </select>
              <div className='flex items-center justify-between gap-3 px-1 sm:ml-auto'>
                <p aria-live='polite' className='text-sm text-gray-400'>
                  <span className='font-semibold text-white'>{filteredCards.length}</span>{" "}
                  {filteredCards.length === 1 ? "card" : "cards"}
                </p>
                {hasFilters && (
                  <button onClick={clearFilters} className='chip shrink-0'>
                    <X className='h-4 w-4' /> Limpiar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className='mx-auto mt-8 max-w-7xl px-5 md:px-8'>
          {/* Selected community / artist */}
          {hasFilters && (
            <div className='mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2'>
              {selectedCommunityData && <CommunityCard community={selectedCommunityData} compact />}
              {selectedArtistData && <ArtistRow artist={selectedArtistData} />}
            </div>
          )}

          {filteredCards.length === 0 ? (
            <div className='surface flex flex-col items-center gap-4 px-6 py-20 text-center'>
              <p className='display text-4xl text-white'>Sin resultados</p>
              <p className='max-w-md text-gray-400'>No hay cards con esos filtros.</p>
              <button onClick={clearFilters} className='btn btn-sm btn-secondary'>
                Limpiar filtros
              </button>
            </div>
          ) : (
            <CardGrid cards={filteredCards} />
          )}
        </div>
      </section>

      <CtaBand
        title='Diseña tu tarjeta'
        description='¿Sos artista? Ilustrá la card de una comunidad Bitcoin de tu región.'
        action={{ label: "Postularme", href: TALLY_URL, external: true }}
      />
    </>
  );
};

export default CardsPage;
