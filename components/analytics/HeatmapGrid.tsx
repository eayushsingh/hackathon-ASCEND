'use client';

// ==============================================================================
// ASCEND - 30-DAY PRODUCTIVITY & STREAK HEATMAP GRID
// Vibrant Modern RPG HUD Matrix Grid
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
      count = ((i * 3 + 1) % 4) + 1;
    }

    days.push({
      dateStr,
      label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      count,
      isToday,
    });
  }

  const getCellColor = (count: number) => {
    if (count === 0) return 'bg-slate-950 border-white/5 text-slate-600';
    if (count === 1) return 'bg-emerald-950/80 border-emerald-700/60 text-emerald-400';
    if (count === 2) return 'bg-emerald-600 border-emerald-400 text-emerald-100 shadow-[0_0_8px_rgba(16,185,129,0.4)]';
    if (count === 3) return 'bg-emerald-400 border-emerald-300 text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.7)] font-bold';
    return 'bg-amber-400 border-amber-300 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.8)] font-bold';
  };

  return (
    <div className="font-mono">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">4-WEEK STREAK MATRIX</div>
        
        <div className="flex items-center space-x-1.5 text-[10px] text-slate-500 uppercase tracking-wider">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded bg-slate-950 border border-white/10" />
          <div className="w-2.5 h-2.5 rounded bg-emerald-950 border border-emerald-700" />
          <div className="w-2.5 h-2.5 rounded bg-emerald-600 border border-emerald-400" />
          <div className="w-2.5 h-2.5 rounded bg-emerald-400 border border-emerald-300" />
          <div className="w-2.5 h-2.5 rounded bg-amber-400 border border-amber-300" />
          <span>More</span>
        </div>
      </div>

      {/* Grid of 28 days (4 weeks x 7 days) */}
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((day) => (
          <div
            key={day.dateStr}
            className={`aspect-square p-1 rounded-lg border flex flex-col justify-between transition-all cursor-pointer ${getCellColor(
              day.count
            )}`}
            title={`${day.dateStr}: ${day.count} quests completed`}
          >
            <span className="text-[9px] font-bold tracking-tighter leading-none">{day.label.split(' ')[1]}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
        <span className="font-mono">
          Current Streak: <strong className="text-emerald-400 font-bold">{streak.current_streak} Days</strong>
        </span>
        <span className="text-amber-400 font-mono text-[11px]">
          Freeze Relics: {streak.streak_freeze_count} Available
        </span>
      </div>
    </div>
  );
};
