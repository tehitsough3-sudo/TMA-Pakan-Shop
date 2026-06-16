import React, { useState } from 'react';
import { ShoppingBag, Coins, Warehouse, Settings, LayoutGrid, MessageSquareDot, HelpCircle, ShieldAlert, LogOut, Trash2, ArrowUpRight } from 'lucide-react';
import { Product, CartItem, AppTab, AppState, TelegramUserData } from './types';
import { INITIAL_PRODUCTS } from './data/products';
import TelegramAuth from './components/TelegramAuth';
import BottomNav from './components/BottomNav';
import ProductsCatalog from './components/ProductsCatalog';
import CartDrawer from './components/CartDrawer';
import GudangStats from './components/GudangStats';
import AdsGramModal from './components/AdsGramModal';
import TONWalletConnect from './components/TONWalletConnect';
import TransactionStatus from './components/TransactionStatus';

export default function App() {
  // Application State
  const [isTelegramLoggedIn, setIsTelegramLoggedIn] = useState<boolean>(false);
  const [telegramUser, setTelegramUser] = useState<TelegramUserData | null>(null);
  const [selectedTab, setSelectedTab] = useState<AppTab>('catalog');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [watchedAd, setWatchedAd] = useState<boolean>(false);
  const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<
    'catalog' | 'cart_checkout' | 'ads_prompt' | 'payment_process' | 'transaction_confirming' | 'success_page' | 'error_page'
  >('catalog');
  const [lastError, setLastError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  // States for confirmation modal simulation
  const [isConfirmingTx, setIsConfirmingTx] = useState(false);
  const [simulatedPrice, setSimulatedPrice] = useState<number>(0);

  // LOGOUT/RESET helpers
  const handleTelegramLogin = (user: TelegramUserData) => {
    setTelegramUser(user);
    setIsTelegramLoggedIn(true);
    setSelectedTab('catalog');
  };

  const handleLogout = () => {
    setIsTelegramLoggedIn(false);
    setTelegramUser(null);
    setCart([]);
    setWatchedAd(false);
    setTonWalletAddress(null);
    setCurrentStep('catalog');
    setSelectedTab('catalog');
  };

  // CART Action Handlers
  const handleAddToCart = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(product.stock, item.quantity + quantity) }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.product.id === productId) {
          const maxStock = item.product.stock;
          return { ...item, quantity: Math.min(maxStock, quantity) };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  // TAB Transition Handlers
  const handleTabChange = (tab: AppTab) => {
    setSelectedTab(tab);
    if (tab === 'catalog') {
      setCurrentStep('catalog');
    } else if (tab === 'cart') {
      setCurrentStep('cart_checkout');
    } else if (tab === 'wallet') {
      setCurrentStep('payment_process');
    }
  };

  // CHECKOUT FLOW STEPS
  const handleInitiateCheckout = () => {
    setCurrentStep('ads_prompt');
  };

  const handleAdCompleted = (success: boolean) => {
    setWatchedAd(true);
    setCurrentStep('payment_process');
  };

  const handleAdSkipped = () => {
    setWatchedAd(false);
    setCurrentStep('payment_process');
  };

  // WALLET PAYMENT EXECUTOR
  const handleConfirmPayment = (price: number) => {
    setSimulatedPrice(price);
    setCurrentStep('transaction_confirming');
  };

  // TRANSACTION FINAL RECONCILIATIONS
  const handleSimulateTxSuccess = () => {
    // Decrease real stocks for each checkout product
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        const cartItem = cart.find((item) => item.product.id === p.id);
        if (cartItem) {
          return { ...p, stock: Math.max(0, p.stock - cartItem.quantity) };
        }
        return p;
      })
    );
    
    setLastError(null);
    setCurrentStep('success_page');
  };

  const handleSimulateTxFailure = (errCode: string) => {
    setLastError(errCode);
    setCurrentStep('error_page');
  };

  const handleSuccessFinishedReset = () => {
    setCart([]);
    setWatchedAd(false);
    setCurrentStep('catalog');
    setSelectedTab('catalog');
  };

  const handleFailureRetryReset = () => {
    setCurrentStep('payment_process');
  };

  return (
    <div className="min-h-screen bg-brand-bg font-sans pb-28 text-[#F3F4F6] select-none" id="applet-viewport-root">
      
      {/* Device frame emulator to keep phone proportions inside the browser preview */}
      <div className="max-w-lg mx-auto bg-brand-bg md:border-x md:border-white/5 min-h-screen flex flex-col relative" id="mobile-frame-container">
        
        {/* Top Mini Information bar */}
        <header className="p-4 flex justify-between items-center bg-[#0B1220] border-b border-white/5 sticky top-0 z-30" id="header-bar">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-accent to-brand-neon flex items-center justify-center p-0.5 shadow-md">
              <span className="text-sm font-black text-white">F</span>
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-white font-heading leading-tight">FeedGram Shop</h1>
              <p className="text-[9px] text-brand-neon font-semibold uppercase tracking-widest">TON Applet Hub</p>
            </div>
          </div>

          {/* Telegram Login Pill */}
          {isTelegramLoggedIn && telegramUser ? (
            <div className="flex items-center space-x-2 bg-brand-card-light/40 border border-white/5 py-1 px-2.5 rounded-full" id="user-badge">
              <img
                src={telegramUser.photo_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=40&q=80'}
                alt="user avatar"
                className="w-5 h-5 rounded-full border border-brand-neon object-cover"
              />
              <span className="text-[10px] font-semibold text-white truncate max-w-[64px]" title={telegramUser.first_name}>
                {telegramUser.first_name}
              </span>
            </div>
          ) : (
            <span className="text-[9px] font-mono text-rose-400 bg-rose-500/10 border border-rose-500/10 px-2 py-0.5 rounded-full uppercase font-bold">
              Unauthenticated
            </span>
          )}
        </header>

        {/* MAIN BODY AND ROUTER CONTENT */}
        <main className="flex-grow p-4 md:p-5 overflow-y-auto" id="main-content-scrollarea">
          
          {/* Telegram Login Guard Flow */}
          {!isTelegramLoggedIn ? (
            <TelegramAuth onLoginSuccess={handleTelegramLogin} />
          ) : (
            <>
              {/* STAGE: SUCCESS RESULT */}
              {currentStep === 'success_page' && (
                <TransactionStatus
                  status="success"
                  errorMsg={null}
                  cart={cart}
                  finalPrice={simulatedPrice}
                  walletAddress={tonWalletAddress}
                  telegramUsername={telegramUser?.username || 'user_id'}
                  onReset={handleSuccessFinishedReset}
                />
              )}

              {/* STAGE: DEFEAT ERROR RESULT */}
              {currentStep === 'error_page' && (
                <TransactionStatus
                  status="error"
                  errorMsg={lastError}
                  cart={cart}
                  finalPrice={simulatedPrice}
                  walletAddress={tonWalletAddress}
                  telegramUsername={telegramUser?.username || 'user_id'}
                  onReset={handleFailureRetryReset}
                />
              )}

              {/* STAGE: POPUP ADSGRAM MODALS */}
              {currentStep === 'ads_prompt' && (
                <AdsGramModal
                  onAdCompleted={handleAdCompleted}
                  onAdSkipped={handleAdSkipped}
                />
              )}

              {/* STAGE: CONFIRMING TRANSACTION MODAL */}
              {currentStep === 'transaction_confirming' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" id="tx-confirmation-overlay">
                  <div className="w-full max-w-sm rounded-3xl bg-brand-card border border-white/5 p-6 shadow-2xl space-y-6 text-center animate-fade-in">
                    <div className="w-12 h-12 border-3 border-brand-neon border-t-transparent rounded-full animate-spin mx-auto"></div>
                    
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-white font-heading">
                        Menunggu Konfirmasi Transaksi
                      </h4>
                      <p className="text-xs text-gray-400 px-4 leading-normal">
                        Kirimkan persetujuan tanda tangan pesan transaksi smart contract dari aplikasi dompet TON Anda.
                      </p>
                    </div>

                    <div className="bg-[#0B1220] p-4 rounded-xl border border-white/5 space-y-2.5 text-xs text-left font-mono">
                      <div className="flex justify-between items-center text-gray-400 text-[10px]">
                        <span>Kontrak Pakan:</span>
                        <span className="text-brand-neon">FeedGram.ton</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-400 text-[10px]">
                        <span>Estimasi Gas:</span>
                        <span className="text-white">~0.015 TON</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white font-sans font-bold">Total Nilai:</span>
                        <span className="text-brand-neon font-bold text-sm">💎 {simulatedPrice.toFixed(3)} TON</span>
                      </div>
                    </div>

                    {/* Simulation Triggers representing the "Berhasil & Gagal" decision forks from the flow-chart */}
                    <div className="space-y-2 pt-2" id="tx-decision-simulator-fork">
                      <p className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wide">
                        Simulasi Respon Blockchain TON
                      </p>
                      
                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          onClick={handleSimulateTxSuccess}
                          className="py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-brand-bg font-extrabold text-[11px] uppercase tracking-wider transition-colors cursor-pointer shadow-md shadow-emerald-500/10"
                        >
                          Simulasi Berhasil
                        </button>
                        
                        <button
                          onClick={() => handleSimulateTxFailure('ERR_INSUFFICIENT_FUNDS: Saldo koin TON di dompet tidak mencukupi untuk gas fee.')}
                          className="py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-brand-bg font-extrabold text-[11px] uppercase tracking-wider transition-colors cursor-pointer shadow-md shadow-rose-500/10"
                        >
                          Simulasi Gagal
                        </button>
                      </div>

                      <button
                        onClick={() => setCurrentStep('payment_process')}
                        className="text-[10px] text-gray-500 hover:text-white pt-2 block mx-auto hover:underline"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* CORE RENDERING SHIELDS OF VARIOUS ACTIVE TAB VIEWS */}
              {currentStep !== 'success_page' && currentStep !== 'error_page' && (
                <>
                  {/* TAB: CATALOGS */}
                  {selectedTab === 'catalog' && (
                    <ProductsCatalog
                      products={products}
                      cart={cart}
                      onAddToCart={handleAddToCart}
                      onUpdateCartQuantity={handleUpdateCartQuantity}
                      onOpenCart={() => handleTabChange('cart')}
                    />
                  )}

                  {/* TAB: SHOPPING CART CHECKOUT VIEW */}
                  {selectedTab === 'cart' && currentStep === 'cart_checkout' && (
                    <CartItemComponentWrapper>
                      <CartDrawer
                        cart={cart}
                        onUpdateQuantity={handleUpdateCartQuantity}
                        onRemoveItem={handleRemoveItem}
                        onCheckout={handleInitiateCheckout}
                        onClose={() => handleTabChange('catalog')}
                      />
                    </CartItemComponentWrapper>
                  )}

                  {/* TAB: WALLET PAYMENT ENGINE VIEW */}
                  {selectedTab === 'wallet' && currentStep === 'payment_process' && (
                    <TONWalletConnect
                      cart={cart}
                      watchedAd={watchedAd}
                      walletAddress={tonWalletAddress}
                      onConnectWallet={(addr) => {
                        setTonWalletAddress(addr);
                      }}
                      onDisconnect={() => setTonWalletAddress(null)}
                      onConfirmPayment={handleConfirmPayment}
                      onCancel={() => handleTabChange('catalog')}
                    />
                  )}

                  {/* TAB: GUDANG IOT METRICS TAB (MATCHES home-screen.webp WEATHER APP) */}
                  {selectedTab === 'warehouse' && (
                    <GudangStats />
                  )}

                  {/* TAB: SETTINGS & DEVELOPER DEBUG CONFIGS */}
                  {selectedTab === 'settings' && (
                    <div className="space-y-6 pb-24 animate-fade-in" id="settings-tab-view">
                      <div className="space-y-1">
                        <h3 className="text-base font-bold text-white font-heading">
                          Pengaturan & Info Akun
                        </h3>
                        <p className="text-xs text-gray-500">
                          Konfigurasi parameter user, testbed, dan tautan platform.
                        </p>
                      </div>

                      {/* Profile details block */}
                      <div className="p-4 rounded-2xl bg-brand-card border border-white/5 space-y-4" id="settings-profile-card">
                        <div className="flex items-center space-x-3.5">
                          <img
                            src={telegramUser?.photo_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80'}
                            alt="avatar larger"
                            className="w-12 h-12 rounded-full border border-brand-neon object-cover"
                          />
                          <div>
                            <h4 className="text-sm font-bold text-white font-heading">
                              {telegramUser?.first_name} {telegramUser?.last_name || ''}
                            </h4>
                            <p className="text-xs text-gray-500 font-mono">@{telegramUser?.username || 'user'}</p>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-white/5 flex gap-4 text-center justify-around font-mono text-[10px] text-gray-400">
                          <div>
                            <span className="block text-[8px] uppercase tracking-wider text-gray-500 font-sans">Telegram ID</span>
                            <span className="font-semibold text-white">{telegramUser?.id || 'Generik'}</span>
                          </div>
                          <div className="border-r border-white/5 h-6"></div>
                          <div>
                            <span className="block text-[8px] uppercase tracking-wider text-gray-500 font-sans">Dompet TON</span>
                            <span className="font-semibold text-brand-neon truncate max-w-[80px] block">
                              {tonWalletAddress ? 'CONNECTED' : 'NOT CONNECTED'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Developer testbed helpers */}
                      <div className="p-4 rounded-2xl bg-brand-card border border-white/5 space-y-3.5" id="developer-toolbox">
                        <h4 className="text-xs font-bold text-white tracking-widest uppercase font-heading">
                          Simulator Sandbox Developer
                        </h4>
                        <p className="text-[10px] text-gray-400 leading-normal">
                          Gunakan tombol kontrol di bawah ini untuk mereset seluruh variabel simulasi guna menguji ulang alur pembelian pakan hewan dari awal.
                        </p>

                        <div className="grid grid-cols-2 gap-2" id="dev-buttons">
                          <button
                            onClick={() => {
                              setProducts(INITIAL_PRODUCTS);
                              setCart([]);
                              setWatchedAd(false);
                            }}
                            className="p-2.5 text-center text-[10px] font-bold uppercase rounded-xl bg-brand-card-light hover:bg-white/5 text-gray-300 border border-white/5 hover:border-white/10 cursor-pointer"
                          >
                            Reset Stok & Cart
                          </button>

                          <button
                            onClick={() => {
                              setTonWalletAddress(null);
                            }}
                            className="p-2.5 text-center text-[10px] font-bold uppercase rounded-xl bg-brand-card-light hover:bg-white/5 text-rose-400 border border-white/5 hover:border-white/10 cursor-pointer"
                          >
                            Reset Wallet TON
                          </button>
                        </div>
                      </div>

                      {/* Applet information details */}
                      <div className="p-4 rounded-2xl bg-brand-card border border-white/5 space-y-2.5" id="about-information">
                        <h4 className="text-xs font-bold text-white tracking-wide font-heading">
                          Tentang Mini App
                        </h4>
                        
                        <div className="text-[10px] text-gray-400 space-y-1 font-mono">
                          <div className="flex justify-between">
                            <span>Versi Applet:</span>
                            <span>v1.2.0-beta</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Sponsor Iklan:</span>
                            <span>AdsGram SDK V2</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Kontrak TON:</span>
                            <span>TON Connect 2.4</span>
                          </div>
                        </div>
                      </div>

                      {/* Logout Action */}
                      <button
                        onClick={handleLogout}
                        className="w-full py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500 border border-rose-500/20 text-rose-500 hover:text-white font-bold font-heading text-xs tracking-wider uppercase transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                        id="btn-settings-logout"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout dari Telegram SDK</span>
                      </button>

                    </div>
                  )}
                </>
              )}

              {/* STICKY BOTTOM TAB NAVIGATION */}
              <BottomNav
                activeTab={selectedTab}
                onTabChange={handleTabChange}
                cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
              />
            </>
          )}

        </main>
      </div>
    </div>
  );
}

// Simple wrapper container component strictly to constrain scroll states and visual paddings
function CartItemComponentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-fade-in" id="cart-item-wrapper">
      {children}
    </div>
  );
}
