'use client';

interface ProgressBarProps {
  progress: number;
  messagesToNext: number;
}

export function ProgressBar({ progress, messagesToNext }: ProgressBarProps) {
  const isMaxLevel = messagesToNext === 0;

  return (
    <div className="w-full">
      <div className="h-2 bg-bg-primary border border-border overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-text-secondary text-xs mt-2 text-center">
        {isMaxLevel ? (
          'Maximales Level erreicht!'
        ) : (
          <>
            Noch <span className="text-accent-primary">{messagesToNext}</span>{' '}
            {messagesToNext === 1 ? 'Nachricht' : 'Nachrichten'} bis zum nächsten Level
          </>
        )}
      </p>
    </div>
  );
}
