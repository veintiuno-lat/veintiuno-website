import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Globe, Zap, ExternalLink } from 'lucide-react';

import InteractiveMap from '../components/map/InteractiveMap';
import SEOHead from '../components/seo/SEOHead';

import { communities } from '../data/communities';

const HomePage: React.FC = () => {
  const homeKeywords = [
    'comunidades bitcoiners LATAM',
    'bitcoin latinoamérica',
    'ecosistema bitcoin',
    'networking bitcoiner',
    'startups bitcoin LATAM',
    'programadores bitcoin',
    'tecnología bitcoin',
    'innovación bitcoin',
    'emprendimiento bitcoin',
  ];

  return (
    <>
      <SEOHead
        title='Veintiuno.lat - Conectando Comunidades Bitcoiners en Latinoamérica'
        description='Descubre y conecta con las comunidades Bitcoiners más vibrantes de Latinoamérica. Explora eventos, meetups y oportunidades de networking en toda la región.'
        keywords={homeKeywords}
        url='/'
        type='website'
      />

      <div className='space-y-32'>
        {/* Hero Section */}
        <section className='pt-20 pb-32'>
          <div className='container'>
            <div className='mx-auto text-center space-y-12'>
              <div className='space-y-8 animate-fade-in'>
                <h1 className='font-theboldfont font-bold text-4xl md:text-7xl lg:text-8xl text-gray-900 leading-tight'>
                  Conectando
                  <span className='block text-bitcoin'>Comunidades Bitcoiners</span>
                  en Latinoamérica
                </h1>

                <div className='w-full max-w-xl mx-auto'>
                  <p className='text-xl md:text-2xl text-gray-600 leading-relaxed mx-auto'>
                    Descubre, participa y contribuye al vibrante ecosistema Bitcoiner de nuestra región.
                  </p>
                </div>
              </div>

              <div className='flex flex-col sm:flex-row gap-6 justify-center items-center'>
                {/* <Link
                  to="/blog"
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <span>Explorar Blog</span>
                  <ArrowRight className="h-5 w-5" />
                </Link> */}
                <button
                  onClick={() => document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' })}
                  className='btn btn-md btn-secondary'
                >
                  Ver Mapa Interactivo
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className='py-24'>
          <div className='container'>
            <div className='mx-auto text-center mb-20'>
              <h2 className='mb-8 font-theboldfont font-bold text-3xl md:text-6xl text-gray-900'>
                Fortaleciendo el Ecosistema <span className='text-bitcoin block'>Bitcoiner Latinoamericano</span>
              </h2>
              <div className='w-full max-w-xl mx-auto'>
                <p className='text-xl text-gray-600 leading-relaxed'>
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
                <h3 className='font-theboldfont font-bold text-2xl text-gray-900'>Comunidades Activas</h3>
                <p className='text-gray-600 leading-relaxed text-lg'>
                  Desde meetups locales hasta eventos internacionales.
                </p>
              </div>

              <div className='text-center space-y-6 group'>
                <div className='w-20 h-20 bg-bitcoin/10 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-bitcoin/20 transition-colors duration-200'>
                  <Globe className='h-10 w-10 text-bitcoin' />
                </div>
                <h3 className='font-theboldfont font-bold text-2xl text-gray-900'>Alcance Regional</h3>
                <p className='text-gray-600 leading-relaxed text-lg'>
                  Explora oportunidades y conexiones en toda la región.
                </p>
              </div>

              <div className='text-center space-y-6 group'>
                <div className='w-20 h-20 bg-bitcoin/10 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-bitcoin/20 transition-colors duration-200'>
                  <Zap className='h-10 w-10 text-bitcoin' />
                </div>
                <h3 className='font-theboldfont font-bold text-2xl text-gray-900'>Innovación Constante</h3>
                <p className='text-gray-600 leading-relaxed text-lg'>
                  Últimas tendencias y oportunidades del ecosistema.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Map Section */}
        <section id='map' className='py-24 bg-gray-50'>
          <div className='container'>
            <div className='mx-auto text-center mb-16'>
              <h2 className='mb-8 font-theboldfont font-bold text-5xl md:text-6xl text-gray-900'>
                Mapa de <span className='text-bitcoin'>Comunidades</span>
              </h2>
              <div className='w-full max-w-xl mx-auto'>
                <p className='text-xl text-gray-600 leading-relaxed'>
                  Explora las comunidades activas en toda Latinoamérica. Haz clic en los marcadores para conocer más
                  detalles sobre cada comunidad.
                </p>
              </div>
            </div>

            <div className='rounded-2xl overflow-hidden shadow-minimal-xl'>
              <InteractiveMap communities={communities} />
            </div>
          </div>

          {/* CTA Section */}
          <div className='flex flex-col justify-center items-center gap-4 py-8'>
            <h3 className='font-theboldfont text-3xl text-gray-900'>¿Falta tu comunidad?</h3>
            <div className='w-full max-w-xl mx-auto'>
              <p className='text-lg text-center text-gray-600'>
                Si conoces una comunidad tech activa que debería estar aquí, compártela con nosotros.
              </p>
            </div>

            <Link
              to='https://github.com/veintiuno-lat/veintiuno-website/issues/new?template=add-community.yml'
              className={`btn btn-md btn-primary`}
            >
              <span>Agregar Comunidad</span>
              <ExternalLink className='h-4 w-4' />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
