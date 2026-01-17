'use client';

import { useState } from 'react';
import { Header } from '@/components/ui/Header';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { GamificationPanel } from '@/components/gamification/GamificationPanel';
import { useGamification } from '@/hooks/useGamification';

export default function Home() {
  const { stats, incrementMessageCount, justLeveledUp } = useGamification();
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => setIsPanelOpen(!isPanelOpen);
  const closePanel = () => setIsPanelOpen(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-bg-primary">
      <Header onTogglePanel={togglePanel} level={stats.level} />

      <div className="flex-1 flex overflow-hidden">
        {/* Main chat area */}
        <main className="flex-1 flex flex-col min-w-0">
          <ChatContainer onUserMessage={incrementMessageCount} />
        </main>

        {/* Gamification panel (desktop: always visible, mobile: toggleable) */}
        <GamificationPanel
          stats={stats}
          isLevelingUp={justLeveledUp}
          isOpen={isPanelOpen}
          onClose={closePanel}
        />
      </div>
    </div>
  );
}
