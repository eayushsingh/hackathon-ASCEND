'use client';

// ==============================================================================
// ASCEND - LOGIN AUTHENTICATION
// ==============================================================================

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { useGame } from '@/lib/context/game-context';
import { Sparkles, ArrowRight, Lock, Mail, Play, Shield } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { loginAsDemoUser } = useGame();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || isLoading) return;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setErrorMsg(error.message);
          setIsLoading(false);
          return;
        }

        router.push('/dashboard');
      } else {
        // Fallback demo login
        loginAsDemoUser('Cyber Mage');
        router.push('/dashboard');
      }
    } catch (err: unknown) {
      setErrorMsg((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoAccess = () => {
    loginAsDemoUser('Cyber Mage');
    router.push('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="cyber-panel p-8 rounded-3xl border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.2)] text-center relative overflow-hidden">
        {/* Top Glow Icon */}
        <div className="mx-auto w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-4 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
          <Lock className="w-7 h-7" />
        </div>

        <h1 className="text-2xl font-black text-white">ACCESS THE MATRIX</h1>
        <p className="text-xs text-slate-400 mt-1">Authenticate to synchronize your Life RPG character</p>

        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-semibold text-left">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 mt-6 text-left">
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
                placeholder="seeker@ascend.rpg"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center space-x-2"
          >
            <span>{isLoading ? 'Verifying Credentials...' : 'Sign In to Matrix'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Instant Demo Access Button */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <button
            onClick={handleDemoAccess}
            type="button"
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/10 hover:border-cyan-500/40 text-xs font-bold transition-all flex items-center justify-center space-x-2"
          >
            <Play className="w-4 h-4 text-cyan-400" />
            <span>Launch Instant Demo Guest Mode</span>
          </button>
        </div>

        <div className="mt-6 text-xs text-slate-400">
          Need an account?{' '}
          <Link href="/auth/signup" className="text-cyan-400 font-bold hover:underline">
            Initialize New Hero
          </Link>
        </div>
      </div>
    </div>
  );
}
