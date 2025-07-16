<script lang="ts">
  import { cart, cartActions, cartTotal, cartCount, getItemKey, type CartItem } from '$lib/stores/cart';
  import { Trash2, Plus, Minus, ShoppingCart, AlertTriangle } from 'lucide-svelte';
  import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
  
  export let data: any;
  
  $: ({ page } = data);
  
  let showEmptyCart = false;
  let showDeleteConfirm = false;
  let showClearConfirm = false;
  let itemToDelete: CartItem | null = null;
  
  function updateQuantity(item: CartItem, newQuantity: number): void {
    if (newQuantity <= 0) {
      // Показываем подтверждение удаления
      itemToDelete = item;
      showDeleteConfirm = true;
    } else {
      const itemKey = getItemKey(item);
      cartActions.updateQuantity(itemKey, newQuantity);
    }
  }

  function confirmDelete(): void {
    if (itemToDelete) {
      const itemKey = getItemKey(itemToDelete);
      cartActions.removeItem(itemKey);
    }
    showDeleteConfirm = false;
    itemToDelete = null;
  }

  function cancelDelete(): void {
    showDeleteConfirm = false;
    itemToDelete = null;
  }
  
  function removeItem(item: CartItem): void {
    const itemKey = getItemKey(item);
    cartActions.removeItem(itemKey);
  }
  
  function clearCart(): void {
    showClearConfirm = true;
  }

  function confirmClearCart(): void {
    cartActions.clearCart();
    showClearConfirm = false;
  }

  function cancelClearCart(): void {
    showClearConfirm = false;
  }
  
  // Функция для получения названия опции
  function getOptionName(item: CartItem, optionType: string): string {
    if (!item.options || !item.selectedOptions) return '';
    
    const optionId = item.selectedOptions[optionType];
    if (!optionId) return '';
    
    const option = item.options[optionType]?.find((opt: any) => opt.id === optionId);
    return option?.name || optionId;
  }

  // Функция для отображения опций в корзине
  function getOptionDisplayName(item: CartItem, optionType: string): string {
    if (!item.selectedOptions || !item.selectedOptions[optionType]) return '';
    
    const optionId = item.selectedOptions[optionType];
    
    // Если есть полная информация об опциях, используем её
    if (item.options && item.options[optionType]) {
      const option = item.options[optionType].find((opt: any) => opt.id === optionId);
      return option?.name || optionId;
    }
    
    // Иначе просто показываем ID опции
    return optionId;
  }
  
  $: showEmptyCart = $cart.length === 0;
  
</script>

<svelte:head>
  <!-- Page-specific SEO -->
  <title>{page.title}</title>
  <meta name="description" content={page.description} />
  <meta name="keywords" content={page.keywords} />
  
  <!-- No-index for cart page -->
  <meta name="robots" content="noindex, nofollow" />
  
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
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <div class="mb-8">
    <h1 class="text-3xl font-bold text-gray-900">Корзина</h1>
    <Breadcrumbs breadcrumbs={[{ name: 'Корзина', url: '/cart' }]} />
  </div>

  {#if showEmptyCart}
    <!-- Empty Cart -->
    <div class="text-center py-12">
      <div class="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
        <ShoppingCart class="w-12 h-12 text-gray-400" />
      </div>
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">Корзина пуста</h2>
      <p class="text-gray-600 mb-8">Добавьте товары в корзину, чтобы оформить заказ</p>
      <a href="/catalog" class="btn-primary">
        Перейти в каталог
      </a>
    </div>
  {:else}
    <!-- Cart Items -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg shadow-md">
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-semibold text-gray-900">Товары в корзине ({$cart.length})</h2>
              <button
                on:click={clearCart}
                class="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Очистить корзину
              </button>
            </div>
          </div>
          
          <div class="divide-y divide-gray-200">
            
            {#each $cart as item, index}
              <div class="p-6">
                <div class="flex items-center space-x-4">
                  <!-- Product Image -->
                  <div class="flex-shrink-0">
                    <img
                      src={item.images?.[0] || '/img/placeholder.jpg'}
                      alt={item.title}
                      class="w-16 h-16 object-cover rounded-lg"
                    />
                  </div>
                  
                  <!-- Product Info -->
                  <div class="flex-1 min-w-0">
                    <h3 class="text-lg font-medium text-gray-900 mb-1">
                      <a href={`/product/${item.id}`} class="hover:text-primary-600 transition-colors">
                        {item.title}
                      </a>
                    </h3>
                    <p class="text-sm text-gray-600 line-clamp-2 mb-2">
                      {item.description}
                    </p>
                    
                    <!-- Опции товара -->
                    {#if item.selectedOptions && Object.keys(item.selectedOptions).length > 0}
                      <div class="text-xs text-gray-500 space-y-1">
                        {#if item.selectedOptions.adapter}
                          <div>Адаптер: {getOptionDisplayName(item, 'adapter')}</div>
                        {/if}
                        {#if item.selectedOptions.height}
                          <div>Высота: {getOptionDisplayName(item, 'height')}</div>
                        {/if}
                        {#if item.selectedOptions.rating}
                          <div>Рейтинг: {getOptionDisplayName(item, 'rating')}</div>
                        {/if}
                      </div>
                    {/if}
                  </div>
                  
                  <!-- Quantity Controls -->
                  <div class="flex items-center space-x-2">
                    <button
                      on:click={() => updateQuantity(item, item.quantity - 1)}
                      class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Minus class="w-4 h-4 text-gray-600" />
                    </button>
                    <span class="w-12 text-center font-medium">{item.quantity}</span>
                    <button
                      on:click={() => updateQuantity(item, item.quantity + 1)}
                      class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Plus class="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  
                  <!-- Price -->
                  <div class="text-right">
                    <div class="text-lg font-semibold text-gray-900">
                      {(item.totalPrice || (item.price * item.quantity)).toLocaleString()} руб.
                    </div>
                    <div class="text-sm text-gray-500">
                      {(item.totalPrice ? item.totalPrice / item.quantity : item.price).toLocaleString()} руб. за шт.
                    </div>
                  </div>
                  
                  <!-- Remove Button -->
                  <button
                    on:click={() => removeItem(item)}
                    class="text-red-600 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                    title="Удалить товар"
                  >
                    <Trash2 class="w-5 h-5" />
                  </button>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
      
      <!-- Order Summary -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Итого заказа</h3>
          
          <div class="space-y-3 mb-6">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Товары ({$cart.length}):</span>
              <span class="font-medium">{$cartTotal.toLocaleString()} руб.</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Доставка:</span>
              <span class="font-medium text-green-600">Бесплатно</span>
            </div>
            <div class="border-t border-gray-200 pt-3">
              <div class="flex justify-between text-lg font-semibold">
                <span>Итого:</span>
                <span>{$cartTotal.toLocaleString()} руб.</span>
              </div>
            </div>
          </div>
          
          <button class="w-full btn-primary py-3 text-lg font-medium">
            Оформить заказ
          </button>
          
          <div class="mt-4 text-center">
            <a href="/catalog" class="text-primary-600 hover:text-primary-700 text-sm">
              Продолжить покупки
            </a>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<!-- Модальное окно подтверждения удаления -->
{#if showDeleteConfirm}
  <div 
    role="dialog"
    aria-modal="true"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    on:click={cancelDelete}
    aria-label="Закрыть модальное окно"
    style="all: unset; display: flex; position: fixed; inset: 0; background: rgba(0,0,0,0.5); align-items: center; justify-content: center; z-index: 50; padding: 1rem;"
    tabindex="0"
    on:keydown={(e) => { if (e.key === 'Escape' || e.key === 'Enter') cancelDelete(); }}
  >
    <div 
      class="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
      on:click|stopPropagation
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-confirm-title"
      aria-hidden="true"
    >
      <div class="flex items-center space-x-3 mb-4">
        <div class="flex-shrink-0">
          <AlertTriangle class="w-6 h-6 text-red-500" />
        </div>
        <h3 id="delete-confirm-title" class="text-lg font-semibold text-gray-900">
          Подтверждение удаления
        </h3>
      </div>
      
      <p class="text-gray-600 mb-6">
        Вы согласны удалить товар <strong>"{itemToDelete?.title}"</strong> из корзины?
      </p>
      
      <div class="flex space-x-3">
        <button
          on:click={cancelDelete}
          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Отмена
        </button>
        <button
          on:click={confirmDelete}
          class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Удалить
        </button>
      </div>
    </div>
  </div>
{/if}

<!-- Модальное окно подтверждения очистки корзины -->
{#if showClearConfirm}
  <div 
    role="dialog"
    aria-modal="true"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    on:click={cancelClearCart}
    aria-label="Закрыть модальное окно"
    style="all: unset; display: flex; position: fixed; inset: 0; background: rgba(0,0,0,0.5); align-items: center; justify-content: center; z-index: 50; padding: 1rem;"
    tabindex="0"
    on:keydown={(e) => { if (e.key === 'Escape' || e.key === 'Enter') cancelClearCart(); }}
  >
    <div 
      class="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
      on:click|stopPropagation
      role="dialog"
      aria-modal="true"
      aria-labelledby="clear-confirm-title"
      aria-hidden="true"
    >
      <div class="flex items-center space-x-3 mb-4">
        <div class="flex-shrink-0">
          <AlertTriangle class="w-6 h-6 text-red-500" />
        </div>
        <h3 id="clear-confirm-title" class="text-lg font-semibold text-gray-900">
          Подтверждение очистки
        </h3>
      </div>
      
      <p class="text-gray-600 mb-6">
        Вы уверены, что хотите очистить всю корзину? Это действие нельзя отменить.
      </p>
      
      <div class="flex space-x-3">
        <button
          on:click={cancelClearCart}
          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Отмена
        </button>
        <button
          on:click={confirmClearCart}
          class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Очистить корзину
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-clamp: 2;
  }
</style> 