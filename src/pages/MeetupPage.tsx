import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ArrowLeft, Check, ExternalLink, Lightbulb, MessageCircle, Share2 } from "lucide-react";
import SEOHead from "../components/seo/SEOHead";
import { getMeetupById } from "../data/meetups";
import { getCommunityById } from "../data/communities";
import PageHero from "../components/layout/PageHero";
import CommunityCard, { Flag } from "../components/cards/CommunityCard";
import CommunityMap from "../components/map/CommunityMap";
import { CtaBand } from "../components/ui/Section";
import { X as XIcon } from "../components/icons/x";
import { parseSpanishDate } from "../calendar/utils/meetup-to-event";
import { breadcrumbSchema, meetupEventSchema } from "@/lib/schema";
import Breadcrumbs from "../components/Breadcrumbs";
import { cn } from "@/lib/utils";

const ADD_EVENT_URL = "https://github.com/veintiuno-lat/veintiuno-website/issues/new/choose";

const ease = [0.22, 1, 0.36, 1] as const;

/** Bento tile with a staggered in-view reveal. */
const Tile: React.FC<{ className?: string; delay?: number; children: React.ReactNode }> = ({ className, delay = 0, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.7, delay, ease }}
    className={cn("surface p-6 md:p-8", className)}
  >
    {children}
  </motion.div>
);

/** "Title: detail" items render the title in white. */
const Bullets: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className='space-y-3'>
    {items.map((item, index) => {
      const [head, ...rest] = item.split(": ");
      return (
        <li key={index} className='flex items-start gap-3 text-gray-300'>
          <span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bitcoin shadow-[0_0_8px_#F7931A]' />
          <span>
            {rest.length ? (
              <>
                <strong className='font-semibold text-white'>{head}:</strong> {rest.join(": ")}
              </>
            ) : (
              item
            )}
          </span>
        </li>
      );
    })}
  </ul>
);

const MeetupPage: React.FC = () => {
  const { meetupId } = useParams<{ meetupId: string }>();
  const [copied, setCopied] = useState(false);

  // Find the meetup by ID
  const meetup = getMeetupById(parseInt(meetupId || '0'));

  if (!meetup) {
    return (
      <section className='flex min-h-screen items-center justify-center px-5 pt-28'>
        <div className='surface max-w-lg px-8 py-16 text-center'>
          <h1 className='display text-[clamp(2rem,10.5vw,3rem)] text-white'>Meetup no encontrado</h1>
          <p className='mt-4 text-gray-400'>El meetup que buscas no existe.</p>
          <Link to='/meetups' className='btn btn-md btn-primary !text-ink-950 mt-8'>
            <ArrowLeft className='h-4 w-4' /> Volver a Meetups
          </Link>
        </div>
      </section>
    );
  }

  // Use real meetup data - in a real app this would come from an API
  const meetupDetails = {
    description: meetup.description || "Join us for an exclusive Bitcoin-focused meetup where innovators, investors, and enthusiasts come together to discuss the latest trends in decentralized finance, blockchain technology, and the future of money. Whether you are a seasoned Bitcoiner or just starting your journey, this event is designed to inspire, educate, and connect.",
    whatToExpect: meetup.whatToExpect || [
      "Keynote Talks: Insights from leading voices in Bitcoin and blockchain.",
      "Panel Discussions: Open debates on regulation, adoption, and technology.",
      "Networking: Meet like-minded Bitcoiners, entrepreneurs, and developers.",
      "Workshops: Hands-on sessions covering wallets, nodes, and privacy tools."
    ],
    whyAttend: meetup.whyAttend || [
      "Gain practical knowledge to strengthen your Bitcoin journey.",
      "Discover new projects and opportunities in the ecosystem.",
      "Be part of a vibrant community that shares your vision for financial freedom."
    ],
    slogan: meetup.slogan || "Bitcoin Event - Building the future, one block at a time.",
    organizerCommunity: meetup.organizerCommunity || {
      id: "default-community",
      title: meetup.organizedBy || "Organizador",
      city: "Ciudad",
      country: meetup.country,
      avatarImage: "/images/community-images/default-community.jpg",
      backgroundImage: "/images/community-images/default-community-bg.jpg"
    }
  };

  const organizer = getCommunityById(meetupDetails.organizerCommunity.id);
  const date = parseSpanishDate(meetup.date);

  const crumbs = [
    { name: "Inicio", url: "/" },
    { name: "Meetups", url: "/meetups" },
    { name: meetup.title, url: `/meetup/${meetup.id}` },
  ];

  const pageUrl = `https://veintiuno.lat/meetup/${meetup.id}`;
  const shareText = `${meetup.title} · ${meetup.date}`;

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: meetup.title, text: shareText, url: pageUrl });
      } catch {
        /* user cancelled */
      }
      return;
    }
    await navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const iconBtn =
    "flex h-14 w-14 items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] text-white transition hover:border-bitcoin hover:text-bitcoin focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bitcoin";

  const details: { label: string; value: React.ReactNode }[] = [
    { label: "Comunidad", value: meetup.organizedBy || "Organizador" },
    { label: "Fecha", value: meetup.date },
    { label: "Hora", value: meetup.time },
    {
      label: "Localización",
      value: (
        <>
          {meetup.location}
          <span className='mt-1 flex items-center gap-2 text-sm text-gray-400'>
            <Flag country={meetup.country} /> {meetup.country}
          </span>
        </>
      ),
    },
  ];

  return (
    <>
      <SEOHead
        title={`${meetup.title} - Meetup - Veintiuno`}
        description={`Sumate a ${meetup.title}, un evento ${meetup.category.toLowerCase()} ${meetup.type.toLowerCase()} el ${meetup.date} en ${meetup.location}.`}
        keywords={[meetup.title, "meetup bitcoin", `meetup ${meetup.country.toLowerCase()}`, "evento bitcoin", "veintiuno"]}
        url={`/meetup/${meetup.id}`}
        image={`/og/meetup/${meetup.id}.jpg`}
        type="website"
        jsonLd={[
          meetupEventSchema(meetup, meetupDetails?.organizerCommunity?.title),
          breadcrumbSchema(crumbs),
        ]}
      />

      <div className='relative'>
        <div className='absolute inset-x-0 top-24 z-10 mx-auto max-w-7xl px-5 md:px-8'>
          <Breadcrumbs
            items={crumbs}
            className='[&_[aria-current=page]]:line-clamp-1 [&_[aria-current=page]]:text-white'
          />
        </div>

        <PageHero
          badge={`${meetup.category} · ${meetup.type}`}
          title={meetup.title}
          subtitle={meetup.location}
          image={meetup.image}
          className='pt-36 md:pt-40 [&_h1]:text-[10vw] sm:[&_h1]:text-6xl lg:[&_h1]:text-7xl'
          stats={[
            { value: <span className='text-2xl capitalize sm:text-3xl md:text-4xl'>{format(date, "d MMM", { locale: es })}</span>, label: `Fecha · ${format(date, "yyyy")}` },
            { value: <span className='text-lg sm:text-2xl md:text-3xl'>{meetup.time}</span>, label: "Horario" },
            {
              value: (
                <span className='inline-flex items-center gap-2 text-lg sm:text-2xl md:text-3xl'>
                  <Flag country={meetup.country} className='text-xl' />
                  {meetup.country}
                </span>
              ),
              label: "Lugar",
            },
          ]}
        >
          <a href={meetup.ticketLink || "#"} target='_blank' rel='noopener noreferrer' className='btn btn-md btn-primary !text-ink-950'>
            Consigue el billete <ExternalLink className='h-4 w-4' />
          </a>
          <button type='button' onClick={share} className='btn btn-md btn-secondary'>
            {copied ? <Check className='h-4 w-4' /> : <Share2 className='h-4 w-4' />}
            {copied ? "¡Link copiado!" : "Compartir"}
          </button>
          <a
            href={`https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`}
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Compartir en X'
            className={iconBtn}
          >
            <XIcon className='h-5 w-5' />
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${pageUrl}`)}`}
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Compartir en WhatsApp'
            className={iconBtn}
          >
            <MessageCircle className='h-5 w-5' />
          </a>
        </PageHero>
      </div>

      {/* Bento */}
      <section className='mx-auto max-w-7xl px-5 pb-8 md:px-8'>
        <div className='grid grid-cols-1 gap-5 lg:grid-cols-3'>
          <Tile className='lg:col-span-2'>
            <div className='eyebrow mb-5'>Acerca del evento</div>
            <p className='text-lg leading-relaxed text-gray-300 md:text-xl'>{meetupDetails.description}</p>
            <p className='mt-6 flex items-center gap-2 italic text-gray-400'>
              <Lightbulb className='h-5 w-5 shrink-0 text-bitcoin' />
              {meetupDetails.slogan}
            </p>
          </Tile>

          <Tile className='lg:row-span-2' delay={0.1}>
            <h2 className='display text-3xl text-white'>Detalles del evento</h2>
            <dl className='mt-6 divide-y divide-white/10'>
              {details.map((d) => (
                <div key={d.label} className='py-4 first:pt-0'>
                  <dt className='text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500'>{d.label}</dt>
                  <dd className='mt-1 text-white'>{d.value}</dd>
                </div>
              ))}
              <div className='py-4'>
                <dt className='text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500'>Categorías</dt>
                <dd className='mt-2 flex flex-wrap gap-2'>
                  <span className='rounded-full border border-bitcoin/40 bg-bitcoin/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-bitcoin'>
                    {meetup.category}
                  </span>
                  <span className='rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-300'>
                    {meetup.type}
                  </span>
                </dd>
              </div>
            </dl>
            <a
              href={meetup.ticketLink || "#"}
              target='_blank'
              rel='noopener noreferrer'
              className='btn btn-md btn-primary !text-ink-950 mt-4 w-full'
            >
              Consigue el billete <ExternalLink className='h-4 w-4' />
            </a>
          </Tile>

          <Tile delay={0.05}>
            <h2 className='mb-5 text-xl font-bold text-white'>Qué esperar</h2>
            <Bullets items={meetupDetails.whatToExpect} />
          </Tile>

          <Tile delay={0.1}>
            <h2 className='mb-5 text-xl font-bold text-white'>Por qué asistir</h2>
            <Bullets items={meetupDetails.whyAttend} />
          </Tile>

          {meetup.coordinates && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease }}
              className='lg:col-span-2'
            >
              <CommunityMap
                points={[
                  {
                    id: String(meetup.id),
                    lat: meetup.coordinates.latitude,
                    lng: meetup.coordinates.longitude,
                    title: meetup.title,
                    subtitle: meetup.location,
                    image: meetupDetails.organizerCommunity.avatarImage,
                  },
                ]}
                maxZoom={12}
                className='h-[22rem] lg:h-full lg:min-h-[22rem]'
              />
            </motion.div>
          )}

          <Tile delay={0.1} className={meetup.coordinates ? "" : "lg:col-span-3"}>
            <h2 className='display mb-5 text-3xl text-white'>Organiza</h2>
            {organizer ? (
              <CommunityCard community={organizer} compact />
            ) : (
              <p className='text-lg font-semibold text-white'>{meetupDetails.organizerCommunity.title}</p>
            )}
            <Link
              to='/meetups'
              className='mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-bitcoin'
            >
              <ArrowLeft className='h-4 w-4' /> Volver a Meetups
            </Link>
          </Tile>
        </div>
      </section>

      <CtaBand
        title='¿Falta tu evento?'
        description='Si conoces un evento Bitcoin que debería estar aquí, compártelo con nosotros.'
        action={{ label: "Agregar evento", href: ADD_EVENT_URL, external: true }}
      />
    </>
  );
};

export default MeetupPage;
