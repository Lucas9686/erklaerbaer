'use client';

import type { Message as MessageType } from '@/lib/types';
import { BearLogo } from '../ui/BearLogo';

interface MessageProps {
  message: MessageType;
}

type ContentPart = { type: 'text'; content: string } | { type: 'image'; content: string; alt: string };

function parseMessageContent(content: string): ContentPart[] {
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  const parts: ContentPart[] = [];

  let lastIndex = 0;
  let match;

  while ((match = imageRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      const textContent = content.slice(lastIndex, match.index);
      if (textContent.trim()) {
        parts.push({ type: 'text', content: textContent });
      }
    }
    parts.push({ type: 'image', content: match[2], alt: match[1] || 'Bild' });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    const textContent = content.slice(lastIndex);
    if (textContent.trim()) {
      parts.push({ type: 'text', content: textContent });
    }
  }

  return parts.length > 0 ? parts : [{ type: 'text', content }];
}

export function Message({ message }: MessageProps) {
  const isUser = message.role === 'user';
  const parts = parseMessageContent(message.content);

  return (
    <div className={`message-enter flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {/* Bot avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-bg-tertiary border border-border flex items-center justify-center shrink-0 mb-1 overflow-hidden">
          <BearLogo size={20} className="text-accent-primary" />
        </div>
      )}

      {/* Message bubble */}
      <div
        className={`max-w-[80%] md:max-w-[70%] px-4 py-3 ${
          isUser
            ? 'gradient-message text-white rounded-2xl rounded-br-sm'
            : 'bg-bg-tertiary text-text-primary rounded-2xl rounded-bl-sm'
        }`}
      >
        {parts.map((part, index) =>
          part.type === 'text' ? (
            <p key={index} className="whitespace-pre-wrap break-words text-[15px] leading-relaxed">
              {part.content}
            </p>
          ) : (
            <img
              key={index}
              src={part.content}
              alt={part.alt}
              className="rounded-lg max-w-full my-3 cursor-pointer hover:opacity-90 transition-opacity border border-border"
              loading="lazy"
            />
          )
        )}
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="w-8 h-8 rounded-full gradient-message flex items-center justify-center shrink-0 mb-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </div>
  );
}
