import React from "react";
import { Store, CreditCard, Sparkles } from "lucide-react";
import SEOHead from "../components/seo/SEOHead";
import { MissionHero } from "../components/mission";
import { AnimatedCounter, Reveal, Stagger, StaggerItem } from "../components/motion";
import { CtaBand, SectionHeader } from "../components/ui/Section";

const MerchantsPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title='Misión: Comercios Bitcoin · Veintiuno'
        description='Onboarding masivo de comercios Bitcoin en Latinoamérica con POS y tarjetas NFC. Que todo comercio acepte sats, en cada ciudad.'
        keywords={[
          "comercios bitcoin",
          "bitcoin pagos",
          "POS bitcoin",
          "NFC bitcoin",
          "tarjetas bitcoin",
          "veintiuno",
        ]}
        url='/mission/merchants'
        type='website'
      />

      <div className='min-h-screen'>
        <MissionHero
          badge='Misión · Comercios'
          title='Comercios'
          subtitle='Multiplicar comercios Bitcoin en Latinoamérica'
          variant='warm'
        />

        {/* Intro */}
        <section className='mx-auto max-w-4xl px-5 py-24 md:px-8 md:py-32'>
          <Reveal>
            <h2 className='display text-[clamp(2rem,10.5vw,3rem)] text-white md:text-7xl'>
              Onboarding masivo de <span className='text-gradient'>comercios</span>
            </h2>
            <p className='mt-8 text-xl leading-relaxed text-gray-300 md:text-2xl'>
              Es importante que los comercios se mantengan activos en la red.
              Por eso entregamos las herramientas para que cada negocio pueda
              recibir Bitcoin en segundos.
            </p>
          </Reveal>
        </section>

        {/* Stats grid — what each community gets */}
        <section className='pb-16'>
          <div className='mx-auto max-w-5xl px-5 md:px-8'>
            <SectionHeader eyebrow='El kit' title='Cada comunidad recibe' align='center' />

            <Stagger stagger={0.15} className='grid grid-cols-1 gap-5 md:grid-cols-2'>
              {[
                { icon: Store, value: 15, label: "Puntos de venta (POS)", body: "Para que comercios reciban pagos en Bitcoin sin fricciones." },
                { icon: CreditCard, value: 200, label: "Tarjetas NFC", body: "Coleccionables que circulan y atraen usuarios al comercio." },
              ].map(({ icon: Icon, value, label, body }) => (
                <StaggerItem key={label} className='h-full'>
                  <div className='surface surface-hover group h-full overflow-hidden p-8 md:p-10'>
                    <div aria-hidden='true' className='absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(closest-side,rgba(247,147,26,0.1),transparent)] opacity-60 transition-opacity duration-500 group-hover:opacity-100' />
                    <div className='relative flex h-14 w-14 items-center justify-center rounded-full border border-bitcoin/30 bg-bitcoin/10 text-bitcoin transition-transform duration-500 group-hover:scale-110'>
                      <Icon className='h-6 w-6' />
                    </div>
                    <div className='relative mt-8 font-display text-7xl leading-none text-white md:text-8xl'>
                      <AnimatedCounter to={value} />
                    </div>
                    <div className='relative mt-3 text-lg font-semibold text-white'>{label}</div>
                    <p className='relative mt-2 text-gray-400'>{body}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Tarjetas NFC explainer */}
        <section className='py-16'>
          <div className='mx-auto max-w-3xl px-5 md:px-8'>
            <Reveal>
              <div className='surface border-gradient p-8 md:p-12'>
                <div className='mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-bitcoin/30 bg-bitcoin/10'>
                  <Sparkles className='h-6 w-6 text-bitcoin' />
                </div>
                <h3 className='display text-3xl text-white md:text-4xl'>Tarjetas NFC</h3>
                <p className='mt-4 text-lg leading-relaxed text-gray-300'>
                  Las tarjetas NFC pueden ser entregadas por los comercios e
                  incrementan las chances de recibir usuarios que las
                  coleccionan. Esto proporciona un{" "}
                  <strong className='text-white'>
                    incentivo para que el comercio se mantenga activo
                  </strong>{" "}
                  y tenga un mayor alcance en la red.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <CtaBand
          title='Que todo comercio acepte sats'
          description='Conocé las tarjetas coleccionables que circulan por los comercios de la red.'
          action={{ label: "Ver tarjetas", href: "/cards" }}
        />
      </div>
    </>
  );
};

export default MerchantsPage;
