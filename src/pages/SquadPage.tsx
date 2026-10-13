import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Globe, GraduationCap, Home, Shield, Sword, Wrench } from "lucide-react";
import SEOHead from "../components/seo/SEOHead";
import PageHero from "../components/layout/PageHero";
import { SectionHeader, CtaBand } from "../components/ui/Section";
import CommunityCard from "../components/cards/CommunityCard";
import HoloCard from "../components/cards/HoloCard";
import CommunityMap from "../components/map/CommunityMap";
import { AnimatedCounter } from "../components/motion";
import { getSquadById } from "../data/squads";
import { getSoldiersBySquad } from "../data/soldiers";
import { getCommunitiesByIds } from "../data/communities";
import { cards } from "../data/cards";
import { artists } from "../data/artists";
import type { Soldier } from "../types/Squad";
import { breadcrumbSchema, squadOrganizationSchema } from "@/lib/schema";
import Breadcrumbs from "../components/Breadcrumbs";
import { cn } from "@/lib/utils";

const ADD_COMMUNITY_URL =
  "https://github.com/veintiuno-lat/veintiuno-website/issues/new?template=add-community.yml";

const ease = [0.22, 1, 0.36, 1] as const;

const mission = [
  { icon: GraduationCap, text: "Educación" },
  { icon: Wrench, text: "Recursos y tecnología" },
  { icon: Home, text: "Espacio comunitario" },
  { icon: Globe, text: "Conexión global" },
];

/** Soldier photo with an initial-letter gradient fallback (most soldier images are not uploaded yet). */
function SoldierAvatar({ soldier, className }: { soldier: Soldier; className?: string }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <span
      role='img'
      aria-label={soldier.username}
      className={cn(
        "flex items-center justify-center rounded-full bg-gradient-to-br from-bitcoin to-amber-300 font-display text-ink-950",
        className
      )}
    >
      {soldier.username.charAt(0).toUpperCase()}
    </span>
  ) : (
    <img
      src={soldier.profileImage}
      alt={soldier.username}
      loading='lazy'
      decoding='async'
      onError={() => setFailed(true)}
      className={cn("rounded-full object-cover", className)}
    />
  );
}

const fadeUp = (i: number) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, delay: (i % 4) * 0.06, ease },
});

const SquadPage: React.FC = () => {
  const { squadId } = useParams<{ squadId: string }>();
  const [hovered, setHovered] = useState<string | null>(null);

  const squad = getSquadById(squadId || "");

  if (!squad) {
    return (
      <section className='flex min-h-[80vh] items-center justify-center px-5 pt-28'>
        <div className='text-center'>
          <h1 className='display text-[clamp(2rem,10.5vw,3rem)] text-white md:text-7xl'>Squad no encontrado</h1>
          <p className='mt-4 text-gray-400'>El squad que buscás no existe.</p>
          <Link to='/army' className='btn btn-md btn-secondary mt-8'>
            <ArrowLeft className='h-4 w-4' /> Volver al ejército
          </Link>
        </div>
      </section>
    );
  }

  // Leader first
  const squadMembers = getSoldiersBySquad(squad.id).sort(
    (a, b) => Number(b.role === "Squad Leader") - Number(a.role === "Squad Leader")
  );
  const communityIds = squad.communities ?? [];
  const assignedCommunities = getCommunitiesByIds(communityIds);
  const communityCards = cards.filter((card) => communityIds.includes(card.communityId));
  const cardArtistIds = new Set(communityCards.map((card) => card.artist));
  const squadArtists = artists.filter((artist) => cardArtistIds.has(artist.id));

  const crumbs = [
    { name: "Inicio", url: "/" },
    { name: "Ejército", url: "/army" },
    { name: squad.name, url: `/squad/${squad.id}` },
  ];

  return (
    <>
      <SEOHead
        title={`${squad.name} · Squad · Veintiuno`}
        description={`Conocé al squad ${squad.name}: ${squad.soldiers} soldados liderados por ${squad.leader}. Parte del ejército Veintiuno por toda Latinoamérica.`}
        keywords={[
          squad.name,
          "squad bitcoin",
          "ejército veintiuno",
          "cruzada bitcoiner",
        ]}
        url={`/squad/${squad.id}`}
        image={`/og/squad/${squad.id}.jpg`}
        type='website'
        jsonLd={[squadOrganizationSchema(squad), breadcrumbSchema(crumbs)]}
      />

      <div className='relative'>
        <PageHero
          badge='Squad'
          title={squad.name}
          subtitle={squad.description}
          className='pt-36'
          icon={
            <div className='relative'>
              <div aria-hidden='true' className='absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgba(247,147,26,0.4),transparent)]' />
              <img
                src={squad.profileImage}
                alt={squad.name}
                className='relative h-28 w-28 rounded-full object-cover ring-2 ring-bitcoin shadow-glow-lg md:h-36 md:w-36'
              />
            </div>
          }
          stats={[
            { value: <span className='text-xl sm:text-3xl md:text-4xl'>{squad.leader}</span>, label: "Líder" },
            { value: <AnimatedCounter to={squadMembers.length} />, label: "Soldados" },
          ]}
        >
          <a href='#miembros' className='btn btn-md btn-primary !text-ink-950'>
            Ver miembros
          </a>
          <Link to='/army' className='btn btn-md btn-secondary'>
            <ArrowLeft className='h-4 w-4' /> Volver al ejército
          </Link>
        </PageHero>
        <div className='absolute inset-x-0 top-24 z-10 mx-auto max-w-7xl px-5 md:px-8'>
          <Breadcrumbs items={crumbs} />
        </div>
      </div>

      {/* About */}
      <section className='py-24 md:py-32'>
        <div className='mx-auto grid grid-cols-1 max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2'>
          <motion.div {...fadeUp(0)}>
            <div className='eyebrow mb-5'>Sobre el squad</div>
            <h2 className='display text-[clamp(2rem,10.5vw,3rem)] text-white md:text-6xl'>La misión</h2>
            <p className='mt-6 text-lg leading-relaxed text-gray-300'>
              {squad.name} es parte del ejército Veintiuno: {squadMembers.length} soldados liderados por{" "}
              <span className='font-semibold text-white'>{squad.leader}</span>
              {assignedCommunities.length > 0 && <> que acompañan a {assignedCommunities.length} comunidades de la cruzada</>}.
            </p>
          </motion.div>
          <div className='grid grid-cols-2 gap-4'>
            {mission.map((item, i) => (
              <motion.div key={item.text} {...fadeUp(i)} className='surface p-6'>
                <item.icon className='h-6 w-6 text-bitcoin' strokeWidth={1.75} />
                <div className='mt-4 font-semibold text-white'>{item.text}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Members */}
      <section id='miembros' className='scroll-mt-24 py-24 md:py-32'>
        <div className='mx-auto max-w-7xl px-5 md:px-8'>
          <SectionHeader eyebrow='Miembros' title='Los soldados' description={`${squadMembers.length} soldados que forman ${squad.name}.`} />
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {squadMembers.map((member, i) => {
              const leader = member.role === "Squad Leader";
              const RoleIcon = leader ? Sword : Shield;
              return (
                <motion.div key={member.id} {...fadeUp(i)}>
                  <Link
                    to={`/soldier/${member.id}`}
                    className='surface surface-hover group flex h-full flex-col items-center p-6 text-center hover:-translate-y-1'
                  >
                    <SoldierAvatar
                      soldier={member}
                      className={cn(
                        "h-24 w-24 text-4xl ring-2 transition duration-500 group-hover:scale-105 group-hover:shadow-glow",
                        leader ? "ring-bitcoin" : "ring-white/10"
                      )}
                    />
                    <h3 className='mt-4 text-lg font-bold text-white transition-colors group-hover:text-bitcoin'>{member.username}</h3>
                    <div className='mt-1 flex items-center gap-1.5 text-sm text-gray-400'>
                      <RoleIcon className='h-4 w-4 text-bitcoin' strokeWidth={1.75} />
                      {leader ? "Líder" : "Soldado"}
                      <span className={`fi fi-${member.country} ml-1 rounded-[2px]`} aria-hidden='true' />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Supported communities + map */}
      {assignedCommunities.length > 0 && (
        <section className='py-24 md:py-32'>
          <div className='mx-auto max-w-7xl px-5 md:px-8'>
            <SectionHeader
              eyebrow='Comunidades apoyadas'
              title='Dónde opera'
              description='Las comunidades de la cruzada que este squad acompaña.'
            />
            <div className='grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]'>
              <div className='grid grid-cols-1 content-start gap-5 sm:grid-cols-2 lg:grid-cols-1'>
                {assignedCommunities.map((community, i) => (
                  <motion.div key={community.id} {...fadeUp(i)}>
                    <CommunityCard community={community} onHover={setHovered} />
                  </motion.div>
                ))}
              </div>
              <CommunityMap
                points={assignedCommunities.map((c) => ({
                  id: c.id,
                  lat: c.latitude,
                  lng: c.longitude,
                  title: c.title,
                  subtitle: `${c.city}, ${c.country}`,
                  image: c.avatarImage,
                  href: `/community/${c.id}`,
                }))}
                highlightId={hovered}
                className='h-[28rem] lg:h-full lg:min-h-[28rem]'
              />
            </div>
          </div>
        </section>
      )}

      {/* Cards */}
      {communityCards.length > 0 && (
        <section className='py-24 md:py-32'>
          <div className='mx-auto max-w-7xl px-5 md:px-8'>
            <SectionHeader
              eyebrow='Tarjetas'
              title='Arte de sus comunidades'
              description='Tarjetas coleccionables creadas para las comunidades que apoya este squad.'
              link={{ to: "/cards", label: "Ver todas" }}
            />
            <div className='columns-1 gap-5 sm:columns-2 lg:columns-3'>
              {communityCards.map((card, i) => (
                <motion.div key={card.id} {...fadeUp(i)} className='mb-5 break-inside-avoid'>
                  <Link to={`/card/${card.id}`} className='group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bitcoin'>
                    <HoloCard
                      src={card.imageUrl}
                      alt={card.title || `${card.communityName} - ${card.number}`}
                      orientation={card.orientation}
                    />
                    <div className='mt-3 flex items-center justify-between gap-3 px-1 text-sm'>
                      <span className='truncate font-semibold text-white transition-colors group-hover:text-bitcoin'>{card.communityName}</span>
                      <span className='shrink-0 text-gray-500'>
                        #{card.number} · @{card.artist}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Artists */}
      {squadArtists.length > 0 && (
        <section className='py-24 md:py-32'>
          <div className='mx-auto max-w-7xl px-5 md:px-8'>
            <SectionHeader eyebrow='Artistas' title='Quienes las dibujaron' link={{ to: "/artists", label: "Ver artistas" }} />
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
              {squadArtists.map((artist, i) => (
                <motion.div key={artist.id} {...fadeUp(i)}>
                  <Link to={`/artist/${artist.id}`} className='surface surface-hover group flex items-center gap-4 rounded-2xl p-3 pr-4'>
                    <img
                      src={artist.profileImage}
                      alt={artist.username}
                      loading='lazy'
                      decoding='async'
                      className='h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-white/10'
                    />
                    <div className='min-w-0 flex-1'>
                      <div className='truncate font-semibold text-white transition-colors group-hover:text-bitcoin'>{artist.username}</div>
                      <div className='flex items-center gap-1.5 text-sm text-gray-400'>
                        <span className={`fi fi-${artist.country} rounded-[2px]`} aria-hidden='true' />
                        {artist.completedCards}/{artist.totalCards} tarjetas
                      </div>
                    </div>
                    <ArrowUpRight className='h-4 w-4 shrink-0 text-gray-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bitcoin' />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title='¿Falta tu comunidad?'
        description='Si conocés una comunidad Bitcoin only que debería estar acá, compartila con nosotros.'
        action={{ label: "Agregá la comunidad", href: ADD_COMMUNITY_URL, external: true }}
      />
    </>
  );
};

export default SquadPage;
