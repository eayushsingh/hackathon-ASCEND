'use client';

// ==============================================================================
// ASCEND - GUILD SHOP MARKETPLACE
// Vibrant Modern RPG HUD Marketplace
// ==============================================================================

import React, { useState } from 'react';
import { useGame } from '@/lib/context/game-context';
import { ShopCard } from '@/components/shop/ShopCard';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import {
  ShoppingBag,
  Coins,
  Crown,
  Sparkles,
} from 'lucide-react';

export default function ShopPage() {
  const { shopItems, profile, purchaseItem, inventory } = useGame();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Theme', 'Badge', 'Title', 'Frame', 'Consumable'];

  const filteredItems = shopItems.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  // Featured Item Spotlight
  const featuredItem = shopItems.find((i) => i.rarity === 'Legendary' || i.rarity === 'Epic') || shopItems[0];
  const isFeaturedOwned = inventory.some((inv) => inv.item_id === featuredItem.id);

  return (
    <div className="space-y-10 pb-16 pt-6">
      {/* 1. TOP TREASURY HUD */}
      <div className="rounded-3xl bg-[#0D111A]/90 border border-indigo-500/30 p-6 sm:p-8 shadow-[0_0_35px_rgba(99,102,241,0.15)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-5 text-center md:text-left">
          <div className="w-14 h-14 bg-amber-950/80 border border-amber-500/40 rounded-2xl flex items-center justify-center text-amber-400 shrink-0 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight font-sans">
              Guild Market
            </h1>
            <p className="text-xs sm:text-sm font-sans text-slate-400 mt-1 max-w-xl">
              Exchange quest bounties for server-verified cosmetic themes, badges, titles, and relics.
            </p>
          </div>
        </div>

        <div className="px-5 py-3 rounded-2xl bg-slate-950 border border-white/10 flex items-center space-x-4 shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
          <Coins className="w-6 h-6 text-amber-400" />
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">Treasury Balance</div>
            <div className="font-mono text-xl font-bold text-amber-400 mt-0.5">
              <AnimatedCounter value={profile.gold} /> G
            </div>
          </div>
        </div>
      </div>

      {/* 2. FEATURED ITEM HERO BANNER */}
      {featuredItem && (
        <div className="rounded-3xl bg-[#0D111A] border border-amber-500/40 p-6 sm:p-8 shadow-[0_0_40px_rgba(245,158,11,0.15)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-indigo-500/10 pointer-events-none" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 text-center md:text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-amber-950/80 border border-amber-500/40 rounded-full text-amber-400 font-mono text-xs font-bold uppercase">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>Guild Master Spotlight</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase font-sans">{featuredItem.name}</h2>
              <p className="text-xs sm:text-sm font-sans text-slate-300 max-w-xl leading-relaxed">
                {featuredItem.description}
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end space-y-3 shrink-0">
              <div className="text-center md:text-right">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Price</div>
                <div className="font-mono text-2xl font-bold text-amber-400 flex items-center justify-center md:justify-end gap-1.5 mt-0.5">
                  <Coins className="w-5 h-5 text-amber-400" />
                  <span>{featuredItem.price} G</span>
                </div>
              </div>

              {!isFeaturedOwned && (
                <button
                  onClick={() => purchaseItem(featuredItem.id)}
                  disabled={profile.gold < featuredItem.price}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Acquire Now
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. CATEGORY TABS */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-white/10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all border cursor-pointer ${
              selectedCategory === cat
                ? 'bg-indigo-500 text-white border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                : 'bg-slate-900/80 text-slate-400 border-white/5 hover:border-white/15'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 4. SHOP GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <ShopCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
