<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import type { Product } from '@shared/types';
  import { mockProducts } from '@shared/mocks/data';
  import { Heart, ShoppingCart, Trash2, Search } from 'lucide-svelte';

  let favorites: Product[] = [];
  let loading = true;
  let searchQuery = '';
  let filteredFavorites: Product[] = [];

  // Загрузка избранного при монтировании
  onMount(() => {
    loadFavorites();
  });

  async function loadFavorites() {
    try {
      // Имитация загрузки избранного из localStorage или API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Берем несколько товаров как избранные для демонстрации
      favorites = mockProducts.slice(0, 6);
      filteredFavorites = favorites;
    } catch (error) {
      console.error('Ошибка загрузки избранного:', error);
    } finally {
      loading = false;
    }
  }

  // Поиск по избранному
  $: {
    if (searchQuery.trim()) {
      filteredFavorites = favorites.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      filteredFavorites = favorites;
    }
  }

  function removeFromFavorites(productId: string | number) {
    favorites = favorites.filter(p => p.id !== productId);
    filteredFavorites = filteredFavorites.filter(p => p.id !== productId);
  }

  function addToCart(product: Product) {
    // Логика добавления в корзину
    console.log('Добавлено в корзину:', product.title);
    // Здесь можно добавить уведомление пользователю
  }

  function viewProduct(productId: string | number) {
    goto(`/product/${productId}`);
  }
</script>

<svelte:head>
  <title>Избранное - Микрофильтрация</title>
  <meta name="description" content="Избранные товары - оборудование для микрофильтрации" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <!-- Заголовок страницы -->
  <div class="flex items-center gap-3 mb-8">
    <Heart class="w-8 h-8 text-red-500" />
    <h1 class="text-3xl font-bold text-gray-900">Избранное</h1>
  </div>

  {#if loading}
    <!-- Loader -->
    <div class="flex justify-center items-center min-h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
    </div>
  {:else if favorites.length === 0}
    <!-- Пустое избранное -->
    <div class="text-center py-16">
      <Heart class="w-24 h-24 text-gray-300 mx-auto mb-6" />
      <h2 class="text-2xl font-semibold text-gray-600 mb-4">Ваше избранное пусто</h2>
      <p class="text-gray-500 mb-8 max-w-md mx-auto">
        Добавляйте товары в избранное, чтобы не потерять их и легко найти позже
      </p>
      <button
        on:click={() => goto('/catalog')}
        class="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
      >
        Перейти в каталог
      </button>
    </div>
  {:else}
    <!-- Поиск -->
    <div class="mb-8">
      <div class="relative max-w-md">
        <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Поиск в избранном..."
          bind:value={searchQuery}
          class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
        />
      </div>
    </div>

    <!-- Статистика -->
    <div class="bg-gray-50 rounded-lg p-4 mb-8">
      <div class="flex flex-wrap gap-6 text-sm text-gray-600">
        <span>Всего в избранном: <strong class="text-gray-900">{favorites.length}</strong></span>
        <span>Показано: <strong class="text-gray-900">{filteredFavorites.length}</strong></span>
      </div>
    </div>

    {#if filteredFavorites.length === 0}
      <!-- Результаты поиска не найдены -->
      <div class="text-center py-12">
        <Search class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-gray-600 mb-2">Ничего не найдено</h3>
        <p class="text-gray-500">Попробуйте изменить поисковый запрос</p>
      </div>
    {:else}
      <!-- Список избранных товаров -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each filteredFavorites as product (product.id)}
          <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <!-- Изображение товара -->
            <div class="relative">
              <button
                on:click={() => viewProduct(product.id)}
                class="w-full h-48 overflow-hidden rounded-t-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
                aria-label="Открыть карточку товара {product.title}"
              >
                <img
                  src={product.images[0]}
                  alt={product.title}
                  class="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </button>
              <!-- Кнопка удаления из избранного -->
              <button
                on:click={() => removeFromFavorites(product.id)}
                class="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors group"
                aria-label="Удалить из избранного"
              >
                <Trash2 class="w-4 h-4 text-gray-500 group-hover:text-red-500" />
              </button>
            </div>

            <!-- Информация о товаре -->
            <div class="p-4">
              <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">{product.title}</h3>
              <p class="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
              
              <!-- Цена -->
              <div class="flex items-center justify-between mb-4">
                <span class="text-xl font-bold text-sky-600">{product.price.toLocaleString()} ₽</span>
                {#if product.oldPrice}
                  <span class="text-sm text-gray-500 line-through">{product.oldPrice.toLocaleString()} ₽</span>
                {/if}
              </div>

              <!-- Действия -->
              <div class="flex gap-2">
                <button
                  on:click={() => addToCart(product)}
                  class="flex-1 flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  <ShoppingCart class="w-4 h-4" />
                  В корзину
                </button>
                <button
                  on:click={() => viewProduct(product.id)}
                  class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Подробнее
                </button>
              </div>
            </div>
          </div>
        {/each}
      </div>

      <!-- Действия внизу страницы -->
      <div class="mt-12 text-center">
        <div class="flex flex-wrap justify-center gap-4">
          <button
            on:click={() => goto('/catalog')}
            class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Продолжить покупки
          </button>
          <button
            on:click={() => {
              // Добавить все избранное в корзину
              filteredFavorites.forEach(product => addToCart(product));
            }}
            class="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Добавить все в корзину
          </button>
        </div>
      </div>
    {/if}
  {/if}
</div>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style> 