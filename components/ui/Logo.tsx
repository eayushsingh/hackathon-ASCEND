import React from 'react';
import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
  className?: string;
}

export function Logo({ size = 'md', showWordmark = true, className = '' }: LogoProps) {
  const heightClass =
    size === 'sm' ? 'h-7' : size === 'lg' ? 'h-10' : 'h-8 sm:h-8.5';
  const width = size === 'sm' ? 100 : size === 'lg' ? 150 : 130;
  const height = size === 'sm' ? 28 : size === 'lg' ? 42 : 36;

  if (!showWordmark) {
    return (
      <div className={`relative shrink-0 ${className}`}>
        <Image
          src="/icon.svg"
          alt="ASCEND"
          width={height}
          height={height}
          className={`${heightClass} w-auto object-contain`}
          priority
        />
      </div>
    );
  }

  return (
    <div className={`relative shrink-0 flex items-center ${className}`}>
      <Image
        src="/logo.svg"
        alt="ASCEND"
        width={width}
        height={height}
        className={`${heightClass} w-auto object-contain`}
        priority
      />
    </div>
  );
}
