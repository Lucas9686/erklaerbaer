'use client';

import { LevelDisplay } from './LevelDisplay';
import { ProgressBar } from './ProgressBar';
import type { GamificationStats } from '@/lib/types';

interface GamificationPanelProps {
  stats: GamificationStats;
  isLevelingUp: boolean;
}

export function GamificationPanel({ stats, isLevelingUp }: GamificationPanelProps) {
  return (
    <>
      {/* Desktop Panel */}
      <aside
        className={`hidden md:flex flex-col w-64 lg:w-72 bg-bg-secondary border-l border-border p-6 transition-all duration-300 ${
          isLevelingUp ? 'level-up-animation' : ''
        }`}
      >
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
                className="text-text-primary text-2xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {stats.messageCount}
              </span>
            </div>
          </div>
        </div>

        {/* Decorative claw marks */}
        <div className="mt-auto pt-8 flex justify-center gap-1 opacity-20">
          <div className="w-0.5 h-8 bg-accent-primary rotate-[-15deg]" />
          <div className="w-0.5 h-10 bg-accent-primary" />
          <div className="w-0.5 h-8 bg-accent-primary rotate-[15deg]" />
        </div>
      </aside>

      {/* Mobile Stats Bar */}
      <div
        className={`md:hidden bg-bg-secondary border-b border-border px-4 py-3 transition-all duration-300 ${
          isLevelingUp ? 'level-up-animation' : ''
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className="text-3xl text-accent-primary"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {stats.level}
            </span>
            <div>
              <p
                className="text-text-primary text-sm leading-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {stats.levelTitle}
              </p>
              <p className="text-text-secondary text-xs">
                {stats.messageCount} Nachrichten
              </p>
            </div>
          </div>

          <div className="flex-1 max-w-32">
            <div className="h-1.5 bg-bg-primary border border-border overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary transition-all duration-500"
                style={{ width: `${stats.progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
