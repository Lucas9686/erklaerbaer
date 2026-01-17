'use client';

import { useState, useCallback, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { sendMessage as apiSendMessage, generateSessionId } from '@/lib/api';
import type { Message } from '@/lib/types';

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  content: 'Na, wieder mal keine Ahnung? Ich bin der Erklärbär. Stell deine Frage – aber erwarte keine Nettigkeiten.',
  role: 'assistant',
  timestamp: Date.now(),
};

export function useChat(onUserMessage?: () => void) {
  const [sessionId, setSessionId] = useLocalStorage<string>('erklaerbaer-session', '');
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize session ID on mount
  useEffect(() => {
    if (!sessionId) {
      setSessionId(generateSessionId());
    }
  }, [sessionId, setSessionId]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: `msg_${Date.now()}_user`,
      content: content.trim(),
      role: 'user',
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    // Notify parent about user message (for gamification)
    onUserMessage?.();

    try {
      const response = await apiSendMessage(content.trim(), sessionId);

      const assistantMessage: Message = {
        id: `msg_${Date.now()}_assistant`,
        content: response,
        role: 'assistant',
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Der Bär schläft gerade... Versuch es nochmal.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, isLoading, onUserMessage]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    sessionId,
  };
}
