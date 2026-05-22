document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');
    const body = document.body;

    if (mobileMenuBtn && navbar) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navbar.classList.toggle('active');
            
            // Change icon
            const icon = this.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                body.style.overflow = '';
            }
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.navbar a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navbar.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                body.style.overflow = '';
            }
        });
    }

    // Cart functionality
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartBtn = document.querySelector('.cart-btn');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartClose = document.querySelector('.cart-close');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    // Toggle cart sidebar
    function toggleCart() {
        cartSidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }
    
    cartBtn.addEventListener('click', toggleCart);
    cartClose.addEventListener('click', toggleCart);
    overlay.addEventListener('click', toggleCart);
    
    // Update cart display
    function updateCart() {
        const cartCount = document.querySelector('.cart-count');
        const cartItemsContainer = document.querySelector('.cart-items');
        const cartTotal = document.querySelector('.total-amount');
        
        // Update cart count
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Update cart items
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
            cartTotal.textContent = '$0.00';
            return;
        }
        
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
                    <div class="cart-item-price">$${item.price} × ${item.quantity}</div>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += item.price * item.quantity;
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                cart = cart.filter(item => item.id !== id);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCart();
            });
        });
        
        // Update total
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
    
    // Initialize cart
    updateCart();

    // Service card animations
    const serviceCards = document.querySelectorAll('.service-card');
    
    const animateOnScroll = () => {
        serviceCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    });
    
    // Animate when scrolling
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

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
});