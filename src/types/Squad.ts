export interface Squad {
  id: string;
  name: string;
  leader: string;
  soldiers: number;
  profileImage: string;
  description?: string;
  communities?: string[]; // Array of community IDs
}

export interface Satellite {
  id: string;
  username: string;
  role: string;
  profileImage: string;
  description?: string;
}

export interface Soldier {
  id: string;
  username: string;
  role: string;
  profileImage: string;
  country: string;
  countryName: string;
  squadId: string;
  bio?: string;
  socialLinks?: {
    website?: string;
    instagram?: string;
    twitter?: string;
    nostr?: string;
    github?: string;
  };
}