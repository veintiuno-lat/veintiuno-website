import { Squad, Satellite } from "../types/Squad";

export const squads: Squad[] = [
  {
    id: "escuadroncillo",
    name: "Escuadroncillo",
    leader: "@fierillo",
    soldiers: 4,
    profileImage: "/images/squads-images/squad-01.png",
    description:
      "El escuadrón mas picante de la #Cruzada21, con la misión de híper-bitcoinizar el norte de Argentina.",
    communities: ["club-satoshi", "bitcoin-nea"],
  },
  {
    id: "escuadron-libertad",
    name: "Escuadrón Libertad",
    leader: "@cyber",
    soldiers: 3,
    profileImage: "/images/squads-images/squad-02.png",
    description:
      "Agile squad focused on rapid deployment across South America, with active operations in Bolivia and Mexico, promoting Bitcoin education and adoption.",
    communities: ["btc-x-bolivia", "isla-btc"],
  },
  {
    id: "escuadron-cisne",
    name: "Escuadrón Cisne",
    leader: "@jaqui",
    soldiers: 2,
    profileImage: "/images/squads-images/squad-03.png",
    description:
      "Crypto-focused tactical unit specializing in P2P education and community development across Argentina and Colombia.",
    communities: ["la-crypta", "colombiap2p"],
  },
  {
    id: "el-clan",
    name: "El Clan",
    leader: "@lai",
    soldiers: 2,
    profileImage: "/images/squads-images/squad-04.png",
    description:
      "Innovation and technology specialists driving Bitcoin adoption through cutting-edge solutions and educational programs in Argentina and El Salvador.",
    communities: ["satoshi-somos-todos", "bitcoin-ruta-de-las-flores"],
  },
  {
    id: "OLF",
    name: "olf",
    leader: "@negr0",
    soldiers: 1,
    profileImage: "/images/squads-images/squad-05.png",
    description:
      "Defensive operations and security specialists ensuring the safety and integrity of Bitcoin initiatives across Latin America.",
    communities: [],
  },
];

export const satellites: Satellite[] = [
  {
    id: "satellite-1",
    username: "@altafacha69",
    role: "Digital Artist",
    profileImage: "/images/artists-images/avatar-altafacha.png",
    description:
      "Digital artisan blending street culture and Bitcoin aesthetics into bold visual narratives",
  },
  {
    id: "satellite-2",
    username: "@abstractlai",
    role: "Creative Director",
    profileImage: "/images/artists-images/avatar-abstractlai.png",
    description:
      "Mexican digital artist creating abstract Bitcoin-inspired artwork and visual identity",
  },
  {
    id: "satellite-3",
    username: "@elsyluque54",
    role: "Content Creator",
    profileImage: "/images/artists-images/avatar-elsyluque54.png",
    description:
      "Argentine artist exploring Bitcoin through digital art and educational content",
  },
  {
    id: "satellite-4",
    username: "@ikbenmartuu_",
    role: "Community Builder",
    profileImage: "/images/artists-images/avatar-ikbenmartuu_.png",
    description:
      "Brazilian artist creating vibrant Bitcoin artwork and building community engagement",
  },
  {
    id: "satellite-5",
    username: "@josediosok",
    role: "Tech Lead",
    profileImage: "/images/artists-images/avatar-josediosok.png",
    description:
      "Technology research and implementation specialist for Bitcoin infrastructure",
  },
  {
    id: "satellite-6",
    username: "@leonelzab",
    role: "Security Expert",
    profileImage: "/images/artists-images/avatar-leonelzab.png",
    description:
      "Cybersecurity and system protection specialist for Bitcoin initiatives",
  },
  {
    id: "satellite-7",
    username: "@maxibellmann",
    role: "Operations Lead",
    profileImage: "/images/artists-images/avatar-maxibellmann.png",
    description:
      "Project management and coordination for Bitcoin community operations",
  },
  {
    id: "satellite-8",
    username: "@msrdigitalart",
    role: "Design Strategist",
    profileImage: "/images/artists-images/avatar-msrdigitalart.png",
    description:
      "Visual identity and brand strategist for Bitcoin community initiatives",
  },
];

// Helper functions
export const getSquadById = (id: string): Squad | undefined => {
  return squads.find((squad) => squad.id === id);
};

export const getSatelliteById = (id: string): Satellite | undefined => {
  return satellites.find((satellite) => satellite.id === id);
};
