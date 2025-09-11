import { Artist } from "../types/Artist";

export const artists: Artist[] = [
  {
    id: "altafacha69",
    username: "@altafacha69",
    profileImage: "/images/artists-images/avatar-altafacha.png",
    country: "ve",
    countryName: "Venezuela",
    totalCards: 4,
    completedCards: 4,
    communities: ["cuba-bitcoin", "mexico-bitcoin", "argentina-bitcoin"],
    bio: "Digital artist specializing in Bitcoin-themed illustrations",
    socialLinks: {
      twitter: "https://twitter.com/altafacha69",
      instagram: "https://instagram.com/altafacha69"
    }
  },
  {
    id: "abstractlai",
    username: "@abstractlai",
    profileImage: "/images/artists-images/avatar-abstractlai.png",
    country: "mx",
    countryName: "México",
    totalCards: 7,
    completedCards: 7,
    communities: ["mexico-bitcoin"],
    bio: "Mexican digital artist creating abstract Bitcoin-inspired artwork"
  },
  {
    id: "elsyluque54",
    username: "@elsyluque54",
    profileImage: "/images/artists-images/avatar-elsyluque54.png",
    country: "ar",
    countryName: "Argentina",
    totalCards: 1,
    completedCards: 1,
    communities: ["argentina-bitcoin"],
    bio: "Argentine artist exploring Bitcoin through digital art"
  },
  {
    id: "ikbenmartuu_",
    username: "@ikbenmartuu_",
    profileImage: "/images/artists-images/avatar-ikbenmartuu_.png",
    country: "br",
    countryName: "Brasil",
    totalCards: 3,
    completedCards: 3,
    communities: ["brasil-bitcoin"],
    bio: "Brazilian artist creating vibrant Bitcoin artwork"
  },
  {
    id: "josediosok",
    username: "@josediosok",
    profileImage: "/images/artists-images/avatar-josediosok.png",
    country: "co",
    countryName: "Colombia",
    totalCards: 5,
    completedCards: 5,
    communities: ["colombia-bitcoin"],
    bio: "Colombian digital artist exploring Bitcoin themes"
  },
  {
    id: "leonelzab",
    username: "@leonelzab",
    profileImage: "/images/artists-images/avatar-leonelzab.png",
    country: "cl",
    countryName: "Chile",
    totalCards: 5,
    completedCards: 5,
    communities: ["chile-bitcoin"],
    bio: "Chilean artist specializing in minimalist Bitcoin designs"
  },
  {
    id: "maxibellmann",
    username: "@maxibellmann",
    profileImage: "/images/artists-images/avatar-maxibellmann.png",
    country: "pe",
    countryName: "Perú",
    totalCards: 3,
    completedCards: 3,
    communities: ["peru-bitcoin"],
    bio: "Peruvian artist creating Bitcoin art inspired by Inca culture"
  },
  {
    id: "msrdigitalart",
    username: "@msrdigitalart",
    profileImage: "/images/artists-images/avatar-msrdigitalart.png",
    country: "cu",
    countryName: "Cuba",
    totalCards: 2,
    completedCards: 2,
    communities: ["cuba-bitcoin"],
    bio: "Cuban artist exploring Bitcoin through traditional and digital media"
  },
  {
    id: "noe21io",
    username: "@noe21io",
    profileImage: "/images/artists-images/avatar-noe21io.png",
    country: "mx",
    countryName: "México",
    totalCards: 1,
    completedCards: 1,
    communities: ["mexico-bitcoin"],
    bio: "Mexican artist blending traditional Aztec motifs with Bitcoin culture"
  },
  {
    id: "petterzweil",
    username: "@petterzweil",
    profileImage: "/images/artists-images/avatar-petterzweil.png",
    country: "ar",
    countryName: "Argentina",
    totalCards: 4,
    completedCards: 4,
    communities: ["argentina-bitcoin"],
    bio: "Argentine artist passionate about football and Bitcoin"
  },
  {
    id: "valukki",
    username: "@valukki",
    profileImage: "/images/artists-images/avatar-valukki.png",
    country: "br",
    countryName: "Brasil",
    totalCards: 4,
    completedCards: 4,
    communities: ["brasil-bitcoin"],
    bio: "Brazilian artist creating vibrant Bitcoin artwork"
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
