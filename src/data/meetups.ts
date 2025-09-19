export interface Meetup {
  id: number;
  title: string;
  date: string;
  location: string;
  time: string;
  country: string;
  flag: string;
  category: string;
  type: string;
  image: string;
  organizedBy?: string;
  // Additional fields for detailed meetup page
  description?: string;
  whatToExpect?: string[];
  whyAttend?: string[];
  slogan?: string;
  organizerCommunity?: {
    id: string;
    title: string;
    city: string;
    country: string;
    avatarImage?: string;
    backgroundImage?: string;
  };
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  ticketLink?: string;
  shareLink?: string;
}

export const meetups: Meetup[] = [
  {
    id: 1,
    title: "Bitcoin Event: Theme of the Event 2025",
    date: "15 de Agosto, 2025",
    location: "Big Street Name, Name of the Place, City - State",
    time: "7pm - 10pm",
    country: "México",
    flag: "🇲🇽",
    category: "Conference",
    type: "In-person",
    image: "/images/events-images/event1.png",
    organizedBy: "BTC Isla",
    description: "Join us for an exclusive Bitcoin-focused meetup where innovators, investors, and enthusiasts come together to discuss the latest trends in decentralized finance, blockchain technology, and the future of money. Whether you are a seasoned Bitcoiner or just starting your journey, this event is designed to inspire, educate, and connect.",
    whatToExpect: [
      "Keynote Talks: Insights from leading voices in Bitcoin and blockchain.",
      "Panel Discussions: Open debates on regulation, adoption, and technology.",
      "Networking: Meet like-minded Bitcoiners, entrepreneurs, and developers.",
      "Workshops: Hands-on sessions covering wallets, nodes, and privacy tools."
    ],
    whyAttend: [
      "Gain practical knowledge to strengthen your Bitcoin journey.",
      "Discover new projects and opportunities in the ecosystem.",
      "Be part of a vibrant community that shares your vision for financial freedom."
    ],
    slogan: "Bitcoin Event - Building the future, one block at a time.",
    organizerCommunity: {
      id: "isla-btc",
      title: "BTC Isla",
      city: "Isla Mujeres",
      country: "México",
      avatarImage: "/images/community-images/isla-btc.jpg",
      backgroundImage: "/images/community-images/isla-btc-bg.jpeg"
    },
    coordinates: {
      latitude: 21.2314,
      longitude: -86.7310
    },
    ticketLink: "https://example.com/tickets",
    shareLink: "https://example.com/share"
  },
  {
    id: 2,
    title: "Bitcoin Workshop: Lightning Network Masterclass",
    date: "22 de Septiembre, 2025",
    location: "Online Event - Zoom",
    time: "2pm - 5pm",
    country: "Argentina",
    flag: "🇦🇷",
    category: "Workshop",
    type: "Online",
    image: "/images/events-images/event2.png",
    organizedBy: "La Crypta",
    description: "A comprehensive workshop on the Lightning Network, covering everything from basic concepts to advanced implementation. Perfect for developers and Bitcoin enthusiasts who want to understand the second layer of Bitcoin.",
    whatToExpect: [
      "Lightning Network fundamentals and architecture",
      "Setting up your own Lightning node",
      "Payment routing and channel management",
      "Integration with existing applications"
    ],
    whyAttend: [
      "Learn from experienced Lightning Network developers",
      "Get hands-on experience with real implementations",
      "Connect with other developers in the space"
    ],
    slogan: "Lightning fast, Bitcoin secure.",
    organizerCommunity: {
      id: "la-crypta",
      title: "La Crypta",
      city: "Belgrano, CABA",
      country: "Argentina",
      avatarImage: "/images/community-images/la-crypta.jpg",
      backgroundImage: "/images/community-images/la-crypta-bg.jpeg"
    },
    coordinates: {
      latitude: -34.56475340390474,
      longitude: -58.443142884727834
    },
    ticketLink: "https://example.com/lightning-workshop",
    shareLink: "https://example.com/share-lightning"
  },
  {
    id: 3,
    title: "Bitcoin Meetup: Privacy & Security",
    date: "5 de Octubre, 2025",
    location: "Café Bitcoin, Centro de la Ciudad",
    time: "6pm - 9pm",
    country: "Colombia",
    flag: "🇨🇴",
    category: "Meetup",
    type: "In-person",
    image: "/images/events-images/event3.png",
    organizedBy: "ColombiaP2P",
    description: "An intimate meetup focused on Bitcoin privacy and security best practices. Learn how to protect your Bitcoin holdings and maintain privacy in your transactions.",
    whatToExpect: [
      "Privacy techniques and best practices",
      "Hardware wallet security",
      "Coin mixing and privacy coins discussion",
      "Q&A session with privacy experts"
    ],
    whyAttend: [
      "Understand Bitcoin privacy fundamentals",
      "Learn practical security measures",
      "Network with privacy-conscious Bitcoiners"
    ],
    slogan: "Privacy is not a crime, it's a right.",
    organizerCommunity: {
      id: "colombiap2p",
      title: "ColombiaP2P",
      city: "Bogotá",
      country: "Colombia",
      avatarImage: "/images/community-images/colombiap2p.jpg"
    },
    coordinates: {
      latitude: 4.710988340667508,
      longitude: -74.07211790578529
    },
    ticketLink: "https://example.com/privacy-meetup",
    shareLink: "https://example.com/share-privacy"
  },
  {
    id: 4,
    title: "Bitcoin Conference: LATAM Summit 2025",
    date: "12 de Noviembre, 2025",
    location: "Centro de Convenciones, Ciudad Principal",
    time: "9am - 6pm",
    country: "El Salvador",
    flag: "🇸🇻",
    category: "Conference",
    type: "Hybrid",
    image: "/images/events-images/event1.png",
    organizedBy: "Bitcoin Santa Ana",
    description: "The premier Bitcoin conference in Latin America, featuring top speakers, cutting-edge technology demonstrations, and networking opportunities. Both in-person and online attendance available.",
    whatToExpect: [
      "Keynote presentations from Bitcoin industry leaders",
      "Panel discussions on Bitcoin adoption in LATAM",
      "Technology showcases and demos",
      "Networking sessions and community building"
    ],
    whyAttend: [
      "Connect with the entire LATAM Bitcoin community",
      "Learn about the latest developments in Bitcoin",
      "Discover investment and business opportunities"
    ],
    slogan: "Uniting Latin America through Bitcoin.",
    organizerCommunity: {
      id: "bitcoin-santa-ana",
      title: "Bitcoin Santa Ana",
      city: "Santa Ana",
      country: "El Salvador",
      avatarImage: "/images/community-images/bitcoin-santa-ana.jpg",
      backgroundImage: "/images/community-images/bitcoin-santa-ana-bg.jpg"
    },
    coordinates: {
      latitude: 13.98719,
      longitude: -89.55868
    },
    ticketLink: "https://example.com/latam-summit",
    shareLink: "https://example.com/share-summit"
  },
  {
    id: 5,
    title: "Bitcoin Workshop: Node Operation",
    date: "18 de Diciembre, 2025",
    location: "Tech Hub, Zona Tecnológica",
    time: "10am - 4pm",
    country: "Costa Rica",
    flag: "🇨🇷",
    category: "Workshop",
    type: "In-person",
    image: "/images/events-images/event2.png",
    organizedBy: "21 Bitcoin Academy",
    description: "Learn how to run your own Bitcoin node and contribute to the network. This hands-on workshop covers everything from hardware requirements to advanced configuration.",
    whatToExpect: [
      "Bitcoin node fundamentals and importance",
      "Hardware setup and requirements",
      "Software installation and configuration",
      "Network monitoring and maintenance"
    ],
    whyAttend: [
      "Contribute to Bitcoin network decentralization",
      "Learn technical skills for Bitcoin infrastructure",
      "Understand the technical side of Bitcoin"
    ],
    slogan: "Be your own bank, run your own node.",
    organizerCommunity: {
      id: "21-bitcoin-academy",
      title: "21 Bitcoin Academy",
      city: "San Jose",
      country: "Costa Rica",
      avatarImage: "/images/community-images/21-bitcoin-academy.jpg",
      backgroundImage: "/images/community-images/21-bitcoin-academy-bg.jpeg"
    },
    coordinates: {
      latitude: 9.92844877486275,
      longitude: -84.09116822483671
    },
    ticketLink: "https://example.com/node-workshop",
    shareLink: "https://example.com/share-node"
  },
  {
    id: 6,
    title: "Bitcoin Meetup: Women in Bitcoin",
    date: "25 de Enero, 2026",
    location: "Online Event - Discord",
    time: "7pm - 9pm",
    country: "República Dominicana",
    flag: "🇩🇴",
    category: "Meetup",
    type: "Online",
    image: "/images/events-images/event3.png",
    organizedBy: "Satoshi somos todos",
    description: "A special meetup celebrating women in the Bitcoin space. Join us for inspiring stories, technical discussions, and community building among women Bitcoiners.",
    whatToExpect: [
      "Success stories from women in Bitcoin",
      "Technical discussions and Q&A",
      "Mentorship opportunities",
      "Community building and networking"
    ],
    whyAttend: [
      "Connect with other women in Bitcoin",
      "Find mentorship and support",
      "Learn from diverse perspectives"
    ],
    slogan: "Empowering women, one satoshi at a time.",
    organizerCommunity: {
      id: "satoshi-somos-todos",
      title: "Satoshi somos todos",
      city: "Santo Domingo",
      country: "República Dominicana",
      avatarImage: "/images/community-images/satoshi-somos-todos.jpeg",
      backgroundImage: "/images/community-images/satoshi-somos-todos-bg.jpeg"
    },
    coordinates: {
      latitude: 18.498438017905933,
      longitude: -69.79021191557062
    },
    ticketLink: "https://example.com/women-bitcoin",
    shareLink: "https://example.com/share-women"
  },
  {
    id: 7,
    title: "Bitcoin Conference: DeFi & Bitcoin",
    date: "15 de Febrero, 2026",
    location: "Hotel Convention Center, Downtown",
    time: "8am - 7pm",
    country: "Guatemala",
    flag: "🇬🇹",
    category: "Conference",
    type: "In-person",
    image: "/images/events-images/event1.png",
    organizedBy: "Lago Bitcoin",
    description: "Exploring the intersection of Bitcoin and Decentralized Finance. Learn about Bitcoin-based DeFi protocols, Layer 2 solutions, and the future of Bitcoin finance.",
    whatToExpect: [
      "Bitcoin DeFi protocol presentations",
      "Layer 2 solutions and Lightning Network",
      "Regulatory discussions and compliance",
      "Investment strategies and opportunities"
    ],
    whyAttend: [
      "Understand Bitcoin's role in DeFi",
      "Learn about emerging Bitcoin protocols",
      "Network with DeFi and Bitcoin experts"
    ],
    slogan: "Bitcoin: The foundation of decentralized finance.",
    organizerCommunity: {
      id: "lago-bitcoin",
      title: "Lago Bitcoin",
      city: "Lago Atitlán",
      country: "Guatemala",
      avatarImage: "/images/community-images/lago-bitcoin.png",
      backgroundImage: "/images/community-images/lago-bitcoin-bg.jpeg"
    },
    coordinates: {
      latitude: 14.70174520049271,
      longitude: -91.20360859723557
    },
    ticketLink: "https://example.com/bitcoin-defi",
    shareLink: "https://example.com/share-defi"
  },
  {
    id: 8,
    title: "Bitcoin Workshop: Mining Fundamentals",
    date: "8 de Marzo, 2026",
    location: "Mining Facility & Online Stream",
    time: "1pm - 5pm",
    country: "Bolivia",
    flag: "🇧🇴",
    category: "Workshop",
    type: "Hybrid",
    image: "/images/events-images/event2.png",
    organizedBy: "BtcxBolivia",
    description: "Learn the fundamentals of Bitcoin mining, from basic concepts to advanced strategies. Includes a tour of a real mining facility and hands-on demonstrations.",
    whatToExpect: [
      "Bitcoin mining fundamentals and economics",
      "Hardware requirements and setup",
      "Mining pool operations and strategies",
      "Facility tour and live demonstrations"
    ],
    whyAttend: [
      "Understand Bitcoin mining from the ground up",
      "See real mining operations in action",
      "Learn about mining economics and profitability"
    ],
    slogan: "Mining Bitcoin, securing the network.",
    organizerCommunity: {
      id: "btc-bolivia",
      title: "BtcxBolivia",
      city: "La Paz",
      country: "Bolivia",
      avatarImage: "/images/community-images/btc-bolivia.jpg"
    },
    coordinates: {
      latitude: -16.497758,
      longitude: -68.141395
    },
    ticketLink: "https://example.com/mining-workshop",
    shareLink: "https://example.com/share-mining"
  }
];

// Helper functions for filtering
export const getMeetupsByCategory = (category: string): Meetup[] => {
  return meetups.filter(meetup => meetup.category === category);
};

export const getMeetupsByType = (type: string): Meetup[] => {
  return meetups.filter(meetup => meetup.type === type);
};

export const getMeetupsByCountry = (country: string): Meetup[] => {
  return meetups.filter(meetup => meetup.country === country);
};

export const getUniqueCategories = (): string[] => {
  return [...new Set(meetups.map(meetup => meetup.category))];
};

export const getUniqueTypes = (): string[] => {
  return [...new Set(meetups.map(meetup => meetup.type))];
};

export const getUniqueCountries = (): string[] => {
  return [...new Set(meetups.map(meetup => meetup.country))];
};

export const getMeetupById = (id: number): Meetup | undefined => {
  return meetups.find(meetup => meetup.id === id);
};
