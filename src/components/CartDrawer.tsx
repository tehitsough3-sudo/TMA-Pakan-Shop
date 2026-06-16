import React from 'react';
import { ShoppingBag, Trash2, X, Plus, Minus, ArrowRight, ShieldCheck, Ticket } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  onClose: () => void;
}

export default function CartDrawer({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onClose,
}: CartDrawerProps) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="space-y-6 pb-24" id="cart-drawer-container">
      {/* Drawer Header */}
      <div className="flex justify-between items-center px-1" id="cart-drawer-header">
        <div className="flex items-center space-x-2">
          <ShoppingBag className="w-5 h-5 text-brand-neon" />
          <h3 className="text-base font-bold text-white font-heading">
            Keranjang Belanja
          </h3>
          <span className="bg-brand-neon/10 text-brand-neon text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
            {totalItems} Item
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg bg-brand-card-light hover:bg-[#1E293B] text-gray-400 hover:text-white transition-colors cursor-pointer"
          id="cart-drawer-close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {totalItems === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center space-y-4" id="empty-cart-state">
          <div className="w-16 h-16 rounded-full bg-brand-card flex items-center justify-center text-3xl opacity-60">
            🛒
          </div>
          <p className="text-sm font-semibold text-gray-300">Keranjang Anda Kosong</p>
          <p className="text-xs text-gray-500 max-w-[240px]">
            Silakan telusuri katalog pakan berkualitas kami dan tambahkan pakan favorit peliharaan Anda.
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-brand-neon text-brand-bg font-bold text-xs tracking-wide cursor-pointer"
          >
            Mulai Belanja
          </button>
        </div>
      ) : (
        <div className="space-y-6" id="active-cart-state">
          {/* Cart Item Cards list */}
          <div className="space-y-3" id="cart-items-list">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="p-3.5 rounded-2xl bg-brand-card border border-white/5 flex items-center justify-between"
                id={`cart-item-${item.product.id}`}
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0" id={`cart-item-details-${item.product.id}`}>
                  {/* Photo container */}
                  <div className="w-12 h-12 rounded-xl bg-brand-card-light flex items-center justify-center text-2xl flex-shrink-0">
                    {item.product.image}
                  </div>
                  
                  {/* Descriptive text */}
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-white truncate" title={item.product.name}>
                      {item.product.name}
                    </h4>
                    <p className="text-[10px] text-gray-500 font-mono mt-0.5">
                      {item.product.weight} • {item.product.price} TON
                    </p>
                  </div>
                </div>

                {/* Sub-purchase control modifiers */}
                <div className="flex items-center space-x-3 ml-3" id={`cart-item-controls-${item.product.id}`}>
                  <div className="flex items-center bg-brand-card-light rounded-lg p-0.5 border border-white/5">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                      className="w-6 h-6 rounded bg-brand-card text-gray-400 hover:text-white flex items-center justify-center text-xs transition-colors cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-white font-mono px-2.5">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => {
                        if (item.product.stock > item.quantity) {
                          onUpdateQuantity(item.product.id, item.quantity + 1);
                        }
                      }}
                      disabled={item.quantity >= item.product.stock}
                      className="w-6 h-6 rounded bg-brand-card text-gray-400 hover:text-white flex items-center justify-center text-xs transition-colors disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Payment details block */}
          <div className="p-4 rounded-2xl bg-brand-card border border-white/5 space-y-3" id="billing-summary-block">
            <h4 className="text-xs font-bold text-white tracking-wide uppercase font-heading">
              Ringkasan Pembayaran
            </h4>
            
            <div className="space-y-2 text-xs" id="billing-summary-charges">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal Pakan</span>
                <span className="font-mono font-medium text-white">{totalPrice.toFixed(3)} TON</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Pajak & Biaya Transaksi</span>
                <span className="font-mono text-emerald-400 font-semibold">FREE (TON Promo)</span>
              </div>
              
              <div className="border-t border-white/5 pt-3 flex justify-between items-center text-sm font-bold" id="grand-total-row">
                <span className="text-white">Total Estimasi</span>
                <span className="text-brand-neon font-mono text-base">💎 {totalPrice.toFixed(3)} TON</span>
              </div>
            </div>
          </div>

          {/* Tip notification coupon */}
          <div className="p-3 bg-brand-neon/5 border border-brand-neon/10 rounded-xl flex items-start space-x-2.5" id="discount-hint-box">
            <Ticket className="w-4 h-4 text-brand-neon mt-0.5 flex-shrink-0 animate-pulse" />
            <p className="text-[10px] text-gray-300 leading-normal">
              <strong className="text-brand-neon">Tips Hemat:</strong> Pada langkah berikutnya, Anda akan ditawari opsi menonton iklan sponsor berhadiah diskon langsung 20% melalui integrasi AdsGram SDK. Jangan dilewatkan!
            </p>
          </div>

          {/* Proceed Button */}
          <div className="pt-2" id="checkout-button-container">
            <button
              onClick={onCheckout}
              className="w-full py-3.5 rounded-xl bg-brand-neon hover:bg-brand-neon/90 text-brand-bg font-bold font-heading text-sm tracking-wide flex items-center justify-center space-x-2 shadow-lg transition-all active:scale-[0.98] cursor-pointer"
              id="btn-confirm-checkout"
            >
              <span>Lanjutkan ke Checkout</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </button>
            
            <div className="flex items-center justify-center space-x-1.5 mt-3 text-[10px] text-gray-500">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-neon" />
              <span>Didukung Smart Contract Aman TON Network</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
