import React, { lazy, Suspense, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Calendar, Clock } from "lucide-react";

import SEOHead from "../components/seo/SEOHead";
import Breadcrumbs from "../components/Breadcrumbs";
import { mdxComponents } from "../components/mdx/MDXComponents";
import { Reveal } from "../components/motion";
import { breadcrumbSchema } from "@/lib/schema";

/**
 * Glob the MDX guides at build time. Each module is dynamically imported so
 * each guide ships as its own chunk. Vite + @mdx-js/rollup compile every
 * .mdx file to a React component whose default export is the rendered body
 * and whose named export `frontmatter` is the YAML metadata.
 */
const guideModules = import.meta.glob("../content/guides/*.mdx");

interface GuideFrontmatter {
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  author: string;
  category?: string;
  readTime?: string;
}

type GuideModule = {
  default: React.ComponentType<{ components?: typeof mdxComponents }>;
  frontmatter: GuideFrontmatter;
};

const GuidePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const importer = useMemo(() => {
    if (!slug) return undefined;
    const key = `../content/guides/${slug}.mdx`;
    return guideModules[key];
  }, [slug]);

  if (!importer || !slug) {
    return (
      <div className='min-h-[60vh] flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold mb-4'>Guía no encontrada</h1>
          <Link to='/guias' className='text-bitcoin underline'>
            Ver todas las guías
          </Link>
        </div>
      </div>
    );
  }

  const LazyGuide = lazy(() => importer() as Promise<GuideModule>);

  return (
    <Suspense fallback={null}>
      <GuideRenderer slug={slug} importer={importer} LazyGuide={LazyGuide} />
    </Suspense>
  );
};

interface GuideRendererProps {
  slug: string;
  importer: () => Promise<unknown>;
  LazyGuide: React.LazyExoticComponent<GuideModule["default"]>;
}

const GuideRenderer: React.FC<GuideRendererProps> = ({ slug, importer, LazyGuide }) => {
  const [frontmatter, setFrontmatter] = React.useState<GuideFrontmatter | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    importer().then((mod) => {
      if (cancelled) return;
      const fm = (mod as GuideModule).frontmatter;
      if (fm) setFrontmatter(fm);
    });
    return () => {
      cancelled = true;
    };
  }, [importer]);

  if (!frontmatter) {
    return (
      <div className='min-h-[60vh] flex items-center justify-center'>
        <div className='w-10 h-10 rounded-full border-2 border-bitcoin/30 border-t-bitcoin animate-spin' />
      </div>
    );
  }

  const crumbs = [
    { name: "Inicio", url: "/" },
    { name: "Guías", url: "/guias" },
    { name: frontmatter.title, url: `/guias/${slug}` },
  ];

  return (
    <>
      <SEOHead
        title={`${frontmatter.title} · Veintiuno`}
        description={frontmatter.description}
        url={`/guias/${slug}`}
        image={`/og/guide/${slug}.jpg`}
        type='article'
        author={frontmatter.author}
        publishedTime={frontmatter.datePublished}
        modifiedTime={frontmatter.dateModified}
        category={frontmatter.category}
        readTime={frontmatter.readTime}
        keywords={[
          frontmatter.title.toLowerCase(),
          "bitcoin latinoamerica",
          "bitcoin argentina",
          "veintiuno",
        ]}
        jsonLd={[breadcrumbSchema(crumbs)]}
      />

      <article className='min-h-screen bg-white'>
        <div className='container pt-6 pb-2'>
          <Breadcrumbs items={crumbs} />
        </div>

        {/* Article header */}
        <header className='max-w-3xl mx-auto px-4 md:px-6 pt-12 pb-8'>
          <Reveal>
            {frontmatter.category && (
              <div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bitcoin/10 text-bitcoin text-xs font-bold uppercase tracking-widest mb-4'>
                {frontmatter.category}
              </div>
            )}
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-heading font-black text-gray-900 leading-tight mb-6'>
              {frontmatter.title}
            </h1>
            <p className='text-xl md:text-2xl text-gray-600 leading-relaxed font-heading mb-8'>
              {frontmatter.description}
            </p>
            <div className='flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500'>
              <span className='inline-flex items-center gap-1.5'>
                <Calendar className='w-4 h-4' />
                Publicado el{" "}
                {new Date(frontmatter.datePublished).toLocaleDateString("es", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              {frontmatter.readTime && (
                <span className='inline-flex items-center gap-1.5'>
                  <Clock className='w-4 h-4' />
                  {frontmatter.readTime}
                </span>
              )}
              <span>
                Por <strong className='text-gray-900'>{frontmatter.author}</strong>
              </span>
            </div>
          </Reveal>
        </header>

        {/* MDX body */}
        <div className='max-w-3xl mx-auto px-4 md:px-6 pb-24'>
          <Reveal>
            <div className='prose prose-lg max-w-none'>
              <Suspense fallback={null}>
                <LazyGuide components={mdxComponents} />
              </Suspense>
            </div>
          </Reveal>

          {/* Last updated footer */}
          <div className='mt-16 pt-8 border-t border-gray-100 text-sm text-gray-500'>
            Última actualización:{" "}
            <strong>
              {new Date(frontmatter.dateModified).toLocaleDateString("es", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </strong>
          </div>

          <div className='mt-8'>
            <Link
              to='/guias'
              className='inline-flex items-center gap-1 text-bitcoin font-semibold hover:gap-2 transition-all'
            >
              <ChevronLeft className='w-4 h-4' />
              Ver todas las guías
            </Link>
          </div>
        </div>
      </article>
    </>
  );
};

export default GuidePage;
