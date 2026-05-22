document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    const searchBtn = document.querySelector('.search-bar button');
    const blogPosts = document.querySelectorAll('.post-card');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        
        blogPosts.forEach(post => {
            const title = post.querySelector('h3').textContent.toLowerCase();
            const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    }
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Category filter
    const categoryTags = document.querySelectorAll('.tag');
    
    categoryTags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tags
            categoryTags.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tag
            this.classList.add('active');
            
            const category = this.textContent.toLowerCase();
            
            if (category === 'all') {
                blogPosts.forEach(post => {
                    post.style.display = 'block';
                });
            } else {
                blogPosts.forEach(post => {
                    const postCategory = post.querySelector('.post-category').textContent.toLowerCase();
                    
                    if (postCategory.includes(category)) {
                        post.style.display = 'block';
                    } else {
                        post.style.display = 'none';
                    }
                });
            }
        });
    });
    
    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.post-card, .topic-card');
        
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
    const animatedElements = document.querySelectorAll('.post-card, .topic-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            // Simple validation
            if (emailInput.value && emailInput.value.includes('@')) {
                // In a real implementation, you would send this to your server
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
});