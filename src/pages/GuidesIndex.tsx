import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";

import SEOHead from "../components/seo/SEOHead";
import Breadcrumbs from "../components/Breadcrumbs";
import { MissionHero } from "../components/mission";
import { Reveal, Stagger, StaggerItem, TiltCard } from "../components/motion";
import { breadcrumbSchema } from "@/lib/schema";

const guideModules = import.meta.glob("../content/guides/*.mdx");

interface GuideMeta {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  category?: string;
  readTime?: string;
}

const GuidesIndex: React.FC = () => {
  const [guides, setGuides] = useState<GuideMeta[]>([]);

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      Object.entries(guideModules).map(async ([path, importer]) => {
        const slug = path.replace("../content/guides/", "").replace(/\.mdx$/, "");
        const mod = (await importer()) as { frontmatter: GuideMeta };
        return { ...mod.frontmatter, slug };
      }),
    ).then((all) => {
      if (cancelled) return;
      // Newest first.
      all.sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));
      setGuides(all);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const crumbs = [
    { name: "Inicio", url: "/" },
    { name: "Guías", url: "/guias" },
  ];

  return (
    <>
      <SEOHead
        title='Guías Bitcoin · Veintiuno'
        description='Guías Bitcoin en español para Latinoamérica: cómo empezar, Lightning Network, auto-custodia, comunidades por país. Producidas por la red Veintiuno.'
        keywords={[
          "guías bitcoin",
          "bitcoin latinoamerica",
          "bitcoin argentina",
          "lightning network español",
          "como empezar bitcoin",
          "veintiuno",
        ]}
        url='/guias'
        type='website'
        jsonLd={[breadcrumbSchema(crumbs)]}
      />

      <div className='relative min-h-screen'>
        <div className='absolute inset-x-0 top-24 z-10 mx-auto max-w-7xl px-5 md:px-8'>
          <Breadcrumbs items={crumbs} />
        </div>

        <MissionHero
          badge='Guías'
          title='Guías Bitcoin'
          subtitle='Aprendé Bitcoin desde Latinoamérica, en español.'
          variant='warm'
          className='pt-36'
        />

        <section className='mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32'>
          <Reveal>
            <p className='mb-16 max-w-3xl text-xl leading-relaxed text-gray-300 md:text-2xl'>
              Guías escritas por la red <strong className='text-white'>Veintiuno</strong> para entender
              y usar Bitcoin desde la realidad latinoamericana. Sin hype, sin
              altcoins, sin promesas de retorno. Solo Bitcoin, Lightning y
              soberanía financiera.
            </p>
          </Reveal>

          {guides.length === 0 ? (
            <div className='flex justify-center py-12'>
              <div className='h-10 w-10 animate-spin rounded-full border-2 border-bitcoin/30 border-t-bitcoin' />
            </div>
          ) : (
            <Stagger stagger={0.08} className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              {guides.map((g) => (
                <StaggerItem key={g.slug} className='h-full'>
                  <Link to={`/guias/${g.slug}`} className='group block h-full'>
                    <TiltCard maxTilt={4} lift={4} className='h-full'>
                      <article className='surface surface-hover flex h-full flex-col overflow-hidden'>
                        <div className='relative aspect-[1200/630] overflow-hidden'>
                          <img
                            src={`/og/guide/${g.slug}.jpg`}
                            alt=''
                            loading='lazy'
                            decoding='async'
                            className='h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110'
                          />
                          <div className='absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/10 to-transparent' />
                          {g.category && (
                            <span className='eyebrow absolute left-5 top-5 bg-ink-950/85'>{g.category}</span>
                          )}
                        </div>
                        <div className='flex flex-1 flex-col p-6 md:p-8'>
                          <h2 className='text-2xl font-bold leading-tight text-white transition-colors group-hover:text-bitcoin md:text-3xl'>
                            {g.title}
                          </h2>
                          <p className='mt-3 flex-1 leading-relaxed text-gray-400'>{g.description}</p>
                          <div className='mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-sm text-gray-500'>
                            {g.readTime && (
                              <span className='inline-flex items-center gap-1.5'>
                                <Clock className='h-3.5 w-3.5' />
                                {g.readTime}
                              </span>
                            )}
                            <span className='ml-auto inline-flex items-center gap-1.5 font-semibold uppercase tracking-widest text-bitcoin'>
                              Leer guía <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                            </span>
                          </div>
                        </div>
                      </article>
                    </TiltCard>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </section>
      </div>
    </>
  );
};

export default GuidesIndex;
