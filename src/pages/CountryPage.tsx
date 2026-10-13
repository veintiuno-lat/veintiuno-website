import React, { useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Calendar, MapPin, Plus } from "lucide-react";

import SEOHead from "../components/seo/SEOHead";
import PageHero from "../components/layout/PageHero";
import { Reveal, AnimatedCounter } from "../components/motion";
import CommunityCard from "../components/cards/CommunityCard";
import CommunityMap from "../components/map/CommunityMap";
import Globe from "../components/three/Globe";
import { CtaBand, SectionHeader } from "../components/ui/Section";
import ShaderBackdrop from "../components/three/ShaderBackdrop";

import { countries, getCountryBySlug } from "../data/countries";
import { communities, getCommunitiesByCountry } from "../data/communities";
import { meetups } from "../data/meetups";
import { soldiers } from "../data/soldiers";

import { breadcrumbSchema, countryPageSchema } from "@/lib/schema";

const ADD_COMMUNITY_URL =
  "https://github.com/veintiuno-lat/veintiuno-website/issues/new?template=add-community.yml";

const counts = communities.reduce<Record<string, number>>((acc, c) => {
  acc[c.country] = (acc[c.country] ?? 0) + 1;
  return acc;
}, {});

const CountryPage: React.FC = () => {
  const { countrySlug } = useParams<{ countrySlug: string }>();
  const navigate = useNavigate();
  const country = countrySlug ? getCountryBySlug(countrySlug) : undefined;

  const globePoints = useMemo(
    () => communities.map((c) => ({ id: c.id, lat: c.latitude, lng: c.longitude, label: c.title, sublabel: c.city })),
    []
  );

  if (!country) {
    return (
      <section className='relative flex min-h-screen items-center justify-center overflow-hidden px-5'>
        <ShaderBackdrop />
        <div className='relative text-center'>
          <h1 className='display mb-6 text-[clamp(2rem,10.5vw,3rem)] text-white md:text-7xl'>País no encontrado</h1>
          <Link to='/communities' className='btn btn-md btn-primary !text-ink-950'>
            Ver todas las comunidades
          </Link>
        </div>
      </section>
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
  const meetupsPart = countryMeetups.length ? `, ${countryMeetups.length} Meetups` : "";
  const seoTitle = `${titleBase} · ${countryCommunities.length} Comunidades${meetupsPart} · Veintiuno`;
  const seoDescription = `Descubrí las ${countryCommunities.length} comunidades Bitcoin de ${country.name}, los próximos meetups y los organizadores que las hacen posibles. La red bitcoiner regional.`;

  const focus = countryCommunities.length
    ? {
        lat: countryCommunities.reduce((a, c) => a + c.latitude, 0) / countryCommunities.length,
        lng: countryCommunities.reduce((a, c) => a + c.longitude, 0) / countryCommunities.length,
      }
    : null;

  const stats = [
    { value: <AnimatedCounter to={countryCommunities.length} />, label: "Comunidades" },
    ...(countryMeetups.length ? [{ value: <AnimatedCounter to={countryMeetups.length} />, label: "Meetups" }] : []),
    { value: <AnimatedCounter to={countrySoldiers.length} />, label: "Organizadores" },
    ...(totalMembers > 0 ? [{ value: <AnimatedCounter to={totalMembers} suffix='+' />, label: "Bitcoiners" }] : []),
  ];

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

      <PageHero
        badge='Bitcoin por país'
        title={titleBase}
        subtitle={[
          `${countryCommunities.length} comunidades`,
          countryMeetups.length && `${countryMeetups.length} meetups`,
          `${countrySoldiers.length} organizadores`,
        ]
          .filter(Boolean)
          .join(" · ")}
        icon={<span className={`fi fi-${country.code.toLowerCase()} rounded-md text-5xl shadow-glow`} aria-hidden='true' />}
        aside={
          <Globe
            className='mx-auto aspect-square w-full max-w-[34rem]'
            points={globePoints}
            focus={focus}
            onSelect={(p) => navigate(`/community/${p.id}`)}
          />
        }
      >
        <a href='#comunidades' className='btn btn-md btn-primary !text-ink-950'>
          Ver comunidades
        </a>
      </PageHero>

      {/* Intro + stats */}
      <section className='relative py-16'>
        <div className='mx-auto grid grid-cols-1 max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[1.4fr_1fr] lg:items-center'>
          <Reveal>
            <div className='eyebrow mb-6'>El panorama</div>
            <p className='text-xl leading-relaxed text-gray-200 md:text-2xl'>{country.intro}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className='grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10'>
              {stats.map((s) => (
                <div key={s.label} className='bg-ink-900 p-6'>
                  <dd className='font-display text-5xl text-white'>{s.value}</dd>
                  <dt className='mt-2 text-xs uppercase tracking-[0.2em] text-gray-500'>{s.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Communities */}
      <section id='comunidades' className='scroll-mt-24 py-20'>
        <div className='mx-auto max-w-7xl px-5 md:px-8'>
          <SectionHeader
            eyebrow='Comunidades'
            title={`Bitcoin en ${country.name}`}
            link={{ to: `/communities?pais=${encodeURIComponent(country.name)}`, label: "Abrir en el explorador" }}
          />
          {countryCommunities.length ? (
            <div className='grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]'>
              <div className='grid grid-cols-1 content-start gap-5 sm:grid-cols-2'>
                {countryCommunities.map((c, i) => (
                  <Reveal key={c.id} delay={(i % 2) * 0.08}>
                    <CommunityCard community={c} />
                  </Reveal>
                ))}
              </div>
              <div className='lg:sticky lg:top-28 lg:self-start'>
                <CommunityMap
                  points={countryCommunities.map((c) => ({
                    id: c.id,
                    lat: c.latitude,
                    lng: c.longitude,
                    title: c.title,
                    subtitle: c.city,
                    image: c.avatarImage,
                    href: `/community/${c.id}`,
                  }))}
                  maxZoom={countryCommunities.length > 1 ? 7 : 10}
                  className='h-[28rem] lg:h-[34rem]'
                />
              </div>
            </div>
          ) : (
            <div className='surface flex flex-col items-center gap-4 px-6 py-20 text-center'>
              <p className='display text-4xl text-white'>Todavía no hay comunidades</p>
              <p className='max-w-md text-gray-400'>
                ¿Organizás meetups en {country.name}? Sé la primera comunidad del país en la red.
              </p>
              <a href={ADD_COMMUNITY_URL} target='_blank' rel='noopener noreferrer' className='btn btn-sm btn-primary !text-ink-950'>
                <Plus className='h-4 w-4' /> Sumar comunidad
              </a>
            </div>
          )}
        </div>
      </section>

      {countryMeetups.length > 0 && (
        <section className='py-20'>
          <div className='mx-auto max-w-7xl px-5 md:px-8'>
            <SectionHeader eyebrow='Agenda' title='Meetups' link={{ to: "/meetups", label: "Todos los meetups" }} />
            <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
              {countryMeetups.map((m) => (
                <Link key={m.id} to={`/meetup/${m.id}`} className='surface surface-hover group block overflow-hidden'>
                  <div className='h-44 overflow-hidden'>
                    <img src={m.image} alt={m.title} loading='lazy' decoding='async' className='h-full w-full object-cover transition duration-700 group-hover:scale-110' />
                  </div>
                  <div className='p-5'>
                    <div className='flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-bitcoin'>
                      <Calendar className='h-3.5 w-3.5' /> {m.date}
                    </div>
                    <h3 className='mt-2 font-bold text-white'>{m.title}</h3>
                    <p className='mt-1 flex items-center gap-1.5 text-sm text-gray-400'>
                      <MapPin className='h-3.5 w-3.5' /> {m.location}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {countrySoldiers.length > 0 && (
        <section className='py-20'>
          <div className='mx-auto max-w-7xl px-5 md:px-8'>
            <SectionHeader eyebrow='Army' title='Organizadores' link={{ to: "/army", label: "Ver el ejército" }} />
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6'>
              {countrySoldiers.map((s) => (
                <Link key={s.id} to={`/soldier/${s.id}`} className='surface surface-hover group flex flex-col items-center p-5 text-center'>
                  <img
                    src={s.profileImage}
                    alt={s.username}
                    loading='lazy'
                    onError={(e) => ((e.target as HTMLImageElement).src = "/images/soldiers-images/soldier-placeholder.png")}
                    className='h-16 w-16 rounded-full object-cover ring-2 ring-bitcoin/40 transition group-hover:ring-bitcoin'
                  />
                  <div className='mt-3 truncate font-semibold text-white'>{s.username}</div>
                  <div className='text-xs text-gray-500'>{s.role}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cross-links */}
      <section className='py-16'>
        <div className='mx-auto max-w-7xl px-5 md:px-8'>
          <h2 className='mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500'>Otros países</h2>
          <div className='flex flex-wrap gap-2'>
            {countries
              .filter((c) => c.slug !== country.slug)
              .sort((a, b) => (counts[b.name] ?? 0) - (counts[a.name] ?? 0))
              .map((c) => (
                <Link key={c.slug} to={`/pais/${c.slug}`} className='chip'>
                  <span className={`fi fi-${c.code.toLowerCase()} rounded-sm`} aria-hidden='true' />
                  Bitcoin {c.name}
                  {counts[c.name] && <span className='text-xs text-bitcoin'>{counts[c.name]}</span>}
                </Link>
              ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={`¿Hacés Bitcoin en ${country.name}?`}
        description='Sumá tu comunidad al mapa y conectá con la red regional.'
        action={{ label: "Sumar comunidad", href: ADD_COMMUNITY_URL, external: true }}
      />
    </>
  );
};

export default CountryPage;
