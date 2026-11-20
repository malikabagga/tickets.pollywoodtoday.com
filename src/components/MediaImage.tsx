import { useState } from 'react';
import { Film } from 'lucide-react';

interface MediaImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function MediaImage({ src, alt, className = '', fallbackTitle }: MediaImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#1C1630] via-[#13111C] to-[#261124] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Film className="h-8 w-8 text-[#D4AF37]/70 mb-2" />
        <span className="text-sm font-medium text-white/80 line-clamp-2">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
      loading="lazy"
    />
  );
}
