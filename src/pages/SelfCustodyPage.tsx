import React from "react";
import { Wallet, Link2, ArrowUpRight, Server, KeyRound } from "lucide-react";
import SEOHead from "../components/seo/SEOHead";
import { MissionHero, StepList } from "../components/mission";
import { Reveal } from "../components/motion";

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

      <div className='min-h-screen bg-white'>
        <MissionHero
          badge='Misión · Auto Custodia'
          title='Auto Custodia'
          subtitle='Plan progresivo desde 0 hasta soberanía total'
          variant='sunrise'
        />

        {/* Intro */}
        <section className='py-20 max-w-4xl px-4 md:px-12 mx-auto'>
          <Reveal>
            <h2 className='text-4xl md:text-5xl font-heading font-black text-gray-900 mb-6'>
              Empezamos a través de la{" "}
              <span className='text-gradient'>experiencia</span>
            </h2>
            <p className='text-xl text-gray-600 leading-relaxed'>
              Haciendo una rampa progresiva desde la experiencia, se onboardea
              al usuario con herramientas simples. Cada paso reduce la confianza
              en terceros y aumenta tu soberanía.
            </p>
          </Reveal>
        </section>

        {/* Progressive steps */}
        <section className='py-16 bg-gradient-to-b from-gray-50 to-white'>
          <div className='max-w-3xl px-4 md:px-12 mx-auto'>
            <Reveal>
              <h2 className='text-3xl md:text-4xl font-heading font-black text-gray-900 mb-12 text-center'>
                La rampa progresiva
              </h2>
            </Reveal>

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
        <section className='py-24'>
          <Reveal>
            <div className='max-w-3xl mx-auto px-4 md:px-12 text-center'>
              <p className='text-2xl md:text-3xl font-heading font-bold text-gray-900 leading-snug'>
                Cada paso te acerca a la{" "}
                <span className='text-gradient'>verdadera soberanía</span>.
              </p>
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
};

export default SelfCustodyPage;
