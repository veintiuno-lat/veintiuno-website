import React, { useState, useEffect } from 'react';
import { BarChart3, Users, Eye, Clock, Globe, TrendingUp, Download, RefreshCw } from 'lucide-react';
import { analytics } from '../../services/analytics';

interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  avgSessionDuration: number;
  bounceRate: number;
  topPages: Array<{ page: string; views: number }>;
  topCountries: Array<{ country: string; visitors: number }>;
  performanceMetrics: Record<string, number>;
}

/**
 * Dashboard de analytics para administradores
 * Muestra métricas clave y estadísticas de uso
 */
export const AnalyticsDashboard: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    loadAnalyticsData();
  }, [timeRange]);

  const loadAnalyticsData = async () => {
    setLoading(true);
    try {
      // En una implementación real, esto vendría de la API de Google Analytics
      // Por ahora, simulamos datos para demostración
      const mockData: AnalyticsData = {
        pageViews: 12543,
        uniqueVisitors: 8921,
        avgSessionDuration: 245, // segundos
        bounceRate: 42.3,
        topPages: [
          { page: '/', views: 3421 },
          { page: '/blog', views: 2156 },
          { page: '/comunidades', views: 1876 },
          { page: '/blog/futuro-inteligencia-artificial-latam', views: 987 },
          { page: '/agregar-comunidad', views: 654 },
        ],
        topCountries: [
          { country: 'México', visitors: 2341 },
          { country: 'Argentina', visitors: 1987 },
          { country: 'Colombia', visitors: 1654 },
          { country: 'Brasil', visitors: 1432 },
          { country: 'Chile', visitors: 1098 },
        ],
        performanceMetrics: analytics.getPerformanceMetrics(),
      };

      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setData(mockData);
    } catch (error) {
      console.error('Error loading analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const exportData = () => {
    if (!data) return;

    const csvContent = [
      ['Métrica', 'Valor'],
      ['Page Views', data.pageViews.toString()],
      ['Unique Visitors', data.uniqueVisitors.toString()],
      ['Avg Session Duration', formatDuration(data.avgSessionDuration)],
      ['Bounce Rate', `${data.bounceRate}%`],
      [''],
      ['Top Pages', ''],
      ...data.topPages.map((page) => [page.page, page.views.toString()]),
      [''],
      ['Top Countries', ''],
      ...data.topCountries.map((country) => [country.country, country.visitors.toString()]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${timeRange}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <RefreshCw className='h-8 w-8 text-bitcoin animate-spin mx-auto mb-4' />
          <p className='text-gray-600'>Cargando datos de analytics...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <BarChart3 className='h-16 w-16 text-gray-300 mx-auto mb-4' />
          <h2 className='text-bolt-xl text-gray-900 mb-2'>No hay datos disponibles</h2>
          <p className='text-gray-600'>No se pudieron cargar los datos de analytics.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white border-b border-custom-border'>
        <div className='max-w-7xl mx-auto px-6 py-8'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-bolt-3xl text-gray-900 mb-2'>Analytics Dashboard</h1>
              <p className='text-gray-600'>Métricas y estadísticas de Veintiuno.lat</p>
            </div>

            <div className='flex items-center space-x-4'>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as '7d' | '30d' | '90d')}
                className='px-4 py-2 border border-custom-border rounded-lg focus:ring-2 focus:ring-bitcoin/20 focus:border-bitcoin'
              >
                <option value='7d'>Últimos 7 días</option>
                <option value='30d'>Últimos 30 días</option>
                <option value='90d'>Últimos 90 días</option>
              </select>

              <button onClick={exportData} className='btn-secondary inline-flex items-center space-x-2'>
                <Download className='h-4 w-4' />
                <span>Exportar</span>
              </button>

              <button onClick={loadAnalyticsData} className='btn-primary inline-flex items-center space-x-2'>
                <RefreshCw className='h-4 w-4' />
                <span>Actualizar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-6 py-8'>
        {/* Métricas principales */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <div className='card p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600 mb-1'>Page Views</p>
                <p className='text-bolt-2xl text-gray-900'>{data.pageViews.toLocaleString()}</p>
              </div>
              <Eye className='h-8 w-8 text-bitcoin' />
            </div>
          </div>

          <div className='card p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600 mb-1'>Visitantes Únicos</p>
                <p className='text-bolt-2xl text-gray-900'>{data.uniqueVisitors.toLocaleString()}</p>
              </div>
              <Users className='h-8 w-8 text-bitcoin' />
            </div>
          </div>

          <div className='card p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600 mb-1'>Duración Promedio</p>
                <p className='text-bolt-2xl text-gray-900'>{formatDuration(data.avgSessionDuration)}</p>
              </div>
              <Clock className='h-8 w-8 text-bitcoin' />
            </div>
          </div>

          <div className='card p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600 mb-1'>Bounce Rate</p>
                <p className='text-bolt-2xl text-gray-900'>{data.bounceRate}%</p>
              </div>
              <TrendingUp className='h-8 w-8 text-bitcoin' />
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
          {/* Top Pages */}
          <div className='card p-6'>
            <h3 className='text-bolt-xl text-gray-900 mb-6 flex items-center'>
              <BarChart3 className='h-5 w-5 text-bitcoin mr-2' />
              Páginas Más Visitadas
            </h3>
            <div className='space-y-4'>
              {data.topPages.map((page, index) => (
                <div key={index} className='flex items-center justify-between'>
                  <div className='flex-1'>
                    <p className='text-sm text-gray-900 truncate'>{page.page}</p>
                    <div className='w-full bg-gray-200 rounded-full h-2 mt-1'>
                      <div
                        className='bg-bitcoin h-2 rounded-full'
                        style={{ width: `${(page.views / data.topPages[0].views) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className='text-bolt-sm text-gray-600 ml-4'>{page.views.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Countries */}
          <div className='card p-6'>
            <h3 className='text-bolt-xl text-gray-900 mb-6 flex items-center'>
              <Globe className='h-5 w-5 text-bitcoin mr-2' />
              Países con Más Visitantes
            </h3>
            <div className='space-y-4'>
              {data.topCountries.map((country, index) => (
                <div key={index} className='flex items-center justify-between'>
                  <div className='flex-1'>
                    <p className='text-sm text-gray-900'>{country.country}</p>
                    <div className='w-full bg-gray-200 rounded-full h-2 mt-1'>
                      <div
                        className='bg-bitcoin h-2 rounded-full'
                        style={{ width: `${(country.visitors / data.topCountries[0].visitors) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className='text-bolt-sm text-gray-600 ml-4'>{country.visitors.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        {Object.keys(data.performanceMetrics).length > 0 && (
          <div className='card p-6'>
            <h3 className='text-bolt-xl text-gray-900 mb-6'>Métricas de Performance</h3>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4'>
              {Object.entries(data.performanceMetrics).map(([key, value]) => (
                <div key={key} className='text-center'>
                  <p className='text-bolt-lg text-bitcoin'>{value}ms</p>
                  <p className='text-xs text-gray-600 capitalize'>{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
