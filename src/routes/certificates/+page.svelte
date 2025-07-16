<script lang="ts">
  import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
  import { Award, FileText, CheckCircle, Download, Eye } from 'lucide-svelte';

  export let data: any;

  $: ({ page } = data);

  type Certificate = {
    id: number;
    title: string;
    description: string;
    image: string;
    imageBig: string;
    date: string;
    number: string;
    type: string;
  };

  // Данные сертификатов
  const certificates: Certificate[] = [
    {
      id: 1,
      title: 'Сертификат соответствия ГОСТ',
      description: 'Сертификат соответствия требованиям ГОСТ на фильтроэлементы',
      image: '/img/certificate-img-1.jpg',
      imageBig: '/img/certificate-img-1-big.jpg',
      date: '2024',
      number: 'РОСС RU.АГ01.Н00001',
      type: 'ГОСТ',
    },
    {
      id: 2,
      title: 'Сертификат ISO 9001',
      description: 'Сертификат системы менеджмента качества ISO 9001:2015',
      image: '/img/certificate-img-2.jpg',
      imageBig: '/img/certificate-img-2-big.jpg',
      date: '2024',
      number: 'ISO-2024-001',
      type: 'ISO',
    },
    {
      id: 3,
      title: 'Сертификат безопасности',
      description: 'Сертификат безопасности промышленной продукции',
      image: '/img/certificate-img-3.jpg',
      imageBig: '/img/certificate-img-3-big.jpg',
      date: '2024',
      number: 'БЕЗ-2024-001',
      type: 'Безопасность',
    },
    {
      id: 4,
      title: 'Сертификат экологичности',
      description: 'Сертификат экологической безопасности продукции',
      image: '/img/certificate-img-4.jpg',
      imageBig: '/img/certificate-img-4-big.jpg',
      date: '2024',
      number: 'ЭКО-2024-001',
      type: 'Экология',
    },
    {
      id: 5,
      title: 'Сертификат пожарной безопасности',
      description: 'Сертификат пожарной безопасности оборудования',
      image: '/img/certificate-img-5.jpg',
      imageBig: '/img/certificate-img-5-big.jpg',
      date: '2024',
      number: 'ПОЖ-2024-001',
      type: 'Пожарная безопасность',
    },
  ];

  let selectedCertificate: Certificate | null = null;
  let showModal = false;

  function openCertificate(certificate: Certificate) {
    selectedCertificate = certificate;
    showModal = true;
  }

  function closeModal() {
    showModal = false;
    selectedCertificate = null;
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
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Сертификаты качества",
      "description": "{page.description}",
      "url": "{page.url}",
      "publisher": {
        "@type": "Organization",
        "name": "ООО «БМ ФИЛЬТР»"
      },
      "mainEntity": {
        "@type": "ItemList",
        "name": "Сертификаты качества",
        "itemListElement": [
          {
            "@type": "CreativeWork",
            "name": "Сертификат соответствия ГОСТ",
            "description": "Сертификат соответствия требованиям ГОСТ на фильтроэлементы"
          },
          {
            "@type": "CreativeWork",
            "name": "Сертификат ISO 9001",
            "description": "Сертификат системы менеджмента качества ISO 9001:2015"
          }
        ]
      }
    }
  </script>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <Breadcrumbs
    breadcrumbs={[
      { name: 'Главная', url: '/' },
      { name: 'Сертификаты', url: '/certificates' },
    ]}
  />

  <!-- Hero Section -->
  <div class="bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-lg p-8 mb-12">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="text-4xl md:text-5xl font-bold mb-6">Сертификаты качества</h1>
      <p class="text-xl md:text-2xl mb-8">
        Вся наша продукция сертифицирована и соответствует международным стандартам
      </p>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="text-center">
          <div class="text-3xl font-bold mb-2">5+</div>
          <div class="text-sm">Сертификатов</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold mb-2">100%</div>
          <div class="text-sm">Соответствие</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold mb-2">ГОСТ</div>
          <div class="text-sm">Стандарты</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold mb-2">ISO</div>
          <div class="text-sm">Международные</div>
        </div>
      </div>
    </div>
  </div>

  <div class="max-w-6xl mx-auto">
    <!-- About Certificates -->
    <section class="mb-16">
      <div class="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 class="text-3xl font-bold text-gray-900 mb-6">О наших сертификатах</h2>
          <p class="text-lg text-gray-700 mb-6">
            ООО «БМ ФИЛЬТР» имеет полный пакет сертификатов качества, подтверждающих соответствие
            нашей продукции международным и российским стандартам.
          </p>
          <p class="text-lg text-gray-700 mb-6">
            Все фильтроэлементы, фильтродержатели и фильтрационные установки проходят обязательную
            сертификацию и соответствуют требованиям ГОСТ, ISO и других нормативных документов.
          </p>
          <div class="flex items-center text-green-600 font-semibold">
            <CheckCircle class="w-6 h-6 mr-2" />
            Гарантия качества и безопасности
          </div>
        </div>
        <div class="bg-gray-50 p-8 rounded-lg">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Наши достижения</h3>
          <div class="space-y-4">
            <div class="flex items-center">
              <Award class="w-5 h-5 text-primary-600 mr-3" />
              <span>Сертификат ISO 9001:2015</span>
            </div>
            <div class="flex items-center">
              <Award class="w-5 h-5 text-primary-600 mr-3" />
              <span>Соответствие ГОСТ</span>
            </div>
            <div class="flex items-center">
              <Award class="w-5 h-5 text-primary-600 mr-3" />
              <span>Экологическая безопасность</span>
            </div>
            <div class="flex items-center">
              <Award class="w-5 h-5 text-primary-600 mr-3" />
              <span>Пожарная безопасность</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Certificates Grid -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold text-gray-900 mb-8">Наши сертификаты</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each certificates as certificate}
          <div
            class="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div class="relative">
              <img
                src={certificate.image}
                alt={certificate.title}
                class="w-full h-48 object-cover"
              />
              <div class="absolute top-2 right-2">
                <span class="bg-gray-600 text-white px-2 py-1 rounded text-sm">
                  {certificate.type}
                </span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">
                {certificate.title}
              </h3>
              <p class="text-gray-700 mb-4">
                {certificate.description}
              </p>
              <div class="text-sm text-gray-600 mb-4">
                <div>Номер: {certificate.number}</div>
                <div>Дата: {certificate.date}</div>
              </div>
              <div class="flex space-x-2">
                <button
                  on:click={() => openCertificate(certificate)}
                  class="flex-1 bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors flex items-center justify-center"
                >
                  <Eye class="w-4 h-4 mr-2" />
                  Просмотр
                </button>
                <button
                  class="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors"
                >
                  <Download class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Quality Standards -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold text-gray-900 mb-8">Стандарты качества</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div class="flex items-center mb-4">
            <FileText class="w-8 h-8 text-primary-600 mr-3" />
            <h3 class="text-xl font-semibold text-gray-900">ГОСТ</h3>
          </div>
          <p class="text-gray-700 mb-4">
            Соответствие российским государственным стандартам качества
          </p>
          <ul class="text-sm text-gray-600 space-y-1">
            <li>• ГОСТ Р 51251-99</li>
            <li>• ГОСТ Р 51592-2000</li>
            <li>• ГОСТ Р 51634-2000</li>
          </ul>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div class="flex items-center mb-4">
            <FileText class="w-8 h-8 text-primary-600 mr-3" />
            <h3 class="text-xl font-semibold text-gray-900">ISO 9001</h3>
          </div>
          <p class="text-gray-700 mb-4">Международный стандарт системы менеджмента качества</p>
          <ul class="text-sm text-gray-600 space-y-1">
            <li>• ISO 9001:2015</li>
            <li>• Система качества</li>
            <li>• Постоянное улучшение</li>
          </ul>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div class="flex items-center mb-4">
            <FileText class="w-8 h-8 text-primary-600 mr-3" />
            <h3 class="text-xl font-semibold text-gray-900">Безопасность</h3>
          </div>
          <p class="text-gray-700 mb-4">Сертификаты безопасности и экологичности продукции</p>
          <ul class="text-sm text-gray-600 space-y-1">
            <li>• Пожарная безопасность</li>
            <li>• Экологическая безопасность</li>
            <li>• Промышленная безопасность</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="bg-gray-50 rounded-lg p-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Нужны дополнительные документы?</h2>
        <p class="text-lg text-gray-700 mb-6">
          Свяжитесь с нами для получения полного пакета сертификатов и технической документации
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:+78007008573"
            class="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            +7 (800) 700-85-73
          </a>
          <a
            href="/contacts"
            class="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Написать нам
          </a>
        </div>
      </div>
    </section>
  </div>
</div>

<!-- Modal for Certificate View -->
{#if showModal && selectedCertificate}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg max-w-4xl max-h-full overflow-auto">
      <div class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-2xl font-bold text-gray-900">{selectedCertificate.title}</h3>
          <button on:click={closeModal} class="text-gray-500 hover:text-gray-700 text-2xl">
            ×
          </button>
        </div>
        <img
          src={selectedCertificate.imageBig}
          alt={selectedCertificate.title}
          class="w-full rounded-lg shadow-lg"
        />
        <div class="mt-4">
          <p class="text-gray-700 mb-2">{selectedCertificate.description}</p>
          <div class="text-sm text-gray-600">
            <div>Номер: {selectedCertificate.number}</div>
            <div>Дата: {selectedCertificate.date}</div>
            <div>Тип: {selectedCertificate.type}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
