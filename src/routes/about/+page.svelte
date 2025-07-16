<script lang="ts">
  import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
  import { generateOrganizationSchema } from '$lib/utils/seo';
  import { Users, Award, Truck, Clock, Shield, MapPin, Phone, Mail } from 'lucide-svelte';
  import type { SiteInfo } from '$lib/utils/seo';

  export let data: any;
  $: ({ page } = data);

  const site: SiteInfo = {
    url: 'https://tradeof.ru',
    title: 'ООО «БМ ФИЛЬТР»',
    image: '/img/logo.png',
    description: 'ООО «БМ ФИЛЬТР» - Российский производитель современных, качественных фильтроэлементов, фильтродержателей и фильтрационных установок для решения различных задач фильтрации и микрофильтрации.'
  };
  $: structuredData = generateOrganizationSchema(site);
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
    {JSON.stringify(structuredData)}
  </script>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <Breadcrumbs breadcrumbs={[
    { name: 'Главная', url: '/' },
    { name: 'О компании', url: '/about' }
  ]} />
  <!-- Hero Section -->
  <div class="bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-lg p-8 mb-12">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="text-4xl md:text-5xl font-bold mb-6">О компании</h1>
      <p class="text-xl md:text-2xl mb-8">
        ООО «БМ ФИЛЬТР» - ведущий российский производитель оборудования для микрофильтрации
      </p>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="text-center">
          <div class="text-3xl font-bold mb-2">10+</div>
          <div class="text-sm">Лет на рынке</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold mb-2">1000+</div>
          <div class="text-sm">Довольных клиентов</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold mb-2">50+</div>
          <div class="text-sm">Видов продукции</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold mb-2">24/7</div>
          <div class="text-sm">Поддержка</div>
        </div>
      </div>
    </div>
  </div>

  <!-- About Content -->
  <div class="max-w-4xl mx-auto">
    <!-- Company Description -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold text-gray-900 mb-8">О нас</h2>
      <div class="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <p class="text-lg text-gray-700 mb-6">
            ООО «БМ ФИЛЬТР» - российский производитель современных, качественных фильтроэлементов, 
            фильтродержателей и фильтрационных установок для решения различных задач фильтрации и микрофильтрации.
          </p>
          <p class="text-lg text-gray-700 mb-6">
            Мы специализируемся на производстве оборудования для очистки жидкостей и газов, 
            используя передовые технологии и материалы. Наша продукция применяется в различных 
            отраслях промышленности: пищевой, химической, фармацевтической и других.
          </p>
          <p class="text-lg text-gray-700">
            Компания имеет собственное производство в городе Обнинск, что позволяет нам 
            контролировать качество на всех этапах производства и предлагать конкурентные цены.
          </p>
        </div>
        <div class="relative">
          <img 
            src="/img/production-img-big.jpg" 
            alt="Производство фильтрационного оборудования" 
            class="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>

    <!-- Advantages -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold text-gray-900 mb-8">Наши преимущества</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div class="flex items-center mb-4">
            <Award class="w-8 h-8 text-primary-600 mr-3" />
            <h3 class="text-xl font-semibold text-gray-900">Качество</h3>
          </div>
          <p class="text-gray-700">
            Вся продукция сертифицирована и соответствует международным стандартам качества
          </p>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div class="flex items-center mb-4">
            <Truck class="w-8 h-8 text-primary-600 mr-3" />
            <h3 class="text-xl font-semibold text-gray-900">Доставка</h3>
          </div>
          <p class="text-gray-700">
            Быстрая доставка по всей России с возможностью отслеживания груза
          </p>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div class="flex items-center mb-4">
            <Clock class="w-8 h-8 text-primary-600 mr-3" />
            <h3 class="text-xl font-semibold text-gray-900">Сроки</h3>
          </div>
          <p class="text-gray-700">
            Изготовление продукции в кратчайшие сроки с учетом ваших требований
          </p>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div class="flex items-center mb-4">
            <Shield class="w-8 h-8 text-primary-600 mr-3" />
            <h3 class="text-xl font-semibold text-gray-900">Гарантия</h3>
          </div>
          <p class="text-gray-700">
            Полная гарантия на всю продукцию и техническая поддержка
          </p>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div class="flex items-center mb-4">
            <Users class="w-8 h-8 text-primary-600 mr-3" />
            <h3 class="text-xl font-semibold text-gray-900">Опыт</h3>
          </div>
          <p class="text-gray-700">
            Более 10 лет опыта в производстве фильтрационного оборудования
          </p>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div class="flex items-center mb-4">
            <MapPin class="w-8 h-8 text-primary-600 mr-3" />
            <h3 class="text-xl font-semibold text-gray-900">Производство</h3>
          </div>
          <p class="text-gray-700">
            Собственное производство в России с полным контролем качества
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Info -->
    <section class="bg-gray-50 rounded-lg p-8">
      <h2 class="text-3xl font-bold text-gray-900 mb-8">Свяжитесь с нами</h2>
      <div class="grid md:grid-cols-2 gap-8">
        <div>
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Контактная информация</h3>
          <div class="space-y-4">
            <div class="flex items-center">
              <Phone class="w-5 h-5 text-primary-600 mr-3" />
              <div>
                <div class="font-semibold">Телефон:</div>
                <a href="tel:+78007008573" class="text-primary-600 hover:text-primary-700">
                  +7 (800) 700-85-73
                </a>
              </div>
            </div>
            <div class="flex items-center">
              <Mail class="w-5 h-5 text-primary-600 mr-3" />
              <div>
                <div class="font-semibold">Email:</div>
                <a href="mailto:info@tradeof.ru" class="text-primary-600 hover:text-primary-700">
                  info@tradeof.ru
                </a>
              </div>
            </div>
            <div class="flex items-center">
              <MapPin class="w-5 h-5 text-primary-600 mr-3" />
              <div>
                <div class="font-semibold">Адрес:</div>
                <div>г. Обнинск, Россия</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Время работы</h3>
          <div class="space-y-2">
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
    </section>
  </div>
</div> 