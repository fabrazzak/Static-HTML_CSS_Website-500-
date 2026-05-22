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
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

    // Cart Functionality
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartIcon = document.getElementById('cartIcon');
    const cartCounter = document.getElementById('cartCounter');
    const cartModal = document.getElementById('cartModal');
    const closeCartModal = document.getElementById('closeCartModal');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const continueShoppingBtn = document.getElementById('continueShopping');
    const checkoutBtn = document.getElementById('checkoutBtn');

    // Checkout Elements
    const checkoutModal = document.getElementById('checkoutModal');
    const closeCheckoutModal = document.getElementById('closeCheckoutModal');
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    const orderConfirmationModal = document.getElementById('orderConfirmationModal');
    const closeConfirmationModal = document.getElementById('closeConfirmationModal');
    const backToShopBtn = document.getElementById('backToShopBtn');

    // Initialize cart on page load
    updateCart();

    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

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

            updateCart();
            saveCart();
            cartModal.style.display = 'block';
        });
    });

    // Update Cart Function
    function updateCart() {
        // Update cart counter
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCounter.textContent = totalItems;

        // Update cart items display
        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            cartItems.innerHTML = '';
        } else {
            emptyCartMessage.style.display = 'none';
            cartItems.innerHTML = '';

            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
            <div class="cart-item-img">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                </div>
            </div>
            <div class="remove-item" data-id="${item.id}">
                <i class="fas fa-trash"></i>
            </div>
        `;
                cartItems.appendChild(cartItem);
            });

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

        // Update cart total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    // Cart Modal Controls
    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'block';
    });

    closeCartModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    continueShoppingBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Checkout Flow
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            cartModal.style.display = 'none';
            checkoutModal.style.display = 'block';
        }
    });

    closeCheckoutModal.addEventListener('click', () => {
        checkoutModal.style.display = 'none';
    });

    placeOrderBtn.addEventListener('click', () => {
        // In a real implementation, you would send the order data to a server here
        checkoutModal.style.display = 'none';
        orderConfirmationModal.style.display = 'block';

        // Clear the cart after order is placed
        cart = [];
        updateCart();
        saveCart();
    });

    closeConfirmationModal.addEventListener('click', () => {
        orderConfirmationModal.style.display = 'none';
    });

    backToShopBtn.addEventListener('click', () => {
        orderConfirmationModal.style.display = 'none';
        window.location.href = '/shop/';
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
        if (e.target === checkoutModal) {
            checkoutModal.style.display = 'none';
        }
        if (e.target === orderConfirmationModal) {
            orderConfirmationModal.style.display = 'none';
        }
        if (e.target === blogModal) {
            blogModal.style.display = 'none';
        }
    });
