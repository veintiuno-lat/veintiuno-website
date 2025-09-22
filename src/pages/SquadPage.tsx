import React from "react";
import { useParams, Link } from "react-router-dom";
import SEOHead from "../components/seo/SEOHead";
import { getSquadById } from "../data/squads";
import { getSoldiersBySquad } from "../data/soldiers";
import { communities } from "../data/communities";
import { cards } from "../data/cards";
import { artists } from "../data/artists";
import { Community } from "../types/Community";
import { Card as UICard, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SquadMap from "../components/map/SquadMap";
import {
  Sword,
  ChevronLeft,
  Shield,
  Mail,
  ExternalLink,
  GraduationCap,
  Wrench,
  Home,
  Globe,
  Lightbulb,
} from "lucide-react";

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
  };
  return flagMap[country] || "🌍";
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
              backgroundColor: community.backgroundImage ? undefined : "#F7931A", // bitcoin color fallback
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

const SquadPage: React.FC = () => {
  const { squadId } = useParams<{ squadId: string }>();

  // Find the squad by ID
  const squad = getSquadById(squadId || "");

  if (!squad) {
    return (
      <div className='min-h-screen bg-white flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Squad no encontrado
          </h1>
          <p className='text-custom-gray mb-8'>
            El squad que buscas no existe.
          </p>
          <Link to='/army'>
            <Button>Back to Army</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get squad members from soldiers data
  const squadMembers = getSoldiersBySquad(squad.id);

  // Get assigned communities
  const getCommunitiesByIds = (communityIds: string[]) => {
    return communities.filter((community) =>
      communityIds.includes(community.id)
    );
  };

  const assignedCommunities = squad.communities
    ? getCommunitiesByIds(squad.communities)
    : [];

  // Get cards from supported communities
  const getCardsFromCommunities = (communityIds: string[]) => {
    return cards.filter((card) => communityIds.includes(card.communityId));
  };

  const communityCards = squad.communities
    ? getCardsFromCommunities(squad.communities)
    : [];

  // Get artists who have created cards for the squad's communities
  const getArtistsFromCommunities = (communityIds: string[]) => {
    const artistIds = new Set<string>();
    cards
      .filter((card) => communityIds.includes(card.communityId))
      .forEach((card) => {
        artistIds.add(card.artist);
      });
    
    return artists.filter((artist) => 
      artistIds.has(artist.username.replace('@', ''))
    );
  };

  const squadArtists = squad.communities
    ? getArtistsFromCommunities(squad.communities)
    : [];

  // Mock data for squad details - in a real app this would come from an API
  const squadDetails = {
    mission: [
      { icon: GraduationCap, text: "Education" },
      { icon: Wrench, text: "Resources & Tech" },
      { icon: Home, text: "Community Space" },
      { icon: Globe, text: "Global Connection" },
    ],
    whyBtc:
      "A Bitcoin Community Project in Isla Mujeres, Mexico. The future of money is here — and it's orange.",
    cards: [
      { id: 1, image: "/images/card-images/card1-40.png", title: "Mujeres" },
      { id: 2, image: "/images/card-images/card2-40.png", title: "Beach Life" },
      { id: 3, image: "/images/card-images/card3-40.png", title: "Abstract" },
      { id: 4, image: "/images/card-images/card1-40.png", title: "Mujeres" },
      { id: 5, image: "/images/card-images/card2-40.png", title: "Beach Life" },
      { id: 6, image: "/images/card-images/card3-40.png", title: "Abstract" },
    ],
    artists: [
      {
        name: "@altafacha69",
        cards: "5/5 Tarjetas",
        avatar: "/images/artists-images/avatar-altafacha.png",
      },
      {
        name: "@abstractlai",
        cards: "3/3 Tarjetas",
        avatar: "/images/artists-images/avatar-abstractlai.png",
      },
      {
        name: "@elsyluque54",
        cards: "2/2 Tarjetas",
        avatar: "/images/artists-images/avatar-elsyluque54.png",
      },
    ],
  };

  return (
    <>
      <SEOHead
        title={`${squad.name} - Squad - Veintiuno.lat`}
        description={`Conoce al ${squad.name}, un squad especializado con ${squad.soldiers} soldados liderados por ${squad.leader}.`}
        keywords={[
          squad.name,
          "squad",
          "ejército",
          "veintiuno",
          "bitcoin",
          "comunidad",
        ]}
        url={`/squad/${squad.id}`}
        type='website'
      />

      <div className='min-h-screen bg-white'>
        {/* Hero Section */}
        <section
          className='pt-20 pb-24 bg-custom-black text-custom-gray-light relative overflow-hidden'
          style={{
            backgroundImage: "url(/images/layout-images/squad-bg.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className='absolute inset-0 bg-custom-black bg-opacity-60'></div>
          <div className='container relative z-10 px-6' data-aos='fade-up'>
            {/* Back Button */}
            <div className='mb-4'>
              <Link
                to='/army'
                className='inline-flex items-center text-white hover:text-gray-300 transition-colors'
              >
                <ChevronLeft className='w-6 h-6 mr-2' />
                Back to Army
              </Link>
            </div>

            <div className='flex flex-col lg:flex-row items-center gap-12'>
              {/* Squad Profile Image */}
              <div className='relative'>
                <div
                  className='rounded-full flex items-center justify-center overflow-hidden'
                  style={{
                    width: "200px",
                    height: "200px",
                  }}
                >
                  <img
                    src={squad.profileImage}
                    alt={squad.name}
                    className='w-full h-full object-cover'
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        parent.className =
                          parent.className.replace("overflow-hidden", "") +
                          " bg-gradient-to-br from-bitcoin to-yellow-500 flex items-center justify-center";
                        parent.innerHTML = `<span class="text-white font-bold text-2xl">${squad.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")}</span>`;
                      }
                    }}
                  />
                </div>
              </div>

              {/* Squad Info */}
              <div className='flex-1 text-center lg:text-left'>
                <h1 className='text-4xl md:text-6xl font-bold text-custom-gray-light mb-6 font-heading'>
                  {squad.name.toUpperCase()} - SQUAD
                </h1>
                <div className='flex flex-col lg:flex-row items-center lg:items-start gap-6 mb-8'>
                  <div className='flex items-center space-x-2'>
                    <Shield className='w-6 h-6 text-custom-gray-light' />
                    <span className='text-xl text-custom-gray-light font-body'>
                      {squad.soldiers} Soldiers
                    </span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Sword className='w-6 h-6 text-custom-gray-light' />
                    <span className='text-xl text-custom-gray-light font-body'>
                      Squad Leader: {squad.leader}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='flex flex-col sm:flex-row gap-4'>
                  <Button className='bg-blue-600 hover:bg-blue-700 text-white'>
                    Discord
                    <ExternalLink className='ml-2 h-4 w-4' />
                  </Button>
                  <Button className='bg-bitcoin hover:bg-bitcoin text-white'>
                    Squad Leader E-mail
                    <Mail className='ml-2 h-4 w-4' />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Squad Section */}
        <section className='py-16 bg-white'>
          <div className='container px-6'>
            <div className='flex flex-col lg:flex-row gap-12'>
              {/* About Content */}
              <div className='flex-1' data-aos='fade-up'>
                <h2 className='text-3xl font-bold text-gray-900 mb-6 font-heading'>
                  SOBRE ESTE SQUAD
                </h2>
                <p className='text-lg text-gray-700 mb-8 font-body leading-relaxed'>
                  {squadDetails.whyBtc}
                </p>

                <div className='mb-8'>
                  <h3 className='text-xl font-semibold text-gray-900 mb-4 font-heading'>
                    Our Mission
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {squadDetails.mission.map((item, index) => (
                      <div key={index} className='flex items-center space-x-3'>
                        <item.icon className='w-5 h-5 text-bitcoin' />
                        <span className='text-gray-700 font-body'>
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className='text-xl font-semibold text-gray-900 mb-4 font-heading'>
                    Why BTC Isla?
                  </h3>
                  <p className='text-gray-700 font-body leading-relaxed'>
                    The future of money is here — and it's orange.
                  </p>
                  <div className='flex items-center mt-2'>
                    <Lightbulb className='w-5 h-5 text-bitcoin mr-2' />
                    <span className='text-sm text-gray-600 font-body'>
                      Innovation in action
                    </span>
                  </div>
                </div>
              </div>

              {/* Squad Members */}
              <div className='lg:w-80' data-aos='fade-up'>
                <h3 className='text-xl font-semibold text-gray-900 mb-6 font-heading'>
                  SQUAD MEMBERS
                </h3>
                <div className='space-y-4'>
                  {squadMembers.map((member) => (
                    <Link key={member.id} to={`/soldier/${member.id}`}>
                      <UICard className='border border-[#D9D9D9] hover:scale-105 transition-all duration-300 cursor-pointer mb-4'>
                        <CardContent className='p-4'>
                          <div className='flex items-center space-x-3'>
                            <div className='w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden'>
                              <img
                                src={member.profileImage}
                                alt={member.username}
                                className='w-full h-full object-cover'
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = "none";
                                  const parent = target.parentElement;
                                  if (parent) {
                                    parent.className =
                                      parent.className.replace(
                                        "overflow-hidden",
                                        ""
                                      ) +
                                      " bg-gradient-to-br from-bitcoin to-yellow-500 flex items-center justify-center";
                                    parent.innerHTML = `<span class="text-white font-bold text-sm">${member.username
                                      .charAt(1)
                                      .toUpperCase()}</span>`;
                                  }
                                }}
                              />
                            </div>
                            <div className='flex-1'>
                              <h4 className='font-semibold text-gray-900 font-heading'>
                                {member.username}
                              </h4>
                              <div className='flex items-center space-x-1 text-sm text-custom-gray'>
                                {member.role === "Squad Leader" ? (
                                  <Sword className='w-4 h-4' />
                                ) : (
                                  <Shield className='w-4 h-4' />
                                )}
                                <span className='font-body'>{member.role}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </UICard>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Supported Communities Section */}
        <section className='py-16 bg-gray-50'>
          <div className='container px-6' data-aos='fade-up'>
            <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center font-heading'>
              COMUNIDADES APOYADAS
            </h2>
            <div className='flex justify-center'>
              <div
                className='grid gap-8 w-[80vw] grid-cols-1 sm:grid-cols-2'
                style={{
                  justifyContent: "space-between",
                }}
              >
                {assignedCommunities.map((community) => (
                  <CommunityCard key={community.id} community={community} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Communities Map Section */}
        {assignedCommunities.length > 0 && (
          <section className='py-16 bg-white'>
            <div className='container px-6' data-aos='fade-up'>
              <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center font-heading'>
                UBICACIÓN DE LAS COMUNIDADES
              </h2>
              <div className='w-full max-w-4xl mx-auto'>
                <SquadMap communities={assignedCommunities} zoom={3} />
              </div>
            </div>
          </section>
        )}

        {/* Cards Section */}
        <section className='py-16 bg-white'>
          <div className='container px-6' data-aos='fade-up'>
            <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center font-heading'>
              TARJETAS
            </h2>
            {communityCards.length > 0 ? (
              <div className='flex justify-center'>
                <div
                  className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  style={{
                    width: "80vw",
                    maxWidth: "1600px",
                  }}
                >
                  {communityCards.map((card) => (
                    <Link key={card.id} to={`/card/${card.id}`}>
                      <UICard className='overflow-hidden border border-[#D9D9D9] hover:scale-105 transition-all duration-300 cursor-pointer'>
                        <CardContent className='p-0'>
                          <div className='relative overflow-hidden aspect-[369/232]'>
                            <img
                              src={card.imageUrl}
                              alt={card.title || `${card.communityName} - ${card.number}`}
                              className='w-full h-full object-cover'
                            />
                          </div>
                        </CardContent>
                      </UICard>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className='text-center py-12'>
                <p className='text-gray-500 text-lg font-body'>
                  No hay tarjetas disponibles para las comunidades de este squad.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Artists Section */}
        <section className='py-16 bg-gray-50'>
          <div className='container px-6' data-aos='fade-up'>
            <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center font-heading'>
              ARTISTAS
            </h2>
            {squadArtists.length > 0 ? (
              <div className='flex justify-center'>
                <div
                  className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  style={{
                    width: "80vw",
                    maxWidth: "1600px",
                  }}
                >
                  {squadArtists.map((artist) => (
                    <Link key={artist.id} to={`/artist/${artist.id}`}>
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
                                <Shield className='w-4 h-4 text-custom-gray' />
                                <span className='text-sm text-custom-gray font-body'>
                                  {artist.completedCards}/{artist.totalCards} Cards
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </UICard>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className='text-center py-12'>
                <p className='text-gray-500 text-lg font-body'>
                  No hay artistas disponibles para las comunidades de este squad.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className='py-16' style={{ backgroundColor: "#F7931A" }}>
          <div className='container px-6' data-aos='fade-up'>
            <div className='flex justify-center'>
              <UICard className='max-w-2xl'>
                <CardContent className='p-8 text-center'>
                  <h2 className='text-2xl font-bold text-gray-900 mb-4 font-heading'>
                    ¿FALTA TU COMUNIDAD?
                  </h2>
                  <p className='text-gray-700 mb-6 font-body'>
                    Si conoces una comunidad Bitcoin ONLY que debería estar
                    aquí, compártela con nosotros.
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
                      Agregá la Comunidad!
                      <ExternalLink className='ml-2 h-4 w-4' />
                    </a>
                  </Button>
                </CardContent>
              </UICard>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SquadPage;
