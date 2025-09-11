import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

import { useAnalytics } from "../hooks/use-analytics";

import InteractiveMap from "../components/map/InteractiveMap";
import SEOHead from "../components/seo/SEOHead";
import { Video } from "../components/video";
import VerticalEventTimeline from "../components/vertical-event-timeline";
import { Donate } from "../components/icons/donate";

import { communities } from "../data/communities";

const homeKeywords = [
  "comunidades bitcoiners LATAM",
  "bitcoin latinoamérica",
  "ecosistema bitcoin",
  "networking bitcoiner",
  "startups bitcoin LATAM",
  "programadores bitcoin",
  "tecnología bitcoin",
  "innovación bitcoin",
  "emprendimiento bitcoin",
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
        title='Veintiuno.lat - Conectando Comunidades Bitcoiners en Latinoamérica'
        description='Descubre y conecta con las comunidades Bitcoiners más vibrantes de Latinoamérica. Explora eventos, meetups y oportunidades de networking en toda la región.'
        keywords={homeKeywords}
        url='/'
        type='website'
      />

      <div>
        {/* Interactive Map Section */}
        <section id='map' className='py-24 bg-gray-50'>
          <div className='container'>
            <div className='mx-auto text-center mb-16'>
              <h2 className='mb-8 text-5xl md:text-6xl text-gray-900 font-heading'>
                Quienes <span className='text-bitcoin'>somos?</span>
              </h2>
              {/* <div className='w-full max-w-xl mx-auto'>
                <p className='text-xl text-custom-gray leading-relaxed'>
                  Explora las comunidades activas en toda Latinoamérica. Haz
                  clic en los marcadores para conocer más detalles sobre cada
                  comunidad.
                </p>
              </div> */}
            </div>

            <div className='w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]'>
              <InteractiveMap communities={communities} zoom={4} />
            </div>
          </div>

          {/* CTA Section */}
          <div className='flex flex-col justify-center items-center gap-4 py-8 mt-12'>
            <h3 className='text-3xl text-gray-900 font-heading'>¿Falta tu comunidad?</h3>
            <div className='w-full max-w-xl mx-auto'>
              <p className='text-lg text-center text-custom-gray font-heading'>
                Si conoces una comunidad <b>Bitcoin ONLY</b> que debería estar
                aquí, compártela con nosotros.
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
        <section className='pt-20 pb-32'>
          <div className='container'>
            <div className='mx-auto text-center space-y-12'>
              <div className='space-y-8 animate-fade-in'>
                <h1 className='text-4xl md:text-7xl lg:text-8xl text-gray-900 leading-tight font-heading'>
                  <div className='text-4xl md:text-5xl lg:text-5xl text-bitcoin'>
                    Próximamente
                  </div>
                  CRUZADA21
                </h1>

                <div className='w-full max-w-xl mx-auto'>
                  <p className='text-xl md:text-2xl text-custom-gray leading-relaxed mx-auto font-heading'>
                    La primera cruzada de Bitcoin en la historia.
                  </p>
                </div>

                <Link
                  to='https://tally.so/r/mZbAX0'
                  target='_blank'
                  onClick={() => handleCTAClick("contribute", "add-volunteer")}
                  className={`btn btn-md btn-primary`}
                >
                  <span>Inscribirme</span>
                  <ExternalLink className='h-4 w-4' />
                </Link>

                <div className='overflow-hidden rounded-2xl shadow-minimal-xl'>
                  <Video id='PLZqwv9PvbwQ9bIrSBh_ijWBBItZbMGIRQ' />
                </div>
              </div>
            </div>
          </div>
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

        {/* Vertical Event Timeline Section */}
        <section id='timeline' className='py-24 bg-gray-50'>
        <div className='mx-auto text-center'>
                <h1 className='text-4xl md:text-7xl lg:text-8xl text-gray-900 leading-tight'>
                  <div className='text-4xl md:text-5xl lg:text-5xl text-bitcoin'>
                    LIVE NOW
                  </div>
                  2025
                </h1>
          </div>
          <VerticalEventTimeline />
        </section>
        {/* Support Section */}
        <section id='support' className='py-24' style={{ backgroundColor: "#F7931A" }}>
          <div className='container'>
            <div className='max-w-2xl mx-auto'>
              <div className='bg-white rounded-2xl shadow-minimal-xl p-8 md:p-12 text-center'>
                <h2 className='text-2xl md:text-3xl text-gray-900 font-extrabold tracking-tight uppercase'>
                  APÓYANOS
                </h2>
                <p className='mt-4 text-custom-gray'>
                  Esta campaña es 100% sin fines de lucro.
                </p>

                <div className='mt-8 flex flex-col sm:flex-row items-center justify-center gap-4'>
                  <a
                    href='https://geyser.fund/project/cruzadaveintiuno'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='btn btn-md btn-primary'
                  >
                    <span>Donar a Geyserfund</span>
                    <Donate width={20} height={20} />
                  </a>

                  <a
                    href='https://angor.io'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='btn btn-md btn-primary'
                  >
                    <span>Donar a Angor.io</span>
                    <Donate width={20} height={20} />
                  </a>
                </div>
              </div>

              <div className='flex items-center justify-center gap-3 mt-6'>
                <img src='/images/donors.png' alt='Donors' className='h-10 w-auto' />
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
