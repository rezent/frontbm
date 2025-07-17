# Демонстрация принципов SOLID в фиче Product Review

Эта фича демонстрирует применение всех пяти принципов SOLID в архитектуре frontend-приложения на Svelte с TypeScript.

## 🎯 S - Single Responsibility Principle (Принцип единственной ответственности)

**Каждый класс должен иметь только одну причину для изменения.**

### Примеры в коде:

1. **`ReviewValidator`** - отвечает только за валидацию данных отзыва
   ```typescript
   // src/features/product-review/model/validators/ReviewValidator.ts
   export class ReviewValidator implements IValidator<ReviewFormData> {
     // Только валидация, никакой другой логики
   }
   ```

2. **`BusinessRulesValidator`** - отвечает только за бизнес-правила
   ```typescript
   export class BusinessRulesValidator implements IValidator<ReviewFormData> {
     // Только проверка спама и дублирования
   }
   ```

3. **`ReviewApi`** - отвечает только за API запросы
   ```typescript
   export class ReviewApi implements IReviewApi {
     // Только HTTP операции с отзывами
   }
   ```

4. **`AnalyticsService`** - отвечает только за аналитику
   ```typescript
   export class AnalyticsService implements IAnalyticsService {
     // Только отправка аналитических данных
   }
   ```

## 🔓 O - Open/Closed Principle (Принцип открытости/закрытости)

**Код должен быть открыт для расширения, но закрыт для модификации.**

### Примеры в коде:

1. **Расширяемые типы отзывов** через абстрактный класс:
   ```typescript
   // types.ts
   export abstract class BaseReview {
     abstract getDisplayText(): string;
   }
   
   export class TextReview extends BaseReview {
     getDisplayText(): string {
       return this.comment;
     }
   }
   
   // Легко добавить новый тип без изменения существующего кода
   export class VideoReview extends BaseReview {
     getDisplayText(): string {
       return `Видео отзыв: ${this.videoUrl}`;
     }
   }
   ```

2. **Расширяемый сервис** через наследование:
   ```typescript
   // services/ReviewService.ts
   export class ExtendedReviewService extends ReviewService {
     // Расширяем функциональность, не модифицируя базовый класс
   }
   ```

## 🔄 L - Liskov Substitution Principle (Принцип подстановки Лисков)

**Объекты базового класса должны заменяться объектами наследников без изменения корректности.**

### Примеры в коде:

1. **Сервисы можно заменять**:
   ```typescript
   // Оба класса реализуют IReviewService и взаимозаменяемы
   const basicService: IReviewService = new ReviewService(api, validators);
   const extendedService: IReviewService = new ExtendedReviewService(api, validators, analytics);
   
   // Можно использовать любой без изменения клиентского кода
   ```

2. **HTTP клиенты взаимозаменяемы**:
   ```typescript
   // store.ts
   const httpClient = import.meta.env.NODE_ENV === 'test' 
     ? new MockHttpClient()  // Для тестов
     : new FetchHttpClient(); // Для продакшена
   ```

## 🧩 I - Interface Segregation Principle (Принцип разделения интерфейсов)

**Клиенты не должны зависеть от интерфейсов, которые они не используют.**

### Примеры в коде:

1. **Мелкие, специализированные интерфейсы**:
   ```typescript
   // types.ts
   
   // Отдельно для валидации
   export interface IValidator<T> {
     validate(data: T): Promise<ValidationResult>;
   }
   
   // Отдельно для API
   export interface IReviewApi {
     create(review: IReviewData): Promise<IReviewData>;
     getByProductId(productId: string): Promise<IReviewData[]>;
   }
   
   // Отдельно для сервиса
   export interface IReviewService {
     submitReview(review: IReviewData): Promise<SubmissionResult>;
     getProductReviews(productId: string): Promise<IReviewData[]>;
   }
   
   // Отдельно для аналитики
   interface IAnalyticsService {
     trackReviewSubmission(productId: string, rating: number): Promise<void>;
   }
   ```

## 🔀 D - Dependency Inversion Principle (Принцип инверсии зависимостей)

**Модули высокого уровня не должны зависеть от модулей низкого уровня. Оба должны зависеть от абстракций.**

### Примеры в коде:

1. **ReviewService зависит от абстракций**:
   ```typescript
   // services/ReviewService.ts
   export class ReviewService implements IReviewService {
     constructor(
       private api: IReviewApi,           // Абстракция, а не конкретный класс
       private validators: IValidator<ReviewFormData>[] // Массив абстракций
     ) {}
   }
   ```

2. **ReviewApi зависит от абстракции HTTP клиента**:
   ```typescript
   // api/ReviewApi.ts
   export class ReviewApi implements IReviewApi {
     constructor(
       private httpClient: IHttpClient  // Абстракция вместо fetch напрямую
     ) {}
   }
   ```

3. **Store создает зависимости через абстракции**:
   ```typescript
   // store.ts
   const httpClient: IHttpClient = import.meta.env.NODE_ENV === 'test' 
     ? new MockHttpClient() 
     : new FetchHttpClient();
   
   const api: IReviewApi = new ReviewApi(httpClient);
   const validators: IValidator<ReviewFormData>[] = [
     new ReviewValidator(), 
     new BusinessRulesValidator()
   ];
   const reviewService: IReviewService = new ReviewService(api, validators);
   ```

## 🏗️ Преимущества SOLID архитектуры

1. **Тестируемость** - легко мокать зависимости
2. **Расширяемость** - можно добавлять новые функции без изменения существующего кода
3. **Поддерживаемость** - изменения в одном месте не влияют на другие
4. **Переиспользуемость** - компоненты можно использовать в разных контекстах
5. **Читаемость** - код легко понимать благодаря четкому разделению ответственности

## 🔧 Как использовать в компонентах

```svelte
<!-- В любом Svelte компоненте -->
<script>
  import { ReviewForm, ReviewList } from '$features/product-review';
  
  export let productId;
</script>

<ReviewList {productId} />
<ReviewForm {productId} />
```

Компоненты автоматически используют всю SOLID архитектуру "под капотом", обеспечивая надежную и расширяемую функциональность. 