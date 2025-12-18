# Проверка коммита на Vercel

## Ваш текущий коммит в Git:

- **SHA (короткий)**: `8c31ec8`
- **SHA (полный)**: `8c31ec8eaf157537743c73a538b5a1dd648f85d6`
- **Сообщение**: "Merge remote-tracking branch 'origin/main' - resolve conflicts using local version"

## Как проверить на Vercel:

### 1. Проверьте последний деплой:

1. Зайдите в раздел **Deployments** (в верхнем меню)
2. Найдите последний деплой (самый верхний)
3. Проверьте:
   - **Commit SHA** - должен быть `8c31ec8` или начинаться с `8c31ec8`
   - **Commit Message** - должно быть "Merge remote-tracking branch..."
   - **Status** - должен быть `Ready` (зеленый)

### 2. Если SHA не совпадает:

#### Вариант A: Сделайте новый коммит для триггера

Иногда Vercel не видит merge коммиты. Сделайте небольшое изменение:

```bash
# Добавьте небольшое изменение
echo "# Income Tracker" > README.md
git add README.md
git commit -m "Update README - trigger Vercel deploy"
git push origin main
```

#### Вариант B: Используйте Deploy Hook

1. В настройках Git найдите раздел **Deploy Hooks**
2. Создайте новый hook:
   - Name: `Manual Deploy`
   - Branch: `main`
3. Нажмите **Create Hook**
4. Используйте полученный URL для ручного деплоя

#### Вариант C: Сделайте Redeploy вручную

1. Зайдите в **Deployments**
2. Найдите деплой с коммитом `8c31ec8` (если он есть)
3. Нажмите на три точки (⋯) → **Redeploy**
4. Или нажмите кнопку **Redeploy** вверху страницы

### 3. Проверьте настройки Build and Deployment:

1. В настройках перейдите в **Build and Deployment**
2. Проверьте:
   - **Production Branch**: должен быть `main`
   - **Build Command**: должен быть `npm run build` или автоматически определен
   - **Output Directory**: должен быть `.next` или автоматически определен

### 4. Проверьте логи деплоя:

1. Откройте последний деплой в **Deployments**
2. Перейдите в **Build Logs**
3. Проверьте, какой коммит используется для сборки
4. Должен быть указан SHA `8c31ec8`

## Если ничего не помогает:

### Переподключите репозиторий:

1. В настройках Git нажмите **Disconnect**
2. Подождите 5 секунд
3. Нажмите **Connect Git Repository**
4. Выберите `incometracker2`
5. Vercel автоматически задеплоит проект

### Или создайте новый коммит:

```bash
# Сделайте небольшое изменение
touch .vercel-trigger
git add .vercel-trigger
git commit -m "Trigger Vercel deployment"
git push origin main
```

## Проверка после деплоя:

После успешного деплоя:

1. Откройте задеплоенный сайт
2. Откройте консоль браузера (F12)
3. Проверьте сообщения:
   - Должны быть сообщения о Firebase конфигурации (если код обновлен)
   - Не должно быть ошибок о Firebase

4. Проверьте SHA в деплое:
   - Должен быть `8c31ec8` или новее

