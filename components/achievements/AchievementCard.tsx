'use client';

// ==============================================================================
// ASCEND - TROPHY & ACHIEVEMENT CARD COMPONENT
// ==============================================================================

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Achievement, UserAchievement } from '@/types/rpg';
import { useGame } from '@/lib/context/game-context';
import {
  Zap,
  TrendingUp,
  Award,
  Crown,
  CheckCircle2,
  Swords,
  Flame,
  Sparkles,
  Trophy,
  Brain,
  Activity,
  Coins,
  ShoppingBag,
  Infinity as InfinityIcon,
  Check,
  Lock,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

const ICON_MAP: Record<string, React.ElementType> = {
  Zap,
  TrendingUp,
  Award,
  Crown,
  CheckCircle2,
  Swords,
  Flame,
  Sparkles,
  Trophy,
  Brain,
  Activity,
  Coins,
  ShoppingBag,
  Infinity: InfinityIcon,
};

interface AchievementCardProps {
  achievement: Achievement;
  userAchievement?: UserAchievement;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, userAchievement }) => {
  const { claimAchievementReward, quests, streak, profile, attributes, inventory } = useGame();
  const [isClaiming, setIsClaiming] = useState(false);

  const isUnlocked = Boolean(userAchievement);
  const isClaimed = Boolean(userAchievement?.is_claimed);

  const IconComponent = ICON_MAP[achievement.icon] || Trophy;

  // Calculate real progress toward threshold
  let currentMetricValue = 0;
  switch (achievement.target_metric) {
    case 'quests_completed':
      currentMetricValue = quests.filter((q) => q.status === 'Completed').length;
      break;
    case 'level_reached':
      currentMetricValue = profile.level;
      break;
    case 'streak_days':
      currentMetricValue = Math.max(streak.current_streak, streak.longest_streak);
      break;
    case 'attribute_intellect':
      currentMetricValue = attributes.intellect_xp || 0;
      break;
    case 'attribute_physical':
      currentMetricValue = (attributes.strength_xp || 0) + (attributes.vitality_xp || 0);
      break;
    case 'gold_balance':
      currentMetricValue = profile.gold;
      break;
    case 'items_purchased':
      currentMetricValue = inventory.length;
      break;
  }

  const progressPercent = Math.min(100, Math.floor((currentMetricValue / achievement.threshold) * 100));

  const handleClaim = async () => {
    if (isClaiming || isClaimed || !isUnlocked) return;
    setIsClaiming(true);
    try {
      await claimAchievementReward(achievement.code);
    } catch {
      // Handled
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`cyber-panel p-5 rounded-2xl flex flex-col justify-between transition-all border ${
        isUnlocked
          ? isClaimed
            ? 'bg-[#0F1420]/70 border-white/10'
            : 'bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-900 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
          : 'bg-[#0A0D15]/60 border-white/5 opacity-70'
      }`}
    >
      <div>
        {/* Category & Status */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-white/5">
            {achievement.category}
          </span>
          {isUnlocked ? (
            <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
              <Sparkles className="w-3 h-3" />
              <span>Unlocked {formatDate(userAchievement?.unlocked_at)}</span>
            </span>
          ) : (
            <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Locked</span>
            </span>
          )}
        </div>

        {/* Icon & Title */}
        <div className="flex items-start space-x-3.5 mb-3">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
              isUnlocked
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                : 'bg-slate-900 text-slate-600 border-white/5'
            }`}
          >
            <IconComponent className="w-6 h-6" />
          </div>

          <div>
            <h4 className="text-sm font-bold text-white tracking-tight">
              {achievement.title}
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              {achievement.description}
            </p>
          </div>
        </div>

        {/* Progress bar if not yet unlocked */}
        {!isUnlocked && (
          <div className="my-3">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-1">
              <span>Progress</span>
              <span>
                {currentMetricValue} / {achievement.threshold} ({progressPercent}%)
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-cyan-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Rewards & Claim Action */}
      <div className="pt-3 border-t border-white/5 flex items-center justify-between mt-2">
        <div className="flex items-center space-x-3 text-xs font-bold">
          <span className="text-cyan-400 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> +{achievement.reward_xp} XP
          </span>
          <span className="text-amber-400 flex items-center gap-1">
            <Coins className="w-3.5 h-3.5" /> +{achievement.reward_gold} Gold
          </span>
        </div>

        {isUnlocked && (
          <div>
            {isClaimed ? (
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Claimed
              </span>
            ) : (
              <button
                onClick={handleClaim}
                disabled={isClaiming}
                className="py-1.5 px-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs shadow-[0_0_10px_rgba(245,158,11,0.4)] transition-all animate-bounce"
              >
                {isClaiming ? 'Claiming...' : 'Claim Reward!'}
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};
