<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  $: status = $page.status;
  $: error = $page.error;

  function goHome() {
    goto('/');
  }

  function goBack() {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
    } else {
      goto('/');
    }
  }
</script>

<svelte:head>
  <title>Ошибка {status} | ООО «БМ ФИЛЬТР»</title>
  <meta name="description" content="Страница ошибки {status}" />
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="flex items-center justify-center px-4 py-8 relative overflow-hidden">


  <div class="max-w-2xl mx-auto text-center relative z-10">
    <!-- Иконка и анимация -->
    <div class="mb-8 relative">
      <div class="inline-flex items-center justify-center w-32 h-32 mx-auto mb-6 rounded-full bg-white shadow-2xl border border-gray-200 relative">
        <!-- Пульсирующее кольцо -->
        <div class="absolute inset-0 rounded-full bg-sky-400 opacity-20 animate-ping"></div>
        <div class="absolute inset-2 rounded-full bg-sky-300 opacity-30 animate-ping animation-delay-200"></div>
        
        <span class="text-5xl relative z-10">
          {#if status === 404}
            🔍
          {:else if status === 403}
            🔒
          {:else if status === 500}
            ⚠️
          {:else if status === 503}
            🔧
          {:else}
            ❌
          {/if}
        </span>
      </div>
    </div>

    <!-- Код ошибки с градиентным текстом -->
    <div class="mb-8">
      <h1 class="text-6xl md:text-8xl lg:text-9xl font-black mb-4 bg-gradient-to-r from-sky-600 via-sky-600 to-sky-800 bg-clip-text text-transparent leading-none tracking-tight">
        {status}
      </h1>
      <h2 class="text-2xl md:text-3xl font-bold text-slate-700 mb-2">
        {#if status === 404}
          Страница не найдена
        {:else if status === 403}
          Доступ запрещён
        {:else if status === 500}
          Ошибка сервера
        {:else if status === 503}
          Сервис недоступен
        {:else}
          Что-то пошло не так
        {/if}
      </h2>
      <div class="w-24 h-1 bg-gradient-to-r from-sky-500 to-sky-500 mx-auto rounded-full"></div>
    </div>

    <!-- Описание ошибки -->
    <div class="mb-10">
      <p class="text-lg md:text-xl text-slate-600 mb-6 leading-relaxed max-w-lg mx-auto">
        {#if status === 404}
          К сожалению, запрашиваемая страница не существует или была перемещена. Возможно, вы перешли по устаревшей ссылке.
        {:else if status === 403}
          У вас нет необходимых прав для просмотра этой страницы. Обратитесь к администратору для получения доступа.
        {:else if status === 500}
          Произошла внутренняя ошибка сервера. Наша команда уже работает над устранением проблемы. Попробуйте позже.
        {:else if status === 503}
          Сервис временно недоступен из-за технических работ. Мы скоро вернёмся в строй!
        {:else}
          Произошла неожиданная ошибка. Попробуйте обновить страницу или вернуться позже.
        {/if}
      </p>
    </div>

    <!-- Кнопки действий -->
    <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
      <!-- Кнопка "Назад" -->
      <button
        on:click={goBack}
        class="group inline-flex items-center justify-center px-8 py-4 border-2 border-slate-300 rounded-xl text-slate-700 bg-white/80 backdrop-blur-sm hover:bg-white hover:border-slate-400 hover:shadow-lg transition-all duration-300 font-semibold text-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400"
      >
        <span class="mr-3 group-hover:-translate-x-1 transition-transform duration-300">←</span>
        Назад
      </button>

      <!-- Кнопка "На главную" -->
      <button
        on:click={goHome}
        class="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-sky-600 to-sky-600 hover:from-sky-700 hover:to-sky-700 text-white rounded-xl transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transform"
      >
        На главную
      </button>
    </div>

  </div>
</div>

<style>
  .animation-delay-200 {
    animation-delay: 200ms;
  }
</style> 