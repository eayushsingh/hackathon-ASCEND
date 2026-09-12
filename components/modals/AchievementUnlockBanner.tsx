'use client';

// ==============================================================================
// ASCEND - ACHIEVEMENTS UNLOCK FLOATING NOTIFICATION
// ==============================================================================

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/lib/context/game-context';
import { Trophy, X, Sparkles, Coins, Zap } from 'lucide-react';

export const AchievementUnlockBanner: React.FC = () => {
  const { unlockedAchievementNotification, closeAchievementNotification } = useGame();

  if (!unlockedAchievementNotification) return null;

  return (
    <AnimatePresence>
      <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="rounded-xl bg-[#0F1420]/95 border border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.3)] p-4 relative backdrop-blur-xl"
        >
          <button
            onClick={closeAchievementNotification}
            className="absolute top-2 right-2 text-slate-400 hover:text-white p-1"
            aria-label="Close Notification"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
              <Trophy className="w-6 h-6 text-amber-400 animate-bounce" />
            </div>
            <div className="flex-1 pr-3">
              <div className="flex items-center space-x-1.5 text-[10px] font-extrabold uppercase text-amber-400 tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>Achievement Unlocked</span>
              </div>
              <h4 className="text-sm font-bold text-white mt-0.5">
                {unlockedAchievementNotification.title}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {unlockedAchievementNotification.description}
              </p>
              <div className="flex items-center space-x-3 mt-2 text-xs font-bold">
                <span className="text-cyan-400 flex items-center gap-1">
                  <Zap className="w-3 h-3" /> +{unlockedAchievementNotification.reward_xp} XP
                </span>
                <span className="text-amber-400 flex items-center gap-1">
                  <Coins className="w-3 h-3" /> +{unlockedAchievementNotification.reward_gold} Gold
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
