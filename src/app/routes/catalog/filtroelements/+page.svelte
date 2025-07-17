<script lang="ts">
  // Mock data для фильтроэлементов
  const filtroElements = [
    {
      id: 1,
      name: 'Фильтроэлемент ФЭ-1',
      description: 'Высокоэффективный фильтроэлемент для тонкой очистки',
      price: '5 800 ₽',
      image: '/images/filter1.jpg'
    },
    {
      id: 2,
      name: 'Фильтроэлемент ФЭ-2',
      description: 'Фильтроэлемент для грубой очистки промышленных жидкостей',
      price: '4 200 ₽',
      image: '/images/filter2.jpg'
    },
    {
      id: 3,
      name: 'Фильтроэлемент ФЭ-3',
      description: 'Специализированный элемент для химической промышленности',
      price: '7 500 ₽',
      image: '/images/filter3.jpg'
    }
  ];
</script>

<svelte:head>
  <title>Фильтроэлементы | БМ ФИЛЬТР</title>
  <meta name="description" content="Каталог фильтроэлементов от БМ ФИЛЬТР - высокое качество и надежность" />
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
        <li class="text-gray-900">Фильтроэлементы</li>
      </ol>
    </nav>

    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Фильтроэлементы</h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        Высококачественные фильтроэлементы для различных сфер применения. 
        Обеспечивают надежную очистку и длительный срок службы.
      </p>
    </div>

    <!-- Products Grid -->
    <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      {#each filtroElements as element}
        <div class="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div class="aspect-w-1 aspect-h-1 bg-gray-200 overflow-hidden">
            <img
              src={element.image}
              alt={element.name}
              class="w-full h-64 object-cover object-center group-hover:opacity-75 transition-opacity"
            />
          </div>
          <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              <a href="/product/{element.id}" class="hover:text-blue-600">
                {element.name}
              </a>
            </h3>
            <p class="text-gray-600 text-sm mb-4">{element.description}</p>
            <div class="flex items-center justify-between">
              <span class="text-lg font-bold text-blue-600">{element.price}</span>
              <button
                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                В корзину
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Info Section -->
    <div class="mt-16 bg-gray-50 rounded-lg p-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">О фильтроэлементах</h2>
      <div class="grid md:grid-cols-2 gap-8">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-3">Преимущества</h3>
          <ul class="space-y-2 text-gray-600">
            <li>• Высокая степень очистки</li>
            <li>• Длительный срок службы</li>
            <li>• Устойчивость к химическим воздействиям</li>
            <li>• Широкий диапазон рабочих температур</li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-3">Применение</h3>
          <ul class="space-y-2 text-gray-600">
            <li>• Химическая промышленность</li>
            <li>• Пищевая индустрия</li>
            <li>• Нефтехимия</li>
            <li>• Водоподготовка</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div> 