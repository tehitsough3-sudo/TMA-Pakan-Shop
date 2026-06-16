import React, { useState } from 'react';
import { ShieldCheck, MessageCircle, ArrowRight, UserCheck } from 'lucide-react';
import { TelegramUserData } from '../types';

interface TelegramAuthProps {
  onLoginSuccess: (user: TelegramUserData) => void;
}

export default function TelegramAuth({ onLoginSuccess }: TelegramAuthProps) {
  const [usernameInput, setUsernameInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMockLogin = (preset: 'user1' | 'user2' | 'custom') => {
    setLoading(true);
    setTimeout(() => {
      let userData: TelegramUserData;
      if (preset === 'user1') {
        userData = {
          id: 74839201,
          first_name: 'Budi',
          last_name: 'Santoso',
          username: 'budisentoso_id',
          photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        };
      } else if (preset === 'user2') {
        userData = {
          id: 93847291,
          first_name: 'Siti',
          last_name: 'Rahma',
          username: 'sitirahma_99',
          photo_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        };
      } else {
        const cleanUsername = usernameInput.trim() || 'pakan_lover';
        userData = {
          id: Math.floor(10000000 + Math.random() * 90000000),
          first_name: cleanUsername.split('_')[0] || 'User',
          username: cleanUsername,
        };
      }
      onLoginSuccess(userData);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center" id="tg-auth-container">
      {/* Banner Card */}
      <div className="w-full max-w-sm p-6 rounded-3xl bg-brand-card border border-white/5 shadow-2xl relative overflow-hidden" id="tg-auth-card">
        {/* Glow effect */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-neon/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-purple/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Telegram-style Circular Icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-accent to-brand-neon flex items-center justify-center shadow-lg mb-4" id="tg-logo-container">
            <MessageCircle className="w-9 h-9 text-white animate-pulse" />
          </div>

          <h2 className="text-2xl font-bold font-heading tracking-tight text-white mb-2" id="tg-auth-title">
            Telegram Mini App
          </h2>
          <p className="text-sm text-gray-400 mb-6 px-2" id="tg-auth-desc">
            Instalasi pakan hewan langsung dari akun Telegram Anda. Layanan aman di bawah otentikasi TON web3.
          </p>

          {/* Preset Logs to speed up UX testing */}
          <div className="w-full space-y-3 mb-6" id="tg-preset-login-options">
            <p className="text-xs font-mono text-gray-500 tracking-wider uppercase mb-1">Pilih Akun Demo Cepat</p>
            
            <button
              onClick={() => handleMockLogin('user1')}
              disabled={loading}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-brand-card-light hover:bg-brand-neon/10 border border-white/5 hover:border-brand-neon/20 transition-all text-left group"
              id="tg-preset-1"
            >
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=60&q=80"
                  alt="avatar"
                  className="w-8 h-8 rounded-full border border-brand-neon/30 object-cover"
                />
                <div>
                  <div className="text-xs font-semibold text-white">Budi Santoso</div>
                  <div className="text-[10px] text-gray-400">@budisentoso_id</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-brand-neon transition-colors" />
            </button>

            <button
              onClick={() => handleMockLogin('user2')}
              disabled={loading}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-brand-card-light hover:bg-brand-neon/10 border border-white/5 hover:border-brand-neon/20 transition-all text-left group"
              id="tg-preset-2"
            >
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=60&q=80"
                  alt="avatar"
                  className="w-8 h-8 rounded-full border border-brand-neon/30 object-cover"
                />
                <div>
                  <div className="text-xs font-semibold text-white">Siti Rahma</div>
                  <div className="text-[10px] text-gray-400">@sitirahma_99</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-brand-neon transition-colors" />
            </button>
          </div>

          <div className="relative w-full mb-4 flex items-center" id="tg-auth-divider">
            <div className="flex-grow border-t border-white/5"></div>
            <span className="flex-shrink mx-3 text-[10px] font-mono text-gray-500 uppercase tracking-wider">Atau masuk manual</span>
            <div className="flex-grow border-t border-white/5"></div>
          </div>

          {/* Manual input */}
          <div className="w-full space-y-3" id="tg-auth-form">
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400 font-mono text-xs">@</span>
              <input
                type="text"
                placeholder="username_anda"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                disabled={loading}
                className="w-full bg-brand-card-light border border-white/5 focus:border-brand-neon rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-gray-500 font-mono focus:outline-none transition-all"
                id="tg-username-input"
              />
            </div>

            <button
              onClick={() => handleMockLogin('custom')}
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-brand-neon text-brand-bg font-bold font-heading text-xs tracking-wide flex items-center justify-center space-x-2 shadow-lg transition-all active:scale-[0.98] cursor-pointer"
              id="tg-auth-submit"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-brand-bg border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <UserCheck className="w-4 h-4" />
                  <span>Autentikasi Telegram SDK</span>
                </>
              )}
            </button>
          </div>

          {/* Privacy badge */}
          <div className="mt-6 flex items-center space-x-1.5 text-[10px] text-gray-500" id="tg-auth-security-badge">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-neon" />
            <span>Mendukung Telegram WebApp SDK 7.0+</span>
          </div>

        </div>
      </div>
    </div>
  );
}
