import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "../components/seo/SEOHead";
import { squads } from "../data/squads";
import { soldiers } from "../data/soldiers";
import { Card as UICard, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sword, Shield, Satellite, ExternalLink } from "lucide-react";

const ArmyPage: React.FC = () => {
  const [selectedSquad, setSelectedSquad] = useState<string>("all");
  const [selectedRole, setSelectedRole] = useState<string>("all");

  // Filter squads
  const filteredSquads =
    selectedSquad === "all"
      ? squads
      : squads.filter((squad) => squad.id === selectedSquad);

  // Filter satellites - now using soldiers data
  const filteredSatellites =
    selectedRole === "all"
      ? soldiers
      : soldiers.filter((soldier) =>
          soldier.role.toLowerCase().includes(selectedRole.toLowerCase())
        );

  const SquadCard: React.FC<{ squad: (typeof squads)[0] }> = ({ squad }) => {
    return (
      <Link to={`/squad/${squad.id}`} className='block'>
        <UICard className='overflow-hidden border border-[#D9D9D9] hover:scale-105 transition-all duration-300 cursor-pointer'>
          <CardContent className='p-8'>
            <div className='flex flex-col items-center text-center space-y-6'>
              {/* Squad Profile Image */}
              <div
                className='w-25 h-25 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-bitcoin'
                style={{
                  width: "100px",
                  height: "100px",
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
                      parent.innerHTML = `<span class="text-white font-bold text-lg">${squad.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}</span>`;
                    }
                  }}
                />
              </div>

              {/* Squad Info */}
              <div className='flex-1 min-w-0'>
                <h3 className='text-lg font-semibold text-gray-900 mb-3 font-heading'>
                  {squad.name}
                </h3>
                <div className='flex flex-col items-center space-y-2 text-sm text-custom-gray'>
                  <div className='flex items-center space-x-2'>
                    <Shield className='w-6 h-6' strokeWidth={1.5} />
                    <span className='font-body'>{squad.soldiers} Soldiers</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Sword className='w-6 h-6' strokeWidth={1.5} />
                    <span className='font-body'>{squad.leader}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </UICard>
      </Link>
    );
  };

  const SatelliteCard: React.FC<{ satellite: (typeof soldiers)[0] }> = ({
    satellite,
  }) => {
    return (
      <Link to={`/soldier/${satellite.id}`} className='block'>
        <UICard className='overflow-hidden border border-[#D9D9D9] hover:scale-105 transition-all duration-300 cursor-pointer'>
          <CardContent className='p-8'>
            <div className='flex flex-col items-center text-center space-y-6'>
              {/* Satellite Profile Image */}
              <div
                className='w-25 h-25 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-bitcoin'
                style={{
                  width: "100px",
                  height: "100px",
                }}
              >
                <img
                  src={satellite.profileImage}
                  alt={satellite.username}
                  className='w-full h-full object-cover'
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.className =
                        parent.className.replace("overflow-hidden", "") +
                        " bg-gradient-to-br from-bitcoin to-yellow-500 flex items-center justify-center";
                      parent.innerHTML = `<span class="text-white font-bold text-lg">${satellite.username
                        .charAt(1)
                        .toUpperCase()}</span>`;
                    }
                  }}
                />
              </div>

              {/* Satellite Info */}
              <div className='flex-1 min-w-0'>
                <h3 className='text-lg font-semibold text-gray-900 mb-3 font-heading'>
                  {satellite.username}
                </h3>
                <div className='flex items-center justify-center space-x-2 text-sm text-custom-gray'>
                  <Satellite className='w-7 h-7' strokeWidth={1.5} />
                  <span className='font-body'>{satellite.role}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </UICard>
      </Link>
    );
  };

  return (
    <>
      <SEOHead
        title='Army - Veintiuno'
        description='Meet our squads and satellites of the Veintiuno army'
        keywords={["army", "squads", "team", "veintiuno", "community"]}
      />

      <div className='min-h-screen bg-white'>
        {/* Hero Section */}
        <section
          className='py-24 bg-custom-black text-custom-gray-light relative'
          style={{
            backgroundImage: "url(/images/layout-images/army-bg.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className='absolute inset-0 bg-custom-black bg-opacity-60'></div>
          <div className='container relative z-10'>
            <div className='text-center'>
              <h1 className='text-6xl md:text-8xl font-bold text-bitcoin mb-6 font-heading'>
                ARMY
              </h1>
              <p className='text-xl text-gray-300 mb-8 font-heading'>
                Meet our squads and satellites of the Veintiuno army
              </p>
              <Button className='bg-bitcoin hover:bg-bitcoin text-white'>
                Join the Army
                <ExternalLink className='ml-2 h-4 w-4' />
              </Button>
            </div>
          </div>
        </section>

        {/* Squads Section */}
        <section className='py-16 bg-white'>
          <div className='px-6'>
            <div className='mb-12'>
              <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center font-heading'>
                SQUADS
              </h2>
              <p className='text-center text-custom-gray mb-8 font-body'>
                Our specialized squadrons working in different areas
              </p>

              {/* Filters */}
              <div className='flex flex-col sm:flex-row gap-4 justify-center mb-8'>
                <div className='flex items-center space-x-2'>
                  <span className='text-sm font-medium text-gray-700 font-body'>
                    Filtrar por:
                  </span>
                  <Select
                    value={selectedSquad}
                    onValueChange={setSelectedSquad}
                  >
                    <SelectTrigger className='w-48'>
                      <SelectValue placeholder='Squad' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='all'>All squads</SelectItem>
                      {squads.map((squad) => (
                        <SelectItem key={squad.id} value={squad.id}>
                          {squad.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Squads Grid */}
            <div className='flex justify-center'>
              <div
                className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                style={{
                  width: "90vw",
                  maxWidth: "1600px",
                }}
              >
                {filteredSquads.map((squad) => (
                  <SquadCard key={squad.id} squad={squad} />
                ))}
              </div>
            </div>

            {filteredSquads.length === 0 && (
              <div className='text-center py-12'>
                <p className='text-gray-500 text-lg'>
                  No se encontraron squads con los filtros seleccionados.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Satellites Section */}
        <section className='py-16 bg-gray-50'>
          <div className='px-6'>
            <div className='mb-12'>
              <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center font-heading'>
                SATELITE
              </h2>
              <p className='text-center text-custom-gray mb-8 font-body'>
                Our independent specialists supporting the mission
              </p>

              {/* Filters */}
              {/*
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700 font-body">Filter by:</span>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Comunidades" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los roles</SelectItem>
                      <SelectItem value="squad leader">Squad Leaders</SelectItem>
                      <SelectItem value="soldier">Soldiers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              */}
            </div>

            {/* Satellites Grid */}
            <div className='flex justify-center'>
              <div
                className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                style={{
                  width: "90vw",
                  maxWidth: "1600px",
                }}
              >
                {filteredSatellites.map((satellite) => (
                  <SatelliteCard key={satellite.id} satellite={satellite} />
                ))}
              </div>
            </div>

            {filteredSatellites.length === 0 && (
              <div className='text-center py-12'>
                <p className='text-gray-500 text-lg'>
                  No satellites found with the selected filters.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default ArmyPage;
