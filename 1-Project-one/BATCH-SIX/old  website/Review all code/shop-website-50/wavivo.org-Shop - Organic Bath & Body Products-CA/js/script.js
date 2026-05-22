// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');

mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    mobileMenuBtn.innerHTML = mainNav.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

// Update cart modal
function updateCartModal() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
        cartTotal.textContent = '$0.00';
        return;
    }
    
    let itemsHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        itemsHTML += `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-info">
                    <div class="cart-item-img">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    </div>
                </div>
                <div class="cart-item-quantity">
                    <button class="decrease-quantity">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-quantity">+</button>
                </div>
            </div>
        `;
    });
    
    cartItems.innerHTML = itemsHTML;
    cartTotal.textContent = `$${total.toFixed(2)}`;
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = e.target.closest('.cart-item').dataset.id;
            increaseQuantity(itemId);
        });
    });
    
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = e.target.closest('.cart-item').dataset.id;
            decreaseQuantity(itemId);
        });
    });
}

// Add to cart
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const name = e.target.dataset.name;
        const price = parseFloat(e.target.dataset.price);
        const image = e.target.dataset.image;
        
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
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update UI
        updateCartCount();
        
        // Show added to cart animation
        const btn = e.target;
        btn.textContent = 'Added!';
        setTimeout(() => {
            btn.textContent = 'Add to Cart';
        }, 1000);
    });
});

// Increase quantity
function increaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartModal();
        updateCartCount();
    }
}

// Decrease quantity
function decreaseQuantity(id) {
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartModal();
        updateCartCount();
    }
}

// Cart modal toggle
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const closeModal = document.getElementById('closeModal');

cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'block';
    updateCartModal();
});

closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Checkout flow
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutForm = document.getElementById('checkoutForm');
const placeOrderBtn = document.getElementById('placeOrderBtn');
const confirmationModal = document.getElementById('confirmationModal');
const continueShoppingBtn = document.getElementById('continueShoppingBtn');

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    
    document.querySelector('.cart-items').style.display = 'none';
    document.querySelector('.cart-total').style.display = 'none';
    document.querySelector('.cart-actions').style.display = 'none';
    checkoutForm.style.display = 'block';
});

placeOrderBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Here you would normally send the order to your backend
    // For this demo, we'll just show the confirmation
    
    // Clear the cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Hide checkout form and show confirmation
    cartModal.style.display = 'none';
    confirmationModal.style.display = 'block';
});

continueShoppingBtn.addEventListener('click', () => {
    confirmationModal.style.display = 'none';
    window.location.href = '/shop/';
});

// Initialize cart count on page load
updateCartCount();
