import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import SEOHead from "../components/seo/SEOHead";
import { cards, getCardById } from "../data/cards";
import { getCommunityById } from "../data/communities";
import { getArtistById } from "../data/artists";
import type { Card } from "../types/Card";
import { breadcrumbSchema, cardArtworkSchema } from "@/lib/schema";
import Breadcrumbs from "../components/Breadcrumbs";
import HoloCard from "../components/cards/HoloCard";
import CommunityCard from "../components/cards/CommunityCard";
import { ArtistRow, CardGrid } from "../components/ArtistCardDetail";
import CommunityMap from "../components/map/CommunityMap";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

function MoreRow({ title, link, items }: { title: string; link?: { to: string; label: string }; items: Card[] }) {
  if (!items.length) return null;
  return (
    <div>
      <div className='mb-8 flex items-end justify-between gap-4'>
        <h2 className='display text-3xl text-white md:text-5xl'>{title}</h2>
        {link && (
          <Link
            to={link.to}
            className='group inline-flex shrink-0 items-center gap-2 text-sm font-semibold uppercase tracking-widest text-bitcoin'
          >
            {link.label}
            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
          </Link>
        )}
      </div>
      <CardGrid cards={items} />
    </div>
  );
}

const CardPage: React.FC = () => {
  const { cardId } = useParams<{ cardId: string }>();

  // Find the card by ID
  const card = getCardById(cardId || "");

  if (!card) {
    return (
      <section className='flex min-h-screen items-center justify-center px-5 pt-28'>
        <div className='surface flex max-w-md flex-col items-center gap-4 px-8 py-16 text-center'>
          <h1 className='display text-4xl text-white'>Tarjeta no encontrada</h1>
          <p className='text-gray-400'>La tarjeta que buscas no existe.</p>
          <Link to='/cards' className='btn btn-sm btn-primary !text-ink-950'>
            <ArrowLeft className='h-4 w-4' /> Volver a Cards
          </Link>
        </div>
      </section>
    );
  }

  const community = getCommunityById(card.communityId);
  const artist = getArtistById(card.artist);

  // Card coordinates, falling back to the community location
  const points = (
    card.coordinates?.length
      ? card.coordinates
      : community
        ? [{ latitude: community.latitude, longitude: community.longitude }]
        : []
  ).map((c, i) => ({
    id: `${card.id}-${i}`,
    lat: c.latitude,
    lng: c.longitude,
    title: card.communityName,
    subtitle: card.location,
    image: community?.avatarImage,
    href: community ? `/community/${community.id}` : undefined,
  }));

  const moreByArtist = cards.filter((c) => c.artist === card.artist && c.id !== card.id).slice(0, 4);
  const moreByCommunity = cards
    .filter((c) => c.communityId === card.communityId && c.id !== card.id && c.artist !== card.artist)
    .slice(0, 4);

  const crumbs = [
    { name: "Inicio", url: "/" },
    { name: "Cards", url: "/cards" },
    { name: card.title || card.number, url: `/card/${card.id}` },
  ];

  return (
    <>
      <SEOHead
        title={`${card.title || card.number} · Card · Veintiuno`}
        description={`Card Bitcoin de ${card.artist} para ${card.communityName} en ${card.location}. Parte de la colección Veintiuno.`}
        keywords={[
          card.title || card.number,
          "card bitcoin",
          "arte bitcoin",
          card.artist,
          card.communityName,
        ]}
        url={`/card/${card.id}`}
        image={`/og/card/${card.id}.jpg`}
        type='website'
        jsonLd={[cardArtworkSchema(card), breadcrumbSchema(crumbs)]}
      />

      <section className='relative overflow-hidden pb-24 pt-28'>
        <div aria-hidden='true' className='absolute -left-40 top-20 -z-10 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(247,147,26,0.1),transparent)]' />
        <div className='mx-auto max-w-7xl px-5 md:px-8'>
          <Breadcrumbs items={crumbs} className='mb-10' />

          <div className='grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16'>
            {/* Card */}
            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: 12 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1, ease }}
              className='lg:sticky lg:top-28'
            >
              <HoloCard
                src={card.imageUrl}
                alt={card.title || `${card.communityName} - ${card.number}`}
                orientation={card.orientation}
                className={cn("mx-auto", card.orientation === "landscape" ? "max-w-2xl" : "max-w-sm")}
              />
            </motion.div>

            {/* Metadata */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease }}
              className='space-y-8'
            >
              <div>
                <div className='eyebrow mb-5'>Obra {card.number}</div>
                <h1 className='display text-4xl text-white md:text-6xl'>{card.title || card.number}</h1>
                {card.description && <p className='mt-5 text-lg leading-relaxed text-gray-300'>{card.description}</p>}
              </div>

              <dl className='grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10'>
                <div className='bg-ink-950/80 px-5 py-4'>
                  <dt className='text-xs uppercase tracking-[0.18em] text-gray-400'>Obra</dt>
                  <dd className='mt-1 font-display text-2xl text-white'>{card.number}</dd>
                </div>
                <div className='bg-ink-950/80 px-5 py-4'>
                  <dt className='text-xs uppercase tracking-[0.18em] text-gray-400'>Ubicación</dt>
                  <dd className='mt-1 flex items-start gap-1.5 text-sm text-gray-200'>
                    <MapPin className='mt-0.5 h-4 w-4 shrink-0 text-bitcoin' />
                    {card.location}
                  </dd>
                </div>
              </dl>

              {artist && (
                <div>
                  <h2 className='mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500'>Artista</h2>
                  <ArtistRow artist={artist} />
                </div>
              )}

              {community && (
                <div>
                  <h2 className='mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500'>Comunidad</h2>
                  <CommunityCard community={community} compact />
                </div>
              )}

              {points.length > 0 && (
                <div>
                  <h2 className='mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500'>
                    ¿Dónde la encuentro?
                  </h2>
                  <CommunityMap points={points} className='h-72' maxZoom={10} />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {(moreByArtist.length > 0 || moreByCommunity.length > 0) && (
        <section className='pb-24 md:pb-32'>
          <div className='mx-auto max-w-7xl space-y-20 px-5 md:px-8'>
            <MoreRow
              title={`Más de ${artist?.username ?? card.artist}`}
              link={artist ? { to: `/artist/${artist.id}`, label: "Ver artista" } : undefined}
              items={moreByArtist}
            />
            <MoreRow
              title={`Más de ${card.communityName}`}
              link={community ? { to: `/community/${community.id}`, label: "Ver comunidad" } : undefined}
              items={moreByCommunity}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default CardPage;
