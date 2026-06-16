import React, { useState, useEffect } from 'react';
import { Play, Volume2, VolumeX, AlertTriangle, CheckCircle, Smartphone, Watch, ShieldAlert } from 'lucide-react';

interface AdsGramModalProps {
  onAdCompleted: (success: boolean) => void;
  onAdSkipped: () => void;
}

export default function AdsGramModal({ onAdCompleted, onAdSkipped }: AdsGramModalProps) {
  const [adStep, setAdStep] = useState<'prompt' | 'watching' | 'completed'>('prompt');
  const [seconds, setSeconds] = useState(6);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (adStep === 'watching') {
      timer = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setAdStep('completed');
            return 0;
          }
          const nextSec = prev - 1;
          setProgress(((6 - nextSec) / 6) * 100);
          return nextSec;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [adStep]);

  const handleStartWatching = () => {
    setAdStep('watching');
    setSeconds(6);
    setProgress(0);
  };

  const handleClaimReward = () => {
    onAdCompleted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md" id="adsgram-modal-backdrop">
      <div className="w-full max-w-sm rounded-3xl bg-brand-card border border-white/5 p-6 shadow-2xl relative overflow-hidden" id="adsgram-modal-box">
        {/* Glow decorative effects */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-brand-neon/10 rounded-full blur-2xl"></div>

        {adStep === 'prompt' && (
          <div className="text-center space-y-6 py-4 animate-fade-in" id="ad-prompt-step">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto text-3xl animate-bounce">
              📺
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold font-heading text-white">
                Mau Diskon Ekstra 20%?
              </h3>
              <p className="text-xs text-gray-400 px-4 leading-relaxed">
                Tonton video sponsor berdurasi <strong className="text-amber-400">6 detik</strong> dari AdsGram SDK untuk mengklaim diskon reward 20% langsung pada tagihan pakan Anda.
              </p>
            </div>

            {/* Info statistics */}
            <div className="bg-brand-card-light/50 border border-white/5 rounded-xl p-3 flex justify-around text-xs font-mono">
              <div className="text-center">
                <span className="text-gray-400 text-[10px] block font-sans">Sponsor</span>
                <span className="text-brand-neon font-bold">AdsGram SDK</span>
              </div>
              <div className="border-r border-white/5 my-1"></div>
              <div className="text-center">
                <span className="text-gray-400 text-[10px] block font-sans">Reward</span>
                <span className="text-emerald-400 font-bold">Diskon 20%</span>
              </div>
            </div>

            <div className="flex flex-col space-y-2 pt-2">
              <button
                onClick={handleStartWatching}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold font-heading text-xs tracking-wide flex items-center justify-center space-x-2 shadow-lg hover:brightness-110 active:scale-[0.98] cursor-pointer"
                id="btn-ad-yes"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Ya, Tonton Video (6dtk)</span>
              </button>
              
              <button
                onClick={onAdSkipped}
                className="w-full py-2.5 rounded-xl bg-brand-card-light hover:bg-[#1E293B] hover:text-white border border-white/5 text-gray-400 text-xs font-semibold tracking-wide transition-all cursor-pointer"
                id="btn-ad-no"
              >
                Tidak, Bayar Harga Normal
              </button>
            </div>
          </div>
        )}

        {adStep === 'watching' && (
          <div className="space-y-4 animate-fade-in" id="ad-watching-step">
            {/* Header tracking */}
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400 font-medium font-mono flex items-center space-x-1.5Packed">
                <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping"></span>
                <span>AdsGram Reward Video</span>
              </span>
              <span className="text-amber-400 font-mono font-bold bg-amber-500/10 px-2 py-0.5 rounded-full flex items-center space-x-1">
                <Watch className="w-3.5 h-3.5" />
                <span>{seconds}s</span>
              </span>
            </div>

            {/* Simulated Video Frame Card */}
            <div className="relative aspect-video rounded-2xl bg-black border border-white/10 overflow-hidden flex flex-col justify-between p-3" id="simulated-video-player-frame">
              {/* Fake commercial background clip */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1E293B]/20 to-brand-accent/5 flex flex-col justify-center items-center text-center p-4">
                {/* Visual animated feed simulation inside video */}
                <div className="relative w-12 h-12 bg-amber-400/10 border border-amber-400/30 rounded-full flex items-center justify-center mb-1 animate-pulse">
                  🐶
                </div>
                <h5 className="text-xs font-bold text-white font-sans">"Happy Pets, Premium Treats"</h5>
                <p className="text-[9px] text-gray-500 mt-1">Dapatkan nutrisi seimbang untuk anjing penyayang keluarga.</p>
              </div>

              {/* Top controls */}
              <div className="relative z-10 flex justify-between items-center w-full">
                <span className="px-2 py-0.5 rounded bg-black/60 text-[8px] text-white font-mono tracking-widest uppercase">
                  AD SPONSOR
                </span>
                
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Bottom video stats */}
              <div className="relative z-10 space-y-1">
                {/* Custom simulated bar progress indicator */}
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-neon transition-all duration-1000 ease-linear"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center text-[8px] text-gray-400">
                  <span>play.adsgram.org</span>
                  <span>0:0{6 - seconds} / 0:06</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-gray-500/5 text-gray-400 text-[10px] leading-relaxed text-center" id="ad-warnings">
              Jangan menutup modal atau berpindah tab agar bonus diskon 20% dapat divalidasi oleh smart contract.
            </div>
          </div>
        )}

        {adStep === 'completed' && (
          <div className="text-center space-y-6 py-4 animate-fade-in" id="ad-completed-step">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.2)] animate-pulse">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold font-heading text-white">
                Reward Diklaim!
              </h3>
              <p className="text-xs text-gray-400 px-2 leading-relaxed">
                Terima kasih telah menonton! <strong className="text-emerald-400">Potongan harga 20%</strong> telah berhasil divalidasi oleh AdsGram SDK dan ditambahkan ke detail pembayaran Anda.
              </p>
            </div>

            {/* Validation Proof Receipt */}
            <div className="bg-brand-card-light/40 border border-emerald-500/15 rounded-xl p-3 text-left space-y-1 font-mono text-[9px] text-gray-400">
              <div className="flex justify-between">
                <span>ID Validasi:</span>
                <span className="text-white">AG-742918-TON</span>
              </div>
              <div className="flex justify-between">
                <span>Status Iklan:</span>
                <span className="text-emerald-400 font-semibold uppercase">COMPLETED (100%)</span>
              </div>
              <div className="flex justify-between">
                <span>Diskon TON:</span>
                <span className="text-white">20% OFF</span>
              </div>
            </div>

            <button
              onClick={handleClaimReward}
              className="w-full py-3 rounded-xl bg-brand-neon hover:bg-brand-neon/90 text-brand-bg font-bold font-heading text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer"
              id="btn-claim-discount"
            >
              Lanjutkan ke Pembayaran
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
