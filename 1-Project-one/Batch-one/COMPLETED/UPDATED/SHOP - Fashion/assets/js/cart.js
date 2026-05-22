document.addEventListener('DOMContentLoaded', function() {
    // Cart toggle functionality
    const cartToggle = document.getElementById('cart-toggle');
    const cartModal = document.getElementById('cart-modal');
    const closeCart = document.getElementById('close-cart');
    
    if (cartToggle && cartModal) {
        cartToggle.addEventListener('click', function(e) {
            e.preventDefault();
            cartModal.classList.add('active');
            renderCartItems();
        });
    }
    
    if (closeCart) {
        closeCart.addEventListener('click', function() {
            cartModal.classList.remove('active');
        });
    }
    
    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
});

// Render cart items
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.querySelector('.total-price');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-bag"></i>
                <p>Your cart is empty</p>
                <a href="/shop/" class="btn">Continue Shopping</a>
            </div>
        `;
        if (cartTotal) cartTotal.textContent = '€0.00';
        return;
    }
    
    let cartHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        
        cartHTML += `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <p class="cart-item-price">€${item.price.toFixed(2)}</p>
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="quantity-btn minus">-</button>
                            <input type="text" class="quantity-value" value="${item.quantity}" readonly>
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="remove-item">Remove</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = cartHTML;
    if (cartTotal) cartTotal.textContent = `€${total.toFixed(2)}`;
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', updateQuantity);
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', removeItem);
    });
}

// Update quantity
function updateQuantity(e) {
    const cartItem = e.target.closest('.cart-item');
    const productId = parseInt(cartItem.dataset.id);
    const quantityInput = cartItem.querySelector('.quantity-value');
    let quantity = parseInt(quantityInput.value);
    
    if (e.target.classList.contains('plus')) {
        quantity += 1;
    } else if (e.target.classList.contains('minus') && quantity > 1) {
        quantity -= 1;
    }
    
    // Update cart
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
        updateCartCount();
    }
}

// Remove item
function removeItem(e) {
    const cartItem = e.target.closest('.cart-item');
    const productId = parseInt(cartItem.dataset.id);
    
    // Remove from cart
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    renderCartItems();
    updateCartCount();
}

// Checkout
function checkout() {
    alert('Checkout functionality would be implemented here!');
    // In a real implementation, this would redirect to a checkout page
}
