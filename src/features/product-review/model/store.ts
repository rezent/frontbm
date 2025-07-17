import { writable, derived, type Readable } from 'svelte/store';
import type { IReviewData, IReviewService, ReviewFormData, SubmissionResult } from './types';
import { ReviewService } from './services/ReviewService';
import { ReviewValidator, BusinessRulesValidator } from './validators/ReviewValidator';
import { ReviewApi, FetchHttpClient, MockHttpClient } from './api/ReviewApi';

// Интерфейс состояния
interface ReviewState {
  reviews: IReviewData[];
  isLoading: boolean;
  error: string | null;
  isSubmitting: boolean;
}

// Начальное состояние
const initialState: ReviewState = {
  reviews: [],
  isLoading: false,
  error: null,
  isSubmitting: false
};

// Приватный store (принцип инкапсуляции)
const reviewState = writable<ReviewState>(initialState);

// Принцип D (Dependency Inversion) - создаем сервис через абстракции
const httpClient = import.meta.env.NODE_ENV === 'test' 
  ? new MockHttpClient() 
  : new FetchHttpClient();

const api = new ReviewApi(httpClient);
const validators = [new ReviewValidator(), new BusinessRulesValidator()];
const reviewService: IReviewService = new ReviewService(api, validators);

// Принцип S (Single Responsibility) - каждая функция отвечает за одну операцию
class ReviewStore {
  
  // Читаемые производные stores
  readonly reviews: Readable<IReviewData[]> = derived(reviewState, $state => $state.reviews);
  readonly isLoading: Readable<boolean> = derived(reviewState, $state => $state.isLoading);
  readonly error: Readable<string | null> = derived(reviewState, $state => $state.error);
  readonly isSubmitting: Readable<boolean> = derived(reviewState, $state => $state.isSubmitting);
  
  // Производные для аналитики
  readonly reviewCount: Readable<number> = derived(this.reviews, $reviews => $reviews.length);
  readonly averageRating: Readable<number> = derived(
    this.reviews, 
    $reviews => {
      if ($reviews.length === 0) return 0;
      const sum = $reviews.reduce((acc, review) => acc + review.rating, 0);
      return Math.round((sum / $reviews.length) * 10) / 10;
    }
  );

  // Загрузка отзывов для продукта
  async loadProductReviews(productId: string): Promise<void> {
    this.setLoading(true);
    this.clearError();

    try {
      const reviews = await reviewService.getProductReviews(productId);
      this.setReviews(reviews);
    } catch (error) {
      this.setError(error instanceof Error ? error.message : 'Ошибка загрузки отзывов');
    } finally {
      this.setLoading(false);
    }
  }

  // Отправка нового отзыва
  async submitReview(reviewData: ReviewFormData): Promise<SubmissionResult> {
    this.setSubmitting(true);
    this.clearError();

    try {
      const result = await reviewService.submitReview(reviewData);
      
      if (result.success && result.review) {
        this.addReview(result.review);
      } else if (result.error) {
        this.setError(result.error);
      }

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка отправки отзыва';
      this.setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      this.setSubmitting(false);
    }
  }

  // Фильтрация отзывов по рейтингу
  getReviewsByRating(rating: number): Readable<IReviewData[]> {
    return derived(this.reviews, $reviews => 
      $reviews.filter(review => review.rating === rating)
    );
  }

  // Сброс состояния
  reset(): void {
    reviewState.set(initialState);
  }

  // Приватные методы для управления состоянием
  private setReviews(reviews: IReviewData[]): void {
    reviewState.update(state => ({ ...state, reviews }));
  }

  private addReview(review: IReviewData): void {
    reviewState.update(state => ({ 
      ...state, 
      reviews: [...state.reviews, review] 
    }));
  }

  private setLoading(isLoading: boolean): void {
    reviewState.update(state => ({ ...state, isLoading }));
  }

  private setSubmitting(isSubmitting: boolean): void {
    reviewState.update(state => ({ ...state, isSubmitting }));
  }

  private setError(error: string | null): void {
    reviewState.update(state => ({ ...state, error }));
  }

  private clearError(): void {
    this.setError(null);
  }
}

// Экспортируем синглтон
export const reviewStore = new ReviewStore();

// Экспортируем типы для использования в компонентах
export type { ReviewState, IReviewData, ReviewFormData, SubmissionResult }; 