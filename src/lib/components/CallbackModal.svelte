<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	
	export let isOpen = false;
	
	const dispatch = createEventDispatcher();
	
	let formData = {
		name: '',
		phone: '',
		email: '',
		description: ''
	};
	
	let errors: Record<string, string> = {};
	let isSubmitting = false;
	let isSuccess = false;
	let nameInput: HTMLInputElement;
	
	// Устанавливаем фокус на поле имени при открытии модалки
	$: if (isOpen && nameInput) {
		setTimeout(() => {
			nameInput.focus();
		}, 100); // Небольшая задержка для корректной анимации
	}
	
	function validateForm() {
		errors = {};
		
		// Проверка имени (обязательное)
		if (!formData.name.trim()) {
			errors.name = 'Имя обязательно для заполнения';
		}
		
		// Проверка что заполнен хотя бы номер или почта
		const hasPhone = formData.phone.trim().length > 0;
		const hasEmail = formData.email.trim().length > 0;
		
		if (!hasPhone && !hasEmail) {
			errors.contact = 'Укажите номер телефона или email для связи';
		}
		
		// Валидация email если заполнен
		if (hasEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			errors.email = 'Введите корректный email адрес';
		}
		
		// Валидация телефона если заполнен
		if (hasPhone && !/^[\+]?[0-9\s\-\(\)]{10,}$/.test(formData.phone)) {
			errors.phone = 'Введите корректный номер телефона';
		}
		
		return Object.keys(errors).length === 0;
	}
	
	async function handleSubmit() {
		if (!validateForm()) {
			return;
		}
		
		isSubmitting = true;
		
		try {
			// Имитация отправки формы
			await new Promise(resolve => setTimeout(resolve, 1500));
			
			console.log('Отправка формы:', formData);
			isSuccess = true;
			
			// Закрываем модалку через 2 секунды
			setTimeout(() => {
				closeModal();
			}, 2000);
			
		} catch (error) {
			console.error('Ошибка отправки:', error);
		} finally {
			isSubmitting = false;
		}
	}
	
	function closeModal() {
		isOpen = false;
		isSuccess = false;
		formData = { name: '', phone: '', email: '', description: '' };
		errors = {};
		dispatch('close');
	}
	
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeModal();
		}
	}
	
	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			closeModal();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
	<div 
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
		on:click={handleBackdropClick}
		on:keydown={handleKeydown}
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title"
		tabindex="-1"
	>
		<div class="relative w-full max-w-md bg-white rounded-2xl shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300">
			<!-- Закрытие -->
			<button 
				on:click={closeModal}
				class="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
				aria-label="Закрыть"
			>
				<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
				</svg>
			</button>

			{#if isSuccess}
				<!-- Сообщение об успехе -->
				<div class="p-8 text-center">
					<div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
						</svg>
					</div>
					<h3 class="text-xl font-bold text-gray-900 mb-2">Заявка отправлена!</h3>
					<p class="text-gray-600">Мы свяжемся с вами в ближайшее время</p>
				</div>
			{:else}
				<!-- Форма -->
				<div class="p-6">
					<div class="text-center mb-6">
						<h2 id="modal-title" class="text-2xl font-bold text-gray-900 mb-2">Заказать звонок</h2>
						<p class="text-gray-600">Мы свяжемся с вами в течение 15 минут</p>
					</div>

					<form on:submit|preventDefault={handleSubmit} class="space-y-4">
						<!-- Имя -->
						<div>
							<label for="name" class="block text-sm font-semibold text-gray-700 mb-2">
								Ваше имя <span class="text-red-500">*</span>
							</label>
							<input
								id="name"
								type="text"
								bind:value={formData.name}
								bind:this={nameInput}
								placeholder="Введите ваше имя"
								class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 {errors.name ? 'border-red-300 bg-red-50' : ''}"
								disabled={isSubmitting}
							/>
							{#if errors.name}
								<p class="text-red-500 text-sm mt-1">{errors.name}</p>
							{/if}
						</div>

						<!-- Контактная информация -->
						<div class="space-y-4">
							<div>
								<label for="phone" class="block text-sm font-semibold text-gray-700 mb-2">
									Номер телефона
								</label>
								<input
									id="phone"
									type="tel"
									bind:value={formData.phone}
									placeholder="+7 (999) 123-45-67"
									class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 {errors.phone ? 'border-red-300 bg-red-50' : ''}"
									disabled={isSubmitting}
								/>
								{#if errors.phone}
									<p class="text-red-500 text-sm mt-1">{errors.phone}</p>
								{/if}
							</div>

							<div class="text-center">
								<span class="px-3 py-1 bg-gray-100 text-gray-500 text-sm rounded-full">или</span>
							</div>

							<div>
								<label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
									Email адрес
								</label>
								<input
									id="email"
									type="email"
									bind:value={formData.email}
									placeholder="your@email.com"
									class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 {errors.email ? 'border-red-300 bg-red-50' : ''}"
									disabled={isSubmitting}
								/>
								{#if errors.email}
									<p class="text-red-500 text-sm mt-1">{errors.email}</p>
								{/if}
							</div>

							{#if errors.contact}
								<p class="text-red-500 text-sm">{errors.contact}</p>
							{/if}
						</div>

						<!-- Описание -->
						<div>
							<label for="description" class="block text-sm font-semibold text-gray-700 mb-2">
								Описание вопроса
							</label>
							<textarea
								id="description"
								bind:value={formData.description}
								placeholder="Опишите вашу задачу или вопрос..."
								rows="3"
								class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
								disabled={isSubmitting}
							></textarea>
						</div>

						<!-- Кнопки -->
						<div class="flex flex-col sm:flex-row gap-3 pt-4">
							<button
								type="button"
								on:click={closeModal}
								class="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
								disabled={isSubmitting}
							>
								Отмена
							</button>
							<button
								type="submit"
								class="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
								disabled={isSubmitting}
							>
								{#if isSubmitting}
									<svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
										<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
										<path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
									<span>Отправка...</span>
								{:else}
									<span>Заказать звонок</span>
								{/if}
							</button>
						</div>
					</form>

					<!-- Дополнительная информация -->
					<div class="mt-6 p-4 bg-gray-50 rounded-xl">
						<div class="flex items-start space-x-3">
							<div class="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
								<svg class="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
								</svg>
							</div>
							<div class="text-sm text-gray-600">
								<p class="font-medium mb-1">Время работы:</p>
								<p>Пн-Пт: 9:00 - 18:00</p>
								<p>Сб: 10:00 - 16:00</p>
							</div>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	@keyframes animate-in {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
	
	.animate-in {
		animation: animate-in 0.3s ease-out;
	}
</style> 