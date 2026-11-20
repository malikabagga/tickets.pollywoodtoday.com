import { useEffect, useMemo, useState } from 'react';
import {
  Armchair,
  Bell,
  BellRing,
  Calendar,
  ChevronRight,
  Film,
  Search,
  ShieldCheck,
  Sparkles,
  Ticket,
} from 'lucide-react';
import { CityModal } from './components/CityModal';
import { EventBookingModal } from './components/EventBookingModal';
import { EventCard } from './components/EventCard';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { MediaImage } from './components/MediaImage';
import { MovieBookingModal } from './components/MovieBookingModal';
import { MovieCard } from './components/MovieCard';
import { MyBookingsView } from './components/MyBookingsView';
import { Navbar } from './components/Navbar';
import { CityName, LIVE_EVENTS, MOVIES, SHOW_DATES } from './data/catalog';
import { useSeoMetadata } from './hooks/useSeoMetadata';
import { AppView, DemoBooking, LiveEvent, Movie, ShowDateOption } from './types';

const STORAGE_BOOKINGS_KEY = 'pollywood_today_demo_bookings_v1';
const STORAGE_NOTIFIED_KEY = 'pollywood_today_demo_reminders_v1';

const WHY_BOOK_ITEMS = [
  {
    icon: Armchair,
    title: 'Real-Time Interactive Seat Map',
    description:
      'Compare Royal Recliners, Gold Executive, and Silver Classic views before confirming your cinema seats.',
  },
  {
    icon: Film,
    title: 'Punjab & Bollywood Premieres First',
    description:
      'Curated showtimes across leading multiplexes in Chandigarh, Mohali, Ludhiana, Amritsar, Jalandhar, and Delhi NCR.',
  },
  {
    icon: Sparkles,
    title: 'Arena Concerts & Sufi Evenings',
    description:
      'Direct access to Fan Pit passes, Gold Lounges, and intimate comedy auditoriums for Punjab’s biggest live nights.',
  },
  {
    icon: ShieldCheck,
    title: 'Instant Digital Demo Passes',
    description:
      'Transparent seat pricing and instant QR-coded passes saved directly in your Pollywood Today booking wallet.',
  },
];

export default function App() {
  const [activeView, setActiveView] = useState<AppView>('home');
  const [selectedCity, setSelectedCity] = useState<CityName>('Chandigarh');
  const [selectedDate, setSelectedDate] = useState<ShowDateOption>(SHOW_DATES[0]);
  const [cityModalOpen, setCityModalOpen] = useState(false);

  useSeoMetadata(activeView, selectedCity);

  // Filters for homepage & dedicated views
  const [nowShowingLang, setNowShowingLang] = useState<'All' | 'Punjabi' | 'Hindi'>('All');
  const [movieSearch, setMovieSearch] = useState('');
  const [movieLangFilter, setMovieLangFilter] = useState<'All' | 'Punjabi' | 'Hindi'>('All');
  const [eventCategoryFilter, setEventCategoryFilter] = useState<
    'All' | 'Live Concert' | 'Sufi Night' | 'Stand-Up Comedy'
  >('All');

  // Active booking modals
  const [activeMovieModal, setActiveMovieModal] = useState<{
    movie: Movie;
    initialStep: 'details' | 'showtimes';
  } | null>(null);
  const [activeEventModal, setActiveEventModal] = useState<LiveEvent | null>(null);

  // Persisted demo bookings & upcoming reminders
  const [bookings, setBookings] = useState<DemoBooking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_BOOKINGS_KEY);
      return saved ? (JSON.parse(saved) as DemoBooking[]) : [];
    } catch {
      return [];
    }
  });

  const [notifiedMovieIds, setNotifiedMovieIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_NOTIFIED_KEY);
      return saved ? (JSON.parse(saved) as string[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_BOOKINGS_KEY, JSON.stringify(bookings));
    } catch {
      // Ignore storage quota errors in restricted sandboxes
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_NOTIFIED_KEY, JSON.stringify(notifiedMovieIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [notifiedMovieIds]);

  const nowShowingMovies = useMemo(() => {
    const base = MOVIES.filter((m) => m.section === 'now-showing');
    if (nowShowingLang === 'All') return base;
    return MOVIES.filter(
      (m) => m.section !== 'upcoming' && m.language === nowShowingLang
    ).slice(0, 4);
  }, [nowShowingLang]);

  const trendingPunjabiMovies = useMemo(
    () => MOVIES.filter((m) => m.section === 'trending-punjabi'),
    []
  );

  const upcomingMovies = useMemo(
    () => MOVIES.filter((m) => m.section === 'upcoming'),
    []
  );

  const filteredAllMovies = useMemo(() => {
    const q = movieSearch.trim().toLowerCase();
    return MOVIES.filter((m) => {
      if (movieLangFilter !== 'All' && m.language !== movieLangFilter) return false;
      if (!q) return true;
      return (
        m.title.toLowerCase().includes(q) ||
        m.genre.toLowerCase().includes(q) ||
        m.cast.some((c) => c.toLowerCase().includes(q)) ||
        m.language.toLowerCase().includes(q)
      );
    });
  }, [movieSearch, movieLangFilter]);

  const filteredEvents = useMemo(() => {
    if (activeView === 'live-shows') {
      return LIVE_EVENTS.filter((e) => e.kind === 'live-show');
    }
    if (eventCategoryFilter === 'All') return LIVE_EVENTS;
    return LIVE_EVENTS.filter((e) => e.category === eventCategoryFilter);
  }, [activeView, eventCategoryFilter]);

  const handleOpenMovieDetails = (movie: Movie) => {
    setActiveMovieModal({ movie, initialStep: 'details' });
  };

  const handleOpenMovieBooking = (movie: Movie) => {
    setActiveMovieModal({
      movie,
      initialStep: movie.section === 'upcoming' ? 'details' : 'showtimes',
    });
  };

  const handleToggleNotify = (movieId: string) => {
    setNotifiedMovieIds((prev) =>
      prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
    );
  };

  const handleAddBooking = (record: DemoBooking) => {
    setBookings((prev) => [record, ...prev]);
  };

  const handleRemoveBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.bookingId !== bookingId));
  };

  const scrollToSection = (sectionId: string) => {
    if (activeView !== 'home') {
      setActiveView('home');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
      return;
    }
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-[#09080E] text-[#F5F3FA] flex flex-col">
      <Navbar
        activeView={activeView}
        onNavigate={(view) => {
          setActiveView(view);
          if (view === 'events') setEventCategoryFilter('All');
        }}
        selectedCity={selectedCity}
        onOpenCityModal={() => setCityModalOpen(true)}
        bookingsCount={bookings.length}
      />

      <main className="flex-1">
        {/* HOME VIEW */}
        {activeView === 'home' && (
          <>
            {/* 1. Large Cinematic Hero Banner + Date Selector Bar */}
            <HeroSection
              selectedCity={selectedCity}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              onExploreMovies={() => scrollToSection('now-showing')}
              onExploreEvents={() => scrollToSection('live-events')}
            />

            {/* 2. Now Showing Movies */}
            <section
              id="now-showing"
              className="mx-auto max-w-[1280px] px-4 pt-14 sm:px-6 lg:px-8"
            >
              <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-medium text-[#D4AF37]">
                    Playing in {selectedCity} · {selectedDate.fullDate}
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
                    Now Showing
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Functional Language Filter Segmented Control */}
                  <div
                    className="inline-flex items-center gap-1 rounded-lg border border-white/[0.08] bg-[#14111F] p-1"
                    role="group"
                    aria-label="Filter now showing movies by language"
                  >
                    {(['All', 'Punjabi', 'Hindi'] as const).map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setNowShowingLang(lang)}
                        className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                          nowShowingLang === lang
                            ? 'bg-[#2B204A] text-white'
                            : 'text-[#A39CB8] hover:text-white'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveView('movies');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1 text-sm font-medium text-[#D4AF37] hover:text-[#F3D26B] whitespace-nowrap transition-colors"
                  >
                    <span>View All</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {nowShowingMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onBookTickets={handleOpenMovieBooking}
                    onOpenDetails={handleOpenMovieDetails}
                  />
                ))}
              </div>
            </section>

            {/* 3. Trending Punjabi Movies (3-Column Spotlight matching Attachment 3) */}
            <section
              id="trending-punjabi"
              className="mx-auto max-w-[1280px] px-4 pt-20 sm:px-6 lg:px-8"
            >
              <div className="mb-7 flex flex-col justify-between gap-3 border-t border-white/[0.07] pt-12 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-medium text-[#E11D48]">Pollywood Box Office Picks</p>
                  <h2 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
                    Trending Punjabi Movies
                  </h2>
                  <p className="mt-1.5 text-sm text-[#A39CB8]">
                    The highest-rated Punjabi theatrical releases packing auditoriums across Punjab
                    this week.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMovieLangFilter('Punjabi');
                    setActiveView('movies');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1 text-sm font-medium text-[#D4AF37] hover:text-[#F3D26B] whitespace-nowrap self-start sm:self-end transition-colors"
                >
                  <span>All Punjabi Films</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
                {trendingPunjabiMovies.map((movie, idx) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    variant="trending"
                    rankIndex={idx}
                    onBookTickets={handleOpenMovieBooking}
                    onOpenDetails={handleOpenMovieDetails}
                  />
                ))}
              </div>
            </section>

            {/* 4. Live Shows & Events (3-Column Showcase matching Attachment 4) */}
            <section
              id="live-events"
              className="mx-auto max-w-[1280px] px-4 pt-20 sm:px-6 lg:px-8"
            >
              <div className="mb-7 flex flex-col justify-between gap-3 border-t border-white/[0.07] pt-12 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-medium text-[#D4AF37]">
                    Concerts · Sufi Nights · Comedy Tours
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
                    Live Shows &amp; Events
                  </h2>
                  <p className="mt-1.5 text-sm text-[#A39CB8]">
                    Reserve Fan Pit passes, cushioned Sufi baithak seats, and front-row comedy
                    nights.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActiveView('events');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1 text-sm font-medium text-[#D4AF37] hover:text-[#F3D26B] whitespace-nowrap self-start sm:self-end transition-colors"
                >
                  <span>Explore All Events</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
                {LIVE_EVENTS.map((ev) => (
                  <EventCard key={ev.id} event={ev} onBookEvent={setActiveEventModal} />
                ))}
              </div>
            </section>

            {/* 5. Upcoming Movies (2-Column Editorial Premiere Cards) */}
            <section
              id="upcoming-movies"
              className="mx-auto max-w-[1280px] px-4 pt-20 sm:px-6 lg:px-8"
            >
              <div className="mb-7 border-t border-white/[0.07] pt-12">
                <p className="text-xs font-medium text-[#E11D48]">Coming Soon to Theaters</p>
                <h2 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
                  Upcoming Movies
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {upcomingMovies.map((movie) => {
                  const isNotified = notifiedMovieIds.includes(movie.id);
                  return (
                    <article
                      key={movie.id}
                      className="flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#13111C] sm:flex-row"
                    >
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => handleOpenMovieDetails(movie)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleOpenMovieDetails(movie);
                          }
                        }}
                        className="relative aspect-[3/4] w-full shrink-0 cursor-pointer overflow-hidden bg-[#1A1727] sm:aspect-auto sm:w-48"
                      >
                        <MediaImage
                          src={movie.poster}
                          alt={`${movie.title} upcoming poster`}
                          fallbackTitle={movie.title}
                          className="h-full w-full object-cover object-top transition-transform duration-300 hover:scale-[1.03]"
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#D4AF37]">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{movie.releaseDate}</span>
                          </div>

                          <h3 className="mt-2 font-display text-xl font-bold text-white">
                            {movie.title}
                          </h3>
                          <p className="mt-1 text-xs text-[#A39CB8]">
                            {movie.language} · {movie.genre} · {movie.formats.join(', ')}
                          </p>

                          <p className="mt-3 text-sm leading-relaxed text-[#BDB6CF] line-clamp-3">
                            {movie.synopsis}
                          </p>

                          <p className="mt-3 text-xs text-[#958EAD]">
                            Starring: <span className="text-[#DCD7EB]">{movie.cast.join(', ')}</span>
                          </p>
                        </div>

                        <div className="mt-5 flex flex-wrap items-center gap-3 pt-4 border-t border-white/[0.07]">
                          <button
                            type="button"
                            onClick={() => handleToggleNotify(movie.id)}
                            className={`inline-flex h-10 items-center gap-2 rounded-lg px-4 text-xs font-semibold whitespace-nowrap transition-colors ${
                              isNotified
                                ? 'bg-[#2B204A] text-[#D4AF37] ring-1 ring-[#D4AF37]/40'
                                : 'bg-[#E11D48] text-white hover:bg-[#BE123C]'
                            }`}
                          >
                            {isNotified ? (
                              <>
                                <BellRing className="h-3.5 w-3.5" />
                                Reminder Set
                              </>
                            ) : (
                              <>
                                <Bell className="h-3.5 w-3.5" />
                                Notify Me
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleOpenMovieDetails(movie)}
                            className="inline-flex h-10 items-center gap-1 rounded-lg bg-[#1F1A31] px-4 text-xs font-medium text-[#DFDAE9] hover:bg-[#2B2444] hover:text-white transition-colors"
                          >
                            Movie Details
                            <ChevronRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* 6. Why Book With Pollywood Today */}
            <section className="mx-auto max-w-[1280px] px-4 pt-20 sm:px-6 lg:px-8">
              <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#161224] via-[#12101B] to-[#1A101E] p-7 sm:p-10">
                <div className="max-w-2xl">
                  <p className="text-xs font-medium text-[#D4AF37]">Built for Cinema &amp; Live Culture</p>
                  <h2 className="mt-1.5 font-display text-2xl font-bold text-white sm:text-3xl">
                    Why Book With Pollywood Today
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#A8A1BC]">
                    Crafted specifically for Punjab’s vibrant cinema halls and live music circuit—with
                    transparent pricing, clear seat views, and effortless digital passes.
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {WHY_BOOK_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="rounded-xl border border-white/[0.07] bg-[#0E0C16]/75 p-5"
                      >
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#241B3B] text-[#D4AF37]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="mt-4 font-display text-base font-bold text-white">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-[#A39CB8]">
                          {item.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </>
        )}

        {/* DEDICATED MOVIES CATALOG VIEW */}
        {activeView === 'movies' && (
          <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col justify-between gap-5 border-b border-white/[0.08] pb-6 lg:flex-row lg:items-end">
              <div>
                <p className="text-xs font-medium text-[#D4AF37]">
                  {selectedCity} · {selectedDate.fullDate}
                </p>
                <h1 className="mt-1 font-display text-3xl font-bold text-white">
                  Movies in {selectedCity}
                </h1>
                <p className="mt-1.5 text-sm text-[#A59EB8]">
                  Browse all Punjabi and Bollywood releases, compare showtimes, and pick your exact
                  seats.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 sm:w-64 sm:flex-none">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8C84A4]" />
                  <input
                    type="search"
                    value={movieSearch}
                    onChange={(e) => setMovieSearch(e.target.value)}
                    placeholder="Search title, genre, cast..."
                    aria-label="Search movies"
                    className="h-10 w-full rounded-lg border border-white/12 bg-[#14111F] pl-10 pr-4 text-sm text-white placeholder-[#7D7594] focus:border-[#E11D48] focus:outline-none"
                  />
                </div>

                <div className="inline-flex items-center gap-1 rounded-lg border border-white/[0.08] bg-[#14111F] p-1">
                  {(['All', 'Punjabi', 'Hindi'] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setMovieLangFilter(lang)}
                      className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors ${
                        movieLangFilter === lang
                          ? 'bg-[#E11D48] text-white'
                          : 'text-[#A39CB8] hover:text-white'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {filteredAllMovies.length === 0 ? (
              <div className="rounded-2xl border border-white/[0.08] bg-[#13111C] p-12 text-center">
                <p className="text-base font-medium text-white">No movies match your search.</p>
                <button
                  type="button"
                  onClick={() => {
                    setMovieSearch('');
                    setMovieLangFilter('All');
                  }}
                  className="mt-4 inline-flex h-10 items-center rounded-lg bg-[#2B204A] px-5 text-xs font-semibold text-white hover:bg-[#3A2B66]"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredAllMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onBookTickets={handleOpenMovieBooking}
                    onOpenDetails={handleOpenMovieDetails}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* DEDICATED LIVE SHOWS & EVENTS VIEWS */}
        {(activeView === 'live-shows' || activeView === 'events') && (
          <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col justify-between gap-4 border-b border-white/[0.08] pb-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-medium text-[#D4AF37]">Pollywood Today Live</p>
                <h1 className="mt-1 font-display text-3xl font-bold text-white">
                  {activeView === 'live-shows' ? 'Live Shows & Tours' : 'Events & Experiences'}
                </h1>
                <p className="mt-1.5 text-sm text-[#A59EB8]">
                  Select your pass tier and quantity for instant demo booking confirmation.
                </p>
              </div>

              {activeView === 'events' && (
                <div className="inline-flex flex-wrap items-center gap-1 rounded-lg border border-white/[0.08] bg-[#14111F] p-1">
                  {(['All', 'Live Concert', 'Sufi Night', 'Stand-Up Comedy'] as const).map(
                    (cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setEventCategoryFilter(cat)}
                        className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                          eventCategoryFilter === cat
                            ? 'bg-[#E11D48] text-white'
                            : 'text-[#A39CB8] hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {filteredEvents.map((ev) => (
                <EventCard key={ev.id} event={ev} onBookEvent={setActiveEventModal} />
              ))}
            </div>

            {activeView === 'live-shows' && (
              <div className="mt-10 flex items-center justify-between rounded-xl border border-white/[0.08] bg-[#14111F] p-5">
                <div className="flex items-center gap-3">
                  <Ticket className="h-5 w-5 text-[#D4AF37]" />
                  <p className="text-sm text-[#D6D1E5]">
                    Looking for acoustic Sufi evenings &amp; heritage courtyard events?
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveView('events')}
                  className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-[#2B204A] px-4 text-xs font-semibold text-white whitespace-nowrap hover:bg-[#3A2B66]"
                >
                  View All Events
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </section>
        )}

        {/* MY BOOKINGS WALLET VIEW */}
        {activeView === 'bookings' && (
          <MyBookingsView
            bookings={bookings}
            onRemoveBooking={handleRemoveBooking}
            onNavigate={setActiveView}
          />
        )}
      </main>

      {/* 7. Professional Footer */}
      <Footer onNavigate={setActiveView} onSelectCity={setSelectedCity} />

      {/* Interactive Modals */}
      <CityModal
        isOpen={cityModalOpen}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
        onClose={() => setCityModalOpen(false)}
      />

      <MovieBookingModal
        movie={activeMovieModal?.movie ?? null}
        initialStep={activeMovieModal?.initialStep ?? 'details'}
        selectedCity={selectedCity}
        selectedDate={selectedDate}
        onChangeCity={setSelectedCity}
        onChangeDate={setSelectedDate}
        isNotified={
          activeMovieModal ? notifiedMovieIds.includes(activeMovieModal.movie.id) : false
        }
        onToggleNotify={handleToggleNotify}
        onConfirmBooking={handleAddBooking}
        onViewMyBookings={() => {
          setActiveView('bookings');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onClose={() => setActiveMovieModal(null)}
      />

      <EventBookingModal
        event={activeEventModal}
        onConfirmBooking={handleAddBooking}
        onViewMyBookings={() => {
          setActiveView('bookings');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onClose={() => setActiveEventModal(null)}
      />
    </div>
  );
}
