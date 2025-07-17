<script lang="ts">
  import { Eye } from 'lucide-svelte';
  import type { Product } from '../model/types';
  import { formatPrice } from '@shared/lib/helpers';
  
  export let product: Product;
  export let onImageClick: (() => void) | undefined = undefined;
  export let onProductClick: (() => void) | undefined = undefined;
  
  function handleImageClick() {
    onImageClick?.();
  }
  
  function handleProductClick() {
    onProductClick?.();
  }
</script>

<div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
  <!-- Product Image -->
  <div class="relative group">
    <button
      class="w-full h-48 object-cover object-center cursor-pointer p-0 border-0 bg-transparent"
      style="display: block;"
      on:click={handleImageClick}
      aria-label="Открыть изображение товара"
    >
      <img
        src={product.images?.[0] || '/img/placeholder.jpg'}
        alt={product.title}
        class="w-full h-48 object-cover object-center"
        draggable="false"
      />
    </button>

    <!-- Overlay with actions -->
    <div
      class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100"
    >
      <button
        on:click={handleImageClick}
        class="bg-white p-2 rounded-full hover:bg-gray-100 transition-colors"
        title="Увеличить изображение"
      >
        <Eye class="w-5 h-5 text-gray-700" />
      </button>
    </div>

    <!-- Badges -->
    {#if product.isNew}
      <div class="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
        Новинка!
      </div>
    {/if}
    {#if product.discount}
      <div class="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
        Скидка!
      </div>
    {/if}
  </div>

  <!-- Product Info -->
  <div class="p-4">
    <h3 class="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
      <button on:click={handleProductClick} class="text-left w-full">
        {product.title}
      </button>
    </h3>

    <p class="text-gray-600 text-sm mb-3 line-clamp-2">
      {product.description}
    </p>

    <!-- Price -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center space-x-2">
        {#if product.oldPrice}
          <span class="text-gray-400 line-through text-sm">
            {formatPrice(product.oldPrice)}
          </span>
        {/if}
        <span class="text-xl font-bold text-gray-900">
          {formatPrice(product.price)}
        </span>
      </div>
    </div>

    <slot name="actions" />
  </div>
</div>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-clamp: 2;
  }
</style> 