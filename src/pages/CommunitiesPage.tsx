import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../components/seo/SEOHead";
import {
  communities,
  getUniqueCountries,
  getUniqueCities,
} from "../data/communities";
import { Community } from "../types/Community";
import { Card as UICard, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

// Country flag mapping
const getCountryFlag = (country: string): string => {
  const flagMap: { [key: string]: string } = {
    "El Salvador": "🇸🇻",
    Guatemala: "🇬🇹",
    Bolivia: "🇧🇴",
    Cuba: "🇨🇺",
    Argentina: "🇦🇷",
    Colombia: "🇨🇴",
    "República Dominicana": "🇩🇴",
    "Costa Rica": "🇨🇷",
    Ecuador: "🇪🇨",
    Honduras: "🇭🇳",
    Paraguay: "🇵🇾",
    Peru: "🇵🇪",
  };
  return flagMap[country] || "🌍";
};

const CommunitiesPage: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  const countries = getUniqueCountries();
  const cities = getUniqueCities();

  const filteredCommunities = communities.filter((community) => {
    const matchesCountry =
      !selectedCountry || community.country === selectedCountry;
    const matchesCity = !selectedCity || community.city === selectedCity;
    return matchesCountry && matchesCity;
  });

  // Split communities into two groups
  const cruzadeCommunities = filteredCommunities.slice(0, -3); // All except last 3
  const otherCommunities = filteredCommunities.slice(-3); // Last 3 communities

  const clearFilters = () => {
    setSelectedCountry("");
    setSelectedCity("");
  };

  return (
    <>
      <SEOHead
        title='Communities - Veintiuno.lat'
        description='Discover Bitcoin communities across Latin America. Each community supports local Bitcoin adoption and education.'
        keywords={[
          "bitcoin communities",
          "bitcoin latam",
          "community",
          "bitcoin education",
          "bitcoin adoption",
        ]}
        url='/communities'
        type='website'
      />

      <div className='min-h-screen bg-white'>
        {/* Hero Section */}
        <section
          className='py-24 bg-custom-black text-custom-gray-light relative'
          style={{
            backgroundImage: "url(/images/layout-images/communities-bg.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className='absolute inset-0 bg-custom-black bg-opacity-60'></div>
          <div className='container relative z-10'>
            <div className='text-center'>
              <h1 className='text-5xl md:text-8xl font-bold text-bitcoin mb-6 font-heading'>
                COMMUNITIES
              </h1>
              <p className='text-xl text-gray-300 mb-8 font-heading'>
                Each Artist has its own card collection, supporting 4
                communities.
              </p>
              <Button
                className='bg-bitcoin hover:bg-bitcoin text-white'
                asChild
              >
                <a
                  href='https://github.com/veintiuno-lat/veintiuno-website/issues/new?template=add-community.yml'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Sumate como Comunidad!
                  <ExternalLink className='ml-2 h-4 w-4' />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Communities Section */}
        <section className='py-24'>
          <div className='px-6'>
            <div className='mb-12'>
              {/* Filters */}
              <div className='flex flex-col md:flex-row gap-4 justify-center items-center mb-8'>
                <Select
                  value={selectedCountry}
                  onValueChange={setSelectedCountry}
                >
                  <SelectTrigger className='w-[200px]'>
                    <SelectValue placeholder='Filter by Country' />
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
                  <SelectTrigger className='w-[200px]'>
                    <SelectValue placeholder='Filter by City' />
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
                  <Button variant='outline' onClick={clearFilters}>
                    Clear Filters
                  </Button>
                )}
              </div>

              {/* Results count */}
              <p className='text-center text-custom-gray mb-8 font-body'>
                {filteredCommunities.length} communit
                {filteredCommunities.length !== 1 ? "ies" : "y"} found
              </p>
            </div>

            {/* Cruzade Communities Section */}
            {cruzadeCommunities.length > 0 && (
              <div className='mb-16 w-full max-w-8xl px-4 md:px-12 mx-auto'>
                <h2 className='text-2xl font-bold text-gray-900 mb-8 text-left font-heading'>
                  Cruzade Communities
                </h2>
                <div className='flex justify-center'>
                  <div
                    className='grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    style={{
                      width: "80vw",
                      maxWidth: "1600px",
                    }}
                  >
                    {cruzadeCommunities.map((community) => (
                      <CommunityCard key={community.id} community={community} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Other Communities Section */}
            {otherCommunities.length > 0 && (
              <div className='mb-16 w-full max-w-8xl px-4 md:px-12 mx-auto'>
                <h2 className='text-2xl font-bold text-gray-900 mb-8 text-left font-heading'>
                  Other Communities
                </h2>
                <div className='flex justify-center'>
                  <div
                    className='grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    style={{
                      width: "80vw",
                      maxWidth: "1600px",
                    }}
                  >
                    {otherCommunities.map((community) => (
                      <CommunityCard key={community.id} community={community} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {filteredCommunities.length === 0 && (
              <div className='text-center py-12'>
                <p className='text-gray-500 text-lg'>
                  No communities found with the selected filters.
                </p>
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
    <Link to={`/community/${community.id}`}>
      <UICard className='overflow-hidden border border-[#D9D9D9] hover:scale-105 transition-all duration-300 cursor-pointer'>
        <CardContent className='p-0'>
          {/* Community Image Area */}
          <div
            className='relative flex items-center justify-center'
            style={{
              height: "100px",
              backgroundImage: community.backgroundImage
                ? `url(${community.backgroundImage})`
                : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundColor: community.backgroundImage
                ? undefined
                : "#F7931A", // bitcoin color fallback
            }}
          >
            {/* Overlay for better text visibility when using background image */}
            {community.backgroundImage && (
              <div className='absolute inset-0 bg-custom-black bg-opacity-20'></div>
            )}

            {/* Circular Logo Overlay */}
            <div
              className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rounded-full flex items-center justify-center shadow-lg overflow-hidden'
              style={{ width: "100px", height: "100px" }}
            >
              {community.avatarImage ? (
                <img
                  src={community.avatarImage}
                  alt={`${community.title} logo`}
                  className='w-full h-full object-cover'
                  onError={(e) => {
                    // Fallback to gradient if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.className =
                        parent.className.replace("overflow-hidden", "") +
                        " bg-gradient-to-br from-bitcoin to-yellow-500 flex items-center justify-center";
                      parent.innerHTML = `
                      <div class="text-center">
                        <div class="text-custom-gray-light font-bold text-xs mb-1">BTC</div>
                        <div class="text-custom-gray-light font-bold text-xs">${
                          community.title.split(" ")[0]
                        }</div>
                      </div>
                    `;
                    }
                  }}
                />
              ) : (
                <div className='w-full h-full bg-gradient-to-br from-bitcoin to-yellow-500 flex items-center justify-center'>
                  <div className='text-center'>
                    <div className='text-custom-gray-light font-bold text-xs mb-1'>
                      BTC
                    </div>
                    <div className='text-custom-gray-light font-bold text-xs'>
                      {community.title.split(" ")[0]}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Community Info */}
          <div className='p-6 pt-16 text-center'>
            <h3 className='text-lg font-semibold text-gray-900 mb-2 font-heading'>
              {community.title}
            </h3>
            <div className='flex items-center justify-center text-custom-gray text-sm'>
              <span className='text-lg mr-2'>
                {getCountryFlag(community.country)}
              </span>
              <span className='font-body'>
                {community.city}, {community.country}
              </span>
            </div>
          </div>
        </CardContent>
      </UICard>
    </Link>
  );
};

export default CommunitiesPage;
