'use client';

// ==============================================================================
// ASCEND - TROPHY & ACHIEVEMENT CARD COMPONENT
// Vibrant Modern RPG HUD Achievement Tile
// ==============================================================================

import React, { useState } from 'react';
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
      className={`p-6 rounded-3xl border flex flex-col justify-between transition-all ${
        isUnlocked
          ? isClaimed
            ? 'bg-[#0D111A]/90 border-white/10'
            : 'bg-[#0D111A]/90 border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.2)]'
          : 'bg-[#0D111A]/40 border-white/5 opacity-60'
      }`}
    >
      <div>
        {/* Category & Status Bar */}
        <div className="flex items-center justify-between mb-4 font-mono text-xs">
          <span className="font-bold uppercase px-2.5 py-0.5 rounded-full border border-white/10 bg-slate-950 text-slate-300">
            {achievement.category}
          </span>
          {isUnlocked ? (
            <span className="font-bold uppercase text-amber-400 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-amber-500/40 bg-amber-950/40">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Unlocked {formatDate(userAchievement?.unlocked_at)}</span>
            </span>
          ) : (
            <span className="font-bold uppercase text-slate-500 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>Locked</span>
            </span>
          )}
        </div>

        {/* Icon & Details */}
        <div className="flex items-start space-x-4 mb-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-all ${
              isUnlocked
                ? 'bg-amber-950 border-amber-500/50 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                : 'bg-slate-950 border-white/5 text-slate-500'
            }`}
          >
            <IconComponent className="w-6 h-6" />
          </div>

          <div>
            <h3 className="font-mono text-base font-bold text-slate-100 uppercase leading-tight">
              {achievement.title}
            </h3>
            <p className="text-xs font-sans text-slate-400 mt-1 leading-relaxed">
              {achievement.description}
            </p>
          </div>
        </div>

        {/* Progress bar if locked */}
        {!isUnlocked && (
          <div className="my-4 font-mono text-xs">
            <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase mb-1.5">
              <span>Goal Progress</span>
              <span>
                {currentMetricValue} / {achievement.threshold} ({progressPercent}%)
              </span>
            </div>
            <div className="w-full bg-slate-950 border border-white/10 rounded-full h-2 overflow-hidden">
              <div
                className="bg-indigo-500 h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Rewards & Claim Action */}
      <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between mt-2 gap-4">
        <div className="flex items-center space-x-4 font-mono text-xs font-bold">
          <span className="text-indigo-400 flex items-center gap-1.5">
            <Zap className="w-4 h-4" /> +{achievement.reward_xp} XP
          </span>
          <span className="text-amber-400 flex items-center gap-1.5">
            <Coins className="w-4 h-4" /> +{achievement.reward_gold} G
          </span>
        </div>

        {isUnlocked && (
          <div className="shrink-0">
            {isClaimed ? (
              <span className="font-mono text-xs font-bold uppercase text-slate-400 flex items-center gap-1.5">
                <Check className="w-4 h-4 stroke-[3]" /> Claimed
              </span>
            ) : (
              <button
                onClick={handleClaim}
                disabled={isClaiming}
                className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all cursor-pointer w-full sm:w-auto"
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
