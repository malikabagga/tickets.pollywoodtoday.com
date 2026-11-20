import { Check, MapPin, X } from 'lucide-react';
import { CITIES, CINEMAS_BY_CITY, CityName } from '../data/catalog';

interface CityModalProps {
  isOpen: boolean;
  selectedCity: CityName;
  onSelectCity: (city: CityName) => void;
  onClose: () => void;
}

export function CityModal({ isOpen, selectedCity, onSelectCity, onClose }: CityModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="city-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#13111C] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <h2 id="city-modal-title" className="text-xl font-bold text-white">
              Select Your City
            </h2>
            <p className="mt-1 text-sm text-[#A39CB8]">
              Browse movies, cinemas, and live Punjabi events near you.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#A39CB8] hover:bg-white/[0.06] hover:text-white transition-colors"
            aria-label="Close city selector"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {CITIES.map((city) => {
            const isSelected = city === selectedCity;
            const cinemaCount = CINEMAS_BY_CITY[city]?.length ?? 2;
            return (
              <button
                key={city}
                type="button"
                onClick={() => {
                  onSelectCity(city);
                  onClose();
                }}
                className={`flex flex-col items-start rounded-xl border p-4 text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48] ${
                  isSelected
                    ? 'border-[#E11D48] bg-[#E11D48]/12 text-white'
                    : 'border-white/[0.08] bg-[#1A1727] text-[#DCD7EB] hover:border-white/20 hover:bg-[#221D32]'
                }`}
              >
                <div className="flex w-full items-center justify-between mb-2">
                  <MapPin
                    className={`h-4 w-4 ${isSelected ? 'text-[#E11D48]' : 'text-[#D4AF37]'}`}
                  />
                  {isSelected && <Check className="h-4 w-4 text-[#E11D48]" />}
                </div>
                <span className="text-sm font-semibold">{city}</span>
                <span className="mt-0.5 text-xs text-[#9D95B5] tabular-nums">
                  {cinemaCount} partner cinemas
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
