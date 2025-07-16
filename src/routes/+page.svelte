<script lang="ts">
  import Filter from '$lib/components/Filter.svelte';
  import ProductCard from '$lib/components/ProductCard.svelte';

  import { ChevronRight, Star, Truck, Clock, Shield, Users } from 'lucide-svelte';
  import type { Product } from '$lib/types/api';
  import { modalActions } from '$lib/stores/modal';
  import { goto } from '$app/navigation';

  export let data: any;
  $: ({ page } = data);

  // Мок-данные для каталога
  const catalogItems = [
    {
      id: 1,
      title: 'Фильтроэлементы',
      image: '/img/main-catalog-img-1.jpg',
      count: 125,
      features: ['Собственное производство', 'Аналоги']
    },
    {
      id: 2,
      title: 'Фильтрационные установки',
      image: '/img/main-catalog-img-2.jpg',
      count: 5,
      features: []
    },
    {
      id: 3,
      title: 'Фильтродержатели',
      image: '/img/main-catalog-img-3.jpg',
      count: 3125,
      features: []
    },
    {
      id: 4,
      title: 'Фитинги и доп. оборудование',
      image: '/img/main-catalog-img-4.jpg',
      count: 10125,
      features: []
    }
  ];

  // Данные для сертификатов
  const certificates = [
    { id: 1, image: '/img/certificate-img-1.jpg', bigImage: '/img/certificate-img-1-big.jpg', title: 'Сертификат соответствия № 1262326' },
    { id: 2, image: '/img/certificate-img-2.jpg', bigImage: '/img/certificate-img-2-big.jpg', title: 'Приложение № 0000000' },
    { id: 3, image: '/img/certificate-img-3.jpg', bigImage: '/img/certificate-img-3-big.jpg', title: 'Приложение № 0000000' },
    { id: 4, image: '/img/certificate-img-4.jpg', bigImage: '/img/certificate-img-4-big.jpg', title: 'Приложение № 0000000' },
    { id: 5, image: '/img/certificate-img-5.jpg', bigImage: '/img/certificate-img-5-big.jpg', title: 'Приложение № 0000000' }
  ];

  // Данные для преимуществ
  const advantages = [
    {
      icon: Shield,
      title: 'Собственное производство, Россия',
      description: 'Вся наша продукция сертифицирована и проверена специалистами'
    },
    {
      icon: Star,
      title: 'Каждый 10-ый фильтр бесплатно',
      description: 'Постоянным клиентам предоставляем систему скидок'
    },
    {
      icon: Truck,
      title: 'Доставка по всей РФ от 1 дня за 0 руб',
      description: 'Осуществим доставку в любое время суток, в максимально сжатые сроки'
    },
    {
      icon: Users,
      title: 'Бесплатная консультация',
      description: 'Персонал компании - ведущие специалисты в области фильтрации'
    },
    {
      icon: Clock,
      title: 'Работаем без выходных',
      description: 'Наша компания работает ежедневно с 8:00 до 22:00'
    }
  ];

  // Мок-данные для продукции
  const products: Product[] = [
    {
      id: '1',
      title: 'Угольник 90 градусов с резьбой. 50мм',
      description: 'Описание товара',
      price: 3000,
      oldPrice: 4820,
      discount: true,
      images: ['/img/production-img-1.jpg'],
      category: 'fittings',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Угольник 90 градусов с резьбой. 50мм',
      description: 'Описание товара',
      price: 2250,
      images: ['/img/production-img-2.jpg'],
      category: 'fittings',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Угольник 90 градусов с резьбой. 50мм',
      description: 'Описание товара',
      price: 23000,
      images: ['/img/production-img-1.jpg'],
      category: 'fittings',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '4',
      title: 'Угольник 90 градусов с резьбой. 50мм',
      description: 'Описание товара',
      price: 2000,
      images: ['/img/production-img-3.jpg'],
      category: 'fittings',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isNew: true
    },
    {
      id: '5',
      title: 'Угольник 90 градусов с резьбой. 50мм',
      description: 'Описание товара',
      price: 700,
      images: ['/img/production-img-1.jpg'],
      category: 'fittings',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ];

  // Данные для статей
  const articles = [
    {
      id: 1,
      title: 'Заголовок статьи, вторая строка..',
      description: 'Представляют собой соединительные элементы, которые обеспечивают надежное соединение трубопроводов.',
      image: '/img/main-catalog-img-3.jpg',
      date: '5 июня\'16'
    },
    {
      id: 2,
      title: 'Заголовок статьи..',
      description: 'Представляют собой соединительные элементы, которые обеспечивают надежное соединение трубопроводов.',
      image: '/img/main-catalog-img-3.jpg',
      date: '5 июня\'16'
    },
    {
      id: 3,
      title: 'Заголовок статьи, вторая строка..',
      description: 'Представляют собой соединительные элементы, которые обеспечивают надежное соединение трубопроводов.',
      image: '/img/main-catalog-img-3.jpg',
      date: '5 июня\'16'
    }
  ];

  let currentFilters = {};
  function handleFilterChange(event: CustomEvent<any>) {
    currentFilters = event.detail;
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
  
  <!-- Structured Data for Homepage -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Оборудование для микрофильтрации",
      "url": "{page.url}",
      "description": "{page.description}",
      "publisher": {
        "@type": "Organization",
        "name": "ООО «БМ ФИЛЬТР»",
        "logo": {
          "@type": "ImageObject",
          "url": "{page.url}/img/logo.png"
        }
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "{page.url}/catalog?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  </script>
</svelte:head>

	<!-- Hero Section -->
	<section class="relative overflow-hidden py-10 md:py-16 lg:py-32">
		<div class="container mx-auto px-4 md:px-6 lg:px-8">
			<div class="grid gap-8 md:gap-12 lg:grid-cols-2 items-center">
				<!-- Text Content -->
				<div class="space-y-4 md:space-y-6 lg:space-y-8 text-center lg:text-left">
					<h1 class="text-2xl md:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
						Промышленные
						<span class="text-blue-600">Фильтры</span>
						Высшего Качества
					</h1>
					<p class="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
						Профессиональные решения для промышленной фильтрации. 
						Широкий ассортимент фильтр-элементов и комплектующих 
						для любых производственных задач.
					</p>
					<div class="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
						<button on:click={() => goto('/catalog')}
             class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold text-base md:text-lg transition-colors">
							Каталог продукции
						</button>
						<button 
							on:click|stopPropagation={modalActions.openCallbackModal}
							class="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold text-base md:text-lg transition-colors"
						>
							Консультация
						</button>
					</div>
				</div>

				<!-- Hero Image Composition -->
				<div class="relative mt-8 lg:mt-0">
					<div class="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 transform rotate-1 md:rotate-2 hover:rotate-0 transition-transform duration-500">
						<div class="bg-white p-2 md:p-4 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-rotate-2">
							<img src="/images/mbp.jpg" alt="Фильтр элемент" class="w-full h-24 md:h-32 lg:h-40 object-contain rounded-lg transition-transform duration-300 hover:scale-110" />
						</div>
						<div class="bg-white p-2 md:p-4 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-300 transform translate-x-1 md:translate-x-2 hover:scale-105 hover:rotate-2">
							<img src="/images/filtroderzhateli.png" alt="Фильтр держатели" class="w-full h-24 md:h-32 lg:h-40 object-contain rounded-lg transition-transform duration-300 hover:scale-110" />
						</div>
						<div class="bg-white p-2 md:p-4 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-rotate-1">
							<img src="/images/filter1.jpg" alt="Промышленный фильтр" class="w-full h-24 md:h-32 lg:h-40 object-contain rounded-lg transition-transform duration-300 hover:scale-110" />
						</div>
						<div class="bg-white p-2 md:p-4 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-300 transform -translate-x-1 md:-translate-x-2 hover:scale-105 hover:rotate-1">
							<img src="/images/i.webp" alt="Фильтр элемент" class="w-full h-24 md:h-32 lg:h-40 object-contain rounded-lg transition-transform duration-300 hover:scale-110" />
						</div>
						<div class="bg-white p-2 md:p-4 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:rotate-2">
							<img src="/images/filter2.jpg" alt="Фильтр система" class="w-full h-24 md:h-32 lg:h-40 object-contain rounded-lg transition-transform duration-300 hover:scale-110" />
						</div>
						<div class="bg-white p-2 md:p-4 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-300 transform translate-x-1 hover:scale-105 hover:-rotate-1">
							<img src="/images/filter3.jpg" alt="Фильтр элементы" class="w-full h-24 md:h-32 lg:h-40 object-contain rounded-lg transition-transform duration-300 hover:scale-110" />
						</div>
					</div>

					<!-- Floating elements -->
					<div class="absolute -top-2 -left-2 md:-top-4 md:-left-4 w-12 h-12 md:w-24 md:h-24 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
					<div class="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 w-16 h-16 md:w-32 md:h-32 bg-blue-300 rounded-full opacity-20 animate-pulse" style="animation-delay: 1s;"></div>
				</div>
			</div>
		</div>
	</section>

<!-- Main Content -->
<div class="container mx-auto px-4 py-12">
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
    <!-- Sidebar -->
    <aside class="lg:col-span-1">
      <Filter on:filterChange={handleFilterChange} />
    </aside>
    
    <!-- Main Content -->
    <main class="lg:col-span-3 space-y-12">
      <!-- Catalog Section -->
      <section>
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-3xl font-bold text-gray-900">Каталог</h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          {#each catalogItems as item}
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div class="relative">
                <img src={item.image} alt={item.title} class="w-full h-48 object-cover" />
                <div class="absolute top-4 right-4 bg-sky-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {item.count} шт.
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-3">
                  <a href={`/catalog/${item.id}`} class="hover:text-sky-600 transition-colors">
                    {item.title}
                  </a>
                </h3>
                {#if item.features.length > 0}
                  <ul class="space-y-1">
                    {#each item.features as feature}
                      <li class="text-sm text-gray-600 flex items-center">
                        <ChevronRight class="w-4 h-4 text-sky-500 mr-2" />
                        {feature}
                      </li>
                    {/each}
                  </ul>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      </section>
      
      <!-- Certificates Section -->
      <section>
        <h2 class="text-3xl font-bold text-gray-900 mb-8">Сертификаты</h2>
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <p class="text-gray-600 mb-6">
            Наши фильтры прошли строгую сертификацию. Далее некий текст..Именно таким мы создали наш интернет-магазин, территориально мы находимся в Обнинске, но доставляем заказы по всей России.
          </p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {#each certificates as cert}
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <a href={cert.bigImage} class="block">
                <img src={cert.image} alt={cert.title} class="w-full h-32 object-cover" />
              </a>
              <div class="p-4">
                <p class="text-sm text-gray-700 text-center">{cert.title}</p>
              </div>
            </div>
          {/each}
        </div>
      </section>
    </main>
  </div>
</div>

<!-- Advantages Section -->
<section class="bg-gray-50 py-16">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
      {#each advantages as advantage}
        <div class="text-center">
          <div class="bg-sky-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svelte:component this={advantage.icon} class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{advantage.title}</h3>
          <p class="text-gray-600 text-sm">{advantage.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Products Section -->
<section class="py-16">
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-3xl font-bold text-gray-900">Продукция</h2>
      <a href="/catalog" class="text-sky-600 hover:text-sky-700 font-medium">
        Все товары →
      </a>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {#each products as product}
        <ProductCard {product} />
      {/each}
    </div>
  </div>
</section>

<!-- Articles Section -->
<section class="bg-gray-50 py-16">
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-3xl font-bold text-gray-900">Статьи</h2>
      <a href="/articles" class="text-sky-600 hover:text-sky-700 font-medium">
        Все статьи →
      </a>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {#each articles as article}
        <article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <img src={article.image} alt={article.title} class="w-full h-48 object-cover" />
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              <a href={`/articles/${article.id}`} class="hover:text-sky-600 transition-colors">
                {article.title}
              </a>
            </h3>
            <p class="text-gray-600 mb-4 line-clamp-2">{article.description}</p>
            <div class="text-sm text-gray-500">{article.date}</div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<!-- About Section -->
<section class="py-16">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">О нас</h2>
    
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-lg shadow-md p-8">
        <p class="text-lg text-gray-700 mb-6 leading-relaxed">
          ООО «БМ ФИЛЬТР» - Российский производитель современных, качественных фильтроэлементов, фильтродержателей и фильтрационных установок, для решения различных задач фильтрации и микрофильтрации.
        </p>
        
        <div class="prose prose-lg max-w-none text-gray-600">
          <p class="mb-4">
            Беспрецедентное качество, не уступает зарубежными производителями. Так же в линейке товаров присутствуют ПОЛНЫЕ аналоги таких зарубежных фирм как: PALL, Sartarious, Millipore и множество других фирм. Наша компания гарантирует Вам качество и соответствие всем техническим требованиям нашего продукта. Товар сертифицирован. Любой, правильно подобранный фильтроэлемент, фильтродержатель или фильтрационная установка решит вашу задачу на 110%. Более 100 компаний партнеров, которые возложили на нас решение своих фильтрационных задач, остались довольны нашими товарами и услугами и стали постоянными клиентами. Дорожа своей репутацией ООО «БМ ФИЛЬТР» точно выполняет обязательства перед клиентами.
          </p>
          
          <p class="mb-4">
            Зачем переплачивать, если можно экономить до 40% Вашего бюджета с нами, получая фильтроэлементы, фильтродержатели, фильтрационные установки и комплектующие отличного качества, для решения Ваших фильтрационных задач?
          </p>
          
          <p>
            ООО «БМ ФИЛЬТР» и ИП Багдасаров М.А. - молодые компании, основанные в 2015 году, но не смотря на юный возраст, наши знания и производство основываются на опыте известного российского производителя фильтрационного оборудования ООО «Экспресс-Эко», основанного в 1991 года. Основатели компании - соавторы уникальных разработок в технологии производства фильтрующих элементов и фильтрационного оборудования.. <a href="/about" class="text-sky-600 hover:text-sky-700">читать далее</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</section>



<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-clamp: 2;
  }
</style> 