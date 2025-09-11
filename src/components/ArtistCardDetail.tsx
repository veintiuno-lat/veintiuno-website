import React from "react";
import { Card as UICard, CardContent } from "@/components/ui/card";
import { Card } from "../types/Card";
import { MapPin } from "lucide-react";

interface ArtistCardDetailProps {
  card: Card;
  imagePosition?: 'left' | 'right';
}

const ArtistCardDetail: React.FC<ArtistCardDetailProps> = ({ card, imagePosition = 'left' }) => {
  const isImageLeft = imagePosition === 'left';
  const orientation = card.orientation || 'landscape';
  
  return (
    <div className={`flex gap-6 ${!isImageLeft ? 'flex-row-reverse' : ''}`}>
      {/* Card Image */}
      <img
        src={card.imageUrl}
        alt={card.title || `${card.communityName} - ${card.number}`}
        className="object-cover rounded-lg shadow-lg flex-shrink-0"
        style={{ 
          width: '369px', 
          height: '232px'
        }}
      />

      {/* Card Information */}
      <div 
        className="flex-1"
        style={{
          height: '232px'
        }}
      >
        <UICard 
          className="h-full border border-gray-200 shadow-sm"
          style={{
            height: '232px'
          }}
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
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">BTC</span>
                  </div>
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
  );
};

export default ArtistCardDetail;
