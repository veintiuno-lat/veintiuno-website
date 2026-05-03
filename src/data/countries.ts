/**
 * Country master data used by `/pais/<slug>` landing pages, sitemap, prerender
 * and OG image generation. The `country` strings here MUST match the strings
 * stored on each community / meetup record so filtering works.
 *
 * `intro` is the unique 80-180-word paragraph rendered above the auto-generated
 * sections — it's what makes each country page rank for `bitcoin <país>` instead
 * of looking like a thin filtered list to Google.
 */

export interface Country {
  /** URL slug, e.g. "argentina" or "republica-dominicana". Lowercase, no diacritics, no spaces. */
  slug: string;
  /** Canonical Spanish name as stored in community / meetup data. */
  name: string;
  /** ISO 3166-1 alpha-2 country code, used for the `og:locale` regional override. */
  code: string;
  /** Single emoji flag for visual headers. */
  flag: string;
  /** 80-180 word unique intro shown at the top of the country page. */
  intro: string;
}

export const countries: Country[] = [
  {
    slug: 'argentina',
    name: 'Argentina',
    code: 'AR',
    flag: '🇦🇷',
    intro:
      'Argentina es una de las economías con mayor adopción Bitcoin de Latinoamérica. La inflación crónica del peso convirtió a los bitcoiners argentinos en pioneros del ahorro en sats, las wallets de Lightning y el comercio P2P. Buenos Aires concentra varias de las comunidades más activas del continente, con meetups semanales, espacios de coworking bitcoin-only y un ecosistema fuerte de desarrolladores Lightning. Más allá de la capital, Mendoza, Rosario, Córdoba y la Patagonia tienen sus propios polos. En esta página encontrás todas las comunidades Bitcoin de Argentina que forman parte de Veintiuno, los meetups próximos y los organizadores que las hacen posible.',
  },
  {
    slug: 'el-salvador',
    name: 'El Salvador',
    code: 'SV',
    flag: '🇸🇻',
    intro:
      'El Salvador fue el primer país del mundo en adoptar Bitcoin como moneda de curso legal en septiembre de 2021. Desde entonces, Bitcoin Beach (El Zonte) y la red de comercios bitcoin-only de San Salvador, La Libertad y Santa Ana se convirtieron en peregrinación obligada para bitcoiners de todo el mundo. La cultura bitcoiner salvadoreña es eminentemente práctica: pagos diarios con Lightning, salarios en sats y educación financiera desde las escuelas. Acá encontrás todas las comunidades, meetups y proyectos Bitcoin de El Salvador en la red Veintiuno.',
  },
  {
    slug: 'mexico',
    name: 'México',
    code: 'MX',
    flag: '🇲🇽',
    intro:
      'México combina remesas, comercio fronterizo y una cultura tecnológica fuerte para producir un ecosistema bitcoiner de los más interesantes de la región. Ciudad de México concentra meetups, conferencias internacionales y desarrollos de infraestructura Lightning. Hay corredores bitcoin-only emergentes en Querétaro, Mérida y la zona fronteriza norte. El stablecoin habits del país conviven con un crecimiento sostenido del número de comerciantes que aceptan sats vía Lightning. Conocé las comunidades Bitcoin de México que forman parte de Veintiuno y sumate a su red de meetups.',
  },
  {
    slug: 'peru',
    name: 'Perú',
    code: 'PE',
    flag: '🇵🇪',
    intro:
      'Perú tiene una escena Bitcoin pequeña pero muy organizada, con comunidades activas en Lima, Cusco y Arequipa. La regulación cripto local es tolerante y el ecosistema fintech peruano facilitó la integración con on-ramps Lightning. Los meetups peruanos suelen mezclar técnica, política monetaria y casos de uso para remesas hacia España y Estados Unidos. Encontrá las comunidades Bitcoin de Perú en la red Veintiuno.',
  },
  {
    slug: 'cuba',
    name: 'Cuba',
    code: 'CU',
    flag: '🇨🇺',
    intro:
      'En Cuba, Bitcoin es una herramienta de soberanía financiera real: permite recibir remesas, comerciar P2P y proteger el ahorro en un país con doble moneda y restricciones bancarias. Las comunidades cubanas operan con resiliencia notable a pesar de la inestabilidad de internet, usando wallets resistentes a la censura y meshes Lightning. La Habana y Santiago de Cuba concentran la mayor parte de los organizadores. Conocé las comunidades Bitcoin de Cuba dentro de Veintiuno.',
  },
  {
    slug: 'chile',
    name: 'Chile',
    code: 'CL',
    flag: '🇨🇱',
    intro:
      'Chile combina estabilidad institucional con una escena Bitcoin técnica y educada. Santiago, Pichilemu y otras ciudades costeras concentran comunidades bitcoiners que organizan eventos regulares, círculos de estudio y proyectos open source. Hay tradición fuerte de auto-custodia, nodos hogareños y desarrollo Lightning. Encontrá las comunidades Bitcoin chilenas en la red Veintiuno.',
  },
  {
    slug: 'republica-dominicana',
    name: 'República Dominicana',
    code: 'DO',
    flag: '🇩🇴',
    intro:
      'República Dominicana tiene un ecosistema Bitcoin emergente, con foco en remesas, turismo y educación. Santo Domingo y Santiago concentran las comunidades más activas, con meetups técnicos y eventos de adopción comercial. La red Veintiuno conecta a los organizadores dominicanos con el resto de Latinoamérica.',
  },
  {
    slug: 'colombia',
    name: 'Colombia',
    code: 'CO',
    flag: '🇨🇴',
    intro:
      'Colombia tiene una de las bases bitcoiners más grandes de la región, con foco en Medellín, Bogotá y Cali. La cultura tech medellinense produjo desarrolladores Lightning, exchanges P2P locales y experimentos pioneros con NFC bitcoin. Conocé la comunidad Bitcoin colombiana en Veintiuno.',
  },
  {
    slug: 'costa-rica',
    name: 'Costa Rica',
    code: 'CR',
    flag: '🇨🇷',
    intro:
      'Costa Rica combina turismo internacional, estabilidad política y una creciente adopción Bitcoin. San José y la zona del Pacífico concentran las comunidades activas. Encontrá la comunidad Bitcoin tica que forma parte de Veintiuno.',
  },
  {
    slug: 'ecuador',
    name: 'Ecuador',
    code: 'EC',
    flag: '🇪🇨',
    intro:
      'Ecuador, dolarizado desde 2000, presenta un caso particular: Bitcoin compite con USD pero gana terreno como ahorro y herramienta de remesas. Quito y Guayaquil tienen comunidades activas. Conocé la comunidad Bitcoin ecuatoriana en Veintiuno.',
  },
  {
    slug: 'honduras',
    name: 'Honduras',
    code: 'HN',
    flag: '🇭🇳',
    intro:
      'Honduras alberga la zona Bitcoin más experimental de la región: Próspera (Roatán) opera con Bitcoin como moneda de uso común. Más allá, Tegucigalpa y San Pedro Sula tienen comunidades emergentes. Encontrá las comunidades Bitcoin hondureñas en Veintiuno.',
  },
  {
    slug: 'paraguay',
    name: 'Paraguay',
    code: 'PY',
    flag: '🇵🇾',
    intro:
      'Paraguay es un polo de minería Bitcoin gracias a la energía hidroeléctrica barata de Itaipú, y tiene una comunidad bitcoiner pequeña pero técnica en Asunción y Ciudad del Este. Conocé la comunidad Bitcoin paraguaya en Veintiuno.',
  },
  {
    slug: 'uruguay',
    name: 'Uruguay',
    code: 'UY',
    flag: '🇺🇾',
    intro:
      'Uruguay combina estabilidad institucional, regulación cripto temprana y una cultura tech sólida. Montevideo concentra a la mayoría de los bitcoiners locales, con meetups regulares y desarrollos Lightning. Encontrá la comunidad Bitcoin uruguaya en Veintiuno.',
  },
  {
    slug: 'venezuela',
    name: 'Venezuela',
    code: 'VE',
    flag: '🇻🇪',
    intro:
      'Venezuela es uno de los casos de uso Bitcoin más reales del mundo: hiperinflación, controles de cambio y restricciones bancarias hicieron de los sats una herramienta de supervivencia. Caracas, Valencia y Maracaibo tienen comunidades resilientes y técnicamente avanzadas. Conocé la comunidad Bitcoin venezolana en Veintiuno.',
  },
  {
    slug: 'nicaragua',
    name: 'Nicaragua',
    code: 'NI',
    flag: '🇳🇮',
    intro:
      'Nicaragua tiene un ecosistema Bitcoin emergente con foco en San Juan del Sur y Managua. La cultura bitcoiner local crece desde proyectos comunitarios y educativos. Encontrá la comunidad Bitcoin nicaragüense en Veintiuno.',
  },
  {
    slug: 'panama',
    name: 'Panamá',
    code: 'PA',
    flag: '🇵🇦',
    intro:
      'Panamá, hub financiero regional dolarizado, tiene una comunidad Bitcoin organizada en Ciudad de Panamá con foco en pagos, banca y open finance. Conocé la comunidad Bitcoin panameña en Veintiuno.',
  },
  {
    slug: 'brasil',
    name: 'Brasil',
    code: 'BR',
    flag: '🇧🇷',
    intro:
      'Brasil tiene la base de usuarios Bitcoin más grande de Latinoamérica en términos absolutos, con regulación clara, exchanges grandes y desarrolladores Lightning de primer nivel. São Paulo, Rio y Florianópolis concentran las comunidades más activas. Encontrá las comunidades Bitcoin brasileñas en Veintiuno.',
  },
  {
    slug: 'bolivia',
    name: 'Bolivia',
    code: 'BO',
    flag: '🇧🇴',
    intro:
      'Bolivia, tras la prohibición y posterior apertura cripto, tiene una comunidad bitcoiner que crece desde la base. La Paz, Cochabamba y Santa Cruz tienen meetups regulares y proyectos educativos. Conocé la comunidad Bitcoin boliviana en Veintiuno.',
  },
  {
    slug: 'guatemala',
    name: 'Guatemala',
    code: 'GT',
    flag: '🇬🇹',
    intro:
      'Guatemala tiene la primera comunidad Bitcoin Lake (lago de Atitlán), un proyecto de adopción circular pionero. Ciudad de Guatemala y la zona del lago concentran a los organizadores. Encontrá las comunidades Bitcoin guatemaltecas en Veintiuno.',
  },
];

export const getCountryBySlug = (slug: string): Country | undefined =>
  countries.find((c) => c.slug === slug);

export const getCountrySlugs = (): string[] => countries.map((c) => c.slug);
