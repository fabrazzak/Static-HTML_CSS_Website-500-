
// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');

mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
});

// Shopping Cart Functionality
let cart = [];

// Load cart from localStorage when page loads
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('tripleThreatCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Save cart to localStorage
function saveCartToStorage() {
    localStorage.setItem('tripleThreatCart', JSON.stringify(cart));
}

// Call loadCartFromStorage when page loads
document.addEventListener('DOMContentLoaded', loadCartFromStorage);

// DOM Elements
const cartIcon = document.getElementById('cartIcon');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const closeCartModal = document.getElementById('closeCartModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutForm = document.getElementById('checkoutForm');
const orderConfirmationModal = document.getElementById('orderConfirmationModal');
const closeOrderModal = document.getElementById('closeOrderModal');
const continueShoppingBtn = document.getElementById('continueShoppingBtn');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const blogModal = document.getElementById('blogModal');
const closeBlogModal = document.getElementById('closeBlogModal');
const blogModalContent = document.getElementById('blogModalContent');
const readMoreButtons = document.querySelectorAll('.read-more');

// Open Cart Modal
cartIcon.addEventListener('click', () => {
    updateCartDisplay();
    cartModal.style.display = 'block';
});

// Close Cart Modal
closeCartModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
    if (e.target === orderConfirmationModal) {
        orderConfirmationModal.style.display = 'none';
    }
    
});

// Add to Cart Functionality
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const id = button.getAttribute('data-id');
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        const image = button.getAttribute('data-image');
        
        // Check if item already exists in cart
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
        
        updateCartCount();
        saveCartToStorage();
        
        // Show added to cart feedback
        button.textContent = 'Added!';
        setTimeout(() => {
            button.textContent = 'Add to Cart';
        }, 1000);
    });
});

// Update Cart Count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
}

// Update Cart Display
function updateCartDisplay() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    let itemsHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        itemsHTML += `
            <div class="cart-item">
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <div class="cart-item-remove" data-id="${item.id}">
                    <i class="fas fa-times"></i>
                </div>
            </div>
        `;
    });
    
    cartItems.innerHTML = itemsHTML;
    cartTotal.textContent = total.toFixed(2);
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            cart = cart.filter(item => item.id !== id);
            updateCartDisplay();
            updateCartCount();
            saveCartToStorage();
        });
    });
}

// Checkout Form Submission
checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    cartModal.style.display = 'none';
    orderConfirmationModal.style.display = 'block';
    
    // Clear cart
    cart = [];
    updateCartCount();
    saveCartToStorage();
    
    // Reset form
    checkoutForm.reset();
});

