'use client';

// ==============================================================================
// ASCEND - GLOBAL LEADERBOARD & HALL OF ASCENSION
// Minimalist Editorial Theme
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
  Database,
  WifiOff,
} from 'lucide-react';

// ─── Rank badge renderer ────────────────────────────────────────────────────
function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div className="w-8 h-8 bg-white border-2 border-[#141110] text-[#E8552A] flex items-center justify-center font-display font-black text-sm shadow-[2px_2px_0_0_#141110]">
        <Crown className="w-4 h-4 text-[#E8552A]" />
      </div>
    );
  }
  if (rank === 2) {
    return (
      <div className="w-8 h-8 bg-white border-2 border-[#141110] text-[#141110] flex items-center justify-center font-display font-black text-sm shadow-[2px_2px_0_0_#141110]">
        <Medal className="w-4 h-4 text-[#141110]" />
      </div>
    );
  }
  if (rank === 3) {
    return (
      <div className="w-8 h-8 bg-white border-2 border-[#141110] text-[#C9A227] flex items-center justify-center font-display font-black text-sm shadow-[2px_2px_0_0_#141110]">
        <Medal className="w-4 h-4 text-[#C9A227]" />
      </div>
    );
  }
  return (
    <div className="w-8 h-8 bg-[#F5F3EE] border-2 border-[#141110] text-[#141110] flex items-center justify-center font-display font-bold text-xs">
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
      className={`hover:bg-[#141110]/5 transition-colors border-b-2 border-[#141110]/10 ${
        entry.rank === 1 ? 'bg-[#E8552A]/5' : ''
      }`}
    >
      {/* ── Desktop layout (≥640px): grid row ── */}
      <div className="hidden sm:grid grid-cols-12 gap-3 px-6 py-4 items-center">
        {/* Rank */}
        <div className="col-span-1 flex justify-center">
          <RankBadge rank={entry.rank} />
        </div>

        {/* Identity */}
        <div className="col-span-5 flex items-center space-x-4 min-w-0">
          <div
            className="w-10 h-10 flex items-center justify-center text-base font-display font-black text-white shrink-0 border-2 border-[#141110] shadow-[2px_2px_0_0_#141110]"
            style={{
              backgroundColor: archMeta.color,
            }}
          >
            {entry.username.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <span className="font-display text-base font-bold text-[#141110] uppercase tracking-widest truncate block">
              {entry.username}
            </span>
            <span className="text-[10px] text-[#6B6560] font-sans font-bold uppercase tracking-widest truncate block mt-0.5">
              {entry.title}
            </span>
          </div>
        </div>

        {/* Archetype */}
        <div className="col-span-3 flex items-center">
          <span
            className="text-[10px] font-sans font-bold uppercase tracking-widest px-2 py-1 border-2 bg-white"
            style={{
              color: '#141110',
              borderColor: '#141110',
            }}
          >
            {entry.archetype}
          </span>
        </div>

        {/* Level */}
        <div className="col-span-1 text-center">
          <span className="font-display text-lg font-black text-[#E8552A]">
            {entry.level}
          </span>
        </div>

        {/* XP + Trophies */}
        <div className="col-span-2 text-right">
          <div className="font-display text-base font-bold text-[#141110]">
            <AnimatedCounter value={entry.total_xp} />
          </div>
          <div className="text-[10px] text-[#C9A227] font-sans font-bold uppercase tracking-widest flex items-center justify-end gap-1 mt-0.5">
            <Trophy className="w-3 h-3" />
            <span>{entry.achievement_count} Trophies</span>
          </div>
        </div>
      </div>

      {/* ── Mobile layout (<640px): stacked card ── */}
      <div className="sm:hidden px-4 py-4 flex items-center gap-4">
        <RankBadge rank={entry.rank} />
        <div
          className="w-10 h-10 flex items-center justify-center text-base font-display font-black text-white shrink-0 border-2 border-[#141110] shadow-[2px_2px_0_0_#141110]"
          style={{
            backgroundColor: archMeta.color,
          }}
        >
          {entry.username.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-display text-sm font-bold text-[#141110] uppercase tracking-widest truncate">
              {entry.username}
            </span>
            <span
              className="text-[9px] font-sans font-bold uppercase tracking-widest px-1.5 py-0.5 border-2 border-[#141110] shrink-0 bg-white"
            >
              {entry.archetype.split(' ')[1] || entry.archetype}
            </span>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-sans font-bold uppercase tracking-widest">
            <span className="text-[#E8552A]">LVL {entry.level}</span>
            <span className="text-[#6B6560]">
              <AnimatedCounter value={entry.total_xp} /> XP
            </span>
            <span className="text-[#C9A227] flex items-center gap-0.5">
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
            setIsLoading(false);
            // After initial mount, disable stagger animations
            setTimeout(() => { setIsInitialMount(false); }, 800);
            return;
          }
          // Log the actual error so it's visible in dev tools
          const errBody = await res.text();
          console.error(`[ASCEND Leaderboard] API returned ${res.status}:`, errBody);
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
        setTimeout(() => { setIsInitialMount(false); }, 800);
      } catch (err) {
        console.error('[ASCEND Leaderboard] Failed to fetch rankings:', err);
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
    <div className="space-y-12 pb-12 pt-8">
      {/* 1. HERO HEADER */}
      <div className="p-8 bg-white border-4 border-[#141110] shadow-[8px_8px_0_0_#141110]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b-2 border-[#141110]/10">
          <div className="flex items-center space-x-6 text-center md:text-left">
            <div className="w-16 h-16 bg-[#E8552A] border-4 border-[#141110] flex items-center justify-center text-white shrink-0 shadow-[4px_4px_0_0_#141110]">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start space-x-2 text-[10px] font-sans font-bold uppercase tracking-widest text-[#E8552A]">
                <Shield className="w-3 h-3" />
                <span>Hall of Ascension // Global Rankings</span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-black text-[#141110] uppercase tracking-widest mt-2">
                Leaderboard
              </h1>
              <p className="text-sm font-sans font-medium text-[#6B6560] mt-2 max-w-lg">
                Public career standings verified by server-authoritative level and cumulative XP.
              </p>
            </div>
          </div>

          <div className="px-6 py-4 bg-[#F5F3EE] border-2 border-[#141110] flex items-center space-x-4 shrink-0 shadow-[4px_4px_0_0_#141110]">
            <Users className="w-6 h-6 text-[#141110]" />
            <div>
              <div className="text-[10px] font-sans font-bold text-[#6B6560] uppercase tracking-widest">Active Ascendants</div>
              <div className="font-display text-xl font-black text-[#141110] uppercase tracking-widest mt-1">
                <AnimatedCounter value={totalCount} /> {totalCount === 1 ? 'Hero' : 'Heroes'}
              </div>
            </div>
          </div>
        </div>

        {/* Supabase not configured banner */}
        {!isConfigured && !isLoading && (
          <div className="mt-6 px-6 py-4 bg-[#F5F3EE] border-2 border-[#141110] flex items-center gap-4 shadow-[4px_4px_0_0_rgba(20,18,16,0.1)]">
            <WifiOff className="w-5 h-5 text-[#C9A227] shrink-0" />
            <div>
              <div className="text-sm font-display font-black text-[#C9A227] uppercase tracking-widest">Offline Demo Mode</div>
              <div className="text-xs font-sans font-medium text-[#6B6560] mt-1">
                Connect Supabase credentials in <code className="font-bold text-[#141110]">.env.local</code> to see live global rankings from real signed-up users.
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
            className="mt-8 p-6 bg-[#141110] border-4 border-[#141110] shadow-[8px_8px_0_0_#E8552A] flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center space-x-4 text-center sm:text-left">
              <div className="w-14 h-14 bg-white border-2 border-white flex items-center justify-center font-display font-black text-[#141110] text-xl shadow-[4px_4px_0_0_#E8552A]">
                #{currentUserStanding.rank}
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start space-x-3 mb-1">
                  <span className="font-display text-xl font-black text-white uppercase tracking-widest">
                    {currentUserStanding.username}
                  </span>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest px-2 py-1 bg-[#E8552A] text-white border-2 border-white">
                    YOU
                  </span>
                </div>
                <div className="text-xs font-sans font-medium text-[#A8A29E] uppercase tracking-widest">
                  {currentUserStanding.archetype} • {currentUserStanding.title}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-8 text-center sm:text-right">
              <div>
                <div className="text-[10px] font-sans font-bold text-[#A8A29E] uppercase tracking-widest">Level</div>
                <div className="font-display text-lg font-black text-[#E8552A] mt-1">
                  {currentUserStanding.level}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-sans font-bold text-[#A8A29E] uppercase tracking-widest">Total XP</div>
                <div className="font-display text-lg font-black text-white mt-1">
                  <AnimatedCounter value={currentUserStanding.total_xp} />
                </div>
              </div>
              <div>
                <div className="text-[10px] font-sans font-bold text-[#A8A29E] uppercase tracking-widest">Trophies</div>
                <div className="font-display text-lg font-black text-[#C9A227] flex items-center justify-center sm:justify-end gap-1.5 mt-1">
                  <Trophy className="w-4 h-4" />
                  <span>{currentUserStanding.achievement_count}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* 3. SEARCH & ARCHETYPE FILTER CONTROLS */}
      <div className="p-6 bg-white border-4 border-[#141110] shadow-[8px_8px_0_0_#141110]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="relative w-full lg:w-96">
            <Search className="w-5 h-5 text-[#141110] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hero codename..."
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-[#141110] text-[#141110] font-sans font-bold uppercase tracking-wider placeholder-[#6B6560] focus:outline-none focus:shadow-[4px_4px_0_0_#E8552A] shadow-[4px_4px_0_0_rgba(20,18,16,0.1)] transition-all"
            />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={selectedArchetype === cat}
                onClick={() => setSelectedArchetype(cat)}
                className={`px-4 py-2 text-xs font-sans font-bold uppercase tracking-widest transition-all shrink-0 border-2 ${
                  selectedArchetype === cat
                    ? 'bg-[#141110] text-white border-[#141110] shadow-[4px_4px_0_0_#E8552A]'
                    : 'bg-white text-[#6B6560] hover:text-[#141110] border-[#141110]/20 hover:border-[#141110] shadow-[4px_4px_0_0_rgba(20,18,16,0.1)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. LEADERBOARD RANKING TABLE */}
      <div className="bg-white border-4 border-[#141110] shadow-[8px_8px_0_0_#141110] overflow-hidden">
        {/* Table Header (desktop only) */}
        <div className="hidden sm:grid grid-cols-12 gap-3 px-6 py-4 border-b-4 border-[#141110] text-[10px] font-sans font-bold uppercase tracking-widest text-[#6B6560] bg-[#F5F3EE]">
          <div className="col-span-1 text-center">Rank</div>
          <div className="col-span-5">Hero Identity</div>
          <div className="col-span-3">Class Archetype</div>
          <div className="col-span-1 text-center">Level</div>
          <div className="col-span-2 text-right">Progression XP</div>
        </div>

        {/* Rows */}
        {isLoading ? (
          <div className="py-20 text-center text-xs font-sans font-bold uppercase tracking-widest text-[#6B6560] flex flex-col items-center gap-4">
            <Database className="w-8 h-8 text-[#E8552A] animate-bounce" />
            <span>Querying Neural Ascension Registry...</span>
          </div>
        ) : !hasOtherPlayers ? (
          // Empty/solo state: no other players to show in the table
          <div className="py-24 text-center space-y-4">
            <Trophy className="w-12 h-12 text-[#141110]/30 mx-auto" />
            <h3 className="font-display text-xl font-black text-[#141110] uppercase tracking-widest">
              The Hall of Ascension awaits its first champion.
            </h3>
            <p className="text-sm font-sans font-medium text-[#6B6560] max-w-md mx-auto">
              {isConfigured
                ? 'Complete quests and gain XP to climb the global rankings. Invite others to compete!'
                : 'Connect Supabase to unlock global leaderboard competition across real players.'}
            </p>
          </div>
        ) : filteredLeaderboard.length === 0 ? (
          // Filter returned no results
          <div className="py-20 text-center space-y-4">
            <Search className="w-10 h-10 text-[#141110]/30 mx-auto" />
            <h3 className="font-display text-lg font-black text-[#141110] uppercase tracking-widest">
              No heroes match your search.
            </h3>
            <p className="text-sm font-sans font-medium text-[#6B6560]">
              Try a different codename or archetype filter.
            </p>
          </div>
        ) : (
          <div className="divide-y-2 divide-[#141110]/10">
            <AnimatePresence mode="popLayout">
              {filteredLeaderboard.map((entry, index) => (
                <LeaderboardRow
                  key={entry.user_id}
                  entry={entry}
                  index={index}
                  isTop3Initial={isInitialMount && entry.rank <= 3}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
