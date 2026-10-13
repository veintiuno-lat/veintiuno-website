import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Instagram } from "lucide-react";
import SEOHead from "../components/seo/SEOHead";
import { artists } from "../data/artists";
import { getCardsByArtist } from "../data/cards";
import { communities } from "../data/communities";
import { NostrIcon } from "../components/icons/nostr";
import { X as XIcon } from "../components/icons/x";
import { CardGrid } from "../components/ArtistCardDetail";
import CommunityCard, { Flag } from "../components/cards/CommunityCard";
import { SectionHeader } from "../components/ui/Section";
import { SplitText } from "../components/motion";
import { breadcrumbSchema, personSchema } from "@/lib/schema";
import Breadcrumbs from "../components/Breadcrumbs";

const ease = [0.22, 1, 0.36, 1] as const;

const socialClass =
  "flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-gray-200 transition hover:-translate-y-0.5 hover:border-bitcoin hover:text-bitcoin hover:shadow-glow";

const ArtistPage: React.FC = () => {
  const { artistId } = useParams<{ artistId: string }>();

  // Find the artist by ID
  const artist = artists.find((a) => a.id === artistId);

  if (!artist) {
    return (
      <section className='flex min-h-screen items-center justify-center px-5 pt-28'>
        <div className='surface flex max-w-md flex-col items-center gap-4 px-8 py-16 text-center'>
          <h1 className='display text-4xl text-white'>Artista no encontrado</h1>
          <p className='text-gray-400'>El artista que buscás no existe.</p>
          <Link to='/artists' className='btn btn-sm btn-primary !text-ink-950'>
            <ArrowLeft className='h-4 w-4' /> Volver a Artistas
          </Link>
        </div>
      </section>
    );
  }

  const artistCards = getCardsByArtist(artist.id);
  const supported = communities.filter((c) => artist.communities.includes(c.id));
  const progress = artist.totalCards ? Math.round((artist.completedCards / artist.totalCards) * 100) : 0;

  const socials = [
    { href: artist.socialLinks?.website, label: "Website", icon: <ExternalLink className='h-5 w-5' /> },
    { href: artist.socialLinks?.instagram, label: "Instagram", icon: <Instagram className='h-5 w-5' /> },
    { href: artist.socialLinks?.twitter, label: "X (Twitter)", icon: <XIcon className='h-5 w-5' /> },
    { href: artist.socialLinks?.nostr, label: "Nostr", icon: <NostrIcon className='h-5 w-5' /> },
  ].filter((s) => s.href);

  const crumbs = [
    { name: "Inicio", url: "/" },
    { name: "Artistas", url: "/artists" },
    { name: artist.username, url: `/artist/${artist.id}` },
  ];

  return (
    <>
      <SEOHead
        title={`${artist.username} · Artista Bitcoin · Veintiuno`}
        description={`Conocé a ${artist.username}, artista bitcoiner de ${artist.countryName} con ${artist.completedCards}/${artist.totalCards} cards en la red Veintiuno.`}
        keywords={[
          artist.username,
          "artista bitcoin",
          "arte bitcoin",
          "cards bitcoin",
          artist.countryName.toLowerCase(),
        ]}
        url={`/artist/${artist.id}`}
        image={`/og/artist/${artist.id}.jpg`}
        type='website'
        jsonLd={[personSchema(artist, "artist"), breadcrumbSchema(crumbs)]}
      />

      {/* Profile header */}
      <section className='relative isolate overflow-hidden pb-20 pt-28 md:pb-28'>
        <div
          aria-hidden='true'
          className='grid-lines grain absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_30%_30%,black,transparent_75%)]'
        />
        <div aria-hidden='true' className='absolute -top-40 left-0 -z-10 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(247,147,26,0.15),transparent)]' />
        <div className='mx-auto max-w-7xl px-5 md:px-8'>
          <Breadcrumbs items={crumbs} className='mb-12' />

          <div className='grid grid-cols-1 items-center gap-10 md:grid-cols-[auto_1fr] md:gap-16'>
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease }}
              className='relative mx-auto md:mx-0'
            >
              <div aria-hidden='true' className='absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgba(247,147,26,0.4),transparent)]' />
              <img
                src={artist.profileImage}
                alt={artist.username}
                fetchPriority='high'
                className='relative h-44 w-44 rounded-full object-cover shadow-glow-lg ring-4 ring-bitcoin ring-offset-4 ring-offset-ink-950 md:h-64 md:w-64'
              />
              <span className='absolute bottom-2 right-2 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-4 border-ink-950 bg-ink-800 md:bottom-4 md:right-4'>
                <Flag country={artist.countryName} className='fis !h-full !w-full' />
              </span>
            </motion.div>

            <div className='text-center md:text-left'>
              <div className='eyebrow mb-6'>Artista</div>
              <SplitText as='h1' text={artist.username} className='display text-[clamp(2rem,10.5vw,3rem)] text-white md:text-7xl lg:text-8xl' />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease }}
              >
                <p className='mt-4 flex items-center justify-center gap-2 text-gray-400 md:justify-start'>
                  <Flag country={artist.countryName} />
                  {artist.countryName}
                </p>
                <p className='mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300 md:mx-0'>
                  {artist.bio ||
                    `${artist.username} es un artista digital especializado en crear arte inspirado en Bitcoin. Su trabajo explora temas de descentralización, libertad financiera y la revolución digital que Bitcoin representa para América Latina.`}
                </p>
                {socials.length > 0 && (
                  <div className='mt-8 flex flex-wrap justify-center gap-3 md:justify-start'>
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target='_blank'
                        rel='noopener noreferrer'
                        title={s.label}
                        aria-label={s.label}
                        className={socialClass}
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>

          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
            className='mt-14 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:max-w-2xl'
          >
            {[
              { value: `${artist.completedCards}/${artist.totalCards}`, label: "Cards" },
              { value: supported.length, label: "Comunidades" },
              { value: `${progress}%`, label: "Completado" },
            ].map((s) => (
              <div key={s.label} className='bg-ink-950/70 px-4 py-4 md:px-6'>
                <dd className='font-display text-2xl text-white md:text-4xl'>{s.value}</dd>
                <dt className='mt-1 text-[11px] uppercase tracking-[0.18em] text-gray-400'>{s.label}</dt>
              </div>
            ))}
          </motion.dl>
        </div>
      </section>

      {/* Cards */}
      <section className='pb-24 md:pb-32'>
        <div className='mx-auto max-w-7xl px-5 md:px-8'>
          <SectionHeader eyebrow='Colección' title='Sus cards' />
          {artistCards.length > 0 ? (
            <CardGrid cards={artistCards} />
          ) : (
            <div className='surface px-6 py-16 text-center text-gray-400'>
              Este artista todavía no tiene cards publicadas.
            </div>
          )}
        </div>
      </section>

      {/* Supported communities */}
      {supported.length > 0 && (
        <section className='pb-24 md:pb-32'>
          <div className='mx-auto max-w-7xl px-5 md:px-8'>
            <SectionHeader eyebrow='Red' title='Comunidades que apoya' />
            <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {supported.map((c, i) => (
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
        </section>
      )}
    </>
  );
};

export default ArtistPage;
