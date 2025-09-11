import React from "react";
import { useParams, Link } from "react-router-dom";
import SEOHead from "../components/seo/SEOHead";
import { artists } from "../data/artists";
import { cards, getCardsByArtist } from "../data/cards";
import { Card as UICard, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CardsIcon } from "../components/icons/cards-icon";
import { ExternalLink, ArrowLeft, Globe, Instagram, Twitter } from "lucide-react";
import { Card } from "../types/Card";
import ArtistCardDetail from "../components/ArtistCardDetail";

const ArtistPage: React.FC = () => {
  const { artistId } = useParams<{ artistId: string }>();
  
  // Find the artist by ID
  const artist = artists.find(a => a.id === artistId);
  
  if (!artist) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Artista no encontrado</h1>
          <p className="text-gray-600 mb-8">El artista que buscas no existe.</p>
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
        type="profile"
      />

      <div className="min-h-screen bg-white">
        {/* Back Button */}
        <div className="container pt-8">
          <Link to="/artists" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Artistas
          </Link>
        </div>

        {/* Hero Section */}
        <section className="py-16 bg-white">
          <div className="container">
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
                          className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm"
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
                      <h1 className="text-2xl font-bold text-white mb-2 font-heading">
                        {artist.username}
                      </h1>
                      <div className="flex items-center space-x-2 mb-2">
                        <CardsIcon width={20} height={20} className="text-white" />
                        <span className="text-sm text-white font-body">
                          {artist.completedCards}/{artist.totalCards} Tarjetas
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex space-x-3">
                    <Button 
                      className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2"
                      asChild
                    >
                      <a href={artist.socialLinks?.website || "#"} target="_blank" rel="noopener noreferrer">
                        <Globe className="w-4 h-4 mr-2" />
                        Website
                      </a>
                    </Button>
                    <Button 
                      className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2"
                      asChild
                    >
                      <a href={artist.socialLinks?.instagram || "#"} target="_blank" rel="noopener noreferrer">
                        <Instagram className="w-4 h-4 mr-2" />
                        Instagram
                      </a>
                    </Button>
                    <Button 
                      className="bg-black hover:bg-gray-800 text-white text-sm px-4 py-2"
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
                    <p className="text-white text-base leading-relaxed font-body">
                      {artist.bio || `${artist.username} es un artista digital especializado en crear arte inspirado en Bitcoin y la cultura de las criptomonedas. Su trabajo explora temas de descentralización, libertad financiera y la revolución digital que Bitcoin representa para América Latina.`}
                    </p>
                  </CardContent>
                </UICard>
              </div>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="py-16">
          <div className="container">
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center font-heading">
                TARJETAS
              </h2>
              <p className="text-center text-gray-600 mb-8 font-body">
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
        </section>

        {/* Supported Communities Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center font-heading">
              COMUNIDADES APOYADAS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {artist.communities.map((communityId) => (
                <UICard key={communityId} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <CardsIcon width={32} height={32} className="text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 font-heading">
                      {communityId.replace('-', ' ').toUpperCase()}
                    </h3>
                    <p className="text-sm text-gray-600 font-body">
                      Comunidad Bitcoin
                    </p>
                  </CardContent>
                </UICard>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};


export default ArtistPage;
