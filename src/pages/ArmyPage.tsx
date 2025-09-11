import React, { useState } from 'react';
import SEOHead from '../components/seo/SEOHead';
import { squads, satellites } from '../data/squads';
import { Card as UICard, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Shield, Wrench } from 'lucide-react';

const ArmyPage: React.FC = () => {
  const [selectedSquad, setSelectedSquad] = useState<string>('all');
  const [selectedRole, setSelectedRole] = useState<string>('all');

  // Filter squads
  const filteredSquads = selectedSquad === 'all' 
    ? squads 
    : squads.filter(squad => squad.id === selectedSquad);

  // Filter satellites
  const filteredSatellites = selectedRole === 'all' 
    ? satellites 
    : satellites.filter(satellite => satellite.role.toLowerCase().includes(selectedRole.toLowerCase()));

  const SquadCard: React.FC<{ squad: typeof squads[0] }> = ({ squad }) => {
    return (
      <UICard className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            {/* Squad Profile Image */}
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-orange-400">
              <img
                src={squad.profileImage}
                alt={squad.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.className = parent.className.replace('overflow-hidden', '') + ' bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center';
                    parent.innerHTML = `<span class="text-white font-bold text-lg">${squad.name.split(' ').map(word => word[0]).join('')}</span>`;
                  }
                }}
              />
            </div>

            {/* Squad Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 font-heading">
                {squad.name}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4" />
                  <span className="font-body">{squad.soldiers} Soldiers</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span className="font-body">{squad.leader}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </UICard>
    );
  };

  const SatelliteCard: React.FC<{ satellite: typeof satellites[0] }> = ({ satellite }) => {
    return (
      <UICard className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            {/* Satellite Profile Image */}
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-orange-400">
              <img
                src={satellite.profileImage}
                alt={satellite.username}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.className = parent.className.replace('overflow-hidden', '') + ' bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center';
                    parent.innerHTML = `<span class="text-white font-bold text-lg">${satellite.username.charAt(1).toUpperCase()}</span>`;
                  }
                }}
              />
            </div>

            {/* Satellite Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 font-heading">
                {satellite.username}
              </h3>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Wrench className="w-4 h-4" />
                <span className="font-body">{satellite.role}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </UICard>
    );
  };

  return (
    <>
      <SEOHead
        title="Ejército - Veintiuno"
        description="Conoce nuestros squads y satélites del ejército Veintiuno"
        keywords={["ejército", "squads", "satélites", "veintiuno", "comunidad"]}
      />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section 
          className="py-20 relative"
          style={{
            backgroundImage: 'url(/images/layout-images/army-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          
          <div className="container relative z-10">
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 font-heading">
                EJÉRCITO
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-body">
                Each Artist has its own card collection, supporting 4 communities.
              </p>
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg font-semibold"
              >
                Ser un artista veintiuno
              </Button>
            </div>
          </div>
        </section>

        {/* Squads Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center font-heading">
                SQUADS
              </h2>
              <p className="text-center text-gray-600 mb-8 font-body">
                Nuestros escuadrones especializados trabajando en diferentes áreas
              </p>
              
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700 font-body">Filter by:</span>
                  <Select value={selectedSquad} onValueChange={setSelectedSquad}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Escuadrón" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los escuadrones</SelectItem>
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
            <div className="flex justify-center">
              <div className="grid gap-8" style={{ 
                width: '90vw',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                justifyContent: 'center'
              }}>
                {filteredSquads.map((squad) => (
                  <SquadCard key={squad.id} squad={squad} />
                ))}
              </div>
            </div>

            {filteredSquads.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No se encontraron squads con los filtros seleccionados.</p>
              </div>
            )}
          </div>
        </section>

        {/* Satellites Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center font-heading">
                SATELITE
              </h2>
              <p className="text-center text-gray-600 mb-8 font-body">
                Nuestros especialistas independientes que apoyan la misión
              </p>
              
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700 font-body">Filter by:</span>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Comunidades" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los roles</SelectItem>
                      <SelectItem value="dev">Desarrolladores</SelectItem>
                      <SelectItem value="design">Diseñadores</SelectItem>
                      <SelectItem value="community">Comunidad</SelectItem>
                      <SelectItem value="security">Seguridad</SelectItem>
                      <SelectItem value="content">Contenido</SelectItem>
                      <SelectItem value="operations">Operaciones</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Satellites Grid */}
            <div className="flex justify-center">
              <div className="grid gap-8" style={{ 
                width: '90vw',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                justifyContent: 'center'
              }}>
                {filteredSatellites.map((satellite) => (
                  <SatelliteCard key={satellite.id} satellite={satellite} />
                ))}
              </div>
            </div>

            {filteredSatellites.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No se encontraron satélites con los filtros seleccionados.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default ArmyPage;
