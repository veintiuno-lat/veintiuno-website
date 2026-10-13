import React from "react";
import { Server, Zap, Wallet, Network } from "lucide-react";
import SEOHead from "../components/seo/SEOHead";
import { MissionHero, StepList } from "../components/mission";
import { Reveal } from "../components/motion";
import { CtaBand, SectionHeader } from "../components/ui/Section";

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

      <div className='min-h-screen'>
        <MissionHero
          badge='Misión · Nodos'
          title='Nodos'
          subtitle='Multiplicar nodos de Bitcoin en Latinoamérica'
          variant='ember'
        />

        {/* Intro */}
        <section className='mx-auto max-w-4xl px-5 py-24 md:px-8 md:py-32'>
          <Reveal>
            <h2 className='display text-[clamp(2rem,10.5vw,3rem)] text-white md:text-7xl'>
              Empezamos con <span className='text-gradient'>1 nodo</span> por
              comunidad
            </h2>
            <p className='mt-8 text-xl leading-relaxed text-gray-300 md:text-2xl'>
              Comenzando por los líderes de cada comunidad. Y sumando nodos en
              el camino hasta tener una red distribuida en toda la región.
            </p>
          </Reveal>
        </section>

        {/* Steps section */}
        <section className='pb-8'>
          <div className='mx-auto max-w-3xl px-5 md:px-8'>
            <SectionHeader eyebrow='El kit' title='Cada comunidad recibe' align='center' />

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
        <CtaBand
          title='Tu nodo. Tu validación. Tu soberanía.'
          description='Seguí la guía paso a paso para armar el stack completo de tu comunidad.'
          action={{ label: "Armá tu stack", href: "/mission/stack" }}
        />
      </div>
    </>
  );
};

export default NodesPage;
