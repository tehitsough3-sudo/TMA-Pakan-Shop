import React from 'react';
import { ShoppingBag, Coins, Warehouse, Settings, LayoutGrid } from 'lucide-react';
import { AppTab } from '../types';

interface BottomNavProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  cartCount: number;
}

export default function BottomNav({ activeTab, onTabChange, cartCount }: BottomNavProps) {
  const tabs = [
    { id: 'catalog' as AppTab, label: 'Katalog', icon: LayoutGrid },
    { id: 'cart' as AppTab, label: 'Keranjang', icon: ShoppingBag, badge: cartCount },
    { id: 'wallet' as AppTab, label: 'TON', icon: Coins },
    { id: 'warehouse' as AppTab, label: 'Gudang', icon: Warehouse },
    { id: 'settings' as AppTab, label: 'Settings', icon: Settings }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0B1220]/95 backdrop-blur-md border-t border-white/5 py-2 px-3 flex justify-around items-center max-w-lg mx-auto rounded-t-3xl shadow-2xl" id="bottom-navigation-bar">
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="relative flex flex-col items-center justify-center flex-1 py-1 group focus:outline-none transition-all cursor-pointer"
            id={`nav-tab-${tab.id}`}
          >
            {/* Hover state spotlight */}
            <span className={`absolute top-0 w-8 h-1 rounded-full transition-all duration-300 ${
              isActive ? 'bg-brand-neon shadow-[0_0_10px_#00D5FF]' : 'bg-transparent group-hover:bg-white/10'
            }`}></span>

            <div className={`p-1.5 rounded-xl transition-all duration-300 ${
              isActive 
                ? 'text-brand-neon bg-brand-neon/10 scale-105' 
                : 'text-gray-400 group-hover:text-gray-200'
            }`}>
              <IconComponent className="w-5 h-5 transition-transform duration-300 group-active:scale-90" />
            </div>

            <span className={`text-[10px] font-medium tracking-tight mt-0.5 transition-colors duration-300 ${
              isActive ? 'text-brand-neon font-semibold' : 'text-gray-500 group-hover:text-gray-400'
            }`}>
              {tab.label}
            </span>

            {/* Notification Badge */}
            {tab.badge && tab.badge > 0 ? (
              <span className="absolute top-1 right-2 bg-rose-500 text-white font-mono text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-brand-bg transition-all duration-300 scale-100" id={`nav-badge-${tab.id}`}>
                {tab.badge}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
