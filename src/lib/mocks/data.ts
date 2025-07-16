import type {
  Product,
  Category,
  User,
  Review,
  Notification,
  ProductOption,
  ProductOptions,
  ProductSpecification
} from '$lib/types/api';

// Моки для опций товаров
export const mockProductOptions: ProductOptions = {
  adapter: [
    { id: 'p222', name: 'P(222)', price: 0, description: 'Стандартный адаптер' },
    { id: 'p333', name: 'P(333)', price: 500, description: 'Улучшенный адаптер' },
    { id: 'p444', name: 'P(444)', price: 1000, description: 'Премиум адаптер' }
  ],
  height: [
    { id: 'h1', name: '1 дюйм', price: 0, description: 'Стандартная высота' },
    { id: 'h2', name: '2 дюйма', price: 200, description: 'Увеличенная высота' },
    { id: 'h3', name: '3 дюйма', price: 400, description: 'Максимальная высота' }
  ],
  rating: [
    { id: 'r1', name: '1 мкм', price: 0, description: 'Стандартная фильтрация' },
    { id: 'r2', name: '2 мкм', price: 300, description: 'Улучшенная фильтрация' },
    { id: 'r3', name: '3 мкм', price: 600, description: 'Максимальная фильтрация' }
  ]
};

// Моки для спецификаций товаров
export const mockSpecifications: ProductSpecification = {
  material: 'Гидрофобная высокоселективная мембрана из политетрафторэтилена',
  application: 'В биофармацевтической отрасли: Стерилизующая очистка сжатого воздуха, азота и других технол-ких газов, дыхательные фильтры для емкостей, задержание и возврат водных аэрозолей, содержащих субкультуры из воздуха ферментеров и реакторов. В пищевой промышленности: тонкая и стерилизующая очистка CO2, сжатого воздуха, техно-ого пара, используемого для обработки оборудования, дыхательные фильтры для емкостей, в спиртовом про-ве - очистка отходящего воздуха из ферментеров. В электро-, радио- и химической промышленности: очистка газообразных высоко агрессивных сред при нормальной и повышенной температуре, удержание жидких аэрозолей, очистка компрессорного воздуха.',
  dimensions: 'Стандартные размеры',
  weight: 'Легкий вес'
};

// Моки для товаров
export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Фильтрующий картридж серии FC PFE',
    description: 'Фильтрующий картридж c гидрофобной мембранной из политетрафторэтилена. Мембранный фильтроэлемент FC PFE имеет уникальную гидрофобность фильтровального материала.',
    shortDescription: 'Гидрофобный мембранный фильтроэлемент для стерилизующей очистки',
    price: 5550,
    oldPrice: null,
    images: [
      '/img/production-img-big.jpg',
      '/img/production-img-1.jpg',
      '/img/production-img-2.jpg',
      '/img/production-img-3.jpg',
      '/img/production-img-big.jpg',
      '/img/production-img-1.jpg',
      '/img/production-img-2.jpg'
    ],
    mainImage: '/img/production-img-big.jpg',
    isNew: true,
    discount: false,
    inStock: true,
    stockQuantity: 50,
    specifications: mockSpecifications,
    options: mockProductOptions,
    category: 'filters',
    tags: ['фильтр', 'мембрана', 'стерилизация'],
    sku: 'FC-PFE-001',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Фильтрующий картридж серии FC PP',
    description: 'Фильтрующий картридж из полипропилена для грубой очистки жидкостей и газов.',
    shortDescription: 'Полипропиленовый фильтроэлемент для грубой очистки',
    price: 3200,
    oldPrice: 3800,
    images: [
      '/img/production-img-2.jpg',
      '/img/production-img-3.jpg',
      '/img/production-img-1.jpg'
    ],
    mainImage: '/img/production-img-2.jpg',
    isNew: false,
    discount: true,
    inStock: true,
    stockQuantity: 30,
    specifications: {
      material: 'Полипропилен',
      application: 'Грубая очистка жидкостей и газов',
      dimensions: 'Стандартные размеры',
      weight: 'Средний вес'
    },
    options: mockProductOptions,
    category: 'filters',
    tags: ['фильтр', 'полипропилен', 'очистка'],
    sku: 'FC-PP-002',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-12T10:00:00Z'
  },
  {
    id: '3',
    title: 'Фильтрующий картридж серии FC GF',
    description: 'Стекловолоконный фильтрующий картридж для тонкой очистки и стерилизации.',
    shortDescription: 'Стекловолоконный фильтроэлемент для тонкой очистки',
    price: 7800,
    oldPrice: null,
    images: [
      '/img/production-img-3.jpg',
      '/img/production-img-1.jpg',
      '/img/production-img-2.jpg'
    ],
    mainImage: '/img/production-img-3.jpg',
    isNew: true,
    discount: false,
    inStock: true,
    stockQuantity: 20,
    specifications: {
      material: 'Стекловолокно',
      application: 'Тонкая очистка и стерилизация',
      dimensions: 'Стандартные размеры',
      weight: 'Тяжелый вес'
    },
    options: mockProductOptions,
    category: 'filters',
    tags: ['фильтр', 'стекловолокно', 'стерилизация'],
    sku: 'FC-GF-003',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '4',
    title: 'Фильтрующий картридж серии FC AC',
    description: 'Активированный угольный фильтрующий картридж для удаления запахов и органических соединений.',
    shortDescription: 'Угольный фильтроэлемент для удаления запахов',
    price: 4200,
    oldPrice: 4800,
    images: [
      '/img/production-img-1.jpg',
      '/img/production-img-2.jpg',
      '/img/production-img-3.jpg'
    ],
    mainImage: '/img/production-img-1.jpg',
    isNew: false,
    discount: true,
    inStock: false,
    stockQuantity: 0,
    specifications: {
      material: 'Активированный уголь',
      application: 'Удаление запахов и органических соединений',
      dimensions: 'Стандартные размеры',
      weight: 'Средний вес'
    },
    options: mockProductOptions,
    category: 'filters',
    tags: ['фильтр', 'уголь', 'запахи'],
    sku: 'FC-AC-004',
    createdAt: '2024-01-05T10:00:00Z',
    updatedAt: '2024-01-18T10:00:00Z'
  }
];

// Моки для категорий
export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Фильтроэлементы',
    slug: 'filters',
    description: 'Фильтрующие картриджи для различных применений',
    image: '/img/category-filters.jpg',
    productCount: 4,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: '2',
    name: 'Фильтродержатели',
    slug: 'filter-holders',
    description: 'Держатели для фильтрующих картриджей',
    image: '/img/category-holders.jpg',
    productCount: 0,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: '3',
    name: 'Комплектующие',
    slug: 'accessories',
    description: 'Комплектующие для фильтрационных систем',
    image: '/img/category-accessories.jpg',
    productCount: 0,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  }
];

// Моки для пользователей
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    firstName: 'Администратор',
    lastName: 'Системы',
    phone: '+7 (999) 123-45-67',
    role: 'admin',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: '2',
    email: 'user@example.com',
    firstName: 'Иван',
    lastName: 'Иванов',
    phone: '+7 (999) 987-65-43',
    role: 'user',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  }
];

// Моки для отзывов
export const mockReviews: Review[] = [
  {
    id: '1',
    productId: '1',
    userId: '2',
    userName: 'Иван Иванов',
    rating: 5,
    title: 'Отличный фильтр',
    comment: 'Очень качественный продукт, полностью соответствует описанию. Рекомендую!',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '2',
    productId: '1',
    userId: '2',
    userName: 'Петр Петров',
    rating: 4,
    title: 'Хороший фильтр',
    comment: 'Качественный продукт, но немного дороговат.',
    createdAt: '2024-01-18T10:00:00Z',
    updatedAt: '2024-01-18T10:00:00Z'
  }
];

// Моки для уведомлений
export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '2',
    type: 'info',
    title: 'Новый товар',
    message: 'Добавлен новый фильтрующий картридж серии FC GF',
    read: false,
    createdAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '2',
    userId: '2',
    type: 'success',
    title: 'Заказ подтвержден',
    message: 'Ваш заказ #12345 подтвержден и готов к отправке',
    read: true,
    createdAt: '2024-01-19T10:00:00Z'
  }
];

// Функции для работы с моками
export const mockApi = {
  // Задержка для имитации сетевого запроса
  delay: (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms)),

  // Получение товара по ID
  getProduct: async (id: string): Promise<Product | null> => {
    await mockApi.delay();
    return mockProducts.find(product => product.id === id) || null;
  },

  // Получение всех товаров
  getProducts: async (): Promise<Product[]> => {
    await mockApi.delay();
    return mockProducts;
  },

  // Поиск товаров
  searchProducts: async (query: string): Promise<Product[]> => {
    await mockApi.delay();
    const lowerQuery = query.toLowerCase();
    return mockProducts.filter(product =>
      product.title.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  },

  // Получение категорий
  getCategories: async (): Promise<Category[]> => {
    await mockApi.delay();
    return mockCategories;
  },

  // Получение отзывов для товара
  getProductReviews: async (productId: string): Promise<Review[]> => {
    await mockApi.delay();
    return mockReviews.filter(review => review.productId === productId);
  },

  // Получение уведомлений
  getNotifications: async (): Promise<Notification[]> => {
    await mockApi.delay();
    return mockNotifications;
  }
}; 