'use client';

// ==============================================================================
// ASCEND - SIGNUP AUTHENTICATION
// ==============================================================================

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { useGame } from '@/lib/context/game-context';
import { Sparkles, ArrowRight, UserPlus, Mail, Lock, User } from 'lucide-react';
import { ARCHETYPE_LIST } from '@/lib/progression/archetypes';
import { Archetype } from '@/types/rpg';

export default function SignupPage() {
  const router = useRouter();
  const { loginAsDemoUser } = useGame();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [archetype, setArchetype] = useState<Archetype>('Cyber Mage');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !username || isLoading) return;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username,
              archetype,
            },
          },
        });

        if (error) {
          setErrorMsg(error.message);
          setIsLoading(false);
          return;
        }

        router.push('/dashboard');
      } else {
        loginAsDemoUser(archetype);
        router.push('/dashboard');
      }
    } catch (err: unknown) {
      setErrorMsg((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="cyber-panel p-8 rounded-3xl border-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.2)] text-center relative overflow-hidden">
        {/* Top Logo */}
        <div className="flex justify-center mb-6">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="ASCEND"
              width={180}
              height={46}
              className="h-9 w-auto object-contain drop-shadow-[0_0_16px_rgba(168,85,247,0.4)]"
              priority
            />
          </Link>
        </div>

        <h1 className="text-2xl font-black text-white">FORGE YOUR HERO</h1>
        <p className="text-xs text-slate-400 mt-1">Register new consciousness in the ASCEND Grid</p>

        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-semibold text-left">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4 mt-6 text-left">
          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
              Codename / Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="e.g. Kaelen Vance"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
              Neural Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="hero@ascend.rpg"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
              Secret Passkey
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
              Starting Archetype
            </label>
            <select
              value={archetype}
              onChange={(e) => setArchetype(e.target.value as Archetype)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-purple-500"
            >
              {ARCHETYPE_LIST.map((arch) => (
                <option key={arch.id} value={arch.id}>
                  {arch.name} ({arch.role})
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-xs shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all flex items-center justify-center space-x-2"
          >
            <span>{isLoading ? 'Creating Hero Record...' : 'Forge Account & Launch'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-xs text-slate-400">
          Already forged?{' '}
          <Link href="/auth/login" className="text-purple-400 font-bold hover:underline">
            Sign In to Existing Identity
          </Link>
        </div>
      </div>
    </div>
  );
}
