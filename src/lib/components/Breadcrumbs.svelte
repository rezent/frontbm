<script context="module" lang="ts">
  export type Breadcrumb = {
    name: string;
    url: string;
  };
</script>

<script lang="ts">
  export let breadcrumbs: Breadcrumb[] = [];
</script>

<nav class="mb-6" aria-label="Хлебные крошки">
  <ol class="flex items-center space-x-2 text-sm">
    {#each breadcrumbs as breadcrumb, index}
      <li class="flex items-center">
        {#if index > 0}
          <svg
            class="w-4 h-4 text-gray-400 mx-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"
            ></path>
          </svg>
        {/if}

        {#if index === breadcrumbs.length - 1}
          <!-- Последний элемент (текущая страница) -->
          <span class="text-gray-900 font-medium" aria-current="page">
            {breadcrumb.name}
          </span>
        {:else}
          <!-- Обычная ссылка -->
          <a href={breadcrumb.url} class="text-gray-600 hover:text-primary-600 transition-colors">
            {breadcrumb.name}
          </a>
        {/if}
      </li>
    {/each}
  </ol>
</nav>
