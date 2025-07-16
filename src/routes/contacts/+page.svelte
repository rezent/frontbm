<script lang="ts">
  import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
  import { generateContactSchema } from '$lib/utils/seo';
  import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-svelte';
  import type { SiteInfo } from '$lib/utils/seo';

  export let data: any;
  $: ({ page } = data);

  const site: SiteInfo = {
    url: 'https://tradeof.ru',
    title: 'ООО «БМ ФИЛЬТР»',
    image: '/img/logo.png',
    description:
      'ООО «БМ ФИЛЬТР» - Российский производитель современных, качественных фильтроэлементов, фильтродержателей и фильтрационных установок для решения различных задач фильтрации и микрофильтрации.',
  };
  $: structuredData = generateContactSchema(site);
  $: jsonLd = JSON.stringify(structuredData);

  let formData = {
    name: '',
    email: '',
    phone: '',
    message: '',
  };
  let isSubmitting = false;
  let submitSuccess = false;
  function handleSubmit() {
    isSubmitting = true;
    setTimeout(() => {
      isSubmitting = false;
      submitSuccess = true;
      formData = { name: '', email: '', phone: '', message: '' };
    }, 1000);
  }
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

  <!-- Structured Data -->
  <script type="application/ld+json">
{@html jsonLd}
  </script>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <Breadcrumbs
    breadcrumbs={[
      { name: 'Главная', url: '/' },
      { name: 'Контакты', url: '/contacts' },
    ]}
  />

  <!-- Hero Section -->
  <div class="bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-lg p-8 mb-12">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="text-4xl md:text-5xl font-bold mb-6">Контакты</h1>
      <p class="text-xl md:text-2xl">
        Свяжитесь с нами для заказа продукции или получения консультации
      </p>
    </div>
  </div>

  <div class="max-w-6xl mx-auto">
    <div class="grid lg:grid-cols-2 gap-12">
      <!-- Contact Information -->
      <div>
        <h2 class="text-3xl font-bold text-gray-900 mb-8">Контактная информация</h2>

        <div class="space-y-8">
          <!-- Phone -->
          <div class="flex items-start">
            <div class="bg-primary-100 p-3 rounded-lg mr-4">
              <Phone class="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Телефон</h3>
              <div class="space-y-2">
                <div>
                  <a
                    href="tel:+78007008573"
                    class="text-lg text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    +7 (800) 700-85-73
                  </a>
                  <div class="text-sm text-gray-600">Бесплатный звонок по России</div>
                </div>
                <div>
                  <a
                    href="tel:+74957971337"
                    class="text-lg text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    +7 (495) 797-13-37
                  </a>
                  <div class="text-sm text-gray-600">Москва</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Email -->
          <div class="flex items-start">
            <div class="bg-primary-100 p-3 rounded-lg mr-4">
              <Mail class="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Email</h3>
              <a
                href="mailto:info@tradeof.ru"
                class="text-lg text-primary-600 hover:text-primary-700 font-semibold"
              >
                info@tradeof.ru
              </a>
              <div class="text-sm text-gray-600">Для заказов и консультаций</div>
            </div>
          </div>

          <!-- Address -->
          <div class="flex items-start">
            <div class="bg-primary-100 p-3 rounded-lg mr-4">
              <MapPin class="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Адрес</h3>
              <div class="text-lg text-gray-900">г. Обнинск, Россия</div>
              <div class="text-sm text-gray-600">Производство и офис</div>
            </div>
          </div>

          <!-- Working Hours -->
          <div class="flex items-start">
            <div class="bg-primary-100 p-3 rounded-lg mr-4">
              <Clock class="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Время работы</h3>
              <div class="space-y-1">
                <div class="flex justify-between">
                  <span>Понедельник - Пятница:</span>
                  <span class="font-semibold">9:00 - 18:00</span>
                </div>
                <div class="flex justify-between">
                  <span>Суббота:</span>
                  <span class="font-semibold">10:00 - 16:00</span>
                </div>
                <div class="flex justify-between">
                  <span>Воскресенье:</span>
                  <span class="font-semibold">Выходной</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Social Links -->
        <div class="mt-12">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Мы в социальных сетях</h3>
          <div class="flex space-x-4">
            <a
              href="https://vk.com/tradeof"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              VK
            </a>
            <a
              href="https://t.me/tradeof"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Telegram
            </a>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div>
        <h2 class="text-3xl font-bold text-gray-900 mb-8">Напишите нам</h2>

        {#if submitSuccess}
          <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.
          </div>
        {/if}

        <form on:submit|preventDefault={handleSubmit} class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
              Ваше имя *
            </label>
            <input
              type="text"
              id="name"
              bind:value={formData.name}
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
              placeholder="Введите ваше имя"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              bind:value={formData.email}
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
              Телефон
            </label>
            <input
              type="tel"
              id="phone"
              bind:value={formData.phone}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
              placeholder="+7 (999) 123-45-67"
            />
          </div>

          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
              Сообщение *
            </label>
            <textarea
              id="message"
              bind:value={formData.message}
              required
              rows="5"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
              placeholder="Опишите ваш вопрос или заказ..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            class="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {#if isSubmitting}
              <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Отправка...
            {:else}
              <Send class="w-5 h-5 mr-2" />
              Отправить сообщение
            {/if}
          </button>
        </form>
      </div>
    </div>

    <!-- Map Section -->
    <div class="mt-16">
      <h2 class="text-3xl font-bold text-gray-900 mb-8">Как нас найти</h2>
      <div class="bg-gray-100 rounded-lg p-8">
        <img
          src="/img/map.png"
          alt="Карта расположения ООО «БМ ФИЛЬТР»"
          class="w-full rounded-lg shadow-lg"
        />
        <div class="mt-4 text-center text-gray-600">
          <p>г. Обнинск, Россия</p>
          <p class="text-sm">Для получения точного адреса свяжитесь с нами</p>
        </div>
      </div>
    </div>
  </div>
</div>
