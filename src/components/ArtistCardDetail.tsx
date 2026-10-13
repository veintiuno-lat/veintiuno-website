import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Card } from "../types/Card";
import type { Artist } from "../types/Artist";
import { getCommunityById } from "../data/communities";
import { getArtistById } from "../data/artists";
import HoloCard from "./cards/HoloCard";
import { CommunityAvatar, Flag } from "./cards/CommunityCard";
import { cn } from "@/lib/utils";

interface ArtistCardDetailProps {
  card: Card;
  className?: string;
}

/** Gallery tile: holographic card + community / artist caption, links to /card/:id. */
const ArtistCardDetail: React.FC<ArtistCardDetailProps> = ({ card, className }) => {
  const community = getCommunityById(card.communityId);
  const artistName = getArtistById(card.artist)?.username ?? card.artist;

  return (
    <Link to={`/card/${card.id}`} className={cn("group block", className)}>
      <HoloCard
        src={card.imageUrl}
        alt={card.title || `${card.communityName} - ${card.number}`}
        orientation={card.orientation}
      />
      <div className='mt-3 flex items-center gap-3 px-1'>
        {community && <CommunityAvatar community={community} className='h-8 w-8 shrink-0 text-xs' />}
        <div className='min-w-0 flex-1'>
          <div className='truncate text-sm font-semibold text-white transition-colors group-hover:text-bitcoin'>
            {card.communityName}
          </div>
          <div className='truncate text-xs text-gray-400'>por {artistName}</div>
        </div>
        <span className='shrink-0 font-display text-xs text-gray-500'>{card.number}</span>
      </div>
    </Link>
  );
};

/**
 * Masonry-ish gallery: landscape cards span 2 columns, portrait 1, so rows end up with
 * similar heights; grid-flow-dense backfills gaps. (CSS columns would break HoloCard's 3D.)
 */
export function CardGrid({ cards, className }: { cards: Card[]; className?: string }) {
  return (
    <div
      className={cn(
        "grid grid-flow-dense grid-cols-2 items-start gap-x-5 gap-y-10 md:grid-cols-4 xl:grid-cols-6",
        className
      )}
    >
      {cards.map((card, i) => (
        <motion.div
          key={card.id}
          className={cn(card.orientation === "landscape" && "col-span-2")}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          <ArtistCardDetail card={card} />
        </motion.div>
      ))}
    </div>
  );
}

/** Compact artist link row (avatar, name, country, progress). */
export function ArtistRow({ artist, className }: { artist: Artist; className?: string }) {
  return (
    <Link
      to={`/artist/${artist.id}`}
      className={cn("surface surface-hover group flex items-center gap-4 p-3 pr-4", className)}
    >
      <img
        src={artist.profileImage}
        alt=''
        loading='lazy'
        decoding='async'
        className='h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-bitcoin/50'
      />
      <div className='min-w-0 flex-1'>
        <div className='truncate font-semibold text-white'>{artist.username}</div>
        <div className='flex items-center gap-1.5 truncate text-sm text-gray-400'>
          <Flag country={artist.countryName} className='shrink-0 text-xs' />
          {artist.countryName} · {artist.completedCards}/{artist.totalCards} cards
        </div>
      </div>
      <ArrowUpRight className='h-4 w-4 shrink-0 text-gray-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bitcoin' />
    </Link>
  );
}

export default ArtistCardDetail;
