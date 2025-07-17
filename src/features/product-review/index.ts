// Экспорт UI компонентов
export { default as ReviewForm } from './ui/ReviewForm.svelte';
export { default as ReviewList } from './ui/ReviewList.svelte';

// Экспорт store
export { reviewStore } from './model/store';

// Экспорт типов
export type {
  IReviewData,
  ReviewFormData,
  SubmissionResult,
  ValidationResult,
  BaseReview,
  TextReview,
  VideoReview
} from './model/types';

// Экспорт сервисов (для расширения или тестирования)
export { ReviewService, ExtendedReviewService, ReviewServiceFactory } from './model/services/ReviewService';
export { ReviewValidator, BusinessRulesValidator } from './model/validators/ReviewValidator';
export { ReviewApi, FetchHttpClient, MockHttpClient } from './model/api/ReviewApi'; 