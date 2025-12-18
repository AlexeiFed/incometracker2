# Инструкция по деплою

## Рекомендуемый способ: Vercel

Vercel - это платформа от создателей Next.js, которая идеально подходит для деплоя:

1. Зарегистрируйтесь на https://vercel.com
2. Подключите GitHub репозиторий
3. Vercel автоматически определит Next.js и задеплоит проект
4. PWA будет работать автоматически с HTTPS

## Альтернатива: Firebase Hosting

Для Firebase Hosting нужно использовать Firebase Functions для SSR или настроить статический экспорт.

## Шаг 1: Создание иконок PWA

**ВАЖНО:** Перед деплоем создайте иконки для PWA:

1. Создайте иконки следующих размеров:
   - `public/apple-touch-icon.png` - 180x180 (для iOS)
   - `public/icon-192.png` - 192x192
   - `public/icon-512.png` - 512x512

2. Используйте один из способов:
   - Онлайн генератор: https://realfavicongenerator.net/
   - Графический редактор (Figma, Photoshop и т.д.)
   - Используйте SVG из `public/icon.svg` как основу

## Шаг 2: Деплой на Vercel

1. Установите Vercel CLI (опционально):
```bash
npm install -g vercel
```

2. Деплой:
```bash
vercel
```

Или через веб-интерфейс:
1. Зайдите на https://vercel.com
2. Нажмите "New Project"
3. Подключите GitHub репозиторий
4. Vercel автоматически задеплоит проект

## ⚠️ Шаг 3: Настройка переменных окружения Firebase

**ВАЖНО:** После деплоя обязательно настройте переменные окружения Firebase!

Если данные не отображаются, это означает, что переменные окружения не настроены.

См. подробную инструкцию: [VERCEL-ENV-SETUP.md](./VERCEL-ENV-SETUP.md)

Краткая инструкция:
1. Зайдите в **Settings** → **Environment Variables** в вашем проекте на Vercel
2. Добавьте все 6 переменных из `.env.local`:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
3. Передеплойте проект (Redeploy в Vercel)

## Альтернатива: Firebase Hosting

Для Firebase Hosting нужно настроить Firebase Functions для SSR или использовать другой подход.

## Шаг 4: Установка на iPhone

После деплоя:

1. Откройте сайт в Safari на iPhone
2. Нажмите кнопку "Поделиться" (квадрат со стрелкой вверх)
3. Прокрутите вниз и выберите "На экран «Домой»"
4. Нажмите "Добавить"

Приложение появится на главном экране как нативное приложение.

## Примечания

- Убедитесь, что сайт доступен по HTTPS (Firebase Hosting предоставляет это автоматически)
- Service Worker будет автоматически зарегистрирован при первом посещении
- Приложение работает в офлайн-режиме благодаря Service Worker

