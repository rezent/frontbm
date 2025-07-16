import { writable, derived, type Writable, type Readable } from 'svelte/store';
import type { CartItem as CartItemType, SelectedOptions, ProductOptions } from '$lib/types/api';
export type CartItem = CartItemType;

// Тип для ключа товара
interface ItemKeyInfo {
  id: string;
  options: SelectedOptions | undefined;
  hasRealOptions: boolean;
  optionsKey: string;
  finalKey: string;
}

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
  const hasRealOptions = item.selectedOptions && 
    Object.keys(item.selectedOptions).length > 0 && 
    Object.values(item.selectedOptions).some(value => value && value !== '');
  
  if (hasRealOptions && item.selectedOptions) {
    const optionsKey = Object.entries(item.selectedOptions)
      .filter(([key, value]) => value && value !== '') // Исключаем пустые значения
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}:${value}`)
      .join('|');
    const key = `${item.id}_${optionsKey}`;
    
    const keyInfo: ItemKeyInfo = {
      id: item.id,
      options: item.selectedOptions,
      hasRealOptions,
      optionsKey,
      finalKey: key
    };
    
    return key;
  }
  
  const key = `${item.id}_no_options`;
  const keyInfo: ItemKeyInfo = {
    id: item.id,
    options: item.selectedOptions,
    hasRealOptions: false,
    optionsKey: '',
    finalKey: key
  };
  
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
                  : (item.price * (i.quantity + item.quantity))
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
      items.map((item: CartItem) => 
        getItemKey(item) === itemKey
          ? { 
              ...item, 
              quantity: Math.max(0, quantity),
              totalPrice: item.totalPrice 
                ? (item.totalPrice / item.quantity) * Math.max(0, quantity) 
                : (item.price * Math.max(0, quantity))
            }
          : item
      ).filter((item: CartItem) => item.quantity > 0)
    );
  },

  clearCart: () => {
    cart.set([]);
  }
};

// Вычисляемые значения для корзины
export const cartTotal: Readable<number> = derived(cart, ($cart: CartItem[]) => 
  $cart.reduce((total: number, item: CartItem) => {
    // Используем totalPrice если есть, иначе считаем по старой логике
    const itemTotal = item.totalPrice || (item.price * item.quantity);
    return total + itemTotal;
  }, 0)
);

export const cartCount: Readable<number> = derived(cart, ($cart: CartItem[]) => 
  $cart.reduce((count: number, item: CartItem) => count + item.quantity, 0)
); 