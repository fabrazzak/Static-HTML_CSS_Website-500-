document.addEventListener('DOMContentLoaded', function() {
    // Initialize blog functionality
    
    // Featured post hover effect
    const featuredPost = document.querySelector('.featured-article');
    if(featuredPost) {
        featuredPost.addEventListener('mouseenter', function() {
            this.querySelector('.post-image img').style.transform = 'scale(1.05)';
        });
        
        featuredPost.addEventListener('mouseleave', function() {
            this.querySelector('.post-image img').style.transform = 'scale(1)';
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.blog-newsletter');
    if(newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if(email && validateEmail(email)) {
                // Here you would typically send the data to your server
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Email validation helper function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Lazy load images
    if('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.removeAttribute('loading');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});