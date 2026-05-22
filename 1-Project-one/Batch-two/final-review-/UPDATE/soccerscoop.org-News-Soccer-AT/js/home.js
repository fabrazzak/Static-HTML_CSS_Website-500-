document.addEventListener('DOMContentLoaded', function() {
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Here you would typically send the data to your server
                // For demo purposes, we'll just show an alert
                alert(`Thank you for subscribing with ${email}! You'll receive our newsletter soon.`);
                emailInput.value = '';
            }
        });
    }
    
    // Add to cart simulation
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const serviceTitle = this.closest('.service-card').querySelector('h3').textContent;
                
                // Create notification element
                const notification = document.createElement('div');
                notification.className = 'cart-notification';
                notification.innerHTML = `
                    <span>${serviceTitle} added to your cart!</span>
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
                
                // Add animation keyframes
                const style = document.createElement('style');
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
            });
        });
    }
    
    // News card hover effect enhancement
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.news-image img').style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.news-image img').style.transform = 'scale(1)';
        });
    });
    
    // Service card hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--box-shadow)';
        });
    });
});