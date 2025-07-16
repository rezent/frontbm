import { writable, derived, type Writable, type Readable } from 'svelte/store';
import type { User, AuthResponse, LoginRequest, RegisterRequest } from '$lib/types/api';
import { AuthService } from '$lib/api/services';

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

// Функции для работы с аутентификацией
export const authActions = {
  // Вход в систему
  login: async (credentials: LoginRequest): Promise<void> => {
    auth.update(state => ({ ...state, isLoading: true, error: null }));

    try {
      const response: AuthResponse = await AuthService.login(credentials);

      auth.set({
        user: response.user,
        token: response.token,
        refreshToken: response.refreshToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка входа';
      auth.update(state => ({
        ...state,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  },

  // Регистрация
  register: async (userData: RegisterRequest): Promise<void> => {
    auth.update(state => ({ ...state, isLoading: true, error: null }));

    try {
      const response: AuthResponse = await AuthService.register(userData);

      auth.set({
        user: response.user,
        token: response.token,
        refreshToken: response.refreshToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка регистрации';
      auth.update(state => ({
        ...state,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  },

  // Выход из системы
  logout: async (): Promise<void> => {
    auth.update(state => ({ ...state, isLoading: true }));

    try {
      await AuthService.logout();
    } catch (error) {
      console.warn('Logout error:', error);
    } finally {
      auth.set({
        user: null,
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  // Обновление токена
  refreshToken: async (): Promise<void> => {
    try {
      const response: AuthResponse = await AuthService.refreshToken();

      auth.update(state => ({
        ...state,
        token: response.token,
        refreshToken: response.refreshToken,
        user: response.user,
      }));
    } catch (error) {
      console.warn('Token refresh failed:', error);
      // Если не удалось обновить токен, выходим из системы
      await authActions.logout();
      throw error;
    }
  },

  // Обновление профиля пользователя
  updateProfile: async (userData: Partial<User>): Promise<void> => {
    auth.update(state => ({ ...state, isLoading: true, error: null }));

    try {
      const updatedUser = await AuthService.updateProfile(userData);

      auth.update(state => ({
        ...state,
        user: updatedUser,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка обновления профиля';
      auth.update(state => ({
        ...state,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  },

  // Очистка ошибки
  clearError: (): void => {
    auth.update(state => ({ ...state, error: null }));
  },

  // Установка состояния загрузки
  setLoading: (isLoading: boolean): void => {
    auth.update(state => ({ ...state, isLoading }));
  },
};

// Вычисляемые значения
export const user: Readable<User | null> = derived(auth, $auth => $auth.user);
export const isAuthenticated: Readable<boolean> = derived(auth, $auth => $auth.isAuthenticated);
export const isLoading: Readable<boolean> = derived(auth, $auth => $auth.isLoading);
export const error: Readable<string | null> = derived(auth, $auth => $auth.error);
export const token: Readable<string | null> = derived(auth, $auth => $auth.token);

// Проверка роли пользователя
export const isAdmin: Readable<boolean> = derived(user, $user => $user?.role === 'admin');
export const isUser: Readable<boolean> = derived(user, $user => $user?.role === 'user');
