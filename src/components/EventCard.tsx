import { Calendar, MapPin, Ticket } from 'lucide-react';
import { formatINR } from '../data/catalog';
import { LiveEvent } from '../types';
import { MediaImage } from './MediaImage';

interface EventCardProps {
  event: LiveEvent;
  onBookEvent: (event: LiveEvent) => void;
}

export function EventCard({ event, onBookEvent }: EventCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[#13111C] transition-transform duration-200 hover:-translate-y-1 hover:border-white/[0.16]">
      {/* Landscape Concert / Show Photography (Matching Attachment 4 proportions) */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => onBookEvent(event)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onBookEvent(event);
          }
        }}
        className="relative aspect-[4/3] w-full cursor-pointer overflow-hidden bg-[#1A1727] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48]"
        aria-label={`Book passes for ${event.title}`}
      >
        <MediaImage
          src={event.image}
          alt={`${event.title} featuring ${event.artist}`}
          fallbackTitle={event.title}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#13111C] via-[#13111C]/40 to-transparent" />
      </div>

      {/* Event Details */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#D4AF37]">
            <span>{event.category}</span>
            <span aria-hidden="true" className="text-white/30">
              ·
            </span>
            <span className="text-[#B8B2C8]">{event.language}</span>
          </div>

          <h3 className="mt-1.5 font-display text-lg font-bold text-white leading-snug">
            {event.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-[#D3CEE3]">{event.artist}</p>

          <div className="mt-3.5 space-y-1.5 text-xs text-[#A39CB8]">
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-[#E11D48]" />
              <span className="truncate">
                {event.venue}, {event.city}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]" />
              <span className="tabular-nums">
                {event.date} · {event.time}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Price + Primary Booking CTA */}
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/[0.07] pt-4">
          <div>
            <span className="block text-[11px] text-[#958EAD]">Tickets from</span>
            <span className="font-mono text-base font-semibold text-white tabular-nums">
              {formatINR(event.startingPrice)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onBookEvent(event)}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#E11D48] px-4 text-xs font-semibold text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#BE123C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48]"
          >
            <Ticket className="h-3.5 w-3.5" />
            Book Passes
          </button>
        </div>
      </div>
    </article>
  );
}
