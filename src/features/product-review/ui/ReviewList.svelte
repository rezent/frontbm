<script lang="ts">
  import { onMount } from 'svelte';
  import { reviewStore } from '../model/store';
  
  export let productId: string;

  // Реактивные переменные из store
  $: reviews = reviewStore.reviews;
  $: isLoading = reviewStore.isLoading;
  $: reviewCount = reviewStore.reviewCount;
  $: averageRating = reviewStore.averageRating;

  let selectedRatingFilter = 0; // 0 = все отзывы

  // Фильтрованные отзывы
  $: filteredReviews = selectedRatingFilter === 0 
    ? $reviews 
    : $reviews.filter(review => review.rating === selectedRatingFilter);

  onMount(() => {
    // Загружаем отзывы при монтировании компонента
    reviewStore.loadProductReviews(productId);
  });

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  function getRatingStars(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }
</script>

<div class="review-list">
  <!-- Заголовок и статистика -->
  <div class="review-header mb-6">
    <div class="flex items-center justify-between">
      <h3 class="text-xl font-semibold">
        Отзывы о товаре
        {#if $reviewCount > 0}
          <span class="text-gray-500">({$reviewCount})</span>
        {/if}
      </h3>
      
      {#if $reviewCount > 0}
        <div class="rating-summary bg-gray-50 px-4 py-2 rounded-lg">
          <div class="text-lg font-semibold text-yellow-600">
            {$averageRating} {getRatingStars(Math.round($averageRating))}
          </div>
          <div class="text-sm text-gray-600">
            Средняя оценка
          </div>
        </div>
      {/if}
    </div>

    <!-- Фильтр по рейтингу -->
    {#if $reviewCount > 0}
      <div class="rating-filter mt-4">
        <span class="text-sm font-medium text-gray-700 mr-3">Фильтр по оценке:</span>
        <div class="inline-flex space-x-2">
          <button
            class="px-3 py-1 text-sm rounded {selectedRatingFilter === 0 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-500 hover:text-white transition-colors"
            on:click={() => selectedRatingFilter = 0}
          >
            Все
          </button>
          {#each [5, 4, 3, 2, 1] as rating}
            <button
              class="px-3 py-1 text-sm rounded {selectedRatingFilter === rating ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-500 hover:text-white transition-colors"
              on:click={() => selectedRatingFilter = rating}
            >
              {rating} ★
            </button>
          {/each}
        </div>
      </div>
    {/if}
  </div>

  <!-- Состояние загрузки -->
  {#if $isLoading}
    <div class="loading-state text-center py-8">
      <div class="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
      <p class="text-gray-600">Загрузка отзывов...</p>
    </div>
  
  <!-- Список отзывов -->
  {:else if filteredReviews.length > 0}
    <div class="reviews-grid space-y-4">
      {#each filteredReviews as review (review.id)}
        <div class="review-card bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
          <!-- Заголовок отзыва -->
          <div class="review-header flex items-center justify-between mb-3">
            <div class="author-info">
              <h4 class="font-medium text-gray-900">{review.authorName}</h4>
              <div class="rating text-yellow-500 text-lg">
                {getRatingStars(review.rating)}
              </div>
            </div>
            {#if review.createdAt}
              <time class="text-sm text-gray-500">
                {formatDate(review.createdAt)}
              </time>
            {/if}
          </div>

          <!-- Текст отзыва -->
          <div class="review-content">
            <p class="text-gray-700 leading-relaxed">{review.comment}</p>
          </div>
        </div>
      {/each}
    </div>

  <!-- Пустое состояние -->
  {:else if selectedRatingFilter === 0}
    <div class="empty-state text-center py-8">
      <div class="text-gray-400 text-6xl mb-4">💬</div>
      <h4 class="text-lg font-medium text-gray-900 mb-2">Пока нет отзывов</h4>
      <p class="text-gray-600">Станьте первым, кто оставит отзыв о этом товаре!</p>
    </div>

  <!-- Нет отзывов с выбранным рейтингом -->
  {:else}
    <div class="empty-filter-state text-center py-8">
      <div class="text-gray-400 text-4xl mb-4">🔍</div>
      <h4 class="text-lg font-medium text-gray-900 mb-2">
        Нет отзывов с оценкой {selectedRatingFilter} ★
      </h4>
      <p class="text-gray-600">Попробуйте выбрать другой фильтр</p>
      <button
        class="mt-3 text-blue-600 hover:text-blue-800 underline"
        on:click={() => selectedRatingFilter = 0}
      >
        Показать все отзывы
      </button>
    </div>
  {/if}
</div>

<style>
  .review-list {
    max-width: 800px;
  }

  .review-card {
    transition: all 0.2s ease-in-out;
  }

  .review-card:hover {
    transform: translateY(-1px);
  }

  .rating-summary {
    min-width: 120px;
    text-align: center;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .animate-spin {
    animation: spin 1s linear infinite;
  }
</style> 