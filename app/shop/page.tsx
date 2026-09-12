'use client';

// ==============================================================================
// ASCEND - GUILD SHOP MARKETPLACE
// Minimalist Editorial Theme
// ==============================================================================

import React, { useState } from 'react';
import { useGame } from '@/lib/context/game-context';
import { ShopCard } from '@/components/shop/ShopCard';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import {
  ShoppingBag,
  Coins,
  Crown,
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
    <div className="space-y-12 pb-12 pt-8">
      {/* 1. TOP TREASURY HUD */}
      <div className="p-8 bg-white border-4 border-[#141110] shadow-[8px_8px_0_0_#141110] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-6 text-center md:text-left">
          <div className="w-16 h-16 bg-[#C9A227] border-4 border-[#141110] flex items-center justify-center text-white shrink-0 shadow-[4px_4px_0_0_#141110]">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-black text-[#141110] uppercase tracking-widest">
              Guild Market
            </h1>
            <p className="text-sm font-sans font-medium text-[#6B6560] mt-2">
              Exchange quest bounties for server-verified cosmetic themes, badges, titles, and relics.
            </p>
          </div>
        </div>

        <div className="px-6 py-4 bg-[#F5F3EE] border-2 border-[#141110] flex items-center space-x-4 shrink-0 shadow-[4px_4px_0_0_#141110]">
          <Coins className="w-6 h-6 text-[#C9A227]" />
          <div>
            <div className="text-[10px] font-sans font-bold text-[#6B6560] uppercase tracking-widest">Treasury Balance</div>
            <div className="font-display text-xl font-black text-[#C9A227] uppercase tracking-widest mt-1">
              <AnimatedCounter value={profile.gold} /> G
            </div>
          </div>
        </div>
      </div>

      {/* 2. FEATURED ITEM HERO BANNER SPOTLIGHT */}
      {featuredItem && (
        <div className="p-8 bg-[#141110] border-4 border-[#141110] shadow-[8px_8px_0_0_#C9A227] relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-4 text-center md:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white border-2 border-white text-[#141110] text-[10px] font-sans font-bold tracking-widest uppercase">
                <Crown className="w-3 h-3 text-[#C9A227]" />
                <span>Guild Master Spotlight</span>
              </div>
              <h2 className="font-display text-3xl font-black text-white uppercase tracking-widest">{featuredItem.name}</h2>
              <p className="text-sm font-sans font-medium text-[#A8A29E] max-w-xl leading-relaxed">
                {featuredItem.description}
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end space-y-4 shrink-0">
              <div className="text-center md:text-right">
                <div className="text-[10px] font-sans font-bold text-[#A8A29E] uppercase tracking-widest">Price</div>
                <div className="font-display text-2xl font-black text-[#C9A227] flex items-center justify-center md:justify-end gap-1.5 mt-1">
                  <Coins className="w-5 h-5" />
                  <span>{featuredItem.price} G</span>
                </div>
              </div>

              {!isFeaturedOwned && (
                <button
                  onClick={() => purchaseItem(featuredItem.id)}
                  disabled={profile.gold < featuredItem.price}
                  className="px-6 py-3 bg-[#C9A227] text-white border-2 border-white font-sans text-sm font-bold uppercase tracking-widest transition-all hover:bg-[#B45309] disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0_0_white]"
                >
                  Acquire Now
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. CATEGORY TABS */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 hide-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-sans font-bold uppercase tracking-widest transition-all shrink-0 border-2 ${
              selectedCategory === cat
                ? 'bg-[#141110] text-white border-[#141110] shadow-[4px_4px_0_0_#C9A227]'
                : 'bg-white text-[#6B6560] hover:text-[#141110] border-[#141110]/20 hover:border-[#141110] shadow-[4px_4px_0_0_rgba(20,18,16,0.1)]'
            }`}
          >
            {cat}s
          </button>
        ))}
      </div>

      {/* 4. ITEMS CATALOG GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <ShopCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
