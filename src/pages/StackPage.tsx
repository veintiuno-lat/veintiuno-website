import React from "react";
import { Cpu } from "lucide-react";
import SEOHead from "../components/seo/SEOHead";
import { MissionHero, StepCard } from "../components/mission";
import { Reveal, Stagger, StaggerItem } from "../components/motion";

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

      <div className='min-h-screen bg-white'>
        <MissionHero
          badge='Misión · Stack'
          title='Stack'
          subtitle='Tu nodo. Tu dinero. Tus reglas.'
          variant='dark'
        />

        {/* Intro */}
        <section className='py-20 max-w-4xl px-4 md:px-12 mx-auto'>
          <Reveal>
            <div className='text-xl flex flex-col gap-6 text-gray-700 leading-relaxed'>
              <p>
                Correr tu propio nodo es el acto máximo de soberanía en
                Bitcoin. No dependés de terceros para validar tus
                transacciones, no confiás en nadie —{" "}
                <strong className='text-gray-900'>verificás todo vos mismo</strong>.
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
        <section className='py-8 bg-gradient-to-b from-gray-50 to-white'>
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
            <div className='card-glass p-6'>
              <div className='flex items-center gap-3 mb-4'>
                <Cpu className='w-6 h-6 text-bitcoin' />
                <h3 className='text-xl font-bold font-heading'>
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
            <p className='text-gray-600'>
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
        <section className='py-8'>
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
            <div className='card-glass p-6'>
              <h3 className='text-xl font-bold font-heading mb-4'>
                Instalación
              </h3>
              <ol className='space-y-3 list-decimal list-inside'>
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
                  <code className='bg-gray-100 px-2 py-1 rounded text-bitcoin'>
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
        <section className='py-8 bg-gradient-to-b from-gray-50 to-white'>
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
            <div className='card-glass p-6'>
              <h3 className='text-xl font-bold font-heading mb-4'>
                Instalación
              </h3>
              <ol className='space-y-3 list-decimal list-inside'>
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
            <div className='rounded-xl p-6 border border-amber-300/50 bg-gradient-to-br from-amber-50 to-amber-100/50'>
              <p className='text-amber-900'>
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
        <section className='py-8'>
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
            <div className='card-glass p-6'>
              <h3 className='text-xl font-bold font-heading mb-4'>
                Instalación
              </h3>
              <ol className='space-y-3 list-decimal list-inside'>
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
            <div className='rounded-xl p-6 border border-blue-300/50 bg-gradient-to-br from-blue-50 to-blue-100/50'>
              <p className='text-blue-900'>
                💡 <strong>Tip:</strong> Para abrir canales necesitás sats
                on-chain. Empezá con 1-2 canales hacia nodos bien conectados
                (ej:{" "}
                <a
                  href='https://amboss.space'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-700 link-underline'
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
        <section className='py-8 bg-gradient-to-b from-gray-50 to-white'>
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
            <div className='card-glass p-6'>
              <h3 className='text-xl font-bold font-heading mb-4'>
                Instalación
              </h3>
              <ol className='space-y-3 list-decimal list-inside'>
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
                  <code className='bg-gray-100 px-2 py-1 rounded text-bitcoin'>
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
            <div className='rounded-xl p-6 border border-green-300/50 bg-gradient-to-br from-green-50 to-green-100/50'>
              <p className='text-green-900'>
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
        <section className='py-8'>
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
            <div className='card-glass p-6'>
              <h3 className='text-xl font-bold font-heading mb-4'>
                Configuración
              </h3>
              <ol className='space-y-3 list-decimal list-inside'>
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
            <div className='rounded-xl p-6 border border-purple-300/50 bg-gradient-to-br from-purple-50 to-purple-100/50'>
              <p className='text-purple-900'>
                🔗 <strong>El poder del NWC:</strong> LaWallet no custodia
                tus fondos. Se conecta a tu Alby Hub que se conecta a tu nodo
                Lightning que se conecta a tu nodo Bitcoin. Cadena completa
                de soberanía: vos controlás cada eslabón.
              </p>
            </div>
          </StepCard>
        </section>

        {/* Resultado Final */}
        <section className='relative py-24 overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-b from-gray-50 to-white' />
          <div className='relative z-10 max-w-4xl mx-auto px-4 md:px-12'>
            <Reveal>
              <h2 className='text-4xl md:text-5xl font-black mb-4 font-heading text-center'>
                Resultado <span className='text-gradient'>Final</span>
              </h2>
              <p className='text-xl text-gray-600 text-center mb-12'>
                Con estos 5 pasos tenés un stack soberano completo
              </p>
            </Reveal>

            <Stagger
              stagger={0.1}
              className='flex flex-col items-center gap-2'
            >
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
                    <div className='flex items-center gap-3 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl px-6 py-4 shadow-lg shadow-gray-900/20 hover:shadow-bitcoin/20 hover:-translate-y-0.5 transition-all duration-300 border border-white/5'>
                      {layer.logo ? (
                        <img
                          src={layer.logo}
                          alt={layer.name}
                          className='w-10 h-10 rounded-lg shrink-0'
                        />
                      ) : (
                        <span className='text-2xl shrink-0 w-10 h-10 flex items-center justify-center'>
                          {layer.emoji}
                        </span>
                      )}
                      <div>
                        <span className='font-bold'>{layer.name}</span>
                        <span className='text-gray-400 text-sm ml-2'>
                          — {layer.desc}
                        </span>
                      </div>
                    </div>
                  </StaggerItem>
                  {idx < 5 && (
                    <StaggerItem>
                      <div className='text-bitcoin/60 text-xl font-mono'>
                        {layer.connector}
                      </div>
                    </StaggerItem>
                  )}
                </React.Fragment>
              ))}
            </Stagger>

            <Reveal delay={0.2}>
              <div className='mt-12 rounded-2xl p-8 text-center card-glass border-gradient'>
                <p className='text-2xl md:text-3xl font-black font-heading'>
                  Don't trust, <span className='text-gradient'>verify</span>. 🔥
                </p>
                <p className='text-gray-600 mt-3 text-lg'>
                  Tu nodo, tu dinero, tus reglas. Sin intermediarios, sin
                  custodios, sin permiso.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
};

export default StackPage;
