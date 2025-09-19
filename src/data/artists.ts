import { Artist } from "../types/Artist";

export const artists: Artist[] = [
  {
    id: "altafacha69",
    username: "Rocco Gentile",
    profileImage: "/images/artists-images/avatar-altafacha.png",
    country: "ve",
    countryName: "Venezuela",
    totalCards: 5,
    completedCards: 5,
    communities: [
      "bitcoin-berlin",
      "cuba-bitcoin",
      "btc-x-bolivia",
      "btc-isla",
      "escuelita-bitcoin",
    ],
    bio: "Diseñador gráfico y UX/UI.",
    socialLinks: {
      twitter: "https://twitter.com/altafacha69",
      instagram: "https://instagram.com/altafacha69",
    },
  },
  {
    id: "abstractlai",
    username: "Lai Jurisich",
    profileImage: "/images/artists-images/avatar-abstractlai.png",
    country: "ar",
    countryName: "Argentina",
    totalCards: 6,
    completedCards: 6,
    communities: [
      "bitcoin-berlin",
      "cuba-bitcoin",
      "lago-bitcoin",
      "prospera-distrito-bitcoin",
      "satoshi-somos-todos",
      "bitcoin-nea",
    ],
    bio: "Artista visual y pintora.",
    socialLinks: {
      twitter: "https://x.com/laila_catalina",
      instagram: "https://www.instagram.com/abstract.lai",
    },
  },
  {
    id: "elsyluque54",
    username: "Elsy Luque",
    profileImage: "/images/artists-images/avatar-elsyluque54.png",
    country: "hn",
    countryName: "Honduras",
    totalCards: 1,
    completedCards: 1,
    communities: ["prospera-distrito-bitcoin"],
    bio: "Ilustradora y pintora",
    socialLinks: {
      instagram: "https://www.instagram.com/elsy.luque.54",
    },
  },
  {
    id: "ikbenmartuu_",
    username: "Martuu Salcedo",
    profileImage: "/images/artists-images/avatar-ikbenmartuu_.png",
    country: "ar",
    countryName: "Argentina",
    totalCards: 3,
    completedCards: 3,
    communities: ["lago-bitcoin", "cuba-bitcoin", "bitcoin-nea"],
    bio: "Ilustradora y pintora",
    socialLinks: {
      instagram: "https://www.instagram.com/ikbenmartuu_/",
      tiktok: "https://www.tiktok.com/@ikbenmartuu_",
    },
  },
  {
    id: "josediosok",
    username: "Jose Dios",
    profileImage: "/images/artists-images/avatar-josediosok.png",
    country: "ar",
    countryName: "Argentina",
    totalCards: 6,
    completedCards: 6,
    communities: [
      "lago-bitcoin",
      "satoshi-somos-todos",
      "bitcoin-nea",
      "btc-isla",
      "cuba-bitcoin",
      "prospera-distrito-bitcoin",
    ],
    bio: "Artista visual, muralista y pintor.",
    socialLinks: {
      instagram: "https://www.instagram.com/josediosok",
    },
  },
  {
    id: "leonelzab",
    username: "Leonel Zabala",
    profileImage: "/images/artists-images/avatar-leonelzab.png",
    country: "ar",
    countryName: "Argentina",
    totalCards: 5,
    completedCards: 5,
    communities: [
      "prospera-distrito-bitcoin",
      "btc-x-bolivia",
      "cuba-bitcoin",
      "club-satoshi",
      "escuelita-bitcoin",
    ],
    bio: "Tatuador especializado en blackwork.",
    socialLinks: {
      twitter: "https://x.com/leonelzab",
      instagram: "https://www.instagram.com/leonelzab",
    },
  },
  {
    id: "maxibellmann",
    username: "Maxi Bellmann",
    profileImage: "/images/artists-images/avatar-maxibellmann.png",
    country: "ar",
    countryName: "Argentina",
    totalCards: 3,
    completedCards: 3,
    communities: ["btc-isla", "satoshi-somos-todos", "club-satoshi"],
    bio: "Diseñador 3D y Artista visual. Profesor de Diseño 3D.",
    socialLinks: {
      twitter: "https://x.com/maxibellmann",
      instagram: "https://www.instagram.com/maxibellmann/",
    },
  },
  {
    id: "msrdigitalart",
    username: "MsrDigitalArt",
    profileImage: "/images/artists-images/avatar-msrdigitalart.png",
    country: "ar",
    countryName: "Argentina",
    totalCards: 2,
    completedCards: 2,
    communities: ["club-satoshi", "bitcoin-berlin"],
    bio: "Artista visual y digital (AI - Generative Art) y Profesora de Arte.",
    socialLinks: {
      twitter: "https://x.com/msrdigitalart",
      instagram: "https://www.instagram.com/msrdigitalart/",
    },
  },
  {
    id: "noe21io",
    username: "Noe",
    profileImage: "/images/artists-images/avatar-noe21io.png",
    country: "ar",
    countryName: "Argentina",
    totalCards: 1,
    completedCards: 1,
    communities: ["lago-bitcoin"],
    bio: "Artista digital (AI - Generative Art)",
    socialLinks: {
      nostr:
        "https://primal.net/p/nprofile1qqszzsme7fx4098me4z9fs8zglfseuha93635kug44ydep9lu525tcg6cc3f4",
    },
  },
  {
    id: "petterzweil",
    username: "Petter ₿",
    profileImage: "/images/artists-images/avatar-petterzweil.png",
    country: "mx",
    countryName: "Mexico",
    totalCards: 4,
    completedCards: 4,
    communities: [
      "satoshi-somos-todos",
      "club-satoshi",
      "escuelita-bitcoin",
      "btc-x-bolivia",
    ],
    bio: "Ilustrador y pintor.",
    socialLinks: {
      twitter: "https://x.com/petterzweil",
      instagram: "https://www.instagram.com/petterzweil/",
    },
  },
  {
    id: "valukki",
    username: "Valukki",
    profileImage: "/images/artists-images/avatar-valukki.png",
    country: "br",
    countryName: "Brasil",
    totalCards: 4,
    completedCards: 4,
    communities: [
      "bitcoin-berlin",
      "escuelita-bitcoin",
      "bitcoin-nea",
      "btc-x-bolivia",
    ],
    bio: "Ilustradora y Profesora de arte y diseño.",
    socialLinks: {
      instagram: "https://www.instagram.com/valukki",
    },
  },
];

// Helper functions for filtering
export const getArtistsByCountry = (country: string): Artist[] => {
  return artists.filter((artist) => artist.country === country);
};

export const getArtistsByCommunity = (communityId: string): Artist[] => {
  return artists.filter((artist) => artist.communities.includes(communityId));
};

export const getUniqueCountries = (): string[] => {
  return [...new Set(artists.map((artist) => artist.countryName))];
};

export const getUniqueCommunities = (): string[] => {
  const allCommunities = artists.flatMap((artist) => artist.communities);
  return [...new Set(allCommunities)];
};

export const getArtistById = (id: string): Artist | undefined => {
  return artists.find((artist) => artist.id === id);
};
