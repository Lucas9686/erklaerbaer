export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
}

export interface GamificationStats {
  messageCount: number;
  level: number;
  levelTitle: string;
  progress: number;
  messagesToNext: number;
  sessionStartTime: number;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}
