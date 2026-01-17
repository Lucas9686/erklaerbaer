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
    <div className="border-t border-border bg-bg-secondary px-3 py-3 md:px-4 md:py-4"
         style={{ paddingBottom: 'calc(12px + var(--safe-area-bottom, 0px))' }}>
      <div className="flex items-end gap-2 md:gap-3 max-w-4xl mx-auto">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Stell deine Frage..."
          disabled={disabled}
          rows={1}
          className="flex-1 bg-bg-tertiary border border-border text-text-primary rounded-2xl
                     px-4 py-3 resize-none focus:border-accent-primary focus:outline-none
                     transition-all duration-200 placeholder:text-text-secondary
                     disabled:opacity-50 disabled:cursor-not-allowed
                     min-h-[48px] max-h-[120px]"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '15px' }}
        />
        <button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className="bg-accent-primary text-bg-primary rounded-full
                     w-12 h-12 flex items-center justify-center shrink-0
                     hover:bg-accent-secondary active:scale-95
                     transition-all duration-150
                     disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-accent-primary"
          aria-label="Senden"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={disabled ? '' : 'translate-x-[1px]'}
          >
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
        </button>
      </div>
      {disabled && (
        <p className="text-text-secondary text-xs text-center mt-2 opacity-70">
          Der Bär denkt nach...
        </p>
      )}
    </div>
  );
}
