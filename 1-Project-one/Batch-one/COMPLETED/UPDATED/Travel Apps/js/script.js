document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-times');
            this.querySelector('i').classList.toggle('fa-bars');
        });
    }
    // FAQ Search Functionality
const faqSearch = () => {
    const searchInput = document.querySelector('.faq-search input');
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (searchInput && faqItems.length) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
};

// Initialize FAQ search
faqSearch();

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        
        // Simple validation
        if (emailInput.value && emailInput.value.includes('@')) {
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

// Update mobile menu to include new pages
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            document.querySelector('nav ul').classList.remove('active');
            document.querySelector('.mobile-menu-btn i').classList.add('fa-bars');
            document.querySelector('.mobile-menu-btn i').classList.remove('fa-times');
        }
    });
});
    
    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartNotification = document.querySelector('.cart-notification');
    const cartMessage = document.getElementById('cart-message');
    const viewCartBtn = document.getElementById('view-cart-btn');
    
    if (addToCartButtons.length && cartNotification && cartMessage) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const serviceName = this.getAttribute('data-service');
                cartMessage.textContent = `${serviceName} added to your cart!`;
                
                // Show notification
                cartNotification.classList.add('show');
                
                // Hide after 3 seconds
                setTimeout(() => {
                    cartNotification.classList.remove('show');
                }, 3000);
            });
        });
        
        // View cart button
        if (viewCartBtn) {
            viewCartBtn.addEventListener('click', function(e) {
                e.preventDefault();
                alert('This is a demo. Your cart would be displayed here in a real application.');
            });
        }
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    
    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Reset form after 5 seconds (for demo purposes)
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'block';
                formSuccess.style.display = 'none';
            }, 5000);
        });
    }
    
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
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            }
        });
    });
    
    // Scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .feature, .testimonial, .article-card, .value-card, .team-member');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.service-card, .feature, .testimonial, .article-card, .value-card, .team-member');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});