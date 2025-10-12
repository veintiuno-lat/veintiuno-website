import React from "react";
import SEOHead from "../components/seo/SEOHead";

const MerchantsPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title='Misión - Merchants - Veintiuno.lat'
        description='Explore the unique collection of digital cards from Bitcoin communities in Latin America. Each community has 4 unique designs created by local artists.'
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
        {/* Hero Section */}
        <section className='bg-gray-900 text-white relative overflow-hidden h-72'>
          {/* Opacity overlay above background, below content */}
          <div className='absolute inset-0 bg-gray-900 bg-opacity-60 z-[1]'></div>

          <div
            className='container relative z-10 h-full flex items-center justify-center'
            data-aos='fade-up'
          >
            <div className='text-center'>
              <h1 className='text-6xl md:text-8xl font-bold text-bitcoin mb-6 font-heading'>
                COMERCIOS
              </h1>
              <p className='text-xl text-gray-300 mb-8 font-heading'>
                Multiplicar comercios en Latinoamérica
              </p>
            </div>
          </div>
        </section>

        {/* Nodes Section */}
        <section className='py-16 mb-16 w-full max-w-8xl px-4 md:px-12 mx-auto text-xl flex flex-col gap-4'>
          <h1>Onboarding masivo de comercios</h1>
          <p>Es importante que los comercios se mantengan activos en la red.</p>
          <h2>Cada comunidad tendrá</h2>
          <ol>
            <li>15 POS</li>
            <li>200 tarjetas NFC</li>
          </ol>
          <h2>Tarjetas NFC</h2>
          <p>
            Las tarjetas NFC pueden ser entregadas por los comercios e
            incrementan las chances de recibir usuarios que las coleccionan.
            Esto proporciona un incentivo para que el comercio se mantenga
            activo y tenga un mayor alcance en la red.
          </p>
        </section>
      </div>
    </>
  );
};

export default MerchantsPage;
