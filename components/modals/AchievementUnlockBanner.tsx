'use client';

// ==============================================================================
// ASCEND - STRONGEST VISUAL TREATMENT: ACHIEVEMENT UNLOCK PRESTIGE BANNER
// Minimalist Editorial Theme - Strong Gold Contrast
// ==============================================================================

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/lib/context/game-context';
import { Trophy, X, Sparkles, Coins, Zap } from 'lucide-react';
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
          className="bg-[#F59E0B] border-4 border-[#141110] p-6 relative overflow-hidden shadow-[8px_8px_0_0_#141110]"
        >
          {/* Subtle Shine Effect over flat color */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-50 pointer-events-none transform -skew-x-12 translate-x-full animate-[shimmer_2s_infinite]" />

          {/* Close button */}
          <button
            onClick={closeAchievementNotification}
            className="absolute top-3 right-3 text-[#141110] hover:text-white transition-colors z-20"
            aria-label="Close Notification"
          >
            <X className="w-5 h-5 stroke-[3]" />
          </button>

          <div className="flex items-start space-x-4 relative z-10">
            {/* Flat Crest */}
            <motion.div
              initial={{ rotate: -15, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', damping: 12 }}
              className="w-16 h-16 border-4 border-[#141110] bg-white shrink-0 flex items-center justify-center"
            >
              <Trophy className="w-8 h-8 text-[#E8552A]" />
            </motion.div>

            {/* Content */}
            <div className="flex-1 pr-4">
              <div className="flex items-center space-x-2 font-sans font-bold text-xs uppercase text-[#141110] tracking-widest">
                <Sparkles className="w-4 h-4 text-[#141110]" />
                <span>Trophy Unlocked</span>
              </div>

              <h3 className="font-display text-2xl font-bold text-[#141110] mt-1 tracking-widest uppercase">
                {unlockedAchievementNotification.title}
              </h3>

              <p className="text-sm text-[#6B6560] font-bold mt-1 font-sans leading-relaxed">
                {unlockedAchievementNotification.description}
              </p>

              {/* Reward Pills */}
              <div className="flex items-center space-x-3 mt-4 pt-4 border-t-2 border-[#141110]/20">
                <span className="font-display text-sm font-bold text-[#141110] flex items-center gap-1">
                  <Zap className="w-4 h-4" /> +
                  <AnimatedCounter value={unlockedAchievementNotification.reward_xp} /> XP
                </span>
                <span className="font-display text-sm font-bold text-[#141110] flex items-center gap-1">
                  <Coins className="w-4 h-4" /> +
                  <AnimatedCounter value={unlockedAchievementNotification.reward_gold} /> G
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
