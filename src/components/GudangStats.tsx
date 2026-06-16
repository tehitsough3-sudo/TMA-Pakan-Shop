import React from 'react';
import { Thermometer, Eye, Wind, Droplets, MapPin, Warehouse, Sun, ShieldAlert, Sparkles } from 'lucide-react';

export default function GudangStats() {
  return (
    <div className="space-y-6 pb-24" id="warehouse-stats-container">
      {/* Header Location */}
      <div className="flex items-center space-x-1.5 text-brand-neon hover:opacity-80 transition-opacity cursor-pointer text-sm font-medium px-1" id="location-picker">
        <MapPin className="w-4 h-4" />
        <span>Gudang Utama Jakarta, ID</span>
        <span className="text-[10px] text-gray-500 font-mono ml-1">{'>'}</span>
      </div>

      {/* Main Climate Card - EXACTLY matching home-screen.webp layout */}
      <div className="relative w-full rounded-3xl p-6 bg-gradient-to-b from-[#1C2C4E] to-[#121B2F] border border-white/5 shadow-2xl overflow-hidden" id="main-climate-screen">
        {/* Ambient absolute background shapes representing climate state */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -left-10 -bottom-10 w-28 h-28 bg-brand-neon/10 rounded-full blur-2xl"></div>

        <div className="relative z-10 flex flex-col items-center text-center py-4">
          {/* Sunny icon custom crafted to resemble the weather app home-screen.webp */}
          <div className="relative mb-3 flex items-center justify-center" id="sun-status-icon">
            <div className="absolute w-12 h-12 bg-amber-400/20 rounded-full blur-xl animate-ping"></div>
            <Sun className="w-16 h-16 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
          </div>

          {/* Large temperature metrics */}
          <div className="text-7xl font-light font-heading tracking-tight text-white select-none relative" id="temperature-display">
            24<span className="text-4xl absolute -top-1 font-normal text-brand-neon">°</span>
          </div>

          <div className="text-lg font-medium text-white/90 mt-1" id="climate-status">
            Optimal - Sejuk & Kering
          </div>
          
          <div className="text-xs text-gray-400 font-mono mt-1" id="temp-limits">
            H:28°C &nbsp; L:18°C
          </div>

          {/* Mini badge status */}
          <span className="mt-4 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase font-bold tracking-wider rounded-xl flex items-center space-x-1" id="status-tag-active">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
            <span>Sistem Otomatis Aktif</span>
          </span>
        </div>
      </div>

      {/* Hourly Warehouse Climatic Forecast section - EXACTLY matching layout */}
      <div className="space-y-3" id="hourly-forecast-module">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-sm font-semibold tracking-tight text-white font-heading">
            Suhu Gudang Berkala (Hari Ini)
          </h3>
          <span className="text-[10px] font-mono text-brand-neon bg-brand-neon/10 px-2 py-0.5 rounded-full">
            IoT Monitoring
          </span>
        </div>

        {/* Scrollable grid representing exact pill button selectors */}
        <div className="grid grid-cols-6 gap-2 overflow-x-auto pb-2" id="hourly-interval-pills">
          {[
            { time: 'Sekarang', temp: '24°', active: true, icon: Sun },
            { time: '09:00', temp: '25°', active: false, icon: Sun },
            { time: '12:00', temp: '27°', active: false, icon: Sun },
            { time: '15:00', temp: '26°', active: false, icon: Sun },
            { time: '18:00', temp: '23°', active: false, icon: Sun },
            { time: '21:00', temp: '21°', active: false, icon: Sun },
          ].map((item, idx) => {
            const TempIcon = item.icon;
            return (
              <div
                key={idx}
                className={`py-3.5 px-1 rounded-2xl flex flex-col items-center justify-between border transition-all duration-300 min-w-[54px] ${
                  item.active
                    ? 'bg-brand-neon text-brand-bg border-brand-neon shadow-[0_4px_16px_rgba(0,213,255,0.25)] font-semibold'
                    : 'bg-brand-card/70 text-gray-300 border-white/5 hover:bg-brand-card-light'
                }`}
              >
                <span className={`text-[10px] font-medium ${item.active ? 'text-brand-bg/90' : 'text-gray-400'}`}>
                  {item.time}
                </span>
                
                <TempIcon className={`w-4 h-4 my-2.5 ${item.active ? 'text-brand-bg' : 'text-amber-400'}`} />
                
                <span className="text-xs font-mono font-medium">
                  {item.temp}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weather Details (Bento Grid) - EXACTLY matching weathers elements */}
      <div className="space-y-3" id="warehouse-details-section">
        <h3 className="text-sm font-semibold tracking-tight text-white px-1 font-heading">
          Detail Lingkungan Penyimpanan
        </h3>

        <div className="grid grid-cols-2 gap-3" id="environmental-bento-grid">
          {/* Card 1: Sensasi Suhu (Feels Like) */}
          <div className="p-4 rounded-2xl bg-brand-card border border-white/5 space-y-2 relative group hover:border-white/10 transition-all">
            <div className="flex items-center text-gray-400 text-[10px] space-x-1">
              <Thermometer className="w-3.5 h-3.5 text-brand-neon" />
              <span className="uppercase tracking-wider font-semibold font-heading">Sensasi Suhu</span>
            </div>
            <div className="text-2xl font-semibold text-white font-mono">24°C</div>
            <p className="text-[10px] text-gray-500 leading-normal">
              Suhu yang dirasakan pakan, optimal untuk mencegah pertumbuhan jamur.
            </p>
          </div>

          {/* Card 2: Kelembaban (Humidity) */}
          <div className="p-4 rounded-2xl bg-brand-card border border-white/5 space-y-2 relative group hover:border-white/10 transition-all">
            <div className="flex items-center text-gray-400 text-[10px] space-x-1">
              <Droplets className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span className="uppercase tracking-wider font-semibold font-heading">Kelembaban</span>
            </div>
            <div className="text-2xl font-semibold text-white font-mono">45%</div>
            <p className="text-[10px] text-gray-500 leading-normal">
              Kelembapan ideal kering. Menjaga kerenyahan pelet pakan hewan.
            </p>
          </div>

          {/* Card 3: Sirkulasi Kipas (Wind) */}
          <div className="p-4 rounded-2xl bg-brand-card border border-white/5 space-y-2 relative group hover:border-white/10 transition-all">
            <div className="flex items-center text-gray-400 text-[10px] space-x-1">
              <Wind className="w-3.5 h-3.5 text-brand-purple" />
              <span className="uppercase tracking-wider font-semibold font-heading">Sirkulasi AC</span>
            </div>
            <div className="text-2xl font-semibold text-white font-mono">8 km/j</div>
            <p className="text-[10px] text-gray-500 leading-normal">
              Kondensator udara berfungsi normal mengalirkan udara segar.
            </p>
          </div>

          {/* Card 4: Kebersihan Ruang (Visibility / Quality) */}
          <div className="p-4 rounded-2xl bg-brand-card border border-white/5 space-y-2 relative group hover:border-white/10 transition-all">
            <div className="flex items-center text-gray-400 text-[10px] space-x-1">
              <Eye className="w-3.5 h-3.5 text-[#E2E8F0]" />
              <span className="uppercase tracking-wider font-semibold font-heading">Sterilitas</span>
            </div>
            <div className="text-2xl font-semibold text-white font-mono">98%</div>
            <p className="text-[10px] text-gray-500 leading-normal">
              Tingkat sterilitas ruangan tinggi terhadap kontaminasi serangga/hama.
            </p>
          </div>
        </div>
      </div>

      {/* Extra safety guard details */}
      <div className="p-4 rounded-2xl bg-brand-teal/5 bg-brand-card border border-white/5 flex items-start space-x-3" id="warehouse-safety-alert">
        <Sparkles className="w-5 h-5 text-brand-neon mt-0.5 flex-shrink-0 animate-pulse" />
        <div className="text-xs text-gray-300 leading-relaxed">
          <strong className="text-white font-heading font-semibold">Sertifikasi Higienis:</strong> Gudang pangan ini bersertifikasi ISO 22000 untuk penyimpanan pakan ternak dan hewan peliharaan secara higienis, menjamin nutrisi pakan selalu optimal hingga tiba di rumah Anda.
        </div>
      </div>
    </div>
  );
}
