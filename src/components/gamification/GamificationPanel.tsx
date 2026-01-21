'use client';

import { LevelDisplay } from './LevelDisplay';
import { ProgressBar } from './ProgressBar';
import type { GamificationStats } from '@/lib/types';

interface GamificationPanelProps {
  stats: GamificationStats;
  isLevelingUp: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export function GamificationPanel({ stats, isLevelingUp, isOpen = false, onClose }: GamificationPanelProps) {
  return (
    <>
      {/* Mobile Slide-out Panel */}
      <div className="md:hidden">
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={onClose}
        />

        {/* Sliding Panel */}
        <aside
          className={`fixed right-0 top-0 bottom-0 w-72 bg-bg-secondary border-l border-border z-50
                      transform transition-transform duration-300 ease-out ${
                        isOpen ? 'translate-x-0' : 'translate-x-full'
                      } ${isLevelingUp ? 'level-up-animation' : ''}`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-bg-tertiary border border-border
                       flex items-center justify-center text-text-secondary hover:text-text-primary
                       hover:bg-bg-primary transition-colors"
            aria-label="Close panel"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18"/>
              <path d="M6 6l12 12"/>
            </svg>
          </button>

          <div className="h-full flex flex-col p-6 pt-16">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-xs uppercase tracking-[0.2em] text-text-secondary mb-1">Status</h2>
              <div className="h-0.5 w-12 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full" />
            </div>

            <div className="flex-1 flex flex-col justify-center space-y-8">
              <LevelDisplay
                level={stats.level}
                title={stats.levelTitle}
                isAnimating={isLevelingUp}
              />

              <ProgressBar
                progress={stats.progress}
                messagesToNext={stats.messagesToNext}
              />

              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary text-xs uppercase tracking-widest">
                    Nachrichten
                  </span>
                  <span
                    className="gradient-text text-3xl"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {stats.messageCount}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </aside>
      </div>

      {/* Desktop Panel */}
      <aside
        className={`hidden md:flex flex-col w-64 lg:w-72 bg-bg-secondary border-l border-border p-6 transition-all duration-300 ${
          isLevelingUp ? 'level-up-animation' : ''
        }`}
      >
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-xs uppercase tracking-[0.2em] text-text-secondary mb-1">Status</h2>
          <div className="h-0.5 w-12 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full" />
        </div>

        <div className="flex-1 flex flex-col justify-center space-y-8">
          <LevelDisplay
            level={stats.level}
            title={stats.levelTitle}
            isAnimating={isLevelingUp}
          />

          <ProgressBar
            progress={stats.progress}
            messagesToNext={stats.messagesToNext}
          />

          <div className="pt-4 border-t border-border">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary text-xs uppercase tracking-widest">
                Nachrichten
              </span>
              <span
                className="gradient-text text-3xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {stats.messageCount}
              </span>
            </div>
          </div>
        </div>

      </aside>
    </>
  );
}
