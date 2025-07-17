<script lang="ts">
  // Пример использования фичи product-review
  import { ReviewForm, ReviewList } from './index';
  
  // ID продукта (обычно получается из роутера)
  export let productId = 'product-1';
</script>

<div class="product-reviews-section">
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-2xl font-bold mb-8 text-center">
      Демонстрация SOLID архитектуры
    </h2>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Список отзывов -->
      <div class="reviews-section">
        <ReviewList {productId} />
      </div>
      
      <!-- Форма добавления отзыва -->
      <div class="form-section">
        <ReviewForm {productId} />
      </div>
    </div>

    <!-- Информационная панель -->
    <div class="info-panel mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-blue-900 mb-4">
        🏗️ Архитектурные особенности этой фичи:
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
        <div class="bg-white p-4 rounded border">
          <h4 class="font-semibold text-blue-800 mb-2">S - Single Responsibility</h4>
          <p class="text-gray-700">Каждый класс отвечает за одну задачу: валидация, API, аналитика</p>
        </div>
        
        <div class="bg-white p-4 rounded border">
          <h4 class="font-semibold text-green-800 mb-2">O - Open/Closed</h4>
          <p class="text-gray-700">Легко добавить новые типы отзывов (видео, фото) без изменения кода</p>
        </div>
        
        <div class="bg-white p-4 rounded border">
          <h4 class="font-semibold text-purple-800 mb-2">L - Liskov Substitution</h4>
          <p class="text-gray-700">Сервисы и HTTP клиенты взаимозаменяемы</p>
        </div>
        
        <div class="bg-white p-4 rounded border">
          <h4 class="font-semibold text-orange-800 mb-2">I - Interface Segregation</h4>
          <p class="text-gray-700">Мелкие интерфейсы для валидации, API, сервисов</p>
        </div>
        
        <div class="bg-white p-4 rounded border">
          <h4 class="font-semibold text-red-800 mb-2">D - Dependency Inversion</h4>
          <p class="text-gray-700">Зависимости через абстракции, легкое тестирование</p>
        </div>
        
        <div class="bg-white p-4 rounded border">
          <h4 class="font-semibold text-gray-800 mb-2">FSD интеграция</h4>
          <p class="text-gray-700">Структура по слоям: model, ui, с четкими границами</p>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .product-reviews-section {
    min-height: 100vh;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  }
</style> 