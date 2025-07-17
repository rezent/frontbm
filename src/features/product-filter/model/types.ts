export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface FilterGroup {
  name: string;
  label: string;
  type: 'checkbox' | 'range' | 'select';
  options?: FilterOption[];
  min?: number;
  max?: number;
  value?: any;
}

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  inStock: boolean;
  isNew: boolean;
  hasDiscount: boolean;
  tags: string[];
}

export interface AppliedFilter {
  group: string;
  value: any;
  label: string;
} 