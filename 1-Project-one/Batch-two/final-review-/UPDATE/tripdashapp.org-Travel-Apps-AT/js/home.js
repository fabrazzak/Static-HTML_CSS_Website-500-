document.addEventListener('DOMContentLoaded', function() {
    // Testimonial slider functionality
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');
    const testimonialCount = testimonials.length;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }
    
    // Initialize first testimonial
    if (testimonialCount > 0) {
        showTestimonial(0);
        
        // Auto-rotate testimonials every 5 seconds
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialCount;
            showTestimonial(currentTestimonial);
        }, 5000);
    }
    
    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .benefit-item, .blog-card, .stat-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    const animatedElements = document.querySelectorAll('.service-card, .benefit-item, .blog-card, .stat-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Simulate add to cart functionality for service cards
    document.querySelectorAll('.service-card .btn-outline').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceTitle = this.closest('.service-card').querySelector('h3').textContent;
            
            // Create notification
            const notification = document.createElement('div');
            notification.className = 'cart-notification';
            notification.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <span>${serviceTitle} added to your cart!</span>
            `;
            
            document.body.appendChild(notification);
            
            // Show notification
            setTimeout(() => {
                notification.classList.add('show');
            }, 10);
            
            // Hide notification after 3 seconds
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 3000);
        });
    });
    
    // Add styles for cart notification
    const style = document.createElement('style');
    style.textContent = `
        .cart-notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--secondary-color);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            display: flex;
            align-items: center;
            gap: 0.8rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        .cart-notification.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        .cart-notification i {
            font-size: 1.2rem;
        }
    `;
    document.head.appendChild(style);
});