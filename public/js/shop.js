// public/js/shop.js

document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');

    async function fetchProducts() {
        try {
            const response = await fetch('/api/products');
            if (!response.ok) {
                // Если сюда попадаем, значит есть проблема с HTTP-статусом ответа от сервера
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const products = await response.json();
            // console.log('Данные товаров получены из API:', products); // Временный вывод для отладки
            displayProducts(products);
        } catch (error) {
            console.error('Ошибка при загрузке товаров:', error);
            productsContainer.innerHTML = '<p class="text-danger">Не удалось загрузить товары. Пожалуйста, попробуйте позже.</p>';
        }
    }

    function displayProducts(products) {
        if (!products || products.length === 0) { // Добавил проверку !products
            productsContainer.innerHTML = '<p class="text-muted">Товары пока отсутствуют в нашем магазине.</p>';
            console.log('Нет товаров для отображения.'); // Для отладки
            return;
        }

        productsContainer.innerHTML = ''; // Очищаем контейнер

        products.forEach(product => {
            // Убедитесь, что product.name, product.price, product.image_url существуют
            // console.log('Отображение товара:', product); // Для отладки каждого товара

            const productCardHtml = `
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="product-card">
                        <img src="${product.image_url || '/img/placeholder.png'}" class="img-fluid rounded-3" alt="${product.name || 'Название товара'}">
                        <div class="card-body text-center">
                            <h5 class="product-name mt-3">${product.name || 'Название не указано'}</h5>
                            <p class="product-price">${product.price !== undefined ? product.price : 'Цена не указана'} &#8381;</p>
                            <button class="btn add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `;
            productsContainer.insertAdjacentHTML('beforeend', productCardHtml);
        });

        console.log('Товары успешно отображены. Кнопки "Add to Cart" пока не функциональны.');
    }

    fetchProducts();
});