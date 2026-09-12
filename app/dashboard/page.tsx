'use client';

// ==============================================================================
// ASCEND - COMMAND CENTER DASHBOARD
// Apple-Inspired Bright Premium Command Center
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
  Calendar,
  Layers,
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
    <div className="space-y-10 pb-16">
      {/* 1. TOP CHARACTER STATUS HUD */}
      <CharacterHUD />

      {/* 2. MAIN 2-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: ACTIVE QUESTS (8 COLS) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#E5E5EA] pb-4">
            <div>
              <h2 className="text-2xl font-bold text-[#1D1D1F] tracking-tight font-sans flex items-center gap-2">
                <Swords className="w-6 h-6 text-[#7C3AED]" />
                <span>Active Quests</span>
              </h2>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-5 py-2.5 btn-primary-gradient font-semibold text-xs rounded-full flex items-center space-x-2 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>New Quest</span>
            </button>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center space-x-2 py-1 overflow-x-auto">
            {(['Active', 'Daily', 'All', 'Completed'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all border cursor-pointer ${
                  filterType === type
                    ? 'bg-[#F2F2F7] text-[#7C3AED] border-[#7C3AED]/40'
                    : 'bg-white text-[#6E6E73] border-[#E5E5EA] hover:text-[#1D1D1F]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Quest Cards List */}
          <div className="space-y-3">
            {displayedQuests.length === 0 ? (
              <div className="py-16 text-center text-[#6E6E73] apple-card bg-white">
                <p className="font-semibold text-base text-[#1D1D1F]">No {filterType.toLowerCase()} quests</p>
                <p className="text-xs mt-1 text-[#8E8E93]">Create a new quest to start earning XP.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {displayedQuests.map((quest) => (
                  <QuestCard key={quest.id} quest={quest} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: CARDS (4 COLS) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Shortcuts Panel */}
          <div className="apple-card p-6 space-y-3">
            <h3 className="text-xs font-semibold text-[#8E8E93] uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#7C3AED]" />
              <span>Quick Shortcuts</span>
            </h3>
            <div className="grid grid-cols-1 gap-2 pt-1">
              <Link href="/calendar" className="p-3 rounded-2xl bg-[#FAF9F5] border border-[#E5E5EA] hover:border-[#D1D1D6] text-[#1D1D1F] font-semibold text-xs transition-all flex items-center justify-between group">
                <span className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-[#38BDF8] group-hover:scale-110 transition-transform" />
                  Quest Calendar
                </span>
                <span className="text-[#8E8E93]">→</span>
              </Link>
              <Link href="/leaderboard" className="p-3 rounded-2xl bg-[#FAF9F5] border border-[#E5E5EA] hover:border-[#D1D1D6] text-[#1D1D1F] font-semibold text-xs transition-all flex items-center justify-between group">
                <span className="flex items-center gap-2.5">
                  <Crown className="w-4 h-4 text-[#C9A227] group-hover:scale-110 transition-transform" />
                  Global Leaderboard
                </span>
                <span className="text-[#8E8E93]">→</span>
              </Link>
              <Link href="/shop" className="p-3 rounded-2xl bg-[#FAF9F5] border border-[#E5E5EA] hover:border-[#D1D1D6] text-[#1D1D1F] font-semibold text-xs transition-all flex items-center justify-between group">
                <span className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4 text-[#7C3AED] group-hover:scale-110 transition-transform" />
                  Guild Shop
                </span>
                <span className="text-[#8E8E93]">→</span>
              </Link>
              <Link href="/inventory" className="p-3 rounded-2xl bg-[#FAF9F5] border border-[#E5E5EA] hover:border-[#D1D1D6] text-[#1D1D1F] font-semibold text-xs transition-all flex items-center justify-between group">
                <span className="flex items-center gap-2.5">
                  <Package className="w-4 h-4 text-[#2E7D32] group-hover:scale-110 transition-transform" />
                  Inventory
                </span>
                <span className="text-[#8E8E93]">→</span>
              </Link>
              <Link href="/achievements" className="p-3 rounded-2xl bg-[#FAF9F5] border border-[#E5E5EA] hover:border-[#D1D1D6] text-[#1D1D1F] font-semibold text-xs transition-all flex items-center justify-between group">
                <span className="flex items-center gap-2.5">
                  <Trophy className="w-4 h-4 text-[#C9A227] group-hover:scale-110 transition-transform" />
                  Trophies
                </span>
                <span className="text-[#8E8E93]">→</span>
              </Link>
            </div>
          </div>

          {/* Today's Goals Panel */}
          <div className="apple-card p-6 space-y-3">
            <h3 className="text-xs font-semibold text-[#8E8E93] uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#7C3AED]" />
              <span>Today&apos;s Targets</span>
            </h3>
            
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-2xl bg-[#FAF9F5] border border-[#E5E5EA] flex justify-between items-center">
                <span className="text-[#1D1D1F] font-semibold">Daily Habits</span>
                <div className="flex items-center gap-3">
                  <span className="text-[#6E6E73] font-semibold">{quests.filter(q => q.is_recurring && q.status === 'Completed').length}/{dailyQuests.length + quests.filter(q => q.is_recurring && q.status === 'Completed').length}</span>
                  <span className="text-[#C9A227] font-semibold">+25 Gold</span>
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-[#FAF9F5] border border-[#E5E5EA] flex justify-between items-center">
                <span className="text-[#1D1D1F] font-semibold">Active Quests</span>
                <div className="flex items-center gap-3">
                  <span className="text-[#6E6E73] font-semibold">{completedQuests.length}/{quests.length}</span>
                  <span className="text-[#7C3AED] font-semibold">+XP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Attribute Mastery Panel */}
          <div className="apple-card p-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-semibold text-[#8E8E93] uppercase tracking-wider">Attribute Mastery</h3>
              <Link href="/character" className="text-xs font-semibold text-[#7C3AED] hover:underline">View →</Link>
            </div>
            <AttributeBarList />
          </div>
          
          {/* Heatmap Grid Panel */}
          <div className="apple-card p-6">
             <HeatmapGrid />
          </div>
        </div>
      </div>

      <CreateQuestModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  );
}
