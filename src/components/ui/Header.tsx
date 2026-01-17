'use client';

import { BearLogo } from './BearLogo';

export function Header() {
  return (
    <header className="bg-bg-secondary border-b border-border px-4 py-2.5 md:px-6 md:py-3">
      <div className="flex items-center gap-2.5">
        <BearLogo size={28} className="text-accent-primary" />
        <h1
          className="text-xl md:text-2xl text-text-primary tracking-wide"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          ERKLÄRBÄR
        </h1>
      </div>
    </header>
  );
}
