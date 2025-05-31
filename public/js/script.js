document.addEventListener('DOMContentLoaded', () => {
    // Получаем ссылки на элементы
    const slider = document.querySelector('.bouquet-slider-wrapper');
    const prevButton = document.getElementById('prevBouquet');
    const nextButton = document.getElementById('nextBouquet');

    // Проверяем, что все элементы найдены, прежде чем добавлять обработчики событий
    if (slider && prevButton && nextButton) {
        const scrollAmount = 280; // Расстояние прокрутки (можешь настроить)

        prevButton.addEventListener('click', () => {
            slider.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth' // Плавная прокрутка
            });
        });

        nextButton.addEventListener('click', () => {
            slider.scrollBy({
                left: scrollAmount,
                behavior: 'smooth' // Плавная прокрутка
            });
        });

        console.log('Slider elements and buttons found. Event listeners attached.'); // Для отладки
    } else {
        console.warn('One or more slider elements not found!', { slider, prevButton, nextButton }); // Для отладки
    }
});