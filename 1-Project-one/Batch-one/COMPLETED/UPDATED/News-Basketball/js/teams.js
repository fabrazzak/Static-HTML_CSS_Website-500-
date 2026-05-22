document.addEventListener('DOMContentLoaded', function() {
    // Conference filter functionality
    const filterTabs = document.querySelectorAll('.conference-tab');
    const teamCards = document.querySelectorAll('.team-card');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            const conference = this.dataset.conference;
            
            // Show/hide teams based on selection
            teamCards.forEach(card => {
                if (conference === 'all') {
                    card.style.display = 'block';
                } else {
                    if (card.dataset.conference === conference) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // Team search functionality
    const teamSearch = document.getElementById('team-search');
    
    teamSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        teamCards.forEach(card => {
            const teamName = card.querySelector('h3').textContent.toLowerCase();
            
            if (teamName.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});