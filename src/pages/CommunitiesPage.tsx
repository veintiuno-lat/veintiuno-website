import React, { useState } from "react";
import SEOHead from "../components/seo/SEOHead";
import { communities, getUniqueCountries, getUniqueCities } from "../data/communities";
import { Community } from "../types/Community";
import { Card as UICard, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ExternalLink, MapPin } from "lucide-react";

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
  };
  return flagMap[country] || "🌍";
};

const CommunitiesPage: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  const countries = getUniqueCountries();
  const cities = getUniqueCities();

  const filteredCommunities = communities.filter(community => {
    const matchesCountry = !selectedCountry || community.country === selectedCountry;
    const matchesCity = !selectedCity || community.city === selectedCity;
    return matchesCountry && matchesCity;
  });

  const clearFilters = () => {
    setSelectedCountry("");
    setSelectedCity("");
  };

  return (
    <>
      <SEOHead
        title="Communities - Veintiuno.lat"
        description="Discover Bitcoin communities across Latin America. Each community supports local Bitcoin adoption and education."
        keywords={["comunidades bitcoin", "bitcoin latam", "comunidad", "educación bitcoin", "adopción bitcoin"]}
        url="/communities"
        type="website"
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section 
          className="py-24 bg-black text-white relative"
          style={{
            backgroundImage: 'url(/images/layout-images/communities-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="container relative z-10">
            <div className="text-center">
              <h1 className="text-6xl md:text-8xl font-bold text-orange-500 mb-6 font-heading">
                COMUNIDADES
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

        {/* Communities Section */}
        <section className="py-16">
          <div className="container">
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center font-heading">
                COMUNIDADES
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

                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by Collection" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {(selectedCountry || selectedCity) && (
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                )}
              </div>

              {/* Results count */}
              <p className="text-center text-gray-600 mb-8 font-body">
                {filteredCommunities.length} comunidad{filteredCommunities.length !== 1 ? 'es' : ''} encontrada{filteredCommunities.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Communities Grid */}
            <div className="flex justify-center">
              <div className="grid gap-8" style={{ 
                width: '90vw',
                gridTemplateColumns: 'repeat(4, 300px)',
                justifyContent: 'center'
              }}>
                {filteredCommunities.map((community) => (
                  <CommunityCard key={community.id} community={community} />
                ))}
              </div>
            </div>

            {filteredCommunities.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No se encontraron comunidades con los filtros seleccionados.</p>
              </div>
            )}
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
            backgroundColor: community.backgroundImage ? undefined : '#f97316' // orange-500 fallback
          }}
        >
          {/* Overlay for better text visibility when using background image */}
          {community.backgroundImage && (
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
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
                    parent.className = parent.className.replace('overflow-hidden', '') + ' bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center';
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
              <div className="w-full h-full bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white font-bold text-xs mb-1">BTC</div>
                  <div className="text-white font-bold text-xs">{community.title.split(' ')[0]}</div>
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
          <div className="flex items-center justify-center text-gray-600 text-sm">
            <span className="text-lg mr-2">{getCountryFlag(community.country)}</span>
            <span className="font-body">{community.city}, {community.country}</span>
          </div>
        </div>
      </CardContent>
    </UICard>
  );
};

export default CommunitiesPage;
