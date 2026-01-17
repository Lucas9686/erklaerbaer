'use client';

import { useState, useCallback, KeyboardEvent } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = useCallback(() => {
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
    }
  }, [input, disabled, onSend]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  return (
    <div className="border-t border-border bg-bg-secondary p-4">
      <div className="flex gap-3 max-w-4xl mx-auto">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Stell deine Frage..."
          disabled={disabled}
          rows={1}
          className="flex-1 bg-bg-tertiary border-2 border-border text-text-primary
                     px-4 py-3 resize-none focus:border-accent-primary focus:outline-none
                     transition-colors duration-200 placeholder:text-text-secondary
                     disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ fontFamily: 'var(--font-mono)' }}
        />
        <button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className="bg-accent-primary text-bg-primary px-6 py-3
                     font-display text-lg tracking-widest uppercase
                     hover:bg-accent-secondary active:scale-[0.98]
                     transition-all duration-150
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-accent-primary"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Senden
        </button>
      </div>
      {disabled && (
        <p className="text-text-secondary text-xs text-center mt-2">
          Der Bär denkt nach...
        </p>
      )}
    </div>
  );
}
