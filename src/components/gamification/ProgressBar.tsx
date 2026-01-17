'use client';

interface ProgressBarProps {
  progress: number;
  messagesToNext: number;
}

export function ProgressBar({ progress, messagesToNext }: ProgressBarProps) {
  const isMaxLevel = messagesToNext === 0;

  return (
    <div className="w-full">
      {/* Progress bar container */}
      <div className="relative h-2 bg-bg-primary rounded-full overflow-hidden border border-border">
        {/* Progress fill with gradient */}
        <div
          className="h-full bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary
                     transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      </div>

      {/* Progress text */}
      <p className="text-text-secondary text-xs mt-3 text-center">
        {isMaxLevel ? (
          <span className="gradient-text font-medium">Maximales Level erreicht!</span>
        ) : (
          <>
            Noch <span className="gradient-text font-medium">{messagesToNext}</span>{' '}
            {messagesToNext === 1 ? 'Nachricht' : 'Nachrichten'} bis zum nächsten Level
          </>
        )}
      </p>
    </div>
  );
}
