// main.js
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Load header and footer
document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('/partials/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            setActiveNavLink();
            initializeCart();
            initializeMobileMenu(); // Add this line
        });

    // Load footer
    fetch('/partials/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
});

// Set active nav link
function setActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

// Initialize mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            // Toggle aria attributes for accessibility
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            mainNav.setAttribute('aria-hidden', isExpanded);
            
            // Toggle menu visibility
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            
            // Close cart if open
            const cartModal = document.getElementById('cart-modal');
            if (cartModal && cartModal.classList.contains('active')) {
                cartModal.classList.remove('active');
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mainNav.setAttribute('aria-hidden', 'true');
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            const isClickInside = mobileMenuToggle.contains(e.target) || mainNav.contains(e.target);
            
            if (!isClickInside && 
                mobileMenuToggle.getAttribute('aria-expanded') === 'true') {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mainNav.setAttribute('aria-hidden', 'true');
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            }
        });
    }
}

// Initialize cart functionality
function initializeCart() {
    updateCartCount();
    
    const cartToggle = document.getElementById('cart-toggle');
    const cartModal = document.getElementById('cart-modal');
    const closeCart = document.getElementById('close-cart');
    
    if (cartToggle && cartModal) {
        cartToggle.addEventListener('click', function(e) {
            e.preventDefault();
            cartModal.classList.add('active');
            renderCartItems();
            
            // Close mobile menu if open
            const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
            const mainNav = document.getElementById('main-nav');
            if (mobileMenuToggle && mainNav) {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mainNav.setAttribute('aria-hidden', 'true');
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            }
        });
    }
    
    if (closeCart) {
        closeCart.addEventListener('click', function() {
            cartModal.classList.remove('active');
        });
    }
    
    // Close cart when clicking outside
    cartModal.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });
}

// Update cart count in header
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => el.textContent = count);
}

// Render cart items
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.querySelector('.total-price');
    
    if (!cartItemsContainer) return;
    
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
    
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    renderCartItems();
    updateCartCount();
}