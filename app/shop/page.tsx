'use client';

// ==============================================================================
// ASCEND - GUILD SHOP MARKETPLACE
// Distinct Merchant Bazaar with Featured Item Spotlight and Treasury HUD
// ==============================================================================

import React, { useState } from 'react';
import { useGame } from '@/lib/context/game-context';
import { ShopCard } from '@/components/shop/ShopCard';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import {
  ShoppingBag,
  Coins,
  Sparkles,
  ShieldAlert,
  Palette,
  Crown,
  Tag,
  Hexagon,
  Flame,
} from 'lucide-react';

export default function ShopPage() {
  const { shopItems, profile, purchaseItem, inventory } = useGame();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Theme', 'Badge', 'Title', 'Frame', 'Consumable'];

  const filteredItems = shopItems.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  // Highlighted Featured Item: Obsidian Void or Celestial Frame
  const featuredItem = shopItems.find((i) => i.rarity === 'Legendary' || i.rarity === 'Epic') || shopItems[0];
  const isFeaturedOwned = inventory.some((inv) => inv.item_id === featuredItem.id);

  return (
    <div className="space-y-6 pb-10">
      {/* 1. TOP TREASURY HUD */}
      <div className="cyber-panel p-6 rounded-2xl border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0D111A]">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-black text-white">
              GUILD MARKET & TREASURY
            </h1>
            <p className="text-xs text-slate-400">
              Exchange quest bounties for server-verified cosmetic themes, badges, titles, and relics.
            </p>
          </div>
        </div>

        <div className="px-4 py-2.5 rounded-xl bg-[#07090E] border border-amber-500/30 flex items-center space-x-3 shrink-0">
          <Coins className="w-5 h-5 text-amber-400" />
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">TREASURY BALANCE</div>
            <div className="font-display text-base font-black text-amber-300">
              <AnimatedCounter value={profile.gold} /> GOLD
            </div>
          </div>
        </div>
      </div>

      {/* 2. FEATURED ITEM HERO BANNER SPOTLIGHT */}
      {featuredItem && (
        <div className="cyber-panel p-6 rounded-2xl border-amber-500/30 bg-gradient-to-r from-[#140F06] via-[#0D111A] to-[#07090E] relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[10px] font-display font-black tracking-wider uppercase">
                <Crown className="w-3 h-3" />
                <span>GUILD MASTER SPOTLIGHT</span>
              </div>
              <h2 className="font-display text-xl font-black text-white">{featuredItem.name}</h2>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                {featuredItem.description}
              </p>
            </div>

            <div className="flex items-center space-x-4 shrink-0">
              <div className="text-right">
                <div className="text-[10px] font-mono text-slate-400">PRICE</div>
                <div className="font-display text-lg font-black text-amber-300 flex items-center gap-1">
                  <Coins className="w-4 h-4" />
                  <span>{featuredItem.price} G</span>
                </div>
              </div>

              {!isFeaturedOwned && (
                <button
                  onClick={() => purchaseItem(featuredItem.id)}
                  disabled={profile.gold < featuredItem.price}
                  className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-display text-xs font-black transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] cursor-pointer"
                >
                  Acquire Now
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. CATEGORY TABS */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 border ${
              selectedCategory === cat
                ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                : 'bg-[#0D111A] text-slate-400 hover:bg-white/5 border-white/5'
            }`}
          >
            {cat}s
          </button>
        ))}
      </div>

      {/* 4. ITEMS CATALOG GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <ShopCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
