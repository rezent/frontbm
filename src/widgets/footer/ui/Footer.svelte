<script lang="ts">
  import { Phone, Mail, MapPin } from 'lucide-svelte';

  function openCallbackModal() {
    // TODO: Интеграция с модалкой обратного звонка
    console.log('Callback modal should open');
  }
</script>

<footer class="bg-gray-900 text-white">
  <div class="container mx-auto px-4 py-12">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <!-- Company Info -->
      <div class="space-y-4">
        <a href="/" class="inline-block">
          <img src="/images/logo/logo-white.png" alt="Логотип" class="h-12 w-auto" />
        </a>
        <p class="text-gray-400 text-sm">
          ООО «БМ ФИЛЬТР» - Российский производитель современных, качественных фильтроэлементов,
          фильтродержателей и фильтрационных установок.
        </p>
        <div class="flex space-x-4">
          <button class="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
              />
            </svg>
          </button>
          <button class="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"
              />
            </svg>
          </button>
          <button class="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Quick Links -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Быстрые ссылки</h3>
        <ul class="space-y-2">
          <li>
            <a href="/about" class="text-gray-400 hover:text-white transition-colors">О компании</a>
          </li>
          <li>
            <a href="/catalog" class="text-gray-400 hover:text-white transition-colors">Каталог</a>
          </li>
          <li>
            <a href="/delivery" class="text-gray-400 hover:text-white transition-colors"
              >Доставка и оплата</a
            >
          </li>
          <li>
            <a href="/certificates" class="text-gray-400 hover:text-white transition-colors"
              >Сертификаты</a
            >
          </li>
          <li>
            <a href="/contacts" class="text-gray-400 hover:text-white transition-colors">Контакты</a
            >
          </li>
        </ul>
      </div>

      <!-- Contact Info -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Контакты</h3>
        <div class="space-y-3">
          <div class="flex items-center space-x-3">
            <Phone class="w-5 h-5 text-sky-400" />
            <div>
              <p class="text-sm">8 800 700 85 73</p>
              <p class="text-sm">8 495 797 13 37</p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <Mail class="w-5 h-5 text-sky-400" />
            <span class="text-sm">info@tradeof.ru</span>
          </div>
          <div class="flex items-center space-x-3">
            <MapPin class="w-5 h-5 text-sky-400" />
            <span class="text-sm">г. Обнинск, Россия</span>
          </div>
        </div>
      </div>

      <!-- Payment Methods -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Способы оплаты</h3>
        <div class="grid grid-cols-2 gap-2">
          <div class="bg-gray-800 p-2 rounded text-center">
            <span class="text-xs">Visa</span>
          </div>
          <div class="bg-gray-800 p-2 rounded text-center">
            <span class="text-xs">MasterCard</span>
          </div>
          <div class="bg-gray-800 p-2 rounded text-center">
            <span class="text-xs">Maestro</span>
          </div>
          <div class="bg-gray-800 p-2 rounded text-center">
            <span class="text-xs">Visa Electron</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Footer -->
    <div class="border-t border-gray-800 mt-8 pt-8">
      <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div class="text-sm text-gray-400">
          <p>© 2015-2024. Группа Компаний ООО "БМ ФИЛЬТР" и ИП Багдасаров М.А.</p>
          <p>Все права защищены.</p>
        </div>
        <div class="text-sm text-gray-400">
          <button on:click={openCallbackModal} class="hover:text-white transition-colors"
            >Обратная связь</button
          >
        </div>
      </div>
    </div>
  </div>
</footer> 