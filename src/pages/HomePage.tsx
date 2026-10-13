import React, { useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowDown, ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

import { useAnalytics } from "../hooks/use-analytics";

import SEOHead from "../components/seo/SEOHead";
import { Video } from "../components/video";
import Roadmap from "../components/Roadmap";
import { Donate } from "../components/icons/donate";
import { Reveal, AnimatedCounter, Marquee, SplitText } from "../components/motion";
import ShaderBackdrop from "../components/three/ShaderBackdrop";
import Globe from "../components/three/Globe";
import type { GlobePoint } from "../components/three/types";
import CommunityCard, { CommunityAvatar, Flag } from "../components/cards/CommunityCard";
import HoloCard from "../components/cards/HoloCard";
import { SectionHeader } from "../components/ui/Section";

import { communities } from "../data/communities";
import { countries } from "../data/countries";
import { soldiers } from "../data/soldiers";
import { cards } from "../data/cards";

const homeKeywords = [
  "bitcoin latinoamerica",
  "comunidades bitcoin",
  "bitcoin argentina",
  "bitcoin LATAM",
  "veintiuno",
  "veintiuno lat",
  "meetups bitcoin",
  "cruzada bitcoiner",
  "lightning network",
  "nodos bitcoin",
];

const sponsors = [
  { href: "https://getalby.com/", src: "/images/sponsors/alby-logo.png", alt: "Alby Hub", h: "h-14" },
  { href: "https://www.bullbitcoin.com/", src: "/images/sponsors/bull-bitcoin-logo.png", alt: "Bull Bitcoin", h: "h-10" },
  { href: "https://einundzwanzig.space/", src: "/images/sponsors/einundzwanzig-logo.png", alt: "Einundzwanzig", h: "h-5" },
  { href: "https://lawallet.io", src: "/images/sponsors/lawallet-logo.png", alt: "LaWallet", h: "h-6" },
  { href: "https://lacrypta.ar", src: "/images/sponsors/lacrypta-logo.png", alt: "La Crypta", h: "h-6" },
];

const ADD_COMMUNITY_URL =
  "https://github.com/veintiuno-lat/veintiuno-website/issues/new?template=add-community.yml";

const ease = [0.22, 1, 0.36, 1] as const;

// Countries that have communities, biggest first.
const countryGroups = countries
  .map((c) => ({ country: c, items: communities.filter((m) => m.country === c.name) }))
  .filter((g) => g.items.length)
  .sort((a, b) => b.items.length - a.items.length);

const globePoints: GlobePoint[] = communities.map((c) => ({
  id: c.id,
  lat: c.latitude,
  lng: c.longitude,
  label: c.title,
  sublabel: c.city,
}));

const withImages = communities.filter((c) => c.backgroundImage && c.avatarImage);

// Floating photos in the hero: position, size and parallax depth.
const floaters = [
  { x: "4%", y: "16%", w: "w-28 md:w-44", depth: 0.9, r: -8 },
  { x: "80%", y: "12%", w: "w-24 md:w-36", depth: 0.5, r: 6 },
  { x: "12%", y: "68%", w: "w-24 md:w-32", depth: 0.35, r: 5 },
  { x: "84%", y: "62%", w: "w-28 md:w-48", depth: 1.1, r: -5 },
  { x: "66%", y: "82%", w: "w-20 md:w-28", depth: 0.6, r: 9 },
  { x: "26%", y: "6%", w: "w-16 md:w-24", depth: 0.25, r: -12 },
];

function FloatingPhoto({
  f,
  src,
  progress,
  mx,
  my,
}: {
  f: (typeof floaters)[number];
  src: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  mx: ReturnType<typeof useSpring>;
  my: ReturnType<typeof useSpring>;
}) {
  const y = useTransform(progress, [0, 1], [0, -600 * f.depth]);
  const px = useTransform(mx, (v) => v * 40 * f.depth);
  const py = useTransform(my, (v) => v * 40 * f.depth);
  return (
    <motion.div className={`absolute ${f.w}`} style={{ left: f.x, top: f.y, y }}>
      <motion.div
        style={{ x: px, y: py, rotate: f.r }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.4 + f.depth * 0.4, ease }}
        className='overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]'
      >
        <img src={src} alt='' className='aspect-[4/5] w-full object-cover opacity-80' />
        <div className='absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent' />
      </motion.div>
    </motion.div>
  );
}

function Hero({ onCta }: { onCta: (a: string, d: string) => void }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "25%"]);
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.85]);
  // Stay fully visible through the first ~45% of the hero scroll so the stats remain readable.
  const fade = useTransform(scrollYProgress, [0.45, 0.95], [1, reduce ? 1 : 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const mxRaw = useMotionValue(0);
  const myRaw = useMotionValue(0);
  const mx = useSpring(mxRaw, { stiffness: 60, damping: 20 });
  const my = useSpring(myRaw, { stiffness: 60, damping: 20 });

  return (
    <section
      ref={ref}
      // overflow-x-clip (not overflow-hidden): the parallaxed stats may drift past the hero's bottom edge while fading
      className='relative isolate flex min-h-[100svh] items-center overflow-x-clip'
      onPointerMove={(e) => {
        if (reduce) return;
        mxRaw.set(e.clientX / window.innerWidth - 0.5);
        myRaw.set(e.clientY / window.innerHeight - 0.5);
      }}
    >
      <ShaderBackdrop className='-z-20' />
      <div aria-hidden='true' className='grid-lines grain absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]' />

      {/* Parallax photo layer */}
      <div aria-hidden='true' className='pointer-events-none absolute inset-0 -z-10 hidden sm:block'>
        {floaters.map((f, i) => (
          <FloatingPhoto key={i} f={f} src={withImages[i % withImages.length].backgroundImage!} progress={scrollYProgress} mx={mx} my={my} />
        ))}
      </div>

      <motion.div style={{ y: titleY, scale: titleScale, opacity: fade }} className='relative mx-auto w-full max-w-6xl px-5 pt-28 pb-24 text-center'>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className='eyebrow mb-8'
        >
          <span className='relative flex h-2 w-2'>
            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-bitcoin opacity-75' />
            <span className='relative inline-flex h-2 w-2 rounded-full bg-bitcoin' />
          </span>
          Cruzada en marcha · Latinoamérica
        </motion.div>

        <h1 className='display text-[17vw] text-white sm:text-8xl md:text-[9rem] lg:text-[11rem]' aria-label='La Cruzada Bitcoiner'>
          <SplitText as='span' text='La Cruzada' className='block' delay={0.2} />
          <SplitText as='span' text='Bitcoiner' className='block text-gradient' wordClassName={() => "text-gradient"} delay={0.35} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease }}
          className='mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl'
        >
          <strong className='font-semibold text-white'>Comunidades Bitcoin en Latinoamérica</strong> — conectamos meetups,
          eventos y bitcoiners de toda la región. <span className='text-bitcoin'>Vamos a visitarlas con nuestro ejército.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease }}
          className='mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row'
        >
          <Link to='/communities' onClick={() => onCta("explore", "communities")} className='btn btn-md btn-primary !text-ink-950'>
            Ver comunidades <ArrowRight className='h-4 w-4' />
          </Link>
          <a href='#map' className='btn btn-md btn-secondary'>
            Explorar el mapa <ArrowDown className='h-4 w-4' />
          </a>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease }}
          className='mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4'
        >
          {[
            { to: communities.length, label: "Comunidades" },
            { to: countryGroups.length, label: "Países" },
            { to: soldiers.length, label: "Soldados" },
            { to: cards.length, label: "Tarjetas" },
          ].map((s) => (
            <div key={s.label} className='bg-ink-950/85 px-4 py-5'>
              <dd className='font-display text-4xl text-white md:text-5xl'>
                <AnimatedCounter to={s.to} />
              </dd>
              <dt className='mt-1 text-[11px] uppercase tracking-[0.2em] text-gray-400'>{s.label}</dt>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      <motion.div
        aria-hidden='true'
        style={{ opacity: cueOpacity }}
        className='pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-gray-500'
      >
        <span className='text-[10px] uppercase tracking-[0.3em]'>scroll</span>
        <div className='h-10 w-px bg-gradient-to-b from-bitcoin to-transparent animate-hero-pulse' />
      </motion.div>
      {/* Behind the content (-z-10) so the parallaxed stats don't sink into the fade */}
      <div aria-hidden='true' className='pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-ink-950' />
    </section>
  );
}

/** Globe + country index. Picking a country rotates the globe there. */
function MapSection({ onCta }: { onCta: (a: string, d: string) => void }) {
  const navigate = useNavigate();
  const [active, setActive] = useState<string | null>(null);
  const group = countryGroups.find((g) => g.country.name === active);
  const focus = useMemo(() => {
    if (!group) return null;
    const lat = group.items.reduce((s, c) => s + c.latitude, 0) / group.items.length;
    const lng = group.items.reduce((s, c) => s + c.longitude, 0) / group.items.length;
    return { lat, lng };
  }, [group]);

  return (
    <section id='map' className='relative overflow-hidden py-28 md:py-36'>
      <div aria-hidden='true' className='absolute left-1/2 top-1/3 -z-10 h-[50rem] w-[50rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(247,147,26,0.07),transparent)]' />
      <div className='mx-auto max-w-7xl px-5 md:px-8'>
        <SectionHeader
          eyebrow='El mapa'
          title='Una red viva de bitcoiners'
          description={
            <>
              {communities.length} comunidades en {countryGroups.length} países, conectadas por la misma idea. Girá el globo,
              elegí un país y descubrí quién está construyendo cerca tuyo.
            </>
          }
          link={{ to: "/communities", label: "Ver todas" }}
        />

        <div className='grid grid-cols-1 items-start gap-10 lg:grid-cols-[22rem_1fr]'>
          {/* Country index */}
          <div className='order-2 min-w-0 lg:order-1'>
            <div className='no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:block lg:space-y-1.5 lg:overflow-visible lg:px-0'>
              {countryGroups.map(({ country, items }) => {
                const isActive = active === country.name;
                return (
                  <button
                    key={country.slug}
                    onClick={() => setActive(isActive ? null : country.name)}
                    className={`group flex w-auto shrink-0 items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-300 lg:w-full ${
                      isActive
                        ? "border-bitcoin/60 bg-bitcoin/10 shadow-glow"
                        : "border-white/[0.06] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
                    }`}
                  >
                    <span className={`fi fi-${country.code.toLowerCase()} shrink-0 rounded-sm text-lg`} aria-hidden='true' />
                    <span className={`whitespace-nowrap font-medium ${isActive ? "text-white" : "text-gray-300"}`}>{country.name}</span>
                    <span className='ml-auto hidden -space-x-2 lg:flex'>
                      {items.slice(0, 3).map((c) => (
                        <CommunityAvatar key={c.id} community={c} className='h-6 w-6 text-[10px]' />
                      ))}
                    </span>
                    <span className={`ml-2 min-w-[1.75rem] rounded-full px-2 py-0.5 text-center text-xs font-bold ${isActive ? "bg-bitcoin text-ink-950" : "bg-white/10 text-gray-300"}`}>
                      {items.length}
                    </span>
                  </button>
                );
              })}
            </div>
            <a
              href={ADD_COMMUNITY_URL}
              target='_blank'
              rel='noopener noreferrer'
              onClick={() => onCta("contribute", "add-community")}
              className='mt-4 hidden w-full items-center gap-3 rounded-2xl border border-dashed border-white/15 px-4 py-3 text-sm text-gray-400 transition hover:border-bitcoin hover:text-bitcoin lg:flex'
            >
              <Plus className='h-4 w-4' /> ¿Falta tu comunidad? Sumala
            </a>
          </div>

          {/* Globe + selected country panel */}
          <div className='relative order-1 min-w-0 lg:order-2'>
            <Globe
              className='mx-auto aspect-square w-full max-w-[44rem]'
              points={globePoints}
              focus={focus}
              onSelect={(p) => navigate(`/community/${p.id}`)}
            />
            <p className='pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-gray-500 md:text-xs'>
              Arrastrá para girar · click para visitar
            </p>
            <motion.div
              key={active ?? "none"}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: group ? 1 : 0, y: group ? 0 : 16 }}
              transition={{ duration: 0.5, ease }}
              className='pointer-events-none mt-6 lg:absolute lg:bottom-12 lg:right-0 lg:mt-0 lg:w-80'
            >
              {group && (
                <div className='pointer-events-auto rounded-3xl border border-white/10 bg-ink-900/95 p-4'>
                  <div className='mb-3 flex items-center gap-2 px-1'>
                    <Flag country={group.country.name} />
                    <span className='font-semibold text-white'>{group.country.name}</span>
                    <Link to={`/pais/${group.country.slug}`} className='ml-auto inline-flex items-center gap-1 text-xs font-semibold text-bitcoin'>
                      Ver país <ArrowUpRight className='h-3 w-3' />
                    </Link>
                  </div>
                  <div className='max-h-72 space-y-2 overflow-y-auto' data-lenis-prevent>
                    {group.items.map((c) => (
                      <CommunityCard key={c.id} community={c} compact />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Vertical scroll drives a horizontal track of community cards. */
function CommunityRail() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-62%"]);

  return (
    <section ref={ref} className='relative h-[260vh]'>
      <div className='sticky top-0 flex h-screen flex-col justify-center overflow-hidden'>
        <div className='mx-auto w-full max-w-7xl px-5 md:px-8'>
          <SectionHeader eyebrow='Comunidades' title='Quiénes encienden la red' link={{ to: "/communities", label: "Explorar todas" }} className='!mb-10' />
        </div>
        <motion.div style={{ x }} className={`flex gap-5 pl-5 md:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] ${reduce ? "overflow-x-auto pb-4" : ""}`}>
          {withImages.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: (i % 6) * 0.06, ease }}
              className='w-[78vw] shrink-0 sm:w-[22rem]'
            >
              <CommunityCard community={c} />
            </motion.div>
          ))}
          <Link
            to='/communities'
            className='flex w-[78vw] shrink-0 flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-white/15 text-gray-400 transition hover:border-bitcoin hover:text-bitcoin sm:w-[22rem]'
          >
            <ArrowRight className='h-8 w-8' />
            <span className='font-semibold uppercase tracking-widest'>Ver las {communities.length}</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/** Fan of collectible cards that spreads as it scrolls into view. */
function CardsFan() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const spread = useSpring(useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0, 1]), { stiffness: 80, damping: 20 });
  const featured = cards.filter((c) => c.orientation !== "landscape").slice(0, 5);

  return (
    <section ref={ref} className='relative overflow-hidden py-28 md:py-36'>
      <div aria-hidden='true' className='absolute inset-x-0 top-1/2 -z-10 h-96 -translate-y-1/2 bg-gradient-to-r from-transparent via-bitcoin/10 to-transparent' />
      <div className='mx-auto max-w-7xl px-5 md:px-8'>
        <SectionHeader
          eyebrow='Arte coleccionable'
          title='Cada comunidad, cuatro obras'
          description='Artistas de la región ilustran a cada comunidad en 4 tarjetas NFC únicas. Coleccionalas, pagá con ellas, llevá la cruzada en el bolsillo.'
          align='center'
        />
        <div className='relative mx-auto flex h-[26rem] max-w-4xl items-center justify-center md:h-[32rem]'>
          {featured.map((card, i) => {
            const offset = i - (featured.length - 1) / 2;
            return (
              <FanCard key={card.id} offset={offset} spread={spread} z={10 - Math.abs(offset)}>
                <Link to={`/card/${card.id}`} aria-label={card.title ?? card.communityName}>
                  <HoloCard src={card.imageUrl} alt={card.title ?? card.communityName} className='w-40 md:w-56' />
                </Link>
              </FanCard>
            );
          })}
        </div>
        <div className='mt-6 flex justify-center gap-3'>
          <Link to='/cards' className='btn btn-md btn-primary !text-ink-950'>
            Ver colección <ArrowRight className='h-4 w-4' />
          </Link>
          <Link to='/artists' className='btn btn-md btn-secondary'>
            Artistas
          </Link>
        </div>
      </div>
    </section>
  );
}

function FanCard({
  offset,
  spread,
  z,
  children,
}: {
  offset: number;
  spread: ReturnType<typeof useSpring>;
  z: number;
  children: React.ReactNode;
}) {
  const x = useTransform(spread, [0, 1], [offset * 20, offset * 150]);
  const rotate = useTransform(spread, [0, 1], [offset * 2, offset * 9]);
  const y = useTransform(spread, [0, 1], [0, Math.abs(offset) * 26]);
  return (
    <motion.div className='absolute' style={{ x, y, rotate, zIndex: z }} whileHover={{ y: -24, zIndex: 20, transition: { duration: 0.3 } }}>
      {children}
    </motion.div>
  );
}

const HomePage: React.FC = () => {
  const { track } = useAnalytics();

  const handleCTAClick = (action: string, destination: string) => {
    track("cta_click", "Homepage", `${action} - ${destination}`);
  };

  return (
    <>
      <SEOHead
        title='Veintiuno · Comunidades Bitcoin en Latinoamérica'
        description='Conectamos las comunidades Bitcoin más vibrantes de Latinoamérica. Descubrí meetups, eventos, artistas y la cruzada bitcoiner regional.'
        keywords={homeKeywords}
        url='/'
        type='website'
      />

      <Hero onCta={handleCTAClick} />
      <MapSection onCta={handleCTAClick} />
      <CommunityRail />
      <CardsFan />

      {/* Video */}
      <section className='relative py-28 md:py-36'>
        <div className='mx-auto max-w-5xl px-5 md:px-8'>
          <SectionHeader eyebrow='En video' title='Mirá la cruzada' description='Historias, encuentros y movimiento en toda la región.' align='center' />
          <Reveal direction='up' distance={60}>
            <div className='relative rounded-[2rem] border border-white/10 bg-white/[0.03] p-2 shadow-glow md:p-3'>
              <div className='overflow-hidden rounded-[1.5rem]'>
                <Video id='PLZqwv9PvbwQ9bIrSBh_ijWBBItZbMGIRQ' />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Roadmap */}
      <section id='timeline' className='relative py-28 md:py-36'>
        <div className='mx-auto max-w-7xl px-5 md:px-8'>
          <SectionHeader
            eyebrow='Roadmap'
            title='La cadena de la cruzada'
            description='Cada mes es un bloque minado, cada hito una transacción confirmada.'
            align='center'
          />
        </div>
        <Roadmap />
      </section>

      {/* Support */}
      <section id='support' className='relative px-5 py-28 md:px-8 md:py-36'>
        <div className='relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-bitcoin/25 bg-gradient-to-b from-[#2a1500] to-ink-950 px-6 py-16 text-center md:px-16 md:py-24'>
          <div aria-hidden='true' className='absolute -top-48 left-1/2 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(247,147,26,0.3),transparent)]' />
          <div className='relative'>
            <div className='eyebrow mb-6'>Apoyá la cruzada</div>
            <SplitText text='Hacelo posible' className='display text-[clamp(2rem,10.5vw,3rem)] text-white md:text-7xl' />
            <p className='mx-auto mt-5 max-w-xl text-lg text-gray-300'>
              Cada sat financia viajes, hardware y tarjetas para que más comunidades crezcan.
            </p>
            <div className='mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row'>
              <a href='https://geyser.fund/project/cruzadaveintiuno' target='_blank' rel='noopener noreferrer' className='btn btn-md btn-primary !text-ink-950'>
                Donar en Geyser <Donate width={20} height={20} />
              </a>
              <a
                href='https://hub.angor.io/project/angor1q65fuwpyvek3fxk5p757zyknjd9k9sava3fd98j?network=main'
                target='_blank'
                rel='noopener noreferrer'
                className='btn btn-md btn-secondary'
              >
                Donar en Angor <Donate width={20} height={20} />
              </a>
            </div>
            <div className='mt-8 flex items-center justify-center gap-3'>
              <img src='/images/layout-images/donors.png' alt='Donantes' className='h-10 w-auto' />
              <span className='font-display text-2xl text-white'>
                <AnimatedCounter to={25} prefix='+' />
              </span>
              <span className='text-sm text-gray-400'>donantes</span>
            </div>

            <div className='mt-16 border-t border-white/10 pt-10'>
              <p className='mb-8 text-xs uppercase tracking-[0.25em] text-gray-500'>Sponsors que hacen posible la cruzada</p>
              <Marquee duration={35} gap='4.5rem'>
                {sponsors.map((s) => (
                  <a
                    key={s.alt}
                    href={s.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center opacity-60 brightness-0 invert transition hover:opacity-100'
                  >
                    <img src={s.src} alt={s.alt} className={`${s.h} w-auto`} />
                  </a>
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
