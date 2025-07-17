<script lang="ts">
  import type { FilterState } from '@shared/types';
  import { createEventDispatcher } from 'svelte';

  export let filters: FilterState = {};
  
  const dispatch = createEventDispatcher<{
    filterChange: FilterState;
  }>();

  let localFilters = { ...filters };

  function updateFilters() {
    dispatch('filterChange', localFilters);
  }

  function resetFilters() {
    localFilters = {};
    updateFilters();
  }
</script>

<div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
  <div class="flex items-center justify-between mb-4">
    <h3 class="text-lg font-semibold text-gray-900">Фильтры</h3>
    <button 
      on:click={resetFilters}
      class="text-sm text-blue-600 hover:text-blue-800"
    >
      Сбросить
    </button>
  </div>

  <div class="space-y-4">
    <!-- Поиск -->
    <div>
      <label for="search" class="block text-sm font-medium text-gray-700 mb-1">
        Поиск
      </label>
      <input
        id="search"
        type="text"
        bind:value={localFilters.search}
        on:input={updateFilters}
        placeholder="Введите название товара..."
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>

    <!-- Категория -->
    <div>
      <label for="category" class="block text-sm font-medium text-gray-700 mb-1">
        Категория
      </label>
      <select
        id="category"
        bind:value={localFilters.category}
        on:change={updateFilters}
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">Все категории</option>
        <option value="Картриджи">Картриджи</option>
        <option value="Системы фильтрации">Системы фильтрации</option>
        <option value="Мембраны">Мембраны</option>
        <option value="Держатели">Держатели</option>
        <option value="Элементы">Элементы</option>
        <option value="Комплекты">Комплекты</option>
      </select>
    </div>

    <!-- Цена -->
    <div>
      <span class="block text-sm font-medium text-gray-700 mb-2">
        Цена, руб.
      </span>
      <div class="grid grid-cols-2 gap-2">
        <input
          type="number"
          bind:value={localFilters.priceMin}
          on:input={updateFilters}
          placeholder="От"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="number"
          bind:value={localFilters.priceMax}
          on:input={updateFilters}
          placeholder="До"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>

    <!-- В наличии -->
    <div class="flex items-center">
      <input
        id="inStock"
        type="checkbox"
        bind:checked={localFilters.inStock}
        on:change={updateFilters}
        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
      <label for="inStock" class="ml-2 text-sm text-gray-700">
        Только в наличии
      </label>
    </div>

    <!-- Сортировка -->
    <div>
      <label for="sort" class="block text-sm font-medium text-gray-700 mb-1">
        Сортировать по
      </label>
      <select
        id="sort"
        bind:value={localFilters.sortBy}
        on:change={updateFilters}
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">По умолчанию</option>
        <option value="name">По названию</option>
        <option value="price">По цене</option>
        <option value="newest">Сначала новые</option>
      </select>
    </div>

    <!-- Порядок сортировки -->
    {#if localFilters.sortBy}
      <div>
        <label for="sortOrder" class="block text-sm font-medium text-gray-700 mb-1">
          Порядок
        </label>
        <select
          id="sortOrder"
          bind:value={localFilters.sortOrder}
          on:change={updateFilters}
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="asc">По возрастанию</option>
          <option value="desc">По убыванию</option>
        </select>
      </div>
    {/if}
  </div>
</div> 