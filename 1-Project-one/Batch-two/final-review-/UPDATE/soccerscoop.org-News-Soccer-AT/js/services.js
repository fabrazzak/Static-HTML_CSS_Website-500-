document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Add to cart functionality
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceType = this.dataset.plan || this.dataset.service;
            let serviceName = '';
            
            // Determine service name based on button clicked
            if (this.dataset.plan) {
                serviceName = this.closest('.pricing-card').querySelector('h3').textContent;
            } else {
                serviceName = this.closest('.option').querySelector('h4').textContent;
            }
            
            // Create notification
            const notification = document.createElement('div');
            notification.className = 'cart-notification';
            notification.innerHTML = `
                <span>${serviceName} added to your cart!</span>
                <a href="/cart/">View Cart</a>
            `;
            
            // Style notification
            notification.style.position = 'fixed';
            notification.style.bottom = '20px';
            notification.style.right = '20px';
            notification.style.backgroundColor = 'var(--success-color)';
            notification.style.color = 'white';
            notification.style.padding = '15px 20px';
            notification.style.borderRadius = '4px';
            notification.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.2)';
            notification.style.display = 'flex';
            notification.style.alignItems = 'center';
            notification.style.gap = '15px';
            notification.style.zIndex = '1000';
            notification.style.animation = 'fadeIn 0.3s ease-out';
            
            // Add to DOM
            document.body.appendChild(notification);
            
            // Remove after 3 seconds
            setTimeout(() => {
                notification.style.animation = 'fadeOut 0.3s ease-out';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 3000);
            
            // Add animation keyframes if not already present
            if (!document.getElementById('cart-animations')) {
                const style = document.createElement('style');
                style.id = 'cart-animations';
                style.textContent = `
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes fadeOut {
                        from { opacity: 1; transform: translateY(0); }
                        to { opacity: 0; transform: translateY(20px); }
                    }
                `;
                document.head.appendChild(style);
            }
        });
    });
    
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            faqItem.classList.toggle('active');
            
            // Close other open items
            faqQuestions.forEach(q => {
                if (q !== this) {
                    q.closest('.faq-item').classList.remove('active');
                }
            });
        });
    });
    
    // Contact buttons
    const contactBtns = document.querySelectorAll('.contact-btn');
    contactBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = '/contact/';
        });
    });
    
    // Pricing card hover effects
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0)';
            }
            this.style.boxShadow = 'var(--box-shadow)';
        });
    });
});