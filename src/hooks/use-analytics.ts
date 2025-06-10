import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { analytics, trackPageView, PageViewData } from '../services/analytics';

/**
 * Hook personalizado para integrar analytics en componentes React
 * Maneja automáticamente el tracking de page views y proporciona funciones helper
 */
export const useAnalytics = () => {
  const location = useLocation();

  // Track page view automático cuando cambia la ruta
  useEffect(() => {
    const pageData: PageViewData = {
      page_title: document.title,
      page_location: window.location.href,
      page_path: location.pathname,
      content_group1: getContentGroup(location.pathname),
      content_group2: getContentCategory(location.pathname),
    };

    // Delay para asegurar que el título se haya actualizado
    setTimeout(() => {
      trackPageView({
        ...pageData,
        page_title: document.title,
      });
    }, 100);
  }, [location]);

  // Función para trackear eventos personalizados
  const track = useCallback(
    (action: string, category: string, label?: string, value?: number, customParams?: Record<string, any>) => {
      analytics.trackEvent({
        action,
        category,
        label,
        value,
        custom_parameters: customParams,
      });
    },
    [],
  );

  // Función para trackear clics en enlaces externos
  const trackExternalClick = useCallback((url: string, linkText?: string) => {
    analytics.trackExternalLink(url, linkText);
  }, []);

  // Función para trackear descargas
  const trackDownload = useCallback((fileName: string, fileType: string) => {
    analytics.trackDownload(fileName, fileType);
  }, []);

  // Función para trackear búsquedas
  const trackSearch = useCallback((query: string, resultsCount: number, filters?: Record<string, any>) => {
    analytics.trackSearch(query, resultsCount, filters);
  }, []);

  // Función para trackear interacciones con formularios
  const trackForm = useCallback((action: 'start' | 'complete' | 'abandon', formName: string, step?: number) => {
    analytics.trackFormInteraction(action, formName, step);
  }, []);

  return {
    track,
    trackExternalClick,
    trackDownload,
    trackSearch,
    trackForm,
    analytics,
  };
};

/**
 * Determina el grupo de contenido basado en la ruta
 */
function getContentGroup(pathname: string): string {
  if (pathname === '/') return 'Home';
  return 'Other';
}

/**
 * Determina la categoría de contenido basado en la ruta
 */
function getContentCategory(pathname: string): string {
  if (pathname === '/') return 'Landing';
  return 'Page';
}

/**
 * Hook para trackear tiempo de lectura en posts de blog
 */
export const useReadingTime = (contentLength: number) => {
  const { track } = useAnalytics();

  useEffect(() => {
    const wordsPerMinute = 200;
    const estimatedTime = Math.ceil(contentLength / wordsPerMinute);
    let startTime = Date.now();
    let hasTrackedStart = false;
    let hasTrackedMidpoint = false;
    let hasTrackedComplete = false;

    const trackReadingProgress = () => {
      const timeSpent = (Date.now() - startTime) / 1000 / 60; // minutos
      const progressPercent = (timeSpent / estimatedTime) * 100;

      if (!hasTrackedStart && timeSpent > 0.1) {
        track('reading_start', 'Blog', 'Reading Started');
        hasTrackedStart = true;
      }

      if (!hasTrackedMidpoint && progressPercent >= 50) {
        track('reading_midpoint', 'Blog', 'Reading 50%');
        hasTrackedMidpoint = true;
      }

      if (!hasTrackedComplete && progressPercent >= 90) {
        track('reading_complete', 'Blog', 'Reading Complete');
        hasTrackedComplete = true;
      }
    };

    const interval = setInterval(trackReadingProgress, 10000); // Check every 10 seconds

    return () => {
      clearInterval(interval);
      const finalTime = (Date.now() - startTime) / 1000 / 60;
      if (finalTime > 0.5) {
        // Solo trackear si leyó por más de 30 segundos
        track('reading_time', 'Blog', 'Time Spent Reading', Math.round(finalTime * 60));
      }
    };
  }, [contentLength, track]);
};

/**
 * Hook para trackear interacciones con el mapa
 */
export const useMapAnalytics = () => {
  const { track } = useAnalytics();

  const trackMapInteraction = useCallback(
    (action: string, data?: Record<string, any>) => {
      track(action, 'Map', undefined, undefined, data);
    },
    [track],
  );

  const trackCommunityMarkerClick = useCallback(
    (community: any) => {
      trackMapInteraction('marker_click', {
        community_id: community.id,
        community_name: community.title,
        community_country: community.country,
        community_category: community.category,
      });
    },
    [trackMapInteraction],
  );

  const trackMapZoom = useCallback(
    (zoomLevel: number) => {
      trackMapInteraction('zoom_change', { zoom_level: zoomLevel });
    },
    [trackMapInteraction],
  );

  const trackMapPan = useCallback(
    (center: [number, number]) => {
      trackMapInteraction('map_pan', {
        center_lat: center[0],
        center_lng: center[1],
      });
    },
    [trackMapInteraction],
  );

  return {
    trackMapInteraction,
    trackCommunityMarkerClick,
    trackMapZoom,
    trackMapPan,
  };
};
