import { Cinema, LiveEvent, Movie, SeatTier, ShowDateOption } from '../types';

export const BRAND_LOGO_URL = '/assets/aistudio/logo-pollywoodotday_c2e9a0b6.webp';
export const HERO_BANNER_URL = '/assets/aistudio/image_e0875696.png';

export const CITIES = [
  'Chandigarh',
  'Mohali',
  'Ludhiana',
  'Amritsar',
  'Jalandhar',
  'Delhi NCR',
] as const;

export type CityName = (typeof CITIES)[number];

export const SHOW_DATES: ShowDateOption[] = [
  { id: '2026-11-19', dayLabel: 'Today', dateLabel: '19 Nov', fullDate: 'Thu, 19 Nov 2026' },
  { id: '2026-11-20', dayLabel: 'Tomorrow', dateLabel: '20 Nov', fullDate: 'Fri, 20 Nov 2026' },
  { id: '2026-11-21', dayLabel: 'Saturday', dateLabel: '21 Nov', fullDate: 'Sat, 21 Nov 2026' },
  { id: '2026-11-22', dayLabel: 'Sunday', dateLabel: '22 Nov', fullDate: 'Sun, 22 Nov 2026' },
  { id: '2026-11-23', dayLabel: 'Monday', dateLabel: '23 Nov', fullDate: 'Mon, 23 Nov 2026' },
  { id: '2026-11-24', dayLabel: 'Tuesday', dateLabel: '24 Nov', fullDate: 'Tue, 24 Nov 2026' },
  { id: '2026-11-25', dayLabel: 'Wednesday', dateLabel: '25 Nov', fullDate: 'Wed, 25 Nov 2026' },
];

export const MOVIES: Movie[] = [
  // NOW SHOWING (4 flagship titles across Punjabi & Bollywood)
  {
    id: 'sher-e-punjab',
    title: 'Sher-e-Punjab',
    language: 'Punjabi',
    genre: 'Action Drama',
    rating: '9.2',
    votes: '28.4K votes',
    certificate: 'UA 16+',
    duration: '2h 28m',
    releaseDate: 'Now Playing',
    poster: '/src/assets/images/poster_sher_e_punjab_1795087520356.jpg',
    section: 'now-showing',
    formats: ['2D', 'Dolby Atmos', 'IMAX 2D'],
    director: 'Harjeet Singh Mann',
    cast: ['Zorawar Gill', 'Simran Bajwa', 'Devinder Sandhu', 'Rana Ranbir'],
    tagline: 'When honor calls from the ramparts, one voice shakes an empire.',
    synopsis:
      'Set against the historic forts of Majha, a former border officer returns home to dismantle a ruthless smuggling syndicate threatening his ancestral town. Packed with visceral stunt choreography and a roaring Punjabi orchestral score.',
    basePrice: 280,
  },
  {
    id: 'ishq-da-tara',
    title: 'Ishq Da Tara',
    language: 'Punjabi',
    genre: 'Romance',
    rating: '8.9',
    votes: '19.6K votes',
    certificate: 'U',
    duration: '2h 14m',
    releaseDate: 'Now Playing',
    poster: '/src/assets/images/poster_ishq_da_tara_1795087519521.jpg',
    section: 'now-showing',
    formats: ['2D', 'Dolby Atmos'],
    director: 'Jagdeep Sidhuwal',
    cast: ['Arjunvir Virk', 'Meher Kaur', 'Nirmal Rishi', 'Binnu Dhaliwal'],
    tagline: 'A timeless promise woven across golden mustard fields.',
    synopsis:
      'Two dreamers from neighboring villages in Malwa discover an unspoken bond during harvest season. As family expectations pull them apart, their letters and melodies remind an entire town what devotion looks like.',
    basePrice: 250,
  },
  {
    id: 'aag-aur-aasmaan',
    title: 'Aag Aur Aasmaan',
    language: 'Hindi',
    genre: 'Action Thriller',
    rating: '8.8',
    votes: '41.2K votes',
    certificate: 'UA',
    duration: '2h 42m',
    releaseDate: 'Now Playing',
    poster: '/src/assets/images/poster_aag_aur_aasmaan_1795087520313.jpg',
    section: 'now-showing',
    formats: ['2D', 'IMAX 2D', '4DX'],
    director: 'Siddharth Malhotra-Rao',
    cast: ['Kabir Rathore', 'Ananya Deshmukh', 'Vikramjit Grewal'],
    tagline: 'Beyond the clouds, courage decides destiny.',
    synopsis:
      'An elite squadron stationed in Northern Command faces an unprecedented high-altitude aerial rescue mission over stormy mountain corridors. Shot for large-format screens with breathtaking aviation sequences.',
    basePrice: 310,
  },
  {
    id: 'raat-da-raaz',
    title: 'Raat Da Raaz',
    language: 'Hindi',
    genre: 'Mystery Thriller',
    rating: '8.7',
    votes: '16.1K votes',
    certificate: 'UA 16+',
    duration: '2h 09m',
    releaseDate: 'Now Playing',
    poster: '/src/assets/images/poster_raat_da_raaz_1795087519220.jpg',
    section: 'now-showing',
    formats: ['2D', 'Dolby Atmos'],
    director: 'Raghav Khanna',
    cast: ['Rohan Oberoi', 'Meera Kapoor', 'Jaideep Ahuja'],
    tagline: 'Every fog-drenched turn hides an alibi.',
    synopsis:
      'When a renowned art collector vanishes along the misty highways above Kasauli, a sharp-eyed investigator has one stormy night to unravel four conflicting testimonies before dawn erases the trail.',
    basePrice: 270,
  },

  // TRENDING PUNJABI MOVIES (3 flagship Punjabi hits — all bookable now!)
  {
    id: 'mitti-de-waris',
    title: 'Mitti De Waris',
    language: 'Punjabi',
    genre: 'Period Drama',
    rating: '9.4',
    votes: '34.8K votes',
    certificate: 'UA',
    duration: '2h 36m',
    releaseDate: 'Trending #1 in Punjab',
    poster: '/src/assets/images/poster_mitti_de_waris_1795087519035.jpg',
    section: 'trending-punjabi',
    formats: ['2D', 'Dolby Atmos'],
    director: 'Amardeep Singh Cheema',
    cast: ['Daljit Dosanjh-Brar', 'Sargun Sekhon', 'Yograj Sandhu'],
    tagline: 'Courage carved into every brick of heritage.',
    synopsis:
      'Chronicling an unforgettable chapter of 1940s Punjab, a humble village craftsman risks everything to protect his neighborhood and preserve a century-old chronicle of unity during turbulent times.',
    basePrice: 290,
  },
  {
    id: 'chandigarh-nights',
    title: 'Chandigarh Nights',
    language: 'Punjabi',
    genre: 'Comedy Drama',
    rating: '8.6',
    votes: '14.9K votes',
    certificate: 'UA',
    duration: '2h 08m',
    releaseDate: 'Trending in Tricity',
    poster: '/src/assets/images/poster_chandigarh_nights_1795087519766.jpg',
    section: 'trending-punjabi',
    formats: ['2D'],
    director: 'Gippy Randhawa-Kaur',
    cast: ['Ammy Grewal', 'Sonam Toor', 'Karamjit Anmol-Gill'],
    tagline: 'Three friends, Sector 17, and one wildly unpredictable weekend.',
    synopsis:
      'Three ambitious university graduates trying to launch a music studio in Chandigarh accidentally book the city’s most chaotic wedding band instead of an investor pitch—sparking laughter, romance, and viral fame.',
    basePrice: 240,
  },
  {
    id: 'pind-di-kahani',
    title: 'Pind Di Kahani',
    language: 'Punjabi',
    genre: 'Family Drama',
    rating: '9.1',
    votes: '22.3K votes',
    certificate: 'U',
    duration: '2h 21m',
    releaseDate: 'Audience Favorite',
    poster: '/src/assets/images/poster_pind_di_kahani_1795087520157.jpg',
    section: 'trending-punjabi',
    formats: ['2D', 'Dolby Atmos'],
    director: 'Navaniat Singh Brar',
    cast: ['Guggu Gill-Sohi', 'Neeru Bajwa-Kaur', 'Jaswinder Bhalla-Virk'],
    tagline: 'Where every courtyard lantern welcomes family back home.',
    synopsis:
      'When three NRI siblings return to their grandfather’s ancestral haveli near Patiala for a silver jubilee celebration, old rivalries melt into warmth, nostalgia, and unforgettable Punjabi wedding festivities.',
    basePrice: 250,
  },

  // UPCOMING MOVIES (2 grand upcoming premieres)
  {
    id: 'amritsar-express',
    title: 'Amritsar Express',
    language: 'Punjabi',
    genre: 'Historical Thriller',
    rating: 'Coming Soon',
    votes: '48.2K interested',
    certificate: 'UA',
    duration: '2h 30m',
    releaseDate: 'Releasing 18 Dec 2026',
    poster: '/src/assets/images/poster_amritsar_express_1795087519424.jpg',
    section: 'upcoming',
    formats: ['2D', 'IMAX 2D', 'Dolby Atmos'],
    director: 'Baljit Singh Deo-Sandhu',
    cast: ['Parmish Brar', 'Wamiqa Sekhon', 'Pawan Malhotra-Gill'],
    tagline: 'All aboard the final frontier train across Punjab.',
    synopsis:
      'A high-stakes period thriller unfolding aboard a steam locomotive racing toward Amritsar at dawn, where a fearless railway guard uncovers a conspiracy hidden among the passengers.',
    basePrice: 300,
  },
  {
    id: 'mohabbat-di-raah',
    title: 'Mohabbat Di Raah',
    language: 'Punjabi',
    genre: 'Musical Romance',
    rating: 'Coming Soon',
    votes: '31.7K interested',
    certificate: 'U',
    duration: '2h 18m',
    releaseDate: 'Releasing 01 Jan 2027',
    poster: '/src/assets/images/poster_mohabbat_di_raah_1795087519704.jpg',
    section: 'upcoming',
    formats: ['2D', 'Dolby Atmos'],
    director: 'Pankaj Batra-Sidhu',
    cast: ['Prabh Gill-Mann', 'Tania Sandhu', 'Satinder Sartaj-Virk'],
    tagline: 'Some melodies are written to bring two souls back to the shore.',
    synopsis:
      'A poetic musical romance set beside the tranquil lakes and heritage palaces of Kapurthala, following a wandering folk guitarist and an architectural restorer who find harmony in unexpected places.',
    basePrice: 260,
  },
];

export const LIVE_EVENTS: LiveEvent[] = [
  {
    id: 'royal-punjab-arena-tour',
    title: 'Royal Punjab Arena Tour',
    artist: 'Gurnam Brar Live & 18-Piece Orchestra',
    category: 'Live Concert',
    kind: 'live-show',
    venue: 'PCA New Chandigarh Arena',
    city: 'Chandigarh',
    date: 'Sat, 28 Nov 2026',
    time: '07:00 PM',
    duration: '3h 30m',
    ageLimit: '12+ Years',
    language: 'Punjabi',
    startingPrice: 1499,
    image: '/src/assets/images/event_punjab_arena_1795087519462.jpg',
    description:
      'Experience the biggest Punjabi stadium spectacle of the winter season. Complete with a 360-degree catwalk stage, live dhol percussion section, pyrotechnics, and chart-topping anthems performed live under the Chandigarh sky.',
    highlights: [
      '360-degree illuminated catwalk stage production',
      'Live Punjabi folk & contemporary brass section',
      'Curated Punjab street-food & lounge concourse',
    ],
    tiers: [
      {
        id: 'silver-stand',
        name: 'Silver Arena Stand',
        price: 1499,
        description: 'Elevated seated view with full stage line-of-sight and concourse access.',
        available: 42,
      },
      {
        id: 'fan-pit',
        name: 'Fan Pit Standing',
        price: 2999,
        description: 'Front-of-catwalk high-energy standing zone closest to the artist.',
        available: 18,
      },
      {
        id: 'gold-lounge',
        name: 'Gold Lounge Seating',
        price: 4499,
        description: 'Dedicated entry lane, cushioned seats, and complimentary refreshment voucher.',
        available: 12,
      },
      {
        id: 'royal-vip',
        name: 'Royal VIP Table Pass',
        price: 7499,
        description: 'Elevated VIP deck, valet parking, dedicated hospitality host, and tour merch.',
        available: 6,
      },
    ],
  },
  {
    id: 'mehfil-e-sufi-live',
    title: 'Mehfil-e-Sufi Under The Stars',
    artist: 'Ustad Riaz Qawwal & Sufi Ensemble',
    category: 'Sufi Night',
    kind: 'event',
    venue: 'Gobindgarh Heritage Courtyard',
    city: 'Amritsar',
    date: 'Sun, 06 Dec 2026',
    time: '06:30 PM',
    duration: '2h 45m',
    ageLimit: 'All Ages',
    language: 'Punjabi & Urdu',
    startingPrice: 999,
    image: '/src/assets/images/event_sufi_night_1795087519796.jpg',
    description:
      'An intimate candlelit evening of soulful Punjabi Sufi kalam, acoustic tabla, harmonium, and timeless verses inspired by Bulleh Shah and Waris Shah inside the historic sandstone courtyard of Amritsar.',
    highlights: [
      'Acoustic open-air heritage courtyard setting',
      'Traditional Kashmiri kahwa & artisanal snacks stall',
      'Unplugged Sufi & folk fusion finale',
    ],
    tiers: [
      {
        id: 'courtyard-seating',
        name: 'Courtyard General',
        price: 999,
        description: 'Open-air seated gallery with clear acoustic soundstage.',
        available: 36,
      },
      {
        id: 'mehfil-gold',
        name: 'Mehfil Gold Baithak',
        price: 1899,
        description: 'Cushioned front-middle seating with complimentary kahwa & welcome platter.',
        available: 14,
      },
      {
        id: 'royal-diwan',
        name: 'Royal Diwan Front Row',
        price: 3299,
        description: 'First two rows directly facing the ensemble with priority entry.',
        available: 8,
      },
    ],
  },
  {
    id: 'lassi-and-laughs-tour',
    title: 'Lassi & Laughs: Punjab Tour',
    artist: 'Jaspreet Gill Live',
    category: 'Stand-Up Comedy',
    kind: 'live-show',
    venue: 'Tagore Theatre Auditorium',
    city: 'Chandigarh',
    date: 'Fri, 04 Dec 2026',
    time: '08:00 PM',
    duration: '1h 45m',
    ageLimit: '16+ Years',
    language: 'Punjabi & Hinglish',
    startingPrice: 799,
    image: '/src/assets/images/event_comedy_club_1795087519229.jpg',
    description:
      'Brand-new ninety minutes of razor-sharp observational comedy on big fat Punjabi weddings, Sector 17 parking adventures, NRI cousins, and family WhatsApp groups—recorded live on tour.',
    highlights: [
      '100% fresh unreleased touring set',
      'Special guest opening act from Chandigarh comedy scene',
      'Intimate velvet auditorium acoustics',
    ],
    tiers: [
      {
        id: 'balcony-pass',
        name: 'Balcony Tier',
        price: 799,
        description: 'Upper auditorium seating with crisp audio and clear sightlines.',
        available: 29,
      },
      {
        id: 'prime-stalls',
        name: 'Prime Stalls',
        price: 1299,
        description: 'Center orchestra velvet seats for the full comedy club vibe.',
        available: 16,
      },
      {
        id: 'front-row-vip',
        name: 'Front Row Crowd-Work',
        price: 1999,
        description: 'First two rows—perfect for fans ready to join the banter!',
        available: 7,
      },
    ],
  },
];

export const CINEMAS_BY_CITY: Record<string, Cinema[]> = {
  Chandigarh: [
    {
      id: 'pvr-elante',
      name: 'PVR Luxe — Elante Mall',
      area: 'Industrial Area Phase I, Chandigarh',
      city: 'Chandigarh',
      amenities: ['Dolby Atmos', 'Recliners', 'Gourmet Lounge'],
      showtimes: [
        { id: 'st-1', time: '10:30 AM', format: '2D', screen: 'AUDI 03', availability: 'Available', priceMultiplier: 0.9 },
        { id: 'st-2', time: '01:45 PM', format: 'Dolby Atmos', screen: 'AUDI 01', availability: 'Available', priceMultiplier: 1.0 },
        { id: 'st-3', time: '05:15 PM', format: 'IMAX 2D', screen: 'IMAX 01', availability: 'Filling Fast', priceMultiplier: 1.2 },
        { id: 'st-4', time: '08:30 PM', format: 'Dolby Atmos', screen: 'AUDI 01', availability: 'Filling Fast', priceMultiplier: 1.15 },
        { id: 'st-5', time: '10:50 PM', format: '2D', screen: 'AUDI 04', availability: 'Available', priceMultiplier: 1.0 },
      ],
    },
    {
      id: 'cinepolis-jagat',
      name: 'Cinepolis — Jagat Mall',
      area: 'Sector 17, Chandigarh',
      city: 'Chandigarh',
      amenities: ['4K Laser', 'Dolby 7.1', 'M-Ticket'],
      showtimes: [
        { id: 'st-6', time: '11:15 AM', format: '2D', screen: 'SCREEN 02', availability: 'Available', priceMultiplier: 0.85 },
        { id: 'st-7', time: '03:00 PM', format: '2D', screen: 'SCREEN 01', availability: 'Available', priceMultiplier: 0.95 },
        { id: 'st-8', time: '06:40 PM', format: 'Dolby Atmos', screen: 'SCREEN 01', availability: 'Almost Full', priceMultiplier: 1.05 },
        { id: 'st-9', time: '09:45 PM', format: '2D', screen: 'SCREEN 02', availability: 'Available', priceMultiplier: 1.0 },
      ],
    },
    {
      id: 'pvr-centra',
      name: 'PVR — Centra Mall',
      area: 'Industrial Area Phase I, Chandigarh',
      city: 'Chandigarh',
      amenities: ['Laser Projection', 'M-Ticket'],
      showtimes: [
        { id: 'st-10', time: '12:10 PM', format: '2D', screen: 'AUDI 02', availability: 'Available', priceMultiplier: 0.9 },
        { id: 'st-11', time: '04:20 PM', format: '2D', screen: 'AUDI 02', availability: 'Available', priceMultiplier: 1.0 },
        { id: 'st-12', time: '07:50 PM', format: 'Dolby Atmos', screen: 'AUDI 01', availability: 'Filling Fast', priceMultiplier: 1.1 },
      ],
    },
  ],
  Mohali: [
    {
      id: 'cinepolis-bestech',
      name: 'Cinepolis — Bestech Square',
      area: 'Sector 66, Mohali',
      city: 'Mohali',
      amenities: ['Dolby Atmos', 'VIP Recliners', '4K Laser'],
      showtimes: [
        { id: 'mo-1', time: '11:00 AM', format: '2D', screen: 'AUDI 02', availability: 'Available', priceMultiplier: 0.9 },
        { id: 'mo-2', time: '02:30 PM', format: 'Dolby Atmos', screen: 'AUDI 01', availability: 'Available', priceMultiplier: 1.05 },
        { id: 'mo-3', time: '06:15 PM', format: 'Dolby Atmos', screen: 'AUDI 01', availability: 'Filling Fast', priceMultiplier: 1.1 },
        { id: 'mo-4', time: '09:30 PM', format: '2D', screen: 'AUDI 03', availability: 'Available', priceMultiplier: 1.0 },
      ],
    },
    {
      id: 'pvr-vr-punjab',
      name: 'PVR — VR Punjab Mall',
      area: 'Kharar-Landran Road, Mohali',
      city: 'Mohali',
      amenities: ['IMAX 2D', 'Gold Class', 'Dolby Atmos'],
      showtimes: [
        { id: 'mo-5', time: '10:45 AM', format: '2D', screen: 'SCREEN 04', availability: 'Available', priceMultiplier: 0.9 },
        { id: 'mo-6', time: '03:15 PM', format: 'IMAX 2D', screen: 'IMAX 01', availability: 'Filling Fast', priceMultiplier: 1.2 },
        { id: 'mo-7', time: '08:00 PM', format: 'Dolby Atmos', screen: 'SCREEN 01', availability: 'Almost Full', priceMultiplier: 1.15 },
      ],
    },
  ],
  Ludhiana: [
    {
      id: 'pvr-pavilion',
      name: 'PVR — Pavilion Mall',
      area: 'Fountain Chowk, Civil Lines, Ludhiana',
      city: 'Ludhiana',
      amenities: ['Dolby Atmos', 'Recliners', 'M-Ticket'],
      showtimes: [
        { id: 'ld-1', time: '10:50 AM', format: '2D', screen: 'AUDI 01', availability: 'Available', priceMultiplier: 0.9 },
        { id: 'ld-2', time: '02:15 PM', format: 'Dolby Atmos', screen: 'AUDI 01', availability: 'Available', priceMultiplier: 1.0 },
        { id: 'ld-3', time: '06:00 PM', format: 'Dolby Atmos', screen: 'AUDI 02', availability: 'Filling Fast', priceMultiplier: 1.1 },
        { id: 'ld-4', time: '09:20 PM', format: '2D', screen: 'AUDI 01', availability: 'Available', priceMultiplier: 1.0 },
      ],
    },
    {
      id: 'wave-westend',
      name: 'Wave Cinemas — Westend Mall',
      area: 'Ferozepur Road, Ludhiana',
      city: 'Ludhiana',
      amenities: ['Platinum Lounge', '4K Projection'],
      showtimes: [
        { id: 'ld-5', time: '12:00 PM', format: '2D', screen: 'AUDI 03', availability: 'Available', priceMultiplier: 0.9 },
        { id: 'ld-6', time: '04:30 PM', format: '2D', screen: 'AUDI 01', availability: 'Available', priceMultiplier: 1.0 },
        { id: 'ld-7', time: '08:15 PM', format: 'Dolby Atmos', screen: 'AUDI 01', availability: 'Filling Fast', priceMultiplier: 1.1 },
      ],
    },
  ],
  Amritsar: [
    {
      id: 'cinepolis-mall-amritsar',
      name: 'Cinepolis — Mall of Amritsar',
      area: 'GT Road, Amritsar',
      city: 'Amritsar',
      amenities: ['Dolby Atmos', 'VIP Seats', 'M-Ticket'],
      showtimes: [
        { id: 'am-1', time: '11:20 AM', format: '2D', screen: 'SCREEN 01', availability: 'Available', priceMultiplier: 0.9 },
        { id: 'am-2', time: '03:10 PM', format: 'Dolby Atmos', screen: 'SCREEN 01', availability: 'Available', priceMultiplier: 1.0 },
        { id: 'am-3', time: '07:00 PM', format: 'Dolby Atmos', screen: 'SCREEN 02', availability: 'Filling Fast', priceMultiplier: 1.1 },
        { id: 'am-4', time: '10:00 PM', format: '2D', screen: 'SCREEN 01', availability: 'Available', priceMultiplier: 0.95 },
      ],
    },
    {
      id: 'pvr-trilium',
      name: 'PVR — Trilium Mall',
      area: 'Circular Road, Amritsar',
      city: 'Amritsar',
      amenities: ['4K Laser', 'Recliners'],
      showtimes: [
        { id: 'am-5', time: '01:00 PM', format: '2D', screen: 'AUDI 02', availability: 'Available', priceMultiplier: 0.9 },
        { id: 'am-6', time: '05:30 PM', format: '2D', screen: 'AUDI 01', availability: 'Available', priceMultiplier: 1.0 },
        { id: 'am-7', time: '08:45 PM', format: 'Dolby Atmos', screen: 'AUDI 01', availability: 'Almost Full', priceMultiplier: 1.1 },
      ],
    },
  ],
  Jalandhar: [
    {
      id: 'pvr-curo',
      name: 'PVR — Curo High Street',
      area: '66 Feet Road, Jalandhar',
      city: 'Jalandhar',
      amenities: ['Dolby Atmos', 'Recliners'],
      showtimes: [
        { id: 'jl-1', time: '11:30 AM', format: '2D', screen: 'AUDI 01', availability: 'Available', priceMultiplier: 0.9 },
        { id: 'jl-2', time: '03:45 PM', format: 'Dolby Atmos', screen: 'AUDI 01', availability: 'Available', priceMultiplier: 1.0 },
        { id: 'jl-3', time: '07:30 PM', format: 'Dolby Atmos', screen: 'AUDI 02', availability: 'Filling Fast', priceMultiplier: 1.1 },
      ],
    },
    {
      id: 'pvr-mbd',
      name: 'PVR — MBD Neopolis',
      area: 'BMC Chowk, Jalandhar',
      city: 'Jalandhar',
      amenities: ['4K Projection', 'M-Ticket'],
      showtimes: [
        { id: 'jl-4', time: '12:30 PM', format: '2D', screen: 'AUDI 03', availability: 'Available', priceMultiplier: 0.9 },
        { id: 'jl-5', time: '05:00 PM', format: '2D', screen: 'AUDI 02', availability: 'Available', priceMultiplier: 1.0 },
        { id: 'jl-6', time: '09:00 PM', format: '2D', screen: 'AUDI 01', availability: 'Available', priceMultiplier: 1.05 },
      ],
    },
  ],
  'Delhi NCR': [
    {
      id: 'pvr-directors-cut',
      name: "PVR Director's Cut — Ambience",
      area: 'Vasant Kunj, New Delhi',
      city: 'Delhi NCR',
      amenities: ['IMAX 2D', 'Dolby Atmos', 'Luxe Lounge'],
      showtimes: [
        { id: 'dl-1', time: '11:15 AM', format: 'Dolby Atmos', screen: 'AUDI 01', availability: 'Available', priceMultiplier: 1.1 },
        { id: 'dl-2', time: '03:00 PM', format: 'IMAX 2D', screen: 'IMAX 01', availability: 'Filling Fast', priceMultiplier: 1.3 },
        { id: 'dl-3', time: '07:15 PM', format: 'Dolby Atmos', screen: 'AUDI 01', availability: 'Almost Full', priceMultiplier: 1.25 },
        { id: 'dl-4', time: '10:30 PM', format: '2D', screen: 'AUDI 03', availability: 'Available', priceMultiplier: 1.1 },
      ],
    },
    {
      id: 'cinepolis-dlf',
      name: 'Cinepolis — DLF Avenue',
      area: 'Saket, New Delhi',
      city: 'Delhi NCR',
      amenities: ['4K Laser', 'Dolby Atmos', 'M-Ticket'],
      showtimes: [
        { id: 'dl-5', time: '12:00 PM', format: '2D', screen: 'SCREEN 02', availability: 'Available', priceMultiplier: 1.0 },
        { id: 'dl-6', time: '04:45 PM', format: 'Dolby Atmos', screen: 'SCREEN 01', availability: 'Available', priceMultiplier: 1.15 },
        { id: 'dl-7', time: '08:40 PM', format: 'Dolby Atmos', screen: 'SCREEN 01', availability: 'Filling Fast', priceMultiplier: 1.2 },
      ],
    },
  ],
};

export function getSeatTiers(basePrice: number, multiplier: number): SeatTier[] {
  const roundToTen = (val: number) => Math.round((val * multiplier) / 10) * 10;
  return [
    {
      id: 'royal',
      name: 'Royal Recliner',
      price: roundToTen(basePrice + 260),
      rows: ['A'],
      seatsPerRow: 6,
    },
    {
      id: 'gold',
      name: 'Gold Executive',
      price: roundToTen(basePrice + 70),
      rows: ['B', 'C', 'D', 'E'],
      seatsPerRow: 10,
    },
    {
      id: 'silver',
      name: 'Silver Classic',
      price: roundToTen(basePrice - 40),
      rows: ['F', 'G', 'H'],
      seatsPerRow: 10,
    },
  ];
}

/** Deterministic occupied seat generator so every showtime looks realistic & stable */
export function getOccupiedSeatIds(seedKey: string): Set<string> {
  const occupied = new Set<string>();
  let hash = 0;
  for (let i = 0; i < seedKey.length; i++) {
    hash = (hash * 31 + seedKey.charCodeAt(i)) % 9973;
  }

  const allSeats: string[] = [];
  for (let n = 1; n <= 6; n++) allSeats.push(`A${n}`);
  for (const row of ['B', 'C', 'D', 'E', 'F', 'G', 'H']) {
    for (let n = 1; n <= 10; n++) allSeats.push(`${row}${n}`);
  }

  allSeats.forEach((seatId, idx) => {
    const val = (hash + idx * 17 + idx * idx * 7) % 100;
    // Keep roughly ~22% seats occupied, slightly higher in center rows C-E
    const threshold = seatId.startsWith('C') || seatId.startsWith('D') ? 28 : 18;
    if (val < threshold) {
      occupied.add(seatId);
    }
  });

  // Always guarantee center pairs in row B or E remain bookable
  occupied.delete('B5');
  occupied.delete('B6');
  occupied.delete('E4');
  occupied.delete('E5');
  occupied.delete('A3');
  occupied.delete('A4');

  return occupied;
}

export function generateDemoBookingId(prefix: 'MOV' | 'EVT'): string {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `PT-${prefix}-${num}`;
}

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}
