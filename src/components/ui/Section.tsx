import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SplitText } from "@/components/motion";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: React.ReactNode;
  link?: { to: string; label: string };
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({ eyebrow, title, description, link, align = "left", className }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-6 md:mb-16",
        align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
        {eyebrow && <div className='eyebrow mb-5'>{eyebrow}</div>}
        {/* Fluid on phones (long single words like "ORGANIZADORES" must fit 320px), 3rem from ~460px up */}
        <SplitText text={title} className='display text-[clamp(2rem,10.5vw,3rem)] text-white md:text-6xl lg:text-7xl' />
        {description && <p className='mt-5 text-lg leading-relaxed text-gray-400'>{description}</p>}
      </div>
      {link && (
        <Link
          to={link.to}
          className='group inline-flex shrink-0 items-center gap-2 text-sm font-semibold uppercase tracking-widest text-bitcoin'
        >
          {link.label}
          <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
        </Link>
      )}
    </div>
  );
}

interface CtaBandProps {
  title: string;
  description?: string;
  action: { label: string; href: string; external?: boolean };
  className?: string;
}

export function CtaBand({ title, description, action, className }: CtaBandProps) {
  const button = (
    <span className='btn btn-md btn-primary'>
      {action.label} <ArrowRight className='h-4 w-4' />
    </span>
  );
  return (
    <section className={cn("px-5 py-24 md:px-8", className)}>
      <div className='relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-bitcoin/30 bg-gradient-to-br from-[#2a1500] via-ink-900 to-ink-950 px-8 py-16 text-center md:px-16 md:py-20'>
        <div aria-hidden='true' className='absolute -top-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(247,147,26,0.3),transparent)]' />
        <div aria-hidden='true' className='grid-lines absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]' />
        <div className='relative'>
          <SplitText text={title} className='display mx-auto max-w-3xl text-4xl text-white md:text-6xl' />
          {description && <p className='mx-auto mt-5 max-w-xl text-lg text-gray-300'>{description}</p>}
          <div className='mt-10 flex justify-center'>
            {action.external ? (
              <a href={action.href} target='_blank' rel='noopener noreferrer'>
                {button}
              </a>
            ) : (
              <Link to={action.href}>{button}</Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
