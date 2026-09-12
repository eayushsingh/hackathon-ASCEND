'use client';

// ==============================================================================
// ASCEND - COMMAND CENTER DASHBOARD
// ==============================================================================

import React, { useState } from 'react';
import Link from 'next/link';
import { useGame } from '@/lib/context/game-context';
import { CharacterHUD } from '@/components/character/CharacterHUD';
import { AttributeBarList } from '@/components/character/AttributeBarList';
import { HeatmapGrid } from '@/components/analytics/HeatmapGrid';
import { QuestCard } from '@/components/quests/QuestCard';
import { CreateQuestModal } from '@/components/modals/CreateQuestModal';
import {
  Plus,
  Swords,
  Sparkles,
  ShoppingBag,
  Trophy,
  Package,
  RotateCw,
  Flame,
  CheckCircle2,
  Filter,
  Crown,
} from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export default function DashboardPage() {
  const { quests, streak, profile } = useGame();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [filterType, setFilterType] = useState<'All' | 'Active' | 'Daily' | 'Completed'>('Active');

  const activeQuests = quests.filter((q) => q.status === 'Active');
  const completedQuests = quests.filter((q) => q.status === 'Completed');
  const dailyQuests = quests.filter((q) => q.is_recurring && q.status === 'Active');

  let displayedQuests = activeQuests;
  if (filterType === 'All') displayedQuests = quests;
  if (filterType === 'Daily') displayedQuests = dailyQuests;
  if (filterType === 'Completed') displayedQuests = completedQuests;

  return (
    <div className="space-y-12 pb-16">
      {/* 1. TOP CHARACTER STATUS HUD */}
      <CharacterHUD />

      {/* 2. MAIN 2-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* LEFT COLUMN: ACTIVE QUESTS (8 COLS) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-end justify-between border-b-2 border-[#141210] pb-4">
            <div>
              <h2 className="font-display text-3xl font-bold text-[#141210] uppercase tracking-widest">
                Active Quests
              </h2>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2 bg-[#E85D25] text-white font-display text-sm font-bold tracking-widest uppercase hover:bg-[#C54A18] transition-colors"
            >
              Forge Quest
            </button>
          </div>

          {/* Filter Plain Text Links */}
          <div className="flex items-center space-x-6 py-2">
            {(['Active', 'Daily', 'All', 'Completed'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`font-display text-sm tracking-widest uppercase transition-colors ${
                  filterType === type
                    ? 'text-[#E85D25] font-bold'
                    : 'text-[#6B665C] hover:text-[#141210]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Quest Cards List */}
          <div className="space-y-4">
            {displayedQuests.length === 0 ? (
              <div className="py-12 text-center text-[#57534E]">
                <p className="font-display text-xl tracking-widest">NO {filterType.toUpperCase()} QUESTS</p>
                <p className="font-sans text-sm mt-2 italic">Awaiting your command.</p>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {displayedQuests.map((quest) => (
                  <QuestCard key={quest.id} quest={quest} />
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: SPARSE PANELS (4 COLS) */}
        <div className="lg:col-span-4 space-y-12">
          {/* Menu / Navigation list */}
          <div>
            <h3 className="font-display text-lg tracking-widest text-[#141210] uppercase mb-2">Command Links</h3>
            <hr className="border-[#141210]/20 mb-4" />
            <div className="flex flex-col space-y-4">
              <Link href="/leaderboard" className="font-display text-2xl uppercase tracking-widest text-[#57534E] hover:text-[#E85D25] transition-colors">
                Global Leaderboard
              </Link>
              <Link href="/shop" className="font-display text-2xl uppercase tracking-widest text-[#57534E] hover:text-[#E85D25] transition-colors">
                Guild Shop
              </Link>
              <Link href="/inventory" className="font-display text-2xl uppercase tracking-widest text-[#57534E] hover:text-[#E85D25] transition-colors">
                Inventory
              </Link>
              <Link href="/achievements" className="font-display text-2xl uppercase tracking-widest text-[#57534E] hover:text-[#E85D25] transition-colors">
                Trophies
              </Link>
            </div>
          </div>

          {/* Sparse Stats Panel */}
          <div>
            <h3 className="font-display text-lg tracking-widest text-[#141210] uppercase mb-2">Today&apos;s Targets</h3>
            <hr className="border-[#141210]/20 mb-4" />
            
            <div className="space-y-3 font-sans text-sm">
              <div className="flex justify-between items-center group">
                <span className="font-bold text-[#141210]">Daily Quests</span>
                <div className="flex items-center gap-4">
                  <span className="text-[#57534E] font-display tracking-widest">{quests.filter(q => q.is_recurring && q.status === 'Completed').length}/{dailyQuests.length + quests.filter(q => q.is_recurring && q.status === 'Completed').length}</span>
                  <span className="text-[#D97706] font-display tracking-widest w-12 text-right">+25G</span>
                </div>
              </div>
              <div className="flex justify-between items-center group">
                <span className="font-bold text-[#141210]">Active Bounties</span>
                <div className="flex items-center gap-4">
                  <span className="text-[#57534E] font-display tracking-widest">0/{activeQuests.length}</span>
                  <span className="text-[#E85D25] font-display tracking-widest w-12 text-right">XP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Minimal Attributes */}
          <div>
            <div className="flex justify-between items-end mb-2">
              <h3 className="font-display text-lg tracking-widest text-[#141210] uppercase">Attribute Mastery</h3>
              <Link href="/character" className="font-display text-xs tracking-widest text-[#57534E] hover:text-[#141210]">VIEW →</Link>
            </div>
            <hr className="border-[#141210]/20 mb-4" />
            <AttributeBarList />
          </div>
          
          <div>
             <h3 className="font-display text-lg tracking-widest text-[#141210] uppercase mb-2">Activity Protocol</h3>
             <hr className="border-[#141210]/20 mb-4" />
             <HeatmapGrid />
          </div>
        </div>
      </div>

      <CreateQuestModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  );
}
