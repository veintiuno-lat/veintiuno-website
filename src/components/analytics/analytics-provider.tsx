import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { analytics, setUserProperties } from '../../services/analytics';

interface AnalyticsContextType {
  isInitialized: boolean;
  trackEvent: (action: string, category: string, label?: string, value?: number) => void;
  setUserType: (userType: 'developer' | 'community_leader' | 'visitor') => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

interface AnalyticsProviderProps {
  children: ReactNode;
}

/**
 * Provider de Analytics que inicializa el servicio y proporciona contexto
 * a toda la aplicación para tracking de eventos
 */
export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  const [isInitialized, setIsInitialized] = React.useState(false);

  useEffect(() => {
    // Inicializar analytics cuando el componente se monta
    const initAnalytics = async () => {
      try {
        // El analytics service se inicializa automáticamente
        setIsInitialized(true);

        // Configurar propiedades de usuario por defecto
        setUserProperties({
          user_type: 'visitor',
          preferred_language: navigator.language || 'es',
        });

        console.log('📊 Analytics Provider: Inicializado');
      } catch (error) {
        console.error('❌ Analytics Provider: Error en inicialización:', error);
      }
    };

    initAnalytics();
  }, []);

  const trackEvent = (action: string, category: string, label?: string, value?: number) => {
    analytics.trackEvent({ action, category, label, value });
  };

  const setUserType = (userType: 'developer' | 'community_leader' | 'visitor') => {
    setUserProperties({ user_type: userType });
  };

  const contextValue: AnalyticsContextType = {
    isInitialized,
    trackEvent,
    setUserType,
  };

  return <AnalyticsContext.Provider value={contextValue}>{children}</AnalyticsContext.Provider>;
};

/**
 * Hook para usar el contexto de Analytics
 */
export const useAnalyticsContext = (): AnalyticsContextType => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalyticsContext debe usarse dentro de AnalyticsProvider');
  }
  return context;
};

/**
 * HOC para envolver componentes con tracking automático
 */
export const withAnalytics = <P extends object>(WrappedComponent: React.ComponentType<P>, componentName: string) => {
  const WithAnalyticsComponent = (props: P) => {
    const { trackEvent } = useAnalyticsContext();

    useEffect(() => {
      trackEvent('component_mount', 'Component', componentName);
    }, [trackEvent]);

    return <WrappedComponent {...props} />;
  };

  WithAnalyticsComponent.displayName = `withAnalytics(${componentName})`;
  return WithAnalyticsComponent;
};
