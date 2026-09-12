'use client';

// ==============================================================================
// ASCEND - TROPHY & ACHIEVEMENT CARD COMPONENT
// Minimalist Editorial Theme
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
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

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
    <div
      className={`p-6 bg-white border-4 border-[#141110] flex flex-col justify-between transition-all ${
        isUnlocked
          ? isClaimed
            ? 'shadow-[4px_4px_0_0_rgba(20,18,16,0.1)]'
            : 'shadow-[8px_8px_0_0_#C9A227]'
          : 'opacity-70 bg-[#F5F3EE] shadow-[4px_4px_0_0_rgba(20,18,16,0.1)]'
      }`}
    >
      <div>
        {/* Category & Status Bar */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-sans text-[10px] font-bold uppercase tracking-widest px-2 py-1 border-2 border-[#141110] bg-white text-[#141110]">
            {achievement.category}
          </span>
          {isUnlocked ? (
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#C9A227] flex items-center gap-1.5 px-2 py-1 border-2 border-[#C9A227] bg-white">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Unlocked {formatDate(userAchievement?.unlocked_at)}</span>
            </span>
          ) : (
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#6B6560] flex items-center gap-1.5">
              <Lock className="w-3 h-3" />
              <span>Locked</span>
            </span>
          )}
        </div>

        {/* Icon & Details */}
        <div className="flex items-start space-x-4 mb-4">
          <div
            className={`w-12 h-12 flex items-center justify-center shrink-0 border-2 border-[#141110] transition-all ${
              isUnlocked
                ? 'bg-[#141110] text-[#C9A227] shadow-[2px_2px_0_0_#C9A227]'
                : 'bg-white text-[#141110] shadow-[2px_2px_0_0_#141110]'
            }`}
          >
            <IconComponent className="w-6 h-6" />
          </div>

          <div>
            <h3 className="font-display text-lg font-black text-[#141110] uppercase tracking-widest leading-tight">
              {achievement.title}
            </h3>
            <p className="text-xs font-sans font-medium text-[#6B6560] mt-1 leading-relaxed">
              {achievement.description}
            </p>
          </div>
        </div>

        {/* Progress bar if locked */}
        {!isUnlocked && (
          <div className="my-4">
            <div className="flex items-center justify-between text-[11px] font-sans font-bold uppercase tracking-widest text-[#6B6560] mb-2">
              <span>Goal Progress</span>
              <span>
                {currentMetricValue} / {achievement.threshold} ({progressPercent}%)
              </span>
            </div>
            <div className="w-full bg-white border-2 border-[#141110] h-3">
              <div
                className="bg-[#141110] h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Rewards & Claim Action */}
      <div className="pt-4 border-t-2 border-[#141110]/10 flex flex-col sm:flex-row sm:items-center justify-between mt-2 gap-4">
        <div className="flex items-center space-x-4 text-xs font-sans font-bold uppercase tracking-widest">
          <span className="text-[#141110] flex items-center gap-1.5">
            <Zap className="w-4 h-4" /> +{achievement.reward_xp} XP
          </span>
          <span className="text-[#C9A227] flex items-center gap-1.5">
            <Coins className="w-4 h-4" /> +{achievement.reward_gold} G
          </span>
        </div>

        {isUnlocked && (
          <div className="shrink-0">
            {isClaimed ? (
              <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#4A463F] flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Claimed
              </span>
            ) : (
              <button
                onClick={handleClaim}
                disabled={isClaiming}
                className="py-2 px-4 border-2 border-[#141110] bg-[#C9A227] text-white font-sans text-xs font-bold uppercase tracking-widest shadow-[4px_4px_0_0_#141110] hover:bg-[#B45309] transition-all cursor-pointer w-full sm:w-auto"
              >
                {isClaiming ? 'Claiming...' : 'Claim Reward'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
