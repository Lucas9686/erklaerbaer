'use client';

import { Header } from '@/components/ui/Header';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { GamificationPanel } from '@/components/gamification/GamificationPanel';
import { useGamification } from '@/hooks/useGamification';

export default function Home() {
  const { stats, incrementMessageCount, justLeveledUp } = useGamification();

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />

      {/* Mobile stats bar */}
      <div className="md:hidden">
        <GamificationPanel stats={stats} isLevelingUp={justLeveledUp} />
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main chat area */}
        <main className="flex-1 flex flex-col min-w-0">
          <ChatContainer onUserMessage={incrementMessageCount} />
        </main>

        {/* Desktop gamification panel */}
        <GamificationPanel stats={stats} isLevelingUp={justLeveledUp} />
      </div>
    </div>
  );
}
