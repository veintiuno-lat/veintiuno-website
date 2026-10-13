export interface GlobePoint {
  id: string;
  lat: number;
  lng: number;
  label: string;
  sublabel?: string;
  /** Number of items aggregated at this point (scales the marker) */
  weight?: number;
}

export interface GlobeProps {
  points: GlobePoint[];
  onSelect?: (p: GlobePoint) => void;
  focus?: { lat: number; lng: number } | null;
  selectedId?: string | null;
  autoRotate?: boolean;
  interactive?: boolean;
  arcs?: boolean;
}
