let cart = [];
let totalQuantity = 0;

function increaseQuantity(productId) {
    const quantityElement = document.getElementById(`quantity-${productId}`);
    let quantity = parseInt(quantityElement.textContent) || 0;
    quantity++;
    quantityElement.textContent = quantity;
    updateCartQuantity();
}

function decreaseQuantity(productId) {
    const quantityElement = document.getElementById(`quantity-${productId}`);
    let quantity = parseInt(quantityElement.textContent) || 0;
    if (quantity > 0) {
        quantity--;
        quantityElement.textContent = quantity;
        updateCartQuantity();
    }
}

function addToCart(productId, price) {
    const quantity = parseInt(document.getElementById(`quantity-${productId}`).textContent) || 0;
    if (quantity > 0) {
        cart.push({ productId, price, quantity });
        updateCartItems();
    }
}

function updateCartItems() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.textContent = `${item.productId} - $${item.price} x ${item.quantity}`;
        cartItems.appendChild(cartItem);
    });
}

function updateCartQuantity() {
    totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-quantity').textContent = totalQuantity;
}

function toggleCart() {
    const cartElement = document.getElementById('cart');
    cartElement.style.right = cartElement.style.right === '0px' ? '-300px' : '0px';
}

// Close cart when clicking outside of it
document.addEventListener('click', function(event) {
    const cart = document.getElementById('cart');
    const cartIcon = document.querySelector('.cart-icon');

    // Check if the click is outside the cart and the cart icon
    if (cart.style.right === '0px' && !cart.contains(event.target) && !cartIcon.contains(event.target)) {
        toggleCart(); // Close the cart
    }
});

function checkout() {
    alert('Proceeding to checkout!');
}