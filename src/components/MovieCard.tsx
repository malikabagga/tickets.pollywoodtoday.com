import { ChevronRight, Clock, Star } from 'lucide-react';
import { Movie } from '../types';
import { MediaImage } from './MediaImage';

interface MovieCardProps {
  movie: Movie;
  onBookTickets: (movie: Movie) => void;
  onOpenDetails: (movie: Movie) => void;
  variant?: 'standard' | 'trending';
  rankIndex?: number;
}

export function MovieCard({
  movie,
  onBookTickets,
  onOpenDetails,
  variant = 'standard',
  rankIndex,
}: MovieCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[#13111C] transition-transform duration-200 hover:-translate-y-1 hover:border-white/[0.16]">
      {/* Poster Image Frame */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => onOpenDetails(movie)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpenDetails(movie);
          }
        }}
        className="relative aspect-[3/4] w-full cursor-pointer overflow-hidden bg-[#1A1727] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48]"
        aria-label={`View details for ${movie.title}`}
      >
        <MediaImage
          src={movie.poster}
          alt={`${movie.title} theatrical poster`}
          fallbackTitle={movie.title}
          className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
        />

        {/* Subtle bottom scrim for clean legibility */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#13111C] via-[#13111C]/50 to-transparent" />

        {/* Subtle bottom-left rating readout (clean unboxed text over scrim) */}
        <div className="pointer-events-none absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-xs font-medium text-white">
          <span className="inline-flex items-center gap-1.5 tabular-nums">
            <Star className="h-3.5 w-3.5 fill-[#D4AF37] text-[#D4AF37]" />
            <span className="font-semibold">{movie.rating}</span>
            {movie.section !== 'upcoming' && <span className="text-[#BDB6CF]">/ 10</span>}
          </span>
          <span className="font-mono text-[11px] text-[#CFCADF]">{movie.certificate}</span>
        </div>

        {/* Clean editorial rank index on Trending Punjabi spotlight */}
        {variant === 'trending' && rankIndex !== undefined && (
          <div className="pointer-events-none absolute left-3.5 top-3.5 rounded-md bg-[#09080E]/80 px-2.5 py-1 font-mono text-xs font-semibold text-[#D4AF37] backdrop-blur-sm">
            0{rankIndex + 1}
          </div>
        )}
      </div>

      {/* Card Body & Action Bar (Matching Attachment 5 visual cadence) */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="font-display text-base font-bold text-white line-clamp-1 group-hover:text-[#F8FAFC]">
            {movie.title}
          </h3>

          <div className="mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-[#A39CB8]">
            <span>{movie.language}</span>
            <span aria-hidden="true">·</span>
            <span>{movie.genre}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1 tabular-nums">
              <Clock className="h-3 w-3 text-[#8E86A6]" />
              {movie.duration}
            </span>
          </div>

          {variant === 'trending' && (
            <p className="mt-2.5 text-xs leading-relaxed text-[#B6B0C8] line-clamp-2">
              {movie.tagline}
            </p>
          )}
        </div>

        {/* Dual Action Buttons: Crimson Primary + Deep Purple Secondary */}
        <div className="mt-4 flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onBookTickets(movie)}
            className="flex-1 inline-flex h-10 items-center justify-center rounded-lg bg-[#E11D48] px-3.5 text-xs font-semibold text-white whitespace-nowrap transition-colors duration-150 hover:bg-[#BE123C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48]"
          >
            {movie.section === 'upcoming' ? 'Premiere Info' : 'Book Tickets'}
          </button>
          <button
            type="button"
            onClick={() => onOpenDetails(movie)}
            className="inline-flex h-10 items-center justify-center gap-1 rounded-lg bg-[#2B204A] px-3 text-xs font-medium text-[#E5E0F5] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#3A2B66] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED]"
          >
            <span>Details</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
}
