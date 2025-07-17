// Принцип I (Interface Segregation) - мелкие, специализированные интерфейсы
export interface IReviewData {
  id?: string;
  productId: string;
  rating: number;
  comment: string;
  authorName: string;
  authorEmail: string;
  createdAt?: string;
}

export interface IReviewValidation {
  rating: boolean;
  comment: boolean;
  authorName: boolean;
  authorEmail: boolean;
}

// Принцип I - отдельный интерфейс для валидатора
export interface IValidator<T> {
  validate(data: T): Promise<ValidationResult>;
}

// Принцип I - отдельный интерфейс для API
export interface IReviewApi {
  create(review: IReviewData): Promise<IReviewData>;
  getByProductId(productId: string): Promise<IReviewData[]>;
  update(id: string, review: Partial<IReviewData>): Promise<IReviewData>;
  delete(id: string): Promise<void>;
}

// Принцип I - отдельный интерфейс для сервиса
export interface IReviewService {
  submitReview(review: IReviewData): Promise<SubmissionResult>;
  getProductReviews(productId: string): Promise<IReviewData[]>;
}

// Принцип O (Open/Closed) - расширяемые типы отзывов
export abstract class BaseReview {
  constructor(
    public id: string,
    public productId: string,
    public rating: number,
    public authorName: string,
    public createdAt: Date
  ) {}

  abstract getDisplayText(): string;
}

export class TextReview extends BaseReview {
  constructor(
    id: string,
    productId: string,
    rating: number,
    authorName: string,
    createdAt: Date,
    public comment: string
  ) {
    super(id, productId, rating, authorName, createdAt);
  }

  getDisplayText(): string {
    return this.comment;
  }
}

// Принцип O - можно легко добавить новые типы отзывов
export class VideoReview extends BaseReview {
  constructor(
    id: string,
    productId: string,
    rating: number,
    authorName: string,
    createdAt: Date,
    public videoUrl: string
  ) {
    super(id, productId, rating, authorName, createdAt);
  }

  getDisplayText(): string {
    return `Видео отзыв: ${this.videoUrl}`;
  }
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface SubmissionResult {
  success: boolean;
  review?: IReviewData;
  error?: string;
}

export type ReviewType = 'text' | 'video';

export interface ReviewFormData {
  productId: string;
  rating: number;
  comment: string;
  authorName: string;
  authorEmail: string;
  type: ReviewType;
} 