import React, { useState } from 'react';
import { Search, Plus, Minus, ShoppingBag, Flame, Sparkles, Star } from 'lucide-react';
import { Product, CartItem } from '../types';

interface ProductsCatalogProps {
  products: Product[];
  cart: CartItem[];
  onAddToCart: (product: Product, quantity: number) => void;
  onUpdateCartQuantity: (productId: string, quantity: number) => void;
  onOpenCart: () => void;
}

export default function ProductsCatalog({
  products,
  cart,
  onAddToCart,
  onUpdateCartQuantity,
  onOpenCart,
}: ProductsCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Find if item is in cart
  const getCartQuantity = (productId: string): number => {
    const item = cart.find((c) => c.product.id === productId);
    return item ? item.quantity : 0;
  };

  // Filter products based on selected category & query
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'Semua' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['Semua', 'Kucing', 'Anjing', 'Ikan', 'Burung'];

  return (
    <div className="space-y-6 pb-24" id="products-catalog-section">
      
      {/* Promo banner matching dark theme */}
      <div className="relative w-full rounded-2xl p-4 bg-gradient-to-r from-brand-accent/20 to-brand-purple/20 border border-white/5 overflow-hidden flex items-center justify-between" id="promo-banner">
        <div className="space-y-1 z-10" id="promo-text-container">
          <div className="flex items-center space-x-1.5" id="promo-title-badge">
            <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
            <span className="text-[10px] font-bold tracking-wider text-amber-300 uppercase">Promo Minggu Ini</span>
          </div>
          <h4 className="text-sm font-bold text-white font-heading">
            Diskon 20% dengan AdsGram Reward
          </h4>
          <p className="text-[10px] text-gray-400">
            Nonton video iklan singkat saat checkout dan hemat hingga 0.5 TON!
          </p>
        </div>
        <div className="w-12 h-12 rounded-full bg-brand-neon/10 flex items-center justify-center text-2xl animate-pulse" id="promo-emoji">
          🎁
        </div>
      </div>

      {/* Styled Search Bar */}
      <div className="relative" id="catalog-search-wrapper">
        <span className="absolute left-3.5 top-3 text-gray-500">
          <Search className="w-4 h-4" />
        </span>
        <input
          type="text"
          placeholder="Cari pakan kucing, anjing, hias..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-brand-card focus:bg-brand-card-light text-white text-xs placeholder-gray-500 rounded-xl pl-10 pr-4 py-3 border border-white/5 focus:border-brand-neon focus:outline-none transition-all duration-300"
          id="catalog-search-input"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-2.5 text-[10px] bg-white/5 hover:bg-white/10 px-1.5 py-0.5 rounded text-gray-400"
          >
            Clear
          </button>
        )}
      </div>

      {/* Category Pills Slider - MATCHING the weather pills layout of home-screen.webp */}
      <div className="space-y-2" id="category-selector-wrapper">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pl-1 font-heading">Kategori Pakan</span>
        <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none" id="category-pills-list">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium cursor-pointer flex-shrink-0 transition-all duration-300 border ${
                  isActive
                    ? 'bg-brand-neon text-brand-bg border-brand-neon font-semibold shadow-[0_2px_10px_rgba(0,213,255,0.2)]'
                    : 'bg-brand-card hover:bg-brand-card-light text-gray-300 border-white/5'
                }`}
                id={`cat-pill-${cat}`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Grid */}
      <div className="space-y-4" id="products-list-wrapper">
        <div className="flex justify-between items-center px-1" id="products-grid-header">
          <h3 className="text-sm font-semibold tracking-tight text-white font-heading">
            Daftar Pakan `{selectedCategory}` ({filteredProducts.length})
          </h3>
          {cart.length > 0 && (
            <button
              onClick={onOpenCart}
              className="text-[10px] text-brand-neon hover:underline font-semibold flex items-center space-x-1"
              id="view-cart-link"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Lihat Keranjang ({cart.reduce((s, c) => s + c.quantity, 0)})</span>
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="p-8 rounded-2xl bg-brand-card border border-white/5 text-center text-gray-500 text-xs" id="no-products-view">
            Tidak ada pakan yang cocok dengan pencarian Anda.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3" id="products-grid">
            {filteredProducts.map((p) => {
              const qty = getCartQuantity(p.id);
              return (
                <div
                  key={p.id}
                  className="bg-brand-card border border-white/5 hover:border-brand-neon/30 p-3 rounded-2xl flex flex-col justify-between relative group/card transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                  id={`product-card-${p.id}`}
                >
                  {/* Hot Deal Ribbon */}
                  {p.isHot && (
                    <span className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-semibold text-[8px] tracking-wide uppercase px-1.5 py-0.5 rounded-md flex items-center space-x-0.5 z-10 animate-pulse">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>Best</span>
                    </span>
                  )}

                  <div className="space-y-2" id={`product-info-block-${p.id}`}>
                    {/* Visual box resembling layout with emoji inside cool dynamic gradients */}
                    <div className="w-full h-24 rounded-xl bg-gradient-to-br from-brand-card-light to-brand-bg flex items-center justify-center text-4xl relative overflow-hidden group-hover/card:scale-105 transition-transform duration-300">
                      <span className="z-10">{p.image}</span>
                      {/* Decorative circular shapes */}
                      <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full bg-brand-accent/5"></div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] font-medium uppercase text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">
                        {p.category}
                      </span>
                      <h4 className="text-xs font-bold text-white line-clamp-1 group-hover/card:text-brand-neon transition-colors" title={p.name}>
                        {p.name}
                      </h4>
                      
                      {/* Weight and rating info */}
                      <div className="flex items-center justify-between text-[10px] text-gray-500">
                        <span>{p.weight}</span>
                        <div className="flex items-center text-amber-400">
                          <Star className="w-2.5 h-2.5 fill-amber-400 mr-0.5" />
                          <span>{p.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stock, Price and Action Block */}
                  <div className="mt-4 pt-2 border-t border-white/5 space-y-2" id={`product-purchase-controls-${p.id}`}>
                    <div className="flex justify-between items-end">
                      <div className="flex flex-col">
                        <span className="text-[8px] text-gray-500 uppercase tracking-widest font-mono">Harga</span>
                        <span className="text-xs font-black text-brand-neon font-mono flex items-center">
                          💎 {p.price} <span className="text-[8px] font-normal text-gray-400 ml-0.5">TON</span>
                        </span>
                      </div>
                      <span className={`text-[9px] font-mono ${p.stock <= 5 ? 'text-rose-500 font-bold' : 'text-gray-500'}`}>
                        Stok: {p.stock}
                      </span>
                    </div>

                    {qty > 0 ? (
                      <div className="flex justify-between items-center bg-brand-card-light rounded-xl p-1" id={`qty-counter-${p.id}`}>
                        <button
                          onClick={() => onUpdateCartQuantity(p.id, qty - 1)}
                          className="w-7 h-7 rounded-lg bg-brand-card hover:bg-brand-neon/10 text-gray-300 hover:text-brand-neon flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-white font-mono px-2">{qty}</span>
                        <button
                          onClick={() => {
                            if (p.stock > qty) {
                              onUpdateCartQuantity(p.id, qty + 1);
                            }
                          }}
                          disabled={qty >= p.stock}
                          className="w-7 h-7 rounded-lg bg-brand-card hover:bg-brand-neon/10 text-gray-300 hover:text-brand-neon flex items-center justify-center transition-colors shadow-sm disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => p.stock > 0 && onAddToCart(p, 1)}
                        disabled={p.stock <= 0}
                        className="w-full py-2 bg-brand-card-light hover:bg-brand-neon hover:text-brand-bg rounded-xl border border-white/5 hover:border-brand-neon text-white text-[10px] font-bold font-heading uppercase transition-all duration-300 animate-fade-in flex items-center justify-center space-x-1 shadow-sm cursor-pointer"
                        id={`btn-add-to-cart-${p.id}`}
                      >
                        <Plus className="w-3 h-3" />
                        <span>Beli</span>
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
