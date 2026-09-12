'use client';

// ==============================================================================
// ASCEND - INVENTORY & WARDROBE
// ==============================================================================

import React, { useState } from 'react';
import Link from 'next/link';
import { useGame } from '@/lib/context/game-context';
import {
  Package,
  Sparkles,
  ShoppingBag,
  Check,
  Shield,
  Palette,
  Tag,
  Hexagon,
  ShieldAlert,
  FlaskConical,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function InventoryPage() {
  const { inventory, equipItem, profile, streak } = useGame();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Theme', 'Badge', 'Title', 'Frame', 'Consumable'];

  const filteredInventory = inventory.filter((inv) => {
    if (selectedCategory === 'All') return true;
    return inv.item?.category === selectedCategory;
  });

  return (
    <div className="space-y-6">
      {/* 1. TOP STATUS & WARDROBE SUMMARY */}
      <div className="cyber-panel p-6 rounded-3xl border-purple-500/30 bg-gradient-to-r from-purple-950/20 via-slate-900 to-slate-900">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0">
              <Package className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">Player Inventory & Wardrobe</h1>
              <p className="text-xs text-slate-300">
                Manage your acquired themes, cosmetic crests, titles, and consumable relics.
              </p>
            </div>
          </div>

          <Link
            href="/shop"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center space-x-1.5 shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Visit Guild Market</span>
          </Link>
        </div>

        {/* Current Active Cosmetics Pill Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-4 border-t border-white/10 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 flex items-center space-x-3">
            <Palette className="w-4 h-4 text-cyan-400" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Active Theme</div>
              <div className="font-bold text-white capitalize">{profile.theme}</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 flex items-center space-x-3">
            <Tag className="w-4 h-4 text-purple-400" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Display Title</div>
              <div className="font-bold text-white">{profile.title}</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 flex items-center space-x-3">
            <ShieldAlert className="w-4 h-4 text-orange-400" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Streak Freezes</div>
              <div className="font-bold text-orange-300">{streak.streak_freeze_count} / 3 Stored</div>
            </div>
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
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                : 'bg-slate-900/80 text-slate-400 hover:bg-white/5 border border-white/5'
            }`}
          >
            {cat}s
          </button>
        ))}
      </div>

      {/* 3. INVENTORY ITEMS GRID */}
      {filteredInventory.length === 0 ? (
        <div className="py-20 text-center rounded-3xl bg-slate-900/30 border border-dashed border-white/10">
          <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-300">Your Inventory is Empty</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Complete quests to earn gold, then acquire themes, crests, and titles from the Guild Market.
          </p>
          <Link
            href="/shop"
            className="mt-4 inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Open Guild Shop</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredInventory.map((inv) => {
            if (!inv.item) return null;
            const item = inv.item;
            const isEquipped = inv.is_equipped || (item.category === 'Theme' && profile.theme === item.effect_value);

            return (
              <div
                key={inv.id}
                className="cyber-panel p-5 rounded-2xl flex flex-col justify-between border-white/10 hover:border-purple-500/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Acquired {formatDate(inv.acquired_at)}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white">{item.name}</h4>
                  <p className="text-xs text-slate-400 mt-1">{item.description}</p>
                </div>

                <div className="pt-4 border-t border-white/5 mt-4">
                  {item.category !== 'Consumable' ? (
                    <button
                      onClick={() => equipItem(inv.id)}
                      className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all border ${
                        isEquipped
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                          : 'bg-slate-900 hover:bg-white/10 text-white border-white/10'
                      }`}
                    >
                      {isEquipped ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Equipped</span>
                        </>
                      ) : (
                        <span>Equip Item</span>
                      )}
                    </button>
                  ) : (
                    <div className="text-center text-xs font-bold text-cyan-400 bg-cyan-950/40 py-2 rounded-xl border border-cyan-500/30">
                      Active In Storage ({inv.quantity || 1}x)
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
