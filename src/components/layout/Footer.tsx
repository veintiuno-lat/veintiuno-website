import React from "react";
import { Heart } from "lucide-react";

import { NostrIcon } from "../icons/nostr";
import { X } from "../icons/x";
import { Github } from "../icons/github";

const Footer: React.FC = () => {
  return (
    <footer className='bg-white border-t border-gray-100'>
      <div className='container py-16'>
        <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
          <div className='flex gap-2'>
            <p className='text-gray-500 text-sm'>© 2025 VEINTIUNO.LAT.</p>
            {/* Block Info */}
            <div className='text-sm text-gray-500'>
              <p>
                Creado en{" "}
                <a
                  href='https://mempool.space/block/900285'
                  target='_blank'
                  className='text-bitcoin hover:text-bitcoin-dark transition-colors duration-200 font-mono'
                >
                  #900.285
                </a>
              </p>
            </div>
          </div>
          <div className='flex items-center gap-2 py-4'>
            <a
              href='https://twitter.com/veintiunolat'
              target='_blank'
              className='btn btn-sm btn-link'
              aria-label='Twitter'
            >
              <X className='h-6 w-6' />
            </a>
            <a
              href='https://njump.me/npub1lf9fja3zalzrxe3y60hv7eaf348a7zz6spmt6nd2s8ttmms6ms5sa73gcz'
              target='_blank'
              className='btn btn-sm btn-link'
              aria-label='Nostr'
            >
              <NostrIcon className='h-5 w-5' />
            </a>
            <a
              href='https://github.com/veintiuno-lat'
              target='_blank'
              className='btn btn-sm btn-link'
              aria-label='Github'
            >
              <Github className='h-7 w-7' />
            </a>
          </div>
          <div className='flex items-center space-x-2 text-gray-500 text-sm mt-4 sm:mt-0'>
            <span>Hecho con</span>
            <Heart className='h-4 w-4 text-bitcoin fill-current' />
            <span>
              por{" "}
              <a
                href='https://lacrypta.ar'
                target='_blank'
                className='text-bitcoin hover:text-bitcoin-dark transition-colors duration-200 font-mono'
              >
                La Crypta
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
