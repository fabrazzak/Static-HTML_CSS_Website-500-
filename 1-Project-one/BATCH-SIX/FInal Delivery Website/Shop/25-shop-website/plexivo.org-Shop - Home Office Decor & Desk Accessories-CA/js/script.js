// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');

mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    mobileMenuBtn.innerHTML = mainNav.classList.contains('active') ?
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        if (mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Shopping Cart Functionality with localStorage
let cart = [];
const cartIcon = document.getElementById('cartIcon');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const closeCartModal = document.getElementById('closeCartModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutModal = document.getElementById('checkoutModal');
const closeCheckoutModal = document.getElementById('closeCheckoutModal');
const checkoutForm = document.getElementById('checkoutForm');
const orderConfirmationModal = document.getElementById('orderConfirmationModal');
const continueShoppingBtn = document.getElementById('continueShoppingBtn');

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('shoppingCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

// Load cart on page load
document.addEventListener('DOMContentLoaded', loadCart);

// Add to cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
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

        updateCart();
        saveCart(); // Save to localStorage after updating cart

        // Show cart modal when adding an item
        cartModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Update cart UI
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items list
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        checkoutBtn.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="decrease-quantity">-</button>
                        <input type="text" value="${item.quantity}" readonly>
                        <button class="increase-quantity">+</button>
                    </div>
                </div>
                <div class="remove-item">
                    <i class="fas fa-trash"></i>
                </div>
            </div>
        `).join('');

        checkoutBtn.style.display = 'block';

        // Add event listeners to quantity buttons
        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', () => {
                const itemId = button.closest('.cart-item').getAttribute('data-id');
                const item = cart.find(item => item.id === itemId);
                item.quantity += 1;
                updateCart();
                saveCart(); // Save to localStorage after updating
            });
        });

        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', () => {
                const itemId = button.closest('.cart-item').getAttribute('data-id');
                const item = cart.find(item => item.id === itemId);

                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    cart = cart.filter(item => item.id !== itemId);
                }

                updateCart();
                saveCart(); // Save to localStorage after updating
            });
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', () => {
                const itemId = button.closest('.cart-item').getAttribute('data-id');
                cart = cart.filter(item => item.id !== itemId);
                updateCart();
                saveCart(); // Save to localStorage after updating
            });
        });
    }

    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Cart modal toggle
cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

closeCartModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Checkout flow
checkoutBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
    checkoutModal.style.display = 'block';
});

closeCheckoutModal.addEventListener('click', () => {
    checkoutModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // In a real app, you would send this data to your server
    console.log('Order submitted:', {
        customer: {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value
        },
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    });

    // Show confirmation
    checkoutModal.style.display = 'none';
    orderConfirmationModal.style.display = 'block';

    // Clear cart
    cart = [];
    updateCart();
    saveCart(); // Save empty cart to localStorage

    // Reset form
    checkoutForm.reset();
});

continueShoppingBtn.addEventListener('click', () => {
    orderConfirmationModal.style.display = 'none';
    document.body.style.overflow = 'auto';
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

    if (e.target === orderConfirmationModal) {
        orderConfirmationModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    if (e.target === blogModal) {
        blogModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});


closeBlogModal.addEventListener('click', () => {
    blogModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});