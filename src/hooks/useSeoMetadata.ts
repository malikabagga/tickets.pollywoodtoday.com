import { useEffect } from 'react';
import { CityName } from '../data/catalog';
import { AppView } from '../types';

function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/** Keeps document title, meta description, OpenGraph, Twitter, and canonical URL synced per active view and city */
export function useSeoMetadata(activeView: AppView, selectedCity: CityName) {
  useEffect(() => {
    const viewMeta: Record<AppView, { title: string; description: string }> = {
      home: {
        title: `Pollywood Today – Movies & Live Events in ${selectedCity}`,
        description: `Book Punjabi and Bollywood movie tickets, pick cinema seats, and reserve live concerts, Sufi nights, and comedy passes in ${selectedCity} on Pollywood Today.`,
      },
      movies: {
        title: `Movies in ${selectedCity} – Showtimes | Pollywood Today`,
        description: `Explore Now Showing Punjabi and Bollywood movies in ${selectedCity}, compare multiplex showtimes, and select interactive cinema seats on Pollywood Today.`,
      },
      'live-shows': {
        title: `Live Shows & Tours – Concerts & Comedy | Pollywood Today`,
        description: `Book passes for sold-out Punjabi arena concerts and stand-up comedy tours across Chandigarh, Amritsar, and North India on Pollywood Today.`,
      },
      events: {
        title: `Events in ${selectedCity} & Punjab | Pollywood Today`,
        description: `Discover Punjabi live music concerts, Sufi nights under the stars, and touring comedy events with instant pass selection on Pollywood Today.`,
      },
      bookings: {
        title: `My Bookings – Digital Passes | Pollywood Today`,
        description: `Access your confirmed Pollywood Today cinema tickets and live event QR passes in one place.`,
      },
    };

    const { title, description } = viewMeta[activeView];
    document.title = title;

    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);

    if (typeof window !== 'undefined') {
      const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
      setMetaTag('property', 'og:url', canonicalUrl);

      let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', canonicalUrl);
    }
  }, [activeView, selectedCity]);
}
