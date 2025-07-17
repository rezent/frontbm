<script lang="ts">
  import { page } from '$app/stores';
  import { cartActions } from '@entities/cart';
  import { Eye, ShoppingCart, Minus, Plus } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import SEO from '$lib/components/SEO.svelte';
  import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
  import ProductCard from '$lib/components/ProductCard.svelte';
  import type { Product, CartItem } from '$lib/types/api';

  const productId = $page.params.id;
  const product: Product = {
    id: productId,
    title: 'Фильтрующий картридж серии FC PFE',
    description: 'Описание товара',
    price: 5550,
    oldPrice: null,
    images: [
      '/img/production-img-big.jpg',
      '/img/production-img-1.jpg',
      '/img/production-img-2.jpg',
      '/img/production-img-3.jpg',
      '/img/production-img-big.jpg',
      '/img/production-img-1.jpg',
      '/img/production-img-2.jpg',
    ],
    isNew: true,
    discount: false,
    inStock: true,
    specifications: {
      material: '...',
      application: '...',
    },
    options: {
      adapter: [
        { id: 'p222', name: 'P(222)', price: 0 },
        { id: 'p333', name: 'P(333)', price: 500 },
        { id: 'p444', name: 'P(444)', price: 1000 },
      ],
      height: [
        { id: 'h1', name: '1 дюйм', price: 0 },
        { id: 'h2', name: '2 дюйма', price: 200 },
        { id: 'h3', name: '3 дюйма', price: 400 },
      ],
      rating: [
        { id: 'r1', name: '1 мкм', price: 0 },
        { id: 'r2', name: '2 мкм', price: 300 },
        { id: 'r3', name: '3 мкм', price: 600 },
      ],
    },
    category: 'filters',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const recommendedProducts: Product[] = [
    {
      id: '1',
      title: 'Угольник 90 градусов с резьбой. 50мм',
      description: 'Описание товара',
      price: 3000,
      oldPrice: 4820,
      discount: true,
      images: ['/img/production-img-1.jpg'],
      category: 'fittings',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Фильтродержатель серии FH',
      description:
        'Надежные фильтродержатели для промышленного применения с высокими показателями герметичности.',
      price: 4500,
      oldPrice: 5200,
      discount: true,
      images: ['/img/production-img-2.jpg'],
      category: 'filters',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Фильтрационная установка FU-100',
      description:
        'Компактная фильтрационная установка для очистки жидкостей и газов в промышленных условиях.',
      price: 12500,
      oldPrice: null,
      discount: false,
      images: ['/img/production-img-3.jpg'],
      category: 'equipment',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '4',
      title: 'Фитинги для фильтрации FF-50',
      description:
        'Качественные фитинги для соединения фильтрационного оборудования различных типов.',
      price: 2800,
      oldPrice: 3500,
      discount: true,
      images: ['/img/production-img-3.jpg'],
      category: 'fittings',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  let selectedImage = 0;
  let quantity = 1;
  let selectedOptions = {
    adapter: 'p222',
    height: 'h1',
    rating: 'r1',
  };
  let imageModalOpen = false;

  // Загружаем сохраненные опции при монтировании компонента
  onMount(() => {
    const savedOptions = localStorage.getItem(`product_options_${productId}`);
    if (savedOptions) {
      try {
        const parsed = JSON.parse(savedOptions);
        selectedOptions = { ...selectedOptions, ...parsed };
      } catch (e) {}
    }
  });

  // Сохраняем опции при изменении
  $: {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`product_options_${productId}`, JSON.stringify(selectedOptions));
    }
  }

  function changeImage(index: number) {
    selectedImage = index;
  }

  function openImageModal() {
    imageModalOpen = true;
  }

  function closeImageModal() {
    imageModalOpen = false;
  }

  function increaseQuantity() {
    quantity++;
  }

  function decreaseQuantity() {
    if (quantity > 1) {
      quantity--;
    }
  }

  function updateQuantity(event: Event) {
    const value = parseInt((event.target as HTMLInputElement).value);
    if (value > 0) {
      quantity = value;
    }
  }

  // Реактивные переменные для расчета цены
  $: basePrice = product.price;
  $: selectedAdapter = product.options?.adapter?.find(opt => opt.id === selectedOptions.adapter);
  $: selectedHeight = product.options?.height?.find(opt => opt.id === selectedOptions.height);
  $: selectedRating = product.options?.rating?.find(opt => opt.id === selectedOptions.rating);
  $: optionsPrice =
    (selectedAdapter?.price || 0) + (selectedHeight?.price || 0) + (selectedRating?.price || 0);
  $: unitPrice = basePrice + optionsPrice;
  $: totalPrice = unitPrice * quantity;

  function calculateTotalPrice() {
    return totalPrice;
  }

  // Пока не используется - закомментировано  
  // function getPriceBreakdown() {
  //   return {
  //     basePrice: currentProduct?.price || 0,
  //     optionsPrice: 0,
  //     total: (currentProduct?.price || 0) + 0
  //   };
  // }

  function addToCart() {
    const cartItem: CartItem = {
      ...product,
      productId: product.id,
      quantity,
      selectedOptions: JSON.parse(JSON.stringify(selectedOptions)),
      totalPrice: calculateTotalPrice(),
    };

    cartActions.addItem(cartItem);
  }

  function resetOptions() {
    selectedOptions = {
      adapter: 'p222',
      height: 'h1',
      rating: 'r1',
    };
    quantity = 1;
    localStorage.removeItem(`product_options_${productId}`);
  }

  // SEO данные
  const seoData = {
    title: `${product.title} - Оборудование для микрофильтрации`,
    description: product.description,
    keywords: 'фильтрующий картридж, микрофильтрация, FC PFE, фильтрация',
    image: '/img/production-img-big.jpg',
    url: `/product/${productId}`,
    type: 'product',
  };

  // Хлебные крошки
  const breadcrumbs = [
    { name: 'Главная', url: '/' },
    { name: 'Каталог', url: '/catalog' },
    { name: 'Фильтроэлементы', url: '/catalog/filters' },
    { name: product.title, url: `/product/${productId}` },
  ];
</script>

<SEO
  title={seoData.title}
  description={seoData.description}
  keywords={seoData.keywords}
  image={seoData.image}
  url={seoData.url}
  type={seoData.type}
/>

<div class="container mx-auto px-4 py-8">
  <!-- Хлебные крошки -->
  <Breadcrumbs {breadcrumbs} />

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- Основная информация о товаре -->
    <div class="lg:col-span-2">
      <div class="bg-white rounded-lg shadow-md p-6">
        <!-- Заголовок -->
        <h1 class="text-2xl font-bold text-gray-900 mb-6">{product.title}</h1>

        <!-- Галерея изображений -->
        <div class="mb-8">
          <!-- Основное изображение -->
          <div class="relative mb-4">
            <button
              on:click={openImageModal}
              class="w-full h-96 relative block"
              aria-label="Увеличить изображение товара"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                class="w-full h-96 object-cover rounded-lg"
              />
            </button>

            <!-- Бейджи -->
            {#if product.isNew}
              <div
                class="absolute top-4 left-4 bg-green-600 text-white text-sm px-3 py-1 rounded-full"
              >
                Новинка!
              </div>
            {/if}
            {#if product.discount}
              <div
                class="absolute top-4 right-4 bg-red-600 text-white text-sm px-3 py-1 rounded-full"
              >
                Скидка!
              </div>
            {/if}

            <!-- Кнопка увеличения -->
            <button
              on:click={openImageModal}
              class="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              title="Увеличить изображение"
            >
              <Eye class="w-5 h-5 text-gray-700" />
            </button>
          </div>

          <!-- Миниатюры -->
          <div class="grid grid-cols-7 gap-2">
            {#each product.images as image, index}
              <button
                on:click={() => changeImage(index)}
                class="relative {selectedImage === index ? 'ring-2 ring-primary-500' : ''}"
              >
                <img
                  src={image}
                  alt="{product.title} - изображение {index + 1}"
                  class="w-full h-16 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                />
              </button>
            {/each}
          </div>
        </div>

        <!-- Описание -->
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Описание</h3>
            <p class="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {#if product.specifications}
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Фильтровальный материал</h3>
              <p class="text-gray-600">{product.specifications.material}</p>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Применение</h3>
              <p class="text-gray-600 leading-relaxed">{product.specifications.application}</p>
            </div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Боковая панель с покупкой -->
    <div class="lg:col-span-1">
      <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
        <!-- Цена -->
        <div class="mb-6">
          <div class="flex items-center justify-between mb-2">
            <span class="text-3xl font-bold text-gray-900">
              {totalPrice.toLocaleString()} ₽
            </span>
            {#if product.oldPrice}
              <span class="text-lg text-gray-400 line-through">
                {product.oldPrice.toLocaleString()} ₽
              </span>
            {/if}
          </div>

          <!-- Детализация цены -->
          <div class="bg-gray-50 rounded-lg p-3 mb-3">
            <div class="text-sm text-gray-600 space-y-1">
              <div class="flex justify-between">
                <span>Базовая цена:</span>
                <span>{basePrice.toLocaleString()} ₽</span>
              </div>

              {#if optionsPrice > 0}
                <div class="flex justify-between">
                  <span>Доплата за опции:</span>
                  <span>+{optionsPrice.toLocaleString()} ₽</span>
                </div>

                <!-- Детали опций -->
                <div class="ml-2 space-y-1 mt-1">
                  {#if selectedAdapter && selectedAdapter.price > 0}
                    <div class="flex justify-between text-xs">
                      <span>• {selectedAdapter.name}:</span>
                      <span>+{selectedAdapter.price.toLocaleString()} ₽</span>
                    </div>
                  {/if}
                  {#if selectedHeight && selectedHeight.price > 0}
                    <div class="flex justify-between text-xs">
                      <span>• {selectedHeight.name}:</span>
                      <span>+{selectedHeight.price.toLocaleString()} ₽</span>
                    </div>
                  {/if}
                  {#if selectedRating && selectedRating.price > 0}
                    <div class="flex justify-between text-xs">
                      <span>• {selectedRating.name}:</span>
                      <span>+{selectedRating.price.toLocaleString()} ₽</span>
                    </div>
                  {/if}
                </div>

                <div class="border-t border-gray-200 pt-1 mt-1">
                  <div class="flex justify-between font-medium">
                    <span>Цена за единицу:</span>
                    <span>{unitPrice.toLocaleString()} ₽</span>
                  </div>
                </div>
              {/if}

              {#if quantity > 1}
                <div class="border-t border-gray-200 pt-1 mt-1">
                  <div class="flex justify-between">
                    <span>Количество:</span>
                    <span>× {quantity}</span>
                  </div>
                  <div class="flex justify-between font-medium text-gray-900">
                    <span>Итого:</span>
                    <span>{totalPrice.toLocaleString()} ₽</span>
                  </div>
                </div>
              {/if}
            </div>
          </div>

          {#if !product.inStock}
            <span class="text-red-600 text-sm">Нет в наличии</span>
          {:else}
            <span class="text-green-600 text-sm">В наличии</span>
          {/if}
        </div>

        <!-- Опции товара -->
        <div class="space-y-4 mb-6">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Опции товара</h3>
            <button
              on:click={resetOptions}
              class="text-sm text-sky-600 hover:text-primary-700 underline"
              title="Сбросить к базовым опциям"
            >
              Сбросить
            </button>
          </div>

          <!-- Адаптер -->
          <div>
            <label for="adapter" class="block text-sm font-medium text-gray-700 mb-2">
              Адаптер:
            </label>
            {#if product.options?.adapter}
              <select
                id="adapter"
                bind:value={selectedOptions.adapter}
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
              >
                {#each product.options.adapter as option}
                  <option value={option.id}>
                    {option.name}
                    {option.price > 0 ? `(+${option.price} ₽)` : ''}
                  </option>
                {/each}
              </select>
            {/if}
          </div>

          <!-- Высота -->
          <div>
            <label for="height" class="block text-sm font-medium text-gray-700 mb-2">
              Высота (дюймы):
            </label>
            {#if product.options?.height}
              <select
                id="height"
                bind:value={selectedOptions.height}
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
              >
                {#each product.options.height as option}
                  <option value={option.id}>
                    {option.name}
                    {option.price > 0 ? `(+${option.price} ₽)` : ''}
                  </option>
                {/each}
              </select>
            {/if}
          </div>

          <!-- Рейтинг фильтрации -->
          <div>
            <label for="rating" class="block text-sm font-medium text-gray-700 mb-2">
              Рейтинг фильтрации:
            </label>
            {#if product.options?.rating}
              <select
                id="rating"
                bind:value={selectedOptions.rating}
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
              >
                {#each product.options.rating as option}
                  <option value={option.id}>
                    {option.name}
                    {option.price > 0 ? `(+${option.price} ₽)` : ''}
                  </option>
                {/each}
              </select>
            {/if}
          </div>
        </div>

        <!-- Количество -->
        <div class="mb-6">
          <label for="quantity" class="block text-sm font-medium text-gray-700 mb-2"
            >Количество:</label
          >
          <div class="flex items-center space-x-2">
            <button
              on:click={decreaseQuantity}
              class="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={quantity <= 1}
            >
              <Minus class="w-4 h-4" />
            </button>
            <input
              id="quantity"
              type="number"
              bind:value={quantity}
              on:input={updateQuantity}
              min="1"
              class="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
            />
            <button
              on:click={increaseQuantity}
              class="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Plus class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Кнопка покупки -->
        <button
          on:click={addToCart}
          disabled={!product.inStock}
          class="w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart class="w-5 h-5" />
          <span>Добавить в корзину</span>
        </button>

        <!-- Примечание -->
        <!-- <p class="text-sm text-gray-500 mt-4 text-center">
          * Под заказ, предоплата 50%
        </p> -->
      </div>
    </div>
  </div>

  <!-- Рекомендуемые товары -->
  <section class="mt-16">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-8">Рекомендуемые товары</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each recommendedProducts as product}
          <ProductCard {product} />
        {/each}
      </div>
    </div>
  </section>
</div>

<!-- Модальное окно изображения -->
{#if imageModalOpen}
  <div
    role="dialog"
    aria-modal="true"
    tabindex="0"
    class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
    on:click={closeImageModal}
    aria-label="Закрыть модальное окно"
    style="all: unset; display: flex; position: fixed; inset: 0; background: rgba(0,0,0,0.75); align-items: center; justify-content: center; z-index: 50; padding: 1rem;"
    on:keydown={e => {
      if (e.key === 'Escape' || e.key === 'Enter') closeImageModal();
    }}
  >
    <div
      class="relative max-w-4xl max-h-full"
      on:click|stopPropagation
      aria-labelledby="image-modal-title"
      aria-hidden="true"
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
        src={product.images[selectedImage]}
        alt={product.title}
        class="max-w-full max-h-full object-contain"
      />
    </div>
  </div>
{/if}
