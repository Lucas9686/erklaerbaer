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
        <span
          className="block text-7xl text-accent-primary leading-none"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {level}
        </span>
      </div>
      <p className="text-text-secondary text-xs uppercase tracking-widest mt-1">
        Level
      </p>
      <p
        className={`text-text-primary text-lg mt-2 transition-colors duration-300 ${
          isAnimating ? 'text-accent-primary' : ''
        }`}
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}
      </p>
    </div>
  );
}
