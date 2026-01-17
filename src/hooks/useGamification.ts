'use client';

import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import {
  calculateLevel,
  getProgressToNextLevel,
  getMessagesToNextLevel,
  getLevelTitle,
  MESSAGES_PER_LEVEL
} from '@/lib/gamification';
import type { GamificationStats } from '@/lib/types';

const initialStats: GamificationStats = {
  messageCount: 0,
  level: 1,
  levelTitle: 'Anfänger',
  progress: 0,
  messagesToNext: MESSAGES_PER_LEVEL,
  sessionStartTime: Date.now(),
};

export function useGamification() {
  const [stats, setStats] = useLocalStorage<GamificationStats>('erklaerbaer-stats', initialStats);
  const [justLeveledUp, setJustLeveledUp] = useState(false);
  const [newLevel, setNewLevel] = useState<number | null>(null);

  const incrementMessageCount = useCallback(() => {
    setStats((prev) => {
      const newCount = prev.messageCount + 1;
      const newLevelNum = calculateLevel(newCount);
      const didLevelUp = newLevelNum > prev.level;

      if (didLevelUp) {
        setJustLeveledUp(true);
        setNewLevel(newLevelNum);
        setTimeout(() => {
          setJustLeveledUp(false);
          setNewLevel(null);
        }, 2000);
      }

      return {
        ...prev,
        messageCount: newCount,
        level: newLevelNum,
        levelTitle: getLevelTitle(newLevelNum),
        progress: getProgressToNextLevel(newCount),
        messagesToNext: getMessagesToNextLevel(newCount),
      };
    });
  }, [setStats]);

  return {
    stats,
    incrementMessageCount,
    justLeveledUp,
    newLevel
  };
}
