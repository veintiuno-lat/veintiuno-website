import React, { useState } from "react";
import SEOHead from "../components/seo/SEOHead";
import { cards, getUniqueCommunities, getUniqueArtists } from "../data/cards";
import { Card } from "../types/Card";
import { Card as UICard, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const CardsPage: React.FC = () => {
  const [selectedCommunity, setSelectedCommunity] = useState<string>("");
  const [selectedArtist, setSelectedArtist] = useState<string>("");

  const communities = getUniqueCommunities();
  const artists = getUniqueArtists();

  const filteredCards = cards.filter(card => {
    const matchesCommunity = !selectedCommunity || card.communityName === selectedCommunity;
    const matchesArtist = !selectedArtist || card.artist === selectedArtist;
    return matchesCommunity && matchesArtist;
  });

  const clearFilters = () => {
    setSelectedCommunity("");
    setSelectedArtist("");
  };

  return (
    <>
      <SEOHead
        title="Cards - Veintiuno.lat"
        description="Explora la colección única de tarjetas digitales de las comunidades Bitcoin en Latinoamérica. Cada comunidad tiene 4 diseños únicos creados por artistas locales."
        keywords={["tarjetas bitcoin", "colección digital", "arte bitcoin", "comunidades latam", "diseños únicos"]}
        url="/cards"
        type="website"
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-24 bg-gray-900 text-white">
          <div className="container">
            <div className="text-center">
              <h1 className="text-6xl md:text-8xl font-bold text-orange-500 mb-6 font-heading">
                CARDS
              </h1>
              <p className="text-xl text-gray-300 mb-4 font-heading">
                Each community has 4 unique designs
              </p>
              <p className="text-lg text-gray-400 mb-8 font-heading">
                Each Artist has its own collection
              </p>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="py-16">
          <div className="container">
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center font-heading">
                TODAS LAS TARJETAS
              </h2>
              
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
                <Select value={selectedCommunity} onValueChange={setSelectedCommunity}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by Comunidad" />
                  </SelectTrigger>
                  <SelectContent>
                    {communities.map((community) => (
                      <SelectItem key={community} value={community}>
                        {community}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedArtist} onValueChange={setSelectedArtist}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by Artista" />
                  </SelectTrigger>
                  <SelectContent>
                    {artists.map((artist) => (
                      <SelectItem key={artist} value={artist}>
                        {artist}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {(selectedCommunity || selectedArtist) && (
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                )}
              </div>

              {/* Results count */}
              <p className="text-center text-gray-600 mb-8 font-body">
                {filteredCards.length} tarjeta{filteredCards.length !== 1 ? 's' : ''} encontrada{filteredCards.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Cards Grid */}
            <TooltipProvider>
              <div className="flex justify-center">
                <div className="grid gap-6" style={{ 
                  width: '90vw',
                  gridTemplateColumns: 'repeat(4, 369px)',
                  justifyContent: 'center'
                }}>
                  {filteredCards.map((card) => (
                    <CardTooltip key={card.id} card={card} />
                  ))}
                </div>
              </div>
            </TooltipProvider>

            {filteredCards.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg font-body">No se encontraron tarjetas con los filtros seleccionados.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

interface CardTooltipProps {
  card: Card;
}

const CardTooltip: React.FC<CardTooltipProps> = ({ card }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="cursor-pointer group">
          <UICard className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
            <CardContent className="p-0">
              <div className="relative overflow-hidden" style={{ width: '369px', height: '232px' }}>
                <img
                  src={card.imageUrl}
                  alt={card.title || `${card.communityName} - ${card.number}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
          </UICard>
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-sm">
        <div className="space-y-3">
          <div>
            <h3 className="font-bold text-lg text-white">
              {card.title || card.communityName}
            </h3>
            <p className="text-gray-300 text-sm">{card.location}</p>
          </div>
          
          <div className="space-y-1 text-sm">
            <p className="text-gray-200">
              <span className="font-medium text-orange-400">Artista:</span> {card.artist}
            </p>
            <p className="text-gray-200">
              <span className="font-medium text-orange-400">Número:</span> {card.number}
            </p>
          </div>
          
          {card.description && (
            <p className="text-gray-300 text-sm">
              {card.description}
            </p>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default CardsPage;