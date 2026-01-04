# Assignment 1 (Advanced Frontend React) — отчет

Коротко: проект переработан по FSD, состояние перенесено на Zustand, добавлены новые функции, оптимизации, тесты (unit/integration/E2E), защита от XSS и CI.

## Модуль 1. Архитектура и масштабирование

### Анализ исходного состояния
- Логика и UI были смешаны в `components/context/store/hooks/types`, что затрудняет расширение.
- Контекст и reducer дублировали логику, при миграции на Zustand оставались лишние файлы.

### Решение: Feature-Sliced Design
Структура разделена по слоям:
- `src/app` — входные точки, провайдеры, глобальные стили.
- `src/pages` — страницы приложения (Board, Analytics).
- `src/widgets` — крупные блоки UI (хедер, колонки).
- `src/features` — пользовательские сценарии (создание/редактирование, фильтры, инструменты доски).
- `src/entities` — доменная модель и стор (Project/Task).
- `src/shared` — утилиты и общие компоненты.

### Глобальное состояние
- Zustand с persist в `localStorage`.
- Валидация и нормализация данных при импорте.

## Модуль 2. Производительность
- `useMemo` для вычислений (общее число задач, список тегов, фильтр).
- `React.memo` для карточек задач.
- `React.lazy` + `Suspense` для страниц.

## Модуль 3. TypeScript и надежность
- Строго типизированные сущности и действия стора.
- Валидация импортируемых данных.
- Error Boundary для устойчивости интерфейса.

## Модуль 4. Тестирование, безопасность, DevOps

### Unit и Integration (Vitest + RTL)
Файлы тестов:
- `src/entities/project/model/store.test.ts`
- `src/pages/board/ui/BoardPage.test.tsx`

Покрытие:
- Санитайзинг входных данных.
- Защита от некорректного перемещения задач.
- Защита от пустых заголовков.
- Фильтрация по поисковому запросу.
- Inline-редактирование задачи.

### E2E (Playwright)
Файл теста:
- `e2e/board.spec.ts`

Сценарий:
- Открыть доску.
- Добавить задачу.
- Перейти в аналитику и вернуться.
- Проверить сохранение данных.

### XSS
- Санитайзинг полей `title/description/tag` в сторе.
- Валидация импорта JSON.

### CI
- GitHub Actions: линт, unit/integration, build, E2E.
- Файл: `.github/workflows/ci.yml`.

## Как запустить
```bash
npm install
npm run dev
```

## Скрипты
- `npm run test` — watch режим
- `npm run test:run` — один прогон
- `npm run test:e2e` — E2E тесты

## Примечания
- Роутинг по hash: `#/` и `#/analytics`.
- localStorage ключ: `project-board-state-v2`.
