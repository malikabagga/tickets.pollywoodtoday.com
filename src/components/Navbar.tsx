import { useState } from 'react';
import { ChevronDown, MapPin, Menu, X } from 'lucide-react';
import { BRAND_LOGO_URL, CityName } from '../data/catalog';
import { AppView } from '../types';

interface NavbarProps {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  selectedCity: CityName;
  onOpenCityModal: () => void;
  bookingsCount: number;
}

const NAV_ITEMS: { id: AppView; label: string }[] = [
  { id: 'movies', label: 'Movies' },
  { id: 'live-shows', label: 'Live Shows' },
  { id: 'events', label: 'Events' },
  { id: 'bookings', label: 'My Bookings' },
];

export function Navbar({
  activeView,
  onNavigate,
  selectedCity,
  onOpenCityModal,
  bookingsCount,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: AppView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#09080E]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-3 sm:gap-5 lg:gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Logo */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="group flex shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48] rounded"
          aria-label="Pollywood Today Home"
        >
          <span className="block h-9 w-[96px] sm:h-10 sm:w-[108px] overflow-hidden rounded-[4px] bg-black ring-1 ring-white/15 transition-transform duration-150 group-hover:scale-[1.02]">
            <img
              src={BRAND_LOGO_URL}
              alt="Pollywood Today"
              className="h-full w-full object-cover object-center scale-[1.06]"
              referrerPolicy="no-referrer"
            />
          </span>
        </button>

        {/* Zone 2: Clean Single-Line Navigation Links */}
        <nav className="hidden md:flex items-center md:gap-5 lg:gap-8" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeView === item.id;
            const label =
              item.id === 'bookings' && bookingsCount > 0
                ? `${item.label} (${bookingsCount})`
                : item.label;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48] rounded-sm ${
                  isActive
                    ? 'text-white'
                    : 'text-[#B8B2C8] hover:text-white'
                }`}
              >
                {label}
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-[21px] h-[2px] bg-[#E11D48]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: City Location Selector (Primary Bar Action) + Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCityModal}
            className="inline-flex h-10 sm:h-10 items-center gap-1.5 sm:gap-2 rounded-lg border border-white/12 bg-[#161322] px-3 sm:px-3.5 text-xs sm:text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-[#D4AF37]/50 hover:bg-[#1E1A2E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48]"
            aria-label={`Selected city: ${selectedCity}. Change location`}
          >
            <MapPin className="h-4 w-4 text-[#E11D48] shrink-0" />
            <span className="max-w-[84px] sm:max-w-[115px] truncate">{selectedCity}</span>
            <ChevronDown className="h-3.5 w-3.5 text-[#9F98B2] shrink-0" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-[#161322] text-white md:hidden hover:bg-[#1E1A2E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48]"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-white/[0.08] bg-[#100D18] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className={`flex h-11 items-center rounded-lg px-3 text-left text-sm font-medium transition-colors ${
                activeView === 'home'
                  ? 'bg-[#1D182D] text-white'
                  : 'text-[#B8B2C8] hover:bg-white/[0.04] hover:text-white'
              }`}
            >
              Home
            </button>
            {NAV_ITEMS.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`flex h-11 items-center justify-between rounded-lg px-3 text-left text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#1D182D] text-white'
                      : 'text-[#B8B2C8] hover:bg-white/[0.04] hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.id === 'bookings' && bookingsCount > 0 && (
                    <span className="font-mono text-xs text-[#D4AF37] tabular-nums">
                      {bookingsCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
