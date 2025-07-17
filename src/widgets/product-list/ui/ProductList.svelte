<script lang="ts">
  import { ProductCard } from '@entities/product';
  import { AddToCartButton } from '@features/cart';
  import { ChevronLeft, ChevronRight } from 'lucide-svelte';
  import type { Product } from '@shared/types';
  import { goto } from '$app/navigation';

  export let products: Product[] = [];
  export let loading: boolean = false;
  export let title: string = 'Продукция';
  export let showViewAllButton: boolean = true;
  export let viewAllUrl: string = '/catalog';
  export let columns: 1 | 2 | 3 | 4 | 5 = 4;

  // Состояние модального окна изображения
  let selectedProduct: Product | null = null;
  let showImageModal = false;
  let currentImageIndex = 0;

  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
  };

  function handleProductClick(product: Product) {
    goto(`/product/${product.id}`);
  }

  function handleImageClick(product: Product) {
    selectedProduct = product;
    showImageModal = true;
    currentImageIndex = 0;
  }

  function closeImageModal() {
    showImageModal = false;
    selectedProduct = null;
    currentImageIndex = 0;
  }

  function nextImage() {
    if (selectedProduct?.images && selectedProduct.images.length > 1) {
      currentImageIndex = (currentImageIndex + 1) % selectedProduct.images.length;
    }
  }

  function prevImage() {
    if (selectedProduct?.images && selectedProduct.images.length > 1) {
      currentImageIndex = currentImageIndex === 0 ? selectedProduct.images.length - 1 : currentImageIndex - 1;
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (!showImageModal) return;
    
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

  // Реактивные переменные
  $: currentImage = selectedProduct?.images?.[currentImageIndex] || selectedProduct?.images?.[0] || '/img/placeholder.jpg';
  $: hasMultipleImages = selectedProduct?.images && selectedProduct.images.length > 1;
</script>

<svelte:window on:keydown={handleKeydown} />

<section class="py-16">
  <div class="container mx-auto px-4">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-3xl font-bold text-gray-900">{title}</h2>
      {#if showViewAllButton}
        <a href={viewAllUrl} class="text-gray-600 hover:text-gray-700 font-medium">
          Все товары →
        </a>
      {/if}
    </div>

    <!-- Loading state -->
    {#if loading}
      <div class="grid {columnClasses[columns]} gap-6">
        {#each Array(8) as _}
          <div class="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div class="w-full h-48 bg-gray-300"></div>
            <div class="p-4">
              <div class="h-4 bg-gray-300 rounded mb-2"></div>
              <div class="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
              <div class="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div class="h-10 bg-gray-300 rounded"></div>
            </div>
          </div>
        {/each}
      </div>
    {:else if products.length === 0}
      <!-- Empty state -->
      <div class="text-center py-12">
        <div class="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V7l-7-5z" clip-rule="evenodd" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Продукты не найдены</h3>
        <p class="text-gray-500">Попробуйте изменить параметры поиска или фильтрации</p>
      </div>
    {:else}
      <!-- Products grid -->
      <div class="grid {columnClasses[columns]} gap-6">
        {#each products as product (product.id)}
          <ProductCard
            {product}
            onProductClick={() => handleProductClick(product)}
            onImageClick={() => handleImageClick(product)}
          >
            <div slot="actions">
              <AddToCartButton 
                {product} 
                variant="primary" 
                size="md"
              />
            </div>
          </ProductCard>
        {/each}
      </div>
    {/if}
  </div>
</section> 

<!-- Image Modal -->
{#if showImageModal && selectedProduct}
  <div
    class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
    on:click={closeImageModal}
    on:keydown={(e) => { if (e.key === 'Escape') closeImageModal(); }}
    role="dialog"
    aria-modal="true"
    aria-labelledby="image-modal-title"
    tabindex="0"
  >
    <div
      class="relative max-w-4xl max-h-full p-4"
      on:click|stopPropagation
      on:keydown|stopPropagation
      role="dialog"
      aria-modal="true"
      aria-labelledby="image-modal-title"
      tabindex="0"
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
        alt="{selectedProduct.title} - изображение {currentImageIndex + 1}"
        class="w-full h-auto rounded-lg shadow-lg max-h-[80vh] object-contain"
      />

      <!-- Image Counter -->
      {#if hasMultipleImages}
        <div class="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {selectedProduct.images.length}
        </div>
      {/if}

      <!-- Product Info -->
      <div class="mt-4 text-center">
        <h3 class="text-white text-xl font-semibold">{selectedProduct.title}</h3>
        <p class="text-gray-300 mt-2">{selectedProduct.shortDescription || selectedProduct.description}</p>
      </div>

      <!-- Thumbnail Navigation -->
      {#if hasMultipleImages}
        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black/50 rounded-lg p-2 max-w-xs overflow-x-auto">
          {#each selectedProduct.images as image, index}
            <button
              on:click={() => currentImageIndex = index}
              class="w-12 h-12 rounded border-2 transition-all flex-shrink-0 {currentImageIndex === index ? 'border-white' : 'border-gray-400 hover:border-gray-200'}"
              aria-label="Переключиться на изображение {index + 1}"
            >
              <img
                src={image}
                alt="{selectedProduct.title} - миниатюра {index + 1}"
                class="w-full h-full object-cover rounded"
              />
            </button>
          {/each}
        </div>
      {/if}
    </div>
  </div>
{/if} 