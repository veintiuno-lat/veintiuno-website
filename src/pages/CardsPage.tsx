import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, MapPin, X } from "lucide-react";
import SEOHead from "../components/seo/SEOHead";
import { cards, getArtistsWithCardCounts } from "../data/cards";
import { communities } from "../data/communities";
import { artists } from "../data/artists";
import { Card } from "../types/Card";
import { Card as UICard, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const CardsPage: React.FC = () => {
  const [selectedCommunity, setSelectedCommunity] = useState<string>("");
  const [selectedArtist, setSelectedArtist] = useState<string>("");

  const allArtistsWithCounts = getArtistsWithCardCounts();

  // Filter artists based on selected community
  const getFilteredArtists = () => {
    if (!selectedCommunity) {
      return allArtistsWithCounts;
    }
    
    const artistCounts: { [key: string]: number } = {};
    cards
      .filter(card => card.communityName === selectedCommunity)
      .forEach(card => {
        artistCounts[card.artist] = (artistCounts[card.artist] || 0) + 1;
      });
    
    return Object.entries(artistCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  };

  // Filter communities based on selected artist
  const getFilteredCommunities = () => {
    if (!selectedArtist) {
      // Show all communities with their total card counts
      const communityCounts: { [key: string]: number } = {};
      cards.forEach(card => {
        communityCounts[card.communityName] = (communityCounts[card.communityName] || 0) + 1;
      });
      
      return communities
        .map(community => ({
          name: community.title,
          count: communityCounts[community.title] || 0,
          id: community.id
        }))
        .sort((a, b) => b.count - a.count);
    }
    
    // Show only communities that have cards by the selected artist
    const communityCounts: { [key: string]: number } = {};
    cards
      .filter(card => card.artist === selectedArtist)
      .forEach(card => {
        communityCounts[card.communityName] = (communityCounts[card.communityName] || 0) + 1;
      });
    
    return communities
      .filter(community => communityCounts[community.title] > 0)
      .map(community => ({
        name: community.title,
        count: communityCounts[community.title],
        id: community.id
      }))
      .sort((a, b) => b.count - a.count);
  };

  const filteredArtists = getFilteredArtists();
  const filteredCommunities = getFilteredCommunities();

  const filteredCards = cards.filter(card => {
    const matchesCommunity = !selectedCommunity || card.communityName === selectedCommunity;
    const matchesArtist = !selectedArtist || card.artist === selectedArtist;
    return matchesCommunity && matchesArtist;
  });

  // When both filters are active, show cards that match both
  const bothFiltersActive = selectedArtist && selectedCommunity;
  const intersectionCards = bothFiltersActive 
    ? cards.filter(card => card.artist === selectedArtist && card.communityName === selectedCommunity)
    : [];

  // Get the selected community and artist data for display
  const selectedCommunityData = selectedCommunity 
    ? communities.find(c => c.title === selectedCommunity)
    : null;
  
  const selectedArtistData = selectedArtist 
    ? artists.find(a => a.username === `@${selectedArtist}`)
    : null;

  const clearFilters = () => {
    setSelectedCommunity("");
    setSelectedArtist("");
  };

  const clearCommunityFilter = () => {
    setSelectedCommunity("");
  };

  const clearArtistFilter = () => {
    setSelectedArtist("");
  };

  const handleCommunityChange = (value: string) => {
    setSelectedCommunity(value);
    // Don't clear artist selection - allow both filters to be active
  };

  const handleArtistChange = (value: string) => {
    setSelectedArtist(value);
    // Don't clear community selection - allow both filters to be active
  };

  return (
    <>
      <SEOHead
        title="Cards - Veintiuno.lat"
        description="Explore the unique collection of digital cards from Bitcoin communities in Latin America. Each community has 4 unique designs created by local artists."
        keywords={["bitcoin cards", "digital collection", "bitcoin art", "latam communities", "unique designs"]}
        url="/cards"
        type="website"
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section 
          className="py-24 bg-gray-900 text-white relative"
          style={{
            backgroundImage: 'url(/images/layout-images/cards-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gray-900 bg-opacity-60"></div>
          <div className="container relative z-10">
            <div className="text-center">
              <h1 className="text-6xl md:text-8xl font-bold text-bitcoin mb-6 font-heading">
                CARDS
              </h1>
              <p className="text-xl text-gray-300 mb-8 font-heading">
                Each community has 4 unique designs
              </p>
              <Button className="bg-bitcoin hover:bg-bitcoin text-white">
                Agregar Comunidad
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="py-16">
          <div className="px-6">
            <div className="mb-12">
              
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
                {/* Community Filter */}
                <div className="flex items-center gap-2">
                  <Select value={selectedCommunity} onValueChange={handleCommunityChange}>
                    <SelectTrigger className="w-[250px]">
                      <SelectValue placeholder="Filter by Community" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredCommunities.map((community) => (
                        <SelectItem key={community.name} value={community.name}>
                          <div className="flex justify-between items-center w-full">
                            <span>{community.name}</span>
                            <span className="ml-2 text-gray-500 text-sm">
                              ({community.count})
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedCommunity && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={clearCommunityFilter}
                      className="p-1 h-8 w-8"
                      title="Clear Community Filter"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {/* Artist Filter */}
                <div className="flex items-center gap-2">
                  <Select value={selectedArtist} onValueChange={handleArtistChange}>
                    <SelectTrigger className="w-[250px]">
                      <SelectValue placeholder="Filter by Artist" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredArtists.map((artist) => (
                        <SelectItem key={artist.name} value={artist.name}>
                          <div className="flex justify-between items-center w-full">
                            <span>{artist.name}</span>
                            <span className="ml-2 text-gray-500 text-sm">({artist.count})</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedArtist && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={clearArtistFilter}
                      className="p-1 h-8 w-8"
                      title="Clear Artist Filter"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {/* Clear All Filters */}
                {(selectedCommunity || selectedArtist) && (
                  <Button variant="outline" onClick={clearFilters}>
                    Clear All
                  </Button>
                )}
              </div>

              {/* Results count */}
              <p className="text-center text-custom-gray mb-8 font-body">
                {bothFiltersActive 
                  ? `${intersectionCards.length} card${intersectionCards.length !== 1 ? 's' : ''} found for ${selectedArtist} in ${selectedCommunity}`
                  : `${filteredCards.length} card${filteredCards.length !== 1 ? 's' : ''} found`
                }
              </p>
            </div>

            {/* Cards Grid */}
            <TooltipProvider delayDuration={200}>
              {bothFiltersActive ? (
                // Both filters active: Show intersection cards
                <div className="flex justify-center w-full max-w-8xl px-4 md:px-12 mx-auto">
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" style={{ 
                    width: '90vw',
                    maxWidth: '1600px'
                  }}>
                    {/* Show both headers when both filters are active */}
                    <ArtistHeader artist={selectedArtistData} />
                    <CommunityHeader community={selectedCommunityData} />
                    
                    {/* Show intersection cards */}
                    {intersectionCards.map((card) => (
                      <CardTooltip key={card.id} card={card} />
                    ))}
                  </div>
                </div>
              ) : (
                // Single filtering: Show normal grid
                <div className="flex justify-center">
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" style={{ 
                    width: '90vw',
                    maxWidth: '1600px'
                  }}>
                    {/* Show Community Header if filtering by community */}
                    {selectedCommunityData && (
                      <CommunityHeader community={selectedCommunityData} />
                    )}
                    
                    {/* Show Artist Header if filtering by artist */}
                    {selectedArtistData && (
                      <ArtistHeader artist={selectedArtistData} />
                    )}
                    
                    {/* Show Cards */}
                    {filteredCards.map((card) => (
                      <CardTooltip key={card.id} card={card} />
                    ))}
                  </div>
                </div>
              )}
            </TooltipProvider>

            {(bothFiltersActive ? intersectionCards.length === 0 : filteredCards.length === 0) && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg font-body">
                  {bothFiltersActive 
                    ? `No cards found for ${selectedArtist} in ${selectedCommunity}.`
                    : "No cards found with the selected filters."
                  }
                </p>
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
  isHighlighted?: boolean;
}

const CardTooltip: React.FC<CardTooltipProps> = ({ card, isHighlighted = false }) => {
  const isPortrait = card.orientation === "portrait";
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link to={`/card/${card.id}`} className="cursor-pointer group">
          <UICard className={`overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
            isPortrait 
              ? 'group-hover:rotate-90 group-hover:translate-x-[5px] group-hover:translate-y-[60px] group-hover:z-[999999] group-hover:relative' 
              : 'group-hover:scale-105'
          } ${
            isHighlighted 
              ? 'border-double border-4 border-bitcoin' 
              : 'border-0'
          }`}>
            <CardContent className="p-0">
              <div className="relative overflow-hidden aspect-[369/232]">
                <img
                  src={card.imageUrl}
                  alt={card.title || `${card.communityName} - ${card.number}`}
                  className="w-full h-full object-cover"
                />
                {isHighlighted && (
                  <div className="absolute top-2 right-2">
                    <span className="relative flex size-5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                      <span className="relative inline-flex size-5 rounded-full bg-orange-500"></span>
                      {/* White dot at center */}
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-2 rounded-full bg-white"></span>
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </UICard>
        </Link>
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
              <span className="font-medium text-bitcoin">Artist:</span> {card.artist}
            </p>
            <p className="text-gray-200">
              <span className="font-medium text-bitcoin">Number:</span> {card.number}
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

// Community Header Component
interface CommunityHeaderProps {
  community: any; // Using any for now, should be Community type
}

const CommunityHeader: React.FC<CommunityHeaderProps> = ({ community }) => {
  return (
    <Link to={`/community/${community.id}`} className="col-span-full">
      <UICard className="overflow-hidden border-2 border-bitcoin shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
        <CardContent className="p-0">
          <div 
            className="relative h-40 flex items-center justify-center"
            style={{
              backgroundImage: community.backgroundImage 
                ? `url(${community.backgroundImage})` 
                : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: community.backgroundImage ? undefined : '#F7931A'
            }}
          >
            {community.backgroundImage && (
              <div className="absolute inset-0 bg-custom-black bg-opacity-70"></div>
            )}
            
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                {community.avatarImage ? (
                  <img
                    src={community.avatarImage}
                    alt={`${community.title} logo`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-bitcoin font-bold text-lg">BTC</span>
                )}
              </div>
              <h3 className="text-xl font-bold text-white mb-1 font-heading">
                {community.title}
              </h3>
              <div className="flex items-center justify-center text-white text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="font-body">{community.city}, {community.country}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </UICard>
    </Link>
  );
};

// Artist Header Component
interface ArtistHeaderProps {
  artist: any; // Using any for now, should be Artist type
}

const ArtistHeader: React.FC<ArtistHeaderProps> = ({ artist }) => {
  return (
    <Link to={`/artist/${artist.id}`} className="col-span-full">
      <UICard className="overflow-hidden border-2 border-bitcoin shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div 
              className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0"
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
                className="w-full h-full bg-gradient-to-br from-bitcoin to-bitcoin flex items-center justify-center text-white font-bold text-sm"
                style={{ display: 'none' }}
              >
                {artist.username.charAt(1).toUpperCase()}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-base md:text-xl font-bold text-gray-900 mb-1 font-heading">
                {artist.username}
              </h3>
              <p className="text-gray-600 text-sm font-body mb-2">
                {artist.countryName}
              </p>
              <div className="flex items-center text-bitcoin text-sm">
                <span className="font-body">{artist.completedCards}/{artist.totalCards} Cards</span>
              </div>
            </div>
          </div>
        </CardContent>
      </UICard>
    </Link>
  );
};

export default CardsPage;