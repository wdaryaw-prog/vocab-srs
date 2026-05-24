# СЛОВА · vocab-srs

Приложение для изучения английских слов из сериалов.

## Деплой на Vercel

### 1. Загрузи проект на GitHub

1. Зайди на github.com → кнопка **+** → **New repository**
2. Назови `vocab-srs`, оставь публичным, нажми **Create repository**
3. На странице репозитория нажми **uploading an existing file**
4. Перетащи все файлы проекта (папки `api`, `public`, файл `vercel.json`)
5. Нажми **Commit changes**

### 2. Задеплой на Vercel

1. Зайди на vercel.com → **Add New Project**
2. Выбери репозиторий `vocab-srs` → **Import**
3. Ничего не меняй → нажми **Deploy**
4. Подожди ~1 минуту

### 3. Добавь API ключ

1. В Vercel зайди в проект → **Settings** → **Environment Variables**
2. Добавь переменную:
   - Name: `ANTHROPIC_API_KEY`
   - Value: вставь свой ключ (начинается с `sk-ant-...`)
3. Нажми **Save**
4. Зайди во вкладку **Deployments** → три точки → **Redeploy**

### 4. Открой на телефоне

Твой адрес будет `https://vocab-srs-[что-то].vercel.app`

В Safari: **Поделиться → Добавить на экран Домой** — появится иконка как у приложения.

## Структура

```
vocab-srs/
  api/
    translate.js    ← serverless function, прячет API ключ
  public/
    index.html      ← всё приложение
  vercel.json       ← конфиг
```
