import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Zap, Users, Target } from "lucide-react";

import SEOHead from "../components/seo/SEOHead";
import Breadcrumbs from "../components/Breadcrumbs";
import { MissionHero } from "../components/mission";
import { Reveal, Stagger, StaggerItem, AnimatedCounter } from "../components/motion";
import { CtaBand, SectionHeader } from "../components/ui/Section";

import { breadcrumbSchema, organizationSchema } from "@/lib/schema";
import { communities } from "../data/communities";
import { soldiers } from "../data/soldiers";
import { cards } from "../data/cards";
import { countries } from "../data/countries";

const AboutPage: React.FC = () => {
  const crumbs = [
    { name: "Inicio", url: "/" },
    { name: "Sobre nosotros", url: "/sobre-nosotros" },
  ];

  const totalMembers = communities.reduce((acc, c) => {
    const n =
      typeof c.peopleCount === "number"
        ? c.peopleCount
        : typeof c.peopleCount === "string"
          ? parseInt(c.peopleCount.replace(/\D/g, ""), 10) || 0
          : 0;
    return acc + n;
  }, 0);

  // Build a richer Organization schema with founding info + member list.
  const aboutOrgSchema = {
    ...organizationSchema(),
    foundingDate: '2025',
    foundingLocation: {
      '@type': 'Place',
      name: 'Latinoamérica',
    },
    member: soldiers.slice(0, 10).map((s) => ({
      '@type': 'Person',
      name: s.username,
      url: `https://veintiuno.lat/soldier/${s.id}`,
      nationality: s.countryName,
    })),
  };

  return (
    <>
      <SEOHead
        title='Sobre Veintiuno · Quiénes somos'
        description='Veintiuno es la red que conecta las comunidades Bitcoin de Latinoamérica. Conocé nuestra misión, el equipo de organizadores y cómo sumarte a la cruzada bitcoiner regional.'
        keywords={[
          "veintiuno",
          "veintiuno lat",
          "quiénes somos",
          "comunidades bitcoin",
          "cruzada bitcoiner",
          "bitcoin latinoamerica",
        ]}
        url='/sobre-nosotros'
        type='website'
        jsonLd={[aboutOrgSchema, breadcrumbSchema(crumbs)]}
      />

      <div className='relative min-h-screen'>
        <div className='absolute inset-x-0 top-24 z-10 mx-auto max-w-7xl px-5 md:px-8'>
          <Breadcrumbs items={crumbs} />
        </div>

        <MissionHero
          badge='Sobre Veintiuno'
          title='Quiénes somos'
          subtitle='La red bitcoiner de Latinoamérica'
          variant='warm'
          className='pt-36'
        />

        {/* Mission */}
        <section className='py-24 md:py-32'>
          <div className='mx-auto grid grid-cols-1 max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16'>
            <SectionHeader eyebrow='Misión' title='Nuestra misión' className='!mb-0' />
            <Reveal>
              <div className='space-y-6 text-lg leading-relaxed text-gray-300 md:text-xl'>
                <p>
                  <strong className='text-white'>Veintiuno</strong> nace para
                  conectar a las comunidades Bitcoin que ya existen en
                  Latinoamérica — y para multiplicar las que faltan. Creemos que
                  la adopción real de Bitcoin pasa por encuentros en persona,
                  meetups, hackathons, círculos de estudio y vínculos humanos
                  concretos entre bitcoiners de la región.
                </p>
                <p>
                  Somos una red horizontal de organizadores. No vendemos cursos,
                  no captamos fondos para tradear. Conectamos comunidades,
                  ayudamos a montar nodos, distribuimos cards de coleccionables
                  bitcoin-only, y empujamos para que cada ciudad de Latinoamérica
                  tenga su comunidad activa.
                </p>
                <p>
                  Esto es la <strong className='text-bitcoin'>Cruzada Bitcoiner</strong>:
                  vamos a visitarlas todas con nuestro ejército.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Stats */}
        <section className='pb-24 md:pb-32'>
          <div className='mx-auto max-w-7xl px-5 md:px-8'>
            <Stagger
              stagger={0.1}
              className='grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-4'
            >
              {[
                { to: countries.length, label: "Países" },
                { to: communities.length, label: "Comunidades" },
                { to: soldiers.length, label: "Soldados" },
                { to: cards.length, label: "Tarjetas" },
              ].map((s) => (
                <StaggerItem key={s.label} className='bg-ink-950 px-6 py-8 md:px-8 md:py-12'>
                  <div className='font-display text-5xl leading-none text-white md:text-7xl'>
                    <AnimatedCounter to={s.to} />
                  </div>
                  <div className='mt-3 text-xs uppercase tracking-[0.2em] text-gray-400'>{s.label}</div>
                </StaggerItem>
              ))}
            </Stagger>
            {totalMembers > 0 && (
              <p className='mt-8 text-center text-lg text-gray-400'>
                Más de{" "}
                <strong className='font-display text-2xl text-bitcoin'>
                  <AnimatedCounter to={totalMembers} suffix='+' />
                </strong>{" "}
                bitcoiners en la red.
              </p>
            )}
          </div>
        </section>

        {/* Pillars */}
        <section className='py-24 md:py-32'>
          <div className='mx-auto max-w-7xl px-5 md:px-8'>
            <SectionHeader eyebrow='Pilares' title='Lo que hacemos' />

            <Stagger stagger={0.1} className='grid grid-cols-1 gap-5 md:grid-cols-2'>
              {[
                {
                  icon: <Users className='h-6 w-6' />,
                  title: "Conectamos comunidades",
                  body: "Más de 25 comunidades bitcoiner de toda Latinoamérica forman parte de la red Veintiuno. Cada una con su propia identidad, ciudad y meetups.",
                  link: "/communities",
                  linkLabel: "Ver comunidades",
                },
                {
                  icon: <Zap className='h-6 w-6' />,
                  title: "Multiplicamos nodos Bitcoin",
                  body: "Ayudamos a cada comunidad a montar su propio nodo Bitcoin + Lightning. Soberanía técnica, no confianza en terceros.",
                  link: "/mission/stack",
                  linkLabel: "Ver el stack",
                },
                {
                  icon: <Heart className='h-6 w-6' />,
                  title: "La Cruzada",
                  body: "Visitamos físicamente cada comunidad de la región con nuestro ejército. Un calendario de meetups, viajes y encuentros reales.",
                  link: "/meetups",
                  linkLabel: "Ver próximos eventos",
                },
                {
                  icon: <Target className='h-6 w-6' />,
                  title: "Cards bitcoin-only",
                  body: "Cada comunidad tiene 4 cards únicas creadas por artistas locales. Una colección en papel y NFC que circula entre bitcoiners.",
                  link: "/cards",
                  linkLabel: "Ver cards",
                },
              ].map((p) => (
                <StaggerItem key={p.title} className='h-full'>
                  <Link to={p.link} className='surface surface-hover group flex h-full flex-col p-8 hover:-translate-y-1 md:p-10'>
                    <div className='mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-bitcoin/30 bg-bitcoin/10 text-bitcoin shadow-[0_0_30px_-8px_rgba(247,147,26,0.6)] transition-transform duration-500 group-hover:scale-110'>
                      {p.icon}
                    </div>
                    <h3 className='text-2xl font-bold text-white md:text-3xl'>{p.title}</h3>
                    <p className='mt-3 flex-1 leading-relaxed text-gray-400'>{p.body}</p>
                    <span className='mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-bitcoin'>
                      {p.linkLabel}
                      <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Team / Organizers */}
        <section className='py-24 md:py-32'>
          <div className='mx-auto max-w-7xl px-5 md:px-8'>
            <SectionHeader
              eyebrow='Organizadores'
              title='El ejército'
              description='Los organizadores que hacen posible la cruzada.'
              link={{ to: "/army", label: "Ver todo el ejército" }}
            />

            <Stagger stagger={0.04} className='grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 md:grid-cols-6'>
              {soldiers.slice(0, 12).map((s) => (
                <StaggerItem key={s.id}>
                  <Link to={`/soldier/${s.id}`} className='group block text-center'>
                    <div className='mx-auto mb-3 h-20 w-20 overflow-hidden rounded-full ring-2 ring-white/10 transition duration-500 group-hover:ring-bitcoin group-hover:shadow-glow md:h-24 md:w-24'>
                      <img
                        src={s.profileImage}
                        alt={`${s.username} – soldado del ejército Veintiuno`}
                        loading='lazy'
                        decoding='async'
                        className='h-full w-full object-cover transition duration-700 group-hover:scale-110'
                      />
                    </div>
                    <div className='truncate text-sm font-semibold text-white transition-colors group-hover:text-bitcoin'>
                      {s.username}
                    </div>
                    <div className='truncate text-xs text-gray-500'>{s.countryName}</div>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* CTA */}
        <CtaBand
          title='¿Tenés una comunidad Bitcoin? Sumate.'
          description='Veintiuno es una red abierta. Si organizás meetups o estás empezando una comunidad bitcoiner en cualquier ciudad de Latinoamérica, sumate.'
          action={{
            label: "Sumá tu comunidad",
            href: "https://github.com/veintiuno-lat/veintiuno-website/issues/new?template=add-community.yml",
            external: true,
          }}
        />
      </div>
    </>
  );
};

export default AboutPage;
