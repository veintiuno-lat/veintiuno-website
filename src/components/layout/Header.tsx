import React from "react";
import { Link, useLocation } from "react-router-dom";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, useMotionValueEvent, useScroll, useSpring, type MotionValue } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  Cpu,
  KeyRound,
  Layers,
  Menu,
  Palette,
  Shield,
  Store,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { countries } from "@/data/countries";
import { communities } from "@/data/communities";

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


// ---------------------------------------------------------------------------
// Navigation data (single source for desktop + mobile)
// ---------------------------------------------------------------------------

type Icon = React.ComponentType<{ className?: string }>;
type SubItem = { name: string; href: string; hint?: string; icon?: Icon; flag?: string; count?: number };
type NavItem = { name: string; href?: string; items?: SubItem[] };

const CONTACT_URL = "https://tally.so/r/mOv75R";

const countryCounts = communities.reduce<Record<string, number>>((acc, c) => {
  acc[c.country] = (acc[c.country] ?? 0) + 1;
  return acc;
}, {});

const NAV: NavItem[] = [
  { name: "Comunidades", href: "/communities" },
  {
    name: "Países",
    items: countries
      .filter((c) => countryCounts[c.name])
      .sort((a, b) => countryCounts[b.name] - countryCounts[a.name])
      .map((c) => ({ name: c.name, href: `/pais/${c.slug}`, flag: c.code.toLowerCase(), count: countryCounts[c.name] })),
  },
  { name: "Meetups", href: "/meetups" },
  {
    name: "Tarjetas",
    items: [
      { name: "Colección", href: "/cards", hint: "40 obras NFC de la cruzada", icon: Layers },
      { name: "Artistas", href: "/artists", hint: "Quiénes las ilustran", icon: Palette },
    ],
  },
  {
    name: "Misión",
    items: [
      { name: "Nodos", href: "/mission/nodes", hint: "Soberanía desde casa", icon: Cpu },
      { name: "Comercios", href: "/mission/merchants", hint: "Pagos con Lightning", icon: Store },
      { name: "Auto custodia", href: "/mission/self-custody", hint: "Tus llaves, tus bitcoin", icon: KeyRound },
      { name: "Stack", href: "/mission/stack", hint: "El setup completo", icon: Shield },
    ],
  },
  {
    name: "Nosotros",
    items: [
      { name: "Army", href: "/army", hint: "Escuadrones y soldados", icon: Users },
      { name: "Guías", href: "/guias", hint: "Bitcoin en Latinoamérica", icon: BookOpen },
      { name: "Quiénes somos", href: "/sobre-nosotros", hint: "La Cruzada Veintiuno", icon: Shield },
    ],
  },
];

const isActive = (pathname: string, item: NavItem) =>
  item.href ? pathname.startsWith(item.href) : !!item.items?.some((i) => pathname.startsWith(i.href));

// ---------------------------------------------------------------------------
// Scroll behaviour. Reads framer-motion's shared scroll value (measured once per frame in its
// batched read phase) instead of a scroll listener calling window.scrollY — that read forces a
// synchronous style/layout flush whenever parallax transforms were just written (layout thrashing).
// ---------------------------------------------------------------------------

function useHeaderScroll(scrollY: MotionValue<number>) {
  const [state, setState] = React.useState({ scrolled: false, hidden: false });
  const lastY = React.useRef(0);
  useMotionValueEvent(scrollY, "change", (y) => {
    const delta = y - lastY.current;
    if (Math.abs(delta) < 6) return; // ignore jitter / tiny trackpad moves
    lastY.current = y;
    // Hide only after leaving the top area and while moving down; any upward scroll reveals it.
    setState((s) => {
      const next = { scrolled: y > 24, hidden: y > 240 && delta > 0 };
      return next.scrolled === s.scrolled && next.hidden === s.hidden ? s : next;
    });
  });
  return state;
}

// ---------------------------------------------------------------------------
// Desktop: Radix NavigationMenu (keyboard, hover intent, focus, Esc, aria — all built in)
// ---------------------------------------------------------------------------

const triggerClass =
  "group relative flex select-none items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-gray-400 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-bitcoin data-[active]:text-white data-[state=open]:text-white";

function PanelLink({ item }: { item: SubItem }) {
  const Icon = item.icon;
  return (
    <NavigationMenu.Link asChild>
      <Link
        to={item.href}
        className='group flex items-center gap-3 rounded-xl px-3 py-2.5 outline-none transition-colors hover:bg-white/[0.06] focus-visible:bg-white/[0.06]'
      >
        {item.flag && <span className={`fi fi-${item.flag} shrink-0 rounded-sm text-base`} aria-hidden='true' />}
        {Icon && (
          <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-bitcoin transition group-hover:border-bitcoin/40 group-hover:bg-bitcoin/10'>
            <Icon className='h-4 w-4' />
          </span>
        )}
        <span className='min-w-0 flex-1'>
          <span className='block truncate text-sm font-medium text-white transition-colors group-hover:text-bitcoin'>{item.name}</span>
          {item.hint && <span className='block truncate text-xs text-gray-500'>{item.hint}</span>}
        </span>
        {item.count !== undefined && (
          <span className='rounded-full bg-white/5 px-2 py-0.5 text-[11px] tabular-nums text-gray-400'>{item.count}</span>
        )}
      </Link>
    </NavigationMenu.Link>
  );
}

const contentClass =
  "absolute left-0 top-0 w-full p-2 data-[motion=from-end]:animate-in data-[motion=from-start]:animate-in data-[motion=to-end]:animate-out data-[motion=to-start]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-12 data-[motion=from-start]:slide-in-from-left-12 data-[motion=to-end]:slide-out-to-right-12 data-[motion=to-start]:slide-out-to-left-12 md:w-auto";

function DesktopNav({ pathname, onOpenChange }: { pathname: string; onOpenChange: (open: boolean) => void }) {
  const [value, setValue] = React.useState("");
  // Close any open panel on navigation.
  React.useEffect(() => setValue(""), [pathname]);

  return (
    <NavigationMenu.Root
      value={value}
      onValueChange={(v) => {
        setValue(v);
        onOpenChange(!!v);
      }}
      delayDuration={80}
      className='relative z-10 hidden lg:block'
      aria-label='Principal'
    >
      <NavigationMenu.List className='flex items-center'>
        {NAV.map((item) => (
          <NavigationMenu.Item key={item.name} value={item.name}>
            {item.items ? (
              <>
                <NavigationMenu.Trigger className={triggerClass} data-active={isActive(pathname, item) || undefined}>
                  {item.name}
                  <ChevronDown aria-hidden className='h-3.5 w-3.5 transition-transform duration-300 group-data-[state=open]:rotate-180' />
                  {isActive(pathname, item) && <ActiveDot />}
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className={contentClass}>
                  {item.name === "Países" ? (
                    <div className='w-[34rem]'>
                      <div className='grid grid-cols-2 gap-1'>
                        {item.items.map((sub) => (
                          <PanelLink key={sub.href} item={sub} />
                        ))}
                      </div>
                      <NavigationMenu.Link asChild>
                        <Link
                          to='/communities'
                          className='mt-2 flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm text-gray-300 transition hover:border-bitcoin/40 hover:text-white'
                        >
                          Explorar el mapa de comunidades
                          <ArrowUpRight className='h-4 w-4 text-bitcoin' />
                        </Link>
                      </NavigationMenu.Link>
                    </div>
                  ) : item.name === "Tarjetas" ? (
                    <div className='grid w-[30rem] grid-cols-[11rem_1fr] gap-2'>
                      <NavigationMenu.Link asChild>
                        <Link to='/cards' className='group relative overflow-hidden rounded-xl border border-white/10'>
                          <img
                            src='/images/card-images/card2-40.png'
                            alt=''
                            className='h-full w-full object-cover transition duration-700 group-hover:scale-110'
                          />
                          <span className='absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent' />
                          <span className='absolute bottom-3 left-3 font-display text-xl uppercase text-white'>40 obras</span>
                        </Link>
                      </NavigationMenu.Link>
                      <div className='flex flex-col justify-center gap-1'>
                        {item.items.map((sub) => (
                          <PanelLink key={sub.href} item={sub} />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className='grid w-[22rem] gap-1'>
                      {item.items.map((sub) => (
                        <PanelLink key={sub.href} item={sub} />
                      ))}
                    </div>
                  )}
                </NavigationMenu.Content>
              </>
            ) : (
              <NavigationMenu.Link asChild active={isActive(pathname, item)}>
                <Link to={item.href!} className={triggerClass}>
                  {item.name}
                  {isActive(pathname, item) && <ActiveDot />}
                </Link>
              </NavigationMenu.Link>
            )}
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>

      {/* One shared panel that morphs its size between menus */}
      <div className='absolute left-1/2 top-full flex -translate-x-1/2 justify-center pt-4'>
        <NavigationMenu.Viewport className='relative h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] origin-top overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] transition-[width,height] duration-300 ease-out data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out data-[state=open]:fade-in data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95' />
      </div>
    </NavigationMenu.Root>
  );
}

function ActiveDot() {
  return (
    <motion.span
      layoutId='nav-active-dot'
      aria-hidden='true'
      className='absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-bitcoin shadow-[0_0_8px_#F7931A]'
    />
  );
}

// ---------------------------------------------------------------------------
// Mobile: Radix Dialog (focus trap, scroll lock, Esc, focus return — all built in)
// ---------------------------------------------------------------------------

function MobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => setOpen(false), [pathname]);
  let i = 0; // stagger index across all rows

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label='Abrir menú'
        className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden'
      >
        <Menu className='h-5 w-5' />
      </Dialog.Trigger>
      <Dialog.Portal>
        {/* Overlay is where Radix applies the page scroll lock — required even though Content is full-screen */}
        <Dialog.Overlay className='fixed inset-0 z-[69] bg-ink-950/80 data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out data-[state=open]:fade-in lg:hidden' />
        <Dialog.Content
          aria-describedby={undefined}
          data-lenis-prevent
          className='fixed inset-0 z-[70] overflow-y-auto bg-ink-950 px-5 pb-12 pt-3 duration-500 data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out data-[state=open]:fade-in data-[state=open]:slide-in-from-top-4 lg:hidden'
        >
          <Dialog.Title className='sr-only'>Menú</Dialog.Title>
          <div aria-hidden='true' className='pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgba(247,147,26,0.2),transparent)]' />

          <div className='relative flex items-center justify-between rounded-full border border-white/10 bg-ink-950/70 px-4 py-2'>
            <Link to='/' className='text-white' aria-label='Veintiuno.lat — inicio'>
              <Logo className='h-auto w-40 fill-current' />
            </Link>
            <Dialog.Close
              aria-label='Cerrar menú'
              className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white'
            >
              <X className='h-5 w-5' />
            </Dialog.Close>
          </div>

          <nav className='relative mt-10 space-y-9' aria-label='Principal'>
            {NAV.map((item) => (
              <div
                key={item.name}
                className='animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500'
                style={{ animationDelay: `${80 + i++ * 50}ms` }}
              >
                {item.href ? (
                  <Link
                    to={item.href}
                    className={cn("display block text-[clamp(2rem,10.5vw,3rem)]", isActive(pathname, item) ? "text-bitcoin" : "text-white")}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <>
                    <div className='mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-bitcoin'>{item.name}</div>
                    <div className='flex flex-wrap gap-2'>
                      {item.items!.map((sub) => (
                        <Link key={sub.href} to={sub.href} className={cn("chip", pathname.startsWith(sub.href) && "chip-active")}>
                          {sub.flag && <span className={`fi fi-${sub.flag} rounded-sm`} aria-hidden='true' />}
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
            <a
              href={CONTACT_URL}
              target='_blank'
              rel='noopener noreferrer'
              className='btn btn-md btn-primary w-full animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500'
              style={{ animationDelay: `${80 + i * 50}ms` }}
            >
              Contacto <ArrowUpRight className='h-4 w-4' />
            </a>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// ---------------------------------------------------------------------------
// Header shell
// ---------------------------------------------------------------------------

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const { scrollY, scrollYProgress } = useScroll();
  const { scrolled, hidden } = useHeaderScroll(scrollY);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const visible = !hidden || menuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:pt-4",
          !visible && "-translate-y-[120%]"
        )}
      >
        <div
          className={cn(
            "flex w-full max-w-6xl items-center justify-between gap-4 rounded-full border px-4 py-2 transition-[background-color,border-color,box-shadow] duration-500 md:px-5",
            scrolled || menuOpen
              ? "border-white/10 bg-ink-950/70 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] backdrop-blur-md"
              : "border-transparent bg-transparent"
          )}
        >
          <Link to='/' className='shrink-0 text-white' aria-label='Veintiuno.lat — inicio'>
            <Logo className='h-auto w-40 fill-current md:w-48' />
          </Link>

          <DesktopNav pathname={pathname} onOpenChange={setMenuOpen} />

          <div className='flex items-center gap-2'>
            <a
              href={CONTACT_URL}
              target='_blank'
              rel='noopener noreferrer'
              className='hidden items-center gap-1.5 rounded-full bg-bitcoin px-4 py-2 text-sm font-semibold text-ink-950 transition hover:bg-glow hover:shadow-glow sm:inline-flex'
            >
              Contacto <ArrowUpRight className='h-4 w-4' />
            </a>
            <MobileNav pathname={pathname} />
          </div>
        </div>
      </header>

      {/* Reading progress */}
      <motion.div
        aria-hidden='true'
        className='fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-bitcoin via-glow to-gold-500'
        style={{ scaleX: progress }}
      />
    </>
  );
};

export default Header;
