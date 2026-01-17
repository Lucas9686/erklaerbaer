'use client';

interface BearLogoProps {
  size?: number;
  className?: string;
}

export function BearLogo({ size = 32, className = '' }: BearLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Abstract geometric bear head */}
      {/* Main head shape */}
      <path
        d="M24 8L38 18V34L24 44L10 34V18L24 8Z"
        fill="currentColor"
        opacity="0.9"
      />
      {/* Left ear */}
      <circle cx="12" cy="12" r="5" fill="currentColor" />
      {/* Right ear */}
      <circle cx="36" cy="12" r="5" fill="currentColor" />
      {/* Inner ear left */}
      <circle cx="12" cy="12" r="2.5" fill="#E85D04" />
      {/* Inner ear right */}
      <circle cx="36" cy="12" r="2.5" fill="#E85D04" />
      {/* Snout */}
      <path
        d="M18 28L24 36L30 28H18Z"
        fill="#E85D04"
      />
      {/* Left eye */}
      <circle cx="18" cy="22" r="2" fill="#0D0D0D" />
      {/* Right eye */}
      <circle cx="30" cy="22" r="2" fill="#0D0D0D" />
      {/* Nose */}
      <circle cx="24" cy="30" r="2" fill="#0D0D0D" />
    </svg>
  );
}
