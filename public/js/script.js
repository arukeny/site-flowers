document.addEventListener('DOMContentLoaded', () => {
    // Получаем ссылки на элементы
    const slider = document.querySelector('.bouquet-slider-wrapper');
    const prevButton = document.getElementById('prevBouquet');
    const nextButton = document.getElementById('nextBouquet');

    if (slider && prevButton && nextButton) {
        const scrollAmount = 280; 

        prevButton.addEventListener('click', () => {
            slider.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth' 
            });
        });

        nextButton.addEventListener('click', () => {
            slider.scrollBy({
                left: scrollAmount,
                behavior: 'smooth' 
            });
        });

        console.log('Slider elements and buttons found. Event listeners attached.'); 
    } else {
        console.warn('One or more slider elements not found!', { slider, prevButton, nextButton }); 
    }
});