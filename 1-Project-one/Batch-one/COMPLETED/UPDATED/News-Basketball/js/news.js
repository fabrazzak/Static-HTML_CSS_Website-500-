// News Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsCards = document.querySelectorAll('.news-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Show/hide news cards based on filter
            newsCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    
    searchButton.addEventListener('click', function(e) {
        e.preventDefault();
        performSearch();
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        
        if (searchTerm.trim() === '') return;
        
        newsCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const excerpt = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Reset search when clicking filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            searchInput.value = '';
        });
    });
});