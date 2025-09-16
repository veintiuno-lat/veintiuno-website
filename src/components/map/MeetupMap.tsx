import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { DivIcon } from "leaflet";
import { ExternalLink } from "lucide-react";
import { Community } from "../../types/Community";
import "leaflet/dist/leaflet.css";

interface MeetupMapProps {
  communities: Community[];
  zoom?: number;
}

const createMeetupMarkerIcon = () => {
  return new DivIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 20px;
        height: 20px;
        background-color: #F7931A;
        border: 3px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
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
    popupAnchor: [0, -10]
  });
};

const MeetupMap: React.FC<MeetupMapProps> = ({ communities, zoom = 3 }) => {
  if (communities.length === 0) return null;

  // Calculate center point between communities
  const centerLat = communities.reduce((sum, community) => sum + community.latitude, 0) / communities.length;
  const centerLng = communities.reduce((sum, community) => sum + community.longitude, 0) / communities.length;

  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
      <style>
        {`
          /* Grayscale map styling */
          .leaflet-tile-pane {
            filter: grayscale(100%) contrast(1.1) brightness(0.9);
          }
          
          /* Custom marker styling */
          .custom-marker {
            background: transparent !important;
            border: none !important;
          }
          
          /* Popup styling */
          .leaflet-popup-content-wrapper {
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            padding: 0;
          }
          
          .leaflet-popup-content {
            margin: 0;
            padding: 12px;
            font-family: inherit;
          }
          
          .leaflet-popup-tip {
            background: white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
            icon={createMeetupMarkerIcon()}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-bold text-gray-900 mb-2">{community.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{community.city}, {community.country}</p>
                {community.link && community.link !== "#" && (
                  <a
                    href={community.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-bitcoin hover:text-orange-600 text-sm"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Ver comunidad
                  </a>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MeetupMap;
