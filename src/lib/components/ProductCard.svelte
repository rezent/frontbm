<script lang="ts">
  // import { cartActions } from '$lib/stores/cart'; // Пока не используется
  import { Eye, ChevronLeft, ChevronRight } from 'lucide-svelte';
  import type { Product } from '$lib/types/api';
  import { goto } from '$app/navigation';

  export let product: Product;
  export let showImageModal: boolean = false;

  let imageModalOpen: boolean = false;
  let currentImageIndex: number = 0;

  // Пока не используется - закомментировано
  // function addToCart() {
  //   const cartItem: CartItem = {
  //     id: product.id,
  //     title: product.title,
  //     price: product.price,
  //     quantity: 1,
  //     selectedOptions: {},
  //     options: product.options
  //   };
  //   cartActions.addItem(cartItem);
  // }

  function openImageModal() {
    imageModalOpen = true;
    showImageModal = true;
    currentImageIndex = 0; // Начинаем с первого изображения
  }

  function closeImageModal() {
    imageModalOpen = false;
    showImageModal = false;
    currentImageIndex = 0;
  }

  function nextImage() {
    if (product.images && product.images.length > 1) {
      currentImageIndex = (currentImageIndex + 1) % product.images.length;
    }
  }

  function prevImage() {
    if (product.images && product.images.length > 1) {
      currentImageIndex = currentImageIndex === 0 ? product.images.length - 1 : currentImageIndex - 1;
    }
  }

  function handleModalKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      closeImageModal();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      nextImage();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      prevImage();
    }
  }

  function handleBackdropKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      closeImageModal();
    }
  }

  function goToProduct() {
    goto(`/product/${product.id}`);
  }

  // Получаем текущее изображение
  $: currentImage = product.images?.[currentImageIndex] || product.images?.[0] || '/img/placeholder.jpg';
  $: hasMultipleImages = product.images && product.images.length > 1;
</script>

<svelte:window on:keydown={imageModalOpen ? handleModalKeydown : undefined} />

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
      tabindex="0"
      on:click|stopPropagation
      on:keydown|stopPropagation
    >
      <!-- Close Button -->
      <button
        on:click={closeImageModal}
        class="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
        aria-label="Закрыть модальное окно"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>

      <!-- Previous Image Button -->
      {#if hasMultipleImages}
        <button
          on:click={prevImage}
          class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-3 hover:bg-black/70"
          aria-label="Предыдущее изображение"
        >
          <ChevronLeft class="w-6 h-6" />
        </button>
      {/if}

      <!-- Next Image Button -->
      {#if hasMultipleImages}
        <button
          on:click={nextImage}
          class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-3 hover:bg-black/70"
          aria-label="Следующее изображение"
        >
          <ChevronRight class="w-6 h-6" />
        </button>
      {/if}

      <!-- Main Image -->
      <img
        id="image-modal-title"
        src={currentImage}
        alt="{product.title} - изображение {currentImageIndex + 1}"
        class="w-full h-auto rounded-lg shadow-lg max-h-[80vh] object-contain"
      />

      <!-- Image Counter -->
      {#if hasMultipleImages}
        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {product.images.length}
        </div>
      {/if}

      <!-- Thumbnail Navigation -->
      {#if hasMultipleImages}
        <div class="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black/50 rounded-lg p-2">
          {#each product.images as image, index}
            <button
              on:click={() => currentImageIndex = index}
              class="w-12 h-12 rounded border-2 transition-all {currentImageIndex === index ? 'border-white' : 'border-gray-400 hover:border-gray-200'}"
              aria-label="Переключиться на изображение {index + 1}"
            >
              <img
                src={image}
                alt="{product.title} - миниатюра {index + 1}"
                class="w-full h-full object-cover rounded"
              />
            </button>
          {/each}
        </div>
      {/if}
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
