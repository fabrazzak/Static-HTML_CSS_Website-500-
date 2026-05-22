document.addEventListener('DOMContentLoaded', function() {
    // Category filter functionality
    const categoryFilter = document.getElementById('category-filter');
    const postCards = document.querySelectorAll('.post-card');
    
    categoryFilter.addEventListener('change', function() {
        const selectedCategory = this.value;
        
        postCards.forEach(card => {
            if (selectedCategory === 'all' || card.dataset.category === selectedCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        
        if (searchTerm.length < 2) return;
        
        postCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const excerpt = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show message if no results found
        const visiblePosts = document.querySelectorAll('.post-card[style="display: block"]');
        if (visiblePosts.length === 0) {
            showToast('No articles found matching your search');
        }
    }
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input');
        
        // In a real implementation, this would send to a server
        // For this demo, we'll just show a confirmation
        showToast('Thank you for subscribing!');
        emailInput.value = '';
    });
    
    // Toast notification
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
    
    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.featured-article, .category-card, .post-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialize elements with hidden state
    const animatedElements = document.querySelectorAll('.featured-article, .category-card, .post-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});