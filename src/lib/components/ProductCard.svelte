<script lang="ts">
  import { cartActions } from '$lib/stores/cart';
  import { Eye, ShoppingCart } from 'lucide-svelte';
  import type { Product, CartItem } from '$lib/types/api';
  import { goto } from '$app/navigation';

  export let product: Product;
  export let showImageModal: boolean = false;

  let imageModalOpen: boolean = false;

  function addToCart() {
    const cartItem: CartItem = {
      ...product,
      productId: product.id,
      quantity: 1,
      selectedOptions: {},
      totalPrice: product.price,
    };
    cartActions.addItem(cartItem);
  }

  function openImageModal() {
    imageModalOpen = true;
    showImageModal = true;
  }

  function closeImageModal() {
    imageModalOpen = false;
    showImageModal = false;
  }

  function handleBackdropKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      closeImageModal();
    }
  }

  function goToProduct() {
    goto(`/product/${product.id}`);
  }
</script>

<div
  class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
>
  <!-- Product Image -->
  <div class="relative group">
    <button
      class="w-full h-48 object-cover object-center cursor-pointer p-0 border-0 bg-transparent"
      style="display: block;"
      on:click={openImageModal}
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
        on:click={openImageModal}
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
      <a href={`/product/${product.id}`}>{product.title}</a>
    </h3>

    <p class="text-gray-600 text-sm mb-3 line-clamp-2">
      {product.description}
    </p>

    <!-- Price -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center space-x-2">
        {#if product.oldPrice}
          <span class="text-gray-400 line-through text-sm">
            {product.oldPrice.toLocaleString()} руб.
          </span>
        {/if}
        <span class="text-xl font-bold text-gray-900">
          {product.price.toLocaleString()} руб.
        </span>
      </div>
    </div>

    <!-- Add to Cart Button -->
    <button
      on:click={goToProduct}
      class="w-full bg-sky-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center justify-center space-x-2"
    >
      <span>Подробнее</span>
    </button>
  </div>
</div>

<!-- Image Modal -->
{#if imageModalOpen}
  <div
    class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
    on:click={closeImageModal}
    on:keydown={handleBackdropKeydown}
    role="button"
    tabindex="0"
    aria-label="Закрыть модальное окно"
  >
    <div
      class="relative max-w-4xl max-h-full p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="image-modal-title"
    >
      <button
        on:click={closeImageModal}
        on:click|stopPropagation
        class="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
        aria-label="Закрыть модальное окно"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
      <img
        id="image-modal-title"
        src={product.images?.[0] || '/img/placeholder.jpg'}
        alt={product.title}
        class="w-full h-auto rounded-lg shadow-lg"
      />
    </div>
  </div>
{/if}

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-clamp: 2;
  }
</style>
