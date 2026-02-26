import React from "react";
import SEOHead from "../components/seo/SEOHead";

const StackPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title='Stack - Veintiuno.lat'
        description='Guía paso a paso para armar tu nodo Bitcoin con una mini PC, Umbrel, Bitcoin Core, Lightning Network, Alby Hub y LaWallet. Soberanía total.'
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
        {/* Hero */}
        <section className='bg-gray-900 text-white relative overflow-hidden h-72'>
          <div className='absolute inset-0 bg-gray-900 bg-opacity-60 z-[1]'></div>
          <div
            className='container relative z-10 h-full flex items-center justify-center'
            data-aos='fade-up'
          >
            <div className='text-center'>
              <h1 className='text-6xl md:text-8xl font-bold text-bitcoin mb-6 font-heading'>
                STACK
              </h1>
              <p className='text-xl text-gray-300 mb-8 font-heading'>
                Tu nodo. Tu dinero. Tus reglas.
              </p>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className='py-16 w-full max-w-4xl px-4 md:px-12 mx-auto'>
          <div className='text-xl flex flex-col gap-6'>
            <p>
              Correr tu propio nodo es el acto máximo de soberanía en Bitcoin.
              No dependés de terceros para validar tus transacciones, no confiás
              en nadie — verificás todo vos mismo.
            </p>
            <p>
              El stack completo son <strong>5 pasos</strong>: una mini PC como
              hardware, y 4 aplicaciones que te dan control total sobre tu
              dinero.
            </p>
          </div>
        </section>

        {/* Paso 0: Hardware */}
        <section className='py-12 bg-gray-50'>
          <div className='max-w-4xl mx-auto px-4 md:px-12'>
            <h2 className='text-3xl font-bold mb-8 font-heading'>
              🖥️ Paso 0 — El Hardware
            </h2>
            <div className='text-lg flex flex-col gap-4'>
              <p>
                Necesitás una <strong>mini PC</strong> dedicada. No tu laptop,
                no un server en la nube — una computadora física que esté
                siempre prendida en tu casa o espacio.
              </p>
              <div className='bg-white rounded-xl p-6 border border-gray-200'>
                <h3 className='text-xl font-semibold mb-4'>
                  Requerimientos mínimos
                </h3>
                <ul className='space-y-2'>
                  <li>
                    <strong>CPU:</strong> Intel N100 / AMD equivalente (cualquier
                    mini PC moderna)
                  </li>
                  <li>
                    <strong>RAM:</strong> 8 GB mínimo (16 GB recomendado)
                  </li>
                  <li>
                    <strong>Almacenamiento:</strong> SSD de 1 TB mínimo (la
                    blockchain de Bitcoin ocupa ~600 GB y crece)
                  </li>
                  <li>
                    <strong>Conexión:</strong> Ethernet (cable) recomendado, WiFi
                    funciona pero es menos estable
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
                  className='text-bitcoin underline'
                >
                  Beelink Mini S12
                </a>
                , Intel NUC, o cualquier mini PC con las specs de arriba.
                Presupuesto: ~USD 150-250.
              </p>
            </div>
          </div>
        </section>

        {/* Paso 1: Umbrel */}
        <section className='py-12'>
          <div className='max-w-4xl mx-auto px-4 md:px-12'>
            <div className='flex items-center gap-4 mb-8'>
              <img
                src='/logos/umbrel.png'
                alt='Umbrel'
                className='w-14 h-14 rounded-xl'
              />
              <h2 className='text-3xl font-bold font-heading'>
                Paso 1 — Umbrel
              </h2>
            </div>
            <div className='text-lg flex flex-col gap-4'>
              <p>
                <a
                  href='https://umbrel.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-bitcoin underline font-semibold'
                >
                  Umbrel
                </a>{" "}
                es el sistema operativo de tu nodo. Lo instalás en la mini PC y
                te da una interfaz web para administrar todo: apps, nodo
                Bitcoin, Lightning, y más.
              </p>
              <div className='bg-white rounded-xl p-6 border border-gray-200'>
                <h3 className='text-xl font-semibold mb-4'>Instalación</h3>
                <ol className='space-y-3 list-decimal list-inside'>
                  <li>
                    Descargá Umbrel OS desde{" "}
                    <a
                      href='https://umbrel.com/umbrelos'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-bitcoin underline'
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
                      className='text-bitcoin underline'
                    >
                      Balena Etcher
                    </a>
                  </li>
                  <li>
                    Conectá el USB a la mini PC y booteá desde ahí
                  </li>
                  <li>
                    Seguí las instrucciones en pantalla — creá tu cuenta y
                    contraseña
                  </li>
                  <li>
                    Accedé desde cualquier dispositivo en tu red local vía{" "}
                    <code className='bg-gray-100 px-2 py-1 rounded'>
                      umbrel.local
                    </code>
                  </li>
                </ol>
              </div>
              <p>
                Umbrel funciona como un <strong>app store</strong> para tu nodo.
                Desde ahí vas a instalar las aplicaciones siguientes.
              </p>
            </div>
          </div>
        </section>

        {/* Paso 2: Bitcoin Node */}
        <section className='py-12 bg-gray-50'>
          <div className='max-w-4xl mx-auto px-4 md:px-12'>
            <div className='flex items-center gap-4 mb-8'>
              <img
                src='/logos/bitcoin.png'
                alt='Bitcoin'
                className='w-14 h-14 rounded-xl'
              />
              <h2 className='text-3xl font-bold font-heading'>
                Paso 2 — Nodo Bitcoin
              </h2>
            </div>
            <div className='text-lg flex flex-col gap-4'>
              <p>
                <a
                  href='https://bitcoin.org/en/bitcoin-core/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-bitcoin underline font-semibold'
                >
                  Bitcoin Core
                </a>{" "}
                es el software que valida cada transacción y cada bloque. Cuando
                corrés tu propio nodo, dejás de confiar en terceros — verificás
                la cadena completa vos mismo.
              </p>
              <div className='bg-white rounded-xl p-6 border border-gray-200'>
                <h3 className='text-xl font-semibold mb-4'>Instalación</h3>
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
                    Una vez sincronizado, tu nodo valida todas las transacciones
                    de la red
                  </li>
                </ol>
              </div>
              <div className='bg-amber-50 rounded-xl p-6 border border-amber-200'>
                <p className='text-amber-800'>
                  ⏳ <strong>Paciencia:</strong> La sincronización inicial
                  descarga y verifica toda la historia de Bitcoin (~600 GB). No
                  apagues la mini PC durante este proceso. Después de la primera
                  sincronización, se mantiene actualizado en tiempo real.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Paso 3: Lightning Node */}
        <section className='py-12'>
          <div className='max-w-4xl mx-auto px-4 md:px-12'>
            <div className='flex items-center gap-4 mb-8'>
              <img
                src='/logos/lightning-labs.png'
                alt='Lightning Network (LND)'
                className='w-14 h-14 rounded-xl'
              />
              <h2 className='text-3xl font-bold font-heading'>
                Paso 3 — Nodo Lightning
              </h2>
            </div>
            <div className='text-lg flex flex-col gap-4'>
              <p>
                <a
                  href='https://lightning.network'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-bitcoin underline font-semibold'
                >
                  Lightning Network
                </a>{" "}
                es la capa de pagos instantáneos de Bitcoin. Con tu propio nodo
                Lightning, podés enviar y recibir sats en segundos, abrir
                canales, y participar en la red de pagos.
              </p>
              <div className='bg-white rounded-xl p-6 border border-gray-200'>
                <h3 className='text-xl font-semibold mb-4'>Instalación</h3>
                <ol className='space-y-3 list-decimal list-inside'>
                  <li>
                    En Umbrel App Store, buscá{" "}
                    <strong>"Lightning Node"</strong> (
                    <a
                      href='https://github.com/lightningnetwork/lnd'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-bitcoin underline'
                    >
                      LND
                    </a>
                    ) e instalalo
                  </li>
                  <li>
                    Esperá a que se sincronice con tu nodo Bitcoin (necesita que
                    Bitcoin Core esté 100% sincronizado)
                  </li>
                  <li>Creá una wallet Lightning desde la interfaz</li>
                  <li>
                    <strong>Abrí canales</strong> con otros nodos para empezar a
                    rutear pagos
                  </li>
                </ol>
              </div>
              <div className='bg-blue-50 rounded-xl p-6 border border-blue-200'>
                <p className='text-blue-800'>
                  💡 <strong>Tip:</strong> Para abrir canales necesitás sats
                  on-chain. Empezá con 1-2 canales hacia nodos bien conectados
                  (ej:{" "}
                  <a
                    href='https://amboss.space'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-600 underline'
                  >
                    Amboss
                  </a>{" "}
                  te ayuda a encontrar buenos peers). Con el tiempo podés agregar
                  más liquidez.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Paso 4: Alby Hub */}
        <section className='py-12 bg-gray-50'>
          <div className='max-w-4xl mx-auto px-4 md:px-12'>
            <div className='flex items-center gap-4 mb-8'>
              <img
                src='/logos/alby-hub.svg'
                alt='Alby'
                className='w-14 h-14 rounded-xl'
              />
              <h2 className='text-3xl font-bold font-heading'>
                Paso 4 — Alby Hub
              </h2>
            </div>
            <div className='text-lg flex flex-col gap-4'>
              <p>
                <a
                  href='https://getalby.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-bitcoin underline font-semibold'
                >
                  Alby Hub
                </a>{" "}
                es la interfaz que conecta tu nodo Lightning con el mundo. Te
                permite usar tu nodo desde el navegador, conectar wallets
                externas vía{" "}
                <strong>NWC (Nostr Wallet Connect)</strong>, y recibir pagos con
                tu propia Lightning Address.
              </p>
              <div className='bg-white rounded-xl p-6 border border-gray-200'>
                <h3 className='text-xl font-semibold mb-4'>Instalación</h3>
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
                    <code className='bg-gray-100 px-2 py-1 rounded'>
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
                      className='text-bitcoin underline'
                    >
                      extensión de Alby
                    </a>{" "}
                    en tu navegador para firmar y pagar desde cualquier sitio web
                  </li>
                  <li>
                    Generá <strong>conexiones NWC</strong> para vincular wallets
                    externas (Amethyst, Damus, etc.) a tu propio nodo
                  </li>
                </ol>
              </div>
              <div className='bg-green-50 rounded-xl p-6 border border-green-200'>
                <p className='text-green-800'>
                  🔑 <strong>¿Por qué Alby?</strong> Sin Alby, tu nodo Lightning
                  solo es accesible desde la interfaz de Umbrel en tu red local.
                  Alby te permite usar tu nodo desde cualquier lugar, conectar
                  apps externas, y recibir pagos con una Lightning Address — todo
                  apuntando a TU nodo, no a un custodio.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Paso 5: LaWallet */}
        <section className='py-12'>
          <div className='max-w-4xl mx-auto px-4 md:px-12'>
            <div className='flex items-center gap-4 mb-8'>
              <img
                src='/logos/lawallet.png'
                alt='LaWallet'
                className='w-14 h-14 rounded-xl'
              />
              <h2 className='text-3xl font-bold font-heading'>
                Paso 5 — LaWallet
              </h2>
            </div>
            <div className='text-lg flex flex-col gap-4'>
              <p>
                <a
                  href='https://lawallet.io'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-bitcoin underline font-semibold'
                >
                  LaWallet
                </a>{" "}
                es la wallet de Bitcoin y Lightning diseñada para el uso diario.
                Conecta a tu nodo vía NWC (Nostr Wallet Connect) y te da una
                experiencia de pago simple, rápida y soberana.
              </p>
              <div className='bg-white rounded-xl p-6 border border-gray-200'>
                <h3 className='text-xl font-semibold mb-4'>Configuración</h3>
                <ol className='space-y-3 list-decimal list-inside'>
                  <li>
                    Descargá LaWallet desde{" "}
                    <a
                      href='https://lawallet.io'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-bitcoin underline'
                    >
                      lawallet.io
                    </a>{" "}
                    (web app o mobile)
                  </li>
                  <li>
                    Creá tu cuenta con tu clave Nostr (nsec) o generá una nueva
                  </li>
                  <li>
                    En Alby Hub, generá una{" "}
                    <strong>conexión NWC</strong> nueva para LaWallet
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
              <div className='bg-purple-50 rounded-xl p-6 border border-purple-200'>
                <p className='text-purple-800'>
                  🔗 <strong>El poder del NWC:</strong> LaWallet no custodia tus
                  fondos. Se conecta a tu Alby Hub que se conecta a tu nodo
                  Lightning que se conecta a tu nodo Bitcoin. Cadena completa de
                  soberanía: vos controlás cada eslabón.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Resultado Final */}
        <section className='py-16 bg-gray-50'>
          <div className='max-w-4xl mx-auto px-4 md:px-12'>
            <h2 className='text-3xl font-bold mb-8 font-heading'>
              ✅ Resultado Final
            </h2>
            <div className='text-lg flex flex-col gap-6'>
              <p>Con estos 5 pasos tenés un stack soberano completo:</p>

              {/* Stack diagram */}
              <div className='flex flex-col items-center gap-2'>
                <div className='flex items-center gap-3 bg-gray-900 text-white rounded-xl px-6 py-4 w-full max-w-md'>
                  <img
                    src='/logos/lawallet.png'
                    alt='LaWallet'
                    className='w-10 h-10 rounded-lg'
                  />
                  <div>
                    <span className='font-bold'>LaWallet</span>
                    <span className='text-gray-400 text-sm ml-2'>
                      — Tu wallet diaria
                    </span>
                  </div>
                </div>
                <div className='text-gray-400 text-2xl'>↕ NWC</div>
                <div className='flex items-center gap-3 bg-gray-900 text-white rounded-xl px-6 py-4 w-full max-w-md'>
                  <img
                    src='/logos/alby-hub.svg'
                    alt='Alby'
                    className='w-10 h-10 rounded-lg'
                  />
                  <div>
                    <span className='font-bold'>Alby Hub</span>
                    <span className='text-gray-400 text-sm ml-2'>
                      — Puente al mundo
                    </span>
                  </div>
                </div>
                <div className='text-gray-400 text-2xl'>↕</div>
                <div className='flex items-center gap-3 bg-gray-900 text-white rounded-xl px-6 py-4 w-full max-w-md'>
                  <img
                    src='/logos/lightning-labs.png'
                    alt='LND'
                    className='w-10 h-10 rounded-lg'
                  />
                  <div>
                    <span className='font-bold'>Lightning Node</span>
                    <span className='text-gray-400 text-sm ml-2'>
                      — Pagos instantáneos
                    </span>
                  </div>
                </div>
                <div className='text-gray-400 text-2xl'>↕</div>
                <div className='flex items-center gap-3 bg-gray-900 text-white rounded-xl px-6 py-4 w-full max-w-md'>
                  <img
                    src='/logos/bitcoin.png'
                    alt='Bitcoin'
                    className='w-10 h-10 rounded-lg'
                  />
                  <div>
                    <span className='font-bold'>Bitcoin Node</span>
                    <span className='text-gray-400 text-sm ml-2'>
                      — Validación soberana
                    </span>
                  </div>
                </div>
                <div className='text-gray-400 text-2xl'>↕</div>
                <div className='flex items-center gap-3 bg-gray-900 text-white rounded-xl px-6 py-4 w-full max-w-md'>
                  <img
                    src='/logos/umbrel.png'
                    alt='Umbrel'
                    className='w-10 h-10 rounded-lg'
                  />
                  <div>
                    <span className='font-bold'>Umbrel</span>
                    <span className='text-gray-400 text-sm ml-2'>
                      — Sistema operativo
                    </span>
                  </div>
                </div>
                <div className='text-gray-400 text-2xl'>↕</div>
                <div className='flex items-center gap-3 bg-gray-800 text-white rounded-xl px-6 py-4 w-full max-w-md'>
                  <span className='text-2xl'>🖥️</span>
                  <div>
                    <span className='font-bold'>Mini PC</span>
                    <span className='text-gray-400 text-sm ml-2'>
                      — Tu hardware
                    </span>
                  </div>
                </div>
              </div>

              <div className='bg-bitcoin/10 rounded-xl p-6 border border-bitcoin/30 mt-4'>
                <p className='text-lg font-semibold text-center'>
                  Don't trust, verify. 🔥
                </p>
                <p className='text-center text-gray-600 mt-2'>
                  Tu nodo, tu dinero, tus reglas. Sin intermediarios, sin
                  custodios, sin permiso.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default StackPage;
