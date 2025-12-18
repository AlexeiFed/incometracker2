# Изменение remote репозитория Git

## Что было сделано:

Remote репозиторий изменен с `incomeTracker` на `incometracker2`.

## Проверка:

```bash
git remote -v
```

Должно показать:
```
origin	https://github.com/AlexeiFed/incometracker2.git (fetch)
origin	https://github.com/AlexeiFed/incometracker2.git (push)
```

## Следующие шаги:

### 1. Запушьте текущий код в новый репозиторий:

```bash
git push -u origin main
```

Или если ваша ветка называется `master`:
```bash
git push -u origin master
```

### 2. Проверьте на Vercel:

1. Зайдите в настройки проекта на Vercel
2. Перейдите в **Settings** → **Git**
3. Убедитесь, что подключен репозиторий `incometracker2`
4. Если нет - подключите его:
   - Нажмите **Disconnect** (если подключен старый)
   - Нажмите **Connect Git Repository**
   - Выберите `incometracker2`

### 3. После подключения:

Vercel автоматически задеплоит проект из нового репозитория.

## Если нужно вернуться к старому репозиторию:

```bash
git remote set-url origin https://github.com/AlexeiFed/incomeTracker.git
```

## Полезные команды:

- Показать все remote репозитории:
  ```bash
  git remote -v
  ```

- Изменить URL remote:
  ```bash
  git remote set-url origin <новый-url>
  ```

- Добавить новый remote (если нужно несколько):
  ```bash
  git remote add <имя> <url>
  ```

- Удалить remote:
  ```bash
  git remote remove <имя>
  ```

