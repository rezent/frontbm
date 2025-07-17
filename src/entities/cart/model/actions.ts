import { cart, getItemKey } from './store';
import type { CartItem } from './types';

// Интерфейс для действий с корзиной
interface CartActions {
  addItem: (item: CartItem) => void;
  removeItem: (itemKey: string) => void;
  updateQuantity: (itemKey: string, quantity: number) => void;
  clearCart: () => void;
}

// Функции для работы с корзиной
export const cartActions: CartActions = {
  addItem: (item: CartItem) => {
    cart.update((items: CartItem[]) => {
      // Создаем уникальный ключ для товара с опциями
      const itemKey = getItemKey(item);

      const existingItem = items.find((i: CartItem) => getItemKey(i) === itemKey);
      if (existingItem) {
        const updatedItems = items.map((i: CartItem) =>
          getItemKey(i) === itemKey
            ? {
                ...i,
                quantity: i.quantity + item.quantity,
                totalPrice: i.totalPrice
                  ? (i.totalPrice / i.quantity) * (i.quantity + item.quantity)
                  : item.price * (i.quantity + item.quantity),
              }
            : i
        );
        return updatedItems;
      }

      const newItems = [...items, item];
      return newItems;
    });
  },

  removeItem: (itemKey: string) => {
    cart.update((items: CartItem[]) =>
      items.filter((item: CartItem) => getItemKey(item) !== itemKey)
    );
  },

  updateQuantity: (itemKey: string, quantity: number) => {
    cart.update((items: CartItem[]) =>
      items
        .map((item: CartItem) =>
          getItemKey(item) === itemKey
            ? {
                ...item,
                quantity: Math.max(0, quantity),
                totalPrice: item.totalPrice
                  ? (item.totalPrice / item.quantity) * Math.max(0, quantity)
                  : item.price * Math.max(0, quantity),
              }
            : item
        )
        .filter((item: CartItem) => item.quantity > 0)
    );
  },

  clearCart: () => {
    cart.set([]);
  },
}; 