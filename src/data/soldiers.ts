import { Soldier } from '../types/Squad';

// NOTE: Soldier image assets (soldier-1.png through soldier-10.png) do not exist.
// Using placeholder image until official photos are provided by Studio.
// Several soldier profiles have unverified identity data that was cleared pending confirmation.
const SOLDIER_PLACEHOLDER = '/images/soldiers-images/soldier-placeholder.png';

export const soldiers: Soldier[] = [
  // === ESCUADRÓN LIBERTAD ===
  // NOTE: nico, burgos, cyberpunk, andyCreed, btcyberpunk had mixed identity data
  // (bios/links belonging to other people). Cleared pending verification.
  {
    id: 'nico',
    username: 'Nico',
    role: 'Soldier',
    profileImage: SOLDIER_PLACEHOLDER,
    country: 'us',
    countryName: 'United States of America',
    squadId: 'escuadron-libertad',
    bio: '', // Cleared: had altafacha69's bio
    socialLinks: {} // Cleared: had unverified links
  },
  {
    id: 'burgos',
    username: 'Burgos',
    role: 'Soldier',
    profileImage: SOLDIER_PLACEHOLDER,
    country: 've',
    countryName: 'Venezuela',
    squadId: 'escuadron-libertad',
    bio: '', // Cleared: had "José A."'s bio
    socialLinks: {} // Cleared: had unverified links
  },
  {
    id: 'cyberpunk',
    username: 'cyberpunk',
    role: 'Squad Leader',
    profileImage: SOLDIER_PLACEHOLDER,
    country: 've',
    countryName: 'Venezuela',
    squadId: 'escuadron-libertad',
    bio: '', // Cleared: had "Caio R."'s bio
    socialLinks: {} // Cleared: had unverified links
  },
  {
    id: 'andyCreed',
    username: 'AndyCreed',
    role: 'Soldier',
    profileImage: SOLDIER_PLACEHOLDER,
    country: 'ar',
    countryName: 'Argentina',
    squadId: 'escuadron-libertad',
    bio: '', // Cleared: had "Maria L."'s bio
    socialLinks: {} // Cleared: had unverified links
  },
  {
    id: 'btcyberpunk',
    username: 'Btcyberpunk',
    role: 'Soldier',
    profileImage: SOLDIER_PLACEHOLDER,
    country: 'cu',
    countryName: 'Cuba',
    squadId: 'escuadron-libertad',
    bio: '', // Cleared: had "Alex K."'s bio
    socialLinks: {} // Cleared: had unverified links
  },
  // === ESCUADRONCILLO ===
  {
    id: 'fierillo',
    username: 'Fierillo',
    role: 'Squad Leader',
    profileImage: SOLDIER_PLACEHOLDER,
    country: 'ar',
    countryName: 'Argentina',
    squadId: 'escuadroncillo',
    bio: 'El líder del escuadroncillo, bitcoiner liberal defensor de Milei y Argentina, el mejor país del mundo. Dev, CM, divulgador, se de todo un poco, me gusta ser directo y sencillo.',
    socialLinks: {
      twitter: 'https://twitter.com/fierillo',
      nostr: 'https://njump.me/npub18ggwqfvqmxt3m6f4ek2q55nghlj9380me364wd67wz8yzpyh8wusevpdmh',
      github: 'https://github.com/fierillo'
    }
  },
  {
    id: 'anix',
    username: 'Anix',
    role: 'Soldier',
    profileImage: SOLDIER_PLACEHOLDER,
    country: 'ar',
    countryName: 'Argentina',
    squadId: 'escuadroncillo',
    bio: 'Project Manager en tecnología y guerrera de La Cruzada. Sus armas son la estrategia, la gestión de equipos y la pasión por crear soluciones digitales. Avanza firme junto al escuadroncillo, usando las ideas como espada para conquistar nuevos horizontes.',
    socialLinks: {
      nostr: 'https://njump.me/anix@hodl.ar',
      github: 'https://github.com/analiaacostaok'
    }
  },
  {
    id: 'lalo',
    username: 'Lalo',
    role: 'Soldier',
    profileImage: SOLDIER_PLACEHOLDER,
    country: 've',
    countryName: 'Venezuela',
    squadId: 'escuadroncillo',
    bio: 'Bitcoiner en construcción, orgulloso guerrero del escuadroncillo, sobreviviente del chavismo. Animal del mar, divulgador, creando mi espacio en el mundo.',
    socialLinks: {
      instagram: 'https://www.instagram.com/eduardojalvarezf?igsh=NXA5cDV1NTNhMW41',
      twitter: 'https://x.com/LaloAlva18', // Fixed: was missing https://
      nostr: 'https://njump.me/npub1jecfrphcxmysz5ju43e8w0kwtejxalnj5fhmegh883ylna0erdlqz66588'
    }
  },
  {
    id: 'pia',
    username: 'Pia',
    role: 'Soldier',
    profileImage: SOLDIER_PLACEHOLDER,
    country: 'ar',
    countryName: 'Argentina',
    squadId: 'escuadroncillo',
    bio: '',
    socialLinks: {
      instagram: 'https://www.instagram.com/pia.cisneros1?igsh=MTJzYjhyNnVndm56bQ%3D%3D&utm_source=qr', // Fixed: trimmed leading space
      nostr: 'https://njump.me/npub1vu05zwlxzmjhwnd8qpemj29mqw64ukh6lhv9aukm8gl6zeccdyrs6cww90'
    }
  },
  {
    id: 'joy',
    username: 'Joy',
    role: 'Soldier',
    profileImage: SOLDIER_PLACEHOLDER,
    country: 'ar',
    countryName: 'Argentina',
    squadId: 'escuadroncillo',
    bio: '',
    socialLinks: {
      twitter: 'https://x.com/joynicokoloff',
      nostr: 'https://njump.me/npub1amltj3zh3ngln4k364jrpe4ar050d240f77ltuxn268jdafuycnqrc8chs'
    }
  },
  // === ESCUADRÓN CISNE ===
  // NOTE: These profiles had placeholder "Miguel" data. Cleared pending verification.
  {
    id: 'ian',
    username: 'ian',
    role: 'Soldier',
    profileImage: SOLDIER_PLACEHOLDER,
    country: 'ar',
    countryName: 'Argentina',
    squadId: 'escuadron-cisne',
    bio: '', // Cleared: had generic "Miguel" bio
    socialLinks: {
      // NOTE: NIP-05 identifier - needs proper Nostr resolution, not direct href
      nostr: 'https://njump.me/ianmartin@nostrplebs.com' // Fixed: added njump.me for NIP-05 resolution
    }
  },
  {
    id: 'capscabio',
    username: 'CapScabio',
    role: 'Soldier',
    profileImage: SOLDIER_PLACEHOLDER,
    country: 'ar',
    countryName: 'Argentina',
    squadId: 'escuadron-cisne',
    bio: '', // Cleared: had generic "Miguel" bio
    socialLinks: {
      instagram: 'https://instagram.com/capitandelscabio',
      // NOTE: "hold.ar" may be typo of "hodl.ar" - needs verification
      nostr: 'https://njump.me/capscabio@hold.ar' // Fixed: added njump.me for NIP-05 resolution
    }
  },
  {
    id: 'josei',
    username: 'Josei',
    role: 'Soldier',
    profileImage: SOLDIER_PLACEHOLDER,
    country: 'ar',
    countryName: 'Argentina',
    squadId: 'escuadron-cisne',
    bio: '', // Cleared: had generic "Miguel" bio
    socialLinks: {
      website: 'https://josedorrego.com',
      instagram: 'https://instagram.com/josiglio',
      twitter: 'https://twitter.com/josiglio',
      nostr: 'https://njump.me/josei@hodl.ar' // Fixed: added njump.me for NIP-05 resolution
    }
  },
  {
    id: 'michelle',
    username: 'Michelle',
    role: 'Soldier',
    profileImage: SOLDIER_PLACEHOLDER,
    country: 'ar',
    countryName: 'Argentina',
    squadId: 'escuadron-cisne',
    bio: '', // Cleared: had generic "Miguel" bio
    socialLinks: {
      instagram: 'https://instagram.com/_mii.so_'
    }
  },
  {
    id: 'jaqui',
    username: 'Jaqui',
    role: 'Squad Leader',
    profileImage: SOLDIER_PLACEHOLDER,
    country: 'ar',
    countryName: 'Argentina',
    squadId: 'escuadron-cisne',
    bio: '', // Cleared: had generic "Miguel" bio
    socialLinks: {
      // website cleared: was "https://miguel.com" - wrong identity
      instagram: 'https://instagram.com/jaqui_ag',
      // twitter cleared: https://twitter.com/jaquiag_ returns 404
      nostr: 'https://njump.me/jaqui@hodl.ar', // Fixed: added njump.me for NIP-05 resolution
      github: 'https://github.com/JaquiAg'
    }
  },
  // === EL CLAN ===
  // NOTE: These profiles had placeholder "Miguel" data. Cleared pending verification.
  {
    id: 'mander',
    username: 'Mander',
    role: 'Soldier',
    profileImage: SOLDIER_PLACEHOLDER,
    country: 'ar',
    countryName: 'Argentina',
    squadId: 'el-clan',
    bio: '', // Cleared: had generic "Miguel" bio
    socialLinks: {} // Cleared: had generic "Miguel" links
  },
  {
    id: 'les',
    username: 'Les',
    role: 'Soldier',
    profileImage: SOLDIER_PLACEHOLDER,
    country: 'ar',
    countryName: 'Argentina',
    squadId: 'el-clan',
    bio: '', // Cleared: had generic "Miguel" bio
    socialLinks: {} // Cleared: had generic "Miguel" links
  },
  {
    id: 'antihumano',
    username: 'Antihumano',
    role: 'Soldier',
    profileImage: SOLDIER_PLACEHOLDER,
    country: 'ar',
    countryName: 'Argentina',
    squadId: 'el-clan',
    bio: '', // Cleared: had generic "Miguel" bio
    socialLinks: {} // Cleared: had generic "Miguel" links
  },
  {
    id: 'wal',
    username: 'Wal',
    role: 'Soldier',
    profileImage: SOLDIER_PLACEHOLDER,
    country: 'uy', // Fixed: was 'ur', should be 'uy' for Uruguay flag code
    countryName: 'Uruguay',
    squadId: 'el-clan',
    bio: '', // Cleared: had generic "Miguel" bio
    socialLinks: {} // Cleared: had generic "Miguel" links
  },
  {
    id: 'lai',
    username: 'Lai',
    role: 'Squad Leader',
    profileImage: SOLDIER_PLACEHOLDER,
    country: 'ar',
    countryName: 'Argentina',
    squadId: 'el-clan',
    bio: '', // Cleared: had generic "Miguel" bio
    socialLinks: {} // Cleared: had generic "Miguel" links
  },
  // === OLF ===
  // NOTE: These profiles had placeholder "Miguel" data. Cleared pending verification.
  {
    id: 'soldiazin',
    username: 'Soldiazin',
    role: 'Soldier',
    profileImage: SOLDIER_PLACEHOLDER,
    country: 'ar',
    countryName: 'Argentina',
    squadId: 'OLF',
    bio: '', // Cleared: had generic "Miguel" bio
    socialLinks: {} // Cleared: had generic "Miguel" links
  },
  {
    id: 'chule',
    username: 'Chule',
    role: 'Soldier',
    profileImage: SOLDIER_PLACEHOLDER,
    country: 'ar',
    countryName: 'Argentina',
    squadId: 'OLF',
    bio: '', // Cleared: had generic "Miguel" bio
    socialLinks: {} // Cleared: had generic "Miguel" links
  },
  {
    id: 'micael',
    username: 'Micael',
    role: 'Soldier',
    profileImage: SOLDIER_PLACEHOLDER,
    country: 'ar',
    countryName: 'Argentina',
    squadId: 'OLF',
    bio: '', // Cleared: had generic "Miguel" bio
    socialLinks: {} // Cleared: had generic "Miguel" links
  },
  {
    id: 'negr0',
    username: 'negr0',
    role: 'Squad Leader',
    profileImage: SOLDIER_PLACEHOLDER,
    country: 'ar',
    countryName: 'Argentina',
    squadId: 'OLF',
    bio: '', // Cleared: had generic "Miguel" bio
    socialLinks: {} // Cleared: had generic "Miguel" links
  },
  {
    id: 'fred',
    username: 'Fred',
    role: 'Soldier',
    profileImage: SOLDIER_PLACEHOLDER,
    country: 'ar',
    countryName: 'Argentina',
    squadId: 'OLF',
    bio: '', // Cleared: had generic "Miguel" bio
    socialLinks: {} // Cleared: had generic "Miguel" links
  }
];

// Helper functions
export const getSoldierById = (id: string): Soldier | undefined => {
  return soldiers.find(soldier => soldier.id === id);
};

export const getSoldiersBySquad = (squadId: string): Soldier[] => {
  return soldiers.filter(soldier => soldier.squadId === squadId);
};

export const getCountryFlag = (countryName: string): Soldier[] => {
  return soldiers.filter(soldier => soldier.countryName === countryName);
};

export const getSoldiersByRole = (role: string): Soldier[] => {
  return soldiers.filter(soldier => soldier.role.toLowerCase().includes(role.toLowerCase()));
};
