import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import SEOHead from "../components/seo/SEOHead";
import { HeroAurora, MagneticButton, Reveal } from "../components/motion";

const NotFoundPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title='Página no encontrada'
        description='La página que buscás no existe o fue movida. Volvé al inicio para explorar las comunidades Bitcoin de Latinoamérica.'
        url='/404'
        noindex
      />

      <section className='relative min-h-[80vh] flex items-center justify-center overflow-hidden'>
        <HeroAurora variant='warm' intensity='vivid' />

        <div className='container relative z-10 text-center py-24'>
          <Reveal direction='up' distance={20}>
            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/40 text-xs font-bold uppercase tracking-widest text-gray-700 mb-8'>
              <span className='inline-block w-1.5 h-1.5 rounded-full bg-bitcoin animate-hero-pulse' />
              Error 404
            </div>
          </Reveal>

          <Reveal direction='up' delay={0.1}>
            <h1 className='text-7xl md:text-9xl font-black mb-6 font-heading leading-[0.9]'>
              <span className='text-gradient'>404</span>
            </h1>
          </Reveal>

          <Reveal direction='up' delay={0.2}>
            <p className='text-xl md:text-2xl text-gray-700 leading-snug max-w-xl mx-auto mb-10 font-heading'>
              Esta página no existe.{" "}
              <span className='text-bitcoin font-bold'>
                Pero la cruzada continúa.
              </span>
            </p>
          </Reveal>

          <Reveal direction='up' delay={0.35}>
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <MagneticButton>
                <Link to='/' className='btn btn-md btn-primary'>
                  <Home className='h-4 w-4' />
                  <span>Volver al inicio</span>
                </Link>
              </MagneticButton>

              <MagneticButton>
                <Link to='/communities' className='btn btn-md btn-secondary'>
                  <ArrowLeft className='h-4 w-4' />
                  <span>Ver Comunidades</span>
                </Link>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default NotFoundPage;
