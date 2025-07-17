import { writable, derived, type Readable } from 'svelte/store';
import type { User } from '@shared/types';

// Интерфейс для состояния аутентификации
interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Функция для загрузки состояния аутентификации из localStorage
function loadAuthFromStorage(): AuthState {
  if (typeof window !== 'undefined') {
    try {
      const token = localStorage.getItem('authToken');
      const refreshToken = localStorage.getItem('refreshToken');
      const userStr = localStorage.getItem('user');

      if (token && userStr) {
        const user: User = JSON.parse(userStr);
        return {
          user,
          token,
          refreshToken,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        };
      }
    } catch (e) {
      console.warn('Failed to load auth from localStorage:', e);
    }
  }

  return {
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  };
}

// Создаем store для аутентификации
export const auth = writable<AuthState>(loadAuthFromStorage());

// Автоматически сохраняем состояние аутентификации в localStorage
if (typeof window !== 'undefined') {
  auth.subscribe(state => {
    if (state.token && state.user) {
      localStorage.setItem('authToken', state.token);
      localStorage.setItem('refreshToken', state.refreshToken || '');
      localStorage.setItem('user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  });
}

// Вычисляемые значения
export const user: Readable<User | null> = derived(auth, $auth => $auth.user);
export const isAuthenticated: Readable<boolean> = derived(auth, $auth => $auth.isAuthenticated);
export const isLoading: Readable<boolean> = derived(auth, $auth => $auth.isLoading);
export const error: Readable<string | null> = derived(auth, $auth => $auth.error);
export const token: Readable<string | null> = derived(auth, $auth => $auth.token);

// Проверка роли пользователя
export const isAdmin: Readable<boolean> = derived(user, $user => $user?.role === 'admin');
export const isUser: Readable<boolean> = derived(user, $user => $user?.role === 'user'); 