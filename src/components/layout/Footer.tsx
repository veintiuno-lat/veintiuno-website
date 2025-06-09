import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className='bg-white border-t border-gray-100'>
      <div className='container py-16'>
        {/* <div className='flex flex-col md:flex-row gap-12'>
          <div className='w-full space-y-6'>
            <div className='flex items-center space-x-3'>
              <Globe className='h-6 w-6 text-bitcoin' />
              <span className='text-bolt-xl text-gray-900'>
                Veintiuno<span className='text-bitcoin'>.lat</span>
              </span>
            </div>
            <p className='text-gray-600 leading-relaxed max-w-sm'>
              Conectando comunidades Bitcoiners en toda Latinoamérica. Descubre, participa y contribuye al ecosistema de
              nuestra región.
            </p>

            <div className='flex items-center space-x-4'>
              <a
                href='https://twitter.com/veintiunolat'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-400 hover:text-bitcoin transition-colors duration-200'
                aria-label='Twitter'
              >
                <Twitter className='h-5 w-5' />
              </a>
              <a
                href='nostr:npub1veintiuno...'
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-400 hover:text-bitcoin transition-colors duration-200'
                aria-label='Nostr'
              >
                <Zap className='h-5 w-5' />
              </a>
            </div>
          </div>

          <div className='space-y-6'>
            <h3 className='text-bolt-lg text-gray-900'>Navegación</h3>
            <div className='space-y-3'>
              <Link to='/' className='block text-gray-600 hover:text-bitcoin transition-colors duration-200'>
                Inicio
              </Link>
              <Link to='/comunidades' className='block text-gray-600 hover:text-bitcoin transition-colors duration-200'>
                Comunidades
              </Link>
              <Link to='/blog' className='block text-gray-600 hover:text-bitcoin transition-colors duration-200'>
                Blog
              </Link>
              <Link to='/contacto' className='block text-gray-600 hover:text-bitcoin transition-colors duration-200'>
                Contacto
              </Link>
            </div>
            <h3 className='text-bolt-lg text-gray-900'>Legal</h3>
            <div className='space-y-3'>
              <Link
                to='/politica-de-uso'
                className='block text-gray-600 hover:text-bitcoin transition-colors duration-200'
              >
                Política de Uso
              </Link>
              <a
                href='mailto:hola@veintiuno.lat'
                className='block text-gray-600 hover:text-bitcoin transition-colors duration-200'
              >
                <span className='flex items-center space-x-2'>
                  <Mail className='h-4 w-4' />
                  <span>hola@veintiuno.lat</span>
                </span>
              </a>
            </div>
          </div>
        </div> */}

        <div className='flex flex-col sm:flex-row justify-between items-center'>
          <div className='flex gap-2'>
            <p className='text-gray-500 text-sm'>© 2025 Veintiuno.lat.</p>
            {/* Block Info */}
            <div className='text-sm text-gray-500'>
              <p>
                Creado en{' '}
                <a
                  href='https://mempool.space/block/900285'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-bitcoin hover:text-bitcoin-dark transition-colors duration-200 font-mono'
                >
                  #900.285
                </a>
              </p>
            </div>
          </div>
          <div className='flex items-center space-x-2 text-gray-500 text-sm mt-4 sm:mt-0'>
            <span>Hecho con</span>
            <Heart className='h-4 w-4 text-bitcoin fill-current' />
            <span>en LATAM</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
