<script>
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  export let data;

  $: ({ site } = data);
</script>

<svelte:head>
  <!-- Global Meta Tags -->
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="x-ua-compatible" content="IE=edge" />

  <!-- SEO Meta Tags -->
  <title>{site.title}</title>
  <meta name="description" content={site.description} />
  <meta
    name="keywords"
    content="фильтроэлементы, фильтродержатели, фильтрационные установки, микрофильтрация, оборудование для фильтрации, БМ ФИЛЬТР"
  />
  <meta name="author" content="ООО «БМ ФИЛЬТР»" />
  <meta name="robots" content="index, follow" />
  <meta name="language" content="ru" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content={site.type} />
  <meta property="og:url" content={site.url} />
  <meta property="og:title" content={site.title} />
  <meta property="og:description" content={site.description} />
  <meta property="og:image" content={`${site.url}${site.image}`} />
  <meta property="og:locale" content={site.locale} />
  <meta property="og:site_name" content="БМ ФИЛЬТР" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={site.url} />
  <meta property="twitter:title" content={site.title} />
  <meta property="twitter:description" content={site.description} />
  <meta property="twitter:image" content={`${site.url}${site.image}`} />

  <!-- Favicon -->
  <link rel="icon" href="/img/favicon/favicon.ico" type="image/x-icon" />
  <link rel="apple-touch-icon" href="/img/favicon/apple-touch-icon.png" />
  <link rel="apple-touch-icon" sizes="72x72" href="/img/favicon/apple-touch-icon-72x72.png" />
  <link rel="apple-touch-icon" sizes="114x114" href="/img/favicon/apple-touch-icon-114x114.png" />

  <!-- Canonical URL -->
  <link rel="canonical" href={site.url} />

  <!-- Preconnect to external domains -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />

  <!-- Structured Data -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "ООО «БМ ФИЛЬТР»",
      "url": "{site.url}",
      "logo": "{site.url}{site.image}",
      "description": "{site.description}",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Обнинск",
        "addressCountry": "RU"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+7-800-700-85-73",
        "contactType": "customer service",
        "areaServed": "RU"
      },
      "sameAs": ["https://vk.com/tradeof", "https://t.me/tradeof"]
    }
  </script>
</svelte:head>

<div class="min-h-screen flex flex-col">
  <Header />

  <main class="flex-1">
    <slot />
  </main>

  <Footer />
</div>
