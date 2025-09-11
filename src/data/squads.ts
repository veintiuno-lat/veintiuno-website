import { Squad, Satellite } from '../types/Squad';

export const squads: Squad[] = [
  {
    id: 'golden-knights',
    name: 'Golden Knights',
    leader: 'José A.',
    soldiers: 5,
    profileImage: '/images/squad-images/golden-knights.png',
    description: 'Elite squad specializing in strategic operations'
  },
  {
    id: 'escuadron-jaguar',
    name: 'Escuadrón Jaguar',
    leader: 'Caio R.',
    soldiers: 5,
    profileImage: '/images/squad-images/escuadron-jaguar.png',
    description: 'Agile squad focused on rapid deployment'
  },
  {
    id: 'bitcoin-brigade',
    name: 'Bitcoin Brigade',
    leader: 'Maria L.',
    soldiers: 4,
    profileImage: '/images/squad-images/bitcoin-brigade.png',
    description: 'Crypto-focused tactical unit'
  },
  {
    id: 'digital-phoenix',
    name: 'Digital Phoenix',
    leader: 'Alex K.',
    soldiers: 6,
    profileImage: '/images/squad-images/digital-phoenix.png',
    description: 'Innovation and technology specialists'
  },
  {
    id: 'orange-guardians',
    name: 'Orange Guardians',
    leader: 'Sofia M.',
    soldiers: 3,
    profileImage: '/images/squad-images/orange-guardians.png',
    description: 'Defensive operations and security'
  }
];

export const satellites: Satellite[] = [
  {
    id: 'satellite-1',
    username: '@sateliteexample',
    role: 'Dev/Designer',
    profileImage: '/images/satellite-images/satellite-1.png',
    description: 'Full-stack developer and UI/UX designer'
  },
  {
    id: 'satellite-2',
    username: '@cryptoarchitect',
    role: 'Blockchain Dev',
    profileImage: '/images/satellite-images/satellite-2.png',
    description: 'Blockchain infrastructure specialist'
  },
  {
    id: 'satellite-3',
    username: '@designcommander',
    role: 'Creative Director',
    profileImage: '/images/satellite-images/satellite-3.png',
    description: 'Visual identity and brand strategist'
  },
  {
    id: 'satellite-4',
    username: '@techscout',
    role: 'Tech Lead',
    profileImage: '/images/satellite-images/satellite-4.png',
    description: 'Technology research and implementation'
  },
  {
    id: 'satellite-5',
    username: '@communitybuilder',
    role: 'Community Manager',
    profileImage: '/images/satellite-images/satellite-5.png',
    description: 'Community engagement and growth'
  },
  {
    id: 'satellite-6',
    username: '@securityguard',
    role: 'Security Expert',
    profileImage: '/images/satellite-images/satellite-6.png',
    description: 'Cybersecurity and system protection'
  },
  {
    id: 'satellite-7',
    username: '@contentcreator',
    role: 'Content Strategist',
    profileImage: '/images/satellite-images/satellite-7.png',
    description: 'Content creation and marketing'
  },
  {
    id: 'satellite-8',
    username: '@operationspro',
    role: 'Operations Lead',
    profileImage: '/images/satellite-images/satellite-8.png',
    description: 'Project management and coordination'
  }
];

// Helper functions
export const getSquadById = (id: string): Squad | undefined => {
  return squads.find(squad => squad.id === id);
};

export const getSatelliteById = (id: string): Satellite | undefined => {
  return satellites.find(satellite => satellite.id === id);
};
