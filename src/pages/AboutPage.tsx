import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Heart, Zap, Users, Target } from "lucide-react";

import SEOHead from "../components/seo/SEOHead";
import Breadcrumbs from "../components/Breadcrumbs";
import { MissionHero } from "../components/mission";
import {
  Reveal,
  Stagger,
  StaggerItem,
  AnimatedCounter,
  MagneticButton,
} from "../components/motion";

import { breadcrumbSchema, organizationSchema } from "@/lib/schema";
import { communities } from "../data/communities";
import { soldiers } from "../data/soldiers";
import { meetups } from "../data/meetups";
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

      <div className='min-h-screen bg-white'>
        <div className='container pt-6 pb-2'>
          <Breadcrumbs items={crumbs} />
        </div>

        <MissionHero
          badge='Sobre Veintiuno'
          title='Quiénes somos'
          subtitle='La red bitcoiner de Latinoamérica'
          variant='warm'
        />

        {/* Mission */}
        <section className='py-20 max-w-4xl px-4 md:px-12 mx-auto'>
          <Reveal>
            <h2 className='text-4xl md:text-5xl font-heading font-black text-gray-900 mb-6'>
              Nuestra <span className='text-gradient'>misión</span>
            </h2>
            <div className='space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed'>
              <p>
                <strong className='text-gray-900'>Veintiuno</strong> nace para
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
        </section>

        {/* Stats */}
        <section className='py-16 bg-gradient-to-b from-gray-50 to-white'>
          <Reveal>
            <div className='max-w-5xl mx-auto px-4 md:px-12'>
              <Stagger
                stagger={0.1}
                className='grid grid-cols-2 md:grid-cols-4 gap-8 text-center'
              >
                <StaggerItem>
                  <div className='text-5xl md:text-6xl font-heading font-black text-gradient mb-2'>
                    <AnimatedCounter to={countries.length} />
                  </div>
                  <div className='text-sm uppercase tracking-widest text-gray-600 font-semibold'>
                    Países
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className='text-5xl md:text-6xl font-heading font-black text-gradient mb-2'>
                    <AnimatedCounter to={communities.length} />
                  </div>
                  <div className='text-sm uppercase tracking-widest text-gray-600 font-semibold'>
                    Comunidades
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className='text-5xl md:text-6xl font-heading font-black text-gradient mb-2'>
                    <AnimatedCounter to={soldiers.length} />
                  </div>
                  <div className='text-sm uppercase tracking-widest text-gray-600 font-semibold'>
                    Soldados
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className='text-5xl md:text-6xl font-heading font-black text-gradient mb-2'>
                    <AnimatedCounter to={meetups.length} />
                  </div>
                  <div className='text-sm uppercase tracking-widest text-gray-600 font-semibold'>
                    Meetups
                  </div>
                </StaggerItem>
              </Stagger>
              {totalMembers > 0 && (
                <p className='text-center mt-12 text-lg text-gray-600'>
                  Más de{" "}
                  <strong className='text-bitcoin'>
                    <AnimatedCounter to={totalMembers} suffix='+' />
                  </strong>{" "}
                  bitcoiners en la red.
                </p>
              )}
            </div>
          </Reveal>
        </section>

        {/* Pillars */}
        <section className='py-20'>
          <div className='max-w-5xl mx-auto px-4 md:px-12'>
            <Reveal>
              <h2 className='text-4xl md:text-5xl font-heading font-black text-gray-900 mb-12 text-center'>
                Lo que <span className='text-gradient'>hacemos</span>
              </h2>
            </Reveal>

            <Stagger
              stagger={0.1}
              className='grid grid-cols-1 md:grid-cols-2 gap-6'
            >
              {[
                {
                  icon: <Users className='w-7 h-7' />,
                  title: "Conectamos comunidades",
                  body: "Más de 25 comunidades bitcoiner de toda Latinoamérica forman parte de la red Veintiuno. Cada una con su propia identidad, ciudad y meetups.",
                  link: "/communities",
                  linkLabel: "Ver comunidades →",
                },
                {
                  icon: <Zap className='w-7 h-7' />,
                  title: "Multiplicamos nodos Bitcoin",
                  body: "Ayudamos a cada comunidad a montar su propio nodo Bitcoin + Lightning. Soberanía técnica, no confianza en terceros.",
                  link: "/mission/stack",
                  linkLabel: "Ver el stack →",
                },
                {
                  icon: <Heart className='w-7 h-7' />,
                  title: "La Cruzada",
                  body: "Visitamos físicamente cada comunidad de la región con nuestro ejército. Un calendario de meetups, viajes y encuentros reales.",
                  link: "/meetups",
                  linkLabel: "Ver próximos eventos →",
                },
                {
                  icon: <Target className='w-7 h-7' />,
                  title: "Cards bitcoin-only",
                  body: "Cada comunidad tiene 4 cards únicas creadas por artistas locales. Una colección en papel y NFC que circula entre bitcoiners.",
                  link: "/cards",
                  linkLabel: "Ver cards →",
                },
              ].map((p) => (
                <StaggerItem key={p.title}>
                  <div className='card-glass p-8 h-full group'>
                    <div className='inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-bitcoin to-bitcoin-dark text-white mb-5 shadow-lg shadow-bitcoin/30 transition-transform duration-300 group-hover:scale-110'>
                      {p.icon}
                    </div>
                    <h3 className='text-2xl font-heading font-black text-gray-900 mb-3'>
                      {p.title}
                    </h3>
                    <p className='text-gray-700 leading-relaxed mb-4'>
                      {p.body}
                    </p>
                    <Link
                      to={p.link}
                      className='inline-block text-bitcoin font-semibold hover:translate-x-1 transition-transform'
                    >
                      {p.linkLabel}
                    </Link>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Team / Organizers */}
        <section className='py-20 bg-gray-50'>
          <div className='max-w-6xl mx-auto px-4 md:px-12'>
            <Reveal>
              <h2 className='text-4xl md:text-5xl font-heading font-black text-gray-900 mb-2 text-center'>
                El <span className='text-gradient'>ejército</span>
              </h2>
              <p className='text-lg text-gray-600 text-center mb-12'>
                Los organizadores que hacen posible la cruzada.
              </p>
            </Reveal>

            <Stagger
              stagger={0.04}
              className='grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4'
            >
              {soldiers.slice(0, 12).map((s) => (
                <StaggerItem key={s.id}>
                  <Link
                    to={`/soldier/${s.id}`}
                    className='block group text-center'
                  >
                    <div className='w-20 h-20 mx-auto mb-2 rounded-full overflow-hidden border-2 border-bitcoin/30 group-hover:border-bitcoin transition-colors'>
                      <img
                        src={s.profileImage}
                        alt={`${s.username} – soldado del ejército Veintiuno`}
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <div className='text-sm font-semibold text-gray-900 group-hover:text-bitcoin transition-colors'>
                      {s.username}
                    </div>
                    <div className='text-xs text-gray-500'>{s.countryName}</div>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.2}>
              <div className='text-center mt-12'>
                <Link
                  to='/army'
                  className='inline-flex items-center gap-2 text-bitcoin font-semibold hover:gap-3 transition-all'
                >
                  Ver todo el ejército
                  <span aria-hidden='true'>→</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className='py-24'>
          <Reveal>
            <div className='max-w-3xl mx-auto px-4 md:px-12 text-center'>
              <h2 className='text-3xl md:text-5xl font-heading font-black text-gray-900 mb-6 leading-tight'>
                ¿Tenés una comunidad Bitcoin?{" "}
                <span className='text-gradient'>Sumate.</span>
              </h2>
              <p className='text-lg text-gray-600 mb-10'>
                Veintiuno es una red abierta. Si organizás meetups o estás
                empezando una comunidad bitcoiner en cualquier ciudad de
                Latinoamérica, sumate.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <MagneticButton>
                  <a
                    href='https://github.com/veintiuno-lat/veintiuno-website/issues/new?template=add-community.yml'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='btn btn-md btn-primary'
                  >
                    <span>Sumá tu comunidad</span>
                    <ExternalLink className='h-4 w-4' />
                  </a>
                </MagneticButton>
                <MagneticButton>
                  <a
                    href='https://tally.so/r/mOv75R'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='btn btn-md btn-secondary'
                  >
                    <span>Contactanos</span>
                  </a>
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
