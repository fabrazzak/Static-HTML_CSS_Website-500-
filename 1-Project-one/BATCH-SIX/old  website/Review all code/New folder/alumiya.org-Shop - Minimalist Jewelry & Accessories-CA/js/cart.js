document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();

    // Cart Modal Elements
    const cartSidebar = document.getElementById('cartSidebar');
    const cartIcon = document.getElementById('cartIcon');
    const closeCart = document.querySelector('.close-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalContainer = document.querySelector('.cart-total');
    const proceedToCheckoutBtn = document.querySelector('.proceed-checkout');
    const backToCartBtn = document.querySelector('.back-to-cart');
    const checkoutForm = document.querySelector('.checkout-form');
    const thankYouMessage = document.querySelector('.thank-you-message');
    const placeOrderBtn = document.querySelector('.place-order');

    // Open cart modal
    if (cartIcon) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            openCart();
        });
    }

    // Close cart modal
    if (closeCart) {
        closeCart.addEventListener('click', () => {
            closeCartModal();
        });
    }

    // Proceed to checkout
    if (proceedToCheckoutBtn) {
        proceedToCheckoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showCheckoutForm();
        });
    }

    // Back to cart from checkout
    if (backToCartBtn) {
        backToCartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showCartItems();
        });
    }

    // Place order
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', (e) => {
            e.preventDefault();
            submitOrder();
        });
    }

    // Add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productId = productCard.dataset.id || Math.random().toString(36).substr(2, 9);
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseFloat(productCard.querySelector('.product-price').textContent.replace('$', ''));
            const productImage = productCard.querySelector('.product-image img').src;
            
            addToCart({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
        });
    });

    // Quick View Add to Cart
    document.querySelectorAll('.quick-view-add-to-cart').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.dataset.id || Math.random().toString(36).substr(2, 9);
            const productName = document.querySelector('.quick-view-details h2').textContent;
            const productPrice = parseFloat(document.querySelector('.quick-view-price').textContent.replace('$', ''));
            const productImage = document.querySelector('.quick-view-image img').src;
            const quantity = parseInt(document.querySelector('.quick-view-details input[type="number"]').value);
            
            addToCart({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: quantity
            });
        });
    });

    // Function to add item to cart
  function addToCart(product) {
    // Generate a unique ID for each new cart item (even if same product)
    const uniqueId = product.id + '-' + Date.now(); // Example: "product123-1713723456789"
    
    // Add the product with a unique ID (always as a new item)
    cart.push({
        ...product, // Spread existing properties
        id: uniqueId // Override ID to ensure uniqueness
    });
    
    saveCart();
    updateCartCount();
    showNotification('Item added to cart!');
    
    // Refresh cart display if open
    if (cartSidebar.classList.contains('active')) {
        renderCartItems();
    }
}

    // Function to remove item from cart
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        updateCartCount();
        renderCartItems();
        showNotification('Item removed from cart!');
    }

    // Function to update item quantity
    function updateQuantity(productId, newQuantity) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            saveCart();
            renderCartItems();
        }
    }

    // Function to save cart to localStorage
  
        function saveCart() {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    

    // Function to update cart count in header
    function updateCartCount() {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        const cartCountElements = document.querySelectorAll('.cart-count span');
        
        cartCountElements.forEach(element => {
            element.textContent = count;
        });
    }

    // Function to render cart items in modal
    function renderCartItems() {
        if (!cartItemsContainer) return;
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
            cartTotalContainer.innerHTML = '';
            return;
        }
        
        let itemsHTML = '';
        let subtotal = 0;
        
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
            
            itemsHTML += `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                        <div class="cart-item-quantity">
                            <button class="minus-btn">-</button>
                            <input type="number" value="${item.quantity}" min="1">
                            <button class="plus-btn">+</button>
                        </div>
                        <span class="remove-item">Remove</span>
                    </div>
                </div>
            `;
        });
        
        cartItemsContainer.innerHTML = itemsHTML;
        
        // Update totals
        const shipping = subtotal > 0 ? 5.99 : 0; // Example shipping cost
        const total = subtotal + shipping;
        
        cartTotalContainer.innerHTML = `
            <div class="cart-total-row">
                <span>Subtotal:</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="cart-total-row">
                <span>Shipping:</span>
                <span>$${shipping.toFixed(2)}</span>
            </div>
            <div class="cart-total-row total">
                <span>Total:</span>
                <span>$${total.toFixed(2)}</span>
            </div>
        `;
        
        // Add event listeners to new elements
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = this.closest('.cart-item').dataset.id;
                removeFromCart(itemId);
            });
        });
        
        document.querySelectorAll('.cart-item-quantity .minus-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const input = this.nextElementSibling;
                let value = parseInt(input.value);
                if (value > 1) {
                    input.value = value - 1;
                    updateItemQuantity(this);
                }
            });
        });
        
        document.querySelectorAll('.cart-item-quantity .plus-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const input = this.previousElementSibling;
                let value = parseInt(input.value);
                input.value = value + 1;
                updateItemQuantity(this);
            });
        });
        
        document.querySelectorAll('.cart-item-quantity input').forEach(input => {
            input.addEventListener('change', function() {
                updateItemQuantity(this);
            });
        });
    }
    
    function updateItemQuantity(element) {
        const cartItem = element.closest('.cart-item');
        const itemId = cartItem.dataset.id;
        const newQuantity = parseInt(cartItem.querySelector('input').value);
        updateQuantity(itemId, newQuantity);
    }

    // Function to show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    }

    // Function to open cart
    function openCart() {
        renderCartItems();
        cartSidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
        showCartItems();
    }

    // Function to close cart modal
    function closeCartModal() {
        cartSidebar.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Function to show checkout form
    function showCheckoutForm() {
        document.querySelector('.cart-items-section').style.display = 'none';
        checkoutForm.classList.add('active');
    }

    // Function to show cart items
    function showCartItems() {
        document.querySelector('.cart-items-section').style.display = 'block';
        checkoutForm.classList.remove('active');
        thankYouMessage.classList.remove('active');
    }

    // Function to submit order
    function submitOrder() {
        const form = document.querySelector('.checkout-form form');
        const formData = new FormData(form);
        
        // Here you would normally send the data to a server
        // For demo purposes, we'll just show the thank you message
        
        // Clear the cart
        cart = [];
        saveCart();
        updateCartCount();
        
        // Hide checkout form and show thank you message
        checkoutForm.classList.remove('active');
        thankYouMessage.classList.add('active');
        
        // Close cart after 3 seconds
        setTimeout(() => {
            closeCartModal();
        }, 3000);
    }

    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (cartSidebar.classList.contains('active') && 
            !cartSidebar.contains(e.target) && 
            !cartIcon.contains(e.target) && 
            e.target !== cartIcon) {
            closeCartModal();
        }
    });
});