import React, { useState } from 'react';
import { Wallet, Shield, Check, Copy, ExternalLink, ArrowRight, CornerDownRight, Coins } from 'lucide-react';
import { CartItem } from '../types';

interface TONWalletConnectProps {
  cart: CartItem[];
  watchedAd: boolean;
  walletAddress: string | null;
  onConnectWallet: (address: string) => void;
  onDisconnect: () => void;
  onConfirmPayment: (finalPrice: number) => void;
  onCancel: () => void;
}

export default function TONWalletConnect({
  cart,
  watchedAd,
  walletAddress,
  onConnectWallet,
  onDisconnect,
  onConfirmPayment,
  onCancel,
}: TONWalletConnectProps) {
  const [connecting, setConnecting] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = watchedAd ? subtotal * 0.2 : 0;
  const finalPrice = Math.max(0.01, subtotal - discount);

  const walletProviders = [
    { id: 'tonkeeper', name: 'Tonkeeper', icon: '💎', desc: 'Dompet TON paling populer' },
    { id: 'telegram_wallet', name: 'Telegram Wallet', icon: '✈️', desc: 'Dompet resmi di dalam Telegram' },
    { id: 'mytonwallet', name: 'MyTonWallet', icon: '💼', desc: 'Fitur terlengkap untuk web' }
  ];

  const handleConnectProvider = (providerId: string) => {
    setConnecting(true);
    setSelectedWallet(providerId);
    setTimeout(() => {
      // Simulate random TON address
      const randomAddress = 'EQBs' + Math.random().toString(36).substring(2, 10).toUpperCase() + '...' + Math.random().toString(36).substring(2, 6).toUpperCase();
      onConnectWallet(randomAddress);
      setConnecting(false);
    }, 1500);
  };

  const handleCopyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6 pb-24 animate-fade-in" id="ton-wallet-section">
      {/* Step Header */}
      <div className="space-y-1 px-1">
        <h3 className="text-base font-bold text-white font-heading">
          Proses Pembayaran & Dompet TON
        </h3>
        <p className="text-xs text-gray-500">
          Selesaikan pembayaran Anda menggunakan mata uang kripto TON Coin secara aman.
        </p>
      </div>

      {/* Pricing / Bill details */}
      <div className="p-5 rounded-2xl bg-brand-card border border-white/5 space-y-4 shadow-xl" id="checkout-pricing-summary">
        <h4 className="text-xs font-bold text-white tracking-wider uppercase font-heading">
          Detail Tagihan Checkout
        </h4>
        
        <div className="space-y-3.5 text-xs text-gray-400">
          <div className="flex justify-between items-center">
            <span>Daftar Pakan:</span>
            <div className="text-right text-white">
              {cart.map((item) => (
                <div key={item.product.id} className="text-[11px] font-mono">
                  {item.product.name} ({item.quantity}x)
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between border-t border-white/5 pt-3">
            <span>Subtotal Pakan:</span>
            <span className="font-mono text-white">{subtotal.toFixed(3)} TON</span>
          </div>

          {watchedAd && (
            <div className="flex justify-between text-emerald-400 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/10">
              <span className="flex items-center">
                <span className="mr-1">🏷️</span> Reward AdsGram SDK (20% OFF):
              </span>
              <span className="font-mono font-bold">- {discount.toFixed(3)} TON</span>
            </div>
          )}

          <div className="pt-3 border-t border-white/5 flex justify-between items-center font-bold text-sm text-white" id="checkout-grand-total">
            <span>Total yang Harus dibayar:</span>
            <div className="text-right">
              <span className="text-xl font-heading text-brand-neon font-black font-mono">
                💎 {finalPrice.toFixed(3)} TON
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* WALLET CONNECTION CONTROLS */}
      {!walletAddress ? (
        <div className="p-5 rounded-2xl bg-brand-card border border-white/5 text-center space-y-5 shadow-2xl" id="connect-wallet-prompt">
          <div className="w-14 h-14 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-neon flex items-center justify-center mx-auto animate-pulse">
            <Wallet className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white">Hubungkan TON Wallet Anda</h4>
            <p className="text-xs text-gray-500 px-4">
              Silakan hubungkan dompet Web3 TON Anda untuk menyeleasikan otorisasi smart contract dan pembayaran pakan.
            </p>
          </div>

          {connecting ? (
            <div className="py-8 flex flex-col items-center justify-center space-y-3" id="provider-connecting-spinner">
              <div className="w-8 h-8 border-3 border-brand-neon border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs text-gray-400">Menghubungkan ke {selectedWallet ? selectedWallet.toUpperCase() : 'Wallet'}...</p>
            </div>
          ) : (
            <div className="space-y-2 text-left" id="wallet-providers-list">
              {walletProviders.map((prov) => (
                <button
                  key={prov.id}
                  onClick={() => handleConnectProvider(prov.id)}
                  className="w-full p-3.5 rounded-xl bg-brand-card-light hover:bg-[#1E293B] hover:border-brand-neon flex items-center justify-between border border-white/5 transition-all text-left cursor-pointer group"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2.5xl bg-black/30 w-10 h-10 rounded-lg flex items-center justify-center">{prov.icon}</span>
                    <div>
                      <h5 className="text-xs font-bold text-white font-heading">{prov.name}</h5>
                      <p className="text-[10px] text-gray-500">{prov.desc}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-brand-neon transition-colors" />
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="p-5 rounded-2xl bg-brand-card border border-white/5 space-y-5 shadow-2xl" id="wallet-status-connected">
          {/* Linked wallet banner */}
          <div className="flex justify-between items-center bg-[#1E293B]/60 p-3 rounded-xl border border-white/5">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-white">Dompet Terhubung</span>
            </div>
            <button
              onClick={onDisconnect}
              className="text-[10px] text-rose-400 hover:underline font-semibold cursor-pointer"
            >
              Putuskan Sambungan
            </button>
          </div>

          <div className="space-y-3" id="connected-wallet-dashboard">
            <div className="flex justify-between items-center text-xs text-gray-400">
              <span>Alamat Dompet (TON):</span>
              <button
                onClick={handleCopyAddress}
                className="text-brand-neon flex items-center space-x-1 hover:underline text-[11px]"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Tersalin' : 'Salin'}</span>
              </button>
            </div>

            <div className="font-mono text-xs text-white bg-black/40 p-3 rounded-xl break-all">
              {walletAddress}
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Saldo Dompet Simulasi:</span>
              <span className="font-semibold text-white font-mono flex items-center">
                <Coins className="w-3.5 h-3.5 text-amber-400 mr-1" />
                5.420 TON
              </span>
            </div>
          </div>

          <div className="pt-2" id="wallet-pay-actions">
            <button
              onClick={() => onConfirmPayment(finalPrice)}
              className="w-full py-3.5 rounded-xl bg-brand-neon text-brand-bg font-extrabold font-heading text-sm tracking-wide flex items-center justify-center space-x-1.5 shadow-[0_4px_16px_rgba(0,213,255,0.3)] hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer"
              id="btn-execute-ton-payment"
            >
              <span>Bayar {finalPrice.toFixed(3)} TON</span>
              <ArrowRight className="w-4 h-4 font-bold" />
            </button>
          </div>
        </div>
      )}

      {/* Control back button */}
      <button
        onClick={onCancel}
        className="w-full py-2.5 text-center text-xs font-semibold text-gray-400 hover:text-white hover:underline cursor-pointer"
        id="btn-pay-cancel"
      >
        Kembali ke Keranjang
      </button>

      {/* Secure badges */}
      <div className="flex justify-center items-center space-x-4 text-[10px] text-gray-500" id="secured-payments-trust">
        <span className="flex items-center space-x-1">
          <Shield className="w-3.5 h-3.5 text-brand-neon" />
          <span>Non-Custodial</span>
        </span>
        <span className="text-gray-600">•</span>
        <span className="flex items-center space-x-1">
          <ExternalLink className="w-3.5 h-3.5 text-brand-neon" />
          <span>Verified Contract</span>
        </span>
      </div>
    </div>
  );
}
