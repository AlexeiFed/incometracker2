// Скрипт для генерации иконок из SVG
// Требует установки sharp: npm install --save-dev sharp
const fs = require("fs");
const path = require("path");

// Простой скрипт для создания placeholder иконок
// В реальном проекте используйте sharp или другой инструмент для конвертации SVG в PNG

const sizes = [180, 192, 512];

console.log("Для генерации иконок используйте:");
console.log("1. Онлайн генератор: https://realfavicongenerator.net/");
console.log("2. Или установите sharp: npm install --save-dev sharp");
console.log("3. Создайте иконки размером 180x180, 192x192, 512x512");
console.log("4. Сохраните их как:");
sizes.forEach((size) => {
  const filename = size === 180 ? "apple-touch-icon.png" : `icon-${size}.png`;
  console.log(`   - public/${filename} (${size}x${size})`);
});

