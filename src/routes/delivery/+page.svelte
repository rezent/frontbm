<script>
  import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
  import { Truck, Clock, MapPin, Package, CreditCard, Shield, Phone } from 'lucide-svelte';
  
  export let data;
  
  $: ({ page } = data);
  
  // FAQ данные
  const faqs = [
    {
      question: "Какие способы доставки доступны?",
      answer: "Мы предлагаем доставку курьерской службой, транспортными компаниями, почтой России и самовывозом из нашего офиса в Обнинске."
    },
    {
      question: "Сколько стоит доставка?",
      answer: "Стоимость доставки зависит от веса груза, расстояния и выбранного способа доставки. При заказе от 50 000 рублей доставка бесплатная."
    },
    {
      question: "Сколько времени занимает доставка?",
      answer: "Время доставки зависит от региона: по Москве и области - 1-2 дня, по России - 3-7 дней, в отдаленные регионы - до 14 дней."
    },
    {
      question: "Можно ли отследить груз?",
      answer: "Да, после отправки груза мы предоставляем трек-номер для отслеживания на сайте транспортной компании."
    },
    {
      question: "Что делать при получении поврежденного товара?",
      answer: "При получении поврежденного товара необходимо составить акт с водителем и сразу связаться с нами для решения вопроса."
    }
  ];
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
  
  <!-- Structured Data for FAQ -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Какие способы доставки доступны?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Мы предлагаем доставку курьерской службой, транспортными компаниями, почтой России и самовывозом из нашего офиса в Обнинске."
          }
        },
        {
          "@type": "Question",
          "name": "Сколько стоит доставка?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Стоимость доставки зависит от веса груза, расстояния и выбранного способа доставки. При заказе от 50 000 рублей доставка бесплатная."
          }
        },
        {
          "@type": "Question",
          "name": "Сколько времени занимает доставка?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Время доставки зависит от региона: по Москве и области - 1-2 дня, по России - 3-7 дней, в отдаленные регионы - до 14 дней."
          }
        }
      ]
    }
  </script>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <Breadcrumbs breadcrumbs={[
    { name: 'Главная', url: '/' },
    { name: 'Доставка и оплата', url: '/delivery' }
  ]} />
  
  <!-- Hero Section -->
  <div class="bg-gradient-to-r from-sky-600 to-sky-700 text-white rounded-lg p-8 mb-12">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="text-4xl md:text-5xl font-bold mb-6">Доставка</h1>
      <p class="text-xl md:text-2xl mb-8">
        Быстрая и надежная доставка по всей России
      </p>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="text-center">
          <div class="text-3xl font-bold mb-2">1-7</div>
          <div class="text-sm">Дней доставка</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold mb-2">100%</div>
          <div class="text-sm">Безопасность</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold mb-2">24/7</div>
          <div class="text-sm">Отслеживание</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold mb-2">0₽</div>
          <div class="text-sm">От 50 000₽</div>
        </div>
      </div>
    </div>
  </div>

  <div class="max-w-6xl mx-auto">
    <!-- Delivery Methods -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold text-gray-900 mb-8">Способы доставки</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Courier Delivery -->
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div class="flex items-center mb-4">
            <Truck class="w-8 h-8 text-primary-600 mr-3" />
            <h3 class="text-xl font-semibold text-gray-900">Курьерская доставка</h3>
          </div>
          <p class="text-gray-700 mb-4">
            Быстрая доставка курьером до двери в удобное для вас время
          </p>
          <div class="space-y-2 text-sm text-gray-600">
            <div>• Срок: 1-2 дня</div>
            <div>• Стоимость: от 500₽</div>
            <div>• Регион: Москва и область</div>
          </div>
        </div>

        <!-- Transport Company -->
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div class="flex items-center mb-4">
            <Package class="w-8 h-8 text-primary-600 mr-3" />
            <h3 class="text-xl font-semibold text-gray-900">Транспортная компания</h3>
          </div>
          <p class="text-gray-700 mb-4">
            Доставка через надежные транспортные компании по всей России
          </p>
          <div class="space-y-2 text-sm text-gray-600">
            <div>• Срок: 3-7 дней</div>
            <div>• Стоимость: от 800₽</div>
            <div>• Регион: Вся Россия</div>
          </div>
        </div>

        <!-- Russian Post -->
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div class="flex items-center mb-4">
            <MapPin class="w-8 h-8 text-primary-600 mr-3" />
            <h3 class="text-xl font-semibold text-gray-900">Почта России</h3>
          </div>
          <p class="text-gray-700 mb-4">
            Доставка почтой России в любую точку страны
          </p>
          <div class="space-y-2 text-sm text-gray-600">
            <div>• Срок: 5-14 дней</div>
            <div>• Стоимость: от 300₽</div>
            <div>• Регион: Вся Россия</div>
          </div>
        </div>

        <!-- Self Pickup -->
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div class="flex items-center mb-4">
            <MapPin class="w-8 h-8 text-primary-600 mr-3" />
            <h3 class="text-xl font-semibold text-gray-900">Самовывоз</h3>
          </div>
          <p class="text-gray-700 mb-4">
            Заберите заказ из нашего офиса в Обнинске
          </p>
          <div class="space-y-2 text-sm text-gray-600">
            <div>• Срок: В день заказа</div>
            <div>• Стоимость: Бесплатно</div>
            <div>• Адрес: г. Обнинск</div>
          </div>
        </div>

        <!-- Express Delivery -->
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div class="flex items-center mb-4">
            <Clock class="w-8 h-8 text-primary-600 mr-3" />
            <h3 class="text-xl font-semibold text-gray-900">Экспресс доставка</h3>
          </div>
          <p class="text-gray-700 mb-4">
            Срочная доставка в течение 24 часов
          </p>
          <div class="space-y-2 text-sm text-gray-600">
            <div>• Срок: 24 часа</div>
            <div>• Стоимость: от 1500₽</div>
            <div>• Регион: Москва и область</div>
          </div>
        </div>

        <!-- Free Delivery -->
        <div class="bg-white p-6 rounded-lg shadow-md border border-primary-200 bg-primary-50">
          <div class="flex items-center mb-4">
            <CreditCard class="w-8 h-8 text-primary-600 mr-3" />
            <h3 class="text-xl font-semibold text-gray-900">Бесплатная доставка</h3>
          </div>
          <p class="text-gray-700 mb-4">
            При заказе от 50 000 рублей доставка бесплатная
          </p>
          <div class="space-y-2 text-sm text-gray-600">
            <div>• Срок: 3-7 дней</div>
            <div>• Стоимость: 0₽</div>
            <div>• Регион: Вся Россия</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Delivery Process -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold text-gray-900 mb-8">Как происходит доставка</h2>
      <div class="grid md:grid-cols-4 gap-8">
        <div class="text-center">
          <div class="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl font-bold text-primary-600">1</span>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Заказ</h3>
          <p class="text-gray-700">Оформляете заказ на сайте или по телефону</p>
        </div>
        
        <div class="text-center">
          <div class="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl font-bold text-primary-600">2</span>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Подтверждение</h3>
          <p class="text-gray-700">Мы подтверждаем заказ и уточняем детали доставки</p>
        </div>
        
        <div class="text-center">
          <div class="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl font-bold text-primary-600">3</span>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Отправка</h3>
          <p class="text-gray-700">Отправляем заказ выбранным способом доставки</p>
        </div>
        
        <div class="text-center">
          <div class="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl font-bold text-primary-600">4</span>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Получение</h3>
          <p class="text-gray-700">Получаете заказ и проверяете комплектацию</p>
        </div>
      </div>
    </section>

    <!-- Delivery Terms -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold text-gray-900 mb-8">Условия доставки</h2>
      <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Что включено в стоимость доставки</h3>
          <ul class="space-y-2 text-gray-700">
            <li class="flex items-start">
              <Shield class="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              Страхование груза
            </li>
            <li class="flex items-start">
              <Shield class="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              Упаковка и маркировка
            </li>
            <li class="flex items-start">
              <Shield class="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              Отслеживание груза
            </li>
            <li class="flex items-start">
              <Shield class="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              Уведомления о статусе
            </li>
          </ul>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Важная информация</h3>
          <ul class="space-y-2 text-gray-700">
            <li class="flex items-start">
              <Clock class="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
              Сроки доставки указаны ориентировочно
            </li>
            <li class="flex items-start">
              <Clock class="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
              При получении проверяйте товар
            </li>
            <li class="flex items-start">
              <Clock class="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
              Сохраняйте документы доставки
            </li>
            <li class="flex items-start">
              <Clock class="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
              При повреждении составляйте акт
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold text-gray-900 mb-8">Часто задаваемые вопросы</h2>
      <div class="space-y-4">
        {#each faqs as faq}
          <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
            <p class="text-gray-700">{faq.answer}</p>
          </div>
        {/each}
      </div>
    </section>

    <!-- Contact Section -->
    <section class="bg-gray-50 rounded-lg p-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Остались вопросы?</h2>
        <p class="text-lg text-gray-700 mb-6">
          Свяжитесь с нами для получения подробной информации о доставке
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:+78007008573" 
             class="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center">
            <Phone class="w-5 h-5 mr-2" />
            +7 (800) 700-85-73
          </a>
          <a href="/contacts" 
             class="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
            Написать нам
          </a>
        </div>
      </div>
    </section>
  </div>
</div> 