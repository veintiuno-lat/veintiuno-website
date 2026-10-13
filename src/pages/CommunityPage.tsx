import React, { useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Globe,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Pickaxe,
  Send,
  Shield,
  Users,
  Youtube,
} from "lucide-react";
import SEOHead from "../components/seo/SEOHead";
import { getCommunityById, communities } from "../data/communities";
import { squads } from "../data/squads";
import { getCardsByCommunity } from "../data/cards";
import { useCommunityEvents } from "../services/communityEvents";
import { EventCard } from "../components/cards/EventCard";
import { getCountryByName } from "../data/countries";
import { X } from "@/components/icons/x";
import { NostrIcon } from "@/components/icons/nostr";
import LnPayment from "@/components/payments/LnPayment";
import { Reveal, SplitText } from "../components/motion";
import { breadcrumbSchema, communityPlaceSchema } from "@/lib/schema";
import Breadcrumbs from "../components/Breadcrumbs";
import CommunityCard, { CommunityAvatar, Flag } from "../components/cards/CommunityCard";
import HoloCard from "../components/cards/HoloCard";
import CommunityMap from "../components/map/CommunityMap";
import { CtaBand, SectionHeader } from "../components/ui/Section";
import ShaderBackdrop from "../components/three/ShaderBackdrop";

const ease = [0.22, 1, 0.36, 1] as const;

type IconType = React.ComponentType<{ className?: string }>;

// Pick an icon + label for a URL based on the platform it points to
const getSocialMeta = (url: string): { Icon: IconType; label: string } => {
  const u = url.toLowerCase();
  if (u.includes("instagram.")) return { Icon: Instagram, label: "Instagram" };
  if (u.includes("youtube.") || u.includes("youtu.be")) return { Icon: Youtube, label: "YouTube" };
  if (u.includes("twitter.") || u.includes("x.com")) return { Icon: X, label: "X" };
  if (u.includes("t.me") || u.includes("telegram.")) return { Icon: Send, label: "Telegram" };
  if (u.includes("whatsapp.") || u.includes("wa.me")) return { Icon: MessageCircle, label: "WhatsApp" };
  return { Icon: Globe, label: "Sitio web" };
};

const CommunityPage: React.FC = () => {
  const { communityId } = useParams<{ communityId: string }>();
  const community = getCommunityById(communityId || "");
  // Live upcoming events from the community's own agenda (if it publishes one)
  const { events: communityEvents } = useCommunityEvents(communityId || "");
  const heroRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, reduce ? 1.05 : 1.3]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0]);

  if (!community) {
    return (
      <section className='relative flex min-h-screen items-center justify-center overflow-hidden px-5'>
        <ShaderBackdrop />
        <div className='relative text-center'>
          <h1 className='display mb-4 text-[clamp(2rem,10.5vw,3rem)] text-white md:text-7xl'>Comunidad no encontrada</h1>
          <p className='mb-8 text-gray-400'>La comunidad que buscás no existe.</p>
          <Link to='/communities' className='btn btn-md btn-primary !text-ink-950'>
            Ver comunidades
          </Link>
        </div>
      </section>
    );
  }

  const supportingSquad = community.squadId ? squads.find((s) => s.id === community.squadId) : null;
  const communityCards = getCardsByCommunity(community.id);
  const nearby = communities.filter((c) => c.country === community.country && c.id !== community.id);
  const country = getCountryByName(community.country);

  const socialLinks: { href: string; Icon: IconType; label: string }[] = [];
  if (community.link) socialLinks.push({ href: community.link, ...getSocialMeta(community.link) });
  if (community.linkTwitter) socialLinks.push({ href: community.linkTwitter, Icon: X, label: "X" });
  if (community.linkTelegram) socialLinks.push({ href: community.linkTelegram, Icon: Send, label: "Telegram" });
  if (community.linkDiscord) socialLinks.push({ href: community.linkDiscord, Icon: MessageCircle, label: "Discord" });
  if (community.npub) socialLinks.push({ href: `https://njump.me/${community.npub}`, Icon: NostrIcon, label: "Nostr" });
  if (community.linkEmail) socialLinks.push({ href: `mailto:${community.linkEmail}`, Icon: Mail, label: "E-mail" });

  const crumbs = [
    { name: "Inicio", url: "/" },
    { name: "Comunidades", url: "/communities" },
    { name: community.title, url: `/community/${community.id}` },
  ];

  const facts = [
    { icon: MapPin, label: "Ubicación", value: `${community.city}, ${community.country}` },
    community.foundation && { icon: CalendarDays, label: "Fundada", value: String(community.foundation) },
    community.peopleCount && { icon: Users, label: "Bitcoiners", value: String(community.peopleCount) },
    { icon: Shield, label: "Cruzada", value: community.cruzade ? "Participa" : "Aún no" },
  ].filter(Boolean) as { icon: IconType; label: string; value: string }[];

  return (
    <>
      <SEOHead
        title={`${community.title} - Comunidad - Veintiuno`}
        description={`Conocé ${community.title}, comunidad Bitcoin en ${
          community.city || "ciudad"
        }, ${community.country}. ${community.description.slice(0, 100)}`}
        keywords={[
          community.title,
          "comunidad bitcoin",
          `bitcoin ${community.country.toLowerCase()}`,
          community.country.toLowerCase(),
          (community.city || "ciudad").toLowerCase(),
        ]}
        url={`/community/${community.id}`}
        image={`/og/community/${community.id}.jpg`}
        type='website'
        jsonLd={[communityPlaceSchema(community), breadcrumbSchema(crumbs)]}
      />

      {/* Cinematic hero */}
      <section ref={heroRef} className='relative isolate flex min-h-[88vh] items-end overflow-hidden pb-16 pt-32'>
        <motion.div className='absolute inset-0 -z-20' style={{ y: bgY }}>
          {community.backgroundImage ? (
            <motion.img src={community.backgroundImage} alt='' style={{ scale: bgScale }} className='h-full w-full object-cover' />
          ) : (
            <ShaderBackdrop />
          )}
        </motion.div>
        <div aria-hidden='true' className='absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/30' />
        <div aria-hidden='true' className='absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,rgba(247,147,26,0.3),transparent_55%)]' />
        <div aria-hidden='true' className='grain absolute inset-0 -z-10' />

        <motion.div style={{ y: contentY, opacity: contentOpacity }} className='mx-auto w-full max-w-7xl px-5 md:px-8'>
          <Breadcrumbs items={crumbs} />
          <Link to='/communities' className='mt-6 inline-flex items-center gap-2 text-sm text-gray-300 transition hover:text-bitcoin'>
            <ArrowLeft className='h-4 w-4' /> Todas las comunidades
          </Link>
          <div className='mt-8 flex flex-col gap-8 md:flex-row md:items-end'>
            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, ease }}
              className='relative shrink-0'
            >
              <div aria-hidden='true' className='absolute -inset-3 rounded-full bg-[radial-gradient(closest-side,rgba(247,147,26,0.4),transparent)]' />
              <CommunityAvatar community={community} className='relative h-28 w-28 text-5xl ring-4 ring-bitcoin/60 md:h-40 md:w-40' />
            </motion.div>
            <div className='min-w-0 flex-1'>
              <div className='mb-4 flex flex-wrap items-center gap-2'>
                <span className='chip'>
                  <Flag country={community.country} />
                  {community.city}, {community.country}
                </span>
                {community.cruzade && <span className='eyebrow'>Cruzada 2025</span>}
              </div>
              <SplitText as='h1' text={community.title} className='display text-[clamp(2rem,10.5vw,3rem)] text-white md:text-7xl lg:text-8xl' delay={0.1} />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
            className='mt-10 flex flex-wrap items-center gap-2'
          >
            {socialLinks.map(({ href, Icon, label }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 rounded-full border border-white/15 bg-ink-950/60 px-4 py-2.5 text-sm font-medium text-white transition hover:border-bitcoin hover:text-bitcoin'
              >
                <Icon className='h-4 w-4' />
                {label}
              </a>
            ))}
            {community.lnAddress && <LnPayment lightningAddress={community.lnAddress} npub={community.npub} />}
          </motion.div>
        </motion.div>
      </section>

      {/* Bento */}
      <section className='relative py-20'>
        <div className='mx-auto grid grid-cols-1 max-w-7xl gap-5 px-5 md:px-8 lg:grid-cols-3'>
          <Reveal className='surface p-8 md:p-10 lg:col-span-2'>
            <div className='eyebrow mb-6'>Sobre la comunidad</div>
            <p className='text-xl leading-relaxed text-gray-200 md:text-2xl'>{community.description}</p>
            <p className='mt-6 text-gray-400'>
              El objetivo: construir <strong className='text-white'>{community.title}</strong>, un movimiento para crear una
              economía circular Bitcoin en {community.city || "su ciudad"}.
            </p>
          </Reveal>

          <Reveal delay={0.1} className='surface grid grid-cols-2 gap-px overflow-hidden bg-white/5 p-0'>
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className='flex flex-col justify-between gap-4 bg-ink-900 p-6'>
                <Icon className='h-5 w-5 text-bitcoin' />
                <div>
                  <div className='text-[11px] uppercase tracking-[0.2em] text-gray-500'>{label}</div>
                  <div className='mt-1 font-semibold text-white'>{value}</div>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.1} className='surface overflow-hidden p-0 lg:col-span-2'>
            <CommunityMap
              points={[
                {
                  id: community.id,
                  lat: community.latitude,
                  lng: community.longitude,
                  title: community.title,
                  subtitle: `${community.city}, ${community.country}`,
                  image: community.avatarImage,
                },
                ...nearby.map((c) => ({
                  id: c.id,
                  lat: c.latitude,
                  lng: c.longitude,
                  title: c.title,
                  subtitle: c.city,
                  image: c.avatarImage,
                  href: `/community/${c.id}`,
                })),
              ]}
              highlightId={community.id}
              maxZoom={nearby.length ? 6 : 11}
              className='h-[24rem] rounded-none border-0'
            />
          </Reveal>

          <div className='space-y-5'>
            {supportingSquad && (
              <Reveal delay={0.15}>
                <Link to={`/squad/${supportingSquad.id}`} className='surface surface-hover group flex items-center gap-4 p-6'>
                  <img src={supportingSquad.profileImage} alt={supportingSquad.name} className='h-16 w-16 rounded-2xl object-cover' />
                  <div className='min-w-0 flex-1'>
                    <div className='text-[11px] uppercase tracking-[0.2em] text-bitcoin'>Escuadrón Veintiuno</div>
                    <div className='truncate text-lg font-bold text-white'>{supportingSquad.name}</div>
                    <div className='flex items-center gap-1.5 text-sm text-gray-400'>
                      <Pickaxe className='h-3.5 w-3.5' /> {supportingSquad.leader} · {supportingSquad.soldiers} soldados
                    </div>
                  </div>
                  <ArrowUpRight className='h-5 w-5 text-gray-500 transition group-hover:text-bitcoin' />
                </Link>
              </Reveal>
            )}
            <Reveal delay={0.2} className='surface p-6'>
              <div className='mb-4 flex items-center justify-between'>
                <div className='text-[11px] uppercase tracking-[0.2em] text-gray-500'>Cerca, en {community.country}</div>
                {country && (
                  <Link to={`/pais/${country.slug}`} className='text-xs font-semibold text-bitcoin'>
                    Ver país →
                  </Link>
                )}
              </div>
              {nearby.length ? (
                <div className='space-y-2'>
                  {nearby.slice(0, 4).map((c) => (
                    <CommunityCard key={c.id} community={c} compact />
                  ))}
                </div>
              ) : (
                <p className='text-sm text-gray-400'>Es la única comunidad registrada en el país. ¿Conocés otra?</p>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {communityCards.length > 0 && (
        <section className='relative overflow-hidden py-20'>
          <div className='mx-auto max-w-7xl px-5 md:px-8'>
            <SectionHeader eyebrow='Arte' title='Tarjetas de la comunidad' link={{ to: "/cards", label: "Toda la colección" }} />
            <div className='grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4'>
              {communityCards.map((card, i) => (
                <Reveal key={card.id} delay={(i % 4) * 0.08}>
                  <Link to={`/card/${card.id}`} className='group block'>
                    <HoloCard src={card.imageUrl} alt={card.title ?? card.communityName} orientation={card.orientation} />
                    <div className='mt-3 flex items-center justify-between text-sm'>
                      <span className='font-medium text-white group-hover:text-bitcoin'>{card.title ?? `#${card.number}`}</span>
                      <span className='text-gray-500'>@{card.artist}</span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {communityEvents.length > 0 && (
        <section className='py-20'>
          <div className='mx-auto max-w-7xl px-5 md:px-8'>
            <SectionHeader eyebrow='Agenda' title='Próximos eventos' link={{ to: "/meetups", label: "Todos los meetups" }} />
            <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
              {communityEvents.slice(0, 6).map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title='¿Conocés otra comunidad?'
        description='Ayudanos a completar el mapa bitcoiner de Latinoamérica.'
        action={{
          label: "Sumar comunidad",
          href: "https://github.com/veintiuno-lat/veintiuno-website/issues/new?template=add-community.yml",
          external: true,
        }}
      />
    </>
  );
};

export default CommunityPage;
