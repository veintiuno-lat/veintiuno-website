import React from "react";
import { useParams, Link } from "react-router-dom";
import SEOHead from "../components/seo/SEOHead";
import { artists } from "../data/artists";
import { getCardsByArtist } from "../data/cards";
import { communities } from "../data/communities";
import { Card as UICard, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CardsIcon } from "../components/icons/cards-icon";
import { ArrowLeft, Globe, Instagram, Twitter } from "lucide-react";
import { Community } from "../types/Community";
import ArtistCardDetail from "../components/ArtistCardDetail";

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
    "México": "🇲🇽",
    "Peru": "🇵🇪",
    "Venezuela": "🇻🇪",
    "Chile": "🇨🇱",
    "Uruguay": "🇺🇾",
    "Paraguay": "🇵🇾",
    "Honduras": "🇭🇳",
    "Nicaragua": "🇳🇮",
    "Panamá": "🇵🇦",
    "Brasil": "🇧🇷",
  };
  return flagMap[country] || "🌍";
};

const ArtistPage: React.FC = () => {
  const { artistId } = useParams<{ artistId: string }>();
  
  // Find the artist by ID
  const artist = artists.find(a => a.id === artistId);
  
  if (!artist) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Artista no encontrado</h1>
          <p className="text-custom-gray mb-8">El artista que buscas no existe.</p>
          <Link to="/artists">
            <Button>Volver a Artistas</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get cards by artist (using the artist's username without @)
  const artistCards = getCardsByArtist(artist.username.replace('@', ''));

  return (
    <>
      <SEOHead
        title={`${artist.username} - Artista - Veintiuno.lat`}
        description={`Conoce a ${artist.username}, artista de Bitcoin que ha creado ${artist.completedCards}/${artist.totalCards} tarjetas para comunidades en ${artist.countryName}.`}
        keywords={[artist.username, "artista bitcoin", "arte digital", "tarjetas", artist.countryName.toLowerCase()]}
        url={`/artist/${artist.id}`}
        type="website"
      />

      <div className="min-h-screen bg-white">
        {/* Back Button */}
        <div className="container pt-8">
          <Link to="/artists" className="inline-flex items-center text-custom-gray hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Artistas
          </Link>
        </div>

        {/* Hero Section */}
        <section className="py-16 bg-white">
          <div className="flex justify-center">
            <div style={{ width: '80vw' }}>
            <div className="flex flex-col lg:flex-row items-start gap-8">
              {/* Artist Profile + Social Links */}
              <div className="flex-1">
                <UICard className="bg-gray-900 border-gray-700 p-8">
                  <div className="flex items-start space-x-6 mb-6">
                    {/* Profile Image with Flag */}
                    <div className="relative">
                      <div 
                        className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-yellow-400"
                      >
                        <img
                          src={artist.profileImage}
                          alt={artist.username}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        <div 
                          className="w-full h-full bg-gradient-to-br from-bitcoin to-bitcoin flex items-center justify-center text-custom-gray-light font-bold text-sm"
                          style={{ display: 'none' }}
                        >
                          {artist.username.charAt(1).toUpperCase()}
                        </div>
                      </div>
                      {/* Flag - positioned at bottom of avatar */}
                      <div className="absolute -bottom-1 -right-1">
                        <span className={`fi fi-${artist.country} fis`} style={{ fontSize: '12px' }}></span>
                      </div>
                    </div>

                    {/* Artist Info */}
                    <div className="flex-1 min-w-0">
                      <h1 className="text-2xl font-bold text-custom-gray-light mb-2 font-heading">
                        {artist.username}
                      </h1>
                      <div className="flex items-center space-x-2 mb-2">
                        <CardsIcon width={20} height={20} className="text-custom-gray-light" />
                        <span className="text-sm text-custom-gray-light font-body">
                          {artist.completedCards}/{artist.totalCards} Tarjetas
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex space-x-3">
                    <Button 
                      className="bg-bitcoin hover:bg-bitcoin text-custom-gray-light text-sm px-4 py-2"
                      asChild
                    >
                      <a href={artist.socialLinks?.website || "#"} target="_blank" rel="noopener noreferrer">
                        <Globe className="w-4 h-4 mr-2" />
                        Website
                      </a>
                    </Button>
                    <Button 
                      className="bg-bitcoin hover:bg-bitcoin text-custom-gray-light text-sm px-4 py-2"
                      asChild
                    >
                      <a href={artist.socialLinks?.instagram || "#"} target="_blank" rel="noopener noreferrer">
                        <Instagram className="w-4 h-4 mr-2" />
                        Instagram
                      </a>
                    </Button>
                    <Button 
                      className="bg-custom-black hover:bg-gray-800 text-custom-gray-light text-sm px-4 py-2"
                      asChild
                    >
                      <a href={artist.socialLinks?.twitter || "#"} target="_blank" rel="noopener noreferrer">
                        <Twitter className="w-4 h-4 mr-2" />
                        Twitter X
                      </a>
                    </Button>
                  </div>
                </UICard>
              </div>

              {/* Artist Bio */}
              <div className="flex-1">
                <UICard className="bg-gray-900 border-gray-700">
                  <CardContent className="p-8">
                    <p className="text-custom-gray-light text-base leading-relaxed font-body">
                      {artist.bio || `${artist.username} es un artista digital especializado en crear arte inspirado en Bitcoin y la cultura de las criptomonedas. Su trabajo explora temas de descentralización, libertad financiera y la revolución digital que Bitcoin representa para América Latina.`}
                    </p>
                  </CardContent>
                </UICard>
              </div>
            </div>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="py-16">
          <div className="flex justify-center">
            <div style={{ width: '80vw' }}>
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center font-heading">
                TARJETAS
              </h2>
              <p className="text-center text-custom-gray mb-8 font-body">
                {artistCards.length} tarjeta{artistCards.length !== 1 ? 's' : ''} creada{artistCards.length !== 1 ? 's' : ''} por {artist.username}
              </p>
            </div>

            {/* Cards List */}
            <div className="space-y-12">
              {artistCards.map((card, index) => (
                <ArtistCardDetail 
                  key={card.id} 
                  card={card} 
                  imagePosition={index % 2 === 0 ? 'left' : 'right'} 
                />
              ))}
            </div>

            {artistCards.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Este artista aún no ha creado tarjetas.</p>
              </div>
            )}
            </div>
          </div>
        </section>

        {/* Supported Communities Section */}
        <section className="py-16 bg-gray-50">
          <div className="flex justify-center">
            <div style={{ width: '80vw' }}>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center font-heading">
                COMUNIDADES APOYADAS
              </h2>
              <div className="flex justify-center">
                <div className="grid gap-8" style={{ 
                  width: '100%',
                  gridTemplateColumns: 'repeat(4, 300px)',
                  justifyContent: 'center'
                }}>
                {artist.communities.slice(0, 4).map((communityId) => {
                  const community = communities.find(c => c.id === communityId);
                  if (!community) return null;
                  
                  return (
                    <CommunityCard key={communityId} community={community} />
                  );
                })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

interface CommunityCardProps {
  community: Community;
}

const CommunityCard: React.FC<CommunityCardProps> = ({ community }) => {
  return (
    <UICard className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <CardContent className="p-0">
        {/* Community Image Area */}
        <div 
          className="relative flex items-center justify-center"
          style={{
            height: '100px',
            backgroundImage: community.backgroundImage 
              ? `url(${community.backgroundImage})` 
              : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: community.backgroundImage ? undefined : '#F7931A' // bitcoin color fallback
          }}
        >
          {/* Overlay for better text visibility when using background image */}
          {community.backgroundImage && (
            <div className="absolute inset-0 bg-custom-black bg-opacity-20"></div>
          )}
          
          {/* Circular Logo Overlay */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rounded-full flex items-center justify-center shadow-lg overflow-hidden" style={{ width: '100px', height: '100px' }}>
            {community.avatarImage ? (
              <img
                src={community.avatarImage}
                alt={`${community.title} logo`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to gradient if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.className = parent.className.replace('overflow-hidden', '') + ' bg-gradient-to-br from-bitcoin to-yellow-500 flex items-center justify-center';
                    parent.innerHTML = `
                      <div class="text-center">
                        <div class="text-custom-gray-light font-bold text-xs mb-1">BTC</div>
                        <div class="text-custom-gray-light font-bold text-xs">${community.title.split(' ')[0]}</div>
                      </div>
                    `;
                  }
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-bitcoin to-yellow-500 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-custom-gray-light font-bold text-xs mb-1">BTC</div>
                  <div className="text-custom-gray-light font-bold text-xs">{community.title.split(' ')[0]}</div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Community Info */}
        <div className="p-6 pt-16 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 font-heading">
            {community.title}
          </h3>
          <div className="flex items-center justify-center text-custom-gray text-sm">
            <span className="text-lg mr-2">{getCountryFlag(community.country)}</span>
            <span className="font-body">{community.city}, {community.country}</span>
          </div>
        </div>
      </CardContent>
    </UICard>
  );
};

export default ArtistPage;
