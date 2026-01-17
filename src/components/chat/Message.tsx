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
        className={`max-w-[80%] px-4 py-3 ${
          isUser
            ? 'bg-accent-muted text-text-primary rounded-tl-sm rounded-tr-xl rounded-br-xl rounded-bl-xl'
            : 'bg-bg-tertiary text-text-primary border-l-[3px] border-accent-primary'
        }`}
      >
        <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
          {message.content}
        </p>
      </div>
    </div>
  );
}
