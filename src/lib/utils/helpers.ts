import type { Product, CartItem, SelectedOptions, ProductOptions } from '$lib/types/api';

// Форматирование цены
export const formatPrice = (price: number, currency: string = 'руб.'): string => {
  return `${price.toLocaleString('ru-RU')} ${currency}`;
};

// Форматирование даты
export const formatDate = (dateString: string, options?: Intl.DateTimeFormatOptions): string => {
  const date = new Date(dateString);
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return date.toLocaleDateString('ru-RU', options || defaultOptions);
};

// Форматирование даты и времени
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Сокращение текста
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Генерация уникального ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Проверка на пустой объект
export const isEmpty = (obj: any): boolean => {
  if (obj == null) return true;
  if (Array.isArray(obj) || typeof obj === 'string') return obj.length === 0;
  return Object.keys(obj).length === 0;
};

// Глубокое клонирование объекта
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as unknown as T;
  if (typeof obj === 'object') {
    const clonedObj = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
  return obj;
};

// Утилиты для работы с товарами
export const productUtils = {
  // Получение основной картинки товара
  getMainImage: (product: Product): string => {
    return product.mainImage || product.images[0] || '/img/placeholder.jpg';
  },

  // Получение цены со скидкой
  getDiscountedPrice: (product: Product): number => {
    if (product.oldPrice && product.oldPrice > product.price) {
      return product.price;
    }
    return product.price;
  },

  // Расчет процента скидки
  getDiscountPercentage: (product: Product): number => {
    if (product.oldPrice && product.oldPrice > product.price) {
      return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
    }
    return 0;
  },

  // Проверка наличия скидки
  hasDiscount: (product: Product): boolean => {
    return (
      product.oldPrice !== null &&
      product.oldPrice !== undefined &&
      product.oldPrice > product.price
    );
  },

  // Получение статуса товара
  getStatus: (product: Product): 'new' | 'discount' | 'out-of-stock' | 'in-stock' => {
    if (!product.inStock) return 'out-of-stock';
    if (product.isNew) return 'new';
    if (productUtils.hasDiscount(product)) return 'discount';
    return 'in-stock';
  },

  // Фильтрация товаров
  filterProducts: (
    products: Product[],
    filters: {
      category?: string;
      priceMin?: number;
      priceMax?: number;
      inStock?: boolean;
      isNew?: boolean;
      discount?: boolean;
      tags?: string[];
    }
  ): Product[] => {
    return products.filter(product => {
      // Фильтр по категории
      if (filters.category && product.category !== filters.category) {
        return false;
      }

      // Фильтр по цене
      const price = productUtils.getDiscountedPrice(product);
      if (filters.priceMin && price < filters.priceMin) {
        return false;
      }
      if (filters.priceMax && price > filters.priceMax) {
        return false;
      }

      // Фильтр по наличию
      if (filters.inStock !== undefined && product.inStock !== filters.inStock) {
        return false;
      }

      // Фильтр по новизне
      if (filters.isNew !== undefined && product.isNew !== filters.isNew) {
        return false;
      }

      // Фильтр по скидке
      if (
        filters.discount !== undefined &&
        productUtils.hasDiscount(product) !== filters.discount
      ) {
        return false;
      }

      // Фильтр по тегам
      if (filters.tags && filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some(tag => product.tags?.includes(tag));
        if (!hasMatchingTag) {
          return false;
        }
      }

      return true;
    });
  },

  // Сортировка товаров
  sortProducts: (
    products: Product[],
    sortBy: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'newest' | 'popular'
  ): Product[] => {
    const sortedProducts = [...products];

    switch (sortBy) {
      case 'price_asc':
        return sortedProducts.sort(
          (a, b) => productUtils.getDiscountedPrice(a) - productUtils.getDiscountedPrice(b)
        );

      case 'price_desc':
        return sortedProducts.sort(
          (a, b) => productUtils.getDiscountedPrice(b) - productUtils.getDiscountedPrice(a)
        );

      case 'name_asc':
        return sortedProducts.sort((a, b) => a.title.localeCompare(b.title));

      case 'name_desc':
        return sortedProducts.sort((a, b) => b.title.localeCompare(a.title));

      case 'newest':
        return sortedProducts.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

      case 'popular':
        // Здесь можно добавить логику сортировки по популярности
        return sortedProducts;

      default:
        return sortedProducts;
    }
  },
};

// Утилиты для работы с корзиной
export const cartUtils = {
  // Расчет общей стоимости товара с опциями
  calculateItemTotal: (item: CartItem): number => {
    if (item.totalPrice) return item.totalPrice;

    let basePrice = item.price;

    // Добавляем стоимость опций
    if (item.selectedOptions && item.options) {
      Object.entries(item.selectedOptions).forEach(([optionType, optionId]) => {
        const option = item.options?.[optionType]?.find(opt => opt.id === optionId);
        if (option) {
          basePrice += option.price;
        }
      });
    }

    return basePrice * item.quantity;
  },

  // Расчет общей стоимости корзины
  calculateCartTotal: (items: CartItem[]): number => {
    return items.reduce((total, item) => total + cartUtils.calculateItemTotal(item), 0);
  },

  // Подсчет общего количества товаров
  calculateCartCount: (items: CartItem[]): number => {
    return items.reduce((count, item) => count + item.quantity, 0);
  },

  // Проверка наличия товара в корзине
  isItemInCart: (
    cartItems: CartItem[],
    productId: string,
    selectedOptions?: SelectedOptions
  ): boolean => {
    return cartItems.some(item => {
      if (item.id !== productId) return false;

      if (!selectedOptions) return true;

      // Сравниваем опции
      return Object.entries(selectedOptions).every(
        ([key, value]) => item.selectedOptions?.[key] === value
      );
    });
  },
};

// Утилиты для работы с опциями
export const optionUtils = {
  // Получение названия опции
  getOptionName: (options: ProductOptions, optionType: string, optionId: string): string => {
    const option = options[optionType]?.find(opt => opt.id === optionId);
    return option?.name || optionId;
  },

  // Расчет дополнительной стоимости опций
  calculateOptionsPrice: (options: ProductOptions, selectedOptions: SelectedOptions): number => {
    let totalPrice = 0;

    Object.entries(selectedOptions).forEach(([optionType, optionId]) => {
      const option = options[optionType]?.find(opt => opt.id === optionId);
      if (option) {
        totalPrice += option.price;
      }
    });

    return totalPrice;
  },

  // Проверка валидности выбранных опций
  validateSelectedOptions: (options: ProductOptions, selectedOptions: SelectedOptions): boolean => {
    return Object.entries(selectedOptions).every(([optionType, optionId]) => {
      const availableOptions = options[optionType];
      return availableOptions?.some(opt => opt.id === optionId) || false;
    });
  },
};

// Утилиты для валидации
export const validationUtils = {
  // Валидация email
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Валидация телефона
  isValidPhone: (phone: string): boolean => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  },

  // Валидация пароля
  isValidPassword: (password: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Пароль должен содержать минимум 8 символов');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Пароль должен содержать хотя бы одну заглавную букву');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Пароль должен содержать хотя бы одну строчную букву');
    }

    if (!/\d/.test(password)) {
      errors.push('Пароль должен содержать хотя бы одну цифру');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  // Валидация обязательных полей
  validateRequired: (
    data: Record<string, any>,
    requiredFields: string[]
  ): { isValid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {};

    requiredFields.forEach(field => {
      if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
        errors[field] = 'Это поле обязательно для заполнения';
      }
    });

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },
};

// Утилиты для работы с URL
export const urlUtils = {
  // Создание URL с параметрами
  buildUrl: (baseUrl: string, params: Record<string, any>): string => {
    const url = new URL(baseUrl, window.location.origin);

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, value.toString());
      }
    });

    return url.toString();
  },

  // Парсинг параметров из URL
  parseUrlParams: (url: string): Record<string, string> => {
    const urlObj = new URL(url, window.location.origin);
    const params: Record<string, string> = {};

    urlObj.searchParams.forEach((value, key) => {
      params[key] = value;
    });

    return params;
  },

  // Создание slug из строки
  createSlug: (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[а-яё]/g, char => {
        const map: Record<string, string> = {
          а: 'a',
          б: 'b',
          в: 'v',
          г: 'g',
          д: 'd',
          е: 'e',
          ё: 'e',
          ж: 'zh',
          з: 'z',
          и: 'i',
          й: 'y',
          к: 'k',
          л: 'l',
          м: 'm',
          н: 'n',
          о: 'o',
          п: 'p',
          р: 'r',
          с: 's',
          т: 't',
          у: 'u',
          ф: 'f',
          х: 'h',
          ц: 'ts',
          ч: 'ch',
          ш: 'sh',
          щ: 'sch',
          ъ: '',
          ы: 'y',
          ь: '',
          э: 'e',
          ю: 'yu',
          я: 'ya',
        };
        return map[char] || char;
      })
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  },
};
