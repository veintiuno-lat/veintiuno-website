import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { DivIcon } from "leaflet";
import { ExternalLink } from "lucide-react";
import { Community } from "../../types/Community";
import "leaflet/dist/leaflet.css";

interface SquadMapProps {
  communities: Community[];
  zoom?: number;
}

// Custom marker icon for squad communities
const createSquadMarkerIcon = () => {
  return new DivIcon({
    className: 'custom-squad-marker',
    html: `
      <div style="
        width: 20px;
        height: 20px;
        background-color: #F7931A;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 8px;
          height: 8px;
          background-color: white;
          border-radius: 50%;
        "></div>
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10],
  });
};

const SquadMap: React.FC<SquadMapProps> = ({ communities, zoom = 4 }) => {
  if (communities.length === 0) return null;

  // Calculate center point between communities
  const centerLat = communities.reduce((sum, community) => sum + community.latitude, 0) / communities.length;
  const centerLng = communities.reduce((sum, community) => sum + community.longitude, 0) / communities.length;

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
      <style>
        {`
          /* Grayscale map styling */
          .leaflet-tile-pane {
            filter: grayscale(100%) contrast(1.1) brightness(0.9);
          }
          
          /* Custom marker styling */
          .custom-squad-marker {
            background: transparent !important;
            border: none !important;
          }
          
          /* Popup styling */
          .leaflet-popup-content-wrapper {
            background: white !important;
            border-radius: 12px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
            border: 1px solid #f3f4f6;
            padding: 0;
            overflow: hidden;
            min-width: 280px;
            max-width: 320px;
          }
          
          .leaflet-popup-content {
            margin: 0;
            padding: 0;
            width: auto !important;
            min-width: 280px;
          }
          
          .leaflet-popup-tip {
            background: white !important;
            border: 1px solid #f3f4f6;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          
          .leaflet-popup-close-button {
            color: #9ca3af !important;
            font-size: 16px;
            padding: 6px;
            width: 32px !important;
            height: 32px !important;
            right: 12px;
            top: 12px;
          }
          
          .leaflet-popup-close-button:hover {
            color: #F7931A !important;
            background: transparent;
          }
          
          /* Controls styling */
          .leaflet-control-zoom a,
          .leaflet-control-attribution {
            background: white !important;
            color: #333 !important;
          }
          
          .leaflet-control-zoom a:hover {
            background: #f5f5f5 !important;
          }
        `}
      </style>

      <MapContainer
        center={[centerLat, centerLng]}
        zoom={zoom}
        minZoom={3}
        maxZoom={10}
        style={{ height: "100%", width: "100%" }}
        className="z-10"
        scrollWheelZoom={true}
        dragging={true}
        zoomControl={true}
        doubleClickZoom={true}
        touchZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {communities.map((community) => (
          <Marker
            key={community.id}
            position={[community.latitude, community.longitude]}
            icon={createSquadMarkerIcon()}
          >
            <Popup>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {community.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {community.description}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span className="mr-2">📍</span>
                  {community.city && `${community.city}, `}{community.country}
                </div>
                <a
                  href={community.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-md transition-colors"
                >
                  Visitar Comunidad
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default SquadMap;
