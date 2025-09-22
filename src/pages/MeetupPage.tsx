import React from "react";
import { useParams, Link } from "react-router-dom";
import SEOHead from "../components/seo/SEOHead";
import { getMeetupById } from "../data/meetups";
import { Community } from "../types/Community";
import { Card as UICard, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MeetupMap from "../components/map/MeetupMap";
import { ChevronLeft, Calendar, MapPin, Clock, ExternalLink, Lightbulb, Share2, CheckCircle } from "lucide-react";

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
    "Perú": "🇵🇪",
    "Italy": "🇮🇹",
  };
  return flagMap[country] || "🌍";
};

interface CommunityCardProps {
  community: Community;
}

const CommunityCard: React.FC<CommunityCardProps> = ({ community }) => {
  return (
    <UICard className="overflow-hidden border border-[#D9D9D9] hover:scale-105 transition-all duration-300">
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
  );
};

const MeetupPage: React.FC = () => {
  const { meetupId } = useParams<{ meetupId: string }>();
  
  // Find the meetup by ID
  const meetup = getMeetupById(parseInt(meetupId || '0'));
  
  if (!meetup) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Meetup no encontrado</h1>
          <p className="text-custom-gray mb-8">El meetup que buscas no existe.</p>
          <Link to="/meetups">
            <Button>Back to Meetups</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Use real meetup data - in a real app this would come from an API
  const meetupDetails = {
    description: meetup.description || "Join us for an exclusive Bitcoin-focused meetup where innovators, investors, and enthusiasts come together to discuss the latest trends in decentralized finance, blockchain technology, and the future of money. Whether you are a seasoned Bitcoiner or just starting your journey, this event is designed to inspire, educate, and connect.",
    whatToExpect: meetup.whatToExpect || [
      "Keynote Talks: Insights from leading voices in Bitcoin and blockchain.",
      "Panel Discussions: Open debates on regulation, adoption, and technology.",
      "Networking: Meet like-minded Bitcoiners, entrepreneurs, and developers.",
      "Workshops: Hands-on sessions covering wallets, nodes, and privacy tools."
    ],
    whyAttend: meetup.whyAttend || [
      "Gain practical knowledge to strengthen your Bitcoin journey.",
      "Discover new projects and opportunities in the ecosystem.",
      "Be part of a vibrant community that shares your vision for financial freedom."
    ],
    slogan: meetup.slogan || "Bitcoin Event - Building the future, one block at a time.",
    organizerCommunity: meetup.organizerCommunity || {
      id: "default-community",
      title: meetup.organizedBy || "Organizador",
      city: "Ciudad",
      country: meetup.country,
      avatarImage: "/images/community-images/default-community.jpg",
      backgroundImage: "/images/community-images/default-community-bg.jpg"
    }
  };

  // Create a community object for the map
  const mapCommunity: Community = {
    id: meetupDetails.organizerCommunity.id,
    title: meetupDetails.organizerCommunity.title,
    description: "Bitcoin community organizing this event",
    link: "#",
    latitude: meetup.coordinates?.latitude || 0,
    longitude: meetup.coordinates?.longitude || 0,
    country: meetupDetails.organizerCommunity.country,
    city: meetupDetails.organizerCommunity.city,
    avatarImage: meetupDetails.organizerCommunity.avatarImage,
    backgroundImage: meetupDetails.organizerCommunity.backgroundImage
  };

  return (
    <>
      <SEOHead
        title={`${meetup.title} - Meetup - Veintiuno.lat`}
        description={`Únete a ${meetup.title}, un evento ${meetup.category.toLowerCase()} ${meetup.type.toLowerCase()} el ${meetup.date} en ${meetup.location}.`}
        keywords={[meetup.title, "meetup", "bitcoin", "evento", "veintiuno", meetup.category, meetup.type]}
        url={`/meetup/${meetup.id}`}
        type="website"
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section 
          className="pt-20 pb-24 bg-custom-black text-custom-gray-light relative overflow-hidden"
        >
          {/* Blurred background image */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${meetup.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter: 'blur(10px)',
              transform: 'scale(1.1)'
            }}
          ></div>
          <div className="absolute inset-0 bg-custom-black bg-opacity-70"></div>
          <div className="container relative z-10 px-6">
            {/* Back Button */}
            <div className="mb-4">
              <Link to="/meetups" className="inline-flex items-center text-white hover:text-gray-300 transition-colors">
                <ChevronLeft className="w-6 h-6 mr-2" />
                Volver a Meetups
              </Link>
            </div>
            
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Event Image */}
              <div className="relative">
                <div 
                  className="rounded-lg flex items-center justify-center overflow-hidden"
                  style={{ 
                    width: '300px',
                    height: '200px'
                  }}
                >
                  <img
                    src={meetup.image}
                    alt={meetup.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.className = parent.className.replace('overflow-hidden', '') + ' bg-gradient-to-br from-bitcoin to-yellow-500 flex items-center justify-center';
                        parent.innerHTML = `<span class="text-white font-bold text-2xl">${meetup.title.split(' ').map(word => word[0]).join('')}</span>`;
                      }
                    }}
                  />
                </div>
              </div>

              {/* Event Info */}
              <div className="flex-1 text-center lg:text-left">
                
                
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 font-heading">
                <span className="text-3xl mr-2">{meetup.flag}</span>{meetup.title.toUpperCase()}
                </h1>
                
                <div className="flex flex-col lg:flex-row lg:items-center lg:items-start gap-6 mb-2">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-6 h-6 text-white" />
                    <span className="text-lg text-white font-body">
                      {meetup.date}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-6 h-6 text-white" />
                    <span className="text-lg text-white font-body">
                      {meetup.time}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row items-center lg:items-start mb-8">
                  <div className="flex items-center space-x-">
                    <MapPin className="md:w-6 md:h-6 w-10 h-10 text-white" />
                    <span className="text-lg text-white font-body text-left">
                      {meetup.location}
                    </span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="bg-bitcoin hover:bg-bitcoin text-white"
                    onClick={() => window.open(meetup.ticketLink || '#', '_blank')}
                  >
                    Consigue el billete
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-white text-orange-500 hover:bg-white hover:text-gray-900"
                    onClick={() => window.open(meetup.shareLink || '#', '_blank')}
                  >
                    Compartir
                    <Share2 className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Event Section */}
        <section className="py-16 bg-white">
          <div className="container px-6">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* About Content */}
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 font-heading">
                  ACERCA DEL EVENTO
                </h2>
                <p className="text-lg text-gray-700 mb-8 font-body leading-relaxed">
                  {meetupDetails.description}
                </p>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 font-heading flex items-center">
                    What to Expect
                  </h3>
                  <div className="space-y-3">
                    {meetupDetails.whatToExpect.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-bitcoin rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 font-body">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 font-heading flex items-center">
                    Why Attend?
                  </h3>
                  <div className="space-y-3">
                    {meetupDetails.whyAttend.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-bitcoin rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 font-body">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button variant="outline" className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Add this meetup to your calendar
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share it with your network
                  </Button>
                </div>

                <div className="flex items-center mb-6">
                  <Lightbulb className="w-5 h-5 text-bitcoin mr-2" />
                  <span className="text-gray-700 font-body italic">{meetupDetails.slogan}</span>
                </div>

                <Button 
                  className="bg-bitcoin hover:bg-bitcoin text-white"
                  onClick={() => window.open(meetup.ticketLink || '#', '_blank')}
                >
                  Consigue el billete
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Event Details Sidebar */}
              <div className="lg:w-80">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 font-heading">
                  DETALLES DEL EVENTO
                </h3>
                <UICard className="border border-[#D9D9D9]">
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Comunidad</span>
                      <p className="text-lg font-body">{meetup.organizedBy || "Organizador"}</p>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Fecha</span>
                      <p className="text-lg font-body">{meetup.date}</p>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Hora</span>
                      <p className="text-lg font-body">{meetup.time}</p>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Localización</span>
                      <p className="text-lg font-body">{meetup.location}</p>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Categorías</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full font-body">
                          {meetup.type}
                        </span>
                        <span className="px-3 py-1 bg-teal-100 text-teal-800 text-sm rounded-full font-body">
                          {meetup.category}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </UICard>
              </div>
            </div>
          </div>
        </section>

        {/* Organizers and Location Section */}
        <section className="py-16 bg-gray-50">
          <div className="container px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Organizers Section */}
              <div className="lg:col-span-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 font-heading">
                  ORGANIZADORES
                </h2>
                <div className="max-w-sm">
                  <CommunityCard community={mapCommunity} />
                </div>
              </div>

              {/* Location Map Section */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 font-heading">
                  DIRECCIÓN
                </h2>
                <div className="w-full" style={{ height: '256px' }}>
                  <MeetupMap communities={[mapCommunity]} zoom={3} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16" style={{ backgroundColor: "#F7931A" }}>
          <div className="container px-6">
            <div className="flex justify-center">
              <UICard className="max-w-2xl">
                <CardContent className="p-8 text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                    ¿FALTA TU EVENTO?
                  </h2>
                  <p className="text-gray-700 mb-6 font-body">
                    Si conoces un evento Bitcoin que debería estar aquí, compártelo con nosotros.
                  </p>
                  <Button className="bg-bitcoin hover:bg-bitcoin text-white">
                    Agregar Evento
                    <ExternalLink className="ml-2 h-4 w-4" />
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

export default MeetupPage;
