<script lang="ts">
  let email = '';
  let password = '';
  let confirmPassword = '';
  let name = '';
  
  function handleSubmit() {
    // TODO: Implement registration logic
    console.log('Registration form submitted');
  }
</script>

<svelte:head>
  <title>Регистрация | БМ ФИЛЬТР</title>
  <meta name="description" content="Регистрация нового пользователя в системе БМ ФИЛЬТР" />
</svelte:head>

<div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
      Создать аккаунт
    </h2>
    <p class="mt-2 text-center text-sm text-gray-600">
      Или
      <a href="/login" class="font-medium text-blue-600 hover:text-blue-500">
        войдите в существующий аккаунт
      </a>
    </p>
  </div>

  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form class="space-y-6" on:submit|preventDefault={handleSubmit}>
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">
            Полное имя
          </label>
          <div class="mt-1">
            <input
              id="name"
              name="name"
              type="text"
              required
              bind:value={name}
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Введите ваше имя"
            />
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email адрес
          </label>
          <div class="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              bind:value={email}
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Введите email"
            />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">
            Пароль
          </label>
          <div class="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="new-password"
              required
              bind:value={password}
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Введите пароль"
            />
          </div>
        </div>

        <div>
          <label for="confirm-password" class="block text-sm font-medium text-gray-700">
            Подтвердите пароль
          </label>
          <div class="mt-1">
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autocomplete="new-password"
              required
              bind:value={confirmPassword}
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Повторите пароль"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Зарегистрироваться
          </button>
        </div>
      </form>
    </div>
  </div>
</div> 