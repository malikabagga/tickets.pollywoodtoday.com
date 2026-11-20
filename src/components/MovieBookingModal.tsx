import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Bell,
  BellRing,
  Calendar,
  CheckCircle2,
  Clock,
  Film,
  MapPin,
  Star,
  Ticket,
  Users,
  X,
} from 'lucide-react';
import {
  CITIES,
  CINEMAS_BY_CITY,
  CityName,
  formatINR,
  generateDemoBookingId,
  getOccupiedSeatIds,
  getSeatTiers,
  SHOW_DATES,
} from '../data/catalog';
import {
  Cinema,
  CinemaShowtime,
  Movie,
  MovieBookingRecord,
  SeatSelection,
  ShowDateOption,
} from '../types';
import { MediaImage } from './MediaImage';
import { TicketQrCode } from './TicketQrCode';

type BookingStep = 'details' | 'showtimes' | 'seats' | 'summary' | 'confirmation';

interface MovieBookingModalProps {
  movie: Movie | null;
  initialStep: 'details' | 'showtimes';
  selectedCity: CityName;
  selectedDate: ShowDateOption;
  onChangeCity: (city: CityName) => void;
  onChangeDate: (date: ShowDateOption) => void;
  isNotified: boolean;
  onToggleNotify: (movieId: string) => void;
  onConfirmBooking: (booking: MovieBookingRecord) => void;
  onViewMyBookings: () => void;
  onClose: () => void;
}

const MAX_SEATS = 8;

export function MovieBookingModal({
  movie,
  initialStep,
  selectedCity,
  selectedDate,
  onChangeCity,
  onChangeDate,
  isNotified,
  onToggleNotify,
  onConfirmBooking,
  onViewMyBookings,
  onClose,
}: MovieBookingModalProps) {
  const [step, setStep] = useState<BookingStep>(initialStep);
  const [selectedCinema, setSelectedCinema] = useState<Cinema | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<CinemaShowtime | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<SeatSelection[]>([]);
  const [seatNotice, setSeatNotice] = useState<string | null>(null);
  const [guestName, setGuestName] = useState('Harpreet Singh');
  const [guestContact, setGuestContact] = useState('harpreet.singh@example.com');
  const [confirmedRecord, setConfirmedRecord] = useState<MovieBookingRecord | null>(null);

  useEffect(() => {
    if (movie) {
      setStep(movie.section === 'upcoming' ? 'details' : initialStep);
      setSelectedCinema(null);
      setSelectedShowtime(null);
      setSelectedSeats([]);
      setSeatNotice(null);
      setConfirmedRecord(null);
    }
  }, [movie, initialStep]);

  useEffect(() => {
    if (!movie) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [movie, onClose]);

  const cinemas = useMemo(
    () => CINEMAS_BY_CITY[selectedCity] ?? CINEMAS_BY_CITY.Chandigarh,
    [selectedCity]
  );

  const seatTiers = useMemo(() => {
    if (!movie || !selectedShowtime) return [];
    return getSeatTiers(movie.basePrice, selectedShowtime.priceMultiplier);
  }, [movie, selectedShowtime]);

  const occupiedSeats = useMemo(() => {
    if (!movie || !selectedCinema || !selectedShowtime) return new Set<string>();
    return getOccupiedSeatIds(
      `${movie.id}-${selectedCinema.id}-${selectedDate.id}-${selectedShowtime.id}`
    );
  }, [movie, selectedCinema, selectedDate, selectedShowtime]);

  if (!movie) return null;

  const subtotal = selectedSeats.reduce((sum, s) => sum + s.price, 0);
  const convenienceFee = selectedSeats.length * 35;
  const grandTotal = subtotal + convenienceFee;

  const handleSelectShowtime = (cinema: Cinema, showtime: CinemaShowtime) => {
    setSelectedCinema(cinema);
    setSelectedShowtime(showtime);
    setSelectedSeats([]);
    setSeatNotice(null);
    setStep('seats');
  };

  const handleToggleSeat = (
    seatId: string,
    row: string,
    num: number,
    tierId: 'royal' | 'gold' | 'silver',
    tierName: string,
    price: number
  ) => {
    if (occupiedSeats.has(seatId)) return;

    setSelectedSeats((prev) => {
      const exists = prev.some((s) => s.id === seatId);
      if (exists) {
        setSeatNotice(null);
        return prev.filter((s) => s.id !== seatId);
      }
      if (prev.length >= MAX_SEATS) {
        setSeatNotice(`You can select up to ${MAX_SEATS} seats per demo booking.`);
        return prev;
      }
      setSeatNotice(null);
      return [...prev, { id: seatId, row, number: num, tierId, tierName, price }].sort((a, b) =>
        a.row === b.row ? a.number - b.number : a.row.localeCompare(b.row)
      );
    });
  };

  const handleConfirmDemoBooking = () => {
    if (!selectedCinema || !selectedShowtime || selectedSeats.length === 0) return;

    const record: MovieBookingRecord = {
      kind: 'movie',
      bookingId: generateDemoBookingId('MOV'),
      createdAt: new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      movieId: movie.id,
      movieTitle: movie.title,
      moviePoster: movie.poster,
      language: movie.language,
      certificate: movie.certificate,
      city: selectedCity,
      cinemaName: selectedCinema.name,
      cinemaArea: selectedCinema.area,
      screen: selectedShowtime.screen,
      format: selectedShowtime.format,
      dateLabel: selectedDate.fullDate,
      showtime: selectedShowtime.time,
      seats: selectedSeats,
      subtotal,
      convenienceFee,
      totalAmount: grandTotal,
      guestName: guestName.trim() || 'Guest Attendee',
      guestContact: guestContact.trim() || 'demo@pollywoodtoday.com',
    };

    setConfirmedRecord(record);
    onConfirmBooking(record);
    setStep('confirmation');
  };

  const stepLabels: { id: BookingStep; label: string }[] = [
    { id: 'details', label: 'Details' },
    { id: 'showtimes', label: 'Cinema & Time' },
    { id: 'seats', label: 'Seats' },
    { id: 'summary', label: 'Summary' },
    { id: 'confirmation', label: 'Pass' },
  ];

  const currentStepIndex = stepLabels.findIndex((s) => s.id === step);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 p-0 sm:p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="movie-booking-title"
      onClick={onClose}
    >
      <div
        className="relative flex h-[100dvh] sm:h-auto sm:max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-none sm:rounded-2xl border-0 sm:border border-white/10 bg-[#110F1A] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header + Step Breadcrumb */}
        <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] bg-[#161322] px-5 py-4">
          <div className="flex items-center gap-3 min-w-0">
            {step !== 'details' && step !== 'confirmation' && (
              <button
                type="button"
                onClick={() => {
                  if (step === 'showtimes') setStep('details');
                  else if (step === 'seats') setStep('showtimes');
                  else if (step === 'summary') setStep('seats');
                }}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#1E1A2E] text-[#CFCADF] hover:text-white transition-colors"
                aria-label="Go back a step"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}

            <div className="min-w-0">
              <h2
                id="movie-booking-title"
                className="font-display text-base sm:text-lg font-bold text-white truncate"
              >
                {movie.title}
              </h2>
              <p className="text-xs text-[#A39CB8] truncate">
                {movie.language} · {movie.genre} · {movie.duration} · {movie.certificate}
              </p>
            </div>
          </div>

          {/* Step Indicator (Desktop) */}
          {movie.section !== 'upcoming' && (
            <div className="hidden md:flex items-center gap-2 text-xs">
              {stepLabels.map((s, idx) => (
                <div key={s.id} className="flex items-center gap-2">
                  <span
                    className={`font-medium whitespace-nowrap ${
                      idx === currentStepIndex
                        ? 'text-white'
                        : idx < currentStepIndex
                          ? 'text-[#D4AF37]'
                          : 'text-[#6E6785]'
                    }`}
                  >
                    {idx + 1}. {s.label}
                  </span>
                  {idx < stepLabels.length - 1 && (
                    <span className="text-white/15" aria-hidden="true">
                      /
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#A39CB8] hover:bg-white/[0.06] hover:text-white transition-colors"
            aria-label="Close booking dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {/* STEP 1: MOVIE DETAILS */}
          {step === 'details' && (
            <div className="grid grid-cols-1 gap-7 md:grid-cols-[260px_1fr]">
              <div className="mx-auto w-full max-w-[260px] overflow-hidden rounded-xl border border-white/10 bg-[#181526]">
                <MediaImage
                  src={movie.poster}
                  alt={`${movie.title} poster`}
                  fallbackTitle={movie.title}
                  className="aspect-[3/4] w-full object-cover object-top"
                />
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-white tabular-nums">
                      <Star className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37]" />
                      {movie.rating}
                      {movie.section !== 'upcoming' && <span className="text-[#9F98B2]">/ 10</span>}
                    </span>
                    {movie.votes && (
                      <>
                        <span className="text-white/25">·</span>
                        <span className="text-[#A39CB8]">{movie.votes}</span>
                      </>
                    )}
                    <span className="text-white/25">·</span>
                    <span className="text-[#D4AF37] font-medium">{movie.releaseDate}</span>
                  </div>

                  <p className="mt-3 text-lg font-medium text-[#EFEAF8] leading-snug">
                    “{movie.tagline}”
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-[#B6B0C8]">{movie.synopsis}</p>

                  <div className="mt-5 grid grid-cols-1 gap-3 border-t border-white/[0.08] pt-5 sm:grid-cols-2 text-sm">
                    <div>
                      <span className="block text-xs text-[#8D85A4]">Formats Available</span>
                      <span className="mt-0.5 block font-medium text-white">
                        {movie.formats.join(' · ')}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs text-[#8D85A4]">Director</span>
                      <span className="mt-0.5 block font-medium text-white">{movie.director}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="block text-xs text-[#8D85A4]">Starring</span>
                      <span className="mt-0.5 block font-medium text-white">
                        {movie.cast.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-white/[0.08] pt-5">
                  {movie.section === 'upcoming' ? (
                    <button
                      type="button"
                      onClick={() => onToggleNotify(movie.id)}
                      className={`inline-flex h-12 items-center gap-2 rounded-lg px-6 text-sm font-semibold transition-colors ${
                        isNotified
                          ? 'bg-[#2B204A] text-[#D4AF37] ring-1 ring-[#D4AF37]/40'
                          : 'bg-[#E11D48] text-white hover:bg-[#BE123C]'
                      }`}
                    >
                      {isNotified ? (
                        <>
                          <BellRing className="h-4 w-4" />
                          Premiere Reminder Set
                        </>
                      ) : (
                        <>
                          <Bell className="h-4 w-4" />
                          Notify Me When Tickets Open
                        </>
                      )}
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => setStep('showtimes')}
                        className="inline-flex h-12 items-center gap-2 rounded-lg bg-[#E11D48] px-7 text-sm font-semibold text-white transition-colors hover:bg-[#BE123C]"
                      >
                        <Ticket className="h-4 w-4" />
                        Book Tickets in {selectedCity}
                      </button>
                      <span className="text-xs text-[#9F98B2]">
                        Tickets starting {formatINR(movie.basePrice - 40)}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SELECT CITY, DATE, CINEMA & SHOWTIME */}
          {step === 'showtimes' && (
            <div className="space-y-6">
              {/* City Selector Row */}
              <div>
                <label className="block text-xs font-medium text-[#9F98B2] mb-2">
                  Select City
                </label>
                <div className="flex flex-wrap gap-2">
                  {CITIES.map((city) => {
                    const active = city === selectedCity;
                    return (
                      <button
                        key={city}
                        type="button"
                        onClick={() => onChangeCity(city)}
                        className={`inline-flex h-9 items-center gap-1.5 rounded-lg px-3.5 text-xs font-medium transition-colors whitespace-nowrap ${
                          active
                            ? 'bg-[#E11D48] text-white'
                            : 'border border-white/10 bg-[#191627] text-[#C8C2DA] hover:bg-[#231F36] hover:text-white'
                        }`}
                      >
                        <MapPin className="h-3.5 w-3.5" />
                        {city}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date Selector Strip */}
              <div>
                <label className="block text-xs font-medium text-[#9F98B2] mb-2">
                  Select Date
                </label>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {SHOW_DATES.map((d) => {
                    const active = d.id === selectedDate.id;
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => onChangeDate(d)}
                        className={`flex min-w-[92px] flex-col items-center rounded-lg border px-3 py-2 text-center transition-colors shrink-0 ${
                          active
                            ? 'border-[#D4AF37]/60 bg-[#271F3F] text-white'
                            : 'border-white/[0.08] bg-[#181525] text-[#A8A1BC] hover:bg-[#211C33] hover:text-white'
                        }`}
                      >
                        <span className="text-xs font-semibold">{d.dayLabel}</span>
                        <span className="text-[11px] text-[#D4AF37] tabular-nums">
                          {d.dateLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Cinema List & Showtimes */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-sm font-bold text-white">
                    Cinemas in {selectedCity} · {selectedDate.fullDate}
                  </h3>
                  <span className="text-xs text-[#9F98B2] tabular-nums">
                    {cinemas.length} theaters available
                  </span>
                </div>

                {cinemas.map((cinema) => (
                  <div
                    key={cinema.id}
                    className="rounded-xl border border-white/[0.08] bg-[#161322] p-4 sm:p-5"
                  >
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                      <div>
                        <h4 className="font-display text-base font-bold text-white">
                          {cinema.name}
                        </h4>
                        <p className="mt-0.5 text-xs text-[#9F98B2]">
                          {cinema.area} · {cinema.amenities.join(' · ')}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2.5">
                      {cinema.showtimes.map((st) => {
                        const isFast = st.availability === 'Filling Fast';
                        const isAlmost = st.availability === 'Almost Full';
                        return (
                          <button
                            key={st.id}
                            type="button"
                            onClick={() => handleSelectShowtime(cinema, st)}
                            className="group flex flex-col items-start rounded-lg border border-white/12 bg-[#1D192D] px-4 py-2.5 text-left transition-all duration-150 hover:border-[#E11D48] hover:bg-[#271E38] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48]"
                          >
                            <span className="font-mono text-sm font-semibold text-white tabular-nums">
                              {st.time}
                            </span>
                            <span className="mt-0.5 text-[11px] text-[#ABA4BF]">
                              {st.format} ·{' '}
                              <span
                                className={
                                  isAlmost
                                    ? 'text-[#FB7185]'
                                    : isFast
                                      ? 'text-[#D4AF37]'
                                      : 'text-[#86EFAC]'
                                }
                              >
                                {st.availability}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: INTERACTIVE CINEMA SEAT LAYOUT */}
          {step === 'seats' && selectedCinema && selectedShowtime && (
            <div className="space-y-6">
              {/* Showtime Context Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-[#161322] px-4 py-3 text-xs">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[#D6D1E5]">
                  <span className="font-semibold text-white">{selectedCinema.name}</span>
                  <span className="text-white/25">·</span>
                  <span>{selectedDate.fullDate}</span>
                  <span className="text-white/25">·</span>
                  <span className="font-mono text-[#D4AF37]">{selectedShowtime.time}</span>
                  <span className="text-white/25">·</span>
                  <span>
                    {selectedShowtime.format} ({selectedShowtime.screen})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep('showtimes')}
                  className="font-medium text-[#E11D48] hover:underline whitespace-nowrap"
                >
                  Change Showtime
                </button>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#B8B2C8]">
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 rounded border border-white/25 bg-[#1B172A]" />
                  Available
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 rounded border border-[#D4AF37]/60 bg-[#241E14]" />
                  Royal Recliner
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 rounded bg-[#E11D48]" />
                  Selected
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 rounded bg-white/10" />
                  Sold
                </span>
              </div>

              {/* Curved Illuminated Cinema Screen */}
              <div className="mx-auto max-w-2xl pt-1 pb-2 text-center">
                <div className="mx-auto h-3 w-4/5 rounded-t-[100%] border-t-2 border-[#D4AF37]/70 bg-gradient-to-b from-[#D4AF37]/20 to-transparent" />
                <p className="mt-1.5 text-[11px] font-medium tracking-[0.2em] text-[#9A92B2]">
                  SCREEN — ALL EYES THIS WAY
                </p>
              </div>

              {/* Interactive Seat Grid */}
              <p className="text-center text-[11px] text-[#8E86A6] sm:hidden">
                Swipe sideways to view all seats across the auditorium
              </p>
              <div className="overflow-x-auto pb-2 -mx-2 px-2">
                <div className="mx-auto min-w-[540px] max-w-2xl space-y-6">
                  {seatTiers.map((tier) => (
                    <div key={tier.id} className="space-y-2.5">
                      <div className="flex items-center justify-between border-b border-white/[0.07] pb-1.5 text-xs">
                        <span
                          className={`font-semibold ${
                            tier.id === 'royal' ? 'text-[#D4AF37]' : 'text-[#CFCADF]'
                          }`}
                        >
                          {tier.name}
                        </span>
                        <span className="font-mono text-[#A39CB8] tabular-nums">
                          {formatINR(tier.price)}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {tier.rows.map((rowLabel) => (
                          <div key={rowLabel} className="flex items-center justify-center gap-3">
                            <span className="w-5 text-center font-mono text-xs font-medium text-[#8C84A4]">
                              {rowLabel}
                            </span>

                            <div className="flex items-center gap-1.5 sm:gap-2">
                              {Array.from({ length: tier.seatsPerRow }, (_, i) => {
                                const seatNum = i + 1;
                                const seatId = `${rowLabel}${seatNum}`;
                                const isOccupied = occupiedSeats.has(seatId);
                                const isSelected = selectedSeats.some((s) => s.id === seatId);
                                const hasCenterAisle =
                                  (tier.seatsPerRow === 10 && seatNum === 5) ||
                                  (tier.seatsPerRow === 6 && seatNum === 3);

                                return (
                                  <div
                                    key={seatId}
                                    className={`flex items-center ${
                                      hasCenterAisle ? 'mr-4 sm:mr-6' : ''
                                    }`}
                                  >
                                    <button
                                      type="button"
                                      disabled={isOccupied}
                                      onClick={() =>
                                        handleToggleSeat(
                                          seatId,
                                          rowLabel,
                                          seatNum,
                                          tier.id,
                                          tier.name,
                                          tier.price
                                        )
                                      }
                                      aria-label={`Seat ${seatId}, ${tier.name}, ${formatINR(tier.price)}, ${
                                        isOccupied
                                          ? 'Sold'
                                          : isSelected
                                            ? 'Selected'
                                            : 'Available'
                                      }`}
                                      aria-pressed={isSelected}
                                      className={`inline-flex items-center justify-center rounded-md font-mono text-[11px] font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48] ${
                                        tier.id === 'royal'
                                          ? 'h-10 w-12 rounded-t-xl'
                                          : 'h-9 w-9 sm:h-9 sm:w-9'
                                      } ${
                                        isOccupied
                                          ? 'cursor-not-allowed bg-white/[0.06] text-white/20'
                                          : isSelected
                                            ? 'bg-[#E11D48] text-white shadow-md shadow-[#E11D48]/35 scale-[1.04]'
                                            : tier.id === 'royal'
                                              ? 'border border-[#D4AF37]/50 bg-[#221C16] text-[#F5E1A4] hover:border-[#D4AF37] hover:bg-[#32281D]'
                                              : 'border border-white/18 bg-[#1A1628] text-[#D8D3E8] hover:border-[#E11D48] hover:text-white'
                                      }`}
                                    >
                                      {seatNum}
                                    </button>
                                  </div>
                                );
                              })}
                            </div>

                            <span className="w-5 text-center font-mono text-xs font-medium text-[#8C84A4]">
                              {rowLabel}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {seatNotice && (
                <p className="text-center text-xs font-medium text-[#D4AF37]" role="status">
                  {seatNotice}
                </p>
              )}
            </div>
          )}

          {/* STEP 4: BOOKING SUMMARY */}
          {step === 'summary' && selectedCinema && selectedShowtime && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
              {/* Left: Attendee & Show Details */}
              <div className="space-y-5">
                <div className="flex gap-4 rounded-xl border border-white/[0.08] bg-[#161322] p-4">
                  <div className="h-24 w-18 shrink-0 overflow-hidden rounded-lg bg-[#1E1A2E]">
                    <MediaImage
                      src={movie.poster}
                      alt={movie.title}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-bold text-white">{movie.title}</h3>
                    <p className="mt-0.5 text-xs text-[#A59EB8]">
                      {movie.language} · {selectedShowtime.format} · {movie.certificate}
                    </p>
                    <div className="mt-2.5 space-y-1 text-xs text-[#CFCADF]">
                      <p className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-[#E11D48]" />
                        {selectedCinema.name}, {selectedCity}
                      </p>
                      <p className="flex items-center gap-2 tabular-nums">
                        <Calendar className="h-3.5 w-3.5 text-[#D4AF37]" />
                        {selectedDate.fullDate} · {selectedShowtime.time} ({selectedShowtime.screen})
                      </p>
                    </div>
                  </div>
                </div>

                {/* Guest Info Inputs */}
                <div className="rounded-xl border border-white/[0.08] bg-[#161322] p-5">
                  <h4 className="font-display text-sm font-bold text-white">
                    Attendee Details (Demo Pass)
                  </h4>
                  <p className="mt-1 text-xs text-[#9F98B2]">
                    Used solely to personalize your demonstration pass. No email or SMS is sent.
                  </p>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="mov-guest-name" className="block text-xs text-[#B8B2C8] mb-1.5">
                        Full Name
                      </label>
                      <input
                        id="mov-guest-name"
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="h-10 w-full rounded-lg border border-white/12 bg-[#0F0D17] px-3.5 text-sm text-white placeholder-[#736C8A] focus:border-[#E11D48] focus:outline-none"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="mov-guest-contact"
                        className="block text-xs text-[#B8B2C8] mb-1.5"
                      >
                        Email or Phone
                      </label>
                      <input
                        id="mov-guest-contact"
                        type="text"
                        value={guestContact}
                        onChange={(e) => setGuestContact(e.target.value)}
                        className="h-10 w-full rounded-lg border border-white/12 bg-[#0F0D17] px-3.5 text-sm text-white placeholder-[#736C8A] focus:border-[#E11D48] focus:outline-none"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Price Breakdown Card */}
              <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#171424] p-5">
                <div>
                  <h4 className="font-display text-base font-bold text-white">Booking Summary</h4>

                  <div className="mt-4 space-y-3 border-b border-white/[0.08] pb-4 text-sm">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[#CFCADF]">
                          Selected Seats ({selectedSeats.length})
                        </span>
                        <p className="mt-1 font-mono text-xs text-[#D4AF37]">
                          {selectedSeats.map((s) => s.id).join(', ')}
                        </p>
                      </div>
                      <span className="font-mono font-medium text-white tabular-nums">
                        {formatINR(subtotal)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#A39CB8]">
                      <span>Demo Convenience Fee</span>
                      <span className="font-mono tabular-nums">{formatINR(convenienceFee)}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">Total Payable (Demo)</span>
                    <span className="font-mono text-xl font-bold text-white tabular-nums">
                      {formatINR(grandTotal)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    type="button"
                    onClick={handleConfirmDemoBooking}
                    className="w-full inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#E11D48] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#BE123C]"
                  >
                    <Ticket className="h-4 w-4" />
                    Confirm Demo Booking
                  </button>
                  <p className="text-center text-[11px] text-[#8E86A6]">
                    Frontend demonstration only — no payment gateway or real charge.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: COLLECTIBLE CONFIRMATION PASS */}
          {step === 'confirmation' && confirmedRecord && (
            <div className="mx-auto max-w-2xl space-y-6 py-2">
              <div className="text-center">
                <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold text-white">
                  Demo Booking Confirmed
                </h3>
                <p className="mt-1 text-sm text-[#A59EB8]">
                  Your demo cinema pass has been saved to My Bookings.
                </p>
              </div>

              {/* Collectible Ticket Pass */}
              <div className="overflow-hidden rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#191529] via-[#13111C] to-[#1D1224]">
                <div className="flex flex-col justify-between gap-6 p-6 sm:flex-row sm:items-center">
                  <div className="flex gap-4">
                    <div className="h-28 w-20 shrink-0 overflow-hidden rounded-lg border border-white/10">
                      <MediaImage
                        src={confirmedRecord.moviePoster}
                        alt={confirmedRecord.movieTitle}
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-[#D4AF37]">
                        Pollywood Today · Cinema Demo Pass
                      </span>
                      <h4 className="mt-1 font-display text-xl font-bold text-white">
                        {confirmedRecord.movieTitle}
                      </h4>
                      <p className="mt-0.5 text-xs text-[#B6B0C8]">
                        {confirmedRecord.language} · {confirmedRecord.format} ·{' '}
                        {confirmedRecord.certificate}
                      </p>
                      <p className="mt-2.5 text-xs text-[#DFDAE9]">{confirmedRecord.cinemaName}</p>
                      <p className="mt-0.5 text-xs text-[#A39CB8] tabular-nums">
                        {confirmedRecord.dateLabel} · {confirmedRecord.showtime} ·{' '}
                        {confirmedRecord.screen}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center border-t border-dashed border-white/15 pt-5 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                    <TicketQrCode value={confirmedRecord.bookingId} size={108} />
                    <span className="mt-2 font-mono text-xs font-semibold text-[#D4AF37]">
                      {confirmedRecord.bookingId}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-white/[0.08] bg-[#0D0B14]/70 px-6 py-4 text-xs sm:grid-cols-4">
                  <div>
                    <span className="block text-[#8C84A4]">Seats</span>
                    <span className="mt-0.5 block font-mono font-semibold text-white">
                      {confirmedRecord.seats.map((s) => s.id).join(', ')}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[#8C84A4]">Tickets</span>
                    <span className="mt-0.5 block font-medium text-white tabular-nums">
                      {confirmedRecord.seats.length}{' '}
                      {confirmedRecord.seats.length === 1 ? 'Seat' : 'Seats'}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[#8C84A4]">Attendee</span>
                    <span className="mt-0.5 block font-medium text-white truncate">
                      {confirmedRecord.guestName}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[#8C84A4]">Demo Total</span>
                    <span className="mt-0.5 block font-mono font-semibold text-[#D4AF37] tabular-nums">
                      {formatINR(confirmedRecord.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onViewMyBookings();
                  }}
                  className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#E11D48] px-6 text-sm font-semibold text-white hover:bg-[#BE123C] transition-colors"
                >
                  <Film className="h-4 w-4" />
                  View My Bookings
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-11 items-center rounded-lg border border-white/15 bg-[#191627] px-6 text-sm font-medium text-white hover:bg-[#231F36] transition-colors"
                >
                  Back to Pollywood Today
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sticky Seat Selection Footer Bar */}
        {step === 'seats' && (
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] bg-[#161322] px-5 py-4">
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-lg bg-[#251E3C] text-[#D4AF37]">
                <Users className="h-5 w-5" />
              </div>
              <div>
                {selectedSeats.length === 0 ? (
                  <p className="text-sm text-[#A59EB8]">Tap any available seats above to select</p>
                ) : (
                  <>
                    <p className="text-xs text-[#A59EB8]">
                      Selected ({selectedSeats.length}):{' '}
                      <span className="font-mono font-semibold text-[#D4AF37]">
                        {selectedSeats.map((s) => s.id).join(', ')}
                      </span>
                    </p>
                    <p className="font-mono text-base font-bold text-white tabular-nums">
                      {formatINR(subtotal)}{' '}
                      <span className="font-sans text-xs font-normal text-[#9F98B2]">
                        + demo fees
                      </span>
                    </p>
                  </>
                )}
              </div>
            </div>

            <button
              type="button"
              disabled={selectedSeats.length === 0}
              onClick={() => setStep('summary')}
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#E11D48] px-6 text-sm font-semibold text-white whitespace-nowrap transition-colors hover:bg-[#BE123C] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Clock className="h-4 w-4 hidden sm:inline" />
              Continue to Summary
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
