<script lang="ts">
  import { onMount } from 'svelte';
  import { ProductList } from '@widgets/product-list';
  import { Filter } from '@features/product-filter';
  import type { Product, FilterState } from '@shared/types';
  import { mockProducts } from '@shared/mocks/data';

  export const data = undefined; // Константа для внешних ссылок

  let products: Product[] = [];
  let filteredProducts: Product[] = [];
  let loading = true;
  let currentFilters: FilterState = {};

  onMount(async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      products = mockProducts;
      filteredProducts = products;
    } catch (error) {
      console.error('Ошибка загрузки каталога:', error);
    } finally {
      loading = false;
    }
  });

  function handleFilterChange(event: CustomEvent<FilterState>) {
    currentFilters = event.detail;
    applyFilters();
  }

  function applyFilters() {
    filteredProducts = products.filter(product => {
      // Применяем фильтры
      if (currentFilters.category && product.category !== currentFilters.category) {
        return false;
      }
      
      if (currentFilters.priceMin && product.price < currentFilters.priceMin) {
        return false;
      }
      
      if (currentFilters.priceMax && product.price > currentFilters.priceMax) {
        return false;
      }
      
      if (currentFilters.search && !product.title.toLowerCase().includes(currentFilters.search.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  }
</script>

<svelte:head>
  <title>Каталог продукции - БМ ФИЛЬТР</title>
  <meta name="description" content="Каталог промышленных фильтров, фильтроэлементов и фильтродержателей" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <div class="mb-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-4">Каталог продукции</h1>
    <p class="text-xl text-gray-600">
      Промышленные фильтры и комплектующие для любых задач
    </p>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
    <!-- Sidebar с фильтрами -->
    <aside class="lg:col-span-1">
      <Filter on:filterChange={handleFilterChange} />
    </aside>

    <!-- Основной контент -->
    <main class="lg:col-span-3">
      <div class="mb-6">
        <div class="flex items-center justify-between">
          <p class="text-gray-600">
            Найдено: {filteredProducts.length} из {products.length} товаров
          </p>
        </div>
      </div>

      <ProductList 
        products={filteredProducts}
        {loading}
        title=""
        showViewAllButton={false}
        columns={3}
      />
    </main>
  </div>
</div> 