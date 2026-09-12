'use client';

// ==============================================================================
// ASCEND - LOGIN AUTHENTICATION
// Minimalist Editorial Theme
// ==============================================================================

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { useGame } from '@/lib/context/game-context';
import { ArrowRight, Lock, Mail, Play } from 'lucide-react';

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
      <div className="p-8 bg-white border-4 border-[#141110] shadow-[8px_8px_0_0_#141110] text-center relative">
        {/* Top Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/">
            <div className="font-display font-black text-4xl tracking-widest text-[#141110]">ASCEND</div>
          </Link>
        </div>

        <h1 className="font-display text-3xl font-black text-[#141110] uppercase tracking-widest">Access Protocol</h1>
        <p className="text-sm font-sans font-medium text-[#6B6560] mt-2">Authenticate to synchronize your Life RPG character</p>

        {errorMsg && (
          <div className="mt-6 p-4 border-2 border-[#141110] bg-[#F5F3EE] text-[#C9A227] text-xs font-bold uppercase tracking-wider text-left shadow-[4px_4px_0_0_rgba(20,18,16,0.1)]">
            Error: {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6 mt-8 text-left">
          <div>
            <label className="block text-[11px] font-sans font-bold text-[#6B6560] uppercase tracking-wider mb-2">
              Neural Email
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-[#141110] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seeker@ascend.rpg"
                className="w-full pl-12 pr-4 py-3 bg-white border-2 border-[#141110] text-[#141110] font-sans font-medium text-sm placeholder-[#6B6560] focus:outline-none focus:shadow-[4px_4px_0_0_#E8552A] shadow-[4px_4px_0_0_rgba(20,18,16,0.1)] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-sans font-bold text-[#6B6560] uppercase tracking-wider mb-2">
              Secret Passkey
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-[#141110] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••••••"
                className="w-full pl-12 pr-4 py-3 bg-white border-2 border-[#141110] text-[#141110] font-sans font-medium text-sm placeholder-[#6B6560] focus:outline-none focus:shadow-[4px_4px_0_0_#E8552A] shadow-[4px_4px_0_0_rgba(20,18,16,0.1)] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-[#E8552A] border-2 border-[#141110] text-white font-display font-black text-sm uppercase tracking-widest shadow-[4px_4px_0_0_#141110] hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#141110] transition-all flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{isLoading ? 'Verifying...' : 'Sign In to Matrix'}</span>
            <ArrowRight className="w-5 h-5 stroke-[3]" />
          </button>
        </form>

        {/* Instant Demo Access Button */}
        <div className="mt-6 pt-6 border-t-2 border-[#141110]/10">
          <button
            onClick={handleDemoAccess}
            type="button"
            className="w-full py-3 bg-white border-2 border-[#141110] text-[#141110] font-display font-bold text-xs uppercase tracking-widest shadow-[4px_4px_0_0_#141110] hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#141110] transition-all flex items-center justify-center space-x-2"
          >
            <Play className="w-4 h-4 text-[#E8552A]" />
            <span>Launch Instant Demo Guest Mode</span>
          </button>
        </div>

        <div className="mt-8 text-xs font-sans font-bold text-[#6B6560] uppercase tracking-wider">
          Need an account?{' '}
          <Link href="/auth/signup" className="text-[#E8552A] hover:underline">
            Initialize New Hero
          </Link>
        </div>
      </div>
    </div>
  );
}
