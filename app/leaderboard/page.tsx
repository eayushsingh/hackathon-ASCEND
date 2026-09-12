'use client';

// ==============================================================================
// ASCEND - GLOBAL LEADERBOARD & HALL OF ASCENSION
// Vibrant Modern RPG HUD Leaderboard
// ==============================================================================

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/lib/context/game-context';
import { LeaderboardEntry } from '@/types/rpg';
import { ARCHETYPES } from '@/lib/progression/archetypes';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import {
  Trophy,
  Crown,
  Medal,
  Search,
  Users,
  Database,
  WifiOff,
} from 'lucide-react';

// ─── Rank badge renderer ────────────────────────────────────────────────────
function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div className="w-8 h-8 rounded-xl bg-amber-500 border border-amber-300 text-slate-950 flex items-center justify-center font-mono font-bold text-sm shadow-[0_0_20px_rgba(245,158,11,0.6)]">
        <Crown className="w-4 h-4 text-slate-950 fill-slate-950" />
      </div>
    );
  }
  if (rank === 2) {
    return (
      <div className="w-8 h-8 rounded-xl bg-slate-200 border border-white text-slate-950 flex items-center justify-center font-mono font-bold text-sm shadow-[0_0_12px_rgba(255,255,255,0.4)]">
        <Medal className="w-4 h-4 text-slate-950" />
      </div>
    );
  }
  if (rank === 3) {
    return (
      <div className="w-8 h-8 rounded-xl bg-amber-700 border border-amber-500 text-slate-100 flex items-center justify-center font-mono font-bold text-sm shadow-[0_0_12px_rgba(245,158,11,0.4)]">
        <Medal className="w-4 h-4 text-amber-300" />
      </div>
    );
  }
  return (
    <div className="w-8 h-8 rounded-xl bg-slate-950 border border-white/10 text-slate-400 flex items-center justify-center font-mono font-bold text-xs">
      #{rank}
    </div>
  );
}

// ─── Leaderboard row ────────────────────────────────────────────────────────
function LeaderboardRow({
  entry,
  index,
  isTop3Initial,
}: {
  entry: LeaderboardEntry;
  index: number;
  isTop3Initial: boolean;
}) {
  const archMeta = ARCHETYPES[entry.archetype] || ARCHETYPES['Cyber Mage'];

  return (
    <motion.div
      layout
      layoutId={`lb-row-${entry.user_id}`}
      initial={isTop3Initial ? { opacity: 0, y: 18 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={
        isTop3Initial
          ? { delay: index * 0.12, duration: 0.45, ease: [0.22, 1, 0.36, 1] }
          : { type: 'spring', stiffness: 400, damping: 35 }
      }
      className={`hover:bg-slate-900/70 transition-colors border-b border-white/5 ${
        entry.rank === 1 ? 'bg-indigo-950/20' : ''
      }`}
    >
      {/* ── Desktop layout (≥640px): grid row ── */}
      <div className="hidden sm:grid grid-cols-12 gap-3 px-6 py-4 items-center font-mono">
        {/* Rank */}
        <div className="col-span-1 flex justify-center">
          <RankBadge rank={entry.rank} />
        </div>

        {/* Identity */}
        <div className="col-span-5 flex items-center space-x-4 min-w-0">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-base font-mono font-extrabold text-white shrink-0 border border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.3)]"
            style={{
              backgroundColor: archMeta.color || '#6366F1',
            }}
          >
            {entry.username.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <span className="font-sans text-base font-bold text-slate-100 truncate block">
              {entry.username}
            </span>
            <span className="text-[10px] text-indigo-400 font-mono uppercase truncate block mt-0.5">
              {entry.title}
            </span>
          </div>
        </div>

        {/* Archetype */}
        <div className="col-span-3 flex items-center">
          <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full border border-white/10 bg-slate-950 text-slate-300">
            {entry.archetype}
          </span>
        </div>

        {/* Level */}
        <div className="col-span-1 text-center">
          <span className="font-mono text-lg font-bold text-indigo-400">
            {entry.level}
          </span>
        </div>

        {/* XP + Trophies */}
        <div className="col-span-2 text-right">
          <div className="font-mono text-base font-bold text-slate-100">
            <AnimatedCounter value={entry.total_xp} /> XP
          </div>
          <div className="text-[10px] text-amber-400 font-mono uppercase flex items-center justify-end gap-1 mt-0.5">
            <Trophy className="w-3 h-3 text-amber-400" />
            <span>{entry.achievement_count} Trophies</span>
          </div>
        </div>
      </div>

      {/* ── Mobile layout (<640px): stacked card ── */}
      <div className="sm:hidden px-4 py-4 flex items-center gap-4 font-mono">
        <RankBadge rank={entry.rank} />
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center text-base font-mono font-bold text-white shrink-0 border border-indigo-400"
          style={{
            backgroundColor: archMeta.color || '#6366F1',
          }}
        >
          {entry.username.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-sans text-sm font-bold text-slate-100 truncate">
              {entry.username}
            </span>
            <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border border-white/10 bg-slate-950 text-indigo-400 shrink-0">
              {entry.archetype.split(' ')[1] || entry.archetype}
            </span>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-mono">
            <span className="text-indigo-400 font-bold">LVL {entry.level}</span>
            <span className="text-slate-400">
              <AnimatedCounter value={entry.total_xp} /> XP
            </span>
            <span className="text-amber-400 flex items-center gap-0.5 font-bold">
              <Trophy className="w-2.5 h-2.5" /> {entry.achievement_count}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main page component ────────────────────────────────────────────────────
export default function LeaderboardPage() {
  const { profile, achievements, isConfigured } = useGame();

  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [currentUserStanding, setCurrentUserStanding] = useState<LeaderboardEntry | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArchetype, setSelectedArchetype] = useState<string>('All');
  const [isInitialMount, setIsInitialMount] = useState<boolean>(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      setIsLoading(true);
      try {
        if (isConfigured) {
          const res = await fetch('/api/leaderboard?limit=50');
          if (res.ok) {
            const data = await res.json();
            setLeaderboardData(data.leaderboard || []);
            setCurrentUserStanding(data.currentUserEntry || null);
            setTotalCount(data.totalParticipants || 0);
          } else {
            throw new Error('Leaderboard fetch failed');
          }
        } else {
          throw new Error('Supabase unconfigured');
        }
      } catch {
        // Fallback demo data
        const fallbackData: LeaderboardEntry[] = [
          { rank: 1, user_id: '1', username: 'Alex Sovereign', title: 'Grandmaster Arcane', archetype: 'Cyber Mage' as any, level: 34, total_xp: 28400, achievement_count: 14 },
          { rank: 2, user_id: '2', username: 'Elena Vance', title: 'Vanguard Paragon', archetype: 'Iron Titan' as any, level: 29, total_xp: 22100, achievement_count: 11 },
          { rank: 3, user_id: '3', username: 'Kaelen Voss', title: 'Shadow Stalker', archetype: 'Shadow Rogue' as any, level: 27, total_xp: 19800, achievement_count: 9 },
          { rank: 4, user_id: '4', username: profile.username || 'You', title: profile.title, archetype: profile.archetype, level: profile.level, total_xp: profile.xp, achievement_count: achievements.length },
          { rank: 5, user_id: '5', username: 'Marcus Kane', title: 'Bio Hacker', archetype: 'Bio Hacker' as any, level: 22, total_xp: 14200, achievement_count: 7 },
        ].sort((a, b) => b.total_xp - a.total_xp).map((item, idx) => ({ ...item, rank: idx + 1 }));

        setLeaderboardData(fallbackData);
        setTotalCount(fallbackData.length);
      } finally {
        setIsLoading(false);
        setIsInitialMount(false);
      }
    }

    fetchLeaderboard();
  }, [isConfigured, profile, achievements]);

  const filteredData = leaderboardData.filter((entry) => {
    if (selectedArchetype !== 'All' && entry.archetype !== selectedArchetype) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        entry.username.toLowerCase().includes(q) ||
        entry.title.toLowerCase().includes(q) ||
        entry.archetype.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const categories = ['All', 'Cyber Mage', 'Iron Titan', 'Shadow Rogue', 'Bio Hacker', 'Quantum Monk'];

  return (
    <div className="space-y-10 pb-16 pt-6">
      {/* HEADER HUD */}
      <div className="rounded-3xl bg-[#0D111A]/90 border border-indigo-500/30 p-6 sm:p-8 shadow-[0_0_35px_rgba(99,102,241,0.15)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-5 text-center md:text-left">
          <div className="w-14 h-14 bg-amber-950/80 border border-amber-500/40 rounded-2xl flex items-center justify-center text-amber-400 shrink-0 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
            <Trophy className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center justify-center md:justify-start space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              <Crown className="w-3.5 h-3.5" />
              <span>GLOBAL ASCENSION HALL</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight font-sans mt-1">
              Global Leaderboard
            </h1>
            <p className="text-xs sm:text-sm font-sans text-slate-400 mt-1 max-w-xl">
              Server-authoritative ranking across all active network operatives worldwide.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 font-mono text-xs text-slate-400">
          <div className="px-4 py-2 rounded-2xl bg-slate-950 border border-white/10 flex items-center space-x-2">
            <Users className="w-4 h-4 text-indigo-400" />
            <span>{totalCount} Operatives Active</span>
          </div>
        </div>
      </div>

      {/* FILTERS & SEARCH */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search operative, title..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-white/10 rounded-2xl text-slate-100 placeholder-slate-500 font-mono text-xs focus:outline-none focus:border-indigo-500/50"
            />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedArchetype(cat)}
                className={`px-4 py-1.5 rounded-full font-mono text-xs font-semibold uppercase tracking-wider transition-all border shrink-0 cursor-pointer ${
                  selectedArchetype === cat
                    ? 'bg-indigo-500 text-white border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                    : 'bg-slate-900/80 text-slate-400 border-white/5 hover:border-white/15 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TABLE DATA */}
      <div className="rounded-3xl bg-[#0D111A]/90 border border-indigo-500/30 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.3)]">
        <div className="hidden sm:grid grid-cols-12 gap-3 px-6 py-3 bg-slate-950 border-b border-white/10 font-mono text-xs font-bold text-slate-400 uppercase tracking-wider">
          <div className="col-span-1 text-center">Rank</div>
          <div className="col-span-5">Operative</div>
          <div className="col-span-3">Archetype</div>
          <div className="col-span-1 text-center">Level</div>
          <div className="col-span-2 text-right">Cumulative XP</div>
        </div>

        {isLoading ? (
          <div className="py-20 text-center text-slate-500 font-mono text-xs">
            Loading server rankings...
          </div>
        ) : filteredData.length === 0 ? (
          <div className="py-20 text-center text-slate-500 font-mono text-xs">
            No operatives matched search filters.
          </div>
        ) : (
          <div>
            {filteredData.map((entry, index) => (
              <LeaderboardRow
                key={entry.user_id}
                entry={entry}
                index={index}
                isTop3Initial={isInitialMount}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
