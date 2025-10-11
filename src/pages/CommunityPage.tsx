import React from "react";
import { useParams, Link } from "react-router-dom";
import SEOHead from "../components/seo/SEOHead";
import { getCommunityById } from "../data/communities";
import { squads } from "../data/squads";
import { getCardsByCommunity } from "../data/cards";
import { meetups } from "../data/meetups";
import { Card as UICard, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SquadMap from "../components/map/SquadMap";
import {
  ChevronLeft,
  ExternalLink,
  MapPin,
  Users,
  Mail,
  Instagram,
  Youtube,
  Clock,
  Pickaxe,
} from "lucide-react";
import { Meetup } from "@/types/Meetup";

const CommunityPage: React.FC = () => {
  const { communityId } = useParams<{ communityId: string }>();

  // Find the community by ID
  const community = getCommunityById(communityId || "");

  if (!community) {
    return (
      <div className='min-h-screen bg-white flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Comunidad no encontrada
          </h1>
          <p className='text-custom-gray mb-8'>
            La comunidad que buscas no existe.
          </p>
          <Link to='/communities'>
            <Button>Back to Communities</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Find the squad that supports this community
  const supportingSquad = community.squadId
    ? squads.find((squad) => squad.id === community.squadId)
    : null;

  // Get cards for this community
  const communityCards = getCardsByCommunity(community.id);

  // Get meetups for this community (filter by organizer community)
  const communityMeetups = meetups
    .filter((meetup) => meetup.organizerCommunity?.id === community.id)
    .slice(0, 3); // Show max 3 meetups

  // MeetupCard component (same as in MeetupsPage)
  const MeetupCard: React.FC<{ meetup: Meetup }> = ({ meetup }) => {
    return (
      <Link to={`/meetup/${meetup.id}`}>
        <UICard className='overflow-hidden border-0 transition-all duration-300 hover:scale-105 cursor-pointer'>
          <div className='relative h-48'>
            <img
              src={meetup.image}
              alt={meetup.title}
              className='w-full h-full object-cover'
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent) {
                  parent.className =
                    parent.className.replace("overflow-hidden", "") +
                    " bg-gradient-to-br from-bitcoin to-yellow-500 flex items-center justify-center";
                  parent.innerHTML = `
                    <div class="text-center text-white">
                      <div class="text-white font-bold text-xs mb-1">BTC</div>
                      <div class="text-white font-bold text-xs">${
                        meetup.title.split(" ")[0]
                      }</div>
                    </div>
                  `;
                }
              }}
            />
          </div>
          <CardContent className='p-4'>
            <h3 className='text-lg font-semibold text-gray-900 mb-2 font-heading'>
              {meetup.title}
            </h3>
            <div className='flex items-center text-custom-gray text-sm mb-1'>
              <span className='mr-2'>{meetup.flag}</span>
              <span>{meetup.location}</span>
            </div>
            <div className='flex items-center text-custom-gray text-sm'>
              <Clock className='w-4 h-4 mr-1' />
              <span>{meetup.time}</span>
            </div>
          </CardContent>
        </UICard>
      </Link>
    );
  };

  return (
    <>
      <SEOHead
        title={`${community.title} - Comunidad - Veintiuno.lat`}
        description={`Conoce a ${community.title}, una comunidad Bitcoin en ${
          community.city || "ciudad"
        }, ${community.country}. ${community.description}`}
        keywords={[
          community.title,
          "comunidad bitcoin",
          "bitcoin",
          community.country.toLowerCase(),
          (community.city || "ciudad").toLowerCase(),
        ]}
        url={`/community/${community.id}`}
        type='website'
      />

      <div className='min-h-screen bg-white'>
        {/* Hero Section */}
        <section className='py-24 bg-custom-black text-white relative overflow-hidden'>
          {/* Blurred background image */}
          <div
            className='absolute inset-0'
            style={{
              backgroundImage: community.backgroundImage
                ? `url(${community.backgroundImage})`
                : `url(${community.avatarImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              filter: "blur(8px)",
              transform: "scale(1.1)",
            }}
          ></div>
          <div className='absolute inset-0 bg-custom-black bg-opacity-60'></div>
          <div
            className='mb-8 w-full max-w-8xl md:px-14 mx-auto px-6 relative z-10'
            data-aos='fade-up'
          >
            {/* Back Button */}
            <div className='mb-8'>
              <Link
                to='/communities'
                className='inline-flex items-center text-white hover:text-gray-300 transition-colors'
              >
                <ChevronLeft className='w-6 h-6 mr-2' />
                Back to Communities
              </Link>
            </div>

            <div className='flex flex-col lg:flex-row items-center gap-12'>
              {/* Community Logo */}
              <div className='relative'>
                <div
                  className='rounded-full flex items-center justify-center overflow-hidden'
                  style={{
                    width: "200px",
                    height: "200px",
                  }}
                >
                  <img
                    src={community.avatarImage}
                    alt={community.title}
                    className='w-full h-full object-cover'
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        parent.className =
                          parent.className.replace("overflow-hidden", "") +
                          " bg-gradient-to-br from-bitcoin to-yellow-500 flex items-center justify-center";
                        parent.innerHTML = `<span class="text-white font-bold text-2xl">${community.title
                          .split(" ")
                          .map((word) => word[0])
                          .join("")}</span>`;
                      }
                    }}
                  />
                </div>
              </div>

              {/* Community Info */}
              <div className='flex-1 text-center lg:text-left'>
                <h1 className='text-4xl md:text-6xl font-bold text-white mb-6 font-heading'>
                  {community.title.toUpperCase()}
                </h1>

                {/* Community Stats */}
                <div className='space-y-3 mb-8'>
                  {community.foundation && (
                    <div className='flex items-center space-x-2 text-white'>
                      <Pickaxe className='w-5 h-5' />
                      <span className='font-body'>
                        Fundado en: {community.foundation}
                      </span>
                    </div>
                  )}

                  {community.peopleCount && (
                    <div className='flex items-center space-x-2 text-white'>
                      <Users className='w-5 h-5' />
                      <span className='font-body'>
                        {community.peopleCount} bitcoiners
                      </span>
                    </div>
                  )}

                  <div className='flex items-center space-x-2 text-white'>
                    <MapPin className='w-5 h-5' />
                    <span className='font-body'>
                      {community.city || "Ciudad"}, {community.country}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='flex flex-col sm:flex-row gap-4'>
                  <Button
                    className='bg-bitcoin hover:bg-bitcoin text-white'
                    onClick={() => window.open(community.link, "_blank")}
                  >
                    Website
                    <ExternalLink className='ml-2 h-4 w-4' />
                  </Button>
                  <Button
                    className='bg-bitcoin hover:bg-bitcoin text-white'
                    onClick={() =>
                      window.open(
                        `mailto:contact@${community.id}.com`,
                        "_blank"
                      )
                    }
                  >
                    E-mail
                    <Mail className='ml-2 h-4 w-4' />
                  </Button>
                  <Button
                    className='bg-white hover:bg-gray-100 text-gray-900 border border-gray-300'
                    onClick={() =>
                      window.open(`https://x.com/${community.id}`, "_blank")
                    }
                  >
                    {community.title} X
                    <ExternalLink className='ml-2 h-4 w-4' />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section - Two Column Layout */}
        <section className='py-16 bg-white'>
          <div className='mb-8 w-full max-w-8xl md:px-14 mx-auto px-6'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
              {/* Left Column - About Community */}
              <div className='lg:col-span-2' data-aos='fade-up'>
                <h2 className='text-3xl font-bold text-gray-900 mb-8 font-heading'>
                  SOBRE ESTA COMUNIDAD
                </h2>

                <div className='space-y-6 text-lg text-gray-700 font-body leading-relaxed'>
                  <p>{community.description}</p>

                  <p>
                    Our goal is to build{" "}
                    <strong>
                      {community.title}: a movement to create a thriving Bitcoin
                      circular economy
                    </strong>{" "}
                    in {community.city || "our city"}.
                  </p>
                </div>
              </div>

              {/* Right Column - Squad and Dates */}
              <div className='space-y-8' data-aos='fade-up'>
                {/* Veintiuno Squad */}
                {supportingSquad && (
                  <div>
                    <h2 className='text-3xl font-bold text-gray-900 mb-6 font-heading'>
                      VEINTIUNO SQUAD
                    </h2>
                    <UICard className='border'>
                      <CardContent className='p-6'>
                        <div className='flex items-center space-x-4'>
                          <img
                            src={supportingSquad.profileImage}
                            alt={supportingSquad.name}
                            className='w-20 h-20'
                          />
                          <div>
                            <h3 className='font-bold text-gray-900 text-lg'>
                              {supportingSquad.name}
                            </h3>
                            <div className='flex items-center space-x-1 text-gray-600'>
                              <Users className='w-4 h-4' />
                              <span className='text-sm'>
                                {supportingSquad.soldiers} Soldiers
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </UICard>
                  </div>
                )}

                {/* Fechas */}
                <div>
                  <h2 className='text-3xl font-bold text-gray-900 mb-6 font-heading'>
                    FECHAS
                  </h2>
                  <UICard className='border border-[#D9D9D9]'>
                    <CardContent className='p-6 space-y-4'>
                      <div>
                        <span className='text-sm font-semibold text-gray-500 uppercase tracking-wide'>
                          Días
                        </span>
                        <p className='text-lg font-body'>
                          Miércoles, quincenal
                        </p>
                      </div>
                      <div>
                        <span className='text-sm font-semibold text-gray-500 uppercase tracking-wide'>
                          Hora
                        </span>
                        <p className='text-lg font-body'>10am</p>
                      </div>
                      <div>
                        <span className='text-sm font-semibold text-gray-500 uppercase tracking-wide'>
                          Localización
                        </span>
                        <p className='text-lg font-body'>
                          {community.city || "Ciudad"}, {community.country}
                        </p>
                      </div>
                      <div>
                        <span className='text-sm font-semibold text-gray-500 uppercase tracking-wide'>
                          Redes Sociales
                        </span>
                        <div className='flex space-x-4 mt-2'>
                          <ExternalLink className='w-6 h-6 text-gray-600' />
                          <Instagram className='w-6 h-6 text-gray-600' />
                          <Youtube className='w-6 h-6 text-gray-600' />
                        </div>
                      </div>
                    </CardContent>
                  </UICard>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dirección Section */}
        <section className='py-16 bg-gray-50'>
          <div
            className='mb-8 w-full max-w-8xl md:px-14 mx-auto px-6'
            data-aos='fade-up'
          >
            <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center font-heading'>
              DIRECCIÓN
            </h2>
            <div className='w-full mx-auto'>
              <SquadMap communities={[community]} zoom={5} />
            </div>
          </div>
        </section>

        {/* Tarjetas Section */}
        {communityCards.length > 0 && (
          <section className='py-16 bg-white'>
            <div
              className='mb-8 w-full max-w-8xl md:px-14 mx-auto px-6'
              data-aos='fade-up'
            >
              <div className='max-w-8xl mx-auto'>
                <h2 className='text-3xl font-bold text-gray-900 mb-8 font-heading text-center'>
                  TARJETAS
                </h2>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
                  {communityCards.slice(0, 4).map((card) => (
                    <UICard key={card.id} className='overflow-hidden shadow-lg'>
                      <CardContent className='p-0'>
                        <img
                          src={card.imageUrl}
                          alt={card.title || card.communityName}
                          className='w-full h-full object-cover'
                        />
                      </CardContent>
                    </UICard>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Próximos Eventos Section */}
        <section className='py-16 bg-gray-50'>
          <div className='px-6' data-aos='fade-up'>
            <div className='mb-12'>
              <h2 className='text-3xl font-bold text-gray-900 mb-8 font-heading text-center'>
                PRÓXIMOS EVENTOS
              </h2>
            </div>

            {communityMeetups.length > 0 ? (
              <div className='flex justify-center'>
                <div className='grid gap-6 w-full max-w-7xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                  {communityMeetups.map((meetup) => (
                    <MeetupCard key={meetup.id} meetup={meetup} />
                  ))}
                </div>
              </div>
            ) : (
              <div className='text-center py-12'>
                <p className='text-gray-500 text-lg font-body'>
                  No hay eventos próximos programados para esta comunidad.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Missing Community CTA Section */}
        <section className='py-16' style={{ backgroundColor: "#F7931A" }}>
          <div className='container px-6'>
            <div className='flex justify-center'>
              <UICard className='max-w-2xl' data-aos='fade-up'>
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

export default CommunityPage;
