import React, { useState } from 'react';
import { CheckCircle, XCircle, FileText, Bell, Send, ArrowRight, ShieldCheck, HelpCircle, CornerDownRight } from 'lucide-react';
import { CartItem } from '../types';

interface TransactionStatusProps {
  status: 'success' | 'error';
  errorMsg: string | null;
  cart: CartItem[];
  finalPrice: number;
  walletAddress: string | null;
  telegramUsername: string | null;
  onReset: () => void;
}

export default function TransactionStatus({
  status,
  errorMsg,
  cart,
  finalPrice,
  walletAddress,
  telegramUsername,
  onReset,
}: TransactionStatusProps) {
  const [copiedHash, setCopiedHash] = useState(false);
  const txHash = 'f3a8b23c990d7e6f1a4e2b0284c8a2bde6f0148ac212d2ea8ce9502abcf76402';

  const handleCopyHash = () => {
    navigator.clipboard.writeText(txHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="space-y-6 pb-24 px-1" id="transaction-status-view">
      {status === 'success' ? (
        <div className="space-y-6 animate-fade-in" id="tx-success-block">
          {/* Main big success check */}
          <div className="text-center space-y-4 py-6" id="tx-success-header">
            <div className="w-18 h-18 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-bounce">
              <CheckCircle className="w-12 h-12" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold font-heading text-white">
                Transaksi Berhasil!
              </h3>
              <p className="text-xs text-gray-400 px-6">
                Pembayaran pakan Anda telah disetujui oleh blockchain TON dan pesanan sedang diproses.
              </p>
            </div>
          </div>

          {/* Simulated Stock Updates and Telegram Notifications Panel */}
          <div className="p-4 rounded-2xl bg-brand-card border border-white/5 space-y-3" id="iot-updates-panel">
            <h4 className="text-xs font-bold text-white tracking-widest uppercase flex items-center space-x-1.5 font-heading">
              <Bell className="w-3.5 h-3.5 text-brand-neon" />
              <span>Sistem Pembaruan Stok & Notifikasi</span>
            </h4>

            <div className="space-y-2.5 text-xs text-gray-300 font-mono" id="iot-logs">
              {/* Log 1: Stock deduction */}
              <div className="flex items-start space-x-2">
                <span className="text-emerald-400">✓</span>
                <div className="space-y-0.5">
                  <p className="font-semibold text-white">Stok Gudang Berhasil Dikurangi</p>
                  {cart.map((item) => (
                    <p key={item.product.id} className="text-[10px] text-gray-500">
                      • {item.product.name} (Sisa stok: {item.product.stock - item.quantity} pcs)
                    </p>
                  ))}
                </div>
              </div>

              {/* Log 2: Telegram messenger dispatch */}
              <div className="flex items-start space-x-2 border-t border-white/5 pt-2.5">
                <Send className="w-3.5 h-3.5 text-brand-neon mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-semibold text-white">Notifikasi Dikirim ke Telegram @{telegramUsername || 'User'}</p>
                  <p className="text-[10px] text-gray-500 leading-normal">
                    Layanan bot telah mengirimkan rincian invoice pembelian serta pelacakan pengiriman ke chat ID Anda.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Receipt receipt invoice details */}
          <div className="p-4 rounded-2xl bg-[#141C2D] border border-white/5 space-y-3 font-mono text-[11px]" id="tx-receipt-details">
            <h4 className="text-xs font-bold font-sans text-white tracking-wider uppercase pb-1 border-b border-white/5">
              Tanda Terima Transaksi
            </h4>
            
            <div className="flex justify-between">
              <span className="text-gray-400">Status Pembayaran:</span>
              <span className="text-emerald-400 font-bold uppercase">PAID (SUCCESS)</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Pengirim (TON):</span>
              <span className="text-white truncate max-w-[140px]" title={walletAddress || ''}>
                {walletAddress}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Jumlah Bayar:</span>
              <span className="text-brand-neon font-bold">💎 {finalPrice.toFixed(3)} TON</span>
            </div>

            <div className="space-y-1 pt-2 border-t border-white/5">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">ID Transaksi (TxHash):</span>
                <button
                  onClick={handleCopyHash}
                  className="text-brand-neon text-[10px] hover:underline"
                >
                  {copiedHash ? 'Tersalin' : 'Copy'}
                </button>
              </div>
              <p className="text-[10px] text-gray-500 break-all select-all font-mono leading-relaxed bg-black/30 p-2 rounded-lg">
                {txHash}
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2" id="success-action-triggers">
            <button
              onClick={onReset}
              className="w-full py-3.5 rounded-xl bg-brand-neon hover:bg-brand-neon/90 text-brand-bg font-extrabold font-heading text-sm text-center shadow-lg transition-transform active:scale-95 cursor-pointer"
            >
              Kembali ke Katalog Pakan
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in" id="tx-failure-block">
          {/* Main failed error indicator card */}
          <div className="text-center space-y-4 py-8" id="tx-failed-header">
            <div className="w-18 h-18 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(244,63,94,0.3)] animate-pulse">
              <XCircle className="w-12 h-12" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold font-heading text-white">
                Transaksi Gagal
              </h3>
              <p className="text-xs text-gray-400 px-6 leading-relaxed">
                Pembayaran pakan dibatalkan atau terjadi kegagalan jaringan smart contract pada node TON.
              </p>
            </div>
          </div>

          {/* Detailed debug explanation box */}
          <div className="p-4 rounded-xl bg-brand-card border border-white/5 space-y-2" id="tx-debug-panel">
            <span className="text-[9px] font-mono text-rose-400 font-bold tracking-widest uppercase block">
              Error Debug Log
            </span>
            <p className="text-xs text-gray-300 font-mono bg-black/40 p-3 rounded-lg leading-relaxed">
              {errorMsg || 'ERR_SIGNATURE_REJECTED: Pengguna membatalkan tanda tangan transaksi di dompet Tonkeeper.'}
            </p>
            
            <div className="flex items-center space-x-1.5 text-[10px] text-gray-500 mt-2">
              <HelpCircle className="w-3.5 h-3.5 text-brand-neon" />
              <span>Saran: Pastikan saldo TON Anda mencukupi dan koneksi stabil.</span>
            </div>
          </div>

          <div className="flex flex-col space-y-2 pt-2" id="failure-action-triggers">
            <button
              onClick={onReset}
              className="w-full py-3.5 rounded-xl bg-brand-neon hover:bg-brand-neon/90 text-brand-bg font-extrabold font-heading text-xs tracking-wider uppercase text-center shadow-lg cursor-pointer"
            >
              Coba Lagi / Kembali ke Katalog
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
