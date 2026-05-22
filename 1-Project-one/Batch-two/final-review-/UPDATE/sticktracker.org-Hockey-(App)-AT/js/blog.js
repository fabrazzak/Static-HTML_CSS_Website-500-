document.addEventListener('DOMContentLoaded', function() {
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // In a real implementation, you would send this to your email service
            console.log('Subscribed email:', email);
            
            // Show success message
            alert('Thanks for subscribing! You\'ll receive our next newsletter.');
            
            // Reset form
            emailInput.value = '';
        });
    }
    
    // Animate blog cards on scroll
    const animateOnScroll = function() {
        const blogCards = document.querySelectorAll('.post-card, .category-card');
        
        blogCards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animated elements
    document.querySelectorAll('.post-card, .category-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
    
    // Featured article hover effect
    const featuredArticle = document.querySelector('.featured-article');
    if (featuredArticle) {
        featuredArticle.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
        });
        
        featuredArticle.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'var(--shadow-sm)';
        });
    }
});