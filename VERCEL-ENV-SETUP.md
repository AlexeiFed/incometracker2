# Настройка переменных окружения на Vercel

## Проблема

Если после деплоя на Vercel не отображаются данные из Firebase, это означает, что переменные окружения не настроены.

## Решение

### Шаг 1: Найдите ваши Firebase credentials

Откройте файл `.env.local` в вашем проекте (он не должен быть в Git) и найдите следующие переменные:

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

### Шаг 2: Добавьте переменные в Vercel

1. Зайдите на https://vercel.com
2. Откройте ваш проект
3. Перейдите в **Settings** → **Environment Variables**
4. Добавьте каждую переменную:

   - **Name**: `NEXT_PUBLIC_FIREBASE_API_KEY`
   - **Value**: (скопируйте значение из `.env.local`)
   - **Environment**: выберите `Production`, `Preview`, и `Development`

   Повторите для всех 6 переменных:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`

### Шаг 3: Передеплойте проект

После добавления всех переменных:

1. Перейдите в **Deployments**
2. Найдите последний деплой
3. Нажмите на три точки (⋯) → **Redeploy**

Или просто сделайте новый коммит и пуш в Git - Vercel автоматически задеплоит проект с новыми переменными.

### Шаг 4: Проверка

После передеплоя откройте консоль браузера (F12) и проверьте:
- Не должно быть ошибок о Firebase конфигурации
- Данные должны загружаться из Firebase

## Альтернативный способ: через Vercel CLI

Если вы используете Vercel CLI:

```bash
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID
vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
vercel env add NEXT_PUBLIC_FIREBASE_APP_ID
```

После добавления переменных передеплойте проект.

## Где найти Firebase credentials?

Если вы не помните ваши Firebase credentials:

1. Зайдите на https://console.firebase.google.com
2. Выберите ваш проект
3. Перейдите в **Project Settings** (шестеренка)
4. Прокрутите вниз до **Your apps**
5. Если приложения нет, нажмите **Add app** → **Web** (</>)
6. Скопируйте конфигурацию Firebase (она содержит все необходимые значения)

## Важно

- Все переменные должны начинаться с `NEXT_PUBLIC_` чтобы быть доступными в браузере
- После добавления переменных обязательно передеплойте проект
- Переменные окружения применяются только при новом деплое

