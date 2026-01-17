export const MESSAGES_PER_LEVEL = 5;
export const MAX_LEVEL = 20;

export const LEVEL_TITLES: Record<number, string> = {
  1: 'Anfänger',
  2: 'Neugieriger',
  3: 'Fragensteller',
  4: 'Wissbegieriger',
  5: 'Lernender',
  6: 'Fortgeschrittener',
  7: 'Hartnäckiger',
  8: 'Unerschrockener',
  9: 'Bären-Freund',
  10: 'Stammgast',
  11: 'Veteran',
  12: 'Meisterfrager',
  13: 'Bären-Vertrauter',
  14: 'Weisheitssucher',
  15: 'Erleuchteter',
  16: 'Bären-Meister',
  17: 'Legendär',
  18: 'Mythisch',
  19: 'Göttlich',
  20: 'Erklärbär-Meister',
};

export function calculateLevel(messageCount: number): number {
  return Math.min(Math.floor(messageCount / MESSAGES_PER_LEVEL) + 1, MAX_LEVEL);
}

export function getProgressToNextLevel(messageCount: number): number {
  if (calculateLevel(messageCount) >= MAX_LEVEL) return 100;
  return ((messageCount % MESSAGES_PER_LEVEL) / MESSAGES_PER_LEVEL) * 100;
}

export function getMessagesToNextLevel(messageCount: number): number {
  if (calculateLevel(messageCount) >= MAX_LEVEL) return 0;
  return MESSAGES_PER_LEVEL - (messageCount % MESSAGES_PER_LEVEL);
}

export function getLevelTitle(level: number): string {
  return LEVEL_TITLES[level] || LEVEL_TITLES[MAX_LEVEL];
}
