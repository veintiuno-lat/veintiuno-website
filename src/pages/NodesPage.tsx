import React from "react";
import { Server, Zap, Wallet, Network } from "lucide-react";
import SEOHead from "../components/seo/SEOHead";
import { MissionHero, StepList } from "../components/mission";
import { Reveal } from "../components/motion";

const NodesPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title='Misión: Nodos Bitcoin en LATAM · Veintiuno'
        description='Multiplicar nodos Bitcoin en Latinoamérica. Cada comunidad con su propia infraestructura soberana — validación, Lightning y wallet stack.'
        keywords={[
          "nodos bitcoin",
          "nodo bitcoin latinoamerica",
          "infraestructura bitcoin",
          "soberanía bitcoin",
          "lightning network",
          "veintiuno",
        ]}
        url='/mission/nodes'
        type='website'
      />

      <div className='min-h-screen bg-white'>
        <MissionHero
          badge='Misión · Nodos'
          title='Nodos'
          subtitle='Multiplicar nodos de Bitcoin en Latinoamérica'
          variant='ember'
        />

        {/* Intro */}
        <section className='py-20 max-w-4xl px-4 md:px-12 mx-auto'>
          <Reveal>
            <h2 className='text-4xl md:text-5xl font-heading font-black text-gray-900 mb-6'>
              Empezamos con <span className='text-gradient'>1 nodo</span> por
              comunidad
            </h2>
            <p className='text-xl text-gray-600 leading-relaxed'>
              Comenzando por los líderes de cada comunidad. Y sumando nodos en
              el camino hasta tener una red distribuida en toda la región.
            </p>
          </Reveal>
        </section>

        {/* Steps section */}
        <section className='py-16 bg-gradient-to-b from-gray-50 to-white'>
          <div className='max-w-3xl px-4 md:px-12 mx-auto'>
            <Reveal>
              <h2 className='text-3xl md:text-4xl font-heading font-black text-gray-900 mb-12 text-center'>
                Cada comunidad recibe
              </h2>
            </Reveal>

            <StepList
              steps={[
                {
                  number: 1,
                  title: "Nodo Bitcoin",
                  description: "Validación soberana de la blockchain",
                  icon: <Server className='w-6 h-6' />,
                },
                {
                  number: 2,
                  title: "Nodo Lightning",
                  description: "Pagos instantáneos en la red Lightning",
                  icon: <Zap className='w-6 h-6' />,
                },
                {
                  number: 3,
                  title: "Alby Hub",
                  description: "Puente entre tu nodo y el mundo via NWC",
                  icon: <Network className='w-6 h-6' />,
                },
                {
                  number: 4,
                  title: "LaWallet Stack",
                  description: "Wallet y experiencia de usuario soberana",
                  icon: <Wallet className='w-6 h-6' />,
                },
              ]}
            />
          </div>
        </section>

        {/* Closing CTA */}
        <section className='py-24'>
          <Reveal>
            <div className='max-w-3xl mx-auto px-4 md:px-12 text-center'>
              <p className='text-2xl md:text-3xl font-heading font-bold text-gray-900 leading-snug'>
                Tu nodo. Tu validación.{" "}
                <span className='text-gradient'>Tu soberanía.</span>
              </p>
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
};

export default NodesPage;
