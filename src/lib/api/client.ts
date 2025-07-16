import { API_ENDPOINTS, type ApiResponse, type PaginatedResponse } from '$lib/types/api';

// Конфигурация API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Типы для HTTP методов
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// Интерфейс для опций запроса
interface RequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  signal?: AbortSignal;
}

// Интерфейс для конфигурации API клиента
interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

// Класс для обработки ошибок API
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Основной класс API клиента
export class ApiClient {
  private config: ApiClientConfig;

  constructor(config: ApiClientConfig) {
    this.config = {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
      ...config,
    };
  }

  // Получение токена из localStorage
  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  // Создание заголовков запроса
  private createHeaders(customHeaders?: Record<string, string>): Record<string, string> {
    const headers = { ...this.config.headers };
    
    // Добавляем токен авторизации
    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Добавляем пользовательские заголовки
    if (customHeaders) {
      Object.assign(headers, customHeaders);
    }

    return headers;
  }

  // Основной метод для выполнения запросов
  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const url = `${this.config.baseURL}${endpoint}`;
    const headers = this.createHeaders(options.headers);

    const config: RequestInit = {
      method: options.method || 'GET',
      headers,
      signal: options.signal,
    };

    // Добавляем тело запроса для POST, PUT, PATCH
    if (options.body && ['POST', 'PUT', 'PATCH'].includes(config.method || 'GET')) {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, config);

      // Проверяем статус ответа
      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: response.statusText };
        }

        throw new ApiError(
          response.status,
          errorData.message || `HTTP ${response.status}`,
          errorData
        );
      }

      // Парсим ответ
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      // Обработка сетевых ошибок
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new ApiError(0, 'Network error: Unable to connect to server');
      }

      throw new ApiError(0, 'Unknown error occurred');
    }
  }

  // GET запрос
  async get<T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  // POST запрос
  async post<T>(endpoint: string, data?: any, options?: Omit<RequestOptions, 'method'>): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'POST', body: data });
  }

  // PUT запрос
  async put<T>(endpoint: string, data?: any, options?: Omit<RequestOptions, 'method'>): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body: data });
  }

  // PATCH запрос
  async patch<T>(endpoint: string, data?: any, options?: Omit<RequestOptions, 'method'>): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', body: data });
  }

  // DELETE запрос
  async delete<T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  // Загрузка файла
  async upload<T>(endpoint: string, file: File, options?: Omit<RequestOptions, 'method'>): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: formData,
      headers: {
        // Не устанавливаем Content-Type для FormData
        ...options?.headers,
      },
    });
  }

  // Скачивание файла
  async download(endpoint: string, filename?: string): Promise<void> {
    const response = await fetch(`${this.config.baseURL}${endpoint}`, {
      headers: this.createHeaders(),
    });

    if (!response.ok) {
      throw new ApiError(response.status, 'Download failed');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'download';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}

// Создаем экземпляр API клиента
export const apiClient = new ApiClient({
  baseURL: API_BASE_URL,
});

// Экспортируем типы для удобства
export type { RequestOptions, ApiClientConfig }; 