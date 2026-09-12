'use client';

// ==============================================================================
// ASCEND - QUEST MANAGEMENT BOARD
// Vibrant Modern RPG HUD Quest Command
// ==============================================================================

import React, { useState } from 'react';
import { useGame } from '@/lib/context/game-context';
import { QuestCard } from '@/components/quests/QuestCard';
import { CreateQuestModal } from '@/components/modals/CreateQuestModal';
import {
  Search,
  Plus,
  Swords,
  Target,
  Trophy,
  Zap,
} from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export default function QuestsPage() {
  const { quests } = useGame();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Active' | 'Completed'>('Active');
  const [sortBy, setSortBy] = useState<'newest' | 'xp' | 'gold'>('newest');

  const filteredQuests = quests
    .filter((q) => {
      if (selectedStatus === 'Active' && q.status !== 'Active') return false;
      if (selectedStatus === 'Completed' && q.status !== 'Completed') return false;
      if (selectedCategory !== 'All' && q.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          q.title.toLowerCase().includes(query) ||
          (q.description && q.description.toLowerCase().includes(query)) ||
          q.attribute.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'xp') return b.xp_reward - a.xp_reward;
      if (sortBy === 'gold') return b.gold_reward - a.gold_reward;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

  const totalCompleted = quests.filter((q) => q.status === 'Completed').length;
  const completionRate = quests.length > 0 ? Math.round((totalCompleted / quests.length) * 100) : 0;

  const categories = ['All', 'Work', 'Fitness', 'Learning', 'Habit', 'Creative', 'Social'];

  return (
    <div className="space-y-10 pb-16 pt-6">
      {/* 1. TOP STATS BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-[#0D111A]/90 border border-white/10 text-center sm:text-left shadow-[0_0_25px_rgba(0,0,0,0.3)]">
          <div className="font-mono text-3xl font-extrabold text-white">{quests.length}</div>
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mt-1">Total Quests</div>
        </div>
        <div className="p-5 rounded-3xl bg-[#0D111A]/90 border border-white/10 text-center sm:text-left shadow-[0_0_25px_rgba(0,0,0,0.3)]">
          <div className="font-mono text-3xl font-extrabold text-amber-400">
            {quests.filter((q) => q.status === 'Active').length}
          </div>
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mt-1">Active Bounties</div>
        </div>
        <div className="p-5 rounded-3xl bg-[#0D111A]/90 border border-white/10 text-center sm:text-left shadow-[0_0_25px_rgba(0,0,0,0.3)]">
          <div className="font-mono text-3xl font-extrabold text-indigo-400">{totalCompleted}</div>
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mt-1">Completed</div>
        </div>
        <div className="p-5 rounded-3xl bg-[#0D111A]/90 border border-white/10 text-center sm:text-left shadow-[0_0_25px_rgba(0,0,0,0.3)]">
          <div className="font-mono text-3xl font-extrabold text-emerald-400">{completionRate}%</div>
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mt-1">Discipline Rate</div>
        </div>
      </div>

      {/* 2. SEARCH & CONTROLS */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search quests, attributes..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-white/10 rounded-2xl text-slate-100 placeholder-slate-500 font-mono text-xs focus:outline-none focus:border-indigo-500/50"
            />
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center space-x-2">
              {(['Active', 'Completed', 'All'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold uppercase transition-all border cursor-pointer ${
                    selectedStatus === st
                      ? 'bg-indigo-950/80 text-indigo-300 border-indigo-500/50'
                      : 'bg-slate-900/60 text-slate-400 border-white/5 hover:text-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all flex items-center space-x-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Forge Quest</span>
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full font-mono text-xs font-semibold uppercase tracking-wider transition-all border cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-500 text-white border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                  : 'bg-slate-900/80 text-slate-400 border-white/5 hover:border-white/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. QUEST LIST */}
      <div className="space-y-3">
        {filteredQuests.length === 0 ? (
          <div className="py-20 text-center text-slate-500 rounded-3xl bg-[#0D111A]/60 border border-white/10">
            <p className="font-mono text-base tracking-wider text-slate-400 uppercase">NO QUESTS FOUND</p>
            <p className="font-sans text-xs mt-2 text-slate-500">Adjust filters or create a new quest to populate telemetry.</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredQuests.map((quest) => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </AnimatePresence>
        )}
      </div>

      <CreateQuestModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  );
}
