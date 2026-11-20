import { Calendar, Film, Sparkles } from 'lucide-react';
import { CityName, HERO_BANNER_URL, SHOW_DATES } from '../data/catalog';
import { ShowDateOption } from '../types';

interface HeroSectionProps {
  selectedCity: CityName;
  selectedDate: ShowDateOption;
  onSelectDate: (date: ShowDateOption) => void;
  onExploreMovies: () => void;
  onExploreEvents: () => void;
}

export function HeroSection({
  selectedCity,
  selectedDate,
  onSelectDate,
  onExploreMovies,
  onExploreEvents,
}: HeroSectionProps) {
  return (
    <section className="relative">
      {/* Full-bleed Cinematic Auditorium Banner */}
      <div className="relative min-h-[460px] sm:min-h-[540px] lg:min-h-[600px] w-full overflow-hidden">
        <img
          src={HERO_BANNER_URL}
          alt="Pollywood Today luxury cinema auditorium with crimson velvet seats"
          referrerPolicy="no-referrer"
          className="absolute inset-0 h-full w-full object-cover object-center scale-[1.01]"
        />

        {/* Measured multi-stop dark obsidian & deep plum contrast scrims */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#09080E]/95 via-[#110C1D]/76 to-[#09080E]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09080E] via-[#09080E]/30 to-[#09080E]/50" />

        {/* Hero Foreground Content */}
        <div className="relative mx-auto flex min-h-[460px] sm:min-h-[540px] lg:min-h-[600px] max-w-[1280px] flex-col justify-center px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs sm:text-sm font-medium tracking-wide text-[#D4AF37]">
              Pollywood Today · {selectedCity} Box Office
            </p>

            <h1 className="font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              Watch Your Favorite Punjabi &amp; Bollywood Cinema on the Big Screen
            </h1>

            <p className="mt-4 sm:mt-5 max-w-xl text-sm sm:text-base lg:text-lg leading-relaxed text-[#CFCADF]">
              Reserve plush cinema seats, front-row Sufi evenings, and sold-out Punjabi arena
              concerts across Punjab and North India in seconds.
            </p>

            <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={onExploreMovies}
                className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2.5 rounded-lg bg-[#E11D48] px-7 text-sm font-semibold text-white whitespace-nowrap shrink-0 shadow-lg shadow-[#E11D48]/25 transition-all duration-150 hover:bg-[#BE123C] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09080E]"
              >
                <Film className="h-4 w-4" />
                Explore Movies
              </button>

              <button
                type="button"
                onClick={onExploreEvents}
                className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2.5 rounded-lg border border-white/25 bg-[#151123]/75 px-7 text-sm font-semibold text-white whitespace-nowrap shrink-0 backdrop-blur-sm transition-all duration-150 hover:border-[#D4AF37]/70 hover:bg-[#211A36] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                <Sparkles className="h-4 w-4 text-[#D4AF37]" />
                Explore Events
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Date Selector Strip (Touch-snapping on Mobile & Tablet) */}
      <div className="relative z-10 mx-auto -mt-8 sm:-mt-10 max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-white/[0.08] bg-[#14111F]/95 p-2 shadow-2xl shadow-black/50 backdrop-blur-md">
          <div className="no-scrollbar flex snap-x snap-mandatory items-center gap-1.5 overflow-x-auto">
            <div className="hidden lg:flex items-center gap-2 px-4 text-xs font-medium text-[#9F98B2] whitespace-nowrap shrink-0 border-r border-white/[0.08] mr-1">
              <Calendar className="h-4 w-4 text-[#D4AF37]" />
              <span>Show Date</span>
            </div>

            {SHOW_DATES.map((dateOpt) => {
              const isSelected = dateOpt.id === selectedDate.id;
              return (
                <button
                  key={dateOpt.id}
                  type="button"
                  onClick={() => onSelectDate(dateOpt)}
                  className={`flex min-w-[88px] sm:min-w-[98px] flex-1 snap-start flex-col items-center justify-center rounded-lg px-3 py-2.5 text-center transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48] ${
                    isSelected
                      ? 'bg-[#2A2242] text-white ring-1 ring-[#D4AF37]/40'
                      : 'text-[#A59EB8] hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  <span className={`text-xs sm:text-sm font-semibold ${isSelected ? 'text-white' : ''}`}>
                    {dateOpt.dayLabel}
                  </span>
                  <span
                    className={`mt-0.5 text-[11px] sm:text-xs tabular-nums ${
                      isSelected ? 'text-[#D4AF37]' : 'text-[#867F9B]'
                    }`}
                  >
                    {dateOpt.dateLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
