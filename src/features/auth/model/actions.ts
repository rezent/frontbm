import { auth } from './store';
import { UserApi } from '@entities/user';
import type { LoginRequest, RegisterRequest, User } from '@shared/types';

// Функции для работы с аутентификацией
export const authActions = {
  // Вход в систему
  login: async (credentials: LoginRequest): Promise<void> => {
    auth.update(state => ({ ...state, isLoading: true, error: null }));

    try {
      const response = await UserApi.login(credentials);

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
      const response = await UserApi.register(userData);

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
      await UserApi.logout();
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
      const response = await UserApi.refreshToken();

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
      const updatedUser = await UserApi.updateProfile(userData);

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