#!/bin/bash

# Скрипт для деплоя собранной версии на ветку main

echo "🚀 Начинаем деплой..."

# Сохраняем текущую ветку
CURRENT_BRANCH=$(git branch --show-current)

# Переключаемся на ветку dev
git checkout dev

# Собираем проект
echo "📦 Собираем проект..."
npm run build

# Проверяем, что папка dist создалась
if [ ! -d "dist" ]; then
    echo "❌ Ошибка: папка dist не создалась после сборки"
    exit 1
fi

# Переключаемся на ветку main
git checkout main

# Удаляем старые файлы
echo "🗑️ Удаляем старые файлы..."
git rm -rf dist/ 2>/dev/null || true

# Копируем собранные файлы из dev ветки
echo "📁 Копируем собранные файлы..."
git checkout dev -- dist/

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

# Возвращаемся на исходную ветку
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "🔄 Возвращаемся на ветку $CURRENT_BRANCH..."
    git checkout $CURRENT_BRANCH
fi
