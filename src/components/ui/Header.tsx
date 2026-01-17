'use client';

import { BearLogo } from './BearLogo';

interface HeaderProps {
  onTogglePanel?: () => void;
  level?: number;
}

export function Header({ onTogglePanel, level = 1 }: HeaderProps) {
  return (
    <header className="bg-bg-secondary/95 backdrop-blur-sm border-b border-border px-4 py-3 md:px-6">
      <div className="flex items-center justify-between">
        {/* Logo and title */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <BearLogo size={32} className="text-accent-primary" />
            {/* Subtle glow effect */}
            <div className="absolute inset-0 blur-md bg-accent-primary/20 rounded-full" />
          </div>
          <div>
            <h1
              className="text-xl md:text-2xl gradient-text tracking-wide"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              ERKLÄRBÄR
            </h1>
          </div>
        </div>

        {/* Mobile toggle button */}
        <button
          onClick={onTogglePanel}
          className="md:hidden flex items-center gap-2 px-3 py-1.5 rounded-full
                     bg-bg-tertiary border border-border
                     hover:border-accent-primary/50 transition-colors"
          aria-label="Toggle stats panel"
        >
          <span className="text-xs text-text-secondary uppercase tracking-wide">Level</span>
          <span
            className="gradient-text text-lg font-bold"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {level}
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-text-secondary"
          >
            <path d="M4 6h16"/>
            <path d="M4 12h16"/>
            <path d="M4 18h16"/>
          </svg>
        </button>
      </div>
    </header>
  );
}
