import { useEffect, useMemo, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { DivIcon, LatLngBounds, type Marker as LMarker } from "leaflet";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import "leaflet/dist/leaflet.css";
import { cn } from "@/lib/utils";

export interface MapPoint {
  id: string;
  lat: number;
  lng: number;
  title: string;
  subtitle?: string;
  image?: string;
  href?: string;
}

interface CommunityMapProps {
  points: MapPoint[];
  selectedId?: string | null;
  /** Visually emphasised marker (e.g. hovered list item) without moving the map */
  highlightId?: string | null;
  onSelect?: (id: string) => void;
  className?: string;
  /** Max zoom used when fitting to the points */
  maxZoom?: number;
  scrollWheelZoom?: boolean;
}

const icon = (active: boolean) =>
  new DivIcon({
    className: "",
    html: `<div class="vn-marker${active ? " active" : ""}"><span class="pulse"></span><span class="core"></span></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -12],
  });

function FitBounds({ points, maxZoom }: { points: MapPoint[]; maxZoom: number }) {
  const map = useMap();
  const key = points.map((p) => p.id).join(",");
  useEffect(() => {
    if (!points.length) return;
    const b = new LatLngBounds(points.map((p) => [p.lat, p.lng]));
    map.flyToBounds(b, { padding: [48, 48], maxZoom, duration: 0.9 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, map, maxZoom]);
  return null;
}

function FlyToSelected({ point }: { point?: MapPoint }) {
  const map = useMap();
  useEffect(() => {
    if (point) map.flyTo([point.lat, point.lng], Math.max(map.getZoom(), 7), { duration: 0.8 });
  }, [point, map]);
  return null;
}

/** Dark, interactive map for any set of geo points (communities, meetups, cards). */
export default function CommunityMap({
  points,
  selectedId,
  highlightId,
  onSelect,
  className,
  maxZoom = 6,
  scrollWheelZoom = false,
}: CommunityMapProps) {
  const markers = useRef<Record<string, LMarker | null>>({});
  const selected = useMemo(() => points.find((p) => p.id === selectedId), [points, selectedId]);

  useEffect(() => {
    if (selectedId) markers.current[selectedId]?.openPopup();
  }, [selectedId]);

  if (!points.length) return null;
  const center: [number, number] = [points[0].lat, points[0].lng];

  return (
    <div className={cn("vn-map relative isolate overflow-hidden rounded-3xl border border-white/10", className)}>
      <MapContainer
        center={center}
        zoom={4}
        minZoom={2}
        scrollWheelZoom={scrollWheelZoom}
        className='h-full w-full'
        attributionControl
      >
        {/* OSM raster tiles turned dark via CSS filter (.vn-map) — no API key needed */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <FitBounds points={points} maxZoom={maxZoom} />
        <FlyToSelected point={selected} />
        {points.map((p) => (
          <Marker
            key={p.id}
            position={[p.lat, p.lng]}
            icon={icon(p.id === selectedId || p.id === highlightId)}
            zIndexOffset={p.id === selectedId || p.id === highlightId ? 1000 : 0}
            ref={(m) => (markers.current[p.id] = m)}
            eventHandlers={{ click: () => onSelect?.(p.id) }}
          >
            <Popup closeButton={false}>
              <div className='flex w-56 items-center gap-3'>
                {p.image ? (
                  <img src={p.image} alt='' className='h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-bitcoin/40' />
                ) : (
                  <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bitcoin/20 font-bold text-bitcoin'>
                    {p.title[0]}
                  </div>
                )}
                <div className='min-w-0'>
                  <div className='truncate font-semibold text-white'>{p.title}</div>
                  {p.subtitle && <div className='truncate text-xs text-gray-400'>{p.subtitle}</div>}
                  {p.href && (
                    <Link to={p.href} className='mt-1 inline-flex items-center gap-1 text-xs font-semibold !text-bitcoin'>
                      Ver más <ArrowUpRight className='h-3 w-3' />
                    </Link>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {/* Vignette to blend into the page */}
      <div aria-hidden='true' className='pointer-events-none absolute inset-0 z-[400] rounded-3xl shadow-[inset_0_0_80px_rgba(7,7,10,0.9)]' />
    </div>
  );
}
