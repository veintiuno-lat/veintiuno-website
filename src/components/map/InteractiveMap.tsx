import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { DivIcon } from 'leaflet';

import { Community } from '../../types/Community';

import 'leaflet/dist/leaflet.css';

interface InteractiveMapProps {
  communities: Community[];
}

// Definir los límites de Latinoamérica
// const LATAM_BOUNDS = new LatLngBounds(
//   [-56.0, -118.0], // Suroeste (sur de Chile/Argentina, oeste de México)
//   [32.0, -34.0], // Noreste (norte de México, este de Brasil)
// );

// Custom marker icon usando DivIcon para mejor styling control
const createCustomIcon = () =>
  new DivIcon({
    html: `
    <div style="
      width: 32px;
      height: 32px;
      border: 2px solid white;
      border-radius: 50%;
      background: linear-gradient(135deg, #F7931A 0%, #E6820A 100%);
      box-shadow: 0 4px 12px rgba(255, 255, 255, .24);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      transform: translate(-50%, -50%);
      z-index: 1000;
    ">
      <div style="
        width: 8px;
        height: 8px;
        background: white;
        border-radius: 50%;
      "></div>
    </div>
  `,
    className: 'custom-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -32],
  });

const InteractiveMap: React.FC<InteractiveMapProps> = ({ communities }) => {
  return (
    <div className='relative'>
      <style>
        {`
          /* Estilos para marcadores personalizados */
          .custom-marker {
            background: transparent !important;
            border: none !important;
            transition: transform 0.2s ease;
          }
          
          .custom-marker:hover div {
            transform: scale(2);
            transition: transform 0.2s ease;
          }
          
          /* Estilos para popups - mantener colores originales */
          .leaflet-popup-content-wrapper {
            background: white !important;
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            border: 1px solid #f3f4f6;
            padding: 0;
            overflow: hidden;
            min-width: 320px;
            max-width: 400px;
            filter: none !important; /* Asegurar que el popup no se vea afectado por filtros */
          }
          
          .leaflet-popup-content {
            margin: 0;
            padding: 0;
            width: auto !important;
            min-width: 320px;
            color: inherit !important; /* Mantener colores originales del texto */
          }
          
          .leaflet-popup-tip {
            background: white !important;
            border: 1px solid #f3f4f6;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          
          .leaflet-popup-close-button {
            color: #9ca3af !important;
            font-size: 18px;
            padding: 8px;
            width: 40px !important;
            height: 40px !important;
            right: 16px;
            top: 16px;
            filter: none !important;
          }
          
          .leaflet-popup-close-button:hover {
            color: #F7931A !important;
            background: transparent;
          }
          
          /* Aplicar filtro de escala de grises solo al mapa base */
          .leaflet-tile-pane {
            filter: grayscale(100%) contrast(1.1) brightness(0.9);
          }
          
          /* Asegurar que los controles del mapa mantengan sus colores */
          .leaflet-control-zoom a,
          .leaflet-control-attribution {
            filter: none !important;
            background: white !important;
            color: #333 !important;
          }
          
          .leaflet-control-zoom a:hover {
            background: #f5f5f5 !important;
          }
          
          /* Estilos para el contenido interno del popup */
          .popup-content {
            filter: none !important;
          }
          
          .popup-content h3 {
            color: #111827 !important;
          }
          
          .popup-content p {
            color: #6b7280 !important;
          }
          
          .popup-content .location-info {
            color: #6b7280 !important;
          }
          
          .popup-content .tag {
            background-color: #f3f4f6 !important;
            color: #374151 !important;
          }
          
          .popup-content .visit-button {
            background-color: #F7931A !important;
            color: white !important;
          }
          
          .popup-content .visit-button:hover {
            background-color: #E6820A !important;
          }
          
          /* Asegurar que los marcadores no se vean afectados por el filtro */
          .leaflet-marker-pane {
            filter: none !important;
          }
          
          .leaflet-marker-pane .leaflet-marker-icon {
            margin: 0 !important;
          }
          
          /* Mejorar contraste del mapa base */
          .leaflet-tile {
            transition: filter 0.2s ease;
          }
        `}
      </style>

      <MapContainer
        center={[-15.7801, -47.9292]} // Centro de Latinoamérica
        zoom={4}
        minZoom={3}
        maxZoom={18}
        style={{ height: '500px', width: '100%' }}
        className='rounded-lg shadow-lg z-10'
        // maxBounds={LATAM_BOUNDS}
        // maxBoundsViscosity={0} // Hace que los límites sean "pegajosos"
        scrollWheelZoom={true}
        dragging={true}
        zoomControl={true}
        doubleClickZoom={true}
        touchZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          // bounds={LATAM_BOUNDS}
        />
        {communities.map((community) => (
          <Marker key={community.id} position={[community.latitude, community.longitude]} icon={createCustomIcon()}>
            <Popup>
              <div className='p-6 w-full popup-content'>
                <h3 className='font-theboldfont text-xl text-gray-900 mb-3 leading-tight'>{community.title}</h3>
                <p className='text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3'>{community.description}</p>

                <div className='flex items-center text-sm text-gray-500 mb-4 location-info'>
                  <span className='flex items-center'>
                    <span className='mr-2'>📍</span>
                    {community.city && `${community.city}`}, {community.country}
                  </span>
                </div>

                <a
                  href={community.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn-primary w-full visit-button'
                  style={{ textDecoration: 'none' }}
                >
                  Visitar Comunidad →
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;
