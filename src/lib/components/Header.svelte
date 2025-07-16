<script lang="ts">
  import { cart, cartCount, cartTotal, cartActions, getItemKey } from '$lib/stores/cart';
  import type { CartItem } from '$lib/types/api';
  import { callbackModalOpen, modalActions } from '$lib/stores/modal.js';
  import { ShoppingCart, Phone, User, Menu, Search, X, Trash2 } from 'lucide-svelte';
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import CallbackModal from './CallbackModal.svelte';
  type Theme = 'light' | 'dark' | 'system';
  let theme: Theme = 'system';
	let showMobileMenu = false;
	let showCatalogMenu = false;
	let showPagesMenu = false;
	let showUserMenu = false;
	let isScrolled = false;
	let showCallbackModal = false;
	
	// Mock user state - in real app this would come from a store
	let isLoggedIn = false;
	let userName = 'Иван Петров';

	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 20;
		};
		
		const handleClickOutside = (event: Event) => {
			const target = event.target as Element;
			if (!target.closest('.dropdown')) {
				showCatalogMenu = false;
				showPagesMenu = false;
				showUserMenu = false;
			}
		};
		
		window.addEventListener('scroll', handleScroll);
		document.addEventListener('click', handleClickOutside);
		
		return () => {
			window.removeEventListener('scroll', handleScroll);
			document.removeEventListener('click', handleClickOutside);
		};
	});
  // Инициализация темы при загрузке
  onMount(() => {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null;
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      theme = saved;
    }
    applyTheme(theme);
  });

  function applyTheme(t: Theme) {
    const root = document.documentElement;
    if (t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }

  function setTheme(t: Theme) {
    theme = t;
    if (typeof localStorage !== 'undefined') localStorage.setItem('theme', t);
    applyTheme(t);
  }
  
  let mobileMenuOpen = false;
  let isSticky = false;
  let searchQuery = '';

  onMount(() => {
    const handleScroll = () => {
      isSticky = window.scrollY > 100;
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  
  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
  
  function openCallbackModal() {
    modalActions.openCallbackModal();
  }
  
  function closeCallbackModal() {
    modalActions.closeCallbackModal();
  }

  function removeFromCart(item: CartItem) {
    const itemKey = getItemKey(item);
    cartActions.removeItem(itemKey);
  }

  function updateCartQuantity(item: CartItem, newQuantity: number) {
    const itemKey = getItemKey(item);
    if (newQuantity <= 0) {
      cartActions.removeItem(itemKey);
    } else {
      cartActions.updateQuantity(itemKey, newQuantity);
    }
  }

  // Функция для получения названия опции
  function getOptionName(item: CartItem, optionType: string): string {
    if (!item.options || !item.selectedOptions) return '';
    
    const optionId = item.selectedOptions[optionType];
    const option = item.options[optionType]?.find(opt => opt.id === optionId);
    return option?.name || (optionId ? String(optionId) : '');
  }
</script>

<header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5' : 'bg-transparent'}">
	<!-- Top contact bar -->
	<div class="bg-gray-800 text-white py-2.5 text-sm">
		<div class="container mx-auto px-4 md:px-6 lg:px-8">
			<div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
				<!-- Contact info -->
				<div class="flex flex-col sm:flex-row sm:items-center gap-4">
					<a href="tel:+78001234567" class="flex items-center space-x-2 hover:text-gray-300 transition-colors">
						<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
							<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
						</svg>
						<span>8 (800) 123-45-67</span>
					</a>
					<a href="mailto:info@filterpro.ru" class="flex items-center space-x-2 hover:text-gray-300 transition-colors">
						<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
							<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
							<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
						</svg>
						<span>info@filterpro.ru</span>
					</a>
				</div>
				
				<!-- User account -->
				<div class="flex items-center space-x-4">
					{#if isLoggedIn}
						<!-- Logged in user -->
						<div class="relative dropdown">
							<button 
								on:click={() => showUserMenu = !showUserMenu}
								class="flex items-center space-x-2 hover:text-gray-300 transition-colors"
								aria-label="Аккаунт пользователя"
							>
								<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
								</svg>
								<span>{userName}</span>
								<svg class="w-3 h-3 transform transition-transform duration-200 {showUserMenu ? 'rotate-180' : 'rotate-0'}" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
								</svg>
							</button>
							
							{#if showUserMenu}
								<div class="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 text-gray-700">
									<a href="/profile" class="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors">
										<svg class="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
											<path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
										</svg>
										<span>Мой профиль</span>
									</a>
									<a href="/orders" class="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors">
										<svg class="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
											<path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
										</svg>
										<span>Мои заказы</span>
									</a>
									<a href="/favorites" class="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors">
										<svg class="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
											<path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
										</svg>
										<span>Избранное</span>
									</a>
									<hr class="my-2 border-gray-200"/>
									<button 
										on:click={() => isLoggedIn = false}
										class="flex items-center space-x-3 px-4 py-3 w-full text-left hover:bg-red-50 hover:text-red-600 transition-colors"
									>
										<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
											<path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"/>
										</svg>
										<span>Выйти</span>
									</button>
								</div>
							{/if}
						</div>
					{:else}
						<!-- Login/Register links -->
						<div class="flex items-center space-x-4">
							<button 
								on:click={() => isLoggedIn = true}
								class="flex items-center space-x-1 hover:text-gray-300 transition-colors"
							>
								<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clip-rule="evenodd"/>
								</svg>
								<span>Вход</span>
							</button>
							<span class="text-slate-300">|</span>
							<a href="/register" class="hover:text-gray-300 transition-colors">
								Регистрация
							</a>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<!-- Main header -->
	<div class="relative">
		<div class="container mx-auto px-4 md:px-6 lg:px-8">
			<div class="flex items-center justify-between h-20">
				<!-- Logo -->
				<div class="flex items-center">
					<a href="/" class="group flex items-center">
						<img 
							src="/images/logo/logo-dark.png" 
							alt="FilterPro - Промышленные фильтры" 
							class="h-12 w-auto transform group-hover:scale-105 transition-all duration-300"
						/>
					</a>
				</div>

				<!-- Center Navigation -->
				<nav class="hidden lg:flex items-center space-x-1">
					<!-- Catalog dropdown -->
					<div class="relative dropdown">
						<button 
							on:click={() => showCatalogMenu = !showCatalogMenu}
							class="flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 group"
							aria-label="Открыть каталог"
						>
							<svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
								<path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
							</svg>
							<span>Каталог</span>
							<svg class="w-4 h-4 transform transition-transform duration-200 {showCatalogMenu ? 'rotate-180' : 'rotate-0'}" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
							</svg>
						</button>
						
						{#if showCatalogMenu}
							<div class="absolute top-full left-0 mt-2 w-96 bg-white rounded-2xl shadow-xl border border-gray-100 py-6 z-50">
								<div class="px-6 pb-4 border-b border-gray-100">
									<h3 class="text-lg font-bold text-gray-900">Продукция</h3>
									<p class="text-sm text-gray-500 mt-1">Профессиональные решения фильтрации</p>
								</div>
								<div class="px-6 py-4 grid grid-cols-1 gap-2">
									<a href="/catalog/filtroelements" class="group flex items-center space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-200">
										<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform">
											<svg class="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
												<path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
											</svg>
										</div>
										<div class="flex-1">
											<div class="font-semibold text-gray-900 group-hover:text-gray-700">Фильтроэлементы</div>
											<div class="text-sm text-gray-500">Аналоги PALL, Atlas Copco, собственного производства</div>
											<div class="text-xs text-gray-600 font-medium mt-1">5 позиций</div>
										</div>
									</a>
									<a href="/catalog/filterholders" class="group flex items-center space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-200">
										<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform">
											<svg class="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
												<path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
											</svg>
										</div>
										<div class="flex-1">
											<div class="font-semibold text-gray-900 group-hover:text-gray-700">Фильтродержатели</div>
											<div class="text-sm text-gray-500">Корпуса для жидкостей и газов</div>
											<div class="text-xs text-gray-600 font-medium mt-1">2 позиции</div>
										</div>
									</a>
									<a href="/catalog/equipment" class="group flex items-center space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-200">
										<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform">
											<svg class="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
												<path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
											</svg>
										</div>
										<div class="flex-1">
											<div class="font-semibold text-gray-900 group-hover:text-gray-700">Дополнительное оборудование</div>
											<div class="text-sm text-gray-500">Адаптеры, соединения, КИП</div>
											<div class="text-xs text-gray-600 font-medium mt-1">3 позиции</div>
										</div>
									</a>
								</div>
								<div class="px-6 pt-4 border-t border-gray-100">
									<a href="/catalog" class="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105">
										📋 Весь каталог
									</a>
								</div>
							</div>
						{/if}
					</div>

					<a href="/about" class="px-4 py-2.5 rounded-xl font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200">
						О нас
					</a>
					<a href="/certificates" class="px-4 py-2.5 rounded-xl font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200">
						Сертификаты
					</a>
					
					<!-- Pages dropdown -->
					<div class="relative dropdown">
						<button 
							on:click={() => showPagesMenu = !showPagesMenu}
							class="flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 group"
							aria-label="Страницы"
						>
							<span>Страницы</span>
							<svg class="w-4 h-4 transform transition-transform duration-200 {showPagesMenu ? 'rotate-180' : 'rotate-0'}" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
							</svg>
						</button>
						
						{#if showPagesMenu}
							<div class="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
								<a href="/delivery" class="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors">
									<svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
										<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
									</svg>
									<span>Доставка</span>
								</a>
								<a href="/contacts" class="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors">
									<svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
										<path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
										<path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z"/>
									</svg>
									<span>Контакты</span>
								</a>
							</div>
						{/if}
					</div>
				</nav>

				<!-- Right actions -->
				<div class="flex items-center space-x-3">
					<!-- Search -->
					<div class="hidden md:block relative">
						<input 
							type="text"
							placeholder="Поиск..."
							class="w-64 pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
						/>
						<svg class="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" aria-label="Поиск">
							<path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
						</svg>
					</div>



					<!-- Cart -->
					<a href="/cart" class="relative p-2.5 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
						<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" aria-label="Корзина">
							<path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
						</svg>
						<span class="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">3</span>
					</a>

					<!-- CTA Button -->
					<button 
						on:click|stopPropagation={openCallbackModal}
						class="hidden sm:block bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white px-4 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 -mr-2"
					>
						Заказать звонок
					</button>

					<!-- Mobile menu toggle -->
					<button 
						on:click={() => showMobileMenu = !showMobileMenu}
						class="lg:hidden p-2.5 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
						aria-label="Меню"
					>
						<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Mobile menu -->
	{#if showMobileMenu}
		<div class="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-xl">
			<div class="container mx-auto px-4 py-6">
				<!-- Mobile search -->
				<div class="mb-6">
					<div class="relative">
						<input 
							type="text"
							placeholder="Поиск продукции..."
							class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<svg class="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" aria-label="Поиск">
							<path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
						</svg>
					</div>
				</div>

				<!-- Mobile navigation -->
				<nav class="space-y-2">
					<a href="/catalog" class="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-100 text-gray-900 font-medium transition-all duration-200">
						<svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
							<path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
						</svg>
						<span>Каталог продукции</span>
					</a>
					<a href="/solutions" class="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-100 text-gray-900 font-medium transition-all duration-200">
						<svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
						</svg>
						<span>Решения</span>
					</a>
					<a href="/about" class="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-100 text-gray-900 font-medium transition-all duration-200">
						<svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
						</svg>
						<span>О компании</span>
					</a>
					<a href="/contacts" class="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-100 text-gray-900 font-medium transition-all duration-200">
						<svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
							<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
						</svg>
						<span>Контакты</span>
					</a>
					<a href="/delivery-payment" class="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-100 text-gray-900 font-medium transition-all duration-200">
						<svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
							<path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
							<path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z"/>
						</svg>
						<span>Доставка и оплата</span>
					</a>
				</nav>

				<!-- Mobile CTA -->
				<div class="mt-6 pt-6 border-t border-gray-200">
					<button 
						on:click|stopPropagation={openCallbackModal}
						class="w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white py-4 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
					>
						Заказать звонок
					</button>
				</div>
			</div>
		</div>
	{/if}
</header>

<!-- Spacer to prevent content from hiding under fixed header -->
<div class="h-32"></div>

<!-- Callback Modal -->
<CallbackModal bind:isOpen={showCallbackModal} /> 