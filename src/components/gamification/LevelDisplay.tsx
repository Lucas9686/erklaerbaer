'use client';

interface LevelDisplayProps {
  level: number;
  title: string;
  isAnimating?: boolean;
}

export function LevelDisplay({ level, title, isAnimating }: LevelDisplayProps) {
  return (
    <div className="text-center">
      <div
        className={`inline-block transition-all duration-300 ${
          isAnimating ? 'scale-110' : ''
        }`}
      >
        {/* Level number with glow effect */}
        <div className="relative">
          <span
            className="block text-8xl gradient-text leading-none"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {level}
          </span>
          {isAnimating && (
            <div className="absolute inset-0 blur-xl bg-accent-primary/30 -z-10" />
          )}
        </div>
      </div>
      <p className="text-text-secondary text-xs uppercase tracking-[0.2em] mt-2">
        Level
      </p>
      <p
        className={`gradient-text text-xl mt-3 transition-all duration-300 ${
          isAnimating ? 'scale-105' : ''
        }`}
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}
      </p>
    </div>
  );
}
