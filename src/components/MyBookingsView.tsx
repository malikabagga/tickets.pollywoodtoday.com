import { Calendar, Film, MapPin, Sparkles, Ticket, Trash2 } from 'lucide-react';
import { formatINR } from '../data/catalog';
import { AppView, DemoBooking } from '../types';
import { MediaImage } from './MediaImage';
import { TicketQrCode } from './TicketQrCode';

interface MyBookingsViewProps {
  bookings: DemoBooking[];
  onRemoveBooking: (bookingId: string) => void;
  onNavigate: (view: AppView) => void;
}

export function MyBookingsView({
  bookings,
  onRemoveBooking,
  onNavigate,
}: MyBookingsViewProps) {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-white/[0.08] pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-medium text-[#D4AF37]">Pollywood Today Wallet</p>
          <h1 className="mt-1 font-display text-3xl font-bold text-white">My Bookings</h1>
          <p className="mt-1.5 text-sm text-[#A59EB8]">
            All confirmed demo movie tickets and live event passes booked in this session.
          </p>
        </div>
        <div className="text-xs text-[#9F98B2] tabular-nums">
          {bookings.length} {bookings.length === 1 ? 'active demo pass' : 'active demo passes'}
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.08] bg-[#13111C] px-6 py-16 text-center">
          <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-xl bg-[#1E1930] text-[#D4AF37]">
            <Ticket className="h-7 w-7" />
          </div>
          <h2 className="mt-4 font-display text-xl font-bold text-white">No Demo Bookings Yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#A39CB8]">
            Pick a Punjabi or Bollywood movie to try the interactive seat map, or reserve passes for
            an upcoming live concert or comedy special.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('movies')}
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#E11D48] px-6 text-sm font-semibold text-white hover:bg-[#BE123C] transition-colors"
            >
              <Film className="h-4 w-4" />
              Browse Movies
            </button>
            <button
              type="button"
              onClick={() => onNavigate('live-shows')}
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/15 bg-[#1B172A] px-6 text-sm font-medium text-white hover:bg-[#26203B] transition-colors"
            >
              <Sparkles className="h-4 w-4 text-[#D4AF37]" />
              Browse Live Events
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {bookings.map((booking) => (
            <article
              key={booking.bookingId}
              className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[#13111C]"
            >
              <div className="flex flex-col justify-between gap-6 p-5 sm:p-6 lg:flex-row lg:items-center">
                <div className="flex flex-col gap-5 sm:flex-row">
                  <div className="h-48 w-full sm:h-36 sm:w-28 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#1B172A]">
                    <MediaImage
                      src={booking.kind === 'movie' ? booking.moviePoster : booking.eventImage}
                      alt={booking.kind === 'movie' ? booking.movieTitle : booking.eventTitle}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-medium text-[#D4AF37]">
                        {booking.kind === 'movie' ? 'Cinema Ticket' : booking.category}
                      </span>
                      <span className="text-white/25">·</span>
                      <span className="font-mono text-[#BDB6CF]">{booking.bookingId}</span>
                      <span className="text-white/25">·</span>
                      <span className="text-emerald-400 font-medium">Confirmed (Demo)</span>
                    </div>

                    <h2 className="mt-1.5 font-display text-xl font-bold text-white">
                      {booking.kind === 'movie' ? booking.movieTitle : booking.eventTitle}
                    </h2>

                    {booking.kind === 'event' && (
                      <p className="mt-0.5 text-sm text-[#CFCADF]">{booking.artist}</p>
                    )}

                    <div className="mt-3 space-y-1.5 text-xs text-[#A59EB8]">
                      <p className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-[#E11D48]" />
                        {booking.kind === 'movie'
                          ? `${booking.cinemaName}, ${booking.city} (${booking.screen})`
                          : `${booking.venue}, ${booking.city}`}
                      </p>
                      <p className="flex items-center gap-2 tabular-nums">
                        <Calendar className="h-3.5 w-3.5 text-[#D4AF37]" />
                        {booking.kind === 'movie'
                          ? `${booking.dateLabel} · ${booking.showtime} · ${booking.format}`
                          : `${booking.date} · ${booking.time}`}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/[0.07] pt-3 text-xs">
                      {booking.kind === 'movie' ? (
                        <div>
                          <span className="text-[#8D85A4]">Seats: </span>
                          <span className="font-mono font-semibold text-white">
                            {booking.seats.map((s) => s.id).join(', ')}
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span className="text-[#8D85A4]">Passes: </span>
                          <span className="font-medium text-white">
                            {booking.items.map((i) => `${i.quantity}× ${i.tierName}`).join(', ')}
                          </span>
                        </div>
                      )}
                      <div>
                        <span className="text-[#8D85A4]">Attendee: </span>
                        <span className="font-medium text-white">{booking.guestName}</span>
                      </div>
                      <div>
                        <span className="text-[#8D85A4]">Demo Total: </span>
                        <span className="font-mono font-semibold text-[#D4AF37] tabular-nums">
                          {formatINR(booking.totalAmount)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row items-center justify-between gap-4 border-t border-dashed border-white/12 pt-5 lg:flex-col lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                  <TicketQrCode value={booking.bookingId} size={96} />
                  <button
                    type="button"
                    onClick={() => onRemoveBooking(booking.bookingId)}
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 bg-[#1B172A] px-3 text-xs font-medium text-[#BDB6CF] hover:border-[#E11D48]/50 hover:text-[#FB7185] transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Cancel Demo Pass
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
