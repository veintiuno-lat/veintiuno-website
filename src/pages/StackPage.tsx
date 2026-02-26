import React from "react";
import SEOHead from "../components/seo/SEOHead";

const StackPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title='Stack - Veintiuno.lat'
        description='Guía paso a paso para armar tu nodo Bitcoin con una mini PC, Umbrel, Bitcoin Core, Lightning Network y Alby Hub. Soberanía total.'
        keywords={[
          "bitcoin node",
          "umbrel",
          "lightning network",
          "alby hub",
          "nodo bitcoin",
          "mini pc bitcoin",
          "self custody",
          "soberanía bitcoin",
        ]}
        url='/mission/stack'
        type='website'
      />

      <div className='min-h-screen bg-white'>
        {/* Hero Section */}
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
              El stack mínimo que necesitás son <strong>3 aplicaciones</strong>{" "}
              corriendo en una mini PC. Acá te explicamos cada una y cómo
              armarla paso a paso.
            </p>
          </div>
        </section>

        {/* Hardware */}
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
                Opciones populares: Beelink Mini S12, Intel NUC, cualquier mini
                PC con las specs de arriba. Presupuesto: ~USD 150-250.
              </p>
            </div>
          </div>
        </section>

        {/* Umbrel */}
        <section className='py-12'>
          <div className='max-w-4xl mx-auto px-4 md:px-12'>
            <h2 className='text-3xl font-bold mb-8 font-heading'>
              🟣 Paso 1 — Umbrel
            </h2>
            <div className='text-lg flex flex-col gap-4'>
              <p>
                <strong>Umbrel</strong> es el sistema operativo de tu nodo. Lo
                instalás en la mini PC y te da una interfaz web para administrar
                todo: apps, nodo Bitcoin, Lightning, y más.
              </p>
              <div className='bg-white rounded-xl p-6 border border-gray-200'>
                <h3 className='text-xl font-semibold mb-4'>Instalación</h3>
                <ol className='space-y-3 list-decimal list-inside'>
                  <li>
                    Descargá Umbrel OS desde{" "}
                    <a
                      href='https://umbrel.com'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-bitcoin underline'
                    >
                      umbrel.com
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
                Desde ahí vas a instalar las dos aplicaciones siguientes.
              </p>
            </div>
          </div>
        </section>

        {/* Bitcoin Node */}
        <section className='py-12 bg-gray-50'>
          <div className='max-w-4xl mx-auto px-4 md:px-12'>
            <h2 className='text-3xl font-bold mb-8 font-heading'>
              ₿ Paso 2 — Bitcoin Node
            </h2>
            <div className='text-lg flex flex-col gap-4'>
              <p>
                <strong>Bitcoin Core</strong> es el software que valida cada
                transacción y cada bloque. Cuando corrés tu propio nodo, dejás
                de confiar en terceros — verificás la cadena completa vos mismo.
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

        {/* Lightning Node */}
        <section className='py-12'>
          <div className='max-w-4xl mx-auto px-4 md:px-12'>
            <h2 className='text-3xl font-bold mb-8 font-heading'>
              ⚡ Paso 3 — Lightning Node
            </h2>
            <div className='text-lg flex flex-col gap-4'>
              <p>
                <strong>Lightning Network</strong> es la capa de pagos
                instantáneos de Bitcoin. Con tu propio nodo Lightning, podés
                enviar y recibir sats en segundos, abrir canales, y participar
                en la red de pagos.
              </p>
              <div className='bg-white rounded-xl p-6 border border-gray-200'>
                <h3 className='text-xl font-semibold mb-4'>Instalación</h3>
                <ol className='space-y-3 list-decimal list-inside'>
                  <li>
                    En Umbrel App Store, buscá{" "}
                    <strong>"Lightning Node"</strong> (LND) e instalalo
                  </li>
                  <li>
                    Esperá a que se sincronice con tu nodo Bitcoin (necesita que
                    Bitcoin Core esté 100% sincronizado)
                  </li>
                  <li>
                    Creá una wallet Lightning desde la interfaz
                  </li>
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
                  (ej: ACINQ, LN+). Con el tiempo podés agregar más liquidez.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Alby Hub */}
        <section className='py-12 bg-gray-50'>
          <div className='max-w-4xl mx-auto px-4 md:px-12'>
            <h2 className='text-3xl font-bold mb-8 font-heading'>
              🐝 Paso 4 — Alby Hub
            </h2>
            <div className='text-lg flex flex-col gap-4'>
              <p>
                <strong>Alby Hub</strong> es la interfaz que conecta tu nodo
                Lightning con el mundo. Te permite usar tu nodo desde el
                navegador, conectar wallets externas vía{" "}
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
                      href='https://getalby.com'
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

        {/* Result */}
        <section className='py-16'>
          <div className='max-w-4xl mx-auto px-4 md:px-12'>
            <h2 className='text-3xl font-bold mb-8 font-heading'>
              ✅ Resultado Final
            </h2>
            <div className='text-lg flex flex-col gap-6'>
              <p>
                Con estos 4 pasos tenés un stack soberano completo:
              </p>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='bg-gray-900 text-white rounded-xl p-6 text-center'>
                  <div className='text-3xl mb-3'>₿</div>
                  <h3 className='font-bold text-lg mb-2'>Bitcoin Node</h3>
                  <p className='text-gray-400 text-sm'>
                    Validás cada transacción. No confiás en nadie.
                  </p>
                </div>
                <div className='bg-gray-900 text-white rounded-xl p-6 text-center'>
                  <div className='text-3xl mb-3'>⚡</div>
                  <h3 className='font-bold text-lg mb-2'>Lightning Node</h3>
                  <p className='text-gray-400 text-sm'>
                    Pagos instantáneos. Tu liquidez, tus canales.
                  </p>
                </div>
                <div className='bg-gray-900 text-white rounded-xl p-6 text-center'>
                  <div className='text-3xl mb-3'>🐝</div>
                  <h3 className='font-bold text-lg mb-2'>Alby Hub</h3>
                  <p className='text-gray-400 text-sm'>
                    Conectás tu nodo al mundo. NWC + Lightning Address.
                  </p>
                </div>
              </div>
              <div className='bg-bitcoin/10 rounded-xl p-6 border border-bitcoin/30'>
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
