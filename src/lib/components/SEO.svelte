<script lang="ts">
  export let title: string = '';
  export let description: string = '';
  export let keywords: string = '';
  export let image: string = '';
  export let url: string = '';
  export let type: string = 'website';
  export let noindex: boolean = false;
  export let structuredData: any = null;
  
  // Получаем базовый URL из данных сайта
  import { page } from '$app/stores';
  
  // Данные сайта
  const site = {
    url: 'https://tradeof.ru',
    title: 'Оборудование для микрофильтрации - БМ ФИЛЬТР',
    description: 'Российский производитель современных, качественных фильтроэлементов, фильтродержателей и фильтрационных установок',
    image: '/img/logo.png',
    locale: 'ru_RU'
  };
  
  $: fullUrl = url ? `${site.url}${url}` : $page.url.href;
  $: fullImage = image ? `${site.url}${image}` : `${site.url}${site.image}`;
</script>

<svelte:head>
  <!-- Page-specific SEO -->
  <title>{title || site.title}</title>
  <meta name="description" content={description || site.description} />
  {#if keywords}
    <meta name="keywords" content={keywords} />
  {/if}
  
  <!-- Robots -->
  {#if noindex}
    <meta name="robots" content="noindex, nofollow" />
  {:else}
    <meta name="robots" content="index, follow" />
  {/if}
  
  <!-- Open Graph -->
  <meta property="og:title" content={title || site.title} />
  <meta property="og:description" content={description || site.description} />
  <meta property="og:image" content={fullImage} />
  <meta property="og:url" content={fullUrl} />
  <meta property="og:type" content={type} />
  <meta property="og:locale" content={site.locale} />
  <meta property="og:site_name" content="БМ ФИЛЬТР" />
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:title" content={title || site.title} />
  <meta property="twitter:description" content={description || site.description} />
  <meta property="twitter:image" content={fullImage} />
  <meta property="twitter:url" content={fullUrl} />
  
  <!-- Canonical -->
  <link rel="canonical" href={fullUrl} />
  
  <!-- Structured Data -->
  {#if structuredData}
    <script type="application/ld+json">
      {JSON.stringify(structuredData)}
    </script>
  {/if}
</svelte:head> 