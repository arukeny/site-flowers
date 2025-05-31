// app.js (Изначальная версия)

const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Используем порт из переменных окружения или 3000 по умолчанию

// Указываем Express, где находятся статические файлы (HTML, CSS, JS, изображения)
// Важно: 'public' - это имя вашей папки со статическими файлами.
app.use(express.static('public'));

// Маршруты для ваших HTML-страниц
// Отправляем index.html, когда пользователь запрашивает корневой URL
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Отправляем shop.html, когда пользователь запрашивает /shop.html
app.get('/shop.html', (req, res) => {
    res.sendFile(__dirname + '/public/shop.html');
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
    console.log(`Главная страница: http://localhost:${port}`);
    console.log(`Страница магазина: http://localhost:${port}/shop.html`);
});