import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../components/seo/SEOHead";
import { artists, getUniqueCountries } from "../data/artists";
import { Artist } from "../types/Artist";
import { Card as UICard, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CardsIcon } from "../components/icons/cards-icon";
import { ExternalLink } from "lucide-react";

// Country flag mapping
const getCountryFlag = (countryCode: string): string => {
  const flagMap: { [key: string]: string } = {
    ve: "🇻🇪", // Venezuela
    mx: "🇲🇽", // México
    ar: "🇦🇷", // Argentina
    br: "🇧🇷", // Brasil
    co: "🇨🇴", // Colombia
    cl: "🇨🇱", // Chile
    pe: "🇵🇪", // Perú
    cu: "🇨🇺", // Cuba
  };
  return flagMap[countryCode] || "🌍";
};

const ArtistsPage: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCommunity, setSelectedCommunity] = useState<string>("");

  const countries = getUniqueCountries();

  const filteredArtists = artists.filter((artist) => {
    const matchesCountry =
      !selectedCountry || artist.countryName === selectedCountry;
    const matchesCommunity =
      !selectedCommunity || artist.communities.includes(selectedCommunity);
    return matchesCountry && matchesCommunity;
  });

  const clearFilters = () => {
    setSelectedCountry("");
    setSelectedCommunity("");
  };

  return (
    <>
      <SEOHead
        title='Artists - Veintiuno.lat'
        description='Discover the talented artists creating unique Bitcoin card collections for communities across Latin America. Each artist supports multiple communities with their creative designs.'
        keywords={[
          "bitcoin artists",
          "digital art",
          "card collections",
          "latam communities",
          "designers",
        ]}
        url='/artists'
        type='website'
      />

      <div className='min-h-screen bg-white'>
        {/* Hero Section */}
        <section
          className='py-24 bg-custom-black text-custom-gray-light relative'
          style={{
            backgroundImage: "url(/images/layout-images/artists-bg.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className='absolute inset-0 bg-custom-black bg-opacity-60'></div>
          <div className='container relative z-10'>
            <div className='text-center'>
              <h1 className='text-6xl md:text-8xl font-bold text-bitcoin mb-6 font-heading'>
                ARTISTS
              </h1>
              <p className='text-xl text-gray-300 mb-8 font-heading'>
                Each Artist has its own card collection, supporting 4
                communities.
              </p>
              <Button
                asChild
                className='bg-bitcoin hover:bg-bitcoin text-white'
              >
                <a
                  href='https://tally.so/r/nGWKk2'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Sumate como Artista!
                  <ExternalLink className='ml-2 h-4 w-4' />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Artists Section */}
        <section className='py-16'>
          <div className='px-8'>
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

                {/*
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
                  */}
                {(selectedCountry || selectedCommunity) && (
                  <Button variant='outline' onClick={clearFilters}>
                    Clear Filters
                  </Button>
                )}
              </div>

              {/* Results count */}
              <p className='text-center text-custom-gray mb-8 font-body'>
                {filteredArtists.length} artist
                {filteredArtists.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {/* Artists Grid */}
            <div className='flex justify-center'>
              <div
                className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                style={{
                  width: "80vw",
                  maxWidth: "1600px",
                }}
              >
                {filteredArtists.map((artist) => (
                  <ArtistCard key={artist.id} artist={artist} />
                ))}
              </div>
            </div>

            {filteredArtists.length === 0 && (
              <div className='text-center py-12'>
                <p className='text-gray-500 text-lg'>
                  No se encontraron artistas con los filtros seleccionados.
                </p>
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
    <Link to={`/artist/${artist.id}`} className='block'>
      <UICard className='overflow-hidden border border-[#D9D9D9] hover:scale-105 transition-all duration-300 cursor-pointer'>
        <CardContent className='p-8'>
          <div className='flex flex-col items-center text-center space-y-6'>
            {/* Profile Image */}
            <div
              className='w-25 h-25 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden'
              style={{
                width: "100px",
                height: "100px",
              }}
            >
              <img
                src={artist.profileImage}
                alt={artist.username}
                className='w-full h-full object-cover'
                onError={(e) => {
                  // Fallback for missing images
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              <div
                className='w-full h-full bg-gradient-to-br from-bitcoin to-bitcoin flex items-center justify-center text-custom-gray-light font-bold text-sm'
                style={{ display: "none" }}
              >
                {artist.username.charAt(1).toUpperCase()}
              </div>
            </div>

            {/* Artist Info */}
            <div className='flex-1 min-w-0'>
              <div className='flex items-center justify-center space-x-2 mb-3'>
                <span className='text-2xl'>
                  {getCountryFlag(artist.countryName)}
                </span>
                <h3 className='text-lg font-semibold text-gray-900 truncate font-heading'>
                  {artist.username}
                </h3>
              </div>
              <div className='flex items-center justify-center space-x-2'>
                <CardsIcon
                  width={36}
                  height={36}
                  className='text-custom-gray'
                />
                <span className='text-sm text-custom-gray font-body'>
                  {artist.completedCards}/{artist.totalCards} Cards
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </UICard>
    </Link>
  );
};

export default ArtistsPage;
