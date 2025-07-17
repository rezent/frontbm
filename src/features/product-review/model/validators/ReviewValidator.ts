import type { IValidator, ValidationResult, ReviewFormData } from '../types';

// Принцип S (Single Responsibility) - класс отвечает только за валидацию отзывов
export class ReviewValidator implements IValidator<ReviewFormData> {
  
  async validate(data: ReviewFormData): Promise<ValidationResult> {
    const errors: Record<string, string> = {};

    // Валидация рейтинга
    if (!this.isValidRating(data.rating)) {
      errors.rating = 'Рейтинг должен быть от 1 до 5';
    }

    // Валидация комментария
    if (!this.isValidComment(data.comment)) {
      errors.comment = 'Комментарий должен содержать от 10 до 500 символов';
    }

    // Валидация имени автора
    if (!this.isValidAuthorName(data.authorName)) {
      errors.authorName = 'Имя должно содержать от 2 до 50 символов';
    }

    // Валидация email
    if (!this.isValidEmail(data.authorEmail)) {
      errors.authorEmail = 'Некорректный email адрес';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  private isValidRating(rating: number): boolean {
    return Number.isInteger(rating) && rating >= 1 && rating <= 5;
  }

  private isValidComment(comment: string): boolean {
    if (!comment || typeof comment !== 'string') return false;
    const trimmed = comment.trim();
    return trimmed.length >= 10 && trimmed.length <= 500;
  }

  private isValidAuthorName(name: string): boolean {
    if (!name || typeof name !== 'string') return false;
    const trimmed = name.trim();
    return trimmed.length >= 2 && trimmed.length <= 50;
  }

  private isValidEmail(email: string): boolean {
    if (!email || typeof email !== 'string') return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Принцип S - отдельный класс для валидации бизнес-правил
export class BusinessRulesValidator implements IValidator<ReviewFormData> {
  
  async validate(data: ReviewFormData): Promise<ValidationResult> {
    const errors: Record<string, string> = {};

    // Проверка на спам (упрощенная)
    if (this.containsSpam(data.comment)) {
      errors.comment = 'Комментарий содержит недопустимое содержимое';
    }

    // Проверка на дублирование (имитация)
    if (await this.isDuplicateReview(data)) {
      errors.general = 'Вы уже оставляли отзыв на этот товар';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  private containsSpam(comment: string): boolean {
    const spamWords = ['спам', 'реклама', 'скидка'];
    return spamWords.some(word => comment.toLowerCase().includes(word));
  }

  private async isDuplicateReview(_data: ReviewFormData): Promise<boolean> {
    // Имитация проверки дублирования
    // В реальном приложении здесь был бы запрос к API
    return false;
  }
} 