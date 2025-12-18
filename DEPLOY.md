# Инструкция по деплою

## Подготовка

1. Установите Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Войдите в Firebase:
```bash
firebase login
```

3. Инициализируйте проект (если еще не сделано):
```bash
firebase init hosting
```

4. Выберите существующий проект Firebase или создайте новый

## Деплой

1. Соберите проект:
```bash
npm run build
```

2. Деплой на Firebase Hosting:
```bash
npm run deploy
```

Или пошагово:
```bash
npm run export
firebase deploy --only hosting
```

## Настройка Firebase проекта

1. Откройте `.firebaserc` и замените `your-project-id` на ID вашего Firebase проекта
2. Проверьте настройки в `firebase.json`

## Установка на iPhone

После деплоя:

1. Откройте сайт в Safari на iPhone
2. Нажмите кнопку "Поделиться" (квадрат со стрелкой вверх)
3. Прокрутите вниз и выберите "На экран «Домой»"
4. Нажмите "Добавить"

Приложение появится на главном экране как нативное приложение.

