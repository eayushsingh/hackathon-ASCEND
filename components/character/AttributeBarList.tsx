'use client';

// ==============================================================================
// ASCEND - ATTRIBUTE PROGRESSION BARS & MASTERY BREAKDOWN
// ==============================================================================

import React from 'react';
import { useGame } from '@/lib/context/game-context';
import { ATTRIBUTE_LIST, calculateAttributeLevel, getAttributeMasteryTitle } from '@/lib/progression/attributes';
import { Brain, Dumbbell, Heart, Target, Sparkles, Users, Zap } from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Brain,
  Dumbbell,
  Heart,
  Target,
  Sparkles,
  Users,
};

export const AttributeBarList: React.FC = () => {
  const { attributes } = useGame();

  return (
    <div className="space-y-3.5">
      {ATTRIBUTE_LIST.map((attr) => {
        const attrKey = `${attr.type.toLowerCase()}_xp` as keyof typeof attributes;
        const currentXP = (attributes[attrKey] as number) || 0;
        const level = calculateAttributeLevel(currentXP);
        const mastery = getAttributeMasteryTitle(level);

        // Progress to next attribute level (each level = 150 XP)
        const xpInCurrentLevel = currentXP % 150;
        const percent = Math.min(100, Math.floor((xpInCurrentLevel / 150) * 100));

        const IconComponent = ICON_MAP[attr.icon] || Zap;

        return (
          <div
            key={attr.type}
            className="p-3 rounded-xl bg-slate-900/60 border border-white/5 hover:border-white/15 transition-all group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center space-x-2.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center border"
                  style={{
                    backgroundColor: attr.accentBg,
                    borderColor: `${attr.color}50`,
                    color: attr.color,
                  }}
                >
                  <IconComponent className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-white tracking-wide">{attr.name}</span>
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                      style={{
                        backgroundColor: `${attr.color}20`,
                        color: attr.color,
                      }}
                    >
                      LVL {level}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">
                    {mastery} Tier • {currentXP} total XP
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-slate-300">{xpInCurrentLevel}/150 XP</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${percent}%`,
                  backgroundColor: attr.color,
                  boxShadow: `0 0 8px ${attr.color}80`,
                }}
              />
            </div>

            {/* Buff tooltip on hover */}
            <div className="text-[11px] text-slate-400 mt-2 flex items-center justify-between pt-1.5 border-t border-white/5">
              <span>{attr.buffBenefit}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
