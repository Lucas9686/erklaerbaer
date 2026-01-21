'use client';

import { useEffect, useRef } from 'react';
import { Message } from './Message';
import { TypingIndicator } from './TypingIndicator';
import type { Message as MessageType } from '@/lib/types';

const QUICK_REPLIES = [
  'Worum geht es in dieser Diplomarbeit?',
  'Was ist das Ziel dieser Diplomarbeit?',
  'Welche Alternativen gab es?',
];

interface MessageListProps {
  messages: MessageType[];
  isLoading: boolean;
  showQuickReplies?: boolean;
  onQuickReply?: (question: string) => void;
}

export function MessageList({ messages, isLoading, showQuickReplies, onQuickReply }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto hide-scrollbar px-3 py-4 md:px-6 md:py-6 space-y-3">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}

      {/* Quick Reply Pills - nur nach Willkommensnachricht */}
      {showQuickReplies && messages.length === 1 && (
        <div className="flex flex-wrap gap-2 justify-center px-4 mt-4">
          {QUICK_REPLIES.map((question) => (
            <button
              key={question}
              onClick={() => onQuickReply?.(question)}
              className="px-4 py-2 rounded-full text-sm
                         bg-bg-tertiary border border-border
                         text-text-primary hover:bg-bg-secondary
                         hover:border-accent-primary/50
                         transition-all duration-200"
            >
              {question}
            </button>
          ))}
        </div>
      )}

      {isLoading && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}
