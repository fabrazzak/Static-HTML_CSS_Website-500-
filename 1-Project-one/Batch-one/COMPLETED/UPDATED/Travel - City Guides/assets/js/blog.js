document.addEventListener('DOMContentLoaded', function() {
    // Animation on scroll for blog page
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate__animated');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementPosition < windowHeight - elementVisible) {
                element.style.opacity = '1';
                
                // Check if element has animation class
                if (element.classList.contains('animate__fadeIn')) {
                    element.style.animation = 'fadeIn 1s ease forwards';
                } else if (element.classList.contains('animate__fadeInUp')) {
                    element.style.animation = 'fadeInUp 1s ease forwards';
                } else if (element.classList.contains('animate__fadeInDown')) {
                    element.style.animation = 'fadeInDown 1s ease forwards';
                }
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Initialize animations when page loads
    window.addEventListener('load', function() {
        animateOnScroll();
    });
    
    // Search functionality
    const blogSearch = document.querySelector('.blog-search');
    if (blogSearch) {
        blogSearch.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = this.querySelector('input').value.trim();
            if (searchTerm) {
                alert(`Searching for: ${searchTerm}\nIn a real implementation, this would filter blog posts or redirect to search results.`);
                // In a real app, this would filter posts or redirect to search results
            }
        });
    }
    
    // Newsletter subscription
    const newsletterForms = document.querySelectorAll('.sidebar-newsletter, .footer-newsletter');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value.trim();
            if (email) {
                alert(`Thank you for subscribing with ${email}`);
                this.querySelector('input[type="email"]').value = '';
            }
        });
    });
});