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

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: this.querySelector('#name').value,
                email: this.querySelector('#email').value,
                phone: this.querySelector('#phone').value,
                subject: this.querySelector('#subject').value,
                message: this.querySelector('#message').value
            };
            
            // In a real implementation, you would send this data to your server
            console.log('Form submitted:', formData);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            answer.classList.toggle('active');
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
});