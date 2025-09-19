import React from "react";
import { Link } from "react-router-dom";
import { Card as UICard, CardContent } from "@/components/ui/card";
import { Card } from "../types/Card";
import { Community } from "../types/Community";
import { MapPin } from "lucide-react";

interface ArtistCardDetailProps {
  card: Card;
  community?: Community;
  imagePosition?: 'left' | 'right';
}

const ArtistCardDetail: React.FC<ArtistCardDetailProps> = ({ card, community, imagePosition = 'left' }) => {
  const isImageLeft = imagePosition === 'left';
  
  return (
    <Link 
      to={`/card/${card.id}`}
      className="block hover:opacity-90 transition-opacity duration-200"
    >
      <div className={`flex flex-col lg:flex-row gap-6 ${!isImageLeft ? 'lg:flex-row-reverse' : ''}`}>
        {/* Card Image */}
        <img
          src={card.imageUrl}
          alt={card.title || `${card.communityName} - ${card.number}`}
          className="object-cover rounded-lg shadow-lg flex-shrink-0 w-full lg:w-auto"
          style={{ 
            width: '100%',
            height: '232px',
            maxWidth: '369px',
            aspectRatio: '369/232'
          }}
        />

        {/* Card Information */}
        <div 
          className="flex-1 w-full lg:w-auto flex"
          style={{
            height: '232px'
          }}
        >
          <UICard 
            className="h-full w-full border border-custom-border shadow-sm"
          >
            <CardContent className="p-6 h-full flex flex-col justify-between">
              {/* Title */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-heading">
                  {card.title || "Nombre de este arte"}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed font-body">
                  {card.description || "altafacha69 is a digital artisan who blends street culture, internet aesthetics, and futurist minimalism into bold graphic statements. Their work explores the tension between individual freedom and mass collectivism, channeling themes of Bitcoin, decentralization, and counterculture into striking visual narratives."}
                </p>
              </div>

              {/* Bottom Section with Community Info and Card Number */}
              <div className="flex justify-between items-end">
                {/* Community Info - Bottom Left */}
                <div className="flex items-center space-x-3">
                  {/* Community Avatar */}
                  <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
                    {community?.avatarImage ? (
                      <img
                        src={community.avatarImage}
                        alt={`${community.title} logo`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to gradient if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.className = parent.className.replace('overflow-hidden', '') + ' bg-gradient-to-br from-bitcoin to-yellow-500 flex items-center justify-center';
                            parent.innerHTML = `
                              <div class="text-center">
                                <div class="text-white font-bold text-xs mb-1">BTC</div>
                                <div class="text-white font-bold text-xs">${community.title.split(' ')[0]}</div>
                              </div>
                            `;
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-bitcoin to-yellow-500 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-white font-bold text-xs mb-1">BTC</div>
                          <div className="text-white font-bold text-xs">{community?.title?.split(' ')[0] || 'BTC'}</div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Community Details */}
                  <div>
                    <p className="font-semibold text-gray-900 text-sm font-heading">
                      {card.communityName}
                    </p>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="font-body">{card.location}</span>
                    </div>
                  </div>
                </div>

                {/* Card Number - Bottom Right */}
                <span className="text-gray-500 text-sm font-body">
                  {card.number}
                </span>
              </div>
            </CardContent>
          </UICard>
        </div>
      </div>
    </Link>
  );
};

export default ArtistCardDetail;
