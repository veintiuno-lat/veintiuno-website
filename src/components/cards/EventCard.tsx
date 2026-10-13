import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { getCommunityById } from "@/data/communities";
import {
  eventDay,
  eventMonthShort,
  eventTime,
  eventWeekday,
  priceLabel,
  type CommunityEvent,
} from "@/services/communityEvents";
import { CommunityAvatar } from "./CommunityCard";
import { cn } from "@/lib/utils";

/** Image fallback: the organizing community's own background art. */
const imageFor = (e: CommunityEvent) => e.image ?? getCommunityById(e.communityId)?.backgroundImage;

function DateBlock({ e, className }: { e: CommunityEvent; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <span className='font-display text-5xl leading-none text-white transition-colors group-hover:text-bitcoin md:text-6xl'>
        {eventDay(e)}
      </span>
      <span className='mt-1 text-sm font-semibold uppercase tracking-[0.2em] text-bitcoin'>{eventMonthShort(e)}</span>
      <span className='mt-0.5 text-xs capitalize text-gray-500'>{eventWeekday(e)}</span>
    </div>
  );
}

/** Wide agenda row (Meetups page). Opens the event's public page (registration lives there). */
export function EventRow({ event: e }: { event: CommunityEvent }) {
  const community = getCommunityById(e.communityId);
  const price = priceLabel(e.price);
  const img = imageFor(e);
  return (
    <a
      href={e.url}
      target='_blank'
      rel='noopener noreferrer'
      className='surface surface-hover group grid grid-cols-1 gap-5 p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bitcoin md:grid-cols-[5rem_14rem_1fr_auto] md:items-center md:gap-6 md:p-4 lg:grid-cols-[6rem_18rem_1fr_auto] lg:gap-8'
    >
      <DateBlock e={e} className='hidden md:flex' />

      <div className='relative aspect-[16/9] overflow-hidden rounded-2xl bg-ink-800 md:aspect-[4/3]'>
        {img && (
          <img
            src={img}
            alt=''
            loading='lazy'
            decoding='async'
            className='h-full w-full object-cover transition duration-700 group-hover:scale-110'
          />
        )}
        <div className='absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent' />
        <div className='absolute left-3 top-3 flex flex-col items-center rounded-2xl border border-white/10 bg-ink-950/90 px-3 py-2 md:hidden'>
          <span className='font-display text-3xl leading-none text-white'>{eventDay(e)}</span>
          <span className='text-[11px] font-semibold uppercase tracking-[0.2em] text-bitcoin'>{eventMonthShort(e)}</span>
        </div>
      </div>

      <div className='min-w-0 px-2 pb-2 md:p-0'>
        <div className='flex flex-wrap items-center gap-2'>
          {community && (
            <span className='inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] py-0.5 pl-0.5 pr-2.5 text-xs text-gray-300'>
              <CommunityAvatar community={community} className='h-5 w-5 text-[9px] ring-0' />
              {community.title}
            </span>
          )}
          {price && (
            <span className='rounded-full border border-bitcoin/40 bg-bitcoin/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-bitcoin'>
              {price}
            </span>
          )}
        </div>
        <h3 className='mt-3 text-xl font-bold leading-tight text-white transition-colors group-hover:text-bitcoin md:text-2xl'>
          {e.title}
        </h3>
        {e.excerpt && <p className='mt-2 line-clamp-2 text-sm text-gray-400'>{e.excerpt}</p>}
        <div className='mt-3 flex flex-col gap-1.5 text-sm text-gray-400 sm:flex-row sm:flex-wrap sm:gap-x-5'>
          <span className='flex items-center gap-2'>
            <Clock className='h-4 w-4 shrink-0 text-bitcoin' />
            {eventTime(e)}
          </span>
          {e.location && (
            <span className='flex min-w-0 items-center gap-2'>
              <MapPin className='h-4 w-4 shrink-0 text-bitcoin' />
              <span className='truncate'>{e.location}</span>
            </span>
          )}
        </div>
      </div>

      <span className='mx-2 mb-2 inline-flex items-center justify-center gap-1.5 rounded-xl bg-bitcoin px-4 py-2.5 text-sm font-semibold text-ink-950 transition group-hover:bg-glow md:m-0'>
        Inscribirme <ArrowUpRight className='h-4 w-4' />
      </span>
    </a>
  );
}

/** Compact card for grids (community / country pages). */
export function EventCard({ event: e }: { event: CommunityEvent }) {
  const price = priceLabel(e.price);
  const img = imageFor(e);
  return (
    <a
      href={e.url}
      target='_blank'
      rel='noopener noreferrer'
      className='surface surface-hover group block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bitcoin'
    >
      <div className='relative h-44 overflow-hidden bg-ink-800'>
        {img && (
          <img src={img} alt='' loading='lazy' decoding='async' className='h-full w-full object-cover transition duration-700 group-hover:scale-110' />
        )}
        <div className='absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent' />
        <div className='absolute left-3 top-3 flex flex-col items-center rounded-2xl border border-white/10 bg-ink-950/90 px-3 py-2'>
          <span className='font-display text-3xl leading-none text-white'>{eventDay(e)}</span>
          <span className='text-[11px] font-semibold uppercase tracking-[0.2em] text-bitcoin'>{eventMonthShort(e)}</span>
        </div>
        {price && (
          <span className='absolute right-3 top-3 rounded-full bg-ink-950/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-bitcoin'>
            {price}
          </span>
        )}
      </div>
      <div className='p-5'>
        <div className='text-xs font-semibold uppercase tracking-widest text-bitcoin'>
          <span className='capitalize'>{eventWeekday(e)}</span> · {eventTime(e)}
        </div>
        <h3 className='mt-2 font-bold text-white transition-colors group-hover:text-bitcoin'>{e.title}</h3>
        <span className='mt-3 inline-flex items-center gap-1 text-sm font-semibold text-gray-300 group-hover:text-white'>
          Ver e inscribirme <ArrowUpRight className='h-4 w-4' />
        </span>
      </div>
    </a>
  );
}
