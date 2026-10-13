import React from "react";
import { Cpu } from "lucide-react";
import SEOHead from "../components/seo/SEOHead";
import { MissionHero, StepCard } from "../components/mission";
import { Reveal, Stagger, StaggerItem } from "../components/motion";
import { CtaBand, SectionHeader } from "../components/ui/Section";

const infoBox = "rounded-2xl border border-white/10 bg-white/[0.03] p-6";
const code = "rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-base text-bitcoin";

const StackPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title='Stack Bitcoin Soberano · Veintiuno'
        description='Guía paso a paso para armar tu nodo Bitcoin: mini PC, Umbrel, Bitcoin Core, Lightning Network, Alby Hub y LaWallet. Soberanía total en español.'
        keywords={[
          "bitcoin node",
          "umbrel",
          "lightning network",
          "alby hub",
          "lawallet",
          "nodo bitcoin",
          "mini pc bitcoin",
          "self custody",
          "soberanía bitcoin",
        ]}
        url='/mission/stack'
        type='website'
      />

      <div className='min-h-screen'>
        <MissionHero
          badge='Misión · Stack'
          title='Stack'
          subtitle='Tu nodo. Tu dinero. Tus reglas.'
          variant='dark'
        />

        {/* Intro */}
        <section className='mx-auto max-w-4xl px-5 py-20 md:px-8 md:py-24'>
          <Reveal>
            <div className='flex flex-col gap-6 text-xl leading-relaxed text-gray-300 md:text-2xl'>
              <p>
                Correr tu propio nodo es el acto máximo de soberanía en
                Bitcoin. No dependés de terceros para validar tus
                transacciones, no confiás en nadie —{" "}
                <strong className='text-white'>verificás todo vos mismo</strong>.
              </p>
              <p>
                El stack completo son <strong className='text-bitcoin'>5 pasos</strong>:
                una mini PC como hardware, y 4 aplicaciones que te dan control
                total sobre tu dinero.
              </p>
            </div>
          </Reveal>
        </section>

        {/* Paso 0: Hardware */}
        <section className='py-4 md:py-6'>
          <StepCard
            step={0}
            title='El Hardware'
            logo='/logos/umbrel.png'
            logoAlt='Hardware'
          >
            <p>
              Necesitás una <strong>mini PC</strong> dedicada. No tu laptop,
              no un server en la nube — una computadora física que esté
              siempre prendida en tu casa o espacio.
            </p>
            <div className={infoBox}>
              <div className='flex items-center gap-3 mb-4'>
                <Cpu className='w-6 h-6 text-bitcoin' />
                <h3 className='text-xl font-bold text-white'>
                  Requerimientos mínimos
                </h3>
              </div>
              <ul className='space-y-2'>
                <li>
                  <strong>CPU:</strong> Intel N100 / AMD equivalente
                  (cualquier mini PC moderna)
                </li>
                <li>
                  <strong>RAM:</strong> 8 GB mínimo (16 GB recomendado)
                </li>
                <li>
                  <strong>Almacenamiento:</strong> SSD de 1 TB mínimo (la
                  blockchain de Bitcoin ocupa ~600 GB y crece)
                </li>
                <li>
                  <strong>Conexión:</strong> Ethernet (cable) recomendado,
                  WiFi funciona pero es menos estable
                </li>
                <li>
                  <strong>Energía:</strong> Encendida 24/7 — las mini PC
                  consumen entre 6-15W
                </li>
              </ul>
            </div>
            <p className='text-gray-400'>
              Opciones populares:{" "}
              <a
                href='https://www.bee-link.com/collections/mini-s-series'
                target='_blank'
                rel='noopener noreferrer'
                className='text-bitcoin link-underline'
              >
                Beelink Mini S12
              </a>
              , Intel NUC, o cualquier mini PC con las specs de arriba.
              Presupuesto: ~USD 150-250.
            </p>
          </StepCard>
        </section>

        {/* Paso 1: Umbrel */}
        <section className='py-4 md:py-6'>
          <StepCard step={1} title='Umbrel' logo='/logos/umbrel.png'>
            <p>
              <a
                href='https://umbrel.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-bitcoin link-underline font-semibold'
              >
                Umbrel
              </a>{" "}
              es el sistema operativo de tu nodo. Lo instalás en la mini PC y
              te da una interfaz web para administrar todo: apps, nodo
              Bitcoin, Lightning, y más.
            </p>
            <div className={infoBox}>
              <h3 className='mb-4 text-xl font-bold text-white'>
                Instalación
              </h3>
              <ol className='list-inside list-decimal space-y-3 marker:font-display marker:text-bitcoin'>
                <li>
                  Descargá Umbrel OS desde{" "}
                  <a
                    href='https://umbrel.com/umbrelos'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-bitcoin link-underline'
                  >
                    umbrel.com/umbrelos
                  </a>
                </li>
                <li>
                  Flasheá la imagen en un USB con{" "}
                  <a
                    href='https://etcher.balena.io'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-bitcoin link-underline'
                  >
                    Balena Etcher
                  </a>
                </li>
                <li>Conectá el USB a la mini PC y booteá desde ahí</li>
                <li>
                  Seguí las instrucciones en pantalla — creá tu cuenta y
                  contraseña
                </li>
                <li>
                  Accedé desde cualquier dispositivo en tu red local vía{" "}
                  <code className={code}>
                    umbrel.local
                  </code>
                </li>
              </ol>
            </div>
            <p>
              Umbrel funciona como un <strong>app store</strong> para tu
              nodo. Desde ahí vas a instalar las aplicaciones siguientes.
            </p>
          </StepCard>
        </section>

        {/* Paso 2: Bitcoin Node */}
        <section className='py-4 md:py-6'>
          <StepCard step={2} title='Nodo Bitcoin' logo='/logos/bitcoin.png'>
            <p>
              <a
                href='https://bitcoin.org/en/bitcoin-core/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-bitcoin link-underline font-semibold'
              >
                Bitcoin Core
              </a>{" "}
              es el software que valida cada transacción y cada bloque.
              Cuando corrés tu propio nodo, dejás de confiar en terceros —
              verificás la cadena completa vos mismo.
            </p>
            <div className={infoBox}>
              <h3 className='mb-4 text-xl font-bold text-white'>
                Instalación
              </h3>
              <ol className='list-inside list-decimal space-y-3 marker:font-display marker:text-bitcoin'>
                <li>
                  En Umbrel, andá a la <strong>App Store</strong>
                </li>
                <li>
                  Buscá <strong>"Bitcoin Node"</strong> e instalalo
                </li>
                <li>
                  Esperá la sincronización inicial — puede tardar entre{" "}
                  <strong>2 a 7 días</strong> dependiendo de tu conexión y
                  hardware
                </li>
                <li>
                  Una vez sincronizado, tu nodo valida todas las
                  transacciones de la red
                </li>
              </ol>
            </div>
            <div className='rounded-2xl border border-bitcoin/30 bg-bitcoin/[0.07] p-6'>
              <p className='text-gray-200'>
                ⏳ <strong>Paciencia:</strong> La sincronización inicial
                descarga y verifica toda la historia de Bitcoin (~600 GB). No
                apagues la mini PC durante este proceso. Después de la
                primera sincronización, se mantiene actualizado en tiempo
                real.
              </p>
            </div>
          </StepCard>
        </section>

        {/* Paso 3: Lightning Node */}
        <section className='py-4 md:py-6'>
          <StepCard
            step={3}
            title='Nodo Lightning'
            logo='/logos/lightning.svg'
            logoAlt='Lightning Network (LND)'
          >
            <p>
              <a
                href='https://lightning.network'
                target='_blank'
                rel='noopener noreferrer'
                className='text-bitcoin link-underline font-semibold'
              >
                Lightning Network
              </a>{" "}
              es la capa de pagos instantáneos de Bitcoin. Con tu propio nodo
              Lightning, podés enviar y recibir sats en segundos, abrir
              canales, y participar en la red de pagos.
            </p>
            <div className={infoBox}>
              <h3 className='mb-4 text-xl font-bold text-white'>
                Instalación
              </h3>
              <ol className='list-inside list-decimal space-y-3 marker:font-display marker:text-bitcoin'>
                <li>
                  En Umbrel App Store, buscá{" "}
                  <strong>"Lightning Node"</strong> (
                  <a
                    href='https://github.com/lightningnetwork/lnd'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-bitcoin link-underline'
                  >
                    LND
                  </a>
                  ) e instalalo
                </li>
                <li>
                  Esperá a que se sincronice con tu nodo Bitcoin (necesita
                  que Bitcoin Core esté 100% sincronizado)
                </li>
                <li>Creá una wallet Lightning desde la interfaz</li>
                <li>
                  <strong>Abrí canales</strong> con otros nodos para empezar
                  a rutear pagos
                </li>
              </ol>
            </div>
            <div className='rounded-2xl border border-sky-400/25 bg-sky-400/[0.06] p-6'>
              <p className='text-gray-200'>
                💡 <strong>Tip:</strong> Para abrir canales necesitás sats
                on-chain. Empezá con 1-2 canales hacia nodos bien conectados
                (ej:{" "}
                <a
                  href='https://amboss.space'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-sky-300 link-underline'
                >
                  Amboss
                </a>{" "}
                te ayuda a encontrar buenos peers). Con el tiempo podés
                agregar más liquidez.
              </p>
            </div>
          </StepCard>
        </section>

        {/* Paso 4: Alby Hub */}
        <section className='py-4 md:py-6'>
          <StepCard step={4} title='Alby Hub' logo='/logos/alby-hub.png'>
            <p>
              <a
                href='https://getalby.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-bitcoin link-underline font-semibold'
              >
                Alby Hub
              </a>{" "}
              es la interfaz que conecta tu nodo Lightning con el mundo. Te
              permite usar tu nodo desde el navegador, conectar wallets
              externas vía <strong>NWC (Nostr Wallet Connect)</strong>, y
              recibir pagos con tu propia Lightning Address.
            </p>
            <div className={infoBox}>
              <h3 className='mb-4 text-xl font-bold text-white'>
                Instalación
              </h3>
              <ol className='list-inside list-decimal space-y-3 marker:font-display marker:text-bitcoin'>
                <li>
                  En Umbrel App Store, buscá <strong>"Alby Hub"</strong> e
                  instalalo
                </li>
                <li>
                  Conectalo a tu nodo Lightning (LND) — Alby detecta
                  automáticamente tu nodo en Umbrel
                </li>
                <li>
                  Configurá tu <strong>Lightning Address</strong> (ej:{" "}
                  <code className={code}>
                    tunombre@getalby.com
                  </code>
                  )
                </li>
                <li>
                  Instalá la{" "}
                  <a
                    href='https://getalby.com/extension'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-bitcoin link-underline'
                  >
                    extensión de Alby
                  </a>{" "}
                  en tu navegador para firmar y pagar desde cualquier sitio
                  web
                </li>
                <li>
                  Generá <strong>conexiones NWC</strong> para vincular
                  wallets externas (Amethyst, Damus, etc.) a tu propio nodo
                </li>
              </ol>
            </div>
            <div className='rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.06] p-6'>
              <p className='text-gray-200'>
                🔑 <strong>¿Por qué Alby?</strong> Sin Alby, tu nodo
                Lightning solo es accesible desde la interfaz de Umbrel en tu
                red local. Alby te permite usar tu nodo desde cualquier
                lugar, conectar apps externas, y recibir pagos con una
                Lightning Address — todo apuntando a TU nodo, no a un
                custodio.
              </p>
            </div>
          </StepCard>
        </section>

        {/* Paso 5: LaWallet */}
        <section className='py-4 md:py-6'>
          <StepCard step={5} title='LaWallet' logo='/logos/lawallet.jpg'>
            <p>
              <a
                href='https://lawallet.io'
                target='_blank'
                rel='noopener noreferrer'
                className='text-bitcoin link-underline font-semibold'
              >
                LaWallet
              </a>{" "}
              es la wallet de Bitcoin y Lightning diseñada para el uso
              diario. Conecta a tu nodo vía NWC (Nostr Wallet Connect) y te
              da una experiencia de pago simple, rápida y soberana.
            </p>
            <div className={infoBox}>
              <h3 className='mb-4 text-xl font-bold text-white'>
                Configuración
              </h3>
              <ol className='list-inside list-decimal space-y-3 marker:font-display marker:text-bitcoin'>
                <li>
                  Descargá LaWallet desde{" "}
                  <a
                    href='https://lawallet.io'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-bitcoin link-underline'
                  >
                    lawallet.io
                  </a>{" "}
                  (web app o mobile)
                </li>
                <li>
                  Creá tu cuenta con tu clave Nostr (nsec) o generá una nueva
                </li>
                <li>
                  En Alby Hub, generá una <strong>conexión NWC</strong> nueva
                  para LaWallet
                </li>
                <li>
                  En LaWallet, conectá la cadena NWC — ahora tus pagos salen
                  directo de tu nodo
                </li>
                <li>
                  Listo — tenés una wallet mobile/web apuntando a TU
                  infraestructura
                </li>
              </ol>
            </div>
            <div className='rounded-2xl border border-violet-400/25 bg-violet-400/[0.06] p-6'>
              <p className='text-gray-200'>
                🔗 <strong>El poder del NWC:</strong> LaWallet no custodia
                tus fondos. Se conecta a tu Alby Hub que se conecta a tu nodo
                Lightning que se conecta a tu nodo Bitcoin. Cadena completa
                de soberanía: vos controlás cada eslabón.
              </p>
            </div>
          </StepCard>
        </section>

        {/* Resultado Final */}
        <section className='relative overflow-hidden py-24 md:py-32'>
          <div aria-hidden='true' className='absolute left-1/2 top-1/3 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(247,147,26,0.07),transparent)]' />
          <div className='mx-auto max-w-4xl px-5 md:px-8'>
            <SectionHeader
              eyebrow='Resultado final'
              title='Tu stack soberano'
              description='Con estos 5 pasos tenés un stack soberano completo.'
              align='center'
            />

            <Stagger stagger={0.1} className='flex flex-col items-center gap-2'>
              {[
                { logo: "/logos/lawallet.jpg", name: "LaWallet", desc: "Tu wallet diaria", connector: "NWC" },
                { logo: "/logos/alby-hub.png", name: "Alby Hub", desc: "Puente al mundo", connector: "↕" },
                { logo: "/logos/lightning.svg", name: "Lightning Node", desc: "Pagos instantáneos", connector: "↕" },
                { logo: "/logos/bitcoin.png", name: "Bitcoin Node", desc: "Validación soberana", connector: "↕" },
                { logo: "/logos/umbrel.png", name: "Umbrel", desc: "Sistema operativo", connector: "↕" },
                { emoji: "🖥️", name: "Mini PC", desc: "Tu hardware" },
              ].map((layer, idx) => (
                <React.Fragment key={layer.name}>
                  <StaggerItem className='w-full max-w-md'>
                    <div className='surface surface-hover flex items-center gap-4 px-5 py-4 hover:-translate-y-0.5'>
                      {layer.logo ? (
                        <img src={layer.logo} alt={layer.name} loading='lazy' decoding='async' className='h-10 w-10 shrink-0 rounded-xl ring-1 ring-white/10' />
                      ) : (
                        <span className='flex h-10 w-10 shrink-0 items-center justify-center text-2xl'>{layer.emoji}</span>
                      )}
                      <div className='min-w-0'>
                        <div className='font-bold text-white'>{layer.name}</div>
                        <div className='text-sm text-gray-400'>{layer.desc}</div>
                      </div>
                      <span className='ml-auto font-display text-lg text-bitcoin/70'>{String(5 - idx).padStart(2, "0")}</span>
                    </div>
                  </StaggerItem>
                  {idx < 5 && (
                    <StaggerItem>
                      <div className='font-mono text-sm text-bitcoin/70'>{layer.connector}</div>
                    </StaggerItem>
                  )}
                </React.Fragment>
              ))}
            </Stagger>
          </div>
        </section>

        <CtaBand
          title="Don't trust, verify"
          description='Tu nodo, tu dinero, tus reglas. Sin intermediarios, sin custodios, sin permiso.'
          action={{ label: "Encontrá tu comunidad", href: "/communities" }}
        />
      </div>
    </>
  );
};

export default StackPage;
