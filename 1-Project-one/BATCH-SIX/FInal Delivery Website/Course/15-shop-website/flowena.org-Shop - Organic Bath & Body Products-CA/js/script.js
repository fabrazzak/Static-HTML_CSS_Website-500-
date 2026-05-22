// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mainNav = document.getElementById('main-nav');

mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    mobileMenuBtn.innerHTML = mainNav.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const cartIcon = document.getElementById('cart-icon');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');
const cartBody = document.getElementById('cart-body');
const cartTotal = document.getElementById('cart-total');
const addToCartBtns = document.querySelectorAll('.add-to-cart');
const cartCount = document.querySelector('.cart-count');
const continueShopping = document.getElementById('continue-shopping');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutModal = document.getElementById('checkout-modal');
const closeCheckout = document.getElementById('close-checkout');
const backToCart = document.getElementById('back-to-cart');
const placeOrder = document.getElementById('place-order');
const confirmationModal = document.getElementById('confirmation-modal');
const closeConfirmation = document.getElementById('close-confirmation');
const returnToShop = document.getElementById('return-to-shop');
const notification = document.getElementById('notification');

// Save cart to local storage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add to Cart
addToCartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const name = btn.getAttribute('data-name');
        const price = parseFloat(btn.getAttribute('data-price'));
        const image = btn.getAttribute('data-image');
        
        // Check if item already in cart
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id,
                name,
                price,
                image,
                quantity: 1
            });
        }
        
        updateCart();
        saveCart();
        showNotification();
    });
});

// Show Notification
function showNotification() {
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Update Cart
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart modal
    cartBody.innerHTML = '';
    
    if (cart.length === 0) {
        cartBody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 30px;">Your cart is empty</td></tr>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div class="cart-item-img">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <span>${item.name}</span>
                </div>
            </td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                </div>
            </td>
            <td>$${itemTotal.toFixed(2)}</td>
            <td><button class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></button></td>
        `;
        
        cartBody.appendChild(row);
    });
    
    cartTotal.textContent = total.toFixed(2);
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.decrease').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const item = cart.find(item => item.id === id);
            
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                cart = cart.filter(item => item.id !== id);
            }
            
            updateCart();
            saveCart();
        });
    });
    
    document.querySelectorAll('.increase').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const item = cart.find(item => item.id === id);
            item.quantity += 1;
            updateCart();
            saveCart();
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            cart = cart.filter(item => item.id !== id);
            updateCart();
            saveCart();
        });
    });
}

// Open Cart
cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

// Close Cart
closeCart.addEventListener('click', () => {
    cartModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

continueShopping.addEventListener('click', () => {
    cartModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    
    cartModal.style.display = 'none';
    checkoutModal.style.display = 'flex';
});

// Close Checkout
closeCheckout.addEventListener('click', () => {
    checkoutModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

backToCart.addEventListener('click', () => {
    checkoutModal.style.display = 'none';
    cartModal.style.display = 'flex';
});

// Place Order
placeOrder.addEventListener('click', () => {
    // In a real implementation, you would send the order data to your server here
    checkoutModal.style.display = 'none';
    confirmationModal.style.display = 'flex';
    
    // Clear cart
    cart = [];
    updateCart();
    saveCart();
});

// Close Confirmation
closeConfirmation.addEventListener('click', () => {
    confirmationModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

returnToShop.addEventListener('click', () => {
    confirmationModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    window.location.href = '/shop/';
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    if (e.target === checkoutModal) {
        checkoutModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    if (e.target === confirmationModal) {
        confirmationModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Initialize cart
updateCart();