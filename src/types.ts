export interface Product {
  id: string;
  name: string;
  category: 'Kucing' | 'Anjing' | 'Ikan' | 'Burung';
  price: number; // in TON
  stock: number;
  image: string; // fallback SVG / emoji / gradient style
  description: string;
  weight: string; // e.g., "1.2 kg", "500 gr"
  rating: number;
  isHot?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type AppTab = 'catalog' | 'cart' | 'wallet' | 'warehouse' | 'settings';

export interface TelegramUserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
}

export interface AppState {
  isTelegramLoggedIn: boolean;
  telegramUser: TelegramUserData | null;
  selectedTab: AppTab;
  cart: CartItem[];
  watchedAd: boolean;
  tonWalletAddress: string | null;
  tonWalletConnected: boolean;
  currentStep: 'catalog' | 'cart_checkout' | 'ads_prompt' | 'ads_watching' | 'payment_process' | 'transaction_confirming' | 'success_page' | 'error_page';
  lastError: string | null;
}
