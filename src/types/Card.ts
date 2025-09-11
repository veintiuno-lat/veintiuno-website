export interface Card {
  id: string;
  communityId: string; // Reference to the community
  communityName: string;
  location: string;
  artist: string;
  number: string; // e.g., "obra 1/40"
  imageUrl: string; // Path to the card PNG
  title?: string; // Optional card title
  description?: string; // Optional card description
  orientation?: 'portrait' | 'landscape'; // Image orientation
}
