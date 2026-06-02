import React from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'color';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export function BrandLogo({
  variant = 'color',
  size = 'md',
  showText = true,
  className = '',
}: BrandLogoProps) {
  // Size classes
  const dimensions = {
    sm: { svg: 'h-6 w-auto', text: 'text-[16px] gap-1.5' },
    md: { svg: 'h-8 w-auto', text: 'text-[20px] sm:text-[22px] gap-2' },
    lg: { svg: 'h-10 w-auto', text: 'text-[24px] sm:text-[26px] gap-2.5' },
    xl: { svg: 'h-14 w-auto', text: 'text-[32px] sm:text-[36px] gap-3.5' },
  }[size];

  // Theme-based colors for the 3-tier marketing funnel
  const colors = {
    color: {
      layer1: '#1a2e2e',      // Top (Awareness) - Deep Charcoal
      layer2: '#2D7D6F',      // Middle (Consideration) - Accent Teal
      layer3: '#45A593',      // Bottom (Conversion) - Bright Mint Teal
      dot: '#5CCBBA',         // Final converted client - Neon Mint
      textMain: 'text-[#1a2e2e]',
      textSub: 'text-[#2D7D6F]',
    },
    dark: {
      layer1: '#1a2e2e',
      layer2: '#3d5a5a',
      layer3: '#6b8a8a',
      dot: '#1a2e2e',
      textMain: 'text-[#1a2e2e]',
      textSub: 'text-[#3d5a5a]',
    },
    light: {
      layer1: '#FFFFFF',
      layer2: 'rgba(255,255,255,0.85)',
      layer3: 'rgba(255,255,255,0.65)',
      dot: '#5CCBBA',
      textMain: 'text-white',
      textSub: 'text-[#5CCBBA]',
    },
  }[variant];

  return (
    <div className={`inline-flex items-center font-outfit font-bold tracking-tight ${dimensions.text} ${className}`}>
      {/* Sleek, Minimalist Marketing Funnel Logomark */}
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${dimensions.svg} shrink-0 transition-transform duration-300 group-hover:scale-105`}
        aria-hidden="true"
      >
        {/* Top Funnel Layer (Wide) */}
        <path
          d="M6 9L16 14L26 9"
          stroke={colors.layer1}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Middle Funnel Layer (Medium) */}
        <path
          d="M9 16L16 20L23 16"
          stroke={colors.layer2}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Bottom Funnel Layer (Narrow) */}
        <path
          d="M12 23L16 26L20 23"
          stroke={colors.layer3}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Conversion Focus Point (Dot) */}
        <circle
          cx="16"
          cy="29"
          r="1.6"
          fill={colors.dot}
        />
      </svg>

      {/* Elegant Logotype */}
      {showText && (
        <span className="flex items-center leading-none">
          <span className={`${colors.textMain} font-bold transition-colors duration-300`}>
            Carabus
          </span>
          <span className={`${colors.textSub} font-black tracking-widest ml-0.5 uppercase transition-colors duration-300`}>
            Ads
          </span>
        </span>
      )}
    </div>
  );
}
