document.addEventListener('DOMContentLoaded', function() {
  

    // Player Search and Filter Functionality
    const searchInput = document.getElementById('player-search-input');
    const genderFilter = document.getElementById('player-gender');
    const countryFilter = document.getElementById('player-country');
    const playerCards = document.querySelectorAll('.player-card');
    const playersContainer = document.getElementById('players-container');
    const viewOptions = document.querySelectorAll('.view-option');

    function filterPlayers() {
        const searchValue = searchInput ? searchInput.value.toLowerCase() : '';
        const genderValue = genderFilter ? genderFilter.value : 'all';
        const countryValue = countryFilter ? countryFilter.value : 'all';
        
        playerCards.forEach(card => {
            const playerName = card.querySelector('h3').textContent.toLowerCase();
            const playerGender = card.getAttribute('data-gender');
            const playerCountry = card.getAttribute('data-country');
            
            // Check if card matches search term
            const searchMatch = searchValue === '' || playerName.includes(searchValue);
            
            // Check if card matches gender filter
            const genderMatch = genderValue === 'all' || playerGender === genderValue;
            
            // Check if card matches country filter
            const countryMatch = countryValue === 'all' || playerCountry === countryValue;
            
            // Apply visibility based on filters
            if (searchMatch && genderMatch && countryMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Initialize filters if they exist
    if (searchInput || genderFilter || countryFilter) {
        // Set default values
        if (genderFilter) genderFilter.value = 'all';
        if (countryFilter) countryFilter.value = 'all';
        
        // Add event listeners
        if (searchInput) searchInput.addEventListener('input', filterPlayers);
        if (genderFilter) genderFilter.addEventListener('change', filterPlayers);
        if (countryFilter) countryFilter.addEventListener('change', filterPlayers);
        
        // Run initial filter
        filterPlayers();
    }

    // View Toggle Functionality
    if (viewOptions && playersContainer) {
        viewOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                viewOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Get the view type from data attribute
                const viewType = this.getAttribute('data-view');
                
                // Toggle between grid and list view
                if (viewType === 'list') {
                    playersContainer.classList.add('players-list');
                    playersContainer.classList.remove('players-grid');
                } else {
                    playersContainer.classList.add('players-grid');
                    playersContainer.classList.remove('players-list');
                }
            });
        });
    }

    // Player Card Animations
    const animatePlayerCards = function() {
        const cards = document.querySelectorAll('.player-card, .featured-player-card');
        
        cards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardPosition < windowHeight - 100) {
                card.classList.add('animate');
            }
        });
    };
    
    // Run on load and scroll
    window.addEventListener('load', function() {
        animatePlayerCards();
        
        // Make sure cards are visible initially
        if (playerCards.length > 0) {
            playerCards.forEach(card => {
                card.style.display = 'block';
            });
        }
    });
    
    window.addEventListener('scroll', animatePlayerCards);
});