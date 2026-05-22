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

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with ${email}!`);
            this.reset();
        });
    }

    // Blog search functionality
    const blogSearchForm = document.querySelector('.blog-search form');
    if (blogSearchForm) {
        blogSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = this.querySelector('input').value.trim();
            if (query) {
                alert(`Searching for: ${query}`);
                // In a real implementation, you would redirect to search results
                // window.location.href = `/blog/search?query=${encodeURIComponent(query)}`;
            }
        });
    }

    // Category filter buttons
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            categoryButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            // In a real implementation, you would filter posts by category
        });
    });
});