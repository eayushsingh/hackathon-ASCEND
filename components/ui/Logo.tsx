import React from 'react';
import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
  className?: string;
}

export function Logo({ size = 'md', showWordmark = true, className = '' }: LogoProps) {
  const iconSizeClass =
    size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-10 h-10' : 'w-8.5 h-8.5';
  const textSize =
    size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';
  const dim = size === 'sm' ? 28 : size === 'lg' ? 40 : 34;

  return (
    <div className={`flex items-center space-x-2.5 ${className}`}>
      <Image
        src="/logo1.svg"
        alt="ASCEND"
        width={dim}
        height={dim}
        className={`${iconSizeClass} object-contain transition-transform group-hover:scale-105 shrink-0`}
        priority
      />

      {showWordmark && (
        <div className="flex items-center">
          <span className={`font-sans font-black tracking-wider text-[#1D1D1F] ${textSize}`}>
            ASCEND
          </span>
        </div>
      )}
    </div>
  );
}
