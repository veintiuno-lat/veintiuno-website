import React from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, MapPin, Users, Calendar, Sword } from "lucide-react";

import SEOHead from "../components/seo/SEOHead";
import { MissionHero } from "../components/mission";
import {
  Reveal,
  Stagger,
  StaggerItem,
  TiltCard,
  AnimatedCounter,
  MagneticButton,
} from "../components/motion";

import { getCountryBySlug } from "../data/countries";
import { communities, getCommunitiesByCountry } from "../data/communities";
import { meetups } from "../data/meetups";
import { soldiers } from "../data/soldiers";

import { breadcrumbSchema, countryPageSchema } from "@/lib/schema";

const CountryPage: React.FC = () => {
  const { countrySlug } = useParams<{ countrySlug: string }>();
  const country = countrySlug ? getCountryBySlug(countrySlug) : undefined;

  if (!country) {
    return (
      <div className='min-h-[60vh] flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold mb-4'>País no encontrado</h1>
          <Link to='/communities' className='text-bitcoin underline'>
            Ver todas las comunidades
          </Link>
        </div>
      </div>
    );
  }

  const countryCommunities = getCommunitiesByCountry(country.name);
  const countryMeetups = meetups.filter((m) => m.country === country.name);
  const countrySoldiers = soldiers.filter(
    (s) => s.countryName.toLowerCase() === country.name.toLowerCase(),
  );

  const totalMembers = countryCommunities.reduce((acc, c) => {
    const n =
      typeof c.peopleCount === "number"
        ? c.peopleCount
        : typeof c.peopleCount === "string"
          ? parseInt(c.peopleCount.replace(/\D/g, ""), 10) || 0
          : 0;
    return acc + n;
  }, 0);

  const titleBase = `Bitcoin ${country.name}`;
  const seoTitle = `${titleBase} · ${countryCommunities.length} Comunidades, ${countryMeetups.length} Meetups · Veintiuno`;
  const seoDescription = `Descubrí las ${countryCommunities.length} comunidades Bitcoin de ${country.name}, los próximos meetups y los organizadores que las hacen posibles. La red bitcoiner regional.`;

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={[
          `bitcoin ${country.name.toLowerCase()}`,
          `comunidad bitcoin ${country.name.toLowerCase()}`,
          `meetup bitcoin ${country.name.toLowerCase()}`,
          "bitcoin latinoamerica",
          "veintiuno",
        ]}
        url={`/pais/${country.slug}`}
        image={`/og/country/${country.slug}.jpg`}
        type='website'
        jsonLd={[
          countryPageSchema(country, countryCommunities.length, countryMeetups.length),
          breadcrumbSchema([
            { name: "Inicio", url: "/" },
            { name: "Comunidades", url: "/communities" },
            { name: country.name, url: `/pais/${country.slug}` },
          ]),
        ]}
      />

      <div className='min-h-screen bg-white'>
        <MissionHero
          badge={`${country.flag} Bitcoin · ${country.name}`}
          title={`Bitcoin ${country.name}`}
          subtitle={`${countryCommunities.length} comunidades · ${countryMeetups.length} meetups · ${countrySoldiers.length} organizadores`}
          variant='warm'
        />

        <section className='py-16 max-w-4xl mx-auto px-4 md:px-12'>
          <Reveal>
            <Link
              to='/communities'
              className='inline-flex items-center gap-1 text-sm text-gray-500 hover:text-bitcoin transition-colors mb-6'
            >
              <ChevronLeft className='w-4 h-4' /> Todas las comunidades
            </Link>
            <p className='text-lg md:text-xl text-gray-700 leading-relaxed'>
              {country.intro}
            </p>
          </Reveal>
        </section>

        {/* Stats counter row */}
        <section className='py-8 bg-gradient-to-b from-white to-gray-50'>
          <Reveal>
            <div className='flex flex-wrap justify-center gap-8 md:gap-16 max-w-4xl mx-auto px-4'>
              <div className='text-center'>
                <div className='text-4xl md:text-5xl font-heading font-black text-gradient'>
                  <AnimatedCounter to={countryCommunities.length} />
                </div>
                <div className='text-sm text-gray-600 mt-1 uppercase tracking-wider font-semibold'>
                  Comunidades
                </div>
              </div>
              <div className='text-center'>
                <div className='text-4xl md:text-5xl font-heading font-black text-gradient'>
                  <AnimatedCounter to={countryMeetups.length} />
                </div>
                <div className='text-sm text-gray-600 mt-1 uppercase tracking-wider font-semibold'>
                  Meetups
                </div>
              </div>
              {totalMembers > 0 && (
                <div className='text-center'>
                  <div className='text-4xl md:text-5xl font-heading font-black text-gradient'>
                    <AnimatedCounter to={totalMembers} suffix='+' />
                  </div>
                  <div className='text-sm text-gray-600 mt-1 uppercase tracking-wider font-semibold'>
                    Miembros
                  </div>
                </div>
              )}
              {countrySoldiers.length > 0 && (
                <div className='text-center'>
                  <div className='text-4xl md:text-5xl font-heading font-black text-gradient'>
                    <AnimatedCounter to={countrySoldiers.length} />
                  </div>
                  <div className='text-sm text-gray-600 mt-1 uppercase tracking-wider font-semibold'>
                    Organizadores
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </section>

        {/* Communities */}
        {countryCommunities.length > 0 && (
          <section className='py-20 bg-gray-50'>
            <div className='max-w-7xl mx-auto px-4 md:px-12'>
              <Reveal>
                <h2 className='text-3xl md:text-5xl font-heading font-black text-gray-900 mb-2'>
                  Comunidades Bitcoin en{" "}
                  <span className='text-gradient'>{country.name}</span>
                </h2>
                <p className='text-gray-600 mb-12 text-lg'>
                  {countryCommunities.length === 1
                    ? "1 comunidad activa que forma parte de la red Veintiuno."
                    : `${countryCommunities.length} comunidades activas que forman parte de la red Veintiuno.`}
                </p>
              </Reveal>

              <Stagger
                stagger={0.06}
                className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              >
                {countryCommunities.map((c) => (
                  <StaggerItem key={c.id}>
                    <Link to={`/community/${c.id}`} className='block group'>
                      <TiltCard maxTilt={5} lift={4}>
                        <div className='card overflow-hidden cursor-pointer transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-bitcoin/10'>
                          <div
                            className='relative h-24 flex items-center justify-center'
                            style={{
                              backgroundImage: c.backgroundImage
                                ? `url(${c.backgroundImage})`
                                : undefined,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              backgroundColor: c.backgroundImage
                                ? undefined
                                : "#F7931A",
                            }}
                          >
                            {c.backgroundImage && (
                              <div className='absolute inset-0 bg-black/30' />
                            )}
                            <div
                              className='absolute -bottom-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden'
                            >
                              {c.avatarImage ? (
                                <img
                                  src={c.avatarImage}
                                  alt={`Logo ${c.title}`}
                                  className='w-full h-full object-cover'
                                />
                              ) : (
                                <span className='text-bitcoin font-bold'>
                                  BTC
                                </span>
                              )}
                            </div>
                          </div>
                          <div className='p-6 pt-12 text-center'>
                            <h3 className='text-lg font-bold font-heading text-gray-900 group-hover:text-bitcoin transition-colors'>
                              {c.title}
                            </h3>
                            <div className='flex items-center justify-center gap-1 text-sm text-gray-500 mt-1'>
                              <MapPin className='w-3.5 h-3.5' />
                              <span>{c.city ?? country.name}</span>
                            </div>
                          </div>
                        </div>
                      </TiltCard>
                    </Link>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </section>
        )}

        {/* Meetups */}
        {countryMeetups.length > 0 && (
          <section className='py-20'>
            <div className='max-w-5xl mx-auto px-4 md:px-12'>
              <Reveal>
                <h2 className='text-3xl md:text-5xl font-heading font-black text-gray-900 mb-2'>
                  Meetups Bitcoin en{" "}
                  <span className='text-gradient'>{country.name}</span>
                </h2>
                <p className='text-gray-600 mb-12 text-lg'>
                  Próximos eventos bitcoiners en {country.name}.
                </p>
              </Reveal>

              <Stagger stagger={0.05} className='space-y-4'>
                {countryMeetups.map((m) => (
                  <StaggerItem key={m.id}>
                    <Link
                      to={`/meetup/${m.id}`}
                      className='block group card-glass p-6 hover:shadow-xl hover:shadow-bitcoin/10 transition-shadow'
                    >
                      <div className='flex flex-col md:flex-row md:items-center gap-4'>
                        <div className='shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-bitcoin to-bitcoin-dark text-white flex items-center justify-center'>
                          <Calendar className='w-7 h-7' />
                        </div>
                        <div className='flex-1'>
                          <h3 className='text-xl font-bold font-heading text-gray-900 group-hover:text-bitcoin transition-colors'>
                            {m.title}
                          </h3>
                          <div className='flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 mt-1'>
                            <span className='inline-flex items-center gap-1'>
                              <Calendar className='w-3.5 h-3.5' /> {m.date}
                            </span>
                            <span className='inline-flex items-center gap-1'>
                              <MapPin className='w-3.5 h-3.5' /> {m.location}
                            </span>
                            <span className='inline-flex items-center gap-1'>
                              {m.flag} {m.category} · {m.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </section>
        )}

        {/* Soldiers */}
        {countrySoldiers.length > 0 && (
          <section className='py-20 bg-gray-50'>
            <div className='max-w-5xl mx-auto px-4 md:px-12'>
              <Reveal>
                <h2 className='text-3xl md:text-5xl font-heading font-black text-gray-900 mb-2'>
                  Organizadores en{" "}
                  <span className='text-gradient'>{country.name}</span>
                </h2>
                <p className='text-gray-600 mb-12 text-lg'>
                  El ejército Veintiuno en {country.name}.
                </p>
              </Reveal>

              <Stagger
                stagger={0.05}
                className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'
              >
                {countrySoldiers.map((s) => (
                  <StaggerItem key={s.id}>
                    <Link to={`/soldier/${s.id}`} className='block group text-center'>
                      <TiltCard maxTilt={5} lift={3}>
                        <div className='card p-4 hover:shadow-lg hover:shadow-bitcoin/10 transition-shadow'>
                          <div className='w-20 h-20 rounded-full mx-auto mb-3 overflow-hidden border-2 border-bitcoin/30'>
                            <img
                              src={s.profileImage}
                              alt={`${s.username} – ${s.role} de ${country.name}`}
                              className='w-full h-full object-cover'
                            />
                          </div>
                          <div className='font-semibold text-gray-900 group-hover:text-bitcoin transition-colors'>
                            {s.username}
                          </div>
                          <div className='text-xs text-gray-500 mt-1 inline-flex items-center justify-center gap-1'>
                            <Sword className='w-3 h-3' /> {s.role}
                          </div>
                        </div>
                      </TiltCard>
                    </Link>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </section>
        )}

        {/* Empty state */}
        {countryCommunities.length === 0 && countryMeetups.length === 0 && (
          <section className='py-20'>
            <div className='max-w-2xl mx-auto px-4 md:px-12 text-center'>
              <Users className='w-16 h-16 text-bitcoin mx-auto mb-6 opacity-60' />
              <h2 className='text-3xl font-heading font-black text-gray-900 mb-4'>
                Todavía no hay comunidades en {country.name}
              </h2>
              <p className='text-lg text-gray-600 mb-8'>
                ¿Estás organizando una comunidad o meetup Bitcoin en {country.name}?
                Sumate a la red Veintiuno y conectá con bitcoiners de toda la región.
              </p>
              <MagneticButton>
                <a
                  href='https://github.com/veintiuno-lat/veintiuno-website/issues/new?template=add-community.yml'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn btn-md btn-primary'
                >
                  Sumá tu comunidad
                </a>
              </MagneticButton>
            </div>
          </section>
        )}

        {/* Other countries cross-link */}
        <section className='py-20 bg-gradient-to-b from-gray-50 to-white'>
          <div className='max-w-5xl mx-auto px-4 md:px-12'>
            <Reveal>
              <h2 className='text-2xl md:text-3xl font-heading font-black text-gray-900 mb-2'>
                Bitcoin en otros países de Latinoamérica
              </h2>
              <p className='text-gray-600 mb-8'>
                Explorá la red bitcoiner por país.
              </p>
            </Reveal>

            <div className='flex flex-wrap gap-2'>
              {communities
                .map((c) => c.country)
                .filter((v, i, arr) => arr.indexOf(v) === i && v !== country.name)
                .sort()
                .map((countryName) => {
                  const slug = countryName
                    .normalize("NFD")
                    .replace(/[̀-ͯ]/g, "")
                    .toLowerCase()
                    .replace(/\s+/g, "-");
                  return (
                    <Link
                      key={countryName}
                      to={`/pais/${slug}`}
                      className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 hover:border-bitcoin hover:text-bitcoin transition-colors text-sm font-medium'
                    >
                      Bitcoin {countryName}
                    </Link>
                  );
                })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CountryPage;
