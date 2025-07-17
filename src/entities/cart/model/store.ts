import { writable, derived, type Writable, type Readable } from 'svelte/store';
import type { CartItem } from './types';

// ItemKeyInfo удален - интерфейс не используется

// Функция для загрузки корзины из localStorage
function loadCartFromStorage(): CartItem[] {
  if (typeof window !== 'undefined') {
    try {
      const savedCart = localStorage.getItem('cart');
      const parsedCart: CartItem[] = savedCart ? JSON.parse(savedCart) : [];
      return parsedCart;
    } catch (e) {
      console.warn('Failed to load cart from localStorage:', e);
      return [];
    }
  }
  return [];
}

// Функция для получения уникального ключа товара с опциями
export const getItemKey = (item: CartItem): string => {
  // Проверяем, есть ли реальные опции (не пустой объект)
  const hasRealOptions =
    item.selectedOptions &&
    Object.keys(item.selectedOptions).length > 0 &&
    Object.values(item.selectedOptions).some(value => value && value !== '');

  if (hasRealOptions && item.selectedOptions) {
    const optionsKey = Object.entries(item.selectedOptions)
      .filter(([, value]) => value && value !== '') // Исключаем пустые значения
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}:${value}`)
      .join('|');
    const key = `${item.id}_${optionsKey}`;

    return key;
  }

  const key = `${item.id}_no_options`;
  return key;
};

// Создаем store для корзины с инициализацией из localStorage
export const cart: Writable<CartItem[]> = writable(loadCartFromStorage());

// Автоматически сохраняем корзину в localStorage при каждом изменении
if (typeof window !== 'undefined') {
  cart.subscribe((items: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(items));
  });
}

// Вычисляемые значения для корзины
export const cartTotal: Readable<number> = derived(cart, ($cart: CartItem[]) =>
  $cart.reduce((total: number, item: CartItem) => {
    // Используем totalPrice если есть, иначе считаем по старой логике
    const itemTotal = item.totalPrice || item.price * item.quantity;
    return total + itemTotal;
  }, 0)
);

export const cartCount: Readable<number> = derived(cart, ($cart: CartItem[]) =>
  $cart.reduce((count: number, item: CartItem) => count + item.quantity, 0)
); 