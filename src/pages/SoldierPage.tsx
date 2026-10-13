import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Github, Instagram, Shield, Sword } from "lucide-react";
import SEOHead from "../components/seo/SEOHead";
import { getSoldierById, getSoldiersBySquad } from "../data/soldiers";
import { getSquadById } from "../data/squads";
import { getCommunitiesByIds } from "../data/communities";
import type { Soldier } from "../types/Squad";
import { breadcrumbSchema, soldierPersonSchema } from "@/lib/schema";
import Breadcrumbs from "../components/Breadcrumbs";
import CommunityCard from "../components/cards/CommunityCard";
import { SectionHeader } from "../components/ui/Section";
import { NostrIcon } from "../components/icons/nostr";
import { X as XIcon } from "../components/icons/x";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const socials = [
  { key: "website", label: "Website", Icon: ExternalLink },
  { key: "instagram", label: "Instagram", Icon: Instagram },
  { key: "twitter", label: "Twitter X", Icon: XIcon },
  { key: "nostr", label: "Nostr", Icon: NostrIcon },
  { key: "github", label: "Github", Icon: Github },
] as const;

/** Soldier photo with an initial-letter gradient fallback (most soldier images are not uploaded yet). */
function SoldierAvatar({ soldier, className, eager }: { soldier: Soldier; className?: string; eager?: boolean }) {
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
      loading={eager ? undefined : "lazy"}
      decoding='async'
      onError={() => setFailed(true)}
      className={cn("rounded-full object-cover", className)}
    />
  );
}

const SoldierPage: React.FC = () => {
  const { soldierId } = useParams<{ soldierId: string }>();

  const soldier = getSoldierById(soldierId || "");

  if (!soldier) {
    return (
      <section className='flex min-h-[80vh] items-center justify-center px-5 pt-28'>
        <div className='text-center'>
          <h1 className='display text-[clamp(2rem,10.5vw,3rem)] text-white md:text-7xl'>Soldado no encontrado</h1>
          <p className='mt-4 text-gray-400'>El soldado que buscás no existe.</p>
          <Link to='/army' className='btn btn-md btn-secondary mt-8'>
            <ArrowLeft className='h-4 w-4' /> Volver al ejército
          </Link>
        </div>
      </section>
    );
  }

  const squad = getSquadById(soldier.squadId);
  const squadMembers = squad ? getSoldiersBySquad(squad.id) : [];
  const supportedCommunities = squad?.communities ? getCommunitiesByIds(squad.communities) : [];
  const leader = soldier.role === "Squad Leader";
  const RoleIcon = leader ? Sword : Shield;
  const links = socials.filter((s) => soldier.socialLinks?.[s.key]);

  const crumbs = [
    { name: "Inicio", url: "/" },
    { name: "Ejército", url: "/army" },
    { name: soldier.username, url: `/soldier/${soldier.id}` },
  ];

  return (
    <>
      <SEOHead
        title={`${soldier.username} · Soldado · Veintiuno`}
        description={`Conocé a ${soldier.username}, ${soldier.role} del ejército Veintiuno en ${soldier.countryName}. La cruzada bitcoiner por toda Latinoamérica.`}
        keywords={[soldier.username, "soldado bitcoin", "ejército veintiuno", "cruzada bitcoiner", soldier.countryName.toLowerCase()]}
        url={`/soldier/${soldier.id}`}
        image={`/og/soldier/${soldier.id}.jpg`}
        type="website"
        jsonLd={[soldierPersonSchema(soldier), breadcrumbSchema(crumbs)]}
      />

      {/* Profile header */}
      <section className='relative isolate overflow-hidden pb-16 pt-28 md:pb-24'>
        <div aria-hidden='true' className='absolute -left-40 -top-40 -z-10 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(247,147,26,0.12),transparent)]' />
        <div
          aria-hidden='true'
          className='grid-lines grain absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_30%_40%,black_20%,transparent_75%)]'
        />
        <div className='mx-auto max-w-7xl px-5 md:px-8'>
          <Breadcrumbs items={crumbs} />

          <div className='mt-12 flex flex-col items-center gap-10 text-center md:flex-row md:items-center md:text-left'>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease }}
              className='relative shrink-0'
            >
              <div aria-hidden='true' className='absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgba(247,147,26,0.5),transparent)]' />
              <SoldierAvatar
                soldier={soldier}
                eager
                className='relative h-40 w-40 text-7xl ring-4 ring-bitcoin shadow-glow-lg md:h-52 md:w-52 md:text-8xl'
              />
              <span
                className={`fi fi-${soldier.country} absolute bottom-2 right-2 rounded-[3px] text-3xl shadow-lg ring-2 ring-ink-950 md:bottom-4 md:right-4`}
                aria-hidden='true'
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease }}
              className='min-w-0'
            >
              <div className='eyebrow mb-5'>
                <RoleIcon className='h-3.5 w-3.5' />
                {leader ? "Líder de squad" : "Soldado"}
              </div>
              <h1 className='display break-words text-6xl text-white md:text-8xl'>{soldier.username}</h1>
              <p className='mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-gray-400 md:justify-start'>
                <span className='inline-flex items-center gap-2 capitalize'>
                  <span className={`fi fi-${soldier.country} rounded-[2px]`} aria-hidden='true' />
                  {soldier.countryName}
                </span>
                {squad && (
                  <>
                    <span aria-hidden='true'>·</span>
                    <Link to={`/squad/${squad.id}`} className='font-semibold text-bitcoin hover:text-glow'>
                      {squad.name}
                    </Link>
                  </>
                )}
              </p>

              {links.length > 0 && (
                <div className='mt-7 flex flex-wrap justify-center gap-3 md:justify-start'>
                  {links.map(({ key, label, Icon }) => (
                    <a
                      key={key}
                      href={soldier.socialLinks![key]}
                      target='_blank'
                      rel='noopener noreferrer'
                      title={label}
                      aria-label={label}
                      className='flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-gray-200 transition hover:-translate-y-0.5 hover:border-bitcoin hover:text-bitcoin hover:shadow-glow'
                    >
                      <Icon className='h-5 w-5' />
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bio + squad */}
      <section className='pb-24 md:pb-32'>
        <div className='mx-auto grid grid-cols-1 max-w-7xl gap-5 px-5 md:px-8 lg:grid-cols-[1.5fr_1fr]'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease }}
            className='surface p-8 md:p-10'
          >
            <div className='eyebrow mb-6'>Bio</div>
            <p className='text-lg leading-relaxed text-gray-300'>
              {soldier.bio ||
                `${soldier.username} es un soldado especializado en el ejército Veintiuno, contribuyendo con su experiencia y dedicación a la misión de promover Bitcoin en América Latina.`}
            </p>
          </motion.div>

          {squad && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.08, ease }}
            >
              <Link to={`/squad/${squad.id}`} className='surface surface-hover group block h-full overflow-hidden hover:-translate-y-1'>
                <div className='relative h-24 overflow-hidden'>
                  <img
                    src={squad.profileImage}
                    alt=''
                    loading='lazy'
                    decoding='async'
                    className='h-full w-full scale-150 object-cover opacity-50 blur-2xl transition duration-700 group-hover:scale-[1.8] group-hover:opacity-70'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent' />
                </div>
                <div className='relative px-6 pb-6'>
                  <img
                    src={squad.profileImage}
                    alt={squad.name}
                    loading='lazy'
                    decoding='async'
                    className='-mt-10 h-20 w-20 rounded-full object-cover ring-4 ring-ink-950 transition duration-500 group-hover:scale-105 group-hover:shadow-glow'
                  />
                  <div className='mt-4 text-[11px] uppercase tracking-[0.18em] text-gray-500'>Su squad</div>
                  <h2 className='display mt-1 text-3xl text-white transition-colors group-hover:text-bitcoin'>{squad.name}</h2>
                  <p className='mt-2 flex items-center gap-1.5 text-sm text-gray-400'>
                    <Sword className='h-4 w-4 text-bitcoin' strokeWidth={1.75} />
                    Líder <span className='font-medium text-gray-200'>{squad.leader}</span>
                  </p>
                  <div className='mt-6 flex items-center justify-between border-t border-white/[0.07] pt-5'>
                    <div className='flex items-center gap-2'>
                      <div className='flex -space-x-2'>
                        {squadMembers.slice(0, 5).map((m) => (
                          <SoldierAvatar key={m.id} soldier={m} className='h-8 w-8 text-xs ring-2 ring-ink-900' />
                        ))}
                      </div>
                      <span className='text-sm text-gray-400'>{squadMembers.length} soldados</span>
                    </div>
                    <span className='inline-flex items-center gap-1 text-sm font-semibold text-bitcoin'>
                      Ver squad <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Supported communities */}
      <section className='border-t border-white/[0.06] py-24 md:py-32'>
        <div className='mx-auto max-w-7xl px-5 md:px-8'>
          <SectionHeader
            eyebrow='Comunidades apoyadas'
            title='Por quién pelea'
            description={squad ? `Las comunidades que acompaña ${squad.name}.` : undefined}
          />
          {supportedCommunities.length > 0 ? (
            <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {supportedCommunities.map((community, i) => (
                <motion.div
                  key={community.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease }}
                >
                  <CommunityCard community={community} />
                </motion.div>
              ))}
            </div>
          ) : (
            <p className='surface px-6 py-16 text-center text-gray-400'>
              Este soldado no tiene comunidades asignadas actualmente.
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default SoldierPage;
