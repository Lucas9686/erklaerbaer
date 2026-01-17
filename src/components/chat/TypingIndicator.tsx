'use client';

export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-bg-tertiary rounded-2xl rounded-bl-md border-l-2 border-accent-primary px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="typing-dot w-2 h-2 bg-accent-primary rounded-full" />
          <span className="typing-dot w-2 h-2 bg-accent-primary rounded-full" />
          <span className="typing-dot w-2 h-2 bg-accent-primary rounded-full" />
        </div>
      </div>
    </div>
  );
}
