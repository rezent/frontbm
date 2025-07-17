<script lang="ts">
  // Mock user data - в реальном приложении это будет из store/API
  const user = {
    name: 'Пользователь',
    email: 'user@example.com',
    phone: '+7 (999) 123-45-67',
    company: 'ООО "Пример"',
    position: 'Менеджер по закупкам'
  };
</script>

<svelte:head>
  <title>Профиль пользователя | БМ ФИЛЬТР</title>
  <meta name="description" content="Личный кабинет пользователя БМ ФИЛЬТР" />
</svelte:head>

<div class="min-h-screen bg-gray-50 py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <!-- Header -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="h-20 w-20 rounded-full bg-blue-500 flex items-center justify-center">
                <span class="text-2xl font-semibold text-white">
                  {user.name.charAt(0)}
                </span>
              </div>
            </div>
            <div class="ml-5">
              <h1 class="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p class="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- User Info -->
      <div class="mt-6 bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Личная информация</h2>
          
          <dl class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt class="text-sm font-medium text-gray-500">Полное имя</dt>
              <dd class="mt-1 text-sm text-gray-900">{user.name}</dd>
            </div>
            
            <div>
              <dt class="text-sm font-medium text-gray-500">Email</dt>
              <dd class="mt-1 text-sm text-gray-900">{user.email}</dd>
            </div>
            
            <div>
              <dt class="text-sm font-medium text-gray-500">Телефон</dt>
              <dd class="mt-1 text-sm text-gray-900">{user.phone}</dd>
            </div>
            
            <div>
              <dt class="text-sm font-medium text-gray-500">Компания</dt>
              <dd class="mt-1 text-sm text-gray-900">{user.company}</dd>
            </div>
            
            <div class="sm:col-span-2">
              <dt class="text-sm font-medium text-gray-500">Должность</dt>
              <dd class="mt-1 text-sm text-gray-900">{user.position}</dd>
            </div>
          </dl>

          <div class="mt-6">
            <button
              type="button"
              class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md text-sm"
            >
              Редактировать профиль
            </button>
          </div>
        </div>
      </div>

      <!-- Orders -->
      <div class="mt-6 bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Мои заказы</h2>
          <p class="text-gray-500 text-sm">У вас пока нет заказов.</p>
          <div class="mt-4">
            <a
              href="/catalog"
              class="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md text-sm inline-block"
            >
              Перейти к каталогу
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> 