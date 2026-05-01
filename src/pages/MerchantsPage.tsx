import React from "react";
import { Store, CreditCard, Sparkles } from "lucide-react";
import SEOHead from "../components/seo/SEOHead";
import { MissionHero } from "../components/mission";
import { Reveal, Stagger, StaggerItem } from "../components/motion";

const MerchantsPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title='Misión - Merchants - Veintiuno.lat'
        description='Onboarding masivo de comercios. Multiplicar comercios Bitcoin en Latinoamérica con POS y tarjetas NFC.'
        keywords={[
          "bitcoin merchants",
          "multiple bitcoin merchants",
          "latam communities",
          "onboarding merchants",
        ]}
        url='/mission/merchants'
        type='website'
      />

      <div className='min-h-screen bg-white'>
        <MissionHero
          badge='Misión · Comercios'
          title='Comercios'
          subtitle='Multiplicar comercios Bitcoin en Latinoamérica'
          variant='warm'
        />

        {/* Intro */}
        <section className='py-20 max-w-4xl px-4 md:px-12 mx-auto'>
          <Reveal>
            <h2 className='text-4xl md:text-5xl font-heading font-black text-gray-900 mb-6'>
              Onboarding masivo de{" "}
              <span className='text-gradient'>comercios</span>
            </h2>
            <p className='text-xl text-gray-600 leading-relaxed'>
              Es importante que los comercios se mantengan activos en la red.
              Por eso entregamos las herramientas para que cada negocio pueda
              recibir Bitcoin en segundos.
            </p>
          </Reveal>
        </section>

        {/* Stats grid — what each community gets */}
        <section className='py-16 bg-gradient-to-b from-gray-50 to-white'>
          <div className='max-w-5xl mx-auto px-4 md:px-12'>
            <Reveal>
              <h2 className='text-3xl md:text-4xl font-heading font-black text-gray-900 mb-12 text-center'>
                Cada comunidad recibe
              </h2>
            </Reveal>

            <Stagger stagger={0.15} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <StaggerItem>
                <div className='card-glass p-8 h-full text-center group'>
                  <div className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-bitcoin to-bitcoin-dark text-white mb-6 shadow-lg shadow-bitcoin/30 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3'>
                    <Store className='w-8 h-8' />
                  </div>
                  <div className='text-5xl md:text-6xl font-black font-heading text-gradient mb-2'>
                    15
                  </div>
                  <div className='text-lg font-semibold text-gray-900'>
                    Puntos de venta (POS)
                  </div>
                  <p className='text-gray-600 mt-3 text-sm'>
                    Para que comercios reciban pagos en Bitcoin sin fricciones.
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className='card-glass p-8 h-full text-center group'>
                  <div className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-bitcoin to-bitcoin-dark text-white mb-6 shadow-lg shadow-bitcoin/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3'>
                    <CreditCard className='w-8 h-8' />
                  </div>
                  <div className='text-5xl md:text-6xl font-black font-heading text-gradient mb-2'>
                    200
                  </div>
                  <div className='text-lg font-semibold text-gray-900'>
                    Tarjetas NFC
                  </div>
                  <p className='text-gray-600 mt-3 text-sm'>
                    Coleccionables que circulan y atraen usuarios al comercio.
                  </p>
                </div>
              </StaggerItem>
            </Stagger>
          </div>
        </section>

        {/* Tarjetas NFC explainer */}
        <section className='py-20'>
          <div className='max-w-3xl mx-auto px-4 md:px-12'>
            <Reveal>
              <div className='card-glass p-8 md:p-12'>
                <div className='inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-bitcoin/20 to-bitcoin/5 border border-bitcoin/20 mb-6'>
                  <Sparkles className='w-6 h-6 text-bitcoin' />
                </div>
                <h3 className='text-2xl md:text-3xl font-heading font-black text-gray-900 mb-4'>
                  Tarjetas NFC
                </h3>
                <p className='text-lg text-gray-700 leading-relaxed'>
                  Las tarjetas NFC pueden ser entregadas por los comercios e
                  incrementan las chances de recibir usuarios que las
                  coleccionan. Esto proporciona un{" "}
                  <strong className='text-gray-900'>
                    incentivo para que el comercio se mantenga activo
                  </strong>{" "}
                  y tenga un mayor alcance en la red.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
};

export default MerchantsPage;
