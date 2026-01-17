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

      {/* Mobile Stats Bar - Redesigned */}
      <div
        className={`md:hidden bg-bg-secondary/95 backdrop-blur-sm border-b border-border px-4 py-2.5 transition-all duration-300 ${
          isLevelingUp ? 'level-up-animation' : ''
        }`}
      >
        <div className="flex items-center gap-3">
          {/* Level Circle */}
          <div className="relative flex items-center justify-center">
            <div className={`w-11 h-11 rounded-full bg-bg-tertiary border-2 border-accent-primary flex items-center justify-center transition-transform duration-300 ${isLevelingUp ? 'scale-110' : ''}`}>
              <span
                className="text-xl text-accent-primary font-bold"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {stats.level}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <p
                className="text-text-primary text-sm font-medium truncate"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {stats.levelTitle}
              </p>
              <span className="text-text-secondary text-xs shrink-0">
                {stats.messageCount} Nachr.
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mt-1.5 h-1 bg-bg-primary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full transition-all duration-500"
                style={{ width: `${stats.progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
