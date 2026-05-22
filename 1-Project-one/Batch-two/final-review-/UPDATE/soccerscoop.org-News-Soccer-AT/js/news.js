document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const leagueFilter = document.getElementById('league-filter');
    const categoryFilter = document.getElementById('category-filter');
    const resetFiltersBtn = document.getElementById('reset-filters');
    const newsCards = document.querySelectorAll('.news-card');
    
    function filterNews() {
        const selectedLeague = leagueFilter.value;
        const selectedCategory = categoryFilter.value;
        
        newsCards.forEach(card => {
            const cardLeague = card.dataset.league;
            const cardCategory = card.dataset.category;
            
            const leagueMatch = selectedLeague === 'all' || cardLeague === selectedLeague;
            const categoryMatch = selectedCategory === 'all' || cardCategory === selectedCategory;
            
            if (leagueMatch && categoryMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    leagueFilter.addEventListener('change', filterNews);
    categoryFilter.addEventListener('change', filterNews);
    
    resetFiltersBtn.addEventListener('click', function(e) {
        e.preventDefault();
        leagueFilter.value = 'all';
        categoryFilter.value = 'all';
        filterNews();
    });
    
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
    
    // Article hover effects
    const articles = document.querySelectorAll('.news-card');
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
                top: document.querySelector('.news-main').offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });
});