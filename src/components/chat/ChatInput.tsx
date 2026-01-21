'use client';

import { useState, useCallback, KeyboardEvent, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

// Simple interface for SpeechRecognition
interface ISpeechRecognition {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: { results: { 0: { 0: { transcript: string } } } }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        setSpeechSupported(true);
        const recognition = new SpeechRecognition() as ISpeechRecognition;
        recognition.lang = 'de-DE';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = (event: { results: { 0: { 0: { transcript: string } } } }) => {
          const transcript = event.results[0][0].transcript;
          setInput(prev => prev ? `${prev} ${transcript}` : transcript);
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

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

  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        // Already started or other error
        setIsListening(false);
      }
    }
  }, [isListening]);

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
              {/* Mic button - only show if supported */}
              {speechSupported && (
                <button
                  type="button"
                  onClick={toggleListening}
                  disabled={disabled}
                  className={`w-9 h-9 rounded-full flex items-center justify-center
                             transition-all duration-150
                             ${isListening
                               ? 'bg-red-500 text-white animate-pulse'
                               : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
                             }
                             disabled:opacity-50 disabled:cursor-not-allowed`}
                  aria-label={isListening ? 'Stop recording' : 'Voice input'}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                    <line x1="12" x2="12" y1="19" y2="22"/>
                  </svg>
                </button>
              )}

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

      </div>
    </div>
  );
}
