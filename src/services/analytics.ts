// Analytics Service - Google Analytics 4 Implementation
// Servicio completo de analytics con eventos personalizados y tracking avanzado

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

export interface UserProperties {
  user_type?: 'developer' | 'community_leader' | 'visitor';
  preferred_language?: string;
  country?: string;
  community_interests?: string[];
}

export interface PageViewData {
  page_title: string;
  page_location: string;
  page_path: string;
  content_group1?: string; // Sección del sitio
  content_group2?: string; // Categoría de contenido
  custom_parameters?: Record<string, any>;
}

class AnalyticsService {
  private isInitialized = false;
  private isDevelopment = import.meta.env.DEV;
  private measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || '';
  private debugMode = import.meta.env.VITE_GA_DEBUG === 'true';

  constructor() {
    this.init();
  }

  /**
   * Inicializa Google Analytics 4
   */
  private async init(): Promise<void> {
    if (this.isInitialized || this.isDevelopment || !this.measurementId) {
      if (this.isDevelopment) {
        console.log('📊 Analytics: Modo desarrollo - eventos simulados');
      }
      return;
    }

    try {
      // Cargar Google Analytics script
      await this.loadGoogleAnalytics();

      // Configurar Google Analytics
      this.configureGA();

      // Configurar eventos automáticos
      this.setupAutomaticEvents();

      this.isInitialized = true;
      console.log('📊 Analytics: Inicializado correctamente');
    } catch (error) {
      console.error('❌ Analytics: Error en inicialización:', error);
    }
  }

  /**
   * Carga el script de Google Analytics
   */
  private loadGoogleAnalytics(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Verificar si ya está cargado
      if (typeof window.gtag === 'function') {
        resolve();
        return;
      }

      // Crear script tag
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;

      script.onload = () => {
        // Inicializar dataLayer
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
          window.dataLayer.push(arguments);
        };

        resolve();
      };

      script.onerror = () => {
        reject(new Error('Failed to load Google Analytics'));
      };

      document.head.appendChild(script);
    });
  }

  /**
   * Configura Google Analytics con parámetros personalizados
   */
  private configureGA(): void {
    if (!window.gtag) return;

    // Configuración inicial
    window.gtag('js', new Date());
    window.gtag('config', this.measurementId, {
      // Configuración de privacidad
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,

      // Configuración de tracking
      send_page_view: false, // Manejamos page views manualmente
      cookie_expires: 63072000, // 2 años

      // Configuración de debug
      debug_mode: this.debugMode,

      // Configuración personalizada para LATAM
      custom_map: {
        custom_parameter_1: 'user_type',
        custom_parameter_2: 'community_interest',
        custom_parameter_3: 'content_language',
      },
    });

    // Configurar propiedades de usuario por defecto
    this.setUserProperties({
      preferred_language: navigator.language || 'es',
      country: this.detectCountry(),
    });
  }

  /**
   * Configura eventos automáticos
   */
  private setupAutomaticEvents(): void {
    // Tracking de scroll depth
    this.setupScrollTracking();

    // Tracking de tiempo en página
    this.setupTimeTracking();

    // Tracking de errores JavaScript
    this.setupErrorTracking();

    // Tracking de performance
    this.setupPerformanceTracking();
  }

  /**
   * Envía un page view
   */
  public trackPageView(data: PageViewData): void {
    if (this.isDevelopment) {
      console.log('📊 Analytics [DEV] - Page View:', data);
      return;
    }

    if (!this.isInitialized || !window.gtag) return;

    window.gtag('event', 'page_view', {
      page_title: data.page_title,
      page_location: data.page_location,
      page_path: data.page_path,
      content_group1: data.content_group1,
      content_group2: data.content_group2,
      ...data.custom_parameters,
    });
  }

  /**
   * Envía un evento personalizado
   */
  public trackEvent(event: AnalyticsEvent): void {
    if (this.isDevelopment) {
      console.log('📊 Analytics [DEV] - Event:', event);
      return;
    }

    if (!this.isInitialized || !window.gtag) return;

    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event.custom_parameters,
    });
  }

  /**
   * Configura propiedades de usuario
   */
  public setUserProperties(properties: UserProperties): void {
    if (this.isDevelopment) {
      console.log('📊 Analytics [DEV] - User Properties:', properties);
      return;
    }

    if (!this.isInitialized || !window.gtag) return;

    window.gtag('set', 'user_properties', properties);
  }

  /**
   * Tracking de interacciones con comunidades
   */
  public trackCommunityInteraction(
    action: string,
    communityData: {
      community_id: string;
      community_name: string;
      country: string;
      category?: string;
    },
  ): void {
    this.trackEvent({
      action: action,
      category: 'Community',
      label: communityData.community_name,
      custom_parameters: {
        community_id: communityData.community_id,
        community_country: communityData.country,
        community_category: communityData.category,
      },
    });
  }

  /**
   * Tracking de interacciones con el blog
   */
  public trackBlogInteraction(
    action: string,
    postData: {
      post_id: string;
      post_title: string;
      category: string;
      author: string;
      read_time?: string;
    },
  ): void {
    this.trackEvent({
      action: action,
      category: 'Blog',
      label: postData.post_title,
      custom_parameters: {
        post_id: postData.post_id,
        post_category: postData.category,
        post_author: postData.author,
        post_read_time: postData.read_time,
      },
    });
  }

  /**
   * Tracking de búsquedas
   */
  public trackSearch(query: string, results_count: number, filters?: Record<string, any>): void {
    this.trackEvent({
      action: 'search',
      category: 'Search',
      label: query,
      value: results_count,
      custom_parameters: {
        search_term: query,
        search_results: results_count,
        search_filters: filters ? JSON.stringify(filters) : undefined,
      },
    });
  }

  /**
   * Tracking de formularios
   */
  public trackFormInteraction(action: 'start' | 'complete' | 'abandon', formName: string, step?: number): void {
    this.trackEvent({
      action: `form_${action}`,
      category: 'Form',
      label: formName,
      value: step,
      custom_parameters: {
        form_name: formName,
        form_step: step,
      },
    });
  }

  /**
   * Tracking de descargas
   */
  public trackDownload(fileName: string, fileType: string): void {
    this.trackEvent({
      action: 'download',
      category: 'File',
      label: fileName,
      custom_parameters: {
        file_name: fileName,
        file_type: fileType,
      },
    });
  }

  /**
   * Tracking de enlaces externos
   */
  public trackExternalLink(url: string, linkText?: string): void {
    this.trackEvent({
      action: 'click',
      category: 'External Link',
      label: linkText || url,
      custom_parameters: {
        link_url: url,
        link_domain: new URL(url).hostname,
      },
    });
  }

  /**
   * Tracking de scroll depth
   */
  private setupScrollTracking(): void {
    let maxScroll = 0;
    const thresholds = [25, 50, 75, 90, 100];
    const tracked = new Set<number>();

    const trackScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100,
      );

      maxScroll = Math.max(maxScroll, scrollPercent);

      thresholds.forEach((threshold) => {
        if (maxScroll >= threshold && !tracked.has(threshold)) {
          tracked.add(threshold);
          this.trackEvent({
            action: 'scroll',
            category: 'Engagement',
            label: `${threshold}%`,
            value: threshold,
          });
        }
      });
    };

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          trackScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /**
   * Tracking de tiempo en página
   */
  private setupTimeTracking(): void {
    const startTime = Date.now();
    const intervals = [30, 60, 120, 300]; // segundos
    const tracked = new Set<number>();

    const checkTimeSpent = () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);

      intervals.forEach((interval) => {
        if (timeSpent >= interval && !tracked.has(interval)) {
          tracked.add(interval);
          this.trackEvent({
            action: 'time_on_page',
            category: 'Engagement',
            label: `${interval}s`,
            value: interval,
          });
        }
      });
    };

    setInterval(checkTimeSpent, 10000); // Check every 10 seconds
  }

  /**
   * Tracking de errores JavaScript
   */
  private setupErrorTracking(): void {
    window.addEventListener('error', (event) => {
      this.trackEvent({
        action: 'javascript_error',
        category: 'Error',
        label: event.message,
        custom_parameters: {
          error_message: event.message,
          error_filename: event.filename,
          error_line: event.lineno,
          error_column: event.colno,
        },
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.trackEvent({
        action: 'promise_rejection',
        category: 'Error',
        label: event.reason?.toString() || 'Unknown promise rejection',
        custom_parameters: {
          error_reason: event.reason?.toString(),
        },
      });
    });
  }

  /**
   * Tracking de performance
   */
  private setupPerformanceTracking(): void {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

        if (navigation) {
          // Core Web Vitals tracking
          this.trackEvent({
            action: 'page_load_time',
            category: 'Performance',
            value: Math.round(navigation.loadEventEnd - navigation.fetchStart),
            custom_parameters: {
              dns_time: Math.round(navigation.domainLookupEnd - navigation.domainLookupStart),
              connect_time: Math.round(navigation.connectEnd - navigation.connectStart),
              response_time: Math.round(navigation.responseEnd - navigation.requestStart),
              dom_load_time: Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart),
            },
          });
        }
      }, 0);
    });
  }

  /**
   * Detecta el país del usuario (aproximado)
   */
  private detectCountry(): string {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const countryMap: Record<string, string> = {
      'America/Argentina': 'AR',
      'America/Sao_Paulo': 'BR',
      'America/Santiago': 'CL',
      'America/Bogota': 'CO',
      'America/Mexico_City': 'MX',
      'America/Lima': 'PE',
      'America/Montevideo': 'UY',
    };

    for (const [tz, country] of Object.entries(countryMap)) {
      if (timezone.includes(tz)) {
        return country;
      }
    }

    return 'UNKNOWN';
  }

  /**
   * Obtiene métricas de rendimiento
   */
  public getPerformanceMetrics(): Record<string, number> {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

    if (!navigation) return {};

    return {
      pageLoadTime: Math.round(navigation.loadEventEnd - navigation.fetchStart),
      domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart),
      firstByte: Math.round(navigation.responseStart - navigation.fetchStart),
      dnsLookup: Math.round(navigation.domainLookupEnd - navigation.domainLookupStart),
      tcpConnect: Math.round(navigation.connectEnd - navigation.connectStart),
      serverResponse: Math.round(navigation.responseEnd - navigation.requestStart),
    };
  }
}

// Instancia singleton del servicio de analytics
export const analytics = new AnalyticsService();

// Funciones helper para uso fácil en componentes
export const trackPageView = (data: PageViewData) => analytics.trackPageView(data);
export const trackEvent = (event: AnalyticsEvent) => analytics.trackEvent(event);
export const trackCommunityView = (community: any) => analytics.trackCommunityInteraction('view', community);
export const trackCommunityClick = (community: any) => analytics.trackCommunityInteraction('click', community);
export const trackBlogView = (post: any) => analytics.trackBlogInteraction('view', post);
export const trackBlogRead = (post: any) => analytics.trackBlogInteraction('read_complete', post);
export const trackSearch = (query: string, results: number, filters?: any) =>
  analytics.trackSearch(query, results, filters);
export const trackFormStart = (formName: string) => analytics.trackFormInteraction('start', formName);
export const trackFormComplete = (formName: string) => analytics.trackFormInteraction('complete', formName);
export const trackDownload = (fileName: string, fileType: string) => analytics.trackDownload(fileName, fileType);
export const trackExternalLink = (url: string, text?: string) => analytics.trackExternalLink(url, text);
export const setUserProperties = (properties: UserProperties) => analytics.setUserProperties(properties);
