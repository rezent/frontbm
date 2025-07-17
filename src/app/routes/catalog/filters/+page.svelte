<script>
  import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

  export let data;

  $: ({ page } = data);
</script>

<svelte:head>
  <title>Фильтроэлементы - Каталог</title>
  <meta name="description" content="Фильтроэлементы для промышленного применения" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <div class="mb-8">
    <h1 class="text-3xl font-bold text-gray-900">Фильтроэлементы</h1>
    <Breadcrumbs
      breadcrumbs={[
        { name: 'Каталог', url: '/catalog' },
        { name: 'Фильтроэлементы', url: '/catalog/filters' },
      ]}
    />
  </div>

  <div class="text-center py-12">
    <h2 class="text-2xl font-semibold text-gray-900 mb-4">Фильтроэлементы</h2>
    <p class="text-gray-600 mb-8">Страница находится в разработке</p>
    <a href="/catalog" class="btn-primary"> Вернуться в каталог </a>
  </div>
</div>
