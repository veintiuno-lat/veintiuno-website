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
import { Reveal, Stagger, StaggerItem, TiltCard, MagneticButton } from "../components/motion";

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
    Perú: "🇵🇪",
    México: "🇲🇽",
    Uruguay: "🇺🇾",
    Venezuela: "🇻🇪",
    Chile: "🇨🇱",
    Nicaragua: "🇳🇮",
    Panamá: "🇵🇦",
    Brasil: "🇧🇷",
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
  const cruzadeCommunities = filteredCommunities.filter(
    (community) => community.cruzade
  );
  const otherCommunities = filteredCommunities.filter(
    (community) => !community.cruzade
  );

  const clearFilters = () => {
    setSelectedCountry("");
    setSelectedCity("");
  };

  return (
    <>
      <SEOHead
        title='Comunidades Bitcoin en LATAM · Veintiuno'
        description='Explorá las comunidades Bitcoin activas en toda Latinoamérica. Argentina, México, El Salvador, Chile y más — la red bitcoiner regional.'
        keywords={[
          "comunidades bitcoin",
          "bitcoin latinoamerica",
          "bitcoin LATAM",
          "comunidad bitcoin argentina",
          "comunidad bitcoin mexico",
          "veintiuno",
        ]}
        url='/communities'
        type='website'
      />

      <div className='min-h-screen bg-white'>
        {/* Hero Section */}
        <section
          className='bg-custom-black text-custom-gray-light relative overflow-hidden'
          style={{ height: "420px" }}
        >
          {/* Ferris wheel background */}
          <div className='absolute inset-0 flex items-center justify-center z-0' aria-hidden='true'>
            <div className='wheel-container wheel-rotating'>
              {communities
                .map((c) => c.avatarImage)
                .filter((src): src is string => Boolean(src))
                .slice(0, 12)
                .map((src, index, arr) => {
                  const total = arr.length;
                  const angle = (index / total) * 360;
                  const radius = 440;
                  const size = 220;
                  const translate = `translate(${radius}px, 0)`;
                  const transform = `rotate(${angle}deg) ${translate}`;
                  return (
                    <div
                      key={src + index}
                      className='wheel-item'
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        transform,
                      }}
                    >
                      <div style={{ transform: `rotate(${-angle}deg)` }}>
                        <div className='wheel-counter'>
                          <img src={src} alt='' />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Opacity overlay above background, below content */}
          <div className='absolute inset-0 bg-custom-black bg-opacity-60 z-[1]'></div>

          <div className='container relative z-10 h-full flex items-center justify-center'>
            <div className='text-center'>
              <Reveal direction='up' distance={24}>
                <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest text-white/90 mb-8'>
                  <span className='inline-block w-1.5 h-1.5 rounded-full bg-bitcoin animate-hero-pulse' />
                  Red Bitcoin · LATAM
                </div>
              </Reveal>
              <Reveal direction='up' delay={0.1}>
                <h1 className='text-5xl md:text-7xl font-black mb-4 font-heading leading-[0.95]'>
                  <span className='text-gradient'>Comunidades Bitcoin</span>
                  <span className='block text-white'>en Latinoamérica</span>
                </h1>
              </Reveal>
              <Reveal direction='up' delay={0.2}>
                <p className='text-xl text-gray-300 mb-8 font-heading max-w-xl mx-auto'>
                  La red bitcoiner regional. Cada comunidad tiene 4 cards únicas por 4 artistas distintos.
                </p>
              </Reveal>
              <Reveal direction='up' delay={0.35}>
                <MagneticButton>
                  <a
                    href='https://github.com/veintiuno-lat/veintiuno-website/issues/new?template=add-community.yml'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='btn btn-md btn-primary'
                  >
                    Sumate como Comunidad!
                    <ExternalLink className='h-4 w-4' />
                  </a>
                </MagneticButton>
              </Reveal>
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
                    <SelectValue placeholder='Filtrar por País' />
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
                    <SelectValue placeholder='Filtrar por Ciudad' />
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
                {filteredCommunities.length} comunidad
                {filteredCommunities.length !== 1 ? "es" : ""} encontradas
              </p>
            </div>

            {/* Cruzade Communities Section */}
            {cruzadeCommunities.length > 0 && (
              <div className='mb-16 w-full max-w-8xl px-4 md:px-12 mx-auto'>
                <Reveal>
                  <h2 className='text-2xl md:text-3xl font-black text-gray-900 mb-8 text-left font-heading'>
                    En la <span className='text-gradient'>Cruzada</span>
                  </h2>
                </Reveal>
                <div className='flex justify-center'>
                  <Stagger
                    stagger={0.06}
                    className='grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  >
                    {cruzadeCommunities.map((community) => (
                      <StaggerItem key={community.id}>
                        <CommunityCard community={community} />
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>
              </div>
            )}

            {/* Other Communities Section */}
            {otherCommunities.length > 0 && (
              <div className='mb-16 w-full max-w-8xl px-4 md:px-12 mx-auto'>
                <Reveal>
                  <h2 className='text-2xl md:text-3xl font-black text-gray-900 mb-8 text-left font-heading'>
                    Próximas <span className='text-gradient'>Comunidades</span>
                  </h2>
                </Reveal>
                <div className='flex justify-center'>
                  <Stagger
                    stagger={0.05}
                    className='grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  >
                    {otherCommunities.map((community) => (
                      <StaggerItem key={community.id}>
                        <CommunityCard community={community} />
                      </StaggerItem>
                    ))}
                  </Stagger>
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
    <Link to={`/community/${community.id}`} className='block group'>
      <TiltCard maxTilt={6} lift={4}>
        <UICard className='overflow-hidden border border-[#D9D9D9] cursor-pointer transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-bitcoin/10'>
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
            <h3 className='text-lg font-semibold text-gray-900 mb-2 font-heading group-hover:text-bitcoin transition-colors duration-300'>
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
      </TiltCard>
    </Link>
  );
};

export default CommunitiesPage;
