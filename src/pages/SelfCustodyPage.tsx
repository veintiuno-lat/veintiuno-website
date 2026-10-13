import React from "react";
import { Wallet, Link2, ArrowUpRight, Server, KeyRound } from "lucide-react";
import SEOHead from "../components/seo/SEOHead";
import { MissionHero, StepList } from "../components/mission";
import { Reveal } from "../components/motion";
import { CtaBand, SectionHeader } from "../components/ui/Section";

const SelfCustodyPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title='Misión: Auto-custodia Bitcoin · Veintiuno'
        description='Rampa progresiva de wallet custodial a nodo propio. Aprendé a tomar control real de tus bitcoins paso a paso, sin terceros.'
        keywords={[
          "auto custodia bitcoin",
          "self custody bitcoin",
          "wallet bitcoin",
          "soberanía bitcoin",
          "no your keys not your coins",
          "veintiuno",
        ]}
        url='/mission/self-custody'
        type='website'
      />

      <div className='min-h-screen'>
        <MissionHero
          badge='Misión · Auto Custodia'
          title='Auto Custodia'
          subtitle='Plan progresivo desde 0 hasta soberanía total'
          variant='sunrise'
        />

        {/* Intro */}
        <section className='mx-auto max-w-4xl px-5 py-24 md:px-8 md:py-32'>
          <Reveal>
            <h2 className='display text-[clamp(2rem,10.5vw,3rem)] text-white md:text-7xl'>
              Empezamos a través de la{" "}
              <span className='text-gradient'>experiencia</span>
            </h2>
            <p className='mt-8 text-xl leading-relaxed text-gray-300 md:text-2xl'>
              Haciendo una rampa progresiva desde la experiencia, se onboardea
              al usuario con herramientas simples. Cada paso reduce la confianza
              en terceros y aumenta tu soberanía.
            </p>
          </Reveal>
        </section>

        {/* Progressive steps */}
        <section className='pb-8'>
          <div className='mx-auto max-w-3xl px-5 md:px-8'>
            <SectionHeader eyebrow='5 pasos' title='La rampa progresiva' align='center' />

            <StepList
              steps={[
                {
                  number: 1,
                  icon: <Wallet className='w-6 h-6' />,
                  title: "Wallet custodial",
                  description:
                    "Primer contacto con Bitcoin sin fricción. Empezás recibiendo pagos en una wallet sencilla.",
                },
                {
                  number: 2,
                  icon: <Link2 className='w-6 h-6' />,
                  title: "NWC como backend",
                  description:
                    "Nostr Wallet Connect te conecta a un nodo remoto. La wallet sigue igual, pero los pagos pasan por infraestructura abierta.",
                },
                {
                  number: 3,
                  icon: <ArrowUpRight className='w-6 h-6' />,
                  title: "Cambiá tu custodia dinámicamente",
                  description:
                    "Probás distintos providers, comparás, elegís. Aprendés que la custodia es una decisión.",
                },
                {
                  number: 4,
                  icon: <KeyRound className='w-6 h-6' />,
                  title: "Alby Hub personalizado",
                  description:
                    "Tu propio Alby Hub corriendo en infraestructura compartida. Llaves tuyas, configuración tuya.",
                },
                {
                  number: 5,
                  icon: <Server className='w-6 h-6' />,
                  title: "Nodo propio",
                  description:
                    "Soberanía completa. Tu hardware, tu software, tu validación. Don't trust, verify.",
                },
              ]}
            />
          </div>
        </section>

        {/* Closing */}
        <CtaBand
          title='Cada paso te acerca a la verdadera soberanía'
          description='El último escalón es tu propio nodo. Te mostramos cómo armarlo.'
          action={{ label: "Ver el stack", href: "/mission/stack" }}
        />
      </div>
    </>
  );
};

export default SelfCustodyPage;
