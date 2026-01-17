'use client';

export function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 justify-start">
      {/* Bot avatar */}
      <div className="w-8 h-8 rounded-full bg-bg-tertiary border border-border flex items-center justify-center shrink-0 mb-1">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-accent-primary">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Typing bubble */}
      <div className="bg-bg-tertiary rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="typing-dot w-2 h-2 bg-accent-primary rounded-full" />
          <span className="typing-dot w-2 h-2 bg-accent-secondary rounded-full" />
          <span className="typing-dot w-2 h-2 bg-accent-tertiary rounded-full" />
        </div>
      </div>
    </div>
  );
}
