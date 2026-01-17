'use client';

export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-bg-tertiary border-l-[3px] border-accent-primary px-4 py-3">
        <div className="flex items-center gap-1">
          <span className="typing-dot w-2 h-2 bg-text-secondary rounded-full" />
          <span className="typing-dot w-2 h-2 bg-text-secondary rounded-full" />
          <span className="typing-dot w-2 h-2 bg-text-secondary rounded-full" />
        </div>
      </div>
    </div>
  );
}
