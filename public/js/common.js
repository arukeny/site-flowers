// public/js/common.js

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const cartCountSpan = document.querySelector('.header-icons .cart-count');
    if (cartCountSpan) {
        cartCountSpan.textContent = totalItems.toString();
    }
}

// Функция добавления товара в корзину (теперь глобальная)
function addToCart(productData) { // productData должен содержать id, name, price, image_url
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingProductIndex = cart.findIndex(item => item.id === productData.id);

    if (existingProductIndex > -1) {
        // Если товар уже есть в корзине, увеличиваем его количество
        cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) + 1;
    } else {
        // Если товара нет, добавляем его с количеством 1
        productData.quantity = 1; // Устанавливаем количество 1 для нового товара
        cart.push(productData);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(); // Обновляем счетчик корзины после изменения
    alert(`«${productData.name}» добавлен в корзину!`);
}

// Вызываем функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', updateCartCount);