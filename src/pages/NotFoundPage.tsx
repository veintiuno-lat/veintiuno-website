import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowRight } from "lucide-react";
import SEOHead from "../components/seo/SEOHead";
import { Reveal } from "../components/motion";
import ShaderBackdrop from "@/components/three/ShaderBackdrop";

const NotFoundPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title='Página no encontrada'
        description='La página que buscás no existe o fue movida. Volvé al inicio para explorar las comunidades Bitcoin de Latinoamérica.'
        url='/404'
        noindex
      />

      <section className='relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pb-20 pt-28'>
        <ShaderBackdrop className='-z-20' />
        <div
          aria-hidden='true'
          className='grid-lines grain absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]'
        />

        <div className='relative text-center'>
          <Reveal direction='up' distance={20}>
            <div className='eyebrow mb-8'>
              <span className='h-1.5 w-1.5 rounded-full bg-bitcoin shadow-[0_0_10px_#F7931A]' />
              Error 404
            </div>
          </Reveal>

          <Reveal direction='up' delay={0.1}>
            <h1 className='display text-gradient text-[38vw] drop-shadow-[0_0_60px_rgba(247,147,26,0.35)] sm:text-[14rem] md:text-[18rem] lg:text-[22rem]'>
              404
            </h1>
          </Reveal>

          <Reveal direction='up' delay={0.2}>
            <p className='mx-auto mt-6 max-w-xl text-xl leading-snug text-gray-300 md:text-2xl'>
              Esta página no existe. <span className='font-semibold text-bitcoin'>Pero la cruzada continúa.</span>
            </p>
          </Reveal>

          <Reveal direction='up' delay={0.35}>
            <div className='mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row'>
              <Link to='/' className='btn btn-md btn-primary !text-ink-950'>
                <Home className='h-4 w-4' />
                Volver al inicio
              </Link>
              <Link to='/communities' className='btn btn-md btn-secondary'>
                Ver comunidades
                <ArrowRight className='h-4 w-4' />
              </Link>
            </div>
          </Reveal>
        </div>

        <div aria-hidden='true' className='pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950' />
      </section>
    </>
  );
};

export default NotFoundPage;
