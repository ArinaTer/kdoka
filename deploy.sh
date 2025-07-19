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
git rm -rf dist/ index.html assets/ 2>/dev/null || true

# Копируем файлы из dev ветки
echo "📁 Копируем файлы из dev ветки..."
git checkout dev -- dist/index.html dist/assets/

# Перемещаем файлы в корень
echo "📁 Перемещаем файлы в корень..."
mv dist/index.html . 2>/dev/null || true
mv dist/assets . 2>/dev/null || true
rmdir dist 2>/dev/null || true

# Добавляем файлы в Git
echo "📁 Добавляем файлы в Git..."
git add -f index.html assets/

# Создаем коммит
echo "💾 Создаем коммит..."
git commit -m "Update production build - $(date)"

echo "✅ Деплой завершен!"
echo "📋 Текущая ветка: $(git branch --show-current)"
echo "📁 Файлы в корне:"
ls -la

# Возвращаемся на исходную ветку
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "🔄 Возвращаемся на ветку $CURRENT_BRANCH..."
    git checkout $CURRENT_BRANCH
fi
