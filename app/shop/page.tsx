'use client';

// ==============================================================================
// ASCEND - GUILD SHOP MARKETPLACE
// ==============================================================================

import React, { useState } from 'react';
import { useGame } from '@/lib/context/game-context';
import { ShopCard } from '@/components/shop/ShopCard';
import { ItemCategory } from '@/types/rpg';
import {
  ShoppingBag,
  Coins,
  Sparkles,
  ShieldCheck,
  Palette,
  Tag,
  Hexagon,
  FlaskConical,
} from 'lucide-react';
import { formatNumber } from '@/lib/utils';

export default function ShopPage() {
  const { shopItems, profile } = useGame();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Theme', 'Badge', 'Title', 'Frame', 'Consumable'];

  const filteredItems = shopItems.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="space-y-6">
      {/* 1. TOP TREASURY HUD */}
      <div className="cyber-panel p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 border-amber-500/30 bg-gradient-to-r from-amber-950/20 via-slate-900 to-slate-900 shadow-[0_0_30px_rgba(245,158,11,0.15)]">
        <div className="flex items-center space-x-3.5 text-center sm:text-left">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Guild Market & Treasury</h1>
            <p className="text-xs text-slate-300">
              Exchange your quest bounties for exclusive cyber themes, badges, titles, and relics.
            </p>
          </div>
        </div>

        <div className="px-5 py-3 rounded-2xl bg-slate-900/90 border border-amber-500/40 flex items-center space-x-3 shrink-0">
          <Coins className="w-6 h-6 text-amber-400" />
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">Available Gold</div>
            <div className="text-xl font-black text-amber-300">{formatNumber(profile.gold)} Gold</div>
          </div>
        </div>
      </div>

      {/* 2. CATEGORY TABS */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedCategory === cat
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                : 'bg-slate-900/80 text-slate-400 hover:bg-white/5 border border-white/5'
            }`}
          >
            {cat}s
          </button>
        ))}
      </div>

      {/* 3. ITEMS CATALOG GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <ShopCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
