/**
 * Typed schema.org JSON-LD builders. Used by SEOHead's `jsonLd` prop on detail pages.
 *
 * All builders return plain objects ready to be JSON.stringify'd. They reference the
 * existing entity types (Community, Meetup, Artist, Soldier, Card, Squad) so changes to
 * those types surface here as type errors.
 */
import type { Community } from '@/types/Community';
import type { Meetup } from '@/types/Meetup';
import type { Artist } from '@/types/Artist';
import type { Card } from '@/types/Card';
import type { Squad, Soldier } from '@/types/Squad';

const SITE_URL = 'https://veintiuno.lat';
const SITE_NAME = 'Veintiuno.lat';
const LOGO_URL = `${SITE_URL}/logo.png`;

const absUrl = (path: string) =>
  path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  alternateName: 'Veintiuno',
  url: SITE_URL,
  logo: LOGO_URL,
  description:
    'Comunidades Bitcoin en Latinoamérica — meetups, eventos, networking y la cruzada bitcoiner regional.',
  sameAs: [
    'https://twitter.com/veintiunolat',
    'https://njump.me/npub1lf9fja3zalzrxe3y60hv7eaf348a7zz6spmt6nd2s8ttmms6ms5sa73gcz',
    'https://github.com/veintiuno-lat',
  ],
});

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export const breadcrumbSchema = (items: BreadcrumbItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: item.name,
    item: absUrl(item.url),
  })),
});

/**
 * schema.org/Place + LocalBusiness for Bitcoin community detail pages.
 */
export const communityPlaceSchema = (c: Community) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/community/${c.id}`,
  name: c.title,
  description: c.description,
  url: `${SITE_URL}/community/${c.id}`,
  image: c.avatarImage ? absUrl(c.avatarImage) : undefined,
  ...(c.foundation
    ? { foundingDate: typeof c.foundation === 'number' ? String(c.foundation) : c.foundation }
    : {}),
  address: {
    '@type': 'PostalAddress',
    addressLocality: c.city,
    addressCountry: c.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: c.latitude,
    longitude: c.longitude,
  },
  sameAs: [c.link, c.linkTwitter].filter(Boolean) as string[],
});

/**
 * schema.org/Event for meetup detail pages.
 */
export const meetupEventSchema = (m: Meetup, organizerName?: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Event',
  '@id': `${SITE_URL}/meetup/${m.id}`,
  name: m.title,
  startDate: m.date,
  description: `${m.category} · ${m.type} · ${m.location}`,
  eventAttendanceMode:
    m.type.toLowerCase().includes('online') || m.type.toLowerCase().includes('virtual')
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  location: {
    '@type': 'Place',
    name: m.location,
    address: {
      '@type': 'PostalAddress',
      addressCountry: m.country,
    },
  },
  image: m.image ? absUrl(m.image) : `${SITE_URL}/og-default.jpg`,
  organizer: {
    '@type': 'Organization',
    name: organizerName ?? m.organizedBy ?? SITE_NAME,
    url: SITE_URL,
  },
});

/**
 * schema.org/Person for artist and soldier detail pages.
 */
export const personSchema = (
  p: Pick<Artist, 'id' | 'username' | 'profileImage' | 'countryName' | 'bio' | 'socialLinks'>,
  routePrefix: 'artist' | 'soldier' = 'artist',
) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/${routePrefix}/${p.id}`,
  name: p.username,
  image: absUrl(p.profileImage),
  description: p.bio,
  nationality: p.countryName,
  url: `${SITE_URL}/${routePrefix}/${p.id}`,
  sameAs: [
    p.socialLinks?.website,
    p.socialLinks?.twitter,
    p.socialLinks?.instagram,
    p.socialLinks?.nostr,
    'tiktok' in (p.socialLinks ?? {}) ? (p.socialLinks as { tiktok?: string }).tiktok : undefined,
    'github' in (p.socialLinks ?? {}) ? (p.socialLinks as { github?: string }).github : undefined,
  ].filter(Boolean) as string[],
});

export const soldierPersonSchema = (s: Soldier) =>
  personSchema(
    {
      id: s.id,
      username: s.username,
      profileImage: s.profileImage,
      countryName: s.countryName,
      bio: s.bio,
      socialLinks: s.socialLinks,
    },
    'soldier',
  );

/**
 * schema.org/VisualArtwork for card detail pages.
 */
export const cardArtworkSchema = (c: Card) => ({
  '@context': 'https://schema.org',
  '@type': 'VisualArtwork',
  '@id': `${SITE_URL}/card/${c.id}`,
  name: c.title || `${c.communityName} — ${c.number}`,
  description: c.description || `Carta digital ${c.number} de la colección ${c.communityName}.`,
  image: absUrl(c.imageUrl),
  url: `${SITE_URL}/card/${c.id}`,
  creator: {
    '@type': 'Person',
    name: c.artist,
  },
  contentLocation: {
    '@type': 'Place',
    name: c.location,
  },
  artform: 'Digital art',
  artMedium: 'Digital',
});

/**
 * schema.org/Organization for squads.
 */
export const squadOrganizationSchema = (s: Squad) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/squad/${s.id}`,
  name: s.name,
  description: s.description,
  url: `${SITE_URL}/squad/${s.id}`,
  logo: absUrl(s.profileImage),
  parentOrganization: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
  },
  numberOfEmployees: s.soldiers,
});
