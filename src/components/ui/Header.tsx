'use client';

import { BearLogo } from './BearLogo';

export function Header() {
  return (
    <header className="bg-bg-secondary border-b border-border px-4 py-3 md:px-6 md:py-4">
      <div className="flex items-center gap-3">
        <BearLogo size={36} className="text-text-primary" />
        <h1
          className="text-2xl md:text-3xl text-text-primary tracking-wider"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          ERKLÄRBÄR
        </h1>
      </div>
    </header>
  );
}
