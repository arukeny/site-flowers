document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');

    async function fetchProducts() {
        try {
            const response = await fetch('/api/products');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const products = await response.json();
            displayProducts(products);
        } catch (error) {
            console.error('Ошибка при загрузке товаров:', error);
            productsContainer.innerHTML = '<p class="text-danger">Не удалось загрузить товары. Пожалуйста, попробуйте позже.</p>';
        }
    }


    function displayProducts(products) {
        if (!products || products.length === 0) {
            productsContainer.innerHTML = '<p class="text-muted">Товары пока отсутствуют в магазине.</p>';
            return;
        }

        productsContainer.innerHTML = '';

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
            productsContainer.insertAdjacentHTML('beforeend', productCardHtml);
        });


        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-product-id'));
                const product = products.find(p => p.id === productId);
                if (product) {
                    addToCart(product);
                }
            });
        });
    }

    // Старт
    fetchProducts();
});