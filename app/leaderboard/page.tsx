'use client';

// ==============================================================================
// ASCEND - GLOBAL LEADERBOARD & HALL OF ASCENSION
// Shows public progression rankings: Level, Total XP, Archetype, Trophies
// Zero private data exposed (no email, no gold, no private transactions)
// ==============================================================================

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useGame } from '@/lib/context/game-context';
import { LeaderboardEntry, Archetype } from '@/types/rpg';
import { ARCHETYPES, ARCHETYPE_LIST } from '@/lib/progression/archetypes';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import {
  Trophy,
  Crown,
  Medal,
  Shield,
  Zap,
  Flame,
  Search,
  Users,
  Sparkles,
  ArrowUpRight,
  Filter,
  UserCheck,
} from 'lucide-react';
import { formatNumber } from '@/lib/utils';

export default function LeaderboardPage() {
  const { profile, achievements, isConfigured } = useGame();

  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [currentUserStanding, setCurrentUserStanding] = useState<LeaderboardEntry | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArchetype, setSelectedArchetype] = useState<string>('All');

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
            setIsLoading(false);
            return;
          }
        }

        // Demo Mode: Construct realistic Ascendant Hall of Fame with live player rank calculation
        const simulatedAscendants: Omit<LeaderboardEntry, 'rank' | 'is_current_user'>[] = [
          {
            user_id: 'ascendant-1',
            username: 'Vance_Neural',
            archetype: 'Cyber Mage',
            level: 18,
            total_xp: 7650,
            title: 'Neural Adept',
            achievement_count: 9,
          },
          {
            user_id: 'ascendant-2',
            username: 'Lyra_Voidwalker',
            archetype: 'Shadow Rogue',
            level: 14,
            total_xp: 5240,
            title: 'Shadow Operator',
            achievement_count: 7,
          },
          {
            user_id: 'ascendant-3',
            username: 'Kael_Thunderforge',
            archetype: 'Iron Titan',
            level: 11,
            total_xp: 3820,
            title: 'Cyber Vanguard',
            achievement_count: 6,
          },
          {
            user_id: 'ascendant-4',
            username: 'Seraphina_Aura',
            archetype: 'Nova Paladin',
            level: 8,
            total_xp: 2260,
            title: 'Cyber Vanguard',
            achievement_count: 5,
          },
          {
            user_id: 'ascendant-5',
            username: 'Jax_Biohazard',
            archetype: 'Bio Hacker',
            level: 5,
            total_xp: 1120,
            title: 'Cyber Vanguard',
            achievement_count: 4,
          },
          {
            user_id: 'ascendant-6',
            username: 'Zephyr_Starlight',
            archetype: 'Astral Sage',
            level: 3,
            total_xp: 540,
            title: 'Initiate Seeker',
            achievement_count: 2,
          },
        ];

        // Current active player entry
        const myEntry: Omit<LeaderboardEntry, 'rank' | 'is_current_user'> = {
          user_id: profile.user_id,
          username: profile.username,
          archetype: profile.archetype,
          level: profile.level,
          total_xp: profile.xp,
          title: profile.title,
          achievement_count: achievements.length,
        };

        // Combine and sort authoritatively by level DESC then total_xp DESC
        const combined = [...simulatedAscendants, myEntry].sort((a, b) => {
          if (b.level !== a.level) return b.level - a.level;
          return b.total_xp - a.total_xp;
        });

        const rankedList: LeaderboardEntry[] = combined.map((entry, idx) => ({
          ...entry,
          rank: idx + 1,
          is_current_user: entry.user_id === profile.user_id,
        }));

        const myRanked = rankedList.find((e) => e.is_current_user) || null;

        setLeaderboardData(rankedList);
        setCurrentUserStanding(myRanked);
        setTotalCount(rankedList.length);
        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    }

    fetchLeaderboard();
  }, [profile, achievements, isConfigured]);

  // Filter logic
  const filteredLeaderboard = leaderboardData.filter((entry) => {
    if (selectedArchetype !== 'All' && entry.archetype !== selectedArchetype) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        entry.username.toLowerCase().includes(q) ||
        entry.archetype.toLowerCase().includes(q) ||
        entry.title.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400 text-amber-300 flex items-center justify-center font-display font-black text-sm shadow-[0_0_15px_rgba(245,158,11,0.5)]">
          <Crown className="w-4 h-4 text-amber-400" />
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="w-8 h-8 rounded-lg bg-slate-300/20 border border-slate-300 text-slate-200 flex items-center justify-center font-display font-black text-sm shadow-[0_0_12px_rgba(203,213,225,0.4)]">
          <Medal className="w-4 h-4 text-slate-300" />
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="w-8 h-8 rounded-lg bg-amber-700/20 border border-amber-600 text-amber-400 flex items-center justify-center font-display font-black text-sm shadow-[0_0_12px_rgba(180,83,9,0.4)]">
          <Medal className="w-4 h-4 text-amber-600" />
        </div>
      );
    }
    return (
      <div className="w-8 h-8 rounded-lg bg-[#07090E] border border-white/10 text-slate-400 flex items-center justify-center font-display font-bold text-xs">
        #{rank}
      </div>
    );
  };

  const categories = ['All', ...ARCHETYPE_LIST.map((a) => a.id)];

  return (
    <div className="space-y-6 pb-12">
      {/* 1. HERO HEADER */}
      <div className="cyber-panel p-6 sm:p-8 rounded-2xl border-white/10 bg-[#0D111A]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2 text-[11px] font-mono text-cyan-400">
                <Shield className="w-3.5 h-3.5" />
                <span>HALL OF ASCENSION // GLOBAL RANKINGS</span>
              </div>
              <h1 className="font-display text-xl sm:text-2xl font-black text-white mt-1">
                GLOBAL ASCENDANT LEADERBOARD
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Public career standings verified by server-authoritative level and cumulative XP.
              </p>
            </div>
          </div>

          <div className="px-4 py-2.5 rounded-xl bg-[#07090E] border border-white/10 flex items-center space-x-3 shrink-0">
            <Users className="w-4 h-4 text-cyan-400" />
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">ACTIVE ASCENDANTS</div>
              <div className="font-display text-base font-black text-cyan-300">
                <AnimatedCounter value={totalCount} /> HEROES
              </div>
            </div>
          </div>
        </div>

        {/* 2. CURRENT USER PERSONAL STANDING CARD */}
        {currentUserStanding && (
          <div className="mt-4 p-4 rounded-xl bg-[#07090E] border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.15)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3.5 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center font-display font-black text-cyan-300 text-sm">
                #{currentUserStanding.rank}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-display text-sm font-black text-white">
                    {currentUserStanding.username}
                  </span>
                  <span className="text-[10px] font-display font-bold uppercase px-2 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    YOU
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  {currentUserStanding.archetype} • {currentUserStanding.title}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-center sm:text-right">
              <div>
                <div className="text-[10px] font-mono text-slate-500 uppercase">YOUR LEVEL</div>
                <div className="font-display text-sm font-black text-cyan-400">
                  LVL {currentUserStanding.level}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-500 uppercase">TOTAL XP</div>
                <div className="font-display text-sm font-black text-white">
                  <AnimatedCounter value={currentUserStanding.total_xp} /> XP
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-500 uppercase">TROPHIES</div>
                <div className="font-display text-sm font-black text-amber-400 flex items-center justify-center sm:justify-end gap-1">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>{currentUserStanding.achievement_count}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. SEARCH & ARCHETYPE FILTER CONTROLS */}
      <div className="cyber-panel p-4 rounded-xl space-y-3 bg-[#0D111A] border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hero codename..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#07090E] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-[10px] font-mono uppercase text-slate-500 mr-1 shrink-0">ARCHETYPE:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedArchetype(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all shrink-0 border ${
                  selectedArchetype === cat
                    ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40 shadow-[0_0_8px_rgba(6,182,212,0.2)]'
                    : 'bg-[#07090E] text-slate-400 hover:bg-white/5 border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. LEADERBOARD RANKING LIST */}
      <div className="cyber-panel rounded-2xl border-white/10 bg-[#0D111A] overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-3 px-5 py-3 border-b border-white/10 text-[10px] font-mono uppercase text-slate-500 bg-[#07090E]">
          <div className="col-span-2 sm:col-span-1 text-center">RANK</div>
          <div className="col-span-6 sm:col-span-5">HERO IDENTITY</div>
          <div className="hidden sm:block sm:col-span-3">CLASS ARCHETYPE</div>
          <div className="col-span-2 sm:col-span-1 text-center">LEVEL</div>
          <div className="col-span-2 sm:col-span-2 text-right">PROGRESSION XP</div>
        </div>

        {/* Rows */}
        {isLoading ? (
          <div className="py-16 text-center text-xs font-mono text-slate-400">
            Querying Neural Ascension Registry...
          </div>
        ) : filteredLeaderboard.length === 0 ? (
          <div className="py-20 text-center space-y-2">
            <Trophy className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="font-display text-sm font-bold text-slate-300">
              The Hall of Ascension awaits its first champion.
            </h3>
            <p className="text-xs text-slate-500">
              Complete quests to register your ascension on the leaderboard.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filteredLeaderboard.map((entry) => {
              const archMeta = ARCHETYPES[entry.archetype] || ARCHETYPES['Cyber Mage'];

              return (
                <div
                  key={entry.user_id}
                  className={`grid grid-cols-12 gap-3 px-5 py-3.5 items-center transition-colors ${
                    entry.is_current_user
                      ? 'bg-cyan-950/30 border-l-4 border-cyan-400'
                      : 'hover:bg-white/2'
                  }`}
                >
                  {/* Rank Badge */}
                  <div className="col-span-2 sm:col-span-1 flex justify-center">
                    {getRankBadge(entry.rank)}
                  </div>

                  {/* User Profile */}
                  <div className="col-span-6 sm:col-span-5 flex items-center space-x-3 min-w-0">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-display font-black text-white shrink-0 border"
                      style={{
                        backgroundColor: `${archMeta.color}20`,
                        borderColor: `${archMeta.color}40`,
                      }}
                    >
                      {entry.username.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-display text-xs sm:text-sm font-bold text-white truncate">
                          {entry.username}
                        </span>
                        {entry.is_current_user && (
                          <span className="text-[9px] font-display font-bold uppercase px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                            YOU
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {entry.title}
                      </div>
                    </div>
                  </div>

                  {/* Archetype Badge */}
                  <div className="hidden sm:flex sm:col-span-3 items-center">
                    <span
                      className="text-[10px] font-display font-bold uppercase px-2 py-0.5 rounded border"
                      style={{
                        color: archMeta.color,
                        backgroundColor: `${archMeta.color}15`,
                        borderColor: `${archMeta.color}35`,
                      }}
                    >
                      {entry.archetype}
                    </span>
                  </div>

                  {/* Level */}
                  <div className="col-span-2 sm:col-span-1 text-center">
                    <span className="font-display text-xs sm:text-sm font-black text-cyan-300">
                      {entry.level}
                    </span>
                  </div>

                  {/* Total XP & Trophy count */}
                  <div className="col-span-2 sm:col-span-2 text-right">
                    <div className="font-display text-xs sm:text-sm font-bold text-white">
                      {formatNumber(entry.total_xp)}
                    </div>
                    <div className="text-[10px] text-amber-400 font-semibold flex items-center justify-end gap-1">
                      <Trophy className="w-3 h-3" />
                      <span>{entry.achievement_count} Trophies</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
