'use client';

// ==============================================================================
// ASCEND - 30-DAY PRODUCTIVITY & STREAK HEATMAP GRID
// Minimalist Editorial Theme
// ==============================================================================

import React from 'react';
import { useGame } from '@/lib/context/game-context';
import { getFormattedDateString } from '@/lib/progression/streaks';

export const HeatmapGrid: React.FC = () => {
  const { quests, streak } = useGame();

  // Generate the last 28 days
  const days: { dateStr: string; label: string; count: number; isToday: boolean }[] = [];
  const now = new Date();

  for (let i = 27; i >= 0; i--) {
    const d = new Date(now);
    d.setUTCDate(d.getUTCDate() - i);
    const dateStr = getFormattedDateString(d);

    const isToday = i === 0;

    // Estimate completed quests for that day (or random realistic density for older demo days if today has completions)
    let count = 0;
    if (isToday) {
      count = quests.filter((q) => q.status === 'Completed').length;
    } else if (i < streak.current_streak) {
      count = ((i * 3 + 1) % 4) + 1; // Simulated streak days for historical grid
    }

    days.push({
      dateStr,
      label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      count,
      isToday,
    });
  }

  const getCellColor = (count: number) => {
    if (count === 0) return 'bg-[#E5E5E5]';
    if (count === 1) return 'bg-[#FDE68A] text-[#B45309]';
    if (count === 2) return 'bg-[#F59E0B] text-white';
    if (count === 3) return 'bg-[#D97706] text-white';
    return 'bg-[#92400E] text-white';
  };

  return (
    <div className="font-sans">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs text-[#57534E] uppercase tracking-wider font-bold">4-Week Grid</div>
        
        <div className="flex items-center space-x-1.5 text-[10px] text-[#A8A29E] font-bold uppercase tracking-widest">
          <span>Less</span>
          <div className="w-2.5 h-2.5 bg-[#E5E5E5]" />
          <div className="w-2.5 h-2.5 bg-[#FDE68A]" />
          <div className="w-2.5 h-2.5 bg-[#F59E0B]" />
          <div className="w-2.5 h-2.5 bg-[#D97706]" />
          <div className="w-2.5 h-2.5 bg-[#92400E]" />
          <span>More</span>
        </div>
      </div>

      {/* Grid of 28 days (4 weeks x 7 days) */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <div
            key={day.dateStr}
            className={`aspect-square p-1 flex flex-col justify-between transition-colors cursor-pointer ${getCellColor(
              day.count
            )}`}
            title={`${day.dateStr}: ${day.count} quests completed`}
          >
            <span className="text-[8px] font-bold opacity-70 uppercase tracking-tighter leading-none">{day.label.split(' ')[1]}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-[#57534E]">
        <span className="font-bold">
          Current Streak: <strong className="text-[#E85D25]">{streak.current_streak} Days</strong>
        </span>
        <span className="text-[#D97706] italic">
          Freeze Relics: {streak.streak_freeze_count} Available
        </span>
      </div>
    </div>
  );
};
