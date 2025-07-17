<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let disabled: boolean = false;
  export let loading: boolean = false;
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let href: string | undefined = undefined;
  export let target: string | undefined = undefined;
  export let rel: string | undefined = undefined;
  export let ariaLabel: string | undefined = undefined;
  
  const dispatch = createEventDispatcher();
  
  const variantClasses = {
    primary: 'bg-sky-600 hover:bg-sky-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    outline: 'border-2 border-gray-300 hover:border-gray-400 text-gray-700',
    ghost: 'hover:bg-gray-100 text-gray-700',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  $: classes = `
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    font-medium rounded-lg transition-colors duration-200
    flex items-center justify-center space-x-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${$$restProps.class || ''}
  `;
  
  function handleClick(e: MouseEvent) {
    if (!disabled && !loading) {
      dispatch('click', e);
    }
  }
</script>

{#if href}
  <a
    {href}
    {target}
    {rel}
    class={classes}
    aria-label={ariaLabel}
    on:click={handleClick}
  >
    {#if loading}
      <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    {/if}
    <slot />
  </a>
{:else}
  <button
    {type}
    {disabled}
    class={classes}
    aria-label={ariaLabel}
    on:click={handleClick}
  >
    {#if loading}
      <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    {/if}
    <slot />
  </button>
{/if} 