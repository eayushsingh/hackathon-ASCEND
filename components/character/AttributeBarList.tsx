'use client';

// ==============================================================================
// ASCEND - ATTRIBUTE PROGRESSION BARS & MASTERY BREAKDOWN
// Minimalist Editorial Theme
// ==============================================================================

import React from 'react';
import { useGame } from '@/lib/context/game-context';
import { ATTRIBUTE_LIST, calculateAttributeLevel, getAttributeMasteryTitle } from '@/lib/progression/attributes';

export const AttributeBarList: React.FC = () => {
  const { attributes } = useGame();

  return (
    <div className="space-y-4 font-sans text-sm">
      {ATTRIBUTE_LIST.map((attr) => {
        const attrKey = `${attr.type.toLowerCase()}_xp` as keyof typeof attributes;
        const currentXP = (attributes[attrKey] as number) || 0;
        const level = calculateAttributeLevel(currentXP);
        const mastery = getAttributeMasteryTitle(level);

        // Progress to next attribute level (each level = 150 XP)
        const xpInCurrentLevel = currentXP % 150;
        const percent = Math.min(100, Math.floor((xpInCurrentLevel / 150) * 100));

        return (
          <div key={attr.type} className="group">
            <div className="flex justify-between items-end mb-1">
              <div>
                <span className="font-bold text-[#141110] uppercase mr-2" style={{ color: attr.color }}>{attr.name}</span>
                <span className="font-display tracking-widest text-[#6B6560] text-xs">LVL {level} — {mastery}</span>
              </div>
              <div className="text-right">
                <span className="font-display tracking-widest text-[#141110] text-xs">{xpInCurrentLevel}/150</span>
              </div>
            </div>

            {/* Flat Progress Bar */}
            <div className="w-full bg-[#E5E5E5] h-1.5 overflow-hidden">
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${percent}%`,
                  backgroundColor: attr.color,
                }}
              />
            </div>
            
            <div className="text-[10px] text-[#A8A29E] italic mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              {attr.buffBenefit}
            </div>
          </div>
        );
      })}
    </div>
  );
};
