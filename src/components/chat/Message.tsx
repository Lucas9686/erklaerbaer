'use client';

import type { Message as MessageType } from '@/lib/types';

interface MessageProps {
  message: MessageType;
}

export function Message({ message }: MessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={`message-enter flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[85%] md:max-w-[75%] ${
          isUser
            ? 'bg-accent-muted text-text-primary rounded-2xl rounded-br-md px-4 py-2.5'
            : 'bg-bg-tertiary text-text-primary rounded-2xl rounded-bl-md px-4 py-2.5 border-l-2 border-accent-primary'
        }`}
      >
        <p className="whitespace-pre-wrap break-words text-[15px] leading-relaxed">
          {message.content}
        </p>
      </div>
    </div>
  );
}
