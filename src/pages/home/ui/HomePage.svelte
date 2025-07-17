<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { ProductList } from '@widgets/product-list';
  import { CallbackModal } from '@features/callback-modal';
  import type { Product } from '@shared/types';
  import { mockProducts } from '@shared/mocks/data';
  import { config } from '@shared/config';

  // Состояние страницы
  let products: Product[] = [];
  let loading = true;
  let callbackModalOpen = false;

  // Состояние модальных окон
  let selectedCertificate: { id: number; src: string; alt: string } | null = null;
  let showCertificateModal = false;
  let selectedCatalogImage: { src: string; alt: string; title: string; description: string } | null = null;
  let showCatalogModal = false;

  // Загрузка данных при монтировании
  onMount(async () => {
    try {
      // Имитация загрузки данных
      await new Promise(resolve => setTimeout(resolve, 1000));
      products = mockProducts.slice(0, 8); // Показываем только 8 продуктов на главной
    } catch (error) {
      console.error('Ошибка загрузки продуктов:', error);
    } finally {
      loading = false;
    }
  });

  function openCallbackModal() {
    callbackModalOpen = true;
  }

  function closeCallbackModal() {
    callbackModalOpen = false;
  }

  function openCertificateModal(index: number) {
    selectedCertificate = {
      id: index + 1,
      src: `/img/certificate-img-${index + 1}-big.jpg`,
      alt: `Сертификат ${index + 1}`
    };
    showCertificateModal = true;
  }

  function closeCertificateModal() {
    showCertificateModal = false;
    selectedCertificate = null;
  }

  function openCatalogModal(image: { src: string; alt: string; title: string; description: string }) {
    selectedCatalogImage = image;
    showCatalogModal = true;
  }

  function closeCatalogModal() {
    showCatalogModal = false;
    selectedCatalogImage = null;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      closeCertificateModal();
      closeCatalogModal();
    }
  }
  </script>

<svelte:window on:keydown={handleKeydown} />

<svelte:head>
  <title>{config.companyName} - Главная</title>
  <meta name="description" content="{config.description}" />
  <meta property="og:title" content="{config.companyName} - Главная" />
  <meta property="og:description" content="{config.description}" />
  <meta property="og:type" content="website" />
</svelte:head>

<!-- Hero Section -->
<section class="relative overflow-hidden py-10 md:py-16 lg:py-32">
  <div class="container mx-auto px-4 md:px-6 lg:px-8">
    <div class="grid gap-8 md:gap-12 lg:grid-cols-2 items-center">
      <!-- Text Content -->
      <div class="space-y-4 md:space-y-6 lg:space-y-8 text-center lg:text-left">
        <h1 class="text-2xl md:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
          Промышленные
          <span class="text-sky-600">Фильтры</span>
          Высшего Качества
        </h1>
        <p class="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
          Профессиональные решения для промышленной фильтрации. Широкий ассортимент фильтр-элементов
          и комплектующих для любых производственных задач.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
          <button
            on:click={() => goto('/catalog')}
            class="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold text-base md:text-lg transition-colors"
          >
            Каталог продукции
          </button>
          <button
            on:click|stopPropagation={openCallbackModal}
            class="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold text-base md:text-lg transition-colors"
          >
            Консультация
          </button>
        </div>
      </div>

      <!-- Hero Image Composition -->
      <div class="relative mt-8 lg:mt-0">
        <div
          class="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 transform rotate-1 md:rotate-2 hover:rotate-0 transition-transform duration-500"
        >
          <div
            class="bg-white p-2 md:p-4 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-rotate-2"
          >
            <img
              src="/images/mbp.jpg"
              alt="Фильтр элемент"
              class="w-full h-24 md:h-32 lg:h-40 object-contain rounded-lg transition-transform duration-300 hover:scale-110"
            />
          </div>
          <div
            class="bg-white p-2 md:p-4 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-300 transform translate-x-1 md:translate-x-2 hover:scale-105 hover:rotate-2"
          >
            <img
              src="/images/filtroderzhateli.png"
              alt="Фильтр держатели"
              class="w-full h-24 md:h-32 lg:h-40 object-contain rounded-lg transition-transform duration-300 hover:scale-110"
            />
          </div>
          <div
            class="bg-white p-2 md:p-4 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-rotate-1"
          >
            <img
              src="/images/filter1.jpg"
              alt="Промышленный фильтр"
              class="w-full h-24 md:h-32 lg:h-40 object-contain rounded-lg transition-transform duration-300 hover:scale-110"
            />
          </div>
          <div
            class="bg-white p-2 md:p-4 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-300 transform -translate-x-1 md:-translate-x-2 hover:scale-105 hover:rotate-1"
          >
            <img
              src="/images/i.webp"
              alt="Фильтр элемент"
              class="w-full h-24 md:h-32 lg:h-40 object-contain rounded-lg transition-transform duration-300 hover:scale-110"
            />
          </div>
          <div
            class="bg-white p-2 md:p-4 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:rotate-2"
          >
            <img
              src="/images/filter2.jpg"
              alt="Фильтр система"
              class="w-full h-24 md:h-32 lg:h-40 object-contain rounded-lg transition-transform duration-300 hover:scale-110"
            />
          </div>
          <div
            class="bg-white p-2 md:p-4 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-300 transform translate-x-1 hover:scale-105 hover:-rotate-1"
          >
            <img
              src="/images/filter3.jpg"
              alt="Фильтр элементы"
              class="w-full h-24 md:h-32 lg:h-40 object-contain rounded-lg transition-transform duration-300 hover:scale-110"
            />
          </div>
        </div>

        <!-- Floating elements -->
        <div
          class="absolute -top-2 -left-2 md:-top-4 md:-left-4 w-12 h-12 md:w-24 md:h-24 bg-sky-500 rounded-full opacity-20 animate-pulse"
        ></div>
        <div
          class="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 w-16 h-16 md:w-32 md:h-32 bg-sky-300 rounded-full opacity-20 animate-pulse"
          style="animation-delay: 1s;"
        ></div>
      </div>
    </div>
  </div>
</section>

<!-- About Section -->
<section class="py-16 bg-gray-50">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h2 class="text-3xl font-bold text-gray-900 mb-6">О компании</h2>
        <p class="text-gray-700 text-lg mb-4 leading-relaxed">
          ООО «БМ ФИЛЬТР» специализируется на производстве и поставке промышленных фильтров для различных отраслей производства.
        </p>
        <p class="text-gray-700 text-lg mb-6 leading-relaxed">
          Мы предлагаем качественные аналоги зарубежных фильтроэлементов PALL, Atlas Copco и других ведущих производителей, а также собственную линейку продукции.
        </p>
        <div class="grid grid-cols-2 gap-6">
          <div class="text-center">
            <div class="text-3xl font-bold text-sky-600 mb-2">2015</div>
            <div class="text-gray-600">Год основания</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-sky-600 mb-2">1000+</div>
            <div class="text-gray-600">Довольных клиентов</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-sky-600 mb-2">5000+</div>
            <div class="text-gray-600">Позиций в каталоге</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-sky-600 mb-2">24/7</div>
            <div class="text-gray-600">Техподдержка</div>
          </div>
        </div>
      </div>
      <div class="relative">
        <img 
          src="/img/production-img-big.jpg" 
          alt="Производство фильтров" 
          class="rounded-2xl shadow-2xl w-full h-auto"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
      </div>
    </div>
  </div>
</section>

<!-- Catalog Preview -->
<section class="py-16">
  <div class="container mx-auto px-4">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">Основные категории</h2>
      <p class="text-xl text-gray-600">Профессиональные решения для промышленной фильтрации</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <!-- Фильтроэлементы -->
      <div class="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
        <button 
          class="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden w-full"
          on:click={() => openCatalogModal({ 
            src: '/images/filtroelementy.jpg', 
            alt: 'Фильтроэлементы', 
            title: 'Фильтроэлементы', 
            description: 'Высококачественные фильтроэлементы для жидкостей и газов различных степеней очистки. Аналоги PALL, Atlas Copco.' 
          })}
          aria-label="Увеличить изображение фильтроэлементов"
        >
          <img 
            src="/images/filtroelementy.jpg" 
            alt="Фильтроэлементы" 
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div class="absolute bottom-4 left-4 text-white">
            <h3 class="text-xl font-bold mb-1">Фильтроэлементы</h3>
            <p class="text-sm opacity-90">Аналоги PALL, Atlas Copco</p>
          </div>
        </button>
        <div class="p-6">
          <p class="text-gray-600 mb-4">Высококачественные фильтроэлементы для жидкостей и газов различных степеней очистки.</p>
          <a href="/catalog/filtroelements" class="text-sky-600 hover:text-sky-700 font-semibold">
            Подробнее →
          </a>
        </div>
      </div>

      <!-- Фильтродержатели -->
      <div class="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
        <button 
          class="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden w-full"
          on:click={() => openCatalogModal({ 
            src: '/images/filtroderzhateli.png', 
            alt: 'Фильтродержатели', 
            title: 'Фильтродержатели', 
            description: 'Надежные корпуса для фильтроэлементов различных типов и размеров.' 
          })}
          aria-label="Увеличить изображение фильтродержателей"
        >
          <img 
            src="/images/filtroderzhateli.png" 
            alt="Фильтродержатели" 
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div class="absolute bottom-4 left-4 text-white">
            <h3 class="text-xl font-bold mb-1">Фильтродержатели</h3>
            <p class="text-sm opacity-90">Корпуса и держатели</p>
          </div>
        </button>
        <div class="p-6">
          <p class="text-gray-600 mb-4">Надежные корпуса для фильтроэлементов различных типов и размеров.</p>
          <a href="/catalog/filterholders" class="text-sky-600 hover:text-sky-700 font-semibold">
            Подробнее →
          </a>
        </div>
      </div>

      <!-- Дополнительное оборудование -->
      <div class="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
        <button 
          class="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden w-full"
          on:click={() => openCatalogModal({ 
            src: '/img/production-img-3.jpg', 
            alt: 'Дополнительное оборудование', 
            title: 'Дополнительное оборудование', 
            description: 'Сопутствующее оборудование: адаптеры, соединения, контрольно-измерительные приборы.' 
          })}
          aria-label="Увеличить изображение дополнительного оборудования"
        >
          <img 
            src="/img/production-img-3.jpg" 
            alt="Дополнительное оборудование" 
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div class="absolute bottom-4 left-4 text-white">
            <h3 class="text-xl font-bold mb-1">Оборудование</h3>
            <p class="text-sm opacity-90">Адаптеры и КИП</p>
          </div>
        </button>
        <div class="p-6">
          <p class="text-gray-600 mb-4">Сопутствующее оборудование: адаптеры, соединения, контрольно-измерительные приборы.</p>
          <a href="/catalog/equipment" class="text-sky-600 hover:text-sky-700 font-semibold">
            Подробнее →
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Products Section -->
<ProductList 
  {products} 
  {loading}
  title="Рекомендуемые товары"
  showViewAllButton={true}
  viewAllUrl="/catalog"
  columns={4}
/>

<!-- Certificates Section -->
<section class="py-16 bg-gray-50">
  <div class="container mx-auto px-4">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">Сертификаты качества</h2>
      <p class="text-xl text-gray-600">Наша продукция соответствует всем требованиям и стандартам качества</p>
    </div>
    
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {#each Array(5) as _, i}
        <button 
          class="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden w-full"
          on:click={() => openCertificateModal(i)}
          aria-label="Увеличить сертификат {i + 1}"
        >
          <div class="aspect-[3/4] bg-gray-100 relative">
            <img 
              src="/img/certificate-img-{i + 1}.jpg" 
              alt="Сертификат {i + 1}" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
          </div>
        </button>
      {/each}
    </div>
    
    <div class="text-center mt-8">
      <a 
        href="/certificates" 
        class="inline-flex items-center justify-center bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
      >
        📋 Все сертификаты
      </a>
    </div>
  </div>
</section>

<!-- Callback Modal -->
<CallbackModal isOpen={callbackModalOpen} on:close={closeCallbackModal} />

<!-- Certificate Modal -->
{#if showCertificateModal && selectedCertificate}
  <div
    class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
    on:click={closeCertificateModal}
    on:keydown={(e) => { if (e.key === 'Escape') closeCertificateModal(); }}
    role="dialog"
    aria-modal="true"
    aria-labelledby="certificate-modal-title"
    tabindex="0"
  >
    <div
      class="relative max-w-4xl max-h-full p-4"
      on:click|stopPropagation
      on:keydown|stopPropagation
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-modal-title"
      tabindex="0"
    >
      <button
        on:click={closeCertificateModal}
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
      <img
        id="certificate-modal-title"
        src={selectedCertificate.src}
        alt={selectedCertificate.alt}
        class="w-full h-auto rounded-lg shadow-lg max-h-[80vh] object-contain"
      />
      <div class="mt-4 text-center">
        <h3 class="text-white text-xl font-semibold">{selectedCertificate.alt}</h3>
        <p class="text-gray-300 mt-2">Нажмите для перехода к полной странице сертификатов</p>
      </div>
    </div>
  </div>
{/if}

<!-- Catalog Image Modal -->
{#if showCatalogModal && selectedCatalogImage}
  <div
    class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
    on:click={closeCatalogModal}
    on:keydown={(e) => { if (e.key === 'Escape') closeCatalogModal(); }}
    role="dialog"
    aria-modal="true"
    aria-labelledby="catalog-modal-title"
    tabindex="0"
  >
    <div
      class="relative max-w-4xl max-h-full p-4"
      on:click|stopPropagation
      on:keydown|stopPropagation
      role="dialog"
      aria-modal="true"
      aria-labelledby="catalog-modal-title"
      tabindex="0"
    >
      <button
        on:click={closeCatalogModal}
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
      <img
        id="catalog-modal-title"
        src={selectedCatalogImage.src}
        alt={selectedCatalogImage.alt}
        class="w-full h-auto rounded-lg shadow-lg max-h-[80vh] object-contain"
      />
      <div class="mt-4 text-center">
        <h3 class="text-white text-xl font-semibold">{selectedCatalogImage.title}</h3>
        <p class="text-gray-300 mt-2">{selectedCatalogImage.description}</p>
      </div>
    </div>
  </div>
{/if} 