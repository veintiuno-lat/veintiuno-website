import { Soldier } from '../types/Squad';

export const soldiers: Soldier[] = [
  {
    id: 'soldier-1',
    username: '@soldier',
    role: 'Soldier',
    profileImage: '/images/soldier-images/soldier-1.png',
    country: 've',
    countryName: 'Venezuela',
    squadId: 'escuadron-jaguar',
    bio: 'altafacha69 is a digital artisan who blends street culture, internet aesthetics, and futurist minimalism into bold graphic statements. Their work explores the tension between individual freedom and mass collectivism, channeling themes of Bitcoin, decentralization, and counterculture into striking visual narratives.',
    socialLinks: {
      website: 'https://altafacha69.com',
      instagram: 'https://instagram.com/altafacha69',
      twitter: 'https://twitter.com/altafacha69',
      nostr: 'https://nostr.com/altafacha69',
      github: 'https://github.com/altafacha69'
    }
  },
  {
    id: 'soldier-2',
    username: '@josea',
    role: 'Squad Leader',
    profileImage: '/images/soldier-images/soldier-2.png',
    country: 'mx',
    countryName: 'México',
    squadId: 'golden-knights',
    bio: 'José A. leads the Golden Knights with strategic vision and technical expertise in Bitcoin infrastructure. He specializes in developing robust systems for community growth and adoption.',
    socialLinks: {
      website: 'https://josea.com',
      instagram: 'https://instagram.com/josea',
      twitter: 'https://twitter.com/josea',
      nostr: 'https://nostr.com/josea',
      github: 'https://github.com/josea'
    }
  },
  {
    id: 'soldier-3',
    username: '@caior',
    role: 'Squad Leader',
    profileImage: '/images/soldier-images/soldier-3.png',
    country: 'br',
    countryName: 'Brasil',
    squadId: 'escuadron-jaguar',
    bio: 'Caio R. commands the Escuadrón Jaguar with agility and rapid deployment strategies. His expertise lies in community building and educational initiatives across Latin America.',
    socialLinks: {
      website: 'https://caior.com',
      instagram: 'https://instagram.com/caior',
      twitter: 'https://twitter.com/caior',
      nostr: 'https://nostr.com/caior',
      github: 'https://github.com/caior'
    }
  },
  {
    id: 'soldier-4',
    username: '@marial',
    role: 'Squad Leader',
    profileImage: '/images/soldier-images/soldier-4.png',
    country: 'ar',
    countryName: 'Argentina',
    squadId: 'bitcoin-brigade',
    bio: 'Maria L. leads the Bitcoin Brigade with a focus on crypto education and adoption. She brings years of experience in financial technology and community development.',
    socialLinks: {
      website: 'https://marial.com',
      instagram: 'https://instagram.com/marial',
      twitter: 'https://twitter.com/marial',
      nostr: 'https://nostr.com/marial',
      github: 'https://github.com/marial'
    }
  },
  {
    id: 'soldier-5',
    username: '@alexk',
    role: 'Squad Leader',
    profileImage: '/images/soldier-images/soldier-5.png',
    country: 'co',
    countryName: 'Colombia',
    squadId: 'digital-phoenix',
    bio: 'Alex K. heads the Digital Phoenix squad, specializing in innovation and technology. He focuses on cutting-edge solutions for Bitcoin adoption and infrastructure.',
    socialLinks: {
      website: 'https://alexk.com',
      instagram: 'https://instagram.com/alexk',
      twitter: 'https://twitter.com/alexk',
      nostr: 'https://nostr.com/alexk',
      github: 'https://github.com/alexk'
    }
  },
  {
    id: 'soldier-6',
    username: '@sofiam',
    role: 'Squad Leader',
    profileImage: '/images/soldier-images/soldier-6.png',
    country: 'pe',
    countryName: 'Perú',
    squadId: 'orange-guardians',
    bio: 'Sofia M. leads the Orange Guardians with expertise in security and defensive operations. She ensures the safety and integrity of our Bitcoin initiatives.',
    socialLinks: {
      website: 'https://sofiam.com',
      instagram: 'https://instagram.com/sofiam',
      twitter: 'https://twitter.com/sofiam',
      nostr: 'https://nostr.com/sofiam',
      github: 'https://github.com/sofiam'
    }
  },
  {
    id: 'soldier-7',
    username: '@juan',
    role: 'Soldier',
    profileImage: '/images/soldier-images/soldier-7.png',
    country: 've',
    countryName: 'Venezuela',
    squadId: 'escuadron-jaguar',
    bio: 'Juan is a dedicated soldier in the Escuadrón Jaguar, contributing to community outreach and educational programs across Venezuela.',
    socialLinks: {
      website: 'https://juan.com',
      instagram: 'https://instagram.com/juan',
      twitter: 'https://twitter.com/juan',
      nostr: 'https://nostr.com/juan',
      github: 'https://github.com/juan'
    }
  },
  {
    id: 'soldier-8',
    username: '@marcos',
    role: 'Soldier',
    profileImage: '/images/soldier-images/soldier-8.png',
    country: 'mx',
    countryName: 'México',
    squadId: 'golden-knights',
    bio: 'Marcos serves in the Golden Knights, focusing on technical implementation and community support throughout Mexico.',
    socialLinks: {
      website: 'https://marcos.com',
      instagram: 'https://instagram.com/marcos',
      twitter: 'https://twitter.com/marcos',
      nostr: 'https://nostr.com/marcos',
      github: 'https://github.com/marcos'
    }
  },
  {
    id: 'soldier-9',
    username: '@rafael',
    role: 'Soldier',
    profileImage: '/images/soldier-images/soldier-9.png',
    country: 'br',
    countryName: 'Brasil',
    squadId: 'bitcoin-brigade',
    bio: 'Rafael is a key member of the Bitcoin Brigade, working on educational initiatives and community building in Brazil.',
    socialLinks: {
      website: 'https://rafael.com',
      instagram: 'https://instagram.com/rafael',
      twitter: 'https://twitter.com/rafael',
      nostr: 'https://nostr.com/rafael',
      github: 'https://github.com/rafael'
    }
  },
  {
    id: 'soldier-10',
    username: '@miguel',
    role: 'Soldier',
    profileImage: '/images/soldier-images/soldier-10.png',
    country: 'ar',
    countryName: 'Argentina',
    squadId: 'digital-phoenix',
    bio: 'Miguel contributes to the Digital Phoenix squad with his expertise in technology and innovation, helping drive Bitcoin adoption in Argentina.',
    socialLinks: {
      website: 'https://miguel.com',
      instagram: 'https://instagram.com/miguel',
      twitter: 'https://twitter.com/miguel',
      nostr: 'https://nostr.com/miguel',
      github: 'https://github.com/miguel'
    }
  }
];

// Helper functions
export const getSoldierById = (id: string): Soldier | undefined => {
  return soldiers.find(soldier => soldier.id === id);
};

export const getSoldiersBySquad = (squadId: string): Soldier[] => {
  return soldiers.filter(soldier => soldier.squadId === squadId);
};

export const getSoldiersByCountry = (country: string): Soldier[] => {
  return soldiers.filter(soldier => soldier.country === country);
};

export const getSoldiersByRole = (role: string): Soldier[] => {
  return soldiers.filter(soldier => soldier.role.toLowerCase().includes(role.toLowerCase()));
};
