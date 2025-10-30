export interface Community {
  id: string;
  title: string;
  description: string;
  link: string;
  linkTwitter?: string;
  linkEmail?: string;
  latitude: number;
  longitude: number;
  country: string;
  city?: string;
  tags?: string[];
  category?: string;
  avatarImage?: string;
  backgroundImage?: string;
  squadId?: string; // Reference to the supporting squad
  cruzade?: boolean;
  foundation?: number | string;
  peopleCount?: number | string;
  lnAddress?: string;
}
