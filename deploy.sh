#!/bin/bash

# Скрипт для деплоя собранной версии на ветку main

echo "🚀 Начинаем деплой..."

# Переключаемся на ветку dev
git checkout dev

# Собираем проект
echo "📦 Собираем проект..."
npm run build

# Переключаемся на ветку main
git checkout main

# Удаляем старые файлы
echo "🗑️ Удаляем старые файлы..."
git rm -rf dist/ 2>/dev/null || true

# Добавляем новые собранные файлы
echo "📁 Добавляем новые файлы..."
git add -f dist/

# Создаем коммит
echo "💾 Создаем коммит..."
git commit -m "Update production build - $(date)"

echo "✅ Деплой завершен!"
echo "📋 Текущая ветка: $(git branch --show-current)"
echo "📁 Файлы в dist/:"
ls -la dist/
