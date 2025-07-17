<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { Package, Eye, ShoppingCart, Calendar, CreditCard, Truck, CheckCircle, Clock, XCircle } from 'lucide-svelte';

  interface OrderItem {
    id: number;
    title: string;
    image: string;
    price: number;
    quantity: number;
  }

  interface Order {
    id: number;
    number: string;
    date: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    total: number;
    items: OrderItem[];
    address: string;
    paymentMethod: string;
    estimatedDelivery?: string;
  }

  let orders: Order[] = [];
  let loading = true;
  let selectedStatus = 'all';

  const statusLabels = {
    pending: 'Ожидает подтверждения',
    processing: 'В обработке',
    shipped: 'Отправлен',
    delivered: 'Доставлен',
    cancelled: 'Отменен'
  };

  const statusIcons = {
    pending: Clock,
    processing: Package,
    shipped: Truck,
    delivered: CheckCircle,
    cancelled: XCircle
  };

  const statusColors = {
    pending: 'text-yellow-600 bg-yellow-50',
    processing: 'text-blue-600 bg-blue-50',
    shipped: 'text-purple-600 bg-purple-50',
    delivered: 'text-green-600 bg-green-50',
    cancelled: 'text-red-600 bg-red-50'
  };

  // Загрузка заказов при монтировании
  onMount(() => {
    loadOrders();
  });

  async function loadOrders() {
    try {
      // Имитация загрузки заказов с API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Мокаем данные заказов
      orders = [
        {
          id: 1,
          number: 'ORD-2024-001',
          date: '2024-01-15',
          status: 'delivered',
          total: 145000,
          address: 'г. Москва, ул. Ленина, д. 10, кв. 5',
          paymentMethod: 'Банковская карта',
          items: [
            {
              id: 1,
              title: 'Фильтр микронной очистки MF-100',
              image: '/img/production-img-1.jpg',
              price: 85000,
              quantity: 1
            },
            {
              id: 2,
              title: 'Мембранный элемент RO-75',
              image: '/img/production-img-2.jpg',
              price: 60000,
              quantity: 1
            }
          ]
        },
        {
          id: 2,
          number: 'ORD-2024-002',
          date: '2024-01-20',
          status: 'shipped',
          total: 75000,
          address: 'г. Санкт-Петербург, пр. Невский, д. 50',
          paymentMethod: 'Наличными при получении',
          estimatedDelivery: '2024-01-25',
          items: [
            {
              id: 3,
              title: 'Ультрафильтрационная мембрана UF-50',
              image: '/img/production-img-3.jpg',
              price: 75000,
              quantity: 1
            }
          ]
        },
        {
          id: 3,
          number: 'ORD-2024-003',
          date: '2024-01-22',
          status: 'processing',
          total: 120000,
          address: 'г. Екатеринбург, ул. Мира, д. 25',
          paymentMethod: 'Банковский перевод',
          estimatedDelivery: '2024-01-30',
          items: [
            {
              id: 4,
              title: 'Система обратного осмоса RO-200',
              image: '/images/filter1.jpg',
              price: 120000,
              quantity: 1
            }
          ]
        },
        {
          id: 4,
          number: 'ORD-2024-004',
          date: '2024-01-23',
          status: 'pending',
          total: 45000,
          address: 'г. Новосибирск, ул. Красный проспект, д. 15',
          paymentMethod: 'Банковская карта',
          items: [
            {
              id: 5,
              title: 'Картридж предварительной очистки PP-10',
              image: '/images/filter2.jpg',
              price: 15000,
              quantity: 3
            }
          ]
        }
      ];
    } catch (error) {
      console.error('Ошибка загрузки заказов:', error);
    } finally {
      loading = false;
    }
  }

  // Фильтрация заказов по статусу
  $: filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  function viewOrderDetails(orderId: number) {
    // В реальном приложении можно перейти на детальную страницу заказа
    console.log('Просмотр заказа:', orderId);
  }

  function reorderItems(order: Order) {
    // Логика повторного заказа
    console.log('Повторный заказ:', order.items);
    goto('/cart');
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
</script>

<svelte:head>
  <title>Мои заказы - Микрофильтрация</title>
  <meta name="description" content="История заказов и отслеживание доставки оборудования для микрофильтрации" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <!-- Заголовок страницы -->
  <div class="flex items-center gap-3 mb-8">
    <Package class="w-8 h-8 text-sky-600" />
    <h1 class="text-3xl font-bold text-gray-900">Мои заказы</h1>
  </div>

  {#if loading}
    <!-- Loader -->
    <div class="flex justify-center items-center min-h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
    </div>
  {:else if orders.length === 0}
    <!-- Нет заказов -->
    <div class="text-center py-16">
      <Package class="w-24 h-24 text-gray-300 mx-auto mb-6" />
      <h2 class="text-2xl font-semibold text-gray-600 mb-4">У вас пока нет заказов</h2>
      <p class="text-gray-500 mb-8 max-w-md mx-auto">
        Начните делать покупки в нашем каталоге качественного оборудования для микрофильтрации
      </p>
      <button
        on:click={() => goto('/catalog')}
        class="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
      >
        Перейти в каталог
      </button>
    </div>
  {:else}
    <!-- Фильтры по статусу -->
    <div class="mb-8">
      <div class="flex flex-wrap gap-2">
        <button
          on:click={() => selectedStatus = 'all'}
          class="px-4 py-2 rounded-lg font-medium transition-colors {selectedStatus === 'all' 
            ? 'bg-sky-600 text-white' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
        >
          Все заказы ({orders.length})
        </button>
        {#each Object.entries(statusLabels) as [status, label]}
          {@const count = orders.filter(order => order.status === status).length}
          {#if count > 0}
            <button
              on:click={() => selectedStatus = status}
              class="px-4 py-2 rounded-lg font-medium transition-colors {selectedStatus === status 
                ? 'bg-sky-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
            >
              {label} ({count})
            </button>
          {/if}
        {/each}
      </div>
    </div>

    <!-- Список заказов -->
    <div class="space-y-6">
      {#each filteredOrders as order (order.id)}
        <div class="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <!-- Заголовок заказа -->
          <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="flex items-center gap-4">
                <div>
                  <h3 class="font-semibold text-gray-900">Заказ {order.number}</h3>
                  <div class="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar class="w-4 h-4" />
                    {formatDate(order.date)}
                  </div>
                </div>
                <!-- Статус заказа -->
                <div class="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium {statusColors[order.status]}">
                  <svelte:component this={statusIcons[order.status]} class="w-4 h-4" />
                  {statusLabels[order.status]}
                </div>
              </div>
              <div class="text-right">
                <div class="text-xl font-bold text-gray-900">{order.total.toLocaleString()} ₽</div>
                {#if order.estimatedDelivery && order.status === 'shipped'}
                  <div class="text-sm text-gray-600">Доставка до {formatDate(order.estimatedDelivery)}</div>
                {/if}
              </div>
            </div>
          </div>

          <!-- Товары в заказе -->
          <div class="p-6">
            <div class="space-y-4">
              {#each order.items as item (item.id)}
                <div class="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    class="w-16 h-16 object-cover rounded-lg"
                  />
                  <div class="flex-1">
                    <h4 class="font-medium text-gray-900">{item.title}</h4>
                    <div class="text-sm text-gray-600">
                      Количество: {item.quantity} шт. × {item.price.toLocaleString()} ₽
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="font-semibold text-gray-900">
                      {(item.price * item.quantity).toLocaleString()} ₽
                    </div>
                  </div>
                </div>
              {/each}
            </div>

            <!-- Информация о доставке и оплате -->
            <div class="mt-6 pt-6 border-t border-gray-200">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 class="font-medium text-gray-900 mb-1">Адрес доставки:</h5>
                  <p class="text-gray-600">{order.address}</p>
                </div>
                <div>
                  <h5 class="font-medium text-gray-900 mb-1">Способ оплаты:</h5>
                  <div class="flex items-center gap-2 text-gray-600">
                    <CreditCard class="w-4 h-4" />
                    {order.paymentMethod}
                  </div>
                </div>
              </div>
            </div>

            <!-- Действия -->
            <div class="mt-6 flex flex-wrap gap-3">
              <button
                on:click={() => viewOrderDetails(order.id)}
                class="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
              >
                <Eye class="w-4 h-4" />
                Подробнее
              </button>
              {#if order.status === 'delivered'}
                <button
                  on:click={() => reorderItems(order)}
                  class="flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium transition-colors"
                >
                  <ShoppingCart class="w-4 h-4" />
                  Заказать снова
                </button>
              {/if}
              {#if order.status === 'shipped'}
                <button
                  class="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                >
                  <Truck class="w-4 h-4" />
                  Отследить
                </button>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>

    {#if filteredOrders.length === 0}
      <div class="text-center py-12">
        <Package class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-gray-600 mb-2">Заказов с таким статусом нет</h3>
        <p class="text-gray-500">Выберите другой фильтр или сделайте новый заказ</p>
      </div>
    {/if}

    <!-- Полезные ссылки -->
    <div class="mt-12 bg-gray-50 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Полезная информация</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          on:click={() => goto('/delivery')}
          class="text-left p-4 bg-white rounded-lg border border-gray-200 hover:border-sky-300 transition-colors"
        >
          <Truck class="w-6 h-6 text-sky-600 mb-2" />
          <h4 class="font-medium text-gray-900">Условия доставки</h4>
          <p class="text-sm text-gray-600">Информация о сроках и стоимости</p>
        </button>
        <button
          on:click={() => goto('/contacts')}
          class="text-left p-4 bg-white rounded-lg border border-gray-200 hover:border-sky-300 transition-colors"
        >
          <Package class="w-6 h-6 text-sky-600 mb-2" />
          <h4 class="font-medium text-gray-900">Поддержка</h4>
          <p class="text-sm text-gray-600">Связаться с менеджером</p>
        </button>
        <button
          on:click={() => goto('/catalog')}
          class="text-left p-4 bg-white rounded-lg border border-gray-200 hover:border-sky-300 transition-colors"
        >
          <ShoppingCart class="w-6 h-6 text-sky-600 mb-2" />
          <h4 class="font-medium text-gray-900">Каталог</h4>
          <p class="text-sm text-gray-600">Продолжить покупки</p>
        </button>
      </div>
    </div>
  {/if}
</div> 