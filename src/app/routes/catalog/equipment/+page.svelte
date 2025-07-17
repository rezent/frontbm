<script lang="ts">
  // Mock data для оборудования
  const equipment = [
    {
      id: 7,
      name: 'Фильтрационная установка ФУ-1000',
      description: 'Комплексная система фильтрации производительностью до 1000 л/ч',
      price: '125 000 ₽',
      image: '/img/production-img-big.jpg'
    },
    {
      id: 8,
      name: 'Фильтрационная установка ФУ-2000',
      description: 'Высокопроизводительная установка для крупных предприятий',
      price: '185 000 ₽',
      image: '/img/production-img-big.jpg'
    },
    {
      id: 9,
      name: 'Фильтрационная установка ФУ-500',
      description: 'Компактная установка для небольших производств',
      price: '85 000 ₽',
      image: '/img/production-img-big.jpg'
    }
  ];
</script>

<svelte:head>
  <title>Фильтрационное оборудование | БМ ФИЛЬТР</title>
  <meta name="description" content="Каталог фильтрационного оборудования БМ ФИЛЬТР - комплексные решения для промышленности" />
</svelte:head>

<div class="bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Breadcrumbs -->
    <nav class="flex mb-8" aria-label="Breadcrumb">
      <ol class="flex items-center space-x-4">
        <li>
          <a href="/" class="text-gray-400 hover:text-gray-500">Главная</a>
        </li>
        <li>
          <span class="text-gray-400">/</span>
        </li>
        <li>
          <a href="/catalog" class="text-gray-400 hover:text-gray-500">Каталог</a>
        </li>
        <li>
          <span class="text-gray-400">/</span>
        </li>
        <li class="text-gray-900">Оборудование</li>
      </ol>
    </nav>

    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Фильтрационное оборудование</h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        Комплексные фильтрационные установки и оборудование для промышленного применения. 
        Готовые решения под ключ для различных отраслей.
      </p>
    </div>

    <!-- Products Grid -->
    <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      {#each equipment as item}
        <div class="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div class="aspect-w-1 aspect-h-1 bg-gray-200 overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              class="w-full h-64 object-cover object-center group-hover:opacity-75 transition-opacity"
            />
          </div>
          <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              <a href="/product/{item.id}" class="hover:text-blue-600">
                {item.name}
              </a>
            </h3>
            <p class="text-gray-600 text-sm mb-4">{item.description}</p>
            <div class="flex items-center justify-between">
              <span class="text-lg font-bold text-blue-600">{item.price}</span>
              <button
                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Запросить КП
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Info Section -->
    <div class="mt-16 bg-gray-50 rounded-lg p-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">О фильтрационном оборудовании</h2>
      <div class="grid md:grid-cols-2 gap-8">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-3">Возможности</h3>
          <ul class="space-y-2 text-gray-600">
            <li>• Автоматизированная работа</li>
            <li>• Высокая производительность</li>
            <li>• Энергоэффективность</li>
            <li>• Модульная конструкция</li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-3">Сферы применения</h3>
          <ul class="space-y-2 text-gray-600">
            <li>• Химическая промышленность</li>
            <li>• Металлургия</li>
            <li>• Энергетика</li>
            <li>• Очистка сточных вод</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Contact Section -->
    <div class="mt-16 bg-blue-50 rounded-lg p-8 text-center">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Нужна консультация?</h2>
      <p class="text-gray-600 mb-6">
        Наши специалисты помогут подобрать оптимальное решение для ваших задач
      </p>
      <a
        href="/contacts"
        class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors inline-block"
      >
        Связаться с нами
      </a>
    </div>
  </div>
</div> 