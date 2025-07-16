<script lang="ts">
  import Filter from '$lib/components/Filter.svelte';
  import ProductCard from '$lib/components/ProductCard.svelte';
  import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
  import { ChevronRight, Grid, List } from 'lucide-svelte';
  import type { Product } from '$lib/types/api';

  export let data: any;
  $: ({ page } = data);

  // Мок-данные для товаров
  const products: Product[] = [
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
      title: 'Фильтроэлемент картриджный',
      description: 'Описание товара',
      price: 2250,
      images: ['/img/production-img-2.jpg'],
      category: 'filters',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Фильтродержатель стальной',
      description: 'Описание товара',
      price: 23000,
      images: ['/img/production-img-1.jpg'],
      category: 'holders',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '4',
      title: 'Фильтрационная установка',
      description: 'Описание товара',
      price: 2000,
      isNew: true,
      images: ['/img/production-img-3.jpg'],
      category: 'installations',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '5',
      title: 'Фитинг переходной',
      description: 'Описание товара',
      price: 700,
      images: ['/img/production-img-1.jpg'],
      category: 'fittings',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '6',
      title: 'Фильтроэлемент мешочный',
      description: 'Описание товара',
      price: 1500,
      images: ['/img/production-img-2.jpg'],
      category: 'filters',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ];

  let currentFilters = {};
  let viewMode = 'grid';
  let sortBy = 'name';
  let filteredProducts = products;

  function handleFilterChange(event: CustomEvent<any>) {
    currentFilters = event.detail;
    applyFilters();
  }
  function changeViewMode(mode: string) {
    viewMode = mode;
  }
  function changeSort(sort: string) {
    sortBy = sort;
    applyFilters();
  }
  function applyFilters() {
    filteredProducts = products.filter(product => true);
    filteredProducts.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }
  $: applyFilters();
</script>

<svelte:head>
  <!-- Page-specific SEO -->
  <title>{page.title}</title>
  <meta name="description" content={page.description} />
  <meta name="keywords" content={page.keywords} />
  
  <!-- Open Graph -->
  <meta property="og:title" content={page.title} />
  <meta property="og:description" content={page.description} />
  <meta property="og:image" content={`${page.url}${page.image}`} />
  <meta property="og:url" content={page.url} />
  <meta property="og:type" content={page.type} />
  
  <!-- Twitter -->
  <meta property="twitter:title" content={page.title} />
  <meta property="twitter:description" content={page.description} />
  <meta property="twitter:image" content={`${page.url}${page.image}`} />
  
  <!-- Canonical -->
  <link rel="canonical" href={page.url} />
  
  <!-- Structured Data for Catalog -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Каталог оборудования для микрофильтрации",
      "description": "{page.description}",
      "url": "{page.url}",
      "numberOfItems": 6,
      "itemListElement": [
        {
          "@type": "Product",
          "position": 1,
          "name": "Угольник 90 градусов с резьбой. 50мм",
          "url": "{page.url}/product/1",
          "image": "{page.url}/img/production-img-1.jpg",
          "description": "Представляют собой соединительные элементы, которые обеспечивают надежное соединение трубопроводов.",
          "offers": {
            "@type": "Offer",
            "price": "3000",
            "priceCurrency": "RUB",
            "availability": "https://schema.org/InStock"
          }
        },
        {
          "@type": "Product",
          "position": 2,
          "name": "Фильтроэлемент картриджный",
          "url": "{page.url}/product/2",
          "image": "{page.url}/img/production-img-2.jpg",
          "description": "Высокоэффективные фильтроэлементы для очистки жидкостей и газов.",
          "offers": {
            "@type": "Offer",
            "price": "2250",
            "priceCurrency": "RUB",
            "availability": "https://schema.org/InStock"
          }
        }
      ]
    }
  </script>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <!-- Breadcrumbs -->
  <Breadcrumbs breadcrumbs={[
    { name: 'Главная', url: '/' },
    { name: 'Каталог', url: '/catalog' }
  ]} />

  <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
    <!-- Sidebar -->
    <aside class="lg:col-span-1">
      <Filter on:filterChange={handleFilterChange} />
    </aside>
    
    <!-- Main Content -->
    <main class="lg:col-span-3">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Каталог товаров</h1>
          <p class="text-gray-600 mt-2">Найдено товаров: {filteredProducts.length}</p>
        </div>
        
        <div class="flex items-center space-x-4">
          <!-- Sort -->
          <select
            bind:value={sortBy}
            on:change={() => changeSort(sortBy)}
            class="w-auto px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
          >
            <option value="name">По названию</option>
            <option value="price">По цене</option>
            <option value="date">По дате</option>
          </select>
          
          <!-- View Mode -->
          <div class="flex border border-gray-300 rounded-lg">
            <button
              on:click={() => changeViewMode('grid')}
                                class="p-2 {viewMode === 'grid' ? 'bg-gray-600 text-white' : 'text-gray-600 hover:bg-gray-100'} rounded-l-lg transition-colors"
              title="Сетка"
            >
              <Grid class="w-5 h-5" />
            </button>
            <button
              on:click={() => changeViewMode('list')}
                                class="p-2 {viewMode === 'list' ? 'bg-gray-600 text-white' : 'text-gray-600 hover:bg-gray-100'} rounded-r-lg transition-colors"
              title="Список"
            >
              <List class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      <!-- Products Grid -->
      {#if viewMode === 'grid'}
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {#each filteredProducts as product}
            <ProductCard {product} />
          {/each}
        </div>
      {:else}
        <!-- Products List -->
        <div class="space-y-4">
          {#each filteredProducts as product}
            <div class="bg-white rounded-lg shadow-md p-6">
              <div class="flex items-center space-x-6">
                <img
                  src={product.images?.[0]}
                  alt={product.title}
                  class="w-24 h-24 object-cover rounded-lg"
                />
                <div class="flex-1">
                  <h3 class="text-xl font-semibold text-gray-900 mb-2">
                    <a href={`/product/${product.id}`} class="hover:text-gray-600 transition-colors">
                      {product.title}
                    </a>
                  </h3>
                  <p class="text-gray-600 mb-3">{product.description}</p>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                      {#if product.oldPrice}
                        <span class="text-gray-400 line-through">
                          {product.oldPrice.toLocaleString()} руб.
                        </span>
                      {/if}
                      <span class="text-2xl font-bold text-gray-900">
                        {product.price.toLocaleString()} руб.
                      </span>
                    </div>
                    <button class="btn-primary">
                      В корзину
                    </button>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      {/if}
      
      <!-- Empty State -->
      {#if filteredProducts.length === 0}
        <div class="text-center py-12">
          <div class="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Товары не найдены</h2>
          <p class="text-gray-600 mb-8">Попробуйте изменить параметры фильтрации</p>
          <button
            on:click={() => currentFilters = {}}
            class="btn-primary"
          >
            Сбросить фильтры
          </button>
        </div>
      {/if}
    </main>
  </div>
</div> 