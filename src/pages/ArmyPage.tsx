import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Shield, Sword } from "lucide-react";
import SEOHead from "../components/seo/SEOHead";
import PageHero from "../components/layout/PageHero";
import { SectionHeader } from "../components/ui/Section";
import { CommunityAvatar } from "../components/cards/CommunityCard";
import { AnimatedCounter } from "../components/motion";
import { squads, getSquadById } from "../data/squads";
import { soldiers, getSoldiersBySquad } from "../data/soldiers";
import { getCommunitiesByIds } from "../data/communities";
import type { Soldier, Squad } from "../types/Squad";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const supportedCommunityCount = new Set(squads.flatMap((s) => s.communities ?? [])).size;

const roleFilters = [
  { id: "all", label: "Todos" },
  { id: "squad leader", label: "Líderes" },
  { id: "soldier", label: "Soldados" },
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

const SquadCard: React.FC<{ squad: Squad }> = ({ squad }) => {
  const members = getSoldiersBySquad(squad.id);
  const supported = getCommunitiesByIds(squad.communities ?? []);

  return (
    <Link to={`/squad/${squad.id}`} className='surface surface-hover group block h-full overflow-hidden hover:-translate-y-1'>
      {/* Blurred banner from the squad avatar */}
      <div className='relative h-28 overflow-hidden'>
        <img
          src={squad.profileImage}
          alt=''
          loading='lazy'
          decoding='async'
          className='h-full w-full scale-150 object-cover opacity-50 blur-2xl transition duration-700 group-hover:scale-[1.8] group-hover:opacity-70'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent' />
        <ArrowUpRight className='absolute right-4 top-4 h-5 w-5 text-gray-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bitcoin' />
      </div>

      <div className='relative px-6 pb-6'>
        <img
          src={squad.profileImage}
          alt={squad.name}
          loading='lazy'
          decoding='async'
          className='-mt-12 h-24 w-24 rounded-full object-cover ring-4 ring-ink-950 transition duration-500 group-hover:scale-105 group-hover:shadow-glow'
        />
        <h3 className='display mt-4 text-3xl text-white transition-colors group-hover:text-bitcoin'>{squad.name}</h3>
        <p className='mt-2 flex items-center gap-1.5 text-sm text-gray-400'>
          <Sword className='h-4 w-4 text-bitcoin' strokeWidth={1.75} />
          Líder <span className='font-medium text-gray-200'>{squad.leader}</span>
        </p>
        {squad.description && <p className='mt-4 line-clamp-2 text-sm leading-relaxed text-gray-400'>{squad.description}</p>}

        <div className='mt-6 grid grid-cols-2 gap-4 border-t border-white/[0.07] pt-5'>
          <div>
            <div className='text-[11px] uppercase tracking-[0.18em] text-gray-500'>Soldados</div>
            <div className='mt-2 flex items-center gap-2'>
              <div className='flex -space-x-2'>
                {members.slice(0, 4).map((m) => (
                  <SoldierAvatar key={m.id} soldier={m} className='h-8 w-8 text-xs ring-2 ring-ink-900' />
                ))}
              </div>
              <span className='font-display text-xl text-white'>{members.length}</span>
            </div>
          </div>
          <div>
            <div className='text-[11px] uppercase tracking-[0.18em] text-gray-500'>Comunidades</div>
            <div className='mt-2 flex items-center gap-2'>
              {supported.length > 0 && (
                <div className='flex -space-x-2'>
                  {supported.slice(0, 3).map((c) => (
                    <CommunityAvatar key={c.id} community={c} className='h-8 w-8 text-xs' />
                  ))}
                </div>
              )}
              <span className='font-display text-xl text-white'>{supported.length}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const ArmyPage: React.FC = () => {
  const [selectedSquad, setSelectedSquad] = useState<string>("all");
  const [selectedRole, setSelectedRole] = useState<string>("all");

  const filteredSquads = selectedSquad === "all" ? squads : squads.filter((squad) => squad.id === selectedSquad);

  const filteredSatellites =
    selectedRole === "all"
      ? soldiers
      : soldiers.filter((soldier) => soldier.role.toLowerCase().includes(selectedRole));

  return (
    <>
      <SEOHead
        title='El Ejército · Veintiuno'
        description='Conocé los squads y soldados del ejército Veintiuno: la red de organizadores que impulsa la cruzada bitcoiner por toda Latinoamérica.'
        keywords={[
          "ejército veintiuno",
          "cruzada bitcoiner",
          "organizadores bitcoin",
          "squads bitcoin",
          "veintiuno",
        ]}
        url='/army'
      />

      <PageHero
        badge='El Ejército'
        title='El Ejército'
        subtitle='Conocé los squads y satélites del ejército Veintiuno: la red de organizadores que impulsa la cruzada bitcoiner por toda Latinoamérica.'
        image='/images/layout-images/army-bg.png'
        size='lg'
        stats={[
          { value: <AnimatedCounter to={squads.length} />, label: "Squads" },
          { value: <AnimatedCounter to={soldiers.length} />, label: "Soldados" },
          { value: <AnimatedCounter to={supportedCommunityCount} />, label: "Comunidades apoyadas" },
        ]}
      >
        <a href='#squads' className='btn btn-md btn-primary !text-ink-950'>
          Ver squads <ArrowDown className='h-4 w-4' />
        </a>
        <Link to='/contact' className='btn btn-md btn-secondary'>
          Sumate al ejército
        </Link>
      </PageHero>

      {/* Squads */}
      <section id='squads' className='relative scroll-mt-24 overflow-x-clip py-24 md:py-32'>
        <div aria-hidden='true' className='absolute left-1/2 top-40 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(247,147,26,0.06),transparent)]' />
        <div className='mx-auto max-w-7xl px-5 md:px-8'>
          <SectionHeader
            eyebrow='Squads'
            title='Los escuadrones'
            description='Escuadrones especializados que acompañan a las comunidades de la cruzada en cada rincón de la región.'
          />

          <div className='-mx-5 mb-10 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0'>
            <button
              onClick={() => setSelectedSquad("all")}
              aria-pressed={selectedSquad === "all"}
              className={cn("chip shrink-0", selectedSquad === "all" && "chip-active")}
            >
              Todos <span className='text-xs text-gray-400'>{squads.length}</span>
            </button>
            {squads.map((squad) => (
              <button
                key={squad.id}
                onClick={() => setSelectedSquad(selectedSquad === squad.id ? "all" : squad.id)}
                aria-pressed={selectedSquad === squad.id}
                className={cn("chip shrink-0", selectedSquad === squad.id && "chip-active")}
              >
                <img src={squad.profileImage} alt='' loading='lazy' decoding='async' className='h-5 w-5 rounded-full object-cover' />
                {squad.name}
              </button>
            ))}
          </div>

          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
            {filteredSquads.map((squad, i) => (
              <motion.div
                key={squad.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease }}
              >
                <SquadCard squad={squad} />
              </motion.div>
            ))}
          </div>

          {filteredSquads.length === 0 && (
            <p className='surface px-6 py-16 text-center text-gray-400'>No se encontraron squads con los filtros seleccionados.</p>
          )}
        </div>
      </section>

      {/* Satellites */}
      <section className='relative border-t border-white/[0.06] py-24 md:py-32'>
        <div className='mx-auto max-w-7xl px-5 md:px-8'>
          <SectionHeader
            eyebrow='Satélites'
            title='Cada soldado cuenta'
            description='Especialistas que apoyan la misión desde cada país.'
          />

          <div className='mb-8 flex flex-wrap gap-2'>
            {roleFilters.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedRole(r.id)}
                aria-pressed={selectedRole === r.id}
                className={cn("chip", selectedRole === r.id && "chip-active")}
              >
                {r.label}
              </button>
            ))}
          </div>

          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {filteredSatellites.map((satellite, i) => {
              const leader = satellite.role === "Squad Leader";
              const RoleIcon = leader ? Sword : Shield;
              return (
                <motion.div
                  key={satellite.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i % 4) * 0.05, ease }}
                >
                  <Link
                    to={`/soldier/${satellite.id}`}
                    className='surface surface-hover group flex items-center gap-3 rounded-2xl p-3 pr-4'
                  >
                    <SoldierAvatar
                      soldier={satellite}
                      className={cn("h-11 w-11 shrink-0 text-lg", leader && "ring-2 ring-bitcoin/70")}
                    />
                    <div className='min-w-0 flex-1'>
                      <div className='truncate font-semibold text-white transition-colors group-hover:text-bitcoin'>
                        {satellite.username}
                      </div>
                      <div className='flex items-center gap-1 truncate text-xs text-gray-400'>
                        <RoleIcon className='h-3.5 w-3.5 shrink-0 text-bitcoin' strokeWidth={1.75} />
                        <span className='truncate'>
                          {leader ? "Líder" : "Soldado"} · {getSquadById(satellite.squadId)?.name ?? satellite.squadId}
                        </span>
                      </div>
                    </div>
                    <span className={`fi fi-${satellite.country} shrink-0 rounded-[2px]`} aria-hidden='true' />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {filteredSatellites.length === 0 && (
            <p className='surface px-6 py-16 text-center text-gray-400'>No se encontraron satélites con los filtros seleccionados.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default ArmyPage;
