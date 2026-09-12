'use client';

// ==============================================================================
// ASCEND - ATTRIBUTE PROGRESSION BARS & MASTERY BREAKDOWN
// Vibrant Modern RPG HUD Attribute Bar List
// ==============================================================================

import React from 'react';
import { useGame } from '@/lib/context/game-context';
import { ATTRIBUTE_LIST, calculateAttributeLevel, getAttributeMasteryTitle } from '@/lib/progression/attributes';

export const AttributeBarList: React.FC = () => {
  const { attributes } = useGame();

  return (
    <div className="space-y-3.5 font-mono text-sm">
      {ATTRIBUTE_LIST.map((attr) => {
        const attrKey = `${attr.type.toLowerCase()}_xp` as keyof typeof attributes;
        const currentXP = (attributes[attrKey] as number) || 0;
        const level = calculateAttributeLevel(currentXP);
        const mastery = getAttributeMasteryTitle(level);

        // Progress to next attribute level (each level = 150 XP)
        const xpInCurrentLevel = currentXP % 150;
        const percent = Math.min(100, Math.floor((xpInCurrentLevel / 150) * 100));

        return (
          <div key={attr.type} className="group p-2.5 rounded-xl bg-slate-950/60 border border-white/5 hover:border-white/20 transition-all">
            <div className="flex justify-between items-end mb-1.5">
              <div>
                <span className="font-bold uppercase mr-2" style={{ color: attr.color }}>{attr.name}</span>
                <span className="text-slate-400 text-xs font-mono">LVL {level} — {mastery}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-200 text-xs font-mono font-bold">{xpInCurrentLevel}/150 XP</span>
              </div>
            </div>

            {/* Glowing Neon Progress Bar */}
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-white/10">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${percent}%`,
                  backgroundColor: attr.color,
                  boxShadow: `0 0 12px ${attr.color}`,
                }}
              />
            </div>
            
            <div className="text-[10px] text-slate-400 italic mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
              {attr.buffBenefit}
            </div>
          </div>
        );
      })}
    </div>
  );
};
