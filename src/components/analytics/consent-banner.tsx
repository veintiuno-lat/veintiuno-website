import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

interface ConsentBannerProps {
  onAccept: () => void;
  onDecline: () => void;
}

/**
 * Banner de consentimiento para cookies y analytics
 * Cumple con GDPR y regulaciones de privacidad
 */
export const ConsentBanner: React.FC<ConsentBannerProps> = ({ onAccept, onDecline }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verificar si ya se dio consentimiento
    const consent = localStorage.getItem('analytics_consent');
    if (!consent) {
      // Mostrar banner después de un pequeño delay
      setTimeout(() => setIsVisible(true), 2000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('analytics_consent', 'accepted');
    localStorage.setItem('analytics_consent_date', new Date().toISOString());
    setIsVisible(false);
    onAccept();
  };

  const handleDecline = () => {
    localStorage.setItem('analytics_consent', 'declined');
    localStorage.setItem('analytics_consent_date', new Date().toISOString());
    setIsVisible(false);
    onDecline();
  };

  const handleClose = () => {
    setIsVisible(false);
    // Si cierra sin elegir, asumimos decline
    setTimeout(() => {
      if (!localStorage.getItem('analytics_consent')) {
        handleDecline();
      }
    }, 1000);
  };

  if (!isVisible) return null;

  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 p-6 animate-slide-up'>
      <div className='max-w-4xl mx-auto'>
        <div className='card p-6 border-bitcoin/20 shadow-minimal-xl bg-white/60 backdrop-blur-lg'>
          <div className='flex items-start justify-between mb-4'>
            <div className='flex items-center space-x-3'>
              <Cookie className='h-6 w-6 text-bitcoin' />
              <h3 className='text-bolt-lg text-gray-900'>Cookies y Analytics</h3>
            </div>
            <button onClick={handleClose} className='text-gray-400 hover:text-gray-600 transition-colors duration-200'>
              <X className='h-5 w-5' />
            </button>
          </div>

          <div className='space-y-4'>
            <p className='text-gray-600 leading-relaxed'>
              Utilizamos cookies técnicas y analytics para mejorar tu experiencia.
            </p>

            <div className='flex flex-col sm:flex-row gap-3 pt-2'>
              <button onClick={handleAccept} className='btn btn-sm btn-primary flex-1 sm:flex-none'>
                Aceptar Analytics
              </button>

              <button onClick={handleDecline} className='btn btn-sm btn-secondary flex-1 sm:flex-none'>
                Solo Técnicas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Hook para manejar el consentimiento de analytics
 */
export const useAnalyticsConsent = () => {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('analytics_consent');
    if (consent === 'accepted') {
      setHasConsent(true);
    } else if (consent === 'declined') {
      setHasConsent(false);
    } else {
      setShowBanner(true);
    }
  }, []);

  const giveConsent = () => {
    setHasConsent(true);
    setShowBanner(false);
  };

  const denyConsent = () => {
    setHasConsent(false);
    setShowBanner(false);
  };

  const resetConsent = () => {
    localStorage.removeItem('analytics_consent');
    localStorage.removeItem('analytics_consent_date');
    setHasConsent(null);
    setShowBanner(true);
  };

  return {
    hasConsent,
    showBanner,
    giveConsent,
    denyConsent,
    resetConsent,
  };
};
