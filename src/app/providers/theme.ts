import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark' | 'system';

// Стор темы
export const theme = writable<Theme>('system');

// Инициализация темы
export function initTheme() {
  if (!browser) return;

  const savedTheme = localStorage.getItem('theme') as Theme;
  if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
    theme.set(savedTheme);
  }

  // Подписка на изменения темы
  theme.subscribe((value) => {
    if (browser) {
      localStorage.setItem('theme', value);
      applyTheme(value);
    }
  });

  // Слушаем изменения системной темы
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
      theme.update(currentTheme => {
        if (currentTheme === 'system') {
          applyTheme('system');
        }
        return currentTheme;
      });
    });
  }
}

// Применение темы
function applyTheme(themeValue: Theme) {
  if (!browser) return;

  const root = document.documentElement;
  const isDark = themeValue === 'dark' || 
    (themeValue === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

// Действия темы
export const themeActions = {
  setTheme: (newTheme: Theme) => {
    theme.set(newTheme);
  },
  toggleTheme: () => {
    theme.update(current => current === 'light' ? 'dark' : 'light');
  }
}; 