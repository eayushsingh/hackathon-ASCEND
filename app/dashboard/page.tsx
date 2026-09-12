'use client';

// ==============================================================================
// ASCEND - COMMAND CENTER DASHBOARD
// Vibrant Modern RPG HUD Command Center
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
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-2xl font-extrabold text-white uppercase tracking-tight font-sans flex items-center gap-2">
                <Swords className="w-6 h-6 text-indigo-400" />
                <span>Active Quests</span>
              </h2>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all flex items-center space-x-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Forge Quest</span>
            </button>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center space-x-2 py-1 overflow-x-auto">
            {(['Active', 'Daily', 'All', 'Completed'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-1.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                  filterType === type
                    ? 'bg-indigo-950/80 text-indigo-300 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                    : 'bg-slate-900/60 text-slate-400 border-white/5 hover:text-slate-200 hover:border-white/10'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Quest Cards List */}
          <div className="space-y-3">
            {displayedQuests.length === 0 ? (
              <div className="py-16 text-center text-slate-500 rounded-3xl bg-[#0D111A]/60 border border-white/10">
                <p className="font-mono text-base tracking-wider text-slate-400 uppercase">NO {filterType.toUpperCase()} QUESTS</p>
                <p className="font-sans text-xs mt-2 text-slate-500">Awaiting your command to initialize new protocols.</p>
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

        {/* RIGHT COLUMN: CYBER PANELS (4 COLS) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Command Links Panel */}
          <div className="rounded-3xl bg-[#0D111A]/90 border border-white/10 p-5 shadow-[0_0_25px_rgba(0,0,0,0.3)]">
            <h3 className="font-mono text-xs font-bold tracking-widest text-indigo-400 uppercase mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>COMMAND PROTOCOLS</span>
            </h3>
            <div className="grid grid-cols-1 gap-2 pt-1">
              <Link href="/calendar" className="p-3 rounded-2xl bg-slate-900/80 border border-white/5 hover:border-indigo-500/40 text-slate-300 hover:text-indigo-400 font-mono text-xs font-bold uppercase transition-all flex items-center justify-between group">
                <span className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  Quest Calendar
                </span>
                <span className="text-slate-500 group-hover:text-indigo-400">→</span>
              </Link>
              <Link href="/leaderboard" className="p-3 rounded-2xl bg-slate-900/80 border border-white/5 hover:border-indigo-500/40 text-slate-300 hover:text-indigo-400 font-mono text-xs font-bold uppercase transition-all flex items-center justify-between group">
                <span className="flex items-center gap-2.5">
                  <Crown className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  Global Leaderboard
                </span>
                <span className="text-slate-500 group-hover:text-indigo-400">→</span>
              </Link>
              <Link href="/shop" className="p-3 rounded-2xl bg-slate-900/80 border border-white/5 hover:border-indigo-500/40 text-slate-300 hover:text-indigo-400 font-mono text-xs font-bold uppercase transition-all flex items-center justify-between group">
                <span className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                  Guild Shop
                </span>
                <span className="text-slate-500 group-hover:text-indigo-400">→</span>
              </Link>
              <Link href="/inventory" className="p-3 rounded-2xl bg-slate-900/80 border border-white/5 hover:border-indigo-500/40 text-slate-300 hover:text-indigo-400 font-mono text-xs font-bold uppercase transition-all flex items-center justify-between group">
                <span className="flex items-center gap-2.5">
                  <Package className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  Inventory
                </span>
                <span className="text-slate-500 group-hover:text-indigo-400">→</span>
              </Link>
              <Link href="/achievements" className="p-3 rounded-2xl bg-slate-900/80 border border-white/5 hover:border-indigo-500/40 text-slate-300 hover:text-indigo-400 font-mono text-xs font-bold uppercase transition-all flex items-center justify-between group">
                <span className="flex items-center gap-2.5">
                  <Trophy className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  Trophies
                </span>
                <span className="text-slate-500 group-hover:text-indigo-400">→</span>
              </Link>
            </div>
          </div>

          {/* Today's Targets Panel */}
          <div className="rounded-3xl bg-[#0D111A]/90 border border-white/10 p-5 shadow-[0_0_25px_rgba(0,0,0,0.3)] space-y-3">
            <h3 className="font-mono text-xs font-bold tracking-widest text-indigo-400 uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>TODAY&apos;S TARGETS</span>
            </h3>
            
            <div className="space-y-2 font-mono text-xs">
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/5 flex justify-between items-center">
                <span className="text-slate-300 font-bold">Daily Quests</span>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 font-bold">{quests.filter(q => q.is_recurring && q.status === 'Completed').length}/{dailyQuests.length + quests.filter(q => q.is_recurring && q.status === 'Completed').length}</span>
                  <span className="text-amber-400 font-bold">+25G</span>
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/5 flex justify-between items-center">
                <span className="text-slate-300 font-bold">Active Quests</span>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 font-bold">{completedQuests.length}/{quests.length}</span>
                  <span className="text-indigo-400 font-bold">+XP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Attribute Mastery Panel */}
          <div className="rounded-3xl bg-[#0D111A]/90 border border-white/10 p-5 shadow-[0_0_25px_rgba(0,0,0,0.3)]">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-mono text-xs font-bold tracking-widest text-indigo-400 uppercase">ATTRIBUTE MASTERY</h3>
              <Link href="/character" className="font-mono text-xs text-slate-400 hover:text-indigo-400">VIEW →</Link>
            </div>
            <AttributeBarList />
          </div>
          
          {/* Heatmap Grid Panel */}
          <div className="rounded-3xl bg-[#0D111A]/90 border border-white/10 p-5 shadow-[0_0_25px_rgba(0,0,0,0.3)]">
             <HeatmapGrid />
          </div>
        </div>
      </div>

      <CreateQuestModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  );
}
