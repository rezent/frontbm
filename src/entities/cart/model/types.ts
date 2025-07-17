import type { CartItem as SharedCartItem } from '@shared/types';

// Re-export shared types
export type CartItem = SharedCartItem;

// Дополнительные типы для корзины
export interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
}

export interface CartSummary {
  itemsCount: number;
  totalPrice: number;
  discount: number;
  finalPrice: number;
} 