import type { Product as SharedProduct } from '@shared/types';

// Re-export shared types
export type Product = SharedProduct;

// Дополнительные типы специфичные для entity
export interface ProductFilters {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  inStock?: boolean;
  isNew?: boolean;
  discount?: boolean;
  tags?: string[];
}

export interface ProductSortOptions {
  field: 'price' | 'name' | 'date';
  order: 'asc' | 'desc';
} 