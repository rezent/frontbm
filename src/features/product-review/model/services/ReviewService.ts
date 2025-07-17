import type { 
  IReviewService, 
  IReviewApi, 
  IValidator, 
  IReviewData, 
  ReviewFormData, 
  SubmissionResult 
} from '../types';

// Принцип S (Single Responsibility) - сервис отвечает только за бизнес-логику отзывов
export class ReviewService implements IReviewService {
  
  constructor(
    // Принцип D (Dependency Inversion) - зависим от абстракций
    private api: IReviewApi,
    private validators: IValidator<ReviewFormData>[]
  ) {}

  async submitReview(reviewData: IReviewData): Promise<SubmissionResult> {
    try {
      // Преобразуем в формат для валидации
      const formData: ReviewFormData = {
        ...reviewData,
        type: 'text'
      };

      // Выполняем валидацию через все валидаторы
      const validationResults = await Promise.all(
        this.validators.map(validator => validator.validate(formData))
      );

      // Собираем все ошибки
      const allErrors: Record<string, string> = {};
      validationResults.forEach(result => {
        if (!result.isValid) {
          Object.assign(allErrors, result.errors);
        }
      });

      if (Object.keys(allErrors).length > 0) {
        return {
          success: false,
          error: Object.values(allErrors)[0] // Возвращаем первую ошибку
        };
      }

      // Отправляем отзыв через API
      const savedReview = await this.api.create(reviewData);

      return {
        success: true,
        review: savedReview
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Неизвестная ошибка'
      };
    }
  }

  async getProductReviews(productId: string): Promise<IReviewData[]> {
    try {
      return await this.api.getByProductId(productId);
    } catch (error) {
      console.error('Ошибка при получении отзывов:', error);
      return [];
    }
  }
}

// Принцип L (Liskov Substitution) - можем заменить базовый сервис расширенным
export class ExtendedReviewService extends ReviewService {
  
  constructor(
    api: IReviewApi,
    validators: IValidator<ReviewFormData>[],
    private analyticsService?: IAnalyticsService
  ) {
    super(api, validators);
  }

  async submitReview(reviewData: IReviewData): Promise<SubmissionResult> {
    // Вызываем базовую реализацию
    const result = await super.submitReview(reviewData);

    // Добавляем аналитику
    if (result.success && this.analyticsService) {
      await this.analyticsService.trackReviewSubmission(reviewData.productId, reviewData.rating);
    }

    return result;
  }

  async getProductReviews(productId: string): Promise<IReviewData[]> {
    const reviews = await super.getProductReviews(productId);

    // Добавляем аналитику просмотров
    if (this.analyticsService) {
      await this.analyticsService.trackReviewsView(productId, reviews.length);
    }

    return reviews;
  }
}

// Принцип I (Interface Segregation) - отдельный интерфейс для аналитики
interface IAnalyticsService {
  trackReviewSubmission(productId: string, rating: number): Promise<void>;
  trackReviewsView(productId: string, reviewCount: number): Promise<void>;
}

// Принцип S - отдельный сервис для аналитики
export class AnalyticsService implements IAnalyticsService {
  
  async trackReviewSubmission(productId: string, rating: number): Promise<void> {
    // Имитация отправки аналитики
    console.log(`Analytics: Review submitted for product ${productId} with rating ${rating}`);
  }

  async trackReviewsView(productId: string, reviewCount: number): Promise<void> {
    // Имитация отправки аналитики
    console.log(`Analytics: Reviews viewed for product ${productId}, count: ${reviewCount}`);
  }
}

// Принцип D - фабрика для создания сервисов с правильными зависимостями
export class ReviewServiceFactory {
  
  static createBasicService(
    api: IReviewApi,
    validators: IValidator<ReviewFormData>[]
  ): IReviewService {
    return new ReviewService(api, validators);
  }

  static createExtendedService(
    api: IReviewApi,
    validators: IValidator<ReviewFormData>[],
    withAnalytics = false
  ): IReviewService {
    const analyticsService = withAnalytics ? new AnalyticsService() : undefined;
    return new ExtendedReviewService(api, validators, analyticsService);
  }
} 