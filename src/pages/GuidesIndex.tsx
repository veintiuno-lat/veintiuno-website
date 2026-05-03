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

      <div className='min-h-screen bg-white'>
        <div className='container pt-6 pb-2'>
          <Breadcrumbs items={crumbs} />
        </div>

        <MissionHero
          badge='Guías'
          title='Guías Bitcoin'
          subtitle='Aprendé Bitcoin desde Latinoamérica, en español.'
          variant='warm'
        />

        <section className='py-20 max-w-5xl mx-auto px-4 md:px-12'>
          <Reveal>
            <p className='text-lg md:text-xl text-gray-700 leading-relaxed mb-12 max-w-3xl'>
              Guías escritas por la red <strong>Veintiuno</strong> para entender
              y usar Bitcoin desde la realidad latinoamericana. Sin hype, sin
              altcoins, sin promesas de retorno. Solo Bitcoin, Lightning y
              soberanía financiera.
            </p>
          </Reveal>

          {guides.length === 0 ? (
            <div className='flex justify-center py-12'>
              <div className='w-10 h-10 rounded-full border-2 border-bitcoin/30 border-t-bitcoin animate-spin' />
            </div>
          ) : (
            <Stagger
              stagger={0.08}
              className='grid grid-cols-1 md:grid-cols-2 gap-6'
            >
              {guides.map((g) => (
                <StaggerItem key={g.slug}>
                  <Link to={`/guias/${g.slug}`} className='block group h-full'>
                    <TiltCard maxTilt={4} lift={4}>
                      <article className='card-glass p-8 h-full flex flex-col'>
                        {g.category && (
                          <div className='inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-bitcoin/10 text-bitcoin text-xs font-bold uppercase tracking-widest mb-4'>
                            {g.category}
                          </div>
                        )}
                        <h2 className='text-2xl md:text-3xl font-heading font-black text-gray-900 mb-3 group-hover:text-bitcoin transition-colors leading-tight'>
                          {g.title}
                        </h2>
                        <p className='text-gray-600 leading-relaxed mb-6 flex-1'>
                          {g.description}
                        </p>
                        <div className='flex items-center justify-between text-sm text-gray-500'>
                          {g.readTime && (
                            <span className='inline-flex items-center gap-1.5'>
                              <Clock className='w-3.5 h-3.5' />
                              {g.readTime}
                            </span>
                          )}
                          <span className='inline-flex items-center gap-1 text-bitcoin font-semibold'>
                            Leer guía <ArrowRight className='w-4 h-4' />
                          </span>
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
