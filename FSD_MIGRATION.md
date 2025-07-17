# Миграция на FSD архитектуру

## Структура проекта

```
src/
├── app/                  # Слой приложения
│   ├── providers/        # Провайдеры приложения
│   └── styles/          # Глобальные стили
├── pages/               # Страницы приложения
├── widgets/             # Составные блоки UI
│   ├── header/         # Виджет хедера
│   ├── footer/         # Виджет футера
│   └── product-list/   # Виджет списка продуктов
├── features/            # Фичи пользователя
│   ├── auth/           # Аутентификация
│   ├── cart/           # Функционал корзины
│   ├── product-filter/ # Фильтрация продуктов
│   └── callback-modal/ # Модалка обратного звонка
├── entities/            # Бизнес-сущности
│   ├── product/        # Продукт
│   ├── cart/          # Корзина
│   ├── user/          # Пользователь
│   └── category/      # Категория
└── shared/             # Переиспользуемый код
    ├── api/           # API клиент
    ├── ui/            # UI компоненты
    ├── lib/           # Утилиты
    ├── config/        # Конфигурация
    └── types/         # Общие типы
```

## Выполненная работа

### 1. Shared слой ✅
- **types**: Перенесены все базовые типы из `lib/types/api.ts`
- **config**: Создана конфигурация приложения и API endpoints
- **api**: Создан базовый API клиент
- **lib**: Перенесены утилиты и хелперы

### 2. Entities слой ✅
- **product**: Типы, API, UI компоненты для продукта
- **cart**: Store, actions, типы для корзины
- **user**: Типы и API для пользователя

### 3. Features слой (частично) 🚧
- **auth**: Store и actions для аутентификации
- **cart**: UI компоненты для корзины
- **product-filter**: Типы для фильтрации

## Алиасы

Настроены алиасы в `vite.config.js` и `svelte.config.js`:
- `@shared` → `src/shared`
- `@entities` → `src/entities`
- `@features` → `src/features`
- `@widgets` → `src/widgets`
- `@pages` → `src/pages`
- `@app` → `src/app`

## Миграция компонентов

### Старая структура → Новая структура

1. `lib/components/ProductCard.svelte` → `entities/product/ui/ProductCard.svelte`
2. `lib/stores/cart.ts` → `entities/cart/model/store.ts`
3. `lib/stores/auth.ts` → `features/auth/model/store.ts`
4. `lib/api/services.ts` → Разделен по entities (ProductApi, UserApi и т.д.)
5. `lib/types/api.ts` → `shared/types/index.ts`

## Дальнейшие шаги

1. **Завершить Features слой**:
   - Создать UI компоненты для auth
   - Добавить product-filter компоненты
   - Создать callback-modal feature

2. **Создать Widgets слой**:
   - Header widget
   - Footer widget
   - ProductList widget

3. **Реструктурировать Pages**:
   - Перенести страницы из routes в pages слой
   - Обновить импорты

4. **Настроить App слой**:
   - Создать провайдеры
   - Перенести глобальные стили

## Преимущества FSD

1. **Четкая структура**: Каждый слой имеет свою ответственность
2. **Изоляция**: Компоненты и логика изолированы по фичам
3. **Масштабируемость**: Легко добавлять новые фичи
4. **Переиспользование**: Shared слой для общего кода
5. **Понятные зависимости**: Строгие правила импортов между слоями 