'use client';

// ==============================================================================
// ASCEND - GLOBAL LEADERBOARD & HALL OF ASCENSION
// Live Supabase-backed rankings only — zero fake/seeded data.
// Current user pinned in a separate "Your Standing" card, never duplicated
// in the ranking table below.
// ==============================================================================

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/lib/context/game-context';
import { LeaderboardEntry, Archetype } from '@/types/rpg';
import { ARCHETYPES, ARCHETYPE_LIST } from '@/lib/progression/archetypes';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import {
  Trophy,
  Crown,
  Medal,
  Shield,
  Search,
  Users,
  Sparkles,
  Database,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { formatNumber } from '@/lib/utils';

// ─── Rank badge renderer ────────────────────────────────────────────────────
function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400 text-amber-300 flex items-center justify-center font-display font-black text-sm shadow-[0_0_15px_rgba(245,158,11,0.5)] rank-1-shimmer">
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
}

// ─── Leaderboard row (used in both desktop table and mobile cards) ──────────
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
      className={`hover:bg-white/[0.03] transition-colors ${
        entry.rank === 1 ? 'rank-1-shimmer-row' : ''
      }`}
    >
      {/* ── Desktop layout (≥640px): grid row ── */}
      <div className="hidden sm:grid grid-cols-12 gap-3 px-5 py-3.5 items-center">
        {/* Rank */}
        <div className="col-span-1 flex justify-center">
          <RankBadge rank={entry.rank} />
        </div>

        {/* Identity */}
        <div className="col-span-5 flex items-center space-x-3 min-w-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-display font-black text-white shrink-0 border"
            style={{
              backgroundColor: `${archMeta.color}20`,
              borderColor: `${archMeta.color}40`,
            }}
          >
            {entry.username.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <span className="font-display text-sm font-bold text-white truncate block">
              {entry.username}
            </span>
            <span className="text-[11px] text-slate-400 truncate block">
              {entry.title}
            </span>
          </div>
        </div>

        {/* Archetype */}
        <div className="col-span-3 flex items-center">
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
        <div className="col-span-1 text-center">
          <span className="font-display text-sm font-black text-cyan-300">
            {entry.level}
          </span>
        </div>

        {/* XP + Trophies */}
        <div className="col-span-2 text-right">
          <div className="font-display text-sm font-bold text-white">
            <AnimatedCounter value={entry.total_xp} />
          </div>
          <div className="text-[10px] text-amber-400 font-semibold flex items-center justify-end gap-1">
            <Trophy className="w-3 h-3" />
            <span>{entry.achievement_count} Trophies</span>
          </div>
        </div>
      </div>

      {/* ── Mobile layout (<640px): stacked card ── */}
      <div className="sm:hidden px-4 py-3.5 flex items-center gap-3">
        <RankBadge rank={entry.rank} />
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-display font-black text-white shrink-0 border"
          style={{
            backgroundColor: `${archMeta.color}20`,
            borderColor: `${archMeta.color}40`,
          }}
        >
          {entry.username.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-display text-sm font-bold text-white truncate">
              {entry.username}
            </span>
            <span
              className="text-[9px] font-display font-bold uppercase px-1.5 py-0.5 rounded border shrink-0"
              style={{
                color: archMeta.color,
                backgroundColor: `${archMeta.color}15`,
                borderColor: `${archMeta.color}35`,
              }}
            >
              {entry.archetype.split(' ')[1] || entry.archetype}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-0.5 text-[11px] text-slate-400">
            <span className="font-display font-bold text-cyan-300">LVL {entry.level}</span>
            <span className="text-white font-semibold">
              <AnimatedCounter value={entry.total_xp} /> XP
            </span>
            <span className="text-amber-400 flex items-center gap-0.5">
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
  const isInitialMount = useRef(true);

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
            // After initial mount, disable stagger animations
            setTimeout(() => { isInitialMount.current = false; }, 800);
            return;
          }
        }

        // No Supabase configured: show only the real current demo user
        // (no fake competitors, no seeded hero names)
        const myEntry: LeaderboardEntry = {
          rank: 1,
          user_id: profile.user_id,
          username: profile.username,
          archetype: profile.archetype,
          level: profile.level,
          total_xp: profile.xp,
          title: profile.title,
          achievement_count: achievements.length,
          is_current_user: true,
        };

        setLeaderboardData([myEntry]);
        setCurrentUserStanding(myEntry);
        setTotalCount(1);
        setIsLoading(false);
        setTimeout(() => { isInitialMount.current = false; }, 800);
      } catch {
        setIsLoading(false);
      }
    }

    fetchLeaderboard();
  }, [profile, achievements, isConfigured]);

  // ─── Filter + search (operates on live data only) ─────────────────────────
  const filteredLeaderboard = leaderboardData.filter((entry) => {
    // Exclude the current user from the table — they're shown in the pinned card
    if (entry.is_current_user) return false;
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

  // Only other users in the list (for empty state logic)
  const hasOtherPlayers = leaderboardData.some((e) => !e.is_current_user);

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
                <AnimatedCounter value={totalCount} /> {totalCount === 1 ? 'HERO' : 'HEROES'}
              </div>
            </div>
          </div>
        </div>

        {/* Supabase not configured banner */}
        {!isConfigured && !isLoading && (
          <div className="mt-4 px-4 py-3 rounded-xl bg-amber-950/30 border border-amber-600/30 flex items-center gap-3">
            <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-amber-300">Offline Demo Mode</div>
              <div className="text-[11px] text-slate-400">
                Connect Supabase credentials in <code className="text-amber-400/80">.env.local</code> to see live global rankings from real signed-up users.
              </div>
            </div>
          </div>
        )}

        {/* 2. CURRENT USER PERSONAL STANDING CARD (pinned, never duplicated below) */}
        {currentUserStanding && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 p-4 rounded-xl bg-[#07090E] border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.15)] flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center space-x-3.5 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center font-display font-black text-cyan-300 text-sm">
                #{currentUserStanding.rank}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-display text-sm font-black text-white">
                    {currentUserStanding.username}
                  </span>
                  <span className="text-[10px] font-display font-bold uppercase px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
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
          </motion.div>
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
              aria-label="Search hero codename"
            />
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0" role="tablist" aria-label="Filter by archetype">
            <span className="text-[10px] font-mono uppercase text-slate-500 mr-1 shrink-0">ARCHETYPE:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={selectedArchetype === cat}
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

      {/* 4. LEADERBOARD RANKING TABLE */}
      <div className="cyber-panel rounded-2xl border-white/10 bg-[#0D111A] overflow-hidden">
        {/* Table Header (desktop only) */}
        <div className="hidden sm:grid grid-cols-12 gap-3 px-5 py-3 border-b border-white/10 text-[10px] font-mono uppercase text-slate-500 bg-[#07090E]">
          <div className="col-span-1 text-center">RANK</div>
          <div className="col-span-5">HERO IDENTITY</div>
          <div className="col-span-3">CLASS ARCHETYPE</div>
          <div className="col-span-1 text-center">LEVEL</div>
          <div className="col-span-2 text-right">PROGRESSION XP</div>
        </div>

        {/* Rows */}
        {isLoading ? (
          <div className="py-16 text-center text-xs font-mono text-slate-400 flex flex-col items-center gap-3">
            <Database className="w-6 h-6 text-cyan-500/50 animate-pulse" />
            <span>Querying Neural Ascension Registry...</span>
          </div>
        ) : !hasOtherPlayers ? (
          // Empty/solo state: no other players to show in the table
          <div className="py-20 text-center space-y-2">
            <Trophy className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="font-display text-sm font-bold text-slate-300">
              The Hall of Ascension awaits its first champion.
            </h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              {isConfigured
                ? 'Complete quests and gain XP to climb the global rankings. Invite others to compete!'
                : 'Connect Supabase to unlock global leaderboard competition across real players.'}
            </p>
          </div>
        ) : filteredLeaderboard.length === 0 ? (
          // Filter returned no results
          <div className="py-16 text-center space-y-2">
            <Search className="w-8 h-8 text-slate-600 mx-auto" />
            <h3 className="font-display text-sm font-bold text-slate-300">
              No heroes match your search.
            </h3>
            <p className="text-xs text-slate-500">
              Try a different codename or archetype filter.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            <AnimatePresence mode="popLayout">
              {filteredLeaderboard.map((entry, index) => (
                <LeaderboardRow
                  key={entry.user_id}
                  entry={entry}
                  index={index}
                  isTop3Initial={isInitialMount.current && entry.rank <= 3}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Inline CSS for rank #1 gold shimmer — scoped keyframe */}
      <style jsx global>{`
        @keyframes rank1Shimmer {
          0%, 100% { box-shadow: 0 0 15px rgba(245,158,11,0.5); }
          50% { box-shadow: 0 0 25px rgba(245,158,11,0.7), 0 0 8px rgba(251,191,36,0.3); }
        }
        .rank-1-shimmer {
          animation: rank1Shimmer 3s ease-in-out infinite;
        }
        .rank-1-shimmer-row {
          background: linear-gradient(90deg, rgba(245,158,11,0.04) 0%, transparent 40%);
        }
      `}</style>
    </div>
  );
}
