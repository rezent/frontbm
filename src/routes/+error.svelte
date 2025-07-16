<script>
  export let error;
  export let status;

  let title = 'Ошибка';
  let message = error?.message || 'Что-то пошло не так.';
  let illustration = '/img/main-header-img.png';

  // Универсальная проверка на 404
  const is404 = status === 404 || (error?.message && /not found|не найдено|не найдена|не найден|undefined/i.test(error.message));

  if (is404) {
    status = 404;
    title = 'Страница не найдена';
    message = 'Извините, такой страницы не существует или она была удалена.';
    illustration = '/img/404.svg';
  } else if (status === 500) {
    title = 'Внутренняя ошибка сервера';
    message = 'На сервере произошла ошибка. Мы уже работаем над её устранением.';
    illustration = '/img/500.svg';
  }
</script>

<svelte:head>
  <title>{status} — {title}</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-16">
  <div class="max-w-lg w-full text-center">
    <img src={illustration} alt={title} class="mx-auto mb-8 w-48 h-48 object-contain opacity-80" on:error={() => illustration = '/img/logo.png'} />
    <h1 class="text-6xl font-extrabold text-primary-600 mb-4">{status}</h1>
    <h2 class="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
    <p class="text-gray-600 mb-8">{message}</p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="/" class="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold">На главную</a>
      <a href="/catalog" class="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold">В каталог</a>
    </div>
    <div class="mt-8 text-gray-400 text-xs">
      Если вы считаете, что это ошибка сайта, <a href="/contacts" class="underline hover:text-primary-600">напишите нам</a>.
    </div>
  </div>
</div> 