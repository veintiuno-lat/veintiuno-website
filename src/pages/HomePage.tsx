import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, HandMetal } from "lucide-react";

import { useAnalytics } from "../hooks/use-analytics";

import InteractiveMap from "../components/map/InteractiveMap";
import SEOHead from "../components/seo/SEOHead";
import { Video } from "../components/video";
import HorizontalEventTimelineCarousel from "../components/horizontal-event-timeline-carousel";
import { Donate } from "../components/icons/donate";

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

const HomePage: React.FC = () => {
  const { track } = useAnalytics();

  const handleCTAClick = (action: string, destination: string) => {
    track("cta_click", "Homepage", `${action} - ${destination}`);
  };

  // const handleMapScroll = () => {
  //   track("scroll_to_map", "Homepage", "Map Section");
  //   document.getElementById("map")?.scrollIntoView({ behavior: "smooth" });
  // };

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
        {/* Interactive Map Section */}
        <section id='map' className='py-18 bg-gray-50'>
          <div className='container'>
            <div className='mx-auto text-center mb-16'>
              <h2
                className='mb-8 text-5xl md:text-6xl text-gray-900 font-heading items-center'
                data-aos='fade-up'
              >
                <div className='text-bitcoin lg:inline-block'>bitcoiners</div>
                <div className='text-gray-200 lg:inline-block'>en</div>
                <div className='text-gray-600 lg:inline-block'>
                  latinoamerica
                </div>
              </h2>
              {/* <div className='w-full max-w-xl mx-auto'>
                <p className='text-xl text-custom-gray leading-relaxed'>
                  Explora las comunidades activas en toda Latinoamérica. Haz
                  clic en los marcadores para conocer más detalles sobre cada
                  comunidad.
                </p>
              </div> */}
            </div>

            <div
              data-aos='zoom-out-up'
              className='w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]'
            >
              <InteractiveMap
                communities={communities}
                zoom={4}
                mobileZoom={3}
              />
            </div>
          </div>

          {/* CTA Section */}
          <div
            className='flex flex-col justify-center items-center gap-4 py-8 mt-12'
            data-aos='fade-up'
          >
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

            <Link
              to='https://github.com/veintiuno-lat/veintiuno-website/issues/new?template=add-community.yml'
              onClick={() => handleCTAClick("contribute", "add-community")}
              className={`btn btn-md btn-primary`}
            >
              <span>Agregar Comunidad</span>
              <ExternalLink className='h-4 w-4' />
            </Link>
          </div>
        </section>

        {/* Hero Section */}
        <section
          className='relative pt-20 pb-32 bg-gray-50'
          data-aos='fade-up'
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
            <div className='mx-auto text-center space-y-12'>
              <div className='space-y-8 animate-fade-in'>
                <h1 className='text-4xl md:text-7xl lg:text-8xl text-gray-900 leading-tight font-heading'>
                  <div className='text-4xl md:text-5xl lg:text-5xl text-bitcoin'>
                    Este 2025
                  </div>
                  La Cruzada
                </h1>

                <div className='w-full max-w-xl mx-auto'>
                  <p className='text-xl md:text-2xl text-custom-gray leading-relaxed mx-auto font-heading'>
                    Vamos a visitarlas con nuestro ejército.
                  </p>
                </div>

                <Link
                  to='/communities'
                  onClick={() => handleCTAClick("contribute", "add-volunteer")}
                  className={`btn btn-md btn-primary`}
                >
                  <span>Cuales son?</span>
                  <HandMetal className='h-4 w-4' />
                </Link>

                <div className='overflow-hidden rounded-2xl shadow-minimal-xl'>
                  <Video id='PLZqwv9PvbwQ9bIrSBh_ijWBBItZbMGIRQ' />
                </div>
              </div>
            </div>
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

        {/* Features Section */}
        {/* <section className='py-24'>
          <div className='container'>
            <div className='mx-auto text-center mb-20'>
              <h2 className='mb-8 text-3xl md:text-6xl text-gray-900'>
                Fortaleciendo el Ecosistema <span className='text-bitcoin block'>Latinoamericano</span>
              </h2>
              <div className='w-full max-w-xl mx-auto'>
                <p className='text-xl text-custom-gray leading-relaxed'>
                  Nuestra misión es crear puentes entre desarrolladores, emprendedores y comunidades de toda la región,
                  fomentando la colaboración y el crecimiento.
                </p>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
              <div className='text-center space-y-6 group'>
                <div className='w-20 h-20 bg-bitcoin/10 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-bitcoin/20 transition-colors duration-200'>
                  <Users className='h-10 w-10 text-bitcoin' />
                </div>
                <h3 className='text-2xl text-gray-900'>Somos Activos</h3>
                <p className='text-custom-gray leading-relaxed text-lg'>
                  Desde meetups locales hasta eventos internacionales.
                </p>
              </div>

              <div className='text-center space-y-6 group'>
                <div className='w-20 h-20 bg-bitcoin/10 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-bitcoin/20 transition-colors duration-200'>
                  <Globe className='h-10 w-10 text-bitcoin' />
                </div>
                <h3 className='text-2xl text-gray-900'>Regionales</h3>
                <p className='text-custom-gray leading-relaxed text-lg'>
                  Explora oportunidades y conexiones en toda la región.
                </p>
              </div>

              <div className='text-center space-y-6 group'>
                <div className='w-20 h-20 bg-bitcoin/10 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-bitcoin/20 transition-colors duration-200'>
                  <Zap className='h-10 w-10 text-bitcoin' />
                </div>
                <h3 className='text-2xl text-gray-900'>Innovamos</h3>
                <p className='text-custom-gray leading-relaxed text-lg'>
                  Últimas tendencias y oportunidades del ecosistema.
                </p>
              </div>
            </div>
          </div>
        </section> */}

        {/* Horizontal Event Timeline Section */}
        <section id='timeline' className='py-24 bg-gray-50' data-aos='fade-up'>
          <HorizontalEventTimelineCarousel />
        </section>
        {/* Support Section */}
        <section
          id='support'
          className='py-24'
          style={{ backgroundColor: "#F7931A" }}
        >
          <div className='container'>
            <div className='max-w-2xl mx-auto' data-aos='fade-up'>
              <div className='bg-white rounded-2xl shadow-minimal-xl p-8 md:p-12 text-center'>
                <h2 className='text-lg md:text-2xl text-gray-900 font-extrabold tracking-tight uppercase'>
                  Nuestros SPONSORS
                </h2>

                <div className='flex flex-col gap-8 pt-8 pb-8'>
                  <div className='flex flex-col sm:flex-row items-center justify-center gap-10'>
                    <a href='https://getalby.com/' target='_blank'>
                      <img
                        src='/images/sponsors/alby-logo.png'
                        alt='Alby Hub'
                        className='h-32 w-auto'
                      />
                    </a>
                    <a href='https://www.bullbitcoin.com/' target='_blank'>
                      <img
                        src='/images/sponsors/bull-bitcoin-logo.png'
                        alt='Bull Bitcoin'
                        className='h-20 w-auto'
                      />
                    </a>
                  </div>
                  <div className='flex flex-col sm:flex-row items-center justify-center gap-10'>
                    <a href='https://angor.io/' target='_blank'>
                      <img
                        src='/images/sponsors/angor-logo.png'
                        alt='Angor.io'
                        className='h-10 w-auto'
                      />
                    </a>

                    <a href='https://einundzwanzig.space/' target='_blank'>
                      <img
                        src='/images/sponsors/einundzwanzig-logo.png'
                        alt='Einundzwanzig'
                        className='h-6 w-auto'
                      />
                    </a>
                  </div>
                  <div className='flex flex-col sm:flex-row items-center justify-center gap-10'>
                    <a href='https://lawallet.io' target='_blank'>
                      <img
                        src='/images/sponsors/lawallet-logo.png'
                        alt='LaWallet'
                        className='h-8 w-auto'
                      />
                    </a>

                    <a href='https://lacrypta.ar' target='_blank'>
                      <img
                        src='/images/sponsors/lacrypta-logo.png'
                        alt='La Crypta'
                        className='h-8 w-auto'
                      />
                    </a>
                  </div>
                </div>

                <div className='mt-4 flex flex-col sm:flex-row items-center justify-center gap-4'>
                  <a
                    href='https://geyser.fund/project/cruzadaveintiuno'
                    target='_blank'
                    className='btn btn-md btn-primary'
                  >
                    <span>Donate to Geyserfund</span>
                    <Donate width={20} height={20} />
                  </a>

                  <a
                    href='https://hub.angor.io/project/angor1q65fuwpyvek3fxk5p757zyknjd9k9sava3fd98j?network=main'
                    target='_blank'
                    className='btn btn-md btn-primary'
                  >
                    <span>Donate to Angor.io</span>
                    <Donate width={20} height={20} />
                  </a>
                </div>
              </div>

              <div className='flex items-center justify-center gap-3 mt-6'>
                <img
                  src='/images/layout-images/donors.png'
                  alt='Donors'
                  className='h-10 w-auto'
                />
                <span className='text-white text-2xl font-semibold'>+25</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
