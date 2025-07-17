<script lang="ts">
  import { reviewStore } from '../model/store';
  import type { ReviewFormData } from '../model/types';
  
  export let productId: string;

  let formData: ReviewFormData = {
    productId,
    rating: 5,
    comment: '',
    authorName: '',
    authorEmail: '',
    type: 'text'
  };

  let validationErrors: Record<string, string> = {};

  // Реактивные переменные
  $: isSubmitting = reviewStore.isSubmitting;
  $: error = reviewStore.error;

  async function handleSubmit() {
    // Сброс ошибок валидации
    validationErrors = {};

    const result = await reviewStore.submitReview(formData);
    
    if (result.success) {
      // Сброс формы при успешной отправке
      formData = {
        productId,
        rating: 5,
        comment: '',
        authorName: '',
        authorEmail: '',
        type: 'text'
      };
      
      // Можно добавить уведомление об успехе
      alert('Отзыв успешно отправлен!');
    }
  }

  function setRating(rating: number) {
    formData.rating = rating;
  }
</script>

<div class="review-form bg-white p-6 rounded-lg shadow-md">
  <h3 class="text-xl font-semibold mb-4">Оставить отзыв</h3>
  
  <form on:submit|preventDefault={handleSubmit} class="space-y-4">
    <!-- Рейтинг -->
    <fieldset class="form-group">
      <legend class="block text-sm font-medium text-gray-700 mb-2">
        Оценка товара
      </legend>
      <div class="flex space-x-1" role="radiogroup" aria-label="Выберите оценку от 1 до 5 звезд">
        {#each [1, 2, 3, 4, 5] as star}
          <button
            type="button"
            class="text-2xl {formData.rating >= star ? 'text-yellow-500' : 'text-gray-300'} hover:text-yellow-400 transition-colors"
            on:click={() => setRating(star)}
            aria-label="Оценка {star} {star === 1 ? 'звезда' : star <= 4 ? 'звезды' : 'звезд'}"
            role="radio"
            aria-checked={formData.rating === star}
          >
            ★
          </button>
        {/each}
      </div>
      {#if validationErrors.rating}
        <p class="text-red-500 text-sm mt-1">{validationErrors.rating}</p>
      {/if}
    </fieldset>

    <!-- Комментарий -->
    <div class="form-group">
      <label for="comment" class="block text-sm font-medium text-gray-700 mb-2">
        Ваш отзыв
      </label>
      <textarea
        id="comment"
        bind:value={formData.comment}
        rows="4"
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        placeholder="Поделитесь своими впечатлениями о товаре..."
        required
      ></textarea>
      {#if validationErrors.comment}
        <p class="text-red-500 text-sm mt-1">{validationErrors.comment}</p>
      {/if}
    </div>

    <!-- Имя автора -->
    <div class="form-group">
      <label for="authorName" class="block text-sm font-medium text-gray-700 mb-2">
        Ваше имя
      </label>
      <input
        type="text"
        id="authorName"
        bind:value={formData.authorName}
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        placeholder="Введите ваше имя"
        required
      />
      {#if validationErrors.authorName}
        <p class="text-red-500 text-sm mt-1">{validationErrors.authorName}</p>
      {/if}
    </div>

    <!-- Email -->
    <div class="form-group">
      <label for="authorEmail" class="block text-sm font-medium text-gray-700 mb-2">
        Email (не будет опубликован)
      </label>
      <input
        type="email"
        id="authorEmail"
        bind:value={formData.authorEmail}
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        placeholder="your@email.com"
        required
      />
      {#if validationErrors.authorEmail}
        <p class="text-red-500 text-sm mt-1">{validationErrors.authorEmail}</p>
      {/if}
    </div>

    <!-- Ошибка отправки -->
    {#if $error}
      <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {$error}
      </div>
    {/if}

    <!-- Кнопка отправки -->
    <button
      type="submit"
      disabled={$isSubmitting}
      class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {$isSubmitting ? 'Отправка...' : 'Отправить отзыв'}
    </button>
  </form>
</div>

<style>
  .review-form {
    max-width: 500px;
  }
</style> 