import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
  className?: string;
}

export function Logo({ size = 'md', showWordmark = true, className = '' }: LogoProps) {
  const emblemSize =
    size === 'sm'
      ? 'w-7 h-7 rounded-lg'
      : size === 'lg'
      ? 'w-11 h-11 rounded-2xl'
      : 'w-9 h-9 rounded-xl';

  const iconSize =
    size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';

  const textSize =
    size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';

  return (
    <div className={`flex items-center space-x-2.5 ${className}`}>
      {/* High-Contrast Gradient Emblem Badge */}
      <div
        className={`${emblemSize} bg-gradient-to-tr from-[#7C3AED] via-[#6366F1] to-[#38BDF8] p-[1px] shadow-sm flex items-center justify-center shrink-0`}
      >
        <div className="w-full h-full rounded-[inherit] flex items-center justify-center relative overflow-hidden">
          {/* Subtle glossy sheen */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

          <svg
            viewBox="0 0 24 24"
            fill="none"
            className={`${iconSize} text-white drop-shadow-sm`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 17L12 6L19 17"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.5 12.5H15.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeOpacity="0.9"
            />
            <circle cx="12" cy="6" r="1.5" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* High-Contrast Bold Wordmark */}
      {showWordmark && (
        <div className="flex items-center">
          <span className={`font-black tracking-wider text-[#1D1D1F] ${textSize}`}>
            ASCEND
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#38BDF8] ml-1 self-start mt-1.5" />
        </div>
      )}
    </div>
  );
}
