'use client';

// ==============================================================================
// ASCEND - STRONGEST VISUAL TREATMENT: ACHIEVEMENT UNLOCK PRESTIGE BANNER
// Saturated gold radiance, particle glow, and Orbitron typography
// ==============================================================================

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/lib/context/game-context';
import { Trophy, X, Sparkles, Coins, Zap, Crown } from 'lucide-react';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

export const AchievementUnlockBanner: React.FC = () => {
  const { unlockedAchievementNotification, closeAchievementNotification } = useGame();

  if (!unlockedAchievementNotification) return null;

  return (
    <AnimatePresence>
      <div className="fixed bottom-6 right-6 z-50 max-w-md w-full px-4 sm:px-0">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="rounded-2xl bg-gradient-to-br from-[#1C1306] via-[#100C05] to-[#07090E] border-2 border-amber-400 shadow-[0_0_50px_rgba(245,158,11,0.6)] p-5 relative overflow-hidden backdrop-blur-2xl ring-1 ring-amber-300/40"
        >
          {/* Saturated Golden Radiant Rays */}
          <div className="absolute -top-16 -left-16 w-48 h-48 bg-amber-500/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={closeAchievementNotification}
            className="absolute top-3 right-3 text-amber-300/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors z-20"
            aria-label="Close Notification"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start space-x-4 relative z-10">
            {/* Glowing Golden Crest */}
            <motion.div
              initial={{ rotate: -15, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', damping: 12 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-0.5 shadow-[0_0_25px_rgba(245,158,11,0.8)] shrink-0 flex items-center justify-center"
            >
              <div className="w-full h-full bg-[#140E06] rounded-[14px] flex items-center justify-center text-amber-400">
                <Trophy className="w-8 h-8 text-amber-300 drop-shadow-[0_0_10px_rgba(245,158,11,0.9)] animate-bounce" />
              </div>
            </motion.div>

            {/* Content */}
            <div className="flex-1 pr-4">
              <div className="flex items-center space-x-1.5 font-display text-[10px] font-black uppercase text-amber-300 tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>TROPHY UNLOCKED</span>
              </div>

              <h3 className="font-display text-base font-black text-white mt-1 tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
                {unlockedAchievementNotification.title}
              </h3>

              <p className="text-xs text-amber-200/80 mt-1 font-sans leading-relaxed">
                {unlockedAchievementNotification.description}
              </p>

              {/* Reward Pills */}
              <div className="flex items-center space-x-3 mt-3 pt-2 border-t border-amber-500/20">
                <span className="font-display text-xs font-black text-cyan-300 flex items-center gap-1 bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" /> +
                  <AnimatedCounter value={unlockedAchievementNotification.reward_xp} /> XP
                </span>
                <span className="font-display text-xs font-black text-amber-300 flex items-center gap-1 bg-amber-950/80 px-2.5 py-1 rounded-lg border border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                  <Coins className="w-3.5 h-3.5 text-amber-400" /> +
                  <AnimatedCounter value={unlockedAchievementNotification.reward_gold} /> Gold
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
