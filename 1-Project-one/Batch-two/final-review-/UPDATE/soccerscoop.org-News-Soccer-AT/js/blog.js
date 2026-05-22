document.addEventListener('DOMContentLoaded', function() {
    // Newsletter form submission
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
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
    });
    
    // Article hover effects
    const articles = document.querySelectorAll('.blog-article');
    articles.forEach(article => {
        article.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        
        article.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--box-shadow)';
        });
    });
    
    // Pagination functionality
    const paginationLinks = document.querySelectorAll('.pagination a:not(.page-nav)');
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            paginationLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // In a real implementation, this would load new content
            // For demo, we'll just scroll to top
            window.scrollTo({
                top: document.querySelector('.blog-main').offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });
    
    // Popular post hover effects
    const popularPosts = document.querySelectorAll('.popular-post a');
    popularPosts.forEach(post => {
        post.addEventListener('mouseenter', function() {
            this.querySelector('h5').style.color = var(--primary-color);
        });
        
        post.addEventListener('mouseleave', function() {
            this.querySelector('h5').style.color = '';
        });
    });
    
    // Category links hover effects
    const categoryLinks = document.querySelectorAll('.categories-widget a');
    categoryLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const borderColor = window.getComputedStyle(this).borderLeftColor;
            this.style.backgroundColor = `${borderColor}20`; // Add opacity
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
});