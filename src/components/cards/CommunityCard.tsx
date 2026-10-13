import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Community } from "@/types/Community";
import { flagCode } from "@/data/countries";
import { cn } from "@/lib/utils";

/** Deterministic warm gradient for communities without artwork. */
function fallbackGradient(id: string) {
  let h = 0;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) % 360;
  const hue = 18 + (h % 30); // stay in the orange/amber band
  return `radial-gradient(circle at 20% 20%, hsl(${hue} 95% 55% / 0.55), transparent 55%), radial-gradient(circle at 80% 80%, hsl(${hue + 20} 90% 45% / 0.35), transparent 60%), #13131a`;
}

export function CommunityAvatar({ community, className }: { community: Community; className?: string }) {
  return community.avatarImage ? (
    <img
      src={community.avatarImage}
      alt={`${community.title} logo`}
      loading='lazy'
      decoding='async'
      className={cn("rounded-full object-cover ring-2 ring-ink-950", className)}
    />
  ) : (
    <div
      className={cn("flex items-center justify-center rounded-full font-display text-white ring-2 ring-ink-950", className)}
      style={{ background: fallbackGradient(community.id) }}
      aria-hidden='true'
    >
      {community.title.replace(/bitcoin|btc/gi, "").trim()[0] ?? "₿"}
    </div>
  );
}

export function Flag({ country, className }: { country: string; className?: string }) {
  const code = flagCode(country);
  return code ? <span className={cn(`fi fi-${code} rounded-[2px]`, className)} aria-hidden='true' /> : null;
}

interface CommunityCardProps {
  community: Community;
  className?: string;
  compact?: boolean;
  active?: boolean;
  onHover?: (id: string | null) => void;
}

const CommunityCard: React.FC<CommunityCardProps> = ({ community, className, compact, active, onHover }) => {
  if (compact) {
    return (
      <Link
        to={`/community/${community.id}`}
        onMouseEnter={() => onHover?.(community.id)}
        onMouseLeave={() => onHover?.(null)}
        onFocus={() => onHover?.(community.id)}
        className={cn(
          "surface surface-hover group flex items-center gap-4 p-3 pr-4",
          active && "border-bitcoin/60 shadow-glow",
          className
        )}
      >
        <CommunityAvatar community={community} className='h-12 w-12 shrink-0' />
        <div className='min-w-0 flex-1'>
          <div className='truncate font-semibold text-white'>{community.title}</div>
          <div className='flex items-center gap-1.5 truncate text-sm text-gray-400'>
            <Flag country={community.country} className='text-xs' />
            {community.city}
          </div>
        </div>
        {community.cruzade && <span className='rounded-full bg-bitcoin/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-bitcoin'>Cruzada</span>}
        <ArrowUpRight className='h-4 w-4 shrink-0 text-gray-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bitcoin' />
      </Link>
    );
  }

  return (
    <Link
      to={`/community/${community.id}`}
      onMouseEnter={() => onHover?.(community.id)}
      onMouseLeave={() => onHover?.(null)}
      className={cn("surface surface-hover group block overflow-hidden hover:-translate-y-1", className)}
    >
      <div className='relative h-40 overflow-hidden'>
        {community.backgroundImage ? (
          <img
            src={community.backgroundImage}
            alt=''
            loading='lazy'
            decoding='async'
            className='h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110'
          />
        ) : (
          <div className='h-full w-full transition duration-700 group-hover:scale-110' style={{ background: fallbackGradient(community.id) }} />
        )}
        <div className='absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent' />
        {community.cruzade && (
          <span className='absolute right-3 top-3 rounded-full border border-bitcoin/40 bg-ink-950/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-bitcoin'>
            Cruzada
          </span>
        )}
      </div>
      <div className='relative px-5 pb-5'>
        <CommunityAvatar community={community} className='-mt-9 h-16 w-16 text-2xl shadow-xl transition duration-500 group-hover:scale-105' />
        <h3 className='mt-3 text-lg font-bold leading-tight text-white transition-colors group-hover:text-bitcoin'>
          {community.title}
        </h3>
        <div className='mt-1.5 flex items-center gap-1.5 text-sm text-gray-400'>
          <MapPin className='h-3.5 w-3.5 text-bitcoin' />
          <span className='truncate'>
            {community.city}, {community.country}
          </span>
          <Flag country={community.country} className='ml-auto shrink-0 text-base' />
        </div>
      </div>
    </Link>
  );
};

export default CommunityCard;
