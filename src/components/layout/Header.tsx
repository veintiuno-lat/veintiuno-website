import React from "react";
import { Link, useLocation } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface LogoProps extends React.SVGProps<SVGSVGElement> {}

const Logo: React.FC<LogoProps> = (props) => {
  return (
    <svg
      {...props}
      width='700'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 564.07 59.2'
    >
      <g>
        <path d='M37.44,0h14.32l-20,59.2h-12.8L0,0h14.24l11.28,36.32L37.44,0Z' />
        <path d='M89.04,14h-24.16v8.88h19.6v13.52h-19.6v9.28h24.16v13.52h-37.68V.56l37.68-.08v13.52Z' />
        <path d='M109.52,59.2h-13.52V.4h13.52v58.8Z' />
        <path d='M151.36.48h13.52v58.72h-14.64l-19.2-34.24v34.24h-13.52V.64h14.72l19.12,34.16V.48Z' />
        <path d='M206,.24v13.52h-11.28v45.44h-13.52V13.76h-11.2V.24h36Z' />
        <path d='M225.28,59.2h-13.52V.4h13.52v58.8Z' />
        <path d='M255.6,59.2c-2.99,0-5.81-.55-8.48-1.64-2.67-1.09-5.04-2.65-7.12-4.68-2.13-2.13-3.77-4.53-4.92-7.2-1.15-2.67-1.75-5.52-1.8-8.56V.4h13.52v36.64c0,2.35.88,4.4,2.64,6.16,1.76,1.65,3.84,2.48,6.24,2.48,1.17,0,2.29-.24,3.36-.72,1.07-.48,2-1.12,2.8-1.92s1.41-1.73,1.84-2.8c.43-1.07.64-2.21.64-3.44V.4h13.52v36.32c.05,3.04-.49,5.92-1.64,8.64-1.15,2.72-2.72,5.09-4.72,7.12-2,2.03-4.35,3.64-7.04,4.84-2.69,1.2-5.56,1.83-8.6,1.88h-.24Z' />
        <path d='M319.76.48h13.52v58.72h-14.64l-19.2-34.24v34.24h-13.52V.64h14.72l19.12,34.16V.48Z' />
        <path d='M366.04.4c4.05,0,7.85.77,11.42,2.32,3.57,1.55,6.69,3.64,9.35,6.28,2.66,2.64,4.77,5.75,6.31,9.32,1.54,3.57,2.32,7.39,2.32,11.44s-.77,7.87-2.32,11.44c-1.54,3.57-3.65,6.68-6.31,9.32-2.66,2.64-5.78,4.73-9.35,6.28-3.57,1.55-7.38,2.32-11.42,2.32s-7.86-.77-11.42-2.32c-3.57-1.55-6.67-3.64-9.31-6.28-2.64-2.64-4.73-5.75-6.27-9.32-1.54-3.57-2.32-7.39-2.32-11.44s.77-7.87,2.32-11.44c1.54-3.57,3.63-6.68,6.27-9.32,2.64-2.64,5.74-4.73,9.31-6.28,3.57-1.55,7.38-2.32,11.42-2.32ZM366.08,45.6c2.19,0,4.24-.41,6.16-1.24,1.92-.83,3.6-1.96,5.04-3.4,1.44-1.44,2.57-3.12,3.4-5.04.83-1.92,1.24-3.97,1.24-6.16s-.41-4.24-1.24-6.16c-.83-1.92-1.96-3.6-3.4-5.04s-3.12-2.57-5.04-3.4c-1.92-.83-3.97-1.24-6.16-1.24s-4.24.41-6.16,1.24c-1.92.83-3.6,1.96-5.04,3.4s-2.57,3.12-3.4,5.04c-.83,1.92-1.24,3.97-1.24,6.16s.41,4.24,1.24,6.16c.83,1.92,1.96,3.6,3.4,5.04,1.44,1.44,3.12,2.57,5.04,3.4,1.92.83,3.97,1.24,6.16,1.24Z' />
      </g>
      <g>
        <path d='M473.03,58.99h-34.96V.19h13.52v45.28h21.44v13.52Z' />
        <path d='M512.15,58.99l-2.32-7.12h-18.48l-2.4,7.12h-14.32L494.63.27h12.8l18.96,58.72h-14.24ZM495.99,38.35h9.52l-4.64-14.24-4.88,14.24Z' />
        <path d='M564.07.03v13.52h-11.28v45.44h-13.52V13.55h-11.2V.03h36Z' />
      </g>
      <g>
        <path
          fill='#f7931a'
          d='M429.82,47.34c-2.06,8.24-10.4,13.26-18.65,11.2-8.24-2.06-13.26-10.4-11.2-18.65,2.05-8.24,10.4-13.26,18.64-11.21,8.24,2.06,13.26,10.41,11.2,18.65Z'
        />
        <path
          fill='#fff'
          d='M421.68,41.43c.31-2.05-1.25-3.15-3.38-3.88l.69-2.77-1.69-.42-.67,2.7c-.44-.11-.9-.21-1.35-.32l.68-2.72-1.69-.42-.69,2.77c-.37-.08-.73-.17-1.08-.25h0s-2.33-.59-2.33-.59l-.45,1.8s1.25.29,1.23.3c.68.17.81.62.79.98l-.79,3.16s.11.03.18.06c-.06-.01-.12-.03-.18-.04l-1.1,4.43c-.08.21-.3.52-.77.4.02.02-1.23-.31-1.23-.31l-.84,1.93,2.2.55c.41.1.81.21,1.2.31l-.7,2.81,1.69.42.69-2.78c.46.13.91.24,1.35.35l-.69,2.76,1.69.42.7-2.8c2.88.54,5.04.33,5.95-2.28.73-2.1-.04-3.31-1.55-4.09,1.1-.25,1.93-.98,2.16-2.48ZM417.82,46.84c-.52,2.1-4.05.96-5.2.68l.93-3.72c1.14.29,4.81.85,4.27,3.04ZM418.34,41.4c-.48,1.91-3.41.94-4.37.7l.84-3.37c.95.24,4.02.68,3.53,2.67Z'
        />
      </g>
    </svg>
  );
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navigation: { name: string; href: string }[] = [
    // { name: 'Inicio', href: '/' },
    // { name: 'Comunidades', href: '/communities' },
    // { name: 'Blog', href: '/blog' },
    // { name: 'Asociación', href: '/about-us' },
    // { name: 'Donaciones', href: '/sponsor' },
    // { name: 'Contacto', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className='bg-white/60 sticky top-0 z-50 backdrop-blur-lg'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        <div className='flex justify-center items-center gap-4 h-20'>
          <Link to='/' className=''>
            <Logo className='w-72' />
          </Link>

          {/* Desktop Navigation */}
          {/* <nav className='hidden md:flex space-x-8'>
            {navigation?.length > 0 &&
              navigation?.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-bolt-base transition-colors duration-200 ${
                    isActive(item.href) ? 'text-bitcoin' : 'text-gray-600 hover:text-bitcoin'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
          </nav> */}

          {/* Mobile menu button */}
          {/* <div className='md:hidden'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-bitcoin hover:bg-gray-50 transition-colors duration-200'
            >
              {isMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
            </button>
          </div> */}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className='md:hidden bg-white border-t border-gray-100 animate-slide-up'>
          <div className='px-6 py-4 space-y-2'>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-bolt-base transition-colors duration-200 ${
                  isActive(item.href)
                    ? "text-bitcoin bg-gray-50"
                    : "text-gray-600 hover:text-bitcoin hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
