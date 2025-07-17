<script lang="ts">
  // Mock data для фильтродержателей
  const filterHolders = [
    {
      id: 4,
      name: 'Фильтродержатель ФД-100',
      description: 'Корпус фильтра для промышленной фильтрации до 100 л/мин',
      price: '18 500 ₽',
      image: '/images/filtroderzhateli.png'
    },
    {
      id: 5,
      name: 'Фильтродержатель ФД-200',
      description: 'Высокопроизводительный корпус для больших объемов',
      price: '25 800 ₽',
      image: '/images/filtroderzhateli.png'
    },
    {
      id: 6,
      name: 'Фильтродержатель ФД-50',
      description: 'Компактный фильтродержатель для малых производств',
      price: '12 300 ₽',
      image: '/images/filtroderzhateli.png'
    }
  ];
</script>

<svelte:head>
  <title>Фильтродержатели | БМ ФИЛЬТР</title>
  <meta name="description" content="Каталог фильтродержателей БМ ФИЛЬТР - надежные корпуса для фильтрационных систем" />
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
        <li class="text-gray-900">Фильтродержатели</li>
      </ol>
    </nav>

    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Фильтродержатели</h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        Прочные и надежные корпуса фильтров для создания эффективных систем очистки. 
        Различные типоразмеры для любых производственных задач.
      </p>
    </div>

    <!-- Products Grid -->
    <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      {#each filterHolders as holder}
        <div class="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div class="aspect-w-1 aspect-h-1 bg-gray-200 overflow-hidden">
            <img
              src={holder.image}
              alt={holder.name}
              class="w-full h-64 object-cover object-center group-hover:opacity-75 transition-opacity"
            />
          </div>
          <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              <a href="/product/{holder.id}" class="hover:text-blue-600">
                {holder.name}
              </a>
            </h3>
            <p class="text-gray-600 text-sm mb-4">{holder.description}</p>
            <div class="flex items-center justify-between">
              <span class="text-lg font-bold text-blue-600">{holder.price}</span>
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
      <h2 class="text-2xl font-bold text-gray-900 mb-4">О фильтродержателях</h2>
      <div class="grid md:grid-cols-2 gap-8">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-3">Особенности</h3>
          <ul class="space-y-2 text-gray-600">
            <li>• Коррозионностойкие материалы</li>
            <li>• Простота обслуживания</li>
            <li>• Герметичность соединений</li>
            <li>• Различные типоразмеры</li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-3">Комплектация</h3>
          <ul class="space-y-2 text-gray-600">
            <li>• Корпус фильтра</li>
            <li>• Фланцы и крепления</li>
            <li>• Уплотнительные элементы</li>
            <li>• Техническая документация</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div> 