document.addEventListener('DOMContentLoaded', function() {
    // Cart functionality
    const cart = {
        items: [],
        total: 0,
        
        addItem: function(service, price) {
            this.items.push({
                service: service,
                price: parseFloat(price)
            });
            this.calculateTotal();
            this.updateCartUI();
            this.showCartNotification();
        },
        
        removeItem: function(index) {
            this.items.splice(index, 1);
            this.calculateTotal();
            this.updateCartUI();
        },
        
        calculateTotal: function() {
            this.total = this.items.reduce((sum, item) => sum + item.price, 0);
        },
        
        updateCartUI: function() {
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');
            const cartCount = document.getElementById('cartCount');
            
            // Update cart count
            cartCount.textContent = this.items.length;
            
            // Update cart items list
            if (this.items.length === 0) {
                cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
            } else {
                cartItems.innerHTML = this.items.map((item, index) => `
                    <div class="cart-item">
                        <div class="cart-item-info">
                            <h4>${item.service}</h4>
                            <p>Service add-on</p>
                        </div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <button class="remove-item" data-index="${index}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `).join('');
            }
            
            // Update total
            cartTotal.textContent = `$${this.total.toFixed(2)}`;
            
            // Add event listeners to remove buttons
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', (e) => {
                    const index = parseInt(e.currentTarget.getAttribute('data-index'));
                    this.removeItem(index);
                });
            });
        },
        
        showCartNotification: function() {
            const notification = document.createElement('div');
            notification.className = 'cart-notification';
            notification.innerHTML = `
                <div class="notification-content">
                    <i class="fas fa-check-circle"></i>
                    <span>Item added to cart</span>
                </div>
            `;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('show');
            }, 10);
            
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        }
    };
    
    // Cart toggle functionality
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const openCart = document.getElementById('openCart');
    const closeCart = document.getElementById('closeCart');
    
    openCart.addEventListener('click', function() {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeCart.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    cartOverlay.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            const price = this.getAttribute('data-price');
            cart.addItem(service, price);
            
            // Button feedback
            this.innerHTML = '<i class="fas fa-check"></i> Added';
            this.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-plus"></i> Add to Cart';
                this.style.backgroundColor = '';
            }, 2000);
        });
    });
    
    // Checkout button
    const checkoutBtn = document.querySelector('.btn-checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.items.length === 0) {
                alert('Your cart is empty. Please add some services first.');
            } else {
                alert(`Proceeding to checkout with $${cart.total.toFixed(2)} in services. This would connect to a payment system in a real application.`);
                // In a real app, this would redirect to checkout page
            }
        });
    }
    
    // Animation on scroll for service page
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate__animated');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementPosition < windowHeight - elementVisible) {
                element.style.opacity = '1';
                
                // Check if element has animation class
                if (element.classList.contains('animate__fadeIn')) {
                    element.style.animation = 'fadeIn 1s ease forwards';
                } else if (element.classList.contains('animate__fadeInUp')) {
                    element.style.animation = 'fadeInUp 1s ease forwards';
                } else if (element.classList.contains('animate__fadeInDown')) {
                    element.style.animation = 'fadeInDown 1s ease forwards';
                }
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
});