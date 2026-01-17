'use client';

import { useState, useCallback, KeyboardEvent, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = useCallback(() => {
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  }, [input, disabled, onSend]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  return (
    <div className="px-4 py-4 md:px-6"
         style={{ paddingBottom: 'calc(16px + var(--safe-area-bottom, 0px))' }}>
      <div className="max-w-3xl mx-auto">
        {/* Input container with gradient border effect */}
        <div className="relative bg-bg-secondary rounded-full border border-border overflow-hidden
                        focus-within:border-accent-primary/50 transition-colors duration-200">
          <div className="flex items-end">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Send message..."
              disabled={disabled}
              rows={1}
              className="flex-1 bg-transparent text-text-primary
                         pl-5 pr-2 py-3.5 resize-none focus:outline-none
                         placeholder:text-text-secondary
                         disabled:opacity-50 disabled:cursor-not-allowed
                         min-h-[48px] max-h-[120px]"
              style={{ fontSize: '15px' }}
            />

            {/* Action buttons */}
            <div className="flex items-center gap-1 pr-2 pb-2">
              {/* Mic button */}
              <button
                type="button"
                className="w-9 h-9 rounded-full flex items-center justify-center
                           text-text-secondary hover:text-text-primary hover:bg-bg-tertiary
                           transition-all duration-150"
                aria-label="Voice input"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" x2="12" y1="19" y2="22"/>
                </svg>
              </button>

              {/* Send button */}
              <button
                onClick={handleSend}
                disabled={disabled || !input.trim()}
                className="w-9 h-9 rounded-full flex items-center justify-center
                           gradient-message text-white
                           hover:opacity-90 active:scale-95
                           transition-all duration-150
                           disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Send"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"/>
                  <path d="m12 5 7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Page indicator dots */}
        <div className="flex items-center justify-center gap-1.5 mt-3">
          <div className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
          <div className="w-1.5 h-1.5 rounded-full bg-border" />
          <div className="w-1.5 h-1.5 rounded-full bg-border" />
        </div>
      </div>
    </div>
  );
}
