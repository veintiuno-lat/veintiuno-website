import React from "react";
import SEOHead from "../components/seo/SEOHead";

const SelfCustodyPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title='Misión - Self Custody - Veintiuno.lat'
        description='Explore the unique collection of digital cards from Bitcoin communities in Latin America. Each community has 4 unique designs created by local artists.'
        keywords={[
          "bitcoin self custody",
          "multiple bitcoin self custody",
          "latam communities",
          "self custody",
          "progresive self custody",
        ]}
        url='/mission/self-custody'
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
                AUTO CUSTODIA
              </h1>
              <p className='text-xl text-gray-300 mb-8 font-heading'>
                Plan desde 0 a auto-custodia.
              </p>
            </div>
          </div>
        </section>

        {/* Nodes Section */}
        <section className='py-16 mb-16 w-full max-w-8xl px-4 md:px-12 mx-auto text-xl flex flex-col gap-4'>
          <h1>Se empieza a traves de la experiencia</h1>
          <p>
            Haciendo una rampa progresiva desde la experiencia se onboardea al
            usuario con herramientas simples.
          </p>
          <h2>Los pasos son los siguientes:</h2>
          <ol>
            <li>1 Wallet custodial</li>
            <li>NWC como backend</li>
            <li>Puede cambiar su custodia de manera dinámica</li>
            <li>1 Alby Hub (personalizado)</li>
            <li>Nodo propio</li>
          </ol>
        </section>
      </div>
    </>
  );
};

export default SelfCustodyPage;
