export interface Artist {
  id: string;
  username: string; // e.g., "@altafacha69"
  profileImage: string; // Path to profile image
  country: string; // ISO country code for flag (e.g., "ve" for Venezuela)
  countryName: string; // Full country name
  totalCards: number; // Total number of cards created
  completedCards: number; // Number of completed cards (e.g., 5/5)
  communities: string[]; // Array of community IDs this artist supports
  bio?: string; // Optional artist bio
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    website?: string;
  };
}
