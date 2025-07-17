<script lang="ts">
  import { ShoppingCart } from 'lucide-svelte';
  import { cartActions } from '@entities/cart';
  import type { Product, CartItem } from '@shared/types';
  
  export let product: Product;
  export let quantity: number = 1;
  export let selectedOptions: Record<string, string> = {};
  export let disabled: boolean = false;
  export let variant: 'primary' | 'secondary' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  
  function addToCart() {
    const cartItem: CartItem = {
      ...product,
      productId: product.id,
      quantity,
      selectedOptions: selectedOptions && Object.keys(selectedOptions).length > 0 
        ? selectedOptions 
        : undefined,
      totalPrice: calculateTotalPrice(),
    };

    cartActions.addItem(cartItem);
  }
  
  function calculateTotalPrice(): number {
    let basePrice = product.price;
    let optionsPrice = 0;
    
    if (product.options && selectedOptions) {
      Object.entries(selectedOptions).forEach(([optionType, optionId]) => {
        const option = product.options?.[optionType]?.find(opt => opt.id === optionId);
        if (option?.price) {
          optionsPrice += option.price;
        }
      });
    }
    
    return (basePrice + optionsPrice) * quantity;
  }
  
  const variantClasses = {
    primary: 'bg-sky-600 hover:bg-sky-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  $: classes = `
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    font-medium rounded-lg transition-colors duration-200
    flex items-center justify-center space-x-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;
</script>

<button
  on:click={addToCart}
  {disabled}
  class={classes}
>
  <ShoppingCart class="w-5 h-5" />
  <span>Добавить в корзину</span>
</button> 