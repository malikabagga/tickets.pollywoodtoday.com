import { Globe, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import { BRAND_LOGO_URL, CITIES, CityName } from '../data/catalog';
import { AppView } from '../types';

interface FooterProps {
  onNavigate: (view: AppView) => void;
  onSelectCity: (city: CityName) => void;
}

export function Footer({ onNavigate, onSelectCity }: FooterProps) {
  const handleNav = (view: AppView) => {
    onNavigate(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-white/[0.08] bg-[#0D0B14]">
      <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div>
            <button
              type="button"
              onClick={() => handleNav('home')}
              className="inline-block h-11 w-[124px] overflow-hidden rounded-[4px] bg-black ring-1 ring-white/15"
              aria-label="Pollywood Today Home"
            >
              <img
                src={BRAND_LOGO_URL}
                alt="Pollywood Today"
                className="h-full w-full object-cover object-center scale-[1.06]"
                referrerPolicy="no-referrer"
              />
            </button>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#9F98B2]">
              Your premier destination for Punjabi &amp; Bollywood theatrical premieres, live arena
              concerts, Sufi nights, and touring comedy across North India.
            </p>
            <p className="mt-3 text-xs text-[#7E7694]">
              Frontend booking demonstration · pollywoodtoday.com
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="font-display text-sm font-bold text-white">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#A59EB8]">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('movies')}
                  className="hover:text-white transition-colors"
                >
                  Now Showing Movies
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('live-shows')}
                  className="hover:text-white transition-colors"
                >
                  Live Shows &amp; Concerts
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('events')}
                  className="hover:text-white transition-colors"
                >
                  Cultural &amp; Sufi Events
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('bookings')}
                  className="hover:text-white transition-colors"
                >
                  My Demo Bookings
                </button>
              </li>
            </ul>
          </div>

          {/* Cities Column */}
          <div>
            <h3 className="font-display text-sm font-bold text-white">Cities We Cover</h3>
            <ul className="mt-4 grid grid-cols-2 gap-y-2.5 gap-x-4 text-sm text-[#A59EB8]">
              {CITIES.map((city) => (
                <li key={city}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectCity(city);
                      handleNav('movies');
                    }}
                    className="hover:text-white transition-colors text-left"
                  >
                    {city}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social Column */}
          <div>
            <h3 className="font-display text-sm font-bold text-white">Contact Us</h3>
            <ul className="mt-4 space-y-3 text-sm text-[#A59EB8]">
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-[#E11D48]" />
                <span className="tabular-nums">+91 172 480 2900</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-[#E11D48]" />
                <span>support@pollywoodtoday.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#E11D48]" />
                <span>SCO 42, Sector 17-E, Chandigarh 160017</span>
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-3">
              <a
                href="#instagram"
                onClick={(e) => {
                  e.preventDefault();
                  handleNav('home');
                }}
                aria-label="Pollywood Today Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#171424] text-[#BDB6CF] transition-colors hover:border-[#E11D48]/60 hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#youtube"
                onClick={(e) => {
                  e.preventDefault();
                  handleNav('home');
                }}
                aria-label="Pollywood Today YouTube"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#171424] text-[#BDB6CF] transition-colors hover:border-[#E11D48]/60 hover:text-white"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="#website"
                onClick={(e) => {
                  e.preventDefault();
                  handleNav('home');
                }}
                aria-label="Pollywood Today Website"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#171424] text-[#BDB6CF] transition-colors hover:border-[#D4AF37]/60 hover:text-white"
              >
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 text-xs text-[#807896] sm:flex-row">
          <p>© {new Date().getFullYear()} Pollywood Today (pollywoodtoday.com). All rights reserved.</p>
          <p>
            Developed by <span className="font-medium text-[#CFCADF]">Browsera Infotech</span>
            <span aria-hidden="true" className="mx-2 text-white/20">
              ·
            </span>
            Interactive Frontend Demo
          </p>
        </div>
      </div>
    </footer>
  );
}
