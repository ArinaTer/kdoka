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
git checkout dev -- dist/ 2>/dev/null || echo "Не удалось скопировать dist из dev ветки"

# Перемещаем файлы из dist в корень
echo "📁 Перемещаем файлы в корень..."
if [ -d "dist" ]; then
    # Перемещаем все файлы из dist в корень
    mv dist/* . 2>/dev/null || true
    mv dist/.* . 2>/dev/null || true
    rmdir dist 2>/dev/null || true

    # Добавляем все файлы в корень
    git add -f .
else
    echo "❌ Папка dist не найдена"
    exit 1
fi

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
