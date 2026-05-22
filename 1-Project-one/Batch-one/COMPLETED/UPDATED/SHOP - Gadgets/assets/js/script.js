document.addEventListener('DOMContentLoaded', function() {

    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }
    
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    mobileMenuClose.addEventListener('click', toggleMobileMenu);
    overlay.addEventListener('click', toggleMobileMenu);
    
    // Cart Toggle
    const cartBtn = document.querySelector('.cart-btn');
    const cartClose = document.querySelector('.cart-close');
    const cartSidebar = document.querySelector('.cart-sidebar');
    
    function toggleCart() {
        cartSidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }
    
    cartBtn.addEventListener('click', toggleCart);
    cartClose.addEventListener('click', toggleCart);
    overlay.addEventListener('click', toggleCart);
    
    // Add to Cart Functionality
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.total-amount');
    
    let cart = [];
    
    function updateCart() {
        // Update cart count
        cartCount.textContent = cart.length;
        
        // Update cart items display
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
            cartTotal.textContent = '€0.00';
            return;
        }
        
        cartItemsContainer.innerHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">€${item.price.toFixed(2)}</div>
                    <div class="cart-item-actions">
                        <button class="cart-item-remove" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += item.price;
        });
        
        // Update total
        cartTotal.textContent = `€${total.toFixed(2)}`;
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                cart = cart.filter(item => item.id !== id);
                updateCart();
            });
        });
    }
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productId = productCard.querySelector('h3').textContent.trim().toLowerCase().replace(/\s+/g, '-');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseFloat(productCard.querySelector('.current-price').textContent.replace('€', ''));
            const productImage = productCard.querySelector('.product-image img').src;
            
            // Add to cart
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage
            });
            
            updateCart();
            
            // Show cart sidebar
            if (!cartSidebar.classList.contains('active')) {
                toggleCart();
            }
            
            // Add animation to cart button
            cartBtn.classList.add('animate');
            setTimeout(() => {
                cartBtn.classList.remove('animate');
            }, 500);
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[name="name"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const message = this.querySelector('textarea[name="message"]').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Here you would normally send the form data to a server
            // For this demo, we'll just show a success message
            alert(`Thank you, ${name}! Your message has been sent. We'll get back to you soon.`);
            this.reset();
        });
    }
    
    // Initialize cart
    updateCart();
});