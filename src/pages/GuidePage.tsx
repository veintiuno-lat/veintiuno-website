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
      <div className='flex min-h-[70vh] items-center justify-center px-5 pt-28'>
        <div className='text-center'>
          <h1 className='display mb-8 text-[clamp(2rem,10.5vw,3rem)] text-white md:text-6xl'>Guía no encontrada</h1>
          <Link to='/guias' className='btn btn-md btn-secondary'>
            <ChevronLeft className='h-4 w-4' />
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

      <article className='min-h-screen'>
        {/* Article header */}
        <header className='relative isolate overflow-hidden pt-28'>
          <div aria-hidden='true' className='absolute -top-40 left-1/2 -z-10 h-[32rem] w-[48rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(247,147,26,0.12),transparent)]' />
          <div
            aria-hidden='true'
            className='grid-lines absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent_75%)]'
          />
          <div className='mx-auto max-w-3xl px-5 md:px-8'>
            <Breadcrumbs items={crumbs} />
            <Reveal className='pb-12 pt-12 md:pt-16'>
              {frontmatter.category && <div className='eyebrow mb-6'>{frontmatter.category}</div>}
              <h1 className='display text-4xl text-white sm:text-5xl md:text-6xl'>{frontmatter.title}</h1>
              <p className='mt-6 text-xl leading-relaxed text-gray-300 md:text-2xl'>{frontmatter.description}</p>
              <div className='mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-400'>
                <span className='inline-flex items-center gap-1.5'>
                  <Calendar className='h-4 w-4 text-bitcoin' />
                  <time dateTime={frontmatter.datePublished}>
                    {new Date(frontmatter.datePublished).toLocaleDateString("es", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  </time>
                </span>
                {frontmatter.readTime && (
                  <span className='inline-flex items-center gap-1.5'>
                    <Clock className='h-4 w-4 text-bitcoin' />
                    {frontmatter.readTime} de lectura
                  </span>
                )}
                <span>
                  Por <strong className='text-white'>{frontmatter.author}</strong>
                </span>
              </div>
            </Reveal>
            <div aria-hidden='true' className='h-px bg-gradient-to-r from-bitcoin/60 via-white/10 to-transparent' />
          </div>
        </header>

        {/* MDX body — the guide's own leading h1 duplicates the header, so hide it */}
        <div className='mx-auto max-w-3xl px-5 pb-24 pt-12 md:px-8'>
          <Reveal>
            <div className='prose prose-lg max-w-none [&>h1:first-child]:hidden'>
              <Suspense fallback={null}>
                <LazyGuide components={mdxComponents} />
              </Suspense>
            </div>
          </Reveal>

          {/* Last updated footer */}
          <div className='mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between'>
            <p className='text-sm text-gray-500'>
              Última actualización:{" "}
              <strong className='font-medium text-gray-300'>
                {new Date(frontmatter.dateModified).toLocaleDateString("es", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
              </strong>
            </p>
            <Link to='/guias' className='btn btn-sm btn-secondary self-start'>
              <ChevronLeft className='h-4 w-4' />
              Ver todas las guías
            </Link>
          </div>
        </div>
      </article>
    </>
  );
};

export default GuidePage;
