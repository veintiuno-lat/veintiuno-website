import React from "react";
import { Heart, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { NostrIcon } from "../icons/nostr";
import { X } from "../icons/x";
import { Github } from "../icons/github";

import { countries } from "../../data/countries";
import { communities } from "../../data/communities";

const counts = communities.reduce<Record<string, number>>((acc, c) => {
  acc[c.country] = (acc[c.country] ?? 0) + 1;
  return acc;
}, {});

const columns = [
  {
    title: "Explorar",
    links: [
      { name: "Comunidades", to: "/communities" },
      { name: "Meetups", to: "/meetups" },
      { name: "Tarjetas", to: "/cards" },
      { name: "Artistas", to: "/artists" },
      { name: "Guías", to: "/guias" },
    ],
  },
  {
    title: "Misión",
    links: [
      { name: "Nodos", to: "/mission/nodes" },
      { name: "Comercios", to: "/mission/merchants" },
      { name: "Auto custodia", to: "/mission/self-custody" },
      { name: "Stack", to: "/mission/stack" },
    ],
  },
  {
    title: "Nosotros",
    links: [
      { name: "Army", to: "/army" },
      { name: "Quiénes somos", to: "/sobre-nosotros" },
      { name: "Apoyar", to: "/#support" },
    ],
  },
];

const socials = [
  { href: "https://twitter.com/veintiunolat", label: "X", icon: <X className='h-5 w-5' /> },
  {
    href: "https://njump.me/npub1lf9fja3zalzrxe3y60hv7eaf348a7zz6spmt6nd2s8ttmms6ms5sa73gcz",
    label: "Nostr",
    icon: <NostrIcon className='h-5 w-5' />,
  },
  { href: "https://github.com/veintiuno-lat", label: "GitHub", icon: <Github className='h-6 w-6' /> },
];

const Footer: React.FC = () => {
  return (
    <footer className='relative overflow-hidden border-t border-white/[0.06] bg-ink-950'>
      <div aria-hidden='true' className='absolute -bottom-64 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(247,147,26,0.1),transparent)]' />

      <div className='relative mx-auto max-w-7xl px-5 pt-20 md:px-8'>
        <div className='grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_2fr]'>
          <div>
            <p className='display text-4xl text-white md:text-5xl'>
              Bitcoin se construye <span className='text-gradient'>en comunidad</span>
            </p>
            <p className='mt-5 max-w-sm text-gray-400'>
              Mapeamos, conectamos y apoyamos a las comunidades bitcoiners de Latinoamérica.
            </p>
            <a
              href='https://github.com/veintiuno-lat/veintiuno-website/issues/new?template=add-community.yml'
              target='_blank'
              rel='noopener noreferrer'
              className='btn btn-sm btn-secondary mt-8'
            >
              Sumá tu comunidad <ArrowUpRight className='h-4 w-4' />
            </a>
          </div>
          <div className='grid grid-cols-2 gap-8 sm:grid-cols-3'>
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className='mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500'>{col.title}</h2>
                <ul className='space-y-2.5'>
                  {col.links.map((l) => (
                    <li key={l.to}>
                      <Link to={l.to} className='text-gray-300 transition-colors hover:text-bitcoin'>
                        {l.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Country grid — distributes link equity across all /pais/* and gives
            crawlers an obvious entry point to every country landing page. */}
        <nav aria-label='Bitcoin por país' className='mt-16 border-t border-white/[0.06] pt-10'>
          <h2 className='mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500'>Bitcoin por país</h2>
          <ul className='flex flex-wrap gap-2'>
            {countries.map((c) => (
              <li key={c.slug}>
                <Link to={`/pais/${c.slug}`} className='chip text-[13px]'>
                  <span className={`fi fi-${c.code.toLowerCase()} rounded-sm`} aria-hidden='true' />
                  <span>Bitcoin {c.name}</span>
                  {counts[c.name] && <span className='text-xs text-bitcoin'>{counts[c.name]}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Giant wordmark */}
        <div aria-hidden='true' className='display pointer-events-none mt-16 select-none whitespace-nowrap text-center text-[17vw] leading-[0.8] text-transparent [-webkit-text-stroke:1px_rgba(247,147,26,0.25)] md:text-[15vw]'>
          VEINTIUNO
        </div>

        <div className='flex flex-col items-center justify-between gap-6 border-t border-white/[0.06] py-8 text-sm text-gray-500 md:flex-row'>
          <div className='flex flex-wrap items-center justify-center gap-x-3'>
            <span>© {new Date().getFullYear()} VEINTIUNO.LAT</span>
            <span aria-hidden='true'>·</span>
            <span>
              Creado en{" "}
              <a href='https://mempool.space/block/900285' target='_blank' rel='noopener noreferrer' className='font-mono text-bitcoin hover:text-glow'>
                #900.285
              </a>
            </span>
          </div>
          <div className='flex items-center gap-2'>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={s.label}
                className='flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-300 transition hover:border-bitcoin hover:text-bitcoin'
              >
                {s.icon}
              </a>
            ))}
          </div>
          <div className='flex items-center gap-2'>
            <span>Hecho con</span>
            <Heart className='h-4 w-4 fill-current text-bitcoin' />
            <span>por</span>
            <a href='https://lacrypta.ar' target='_blank' rel='noopener noreferrer'>
              <img src='/images/sponsors/lacrypta-logo.png' alt='La Crypta' className='h-6 w-auto brightness-0 invert' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
