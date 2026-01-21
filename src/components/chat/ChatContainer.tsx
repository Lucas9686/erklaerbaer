'use client';

import { useState, useCallback } from 'react';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { useChat } from '@/hooks/useChat';

interface ChatContainerProps {
  onUserMessage?: () => void;
}

export function ChatContainer({ onUserMessage }: ChatContainerProps) {
  const { messages, isLoading, error, sendMessage } = useChat(onUserMessage);
  const [showQuickReplies, setShowQuickReplies] = useState(true);

  const handleSend = useCallback((message: string) => {
    sendMessage(message);
    setShowQuickReplies(false);
  }, [sendMessage]);

  const handleQuickReply = useCallback((question: string) => {
    sendMessage(question);
    setShowQuickReplies(false);
  }, [sendMessage]);

  return (
    <div className="flex flex-col h-full bg-bg-primary">
      <MessageList
        messages={messages}
        isLoading={isLoading}
        showQuickReplies={showQuickReplies}
        onQuickReply={handleQuickReply}
      />
      {error && (
        <div className="px-4 py-2 bg-accent-secondary/20 border-t border-accent-secondary">
          <p className="text-accent-secondary text-sm text-center">{error}</p>
        </div>
      )}
      <ChatInput onSend={handleSend} disabled={isLoading} />
    </div>
  );
}
