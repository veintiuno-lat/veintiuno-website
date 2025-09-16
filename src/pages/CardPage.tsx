import React from "react";
import { useParams, Link } from "react-router-dom";
import SEOHead from "../components/seo/SEOHead";
import { getCardById } from "../data/cards";
import { getCommunityById } from "../data/communities";
import { getArtistById } from "../data/artists";
import { Card as UICard, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MeetupMap from "../components/map/MeetupMap";
import { ChevronLeft, MapPin, Calendar, User, Eye } from "lucide-react";
import { Community } from "../types/Community";

// Country flag mapping
const getCountryFlag = (country: string): string => {
  const flagMap: { [key: string]: string } = {
    "El Salvador": "🇸🇻",
    "Guatemala": "🇬🇹",
    "Bolivia": "🇧🇴",
    "Cuba": "🇨🇺",
    "Argentina": "🇦🇷",
    "Colombia": "🇨🇴",
    "República Dominicana": "🇩🇴",
    "Costa Rica": "🇨🇷",
    "Ecuador": "🇪🇨",
    "Honduras": "🇭🇳",
    "Paraguay": "🇵🇾",
    "Peru": "🇵🇪",
    "Italy": "🇮🇹",
    "México": "🇲🇽",
    "Venezuela": "🇻🇪",
    "Chile": "🇨🇱",
    "Uruguay": "🇺🇾",
    "Nicaragua": "🇳🇮",
    "Panamá": "🇵🇦",
    "Brasil": "🇧🇷",
  };
  return flagMap[country] || "🌍";
};

const CardPage: React.FC = () => {
  const { cardId } = useParams<{ cardId: string }>();
  
  // Find the card by ID
  const card = getCardById(cardId || '');
  
  if (!card) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tarjeta no encontrada</h1>
          <p className="text-custom-gray mb-8">La tarjeta que buscas no existe.</p>
          <Link to="/cards">
            <Button>Back to Cards</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get the community for this card
  const community = getCommunityById(card.communityId);
  
  // Get the artist for this card
  const artist = getArtistById(card.artist);

  // Create community object for map (use card coordinates or fallback to community coordinates)
  const mapCommunity: Community = {
    id: community?.id || card.communityId,
    title: card.communityName,
    description: community?.description || "Bitcoin community",
    link: community?.link || "#",
    latitude: card.coordinates?.[0]?.latitude || community?.latitude || 0,
    longitude: card.coordinates?.[0]?.longitude || community?.longitude || 0,
    country: community?.country || "Unknown",
    city: community?.city || "Unknown",
    avatarImage: community?.avatarImage,
    backgroundImage: community?.backgroundImage
  };

  return (
    <>
      <SEOHead
        title={`${card.title || card.number} - Tarjeta - Veintiuno.lat`}
        description={`Descubre ${card.title || card.number} de ${card.artist} para ${card.communityName} en ${card.location}.`}
        keywords={[card.title || card.number, "tarjeta", "bitcoin", "arte digital", card.artist, card.communityName]}
        url={`/card/${card.id}`}
        type="website"
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="pt-12 pb-20 bg-white">
          {/* Back Button */}
          <div className="container mb-8" style={{ paddingLeft: '0px !important' }}>
            <Link to="/cards" className="inline-flex items-center text-custom-gray hover:text-gray-900 transition-colors">
              <ChevronLeft className="w-6 h-6" />
              <span className="text-3xl md:text-3xl font-bold text-gray-900 font-heading">TARJETA</span>
            </Link>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-8xl px-4 md:px-8">
              <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12">
                {/* Card Image */}
                <div className="flex-1">
                  <div className="flex justify-center">
                      <div 
                        className="rounded-lg overflow-hidden shadow-lg"
                        style={{ maxWidth: '600px', width: '100%' }}
                      >
                      <img
                        src={card.imageUrl}
                        alt={card.title || `${card.communityName} - ${card.number}`}
                        className="block w-full h-auto"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.className = parent.className.replace('overflow-hidden', '') + ' bg-gradient-to-br from-bitcoin to-yellow-500 flex items-center justify-center';
                            parent.innerHTML = `<span class="text-white font-bold text-3xl">${card.title?.split(' ').map(word => word[0]).join('') || 'BTC'}</span>`;
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card Information */}
                <div className="flex-1">
                  <UICard className="bg-gray-900 border-gray-700 h-full">
                    <CardContent className="p-4 md:p-6 lg:p-8">
                      {/* Title */}
                      <div className="mb-4 md:mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-custom-gray-light mb-3 md:mb-4 font-heading">
                          {card.title || card.number}
                        </h1>
                        <p className="text-custom-gray-light text-base md:text-lg leading-relaxed font-body">
                          {card.description || "Una obra de arte digital inspirada en Bitcoin y la descentralización."}
                        </p>
                      </div>

                      {/* Card Details */}
                      <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                        <div className="flex items-center space-x-3">
                          <User className="w-5 h-5 text-custom-gray-light" />
                          <span className="text-custom-gray-light font-body">
                            <strong>Artista:</strong> {card.artist}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-custom-gray-light" />
                          <span className="text-custom-gray-light font-body">
                            <strong>Número:</strong> {card.number}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-custom-gray-light" />
                          <span className="text-custom-gray-light font-body">
                            <strong>Ubicación:</strong> {card.location}
                          </span>
                        </div>
                      </div>

                      {/* Community Info */}
                      {community && (
                        <div className="mb-6 md:mb-8">
                          <h3 className="text-lg md:text-xl font-semibold text-custom-gray-light mb-3 md:mb-4 font-heading">
                            Comunidad
                          </h3>
                          <div className="flex items-center space-x-3 md:space-x-4">
                            {/* Community Avatar */}
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
                              {community.avatarImage ? (
                                <img
                                  src={community.avatarImage}
                                  alt={`${community.title} logo`}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    const parent = target.parentElement;
                                    if (parent) {
                                      parent.className = parent.className.replace('overflow-hidden', '') + ' bg-gradient-to-br from-bitcoin to-yellow-500 flex items-center justify-center';
                                      parent.innerHTML = `
                                        <div class="text-center">
                                          <div class="text-white font-bold text-xs mb-1">BTC</div>
                                          <div class="text-white font-bold text-xs">${community.title.split(' ')[0]}</div>
                                        </div>
                                      `;
                                    }
                                  }}
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-bitcoin to-yellow-500 flex items-center justify-center">
                                  <div className="text-center">
                                    <div className="text-white font-bold text-xs mb-1">BTC</div>
                                    <div className="text-white font-bold text-xs">{community.title.split(' ')[0]}</div>
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            {/* Community Details */}
                            <div className="min-w-0 flex-1">
                              <h4 className="text-base md:text-lg font-semibold text-custom-gray-light font-heading">
                                {community.title}
                              </h4>
                              <div className="flex items-center text-custom-gray text-sm">
                                <span className="text-base md:text-lg mr-2">{getCountryFlag(community.country)}</span>
                                <span className="font-body truncate">{community.city}, {community.country}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                        {artist && (
                          <Button 
                            className="bg-bitcoin hover:bg-bitcoin text-white"
                            asChild
                          >
                            <Link to={`/artist/${artist.id}`}>
                              Ver artista
                              <Eye className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        )}
                        {community && (
                          <Button 
                            variant="outline" 
                            className="border-white text-orange-500 hover:bg-white hover:text-gray-900"
                            asChild
                          >
                            <Link to={`/community/${community.id}`}>
                              Ver comunidad
                              <Eye className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </UICard>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 font-heading text-center">
              UBICACIÓN
            </h2>
            <div className="mx-auto">
              <div className="w-full rounded-lg overflow-hidden" style={{ height: '350px' }}>
                <MeetupMap communities={[mapCommunity]} zoom={6} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CardPage;
