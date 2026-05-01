import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, HandMetal, ArrowDown } from "lucide-react";

import { useAnalytics } from "../hooks/use-analytics";

import InteractiveMap from "../components/map/InteractiveMap";
import SEOHead from "../components/seo/SEOHead";
import { Video } from "../components/video";
import HorizontalEventTimelineCarousel from "../components/horizontal-event-timeline-carousel";
import { Donate } from "../components/icons/donate";
import {
  Reveal,
  Stagger,
  StaggerItem,
  ParallaxLayer,
  HeroAurora,
  AnimatedCounter,
  MagneticButton,
  Marquee,
} from "../components/motion";

import { communities } from "../data/communities";

const homeKeywords = [
  "bitcoin communities LATAM",
  "bitcoin latin america",
  "bitcoin ecosystem",
  "bitcoiner networking",
  "bitcoin startups LATAM",
  "bitcoin developers",
  "bitcoin technology",
  "bitcoin innovation",
  "bitcoin entrepreneurship",
];

const sponsors = [
  { href: "https://getalby.com/", src: "/images/sponsors/alby-logo.png", alt: "Alby Hub", h: "h-20" },
  { href: "https://www.bullbitcoin.com/", src: "/images/sponsors/bull-bitcoin-logo.png", alt: "Bull Bitcoin", h: "h-14" },
  { href: "https://angor.io/", src: "/images/sponsors/angor-logo.png", alt: "Angor.io", h: "h-8" },
  { href: "https://einundzwanzig.space/", src: "/images/sponsors/einundzwanzig-logo.png", alt: "Einundzwanzig", h: "h-6" },
  { href: "https://lawallet.io", src: "/images/sponsors/lawallet-logo.png", alt: "LaWallet", h: "h-7" },
  { href: "https://lacrypta.ar", src: "/images/sponsors/lacrypta-logo.png", alt: "La Crypta", h: "h-7" },
];

const HomePage: React.FC = () => {
  const { track } = useAnalytics();

  const handleCTAClick = (action: string, destination: string) => {
    track("cta_click", "Homepage", `${action} - ${destination}`);
  };

  return (
    <>
      <SEOHead
        title='Veintiuno.lat - Connecting Bitcoin Communities in Latin America'
        description='Discover and connect with the most vibrant Bitcoin communities in Latin America. Explore events, meetups and networking opportunities across the region.'
        keywords={homeKeywords}
        url='/'
        type='website'
      />

      <div>
        {/* HERO — Aurora + Parallax */}
        <section className='relative min-h-[88vh] flex items-center justify-center overflow-hidden'>
          {/* Aurora background */}
          <HeroAurora variant='warm' intensity='vivid' />

          {/* Parallax floating accents */}
          <ParallaxLayer speed={-0.4} className='absolute inset-0'>
            <div className='absolute top-[15%] left-[8%] w-24 h-24 rounded-full bg-gradient-to-br from-bitcoin/30 to-transparent blur-2xl animate-hero-float' />
            <div
              className='absolute top-[60%] right-[10%] w-32 h-32 rounded-full bg-gradient-to-br from-coral-400/30 to-transparent blur-2xl animate-hero-float'
              style={{ animationDelay: "2s" }}
            />
            <div
              className='absolute bottom-[20%] left-[15%] w-20 h-20 rounded-full bg-gradient-to-br from-gold-400/40 to-transparent blur-xl animate-hero-float'
              style={{ animationDelay: "4s" }}
            />
          </ParallaxLayer>

          {/* Content */}
          <div className='container relative z-10 text-center py-24'>
            <Stagger delay={0.1} stagger={0.12}>
              <StaggerItem>
                <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/40 text-sm font-semibold text-gray-700 mb-8'>
                  <span className='inline-block w-2 h-2 rounded-full bg-bitcoin animate-hero-pulse' />
                  Cruzada 2025 · en marcha
                </div>
              </StaggerItem>

              <StaggerItem>
                <h1 className='text-5xl md:text-7xl lg:text-8xl text-gray-900 leading-[0.95] font-heading mb-6'>
                  <span className='block text-gradient'>La Cruzada</span>
                  <span className='block text-gray-900'>Bitcoiner</span>
                </h1>
              </StaggerItem>

              <StaggerItem>
                <p className='text-xl md:text-2xl text-gray-700 leading-relaxed max-w-2xl mx-auto font-heading mb-10'>
                  Conectamos las comunidades Bitcoin más vibrantes de
                  Latinoamérica. <span className='text-bitcoin font-bold'>Vamos a visitarlas con nuestro ejército.</span>
                </p>
              </StaggerItem>

              <StaggerItem>
                <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                  <MagneticButton>
                    <Link
                      to='/communities'
                      onClick={() => handleCTAClick("contribute", "add-volunteer")}
                      className='btn btn-md btn-primary'
                    >
                      <span>Ver Comunidades</span>
                      <HandMetal className='h-4 w-4' />
                    </Link>
                  </MagneticButton>

                  <MagneticButton>
                    <a
                      href='#map'
                      className='btn btn-md btn-secondary'
                    >
                      <span>Explorar el mapa</span>
                      <ArrowDown className='h-4 w-4' />
                    </a>
                  </MagneticButton>
                </div>
              </StaggerItem>

              <StaggerItem>
                {/* Stats row */}
                <div className='mt-16 flex flex-wrap justify-center gap-8 md:gap-16'>
                  <div className='text-center'>
                    <div className='text-4xl md:text-5xl font-heading font-black text-gradient'>
                      <AnimatedCounter to={communities.length} />
                    </div>
                    <div className='text-sm text-gray-600 mt-1 uppercase tracking-wider font-semibold'>
                      Comunidades
                    </div>
                  </div>
                  <div className='text-center'>
                    <div className='text-4xl md:text-5xl font-heading font-black text-gradient'>
                      <AnimatedCounter to={25} suffix='+' />
                    </div>
                    <div className='text-sm text-gray-600 mt-1 uppercase tracking-wider font-semibold'>
                      Donantes
                    </div>
                  </div>
                  <div className='text-center'>
                    <div className='text-4xl md:text-5xl font-heading font-black text-gradient'>
                      <AnimatedCounter to={2025} />
                    </div>
                    <div className='text-sm text-gray-600 mt-1 uppercase tracking-wider font-semibold'>
                      La Cruzada
                    </div>
                  </div>
                </div>
              </StaggerItem>
            </Stagger>
          </div>

          {/* Scroll indicator */}
          <Reveal
            delay={1.2}
            className='absolute bottom-8 left-1/2 -translate-x-1/2'
          >
            <div className='flex flex-col items-center gap-2 text-gray-500'>
              <span className='text-xs uppercase tracking-widest'>scroll</span>
              <div className='w-px h-10 bg-gradient-to-b from-bitcoin to-transparent animate-hero-pulse' />
            </div>
          </Reveal>
        </section>

        {/* Interactive Map Section */}
        <section id='map' className='py-24 bg-gray-50 relative'>
          {/* Subtle top fade from hero */}
          <div
            aria-hidden='true'
            className='pointer-events-none absolute -top-1 left-0 w-full h-24'
            style={{
              background:
                "linear-gradient(to bottom, rgba(255, 255, 255, 0.6), transparent)",
            }}
          />
          <div className='container'>
            <Reveal>
              <div className='mx-auto text-center mb-16'>
                <h2 className='mb-8 text-5xl md:text-6xl text-gray-900 font-heading items-center'>
                  <div className='text-bitcoin lg:inline-block'>bitcoiners</div>{" "}
                  <div className='text-gray-300 lg:inline-block'>en</div>{" "}
                  <div className='text-gray-700 lg:inline-block'>
                    latinoamerica
                  </div>
                </h2>
              </div>
            </Reveal>

            <Reveal direction='up' distance={48} duration={0.9}>
              <div className='w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]'>
                <InteractiveMap
                  communities={communities}
                  zoom={4}
                  mobileZoom={3}
                />
              </div>
            </Reveal>
          </div>

          {/* CTA Section */}
          <Reveal delay={0.2}>
            <div className='flex flex-col justify-center items-center gap-4 py-8 mt-12'>
              <h3 className='text-3xl text-gray-900 font-heading text-center w-full'>
                ¿Falta alguna comunidad?
              </h3>
              <div className='w-full max-w-xl mx-auto'>
                <p className='text-lg px-8 text-center text-custom-gray font-heading'>
                  Si estás comenzando una{" "}
                  <b>
                    Comunidad <span className='text-bitcoin'>Bitcoin</span> ONLY
                  </b>{" "}
                  en Latinoamérica únete a la red.
                </p>
              </div>

              <MagneticButton>
                <Link
                  to='https://github.com/veintiuno-lat/veintiuno-website/issues/new?template=add-community.yml'
                  onClick={() => handleCTAClick("contribute", "add-community")}
                  className='btn btn-md btn-primary'
                >
                  <span>Agregar Comunidad</span>
                  <ExternalLink className='h-4 w-4' />
                </Link>
              </MagneticButton>
            </div>
          </Reveal>
        </section>

        {/* Video showcase with parallax frame */}
        <section
          className='relative py-24 overflow-hidden'
          style={{
            backgroundImage: "url(/images/layout-images/bitcoin-tiles.png)",
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
          }}
        >
          {/* Top fade */}
          <div
            aria-hidden='true'
            className='pointer-events-none absolute top-0 left-0 w-full h-32 z-10'
            style={{
              background:
                "linear-gradient(to bottom, #f9fafb 0%, rgba(249, 250, 251, 0) 100%)",
            }}
          />
          <div className='container relative z-20'>
            <Reveal direction='up' distance={40}>
              <div className='max-w-4xl mx-auto'>
                <div className='text-center mb-10'>
                  <h2 className='text-4xl md:text-6xl text-gray-900 font-heading mb-4'>
                    Mirá la <span className='text-gradient'>cruzada</span>
                  </h2>
                  <p className='text-lg text-gray-600 font-heading'>
                    Historias, encuentros y movimiento en toda la región.
                  </p>
                </div>
                <ParallaxLayer speed={-0.15} scale={[0.96, 1.02]}>
                  <div className='overflow-hidden rounded-2xl shadow-minimal-xl border-gradient'>
                    <Video id='PLZqwv9PvbwQ9bIrSBh_ijWBBItZbMGIRQ' />
                  </div>
                </ParallaxLayer>
              </div>
            </Reveal>
          </div>
          {/* Bottom fade */}
          <div
            aria-hidden='true'
            className='pointer-events-none absolute bottom-0 left-0 w-full h-32 z-10'
            style={{
              background:
                "linear-gradient(to top, #f9fafb 0%, rgba(249, 250, 251, 0) 100%)",
            }}
          />
        </section>

        {/* Horizontal Event Timeline Section */}
        <section id='timeline' className='py-24 bg-gray-50'>
          <Reveal>
            <HorizontalEventTimelineCarousel />
          </Reveal>
        </section>

        {/* Support Section */}
        <section
          id='support'
          className='relative py-24 overflow-hidden'
          style={{ backgroundColor: "#F7931A" }}
        >
          {/* Subtle aurora overlay */}
          <HeroAurora variant='ember' intensity='subtle' className='opacity-50' />

          <div className='container relative z-10'>
            <Reveal>
              <div className='max-w-3xl mx-auto'>
                <div className='card-glass p-8 md:p-12 text-center'>
                  <h2 className='text-lg md:text-2xl text-gray-900 font-extrabold tracking-tight uppercase mb-2'>
                    Nuestros <span className='text-gradient'>Sponsors</span>
                  </h2>
                  <p className='text-sm text-gray-600 mb-8'>
                    Hacen posible la cruzada
                  </p>

                  {/* Animated sponsor marquee */}
                  <div className='py-6'>
                    <Marquee duration={35} gap='4rem'>
                      {sponsors.map((sponsor, idx) => (
                        <a
                          key={`${sponsor.alt}-${idx}`}
                          href={sponsor.href}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex items-center justify-center grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300'
                        >
                          <img
                            src={sponsor.src}
                            alt={sponsor.alt}
                            className={`${sponsor.h} w-auto`}
                          />
                        </a>
                      ))}
                    </Marquee>
                  </div>

                  <div className='mt-8 flex flex-col sm:flex-row items-center justify-center gap-4'>
                    <MagneticButton>
                      <a
                        href='https://geyser.fund/project/cruzadaveintiuno'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='btn btn-md btn-primary'
                      >
                        <span>Donar en Geyserfund</span>
                        <Donate width={20} height={20} />
                      </a>
                    </MagneticButton>

                    <MagneticButton>
                      <a
                        href='https://hub.angor.io/project/angor1q65fuwpyvek3fxk5p757zyknjd9k9sava3fd98j?network=main'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='btn btn-md btn-primary'
                      >
                        <span>Donar en Angor.io</span>
                        <Donate width={20} height={20} />
                      </a>
                    </MagneticButton>
                  </div>
                </div>

                <Reveal delay={0.3}>
                  <div className='flex items-center justify-center gap-3 mt-6'>
                    <img
                      src='/images/layout-images/donors.png'
                      alt='Donors'
                      className='h-10 w-auto'
                    />
                    <span className='text-white text-2xl font-semibold'>
                      <AnimatedCounter to={25} prefix='+' />
                    </span>
                  </div>
                </Reveal>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
