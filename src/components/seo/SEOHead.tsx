import React from 'react';
import { Helmet } from 'react-helmet-async';

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
  readTime
}) => {
  const siteTitle = 'Veintiuno.lat';
  const fullTitle = `${title} | ${siteTitle}`;
  const siteUrl = 'https://veintiuno.lat';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const defaultImage = `${siteUrl}/og-default.jpg`;
  const ogImage = image || defaultImage;

  // Combine keywords with tags
  const allKeywords = [...keywords, ...tags, 'LATAM', 'tecnología', 'comunidades tech', 'desarrollo', 'latinoamérica'];
  
  // Structured data for articles
  const structuredData = type === 'article' ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": ogImage,
    "author": {
      "@type": "Person",
      "name": author || "Veintiuno.lat"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Veintiuno.lat",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    },
    "datePublished": publishedTime,
    "dateModified": modifiedTime || publishedTime,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": fullUrl
    },
    "articleSection": category,
    "keywords": allKeywords.join(', '),
    "wordCount": readTime ? parseInt(readTime.replace(/\D/g, '')) * 200 : undefined,
    "timeRequired": readTime ? `PT${readTime.replace(/\D/g, '')}M` : undefined
  } : {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteTitle,
    "description": description,
    "url": siteUrl
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords.join(', ')} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Author and Publication Info */}
      {author && <meta name="author\" content={author} />}
      {publishedTime && <meta name="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta name="article:modified_time\" content={modifiedTime} />}
      {category && <meta name="article:section" content={category} />}
      {tags.map(tag => (
        <meta key={tag} name="article:tag" content={tag} />
      ))}

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="es_ES" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@VeintiunoLat" />
      {author && <meta name="twitter:creator\" content={`@${author.replace(/\s+/g, '').toLowerCase()}`} />}

      {/* Additional Meta Tags for Better SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="Spanish" />
      <meta name="geo.region" content="LATAM" />
      <meta name="geo.placename" content="Latinoamérica" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData, null, 2)}
      </script>

      {/* Additional Article-specific Meta Tags */}
      {type === 'article' && (
        <>
          <meta property="article:author" content={author} />
          <meta property="article:published_time" content={publishedTime} />
          {modifiedTime && <meta property="article:modified_time\" content={modifiedTime} />}
          <meta property="article:section" content={category} />
          {tags.map(tag => (
            <meta key={`og-tag-${tag}`} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://images.pexels.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  );
};

export default SEOHead;