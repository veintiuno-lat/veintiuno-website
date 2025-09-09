import React, { useState } from "react";
import SEOHead from "../components/seo/SEOHead";
import { artists, getUniqueCountries, getUniqueCommunities } from "../data/artists";
import { Artist } from "../types/Artist";
import { Card as UICard, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CardsIcon } from "../components/icons/cards-icon";
import { ExternalLink } from "lucide-react";

const ArtistsPage: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCommunity, setSelectedCommunity] = useState<string>("");

  const countries = getUniqueCountries();
  const communities = getUniqueCommunities();

  const filteredArtists = artists.filter(artist => {
    const matchesCountry = !selectedCountry || artist.countryName === selectedCountry;
    const matchesCommunity = !selectedCommunity || artist.communities.includes(selectedCommunity);
    return matchesCountry && matchesCommunity;
  });

  const clearFilters = () => {
    setSelectedCountry("");
    setSelectedCommunity("");
  };

  return (
    <>
      <SEOHead
        title="Artists - Veintiuno.lat"
        description="Discover the talented artists creating unique Bitcoin card collections for communities across Latin America. Each artist supports multiple communities with their creative designs."
        keywords={["artistas bitcoin", "arte digital", "colecciones tarjetas", "comunidades latam", "diseñadores"]}
        url="/artists"
        type="website"
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-24 bg-black text-white">
          <div className="container">
            <div className="text-center">
              <h1 className="text-6xl md:text-8xl font-bold text-orange-500 mb-6 font-heading">
                ARTISTAS
              </h1>
              <p className="text-xl text-gray-300 mb-8 font-heading">
                Each Artist has its own card collection, supporting 4 communities.
              </p>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Ser un artista Veintiuno
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Artists Section */}
        <section className="py-16">
          <div className="container">
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center font-heading">
                ARTISTAS
              </h2>
              
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by Artista" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedCommunity} onValueChange={setSelectedCommunity}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by Collection" />
                  </SelectTrigger>
                  <SelectContent>
                    {communities.map((community) => (
                      <SelectItem key={community} value={community}>
                        {community}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {(selectedCountry || selectedCommunity) && (
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                )}
              </div>

              {/* Results count */}
              <p className="text-center text-gray-600 mb-8 font-body">
                {filteredArtists.length} artista{filteredArtists.length !== 1 ? 's' : ''} encontrado{filteredArtists.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Artists Grid */}
            <div className="flex justify-center">
              <div className="grid gap-6" style={{ 
                width: '90vw',
                gridTemplateColumns: 'repeat(4, 300px)',
                justifyContent: 'center'
              }}>
                {filteredArtists.map((artist) => (
                  <ArtistCard key={artist.id} artist={artist} />
                ))}
              </div>
            </div>

            {filteredArtists.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No se encontraron artistas con los filtros seleccionados.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  return (
    <UICard className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          {/* Profile Image with Flag */}
          <div className="relative">
            <div 
              className="w-25 h-25 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden"
              style={{ 
                border: '3px solid #fbbf24',
                width: '100px',
                height: '100px'
              }}
            >
              <img
                src="/images/artists-images/avatar-altafacha.png"
                alt={artist.username}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback for missing images
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
              <span className="fi fi-ve fis" style={{ fontSize: '12px' }}></span>
            </div>
          </div>

          {/* Artist Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate font-heading">
              {artist.username}
            </h3>
            <div className="flex items-center space-x-2 mt-2">
              <CardsIcon width={36} height={36} className="text-gray-600" />
              <span className="text-sm text-gray-600 font-body">
                {artist.completedCards}/{artist.totalCards} Tarjetas
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </UICard>
  );
};

export default ArtistsPage;
