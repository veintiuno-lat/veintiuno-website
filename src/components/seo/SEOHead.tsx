import React from 'react';
import { useHead } from '@unhead/react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  category?: string;
  tags?: string[];
  readTime?: string;
  /** When true, emit noindex,follow for crawlers (e.g. 404 page). Defaults to false. */
  noindex?: boolean;
  /** Override the default WebSite/Article JSON-LD with custom schema(s). */
  jsonLd?: object | object[];
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords = [],
  author,
  publishedTime,
  modifiedTime,
  image,
  url,
  type = 'website',
  category,
  tags = [],
  readTime,
  noindex = false,
  jsonLd,
}) => {
  const siteTitle = 'Veintiuno.lat';
  const fullTitle = `${title} | ${siteTitle}`;
  const siteUrl = 'https://veintiuno.lat';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const defaultImage = `${siteUrl}/og-default.jpg`;
  const ogImage = image
    ? image.startsWith('http') ? image : `${siteUrl}${image}`
    : defaultImage;

  const allKeywords = [
    ...keywords,
    ...tags,
    'LATAM',
    'tecnología',
    'comunidades tech',
    'desarrollo',
    'latinoamérica',
  ];

  const defaultSchema =
    type === 'article'
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: title,
          description,
          image: ogImage,
          author: {
            '@type': 'Person',
            name: author || 'Veintiuno.lat',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Veintiuno.lat',
            logo: {
              '@type': 'ImageObject',
              url: `${siteUrl}/logo.png`,
            },
          },
          datePublished: publishedTime,
          dateModified: modifiedTime || publishedTime,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': fullUrl,
          },
          articleSection: category,
          keywords: allKeywords.join(', '),
          wordCount: readTime ? parseInt(readTime.replace(/\D/g, ''), 10) * 200 : undefined,
          timeRequired: readTime ? `PT${readTime.replace(/\D/g, '')}M` : undefined,
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: title,
          description,
          url: fullUrl,
          inLanguage: 'es',
          isPartOf: {
            '@type': 'WebSite',
            name: siteTitle,
            url: siteUrl,
          },
        };

  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [defaultSchema];

  const robots = noindex
    ? 'noindex, follow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  useHead({
    title: fullTitle,
    link: [
      { rel: 'canonical', href: fullUrl },
    ],
    meta: [
      { name: 'description', content: description },
      { name: 'keywords', content: allKeywords.join(', ') },
      { name: 'robots', content: robots },
      { name: 'googlebot', content: noindex ? 'noindex, follow' : 'index, follow' },
      { name: 'language', content: 'Spanish' },
      { name: 'geo.region', content: 'LATAM' },
      { name: 'geo.placename', content: 'Latinoamérica' },
      ...(author ? [{ name: 'author', content: author }] : []),

      // Open Graph
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: type },
      { property: 'og:url', content: fullUrl },
      { property: 'og:image', content: ogImage },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: title },
      { property: 'og:site_name', content: siteTitle },
      { property: 'og:locale', content: 'es' },

      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
      { name: 'twitter:site', content: '@VeintiunoLat' },
      ...(author
        ? [{ name: 'twitter:creator', content: `@${author.replace(/\s+/g, '').toLowerCase()}` }]
        : []),

      // Article-specific
      ...(type === 'article' && publishedTime
        ? [{ property: 'article:published_time', content: publishedTime }]
        : []),
      ...(type === 'article' && modifiedTime
        ? [{ property: 'article:modified_time', content: modifiedTime }]
        : []),
      ...(type === 'article' && author
        ? [{ property: 'article:author', content: author }]
        : []),
      ...(type === 'article' && category
        ? [{ property: 'article:section', content: category }]
        : []),
      ...(type === 'article'
        ? tags.map((t) => ({ property: 'article:tag', content: t }))
        : []),
    ],
    script: schemas.map((schema) => ({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(schema),
    })),
  });

  return null;
};

export default SEOHead;
