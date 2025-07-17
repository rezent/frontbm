import type { Product } from '../types';

// Мокап данные для продуктов
export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Промышленный фильтр картридж 10"',
    description: 'Высококачественный картридж для промышленной фильтрации воды. Обеспечивает эффективную очистку от механических примесей.',
    shortDescription: 'Картридж для промышленной фильтрации 10 дюймов',
    price: 2500,
    oldPrice: 3000,
    sku: 'FK-10-001',
    stockQuantity: 25,
    inStock: true,
    category: 'Картриджи',
    images: ['/images/filter1.jpg'],
    mainImage: '/images/filter1.jpg',
    specifications: {
      dimensions: '10 дюймов',
      material: 'Полипропилен',
      application: 'Механическая очистка',
      weight: '0.5 кг'
    },
    options: {
      height: [
        { id: 'h1', name: '10"', price: 0 },
        { id: 'h2', name: '20"', price: 500 },
        { id: 'h3', name: '30"', price: 1000 }
      ],
      adapter: [
        { id: 'a1', name: 'Полипропилен', price: 0 },
        { id: 'a2', name: 'Углеродное волокно', price: 800 },
        { id: 'a3', name: 'Керамика', price: 1200 }
      ]
    },
    tags: ['промышленный', 'картридж', 'фильтрация'],
    isNew: false,
    discount: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    title: 'Система обратного осмоса RO-500',
    description: 'Профессиональная система обратного осмоса для коммерческого использования. Производительность до 500 литров в час.',
    shortDescription: 'Система обратного осмоса 500 л/ч',
    price: 85000,
    oldPrice: 95000,
    sku: 'RO-500-PRO',
    stockQuantity: 8,
    inStock: true,
    category: 'Системы фильтрации',
    images: ['/images/filter2.jpg'],
    mainImage: '/images/filter2.jpg',
    specifications: {
      dimensions: '1200x600x400 мм',
      material: 'Нержавеющая сталь',
      application: 'Коммерческое использование',
      weight: '45 кг'
    },
    options: {
      rating: [
        { id: 'r1', name: '300 л/ч', price: -15000 },
        { id: 'r2', name: '500 л/ч', price: 0 },
        { id: 'r3', name: '750 л/ч', price: 25000 }
      ]
    },
    tags: ['обратный осмос', 'коммерческий', 'высокая производительность'],
    isNew: true,
    discount: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '3',
    title: 'Ультрафильтрационная мембрана UF-8040',
    description: 'Высокоэффективная ультрафильтрационная мембрана для удаления бактерий, вирусов и коллоидных частиц.',
    shortDescription: 'УФ мембрана 8040 формата',
    price: 15000,
    oldPrice: 18000,
    sku: 'UF-8040-M',
    stockQuantity: 15,
    inStock: true,
    category: 'Мембраны',
    images: ['/images/filter3.jpg'],
    mainImage: '/images/filter3.jpg',
    specifications: {
      dimensions: '8" x 40"',
      material: 'PVDF',
      application: 'Ультрафильтрация',
      weight: '2.5 кг'
    },
    options: {
      height: [
        { id: 'h1', name: '4040', price: -3000 },
        { id: 'h2', name: '8040', price: 0 }
      ]
    },
    tags: ['ультрафильтрация', 'мембрана', 'очистка воды'],
    isNew: false,
    discount: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '4',
    title: 'Фильтр-держатель Big Blue 20"',
    description: 'Прочный фильтр-держатель для картриджей Big Blue формата. Подходит для высоких нагрузок.',
    shortDescription: 'Держатель для картриджей Big Blue 20"',
    price: 4500,
    oldPrice: 5500,
    sku: 'BB-20-HOLDER',
    stockQuantity: 30,
    inStock: true,
    category: 'Держатели',
    images: ['/images/filtroderzhateli.png'],
    mainImage: '/images/filtroderzhateli.png',
    specifications: {
      dimensions: '20 дюймов',
      material: 'Полипропилен',
      application: 'Держатель картриджей',
      weight: '1.2 кг'
    },
    options: {
      adapter: [
        { id: 'a1', name: '1" NPT', price: 0 },
        { id: 'a2', name: '3/4" NPT', price: -200 },
        { id: 'a3', name: '1/2" NPT', price: -400 }
      ]
    },
    tags: ['держатель', 'big blue', 'промышленный'],
    isNew: false,
    discount: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '5',
    title: 'Сменный элемент активированный уголь',
    description: 'Сменный фильтрующий элемент с активированным углем для удаления хлора, запахов и привкусов.',
    shortDescription: 'Угольный фильтрующий элемент',
    price: 1800,
    oldPrice: 2200,
    sku: 'AC-ELEMENT',
    stockQuantity: 45,
    inStock: true,
    category: 'Элементы',
    images: ['/images/filtroelementy.jpg'],
    mainImage: '/images/filtroelementy.jpg',
    specifications: {
      dimensions: '10" x 2.5"',
      material: 'Кокосовый активированный уголь',
      application: 'Удаление хлора и запахов',
      weight: '0.8 кг'
    },
    options: {
      adapter: [
        { id: 'a1', name: 'Кокосовый', price: 0 },
        { id: 'a2', name: 'Каменноугольный', price: 150 },
        { id: 'a3', name: 'Древесный', price: -100 }
      ]
    },
    tags: ['активированный уголь', 'очистка воды', 'удаление хлора'],
    isNew: false,
    discount: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '6',
    title: 'Комплект для замены мембран',
    description: 'Полный комплект для замены мембран в системах обратного осмоса. Включает все необходимые компоненты.',
    shortDescription: 'Комплект замены мембран RO',
    price: 12000,
    oldPrice: 14000,
    sku: 'RO-REPLACE-KIT',
    stockQuantity: 12,
    inStock: true,
    category: 'Комплекты',
    images: ['/img/production-img-1.jpg'],
    mainImage: '/img/production-img-1.jpg',
    specifications: {
      dimensions: 'Универсальный',
      material: 'Комплект материалов',
      application: 'Замена мембран RO',
      weight: '3.5 кг'
    },
    options: {
      height: [
        { id: 'h1', name: '4040', price: -2000 },
        { id: 'h2', name: '8040', price: 0 },
        { id: 'h3', name: 'Универсальный', price: 1000 }
      ]
    },
    tags: ['комплект', 'замена мембран', 'обслуживание'],
    isNew: true,
    discount: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  }
];

// Дополнительные мокап данные для категорий
export const mockCategories = [
  { id: '1', name: 'Картриджи', slug: 'kartridzhi' },
  { id: '2', name: 'Системы фильтрации', slug: 'sistemy-filtratsii' },
  { id: '3', name: 'Мембраны', slug: 'membrany' },
  { id: '4', name: 'Держатели', slug: 'derzhateli' },
  { id: '5', name: 'Элементы', slug: 'elementy' },
  { id: '6', name: 'Комплекты', slug: 'komplekty' }
]; 