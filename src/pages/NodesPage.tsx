import React from "react";
import SEOHead from "../components/seo/SEOHead";

const NodesPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title='Misión - Nodes - Veintiuno.lat'
        description='Explore the unique collection of digital cards from Bitcoin communities in Latin America. Each community has 4 unique designs created by local artists.'
        keywords={[
          "bitcoin nodes",
          "multiple bitcoin nodes",
          "latam communities",
          "deploy nodes",
        ]}
        url='/mission/nodes'
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
                NODOS
              </h1>
              <p className='text-xl text-gray-300 mb-8 font-heading'>
                Multiplicar nodos de Bitcoin en Latinoamérica
              </p>
            </div>
          </div>
        </section>

        {/* Nodes Section */}
        <section className='py-16 mb-16 w-full max-w-8xl px-4 md:px-12 mx-auto text-xl flex flex-col gap-4'>
          <h1>Se empieza con 1 Nodo por comunidad</h1>
          <p>
            Empezando por los lideres de cada comunidad. Y sumando nodos en el
            camino.
          </p>
          <h2>Cada comunidad tendrá</h2>
          <ol>
            <li>1 Nodo de Bitcoin</li>
            <li>1 Nodo de Lightning</li>
            <li>Alby Hub</li>
            <li>LaWallet Stack</li>
          </ol>
        </section>
      </div>
    </>
  );
};

export default NodesPage;
