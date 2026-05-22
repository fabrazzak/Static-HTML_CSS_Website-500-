document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart from localStorage or empty array
    let cart = JSON.parse(localStorage.getItem('mindseeds-cart')) || [];
    
    // DOM Elements
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartModal = document.querySelector('.cart-modal');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.total-amount');
    const closeCartButton = document.querySelector('.close-cart');
    const continueShoppingButton = document.querySelector('.continue-shopping');
    const checkoutButton = document.querySelector('.checkout');
    const cartCounter = document.createElement('span');
    
    // Create cart counter in header
    function initCartCounter() {
        const header = document.querySelector('.header .container');
        cartCounter.className = 'cart-counter';
        updateCartCounter();
        header.appendChild(cartCounter);
    }
    
    // Update cart counter
    function updateCartCounter() {
        cartCounter.textContent = cart.length;
        cartCounter.style.display = cart.length ? 'flex' : 'none';
    }
    
    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            const price = parseFloat(this.getAttribute('data-price'));
            
            // Add item to cart
            cart.push({
                service: service,
                price: price,
                id: Date.now() // Unique identifier for each item
            });
            
            // Save to localStorage
            localStorage.setItem('mindseeds-cart', JSON.stringify(cart));
            
            // Update UI
            updateCart();
            updateCartCounter();
            
            // Show cart modal
            cartModal.classList.add('active');
            
            // Show success message
            showToast(`${service} added to cart`);
        });
    });
    
    // Update cart UI
    function updateCart() {
        // Clear cart items
        cartItemsContainer.innerHTML = '';
        
        // Add items to cart
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">${item.service}</div>
                <div class="cart-item-price">€${item.price.toFixed(2)}</div>
                <button class="remove-item" data-id="${item.id}"><i class="fas fa-times"></i></button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        
        // Update total
        cartTotal.textContent = `€${total.toFixed(2)}`;
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = parseInt(this.getAttribute('data-id'));
                removeFromCart(itemId);
            });
        });
    }
    
    // Remove item from cart
    function removeFromCart(itemId) {
        cart = cart.filter(item => item.id !== itemId);
        localStorage.setItem('mindseeds-cart', JSON.stringify(cart));
        updateCart();
        updateCartCounter();
        
        if (cart.length === 0) {
            setTimeout(() => {
                cartModal.classList.remove('active');
            }, 300);
        }
    }
    
    // Cart modal controls
    closeCartButton.addEventListener('click', function() {
        cartModal.classList.remove('active');
    });
    
    continueShoppingButton.addEventListener('click', function() {
        cartModal.classList.remove('active');
    });
    
    checkoutButton.addEventListener('click', function() {
        if (cart.length === 0) {
            showToast('Your cart is empty');
            return;
        }
        
        // In a real implementation, this would redirect to a checkout page
        // For this demo, we'll show a confirmation and clear the cart
        showToast('Thank you for your booking! We will contact you shortly.');
        cart = [];
        localStorage.removeItem('mindseeds-cart');
        updateCart();
        updateCartCounter();
        cartModal.classList.remove('active');
    });
    
    // Close modal when clicking outside
    cartModal.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });
    
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null;
            }
        });
    });
    
    // Toast notification
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(toast);
        
        // Add show class after a short delay
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
    
    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .test-card, .pricing-card, .faq-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize elements with hidden state
    function initAnimations() {
        const animatedElements = document.querySelectorAll('.service-card, .test-card, .pricing-card, .faq-item');
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
    }
    
    // Initialize page
    function init() {
        initCartCounter();
        initAnimations();
        updateCart();
        
        // Run animations on load
        animateOnScroll();
        
        // Run animations on scroll
        window.addEventListener('scroll', animateOnScroll);
    }
    
    // Start the application
    init();
});