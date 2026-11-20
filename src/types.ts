export type AppView = 'home' | 'movies' | 'live-shows' | 'events' | 'bookings';

export type MovieSection = 'now-showing' | 'trending-punjabi' | 'upcoming';

export interface Movie {
  id: string;
  title: string;
  language: 'Punjabi' | 'Hindi';
  genre: string;
  rating: string; // e.g. "9.2" or "Upcoming"
  votes?: string;
  certificate: string; // "U", "UA", "UA 16+"
  duration: string;
  releaseDate: string;
  poster: string;
  section: MovieSection;
  formats: string[];
  director: string;
  cast: string[];
  synopsis: string;
  tagline: string;
  basePrice: number;
}

export interface CinemaShowtime {
  id: string;
  time: string;
  format: string;
  screen: string;
  availability: 'Available' | 'Filling Fast' | 'Almost Full';
  priceMultiplier: number;
}

export interface Cinema {
  id: string;
  name: string;
  area: string;
  city: string;
  amenities: string[];
  showtimes: CinemaShowtime[];
}

export interface SeatTier {
  id: 'royal' | 'gold' | 'silver';
  name: string;
  price: number;
  rows: string[];
  seatsPerRow: number;
}

export interface SeatSelection {
  id: string; // e.g. "B4"
  row: string;
  number: number;
  tierId: 'royal' | 'gold' | 'silver';
  tierName: string;
  price: number;
}

export interface EventTicketTier {
  id: string;
  name: string;
  price: number;
  description: string;
  available: number;
}

export interface LiveEvent {
  id: string;
  title: string;
  artist: string;
  category: 'Live Concert' | 'Sufi Night' | 'Stand-Up Comedy';
  kind: 'live-show' | 'event';
  venue: string;
  city: string;
  date: string;
  time: string;
  duration: string;
  ageLimit: string;
  language: string;
  startingPrice: number;
  image: string;
  description: string;
  highlights: string[];
  tiers: EventTicketTier[];
}

export interface ShowDateOption {
  id: string;
  dayLabel: string; // "Today", "Tomorrow", "Sat"
  dateLabel: string; // "19 Nov"
  fullDate: string; // "Thu, 19 Nov 2026"
}

export interface MovieBookingRecord {
  kind: 'movie';
  bookingId: string;
  createdAt: string;
  movieId: string;
  movieTitle: string;
  moviePoster: string;
  language: string;
  certificate: string;
  city: string;
  cinemaName: string;
  cinemaArea: string;
  screen: string;
  format: string;
  dateLabel: string;
  showtime: string;
  seats: SeatSelection[];
  subtotal: number;
  convenienceFee: number;
  totalAmount: number;
  guestName: string;
  guestContact: string;
}

export interface EventBookingRecord {
  kind: 'event';
  bookingId: string;
  createdAt: string;
  eventId: string;
  eventTitle: string;
  artist: string;
  eventImage: string;
  category: string;
  venue: string;
  city: string;
  date: string;
  time: string;
  items: {
    tierId: string;
    tierName: string;
    quantity: number;
    unitPrice: number;
  }[];
  totalTickets: number;
  subtotal: number;
  convenienceFee: number;
  totalAmount: number;
  guestName: string;
  guestContact: string;
}

export type DemoBooking = MovieBookingRecord | EventBookingRecord;
