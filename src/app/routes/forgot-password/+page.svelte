<script lang="ts">
  import { goto } from '$app/navigation';
  
  let email = '';
  let loading = false;
  let success = false;
  let error = '';

  async function handleSubmit() {
    if (!email) {
      error = 'Введите email адрес';
      return;
    }

    if (!isValidEmail(email)) {
      error = 'Введите корректный email адрес';
      return;
    }

    loading = true;
    error = '';

    try {
      // Имитация отправки запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      success = true;
    } catch (err) {
      error = 'Произошла ошибка. Попробуйте еще раз.';
    } finally {
      loading = false;
    }
  }

  function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
</script>

<svelte:head>
  <title>Восстановление пароля - Микрофильтрация</title>
  <meta name="description" content="Восстановление пароля для доступа к личному кабинету" />
</svelte:head>

<div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <div class="text-center">
      <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
        Восстановление пароля
      </h2>
      <p class="mt-2 text-sm text-gray-600">
        Введите ваш email адрес для получения ссылки на восстановление пароля
      </p>
    </div>
  </div>

  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      {#if success}
        <div class="bg-green-50 border border-green-200 rounded-md p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-green-800">
                Письмо отправлено
              </h3>
              <div class="mt-2 text-sm text-green-700">
                <p>Мы отправили инструкции по восстановлению пароля на ваш email адрес.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6">
          <button
            type="button"
            on:click={() => goto('/login')}
            class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Вернуться к входу
          </button>
        </div>
      {:else}
        <form on:submit|preventDefault={handleSubmit} class="space-y-6">
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
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                placeholder="Введите ваш email"
              />
            </div>
          </div>

          {#if error}
            <div class="bg-red-50 border border-red-200 rounded-md p-4">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-red-800">
                    Ошибка
                  </h3>
                  <div class="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          {/if}

          <div>
            <button
              type="submit"
              disabled={loading}
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {#if loading}
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Отправка...
              {:else}
                Отправить инструкции
              {/if}
            </button>
          </div>

          <div class="text-center">
            <button
              type="button"
              on:click={() => goto('/login')}
              class="text-sm text-sky-600 hover:text-sky-500"
            >
              Вернуться к входу
            </button>
          </div>
        </form>
      {/if}
    </div>
  </div>
</div> 