import React from "react";
import { useParams, Link } from "react-router-dom";
import SEOHead from "../components/seo/SEOHead";
import { getSoldierById } from "../data/soldiers";
import { getSquadById } from "../data/squads";
import { getCommunitiesByIds } from "../data/communities";
import { Card as UICard, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Shield, Sword, ExternalLink, Instagram, Github } from "lucide-react";
import { NostrIcon } from "../components/icons/nostr";
import { X as XIcon } from "../components/icons/x";

// Country flag mapping
const getCountryFlag = (countryName: string): string => {
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
    "Perú": "🇵🇪",
    "Italy": "🇮🇹",
    "México": "🇲🇽",
    "Venezuela": "🇻🇪",
    "Chile": "🇨🇱",
    "Uruguay": "🇺🇾",
    "Nicaragua": "🇳🇮",
    "Panamá": "🇵🇦",
    "Brasil": "🇧🇷",
    "United States of America": "🇺🇸",
  };
  return flagMap[countryName] || "🌍";
};

// CommunityCard component (same as in CommunitiesPage)
interface CommunityCardProps {
  community: any;
}

const CommunityCard: React.FC<CommunityCardProps> = ({ community }) => {
  return (
    <Link to={`/community/${community.id}`}>
      <UICard className="overflow-hidden border border-[#D9D9D9] hover:scale-105 transition-all duration-300 cursor-pointer">
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
    </Link>
  );
};

const SoldierPage: React.FC = () => {
  const { soldierId } = useParams<{ soldierId: string }>();
  
  // Find the soldier by ID
  const soldier = getSoldierById(soldierId || '');
  
  if (!soldier) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Soldado no encontrado</h1>
          <p className="text-custom-gray mb-8">El soldado que buscas no existe.</p>
          <Link to="/army">
            <Button>Back to Army</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get the soldier's squad
  const squad = getSquadById(soldier.squadId);

  // Get real communities supported by this soldier's squad
  const supportedCommunities = squad?.communities ? getCommunitiesByIds(squad.communities) : [];

  return (
    <>
      <SEOHead
        title={`${soldier.username} - Soldado - Veintiuno.lat`}
        description={`Conoce a ${soldier.username}, un soldado del ejército Veintiuno especializado en ${soldier.role}.`}
        keywords={[soldier.username, "soldado", "ejército", "veintiuno", "bitcoin", "comunidad"]}
        url={`/soldier/${soldier.id}`}
        type="website"
      />

      <div className="min-h-screen bg-white">
        {/* Back Button */}
        <div className=" mt-8 w-full max-w-8xl px-4 md:px-14 mx-auto">
          <Link
            to="/army"
            className="inline-flex items-center text-custom-gray hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
            <span className="text-3xl md:text-3xl font-bold text-gray-900 font-heading">
              SOLDIER
            </span>
          </Link>
        </div>

        {/* Main Content Section */}
        <section className="py-8 bg-white">
          <div className="mb-8 w-full max-w-8xl px-4 md:px-14 mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Soldier Profile Card */}
              <div className="lg:w-80">
                <UICard className="border border-[#D9D9D9]">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-6">
                      {/* Profile Image with Flag */}
                      <div className="relative">
                        <div 
                          className="rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-bitcoin"
                          style={{ 
                            width: '120px',
                            height: '120px'
                          }}
                        >
                          <img
                            src={soldier.profileImage}
                            alt={soldier.username}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.className = parent.className.replace('overflow-hidden', '') + ' bg-gradient-to-br from-bitcoin to-yellow-500 flex items-center justify-center';
                                parent.innerHTML = `<span class="text-white font-bold text-lg">${soldier.username.charAt(1).toUpperCase()}</span>`;
                              }
                            }}
                          />
                        </div>
                        {/* Flag - positioned at top-right of avatar */}
                        <div className="absolute -top-1 -right-1">
                          <span className="text-2xl">{getCountryFlag(soldier.countryName)}</span>
                        </div>
                      </div>

                      {/* Soldier Info */}
                      <div>
                        <h1 className="text-xl font-semibold text-gray-900 mb-2 font-heading">
                          {soldier.username}
                        </h1>
                        <p className="text-custom-gray font-body mb-6">
                          {soldier.role}
                        </p>
                      </div>

                      {/* Social Links - icon only circular buttons */}
                      <div className="flex items-center justify-center gap-3 w-full">
                        {soldier.socialLinks?.website && (
                          <a
                            href={soldier.socialLinks.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Website"
                            aria-label="Website"
                            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-black flex items-center justify-center transition-colors border border-gray-200"
                          >
                            <ExternalLink className="h-5 w-5" />
                          </a>
                        )}
                        {soldier.socialLinks?.instagram && (
                          <a
                            href={soldier.socialLinks.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Instagram"
                            aria-label="Instagram"
                            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-black flex items-center justify-center transition-colors border border-gray-200"
                          >
                            <Instagram className="h-5 w-5" />
                          </a>
                        )}
                        {soldier.socialLinks?.twitter && (
                          <a
                            href={soldier.socialLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Twitter X"
                            aria-label="Twitter X"
                            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-black flex items-center justify-center transition-colors border border-gray-200"
                          >
                            <XIcon className="h-5 w-5" />
                          </a>
                        )}
                        {soldier.socialLinks?.nostr && (
                          <a
                            href={soldier.socialLinks.nostr}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Nostr"
                            aria-label="Nostr"
                            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-black flex items-center justify-center transition-colors border border-gray-200"
                          >
                            <NostrIcon className="h-5 w-5" />
                          </a>
                        )}
                        {soldier.socialLinks?.github && (
                          <a
                            href={soldier.socialLinks.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Github"
                            aria-label="Github"
                            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-black flex items-center justify-center transition-colors border border-gray-200"
                          >
                            <Github className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </UICard>
              </div>

              {/* Soldier Bio Card */}
              <div className="flex-1">
                <UICard className="border border-[#D9D9D9] h-full">
                  <CardContent className="p-6 h-full">
                    <p className="text-gray-700 text-base leading-relaxed font-body">
                      {soldier.bio || `${soldier.username} es un soldado especializado en el ejército Veintiuno, contribuyendo con su experiencia y dedicación a la misión de promover Bitcoin en América Latina.`}
                    </p>
                  </CardContent>
                </UICard>
              </div>

              {/* Squad Card */}
              <div className="lg:w-80">
                <UICard className="h-full border border-[#D9D9D9]">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      {/* Squad Avatar */}
                      <div 
                        className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-bitcoin"
                      >
                        <img
                          src={squad?.profileImage || '/images/placeholder-squad.png'}
                          alt={squad?.name || 'Squad'}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.className = parent.className.replace('overflow-hidden', '') + ' bg-gradient-to-br from-bitcoin to-yellow-500 flex items-center justify-center';
                              parent.innerHTML = `<span class="text-white font-bold text-sm">${squad?.name?.split(' ').map(word => word[0]).join('') || 'SQ'}</span>`;
                            }
                          }}
                        />
                      </div>

                      {/* Squad Info */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 font-heading">
                          {squad?.name || 'Squad'}
                        </h3>
                        <div className="space-y-2 text-sm text-custom-gray">
                          <div className="flex items-center justify-center space-x-2">
                            <Shield className="w-4 h-4" />
                            <span className="font-body">{squad?.soldiers || 0} Soldiers</span>
                          </div>
                          <div className="flex items-center justify-center space-x-2">
                            <Sword className="w-4 h-4" />
                            <span className="font-body">{squad?.leader || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </UICard>
              </div>
            </div>
          </div>
        </section>

        {/* Supported Communities Section */}
        <section className="py-16 mb-8 w-full max-w-8xl px-4 md:px-14 mx-auto">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center font-heading">
              COMUNIDADES APOYADAS
            </h2>
            {supportedCommunities.length > 0 ? (
              <div className="flex justify-center">
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" style={{ 
                  width: '80vw',
                  maxWidth: '1600px'
                }}>
                  {supportedCommunities.map((community) => (
                    <CommunityCard key={community.id} community={community} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg font-body">Este soldado no tiene comunidades asignadas actualmente.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default SoldierPage;