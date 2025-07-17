import type { IReviewApi, IReviewData } from '../types';

// Принцип D (Dependency Inversion) - зависим от абстракции, а не от конкретной реализации
export interface IHttpClient {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data: unknown): Promise<T>;
  put<T>(url: string, data: unknown): Promise<T>;
  delete(url: string): Promise<void>;
}

// Принцип S (Single Responsibility) - класс отвечает только за API операции с отзывами
export class ReviewApi implements IReviewApi {
  private readonly baseUrl = '/api/reviews';

  constructor(
    // Принцип D - инверсия зависимостей через интерфейс
    private httpClient: IHttpClient
  ) {}

  async create(review: IReviewData): Promise<IReviewData> {
    return this.httpClient.post<IReviewData>(this.baseUrl, review);
  }

  async getByProductId(productId: string): Promise<IReviewData[]> {
    return this.httpClient.get<IReviewData[]>(`${this.baseUrl}?productId=${productId}`);
  }

  async update(id: string, review: Partial<IReviewData>): Promise<IReviewData> {
    return this.httpClient.put<IReviewData>(`${this.baseUrl}/${id}`, review);
  }

  async delete(id: string): Promise<void> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
}

// Конкретная реализация HTTP клиента
export class FetchHttpClient implements IHttpClient {
  
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  async post<T>(url: string, data: unknown): Promise<T> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  async put<T>(url: string, data: unknown): Promise<T> {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  async delete(url: string): Promise<void> {
    const response = await fetch(url, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
}

// Принцип D - можем легко подменить реализацию для тестов
export class MockHttpClient implements IHttpClient {
  private reviews: IReviewData[] = [
    {
      id: '1',
      productId: 'product-1',
      rating: 5,
      comment: 'Отличный товар, рекомендую!',
      authorName: 'Иван Петров',
      authorEmail: 'ivan@example.com'
    }
  ];

  async get<T>(url: string): Promise<T> {
    if (url.includes('productId=')) {
      const productId = url.split('productId=')[1];
      const filtered = this.reviews.filter(r => r.productId === productId);
      return filtered as T;
    }
    return this.reviews as T;
  }

  async post<T>(_url: string, data: unknown): Promise<T> {
    const review = data as IReviewData;
    const newReview = {
      ...review,
      id: Date.now().toString()
    };
    this.reviews.push(newReview);
    return newReview as T;
  }

  async put<T>(url: string, data: unknown): Promise<T> {
    const id = url.split('/').pop();
    const index = this.reviews.findIndex(r => r.id === id);
    if (index !== -1) {
      this.reviews[index] = { ...this.reviews[index], ...(data as Partial<IReviewData>) };
      return this.reviews[index] as T;
    }
    throw new Error('Review not found');
  }

  async delete(url: string): Promise<void> {
    const id = url.split('/').pop();
    const index = this.reviews.findIndex(r => r.id === id);
    if (index !== -1) {
      this.reviews.splice(index, 1);
    }
  }
} 