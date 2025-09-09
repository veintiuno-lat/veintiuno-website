import { Artist } from "../types/Artist";

export const artists: Artist[] = [
  {
    id: "altafacha69",
    username: "@altafacha69",
    profileImage: "/images/artists/altafacha69.jpg",
    country: "ve",
    countryName: "Venezuela",
    totalCards: 5,
    completedCards: 5,
    communities: ["cuba-bitcoin", "mexico-bitcoin", "argentina-bitcoin"],
    bio: "Digital artist specializing in Bitcoin-themed illustrations",
    socialLinks: {
      twitter: "https://twitter.com/altafacha69",
      instagram: "https://instagram.com/altafacha69"
    }
  },
  {
    id: "carlos-rodriguez",
    username: "@carlos_art",
    profileImage: "/images/artists/carlos-rodriguez.jpg",
    country: "cu",
    countryName: "Cuba",
    totalCards: 4,
    completedCards: 4,
    communities: ["cuba-bitcoin"],
    bio: "Cuban artist exploring Bitcoin through traditional and digital media"
  },
  {
    id: "ana-garcia",
    username: "@ana_garcia_mx",
    profileImage: "/images/artists/ana-garcia.jpg",
    country: "mx",
    countryName: "México",
    totalCards: 4,
    completedCards: 4,
    communities: ["mexico-bitcoin"],
    bio: "Mexican artist blending traditional Aztec motifs with Bitcoin culture"
  },
  {
    id: "diego-martinez",
    username: "@diego_btc_art",
    profileImage: "/images/artists/diego-martinez.jpg",
    country: "ar",
    countryName: "Argentina",
    totalCards: 4,
    completedCards: 4,
    communities: ["argentina-bitcoin"],
    bio: "Argentine artist passionate about football and Bitcoin"
  },
  {
    id: "maria-silva",
    username: "@maria_silva_br",
    profileImage: "/images/artists/maria-silva.jpg",
    country: "br",
    countryName: "Brasil",
    totalCards: 3,
    completedCards: 2,
    communities: ["brasil-bitcoin"],
    bio: "Brazilian artist creating vibrant Bitcoin artwork"
  },
  {
    id: "juan-perez",
    username: "@juan_perez_co",
    profileImage: "/images/artists/juan-perez.jpg",
    country: "co",
    countryName: "Colombia",
    totalCards: 4,
    completedCards: 3,
    communities: ["colombia-bitcoin"],
    bio: "Colombian digital artist exploring Bitcoin themes"
  },
  {
    id: "sofia-ramirez",
    username: "@sofia_ramirez_cl",
    profileImage: "/images/artists/sofia-ramirez.jpg",
    country: "cl",
    countryName: "Chile",
    totalCards: 5,
    completedCards: 5,
    communities: ["chile-bitcoin"],
    bio: "Chilean artist specializing in minimalist Bitcoin designs"
  },
  {
    id: "alejandro-torres",
    username: "@alejandro_torres_pe",
    profileImage: "/images/artists/alejandro-torres.jpg",
    country: "pe",
    countryName: "Perú",
    totalCards: 4,
    completedCards: 4,
    communities: ["peru-bitcoin"],
    bio: "Peruvian artist creating Bitcoin art inspired by Inca culture"
  }
];

// Helper functions for filtering
export const getArtistsByCountry = (country: string): Artist[] => {
  return artists.filter(artist => artist.country === country);
};

export const getArtistsByCommunity = (communityId: string): Artist[] => {
  return artists.filter(artist => artist.communities.includes(communityId));
};

export const getUniqueCountries = (): string[] => {
  return [...new Set(artists.map(artist => artist.countryName))];
};

export const getUniqueCommunities = (): string[] => {
  const allCommunities = artists.flatMap(artist => artist.communities);
  return [...new Set(allCommunities)];
};
