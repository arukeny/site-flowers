

document.addEventListener('DOMContentLoaded', () => {
    const trendProductsContainer = document.getElementById('trend-products-container');

 
    async function fetchTrendProducts() {
        try {
            const response = await fetch('/api/products');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const products = await response.json();
            // Выбираем только первые 3 товара для отображения на главной
            const trendProducts = products.slice(0, 3);
            displayTrendProducts(trendProducts);
        } catch (error) {
            console.error('Ошибка при загрузке трендовых букетов:', error);
            trendProductsContainer.innerHTML = '<p class="text-danger">Не удалось загрузить трендовые букеты. Пожалуйста, попробуйте позже.</p>';
        }
    }

    
    function displayTrendProducts(products) {
        if (!products || products.length === 0) {
            trendProductsContainer.innerHTML = '<p class="text-muted">Трендовые букеты пока отсутствуют.</p>';
            return;
        }

        trendProductsContainer.innerHTML = ''; // Очищаем контейнер перед добавлением новых карточек

        products.forEach(product => {
            const productCardHtml = `
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="product-card">
                        <img src="${product.image_url || '/img/placeholder.png'}" class="img-fluid rounded-3" alt="${product.name || 'Товар'}">
                        <div class="card-body text-center">
                            <h5 class="product-name mt-3">${product.name || 'Без названия'}</h5>
                            <p class="product-price">${product.price !== undefined ? product.price : 'Цена не указана'} &#8381;</p>
                            <button class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `;
            trendProductsContainer.insertAdjacentHTML('beforeend', productCardHtml);
        });

        
        document.querySelectorAll('.trend-bouquet-section .add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-product-id'));
                
                const product = products.find(p => p.id === productId);
                if (product) {
                    addToCart(product);
                }
            });
        });
    }

    
    fetchTrendProducts();
});