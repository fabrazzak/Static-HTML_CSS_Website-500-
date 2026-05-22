document.addEventListener('DOMContentLoaded', function() {
    

    // Tournament Filter Functionality - SIMPLIFIED VERSION
    const typeFilter = document.getElementById('tournament-type');
    const surfaceFilter = document.getElementById('tournament-surface');
    const dateFilter = document.getElementById('tournament-date');
    const tournamentCards = document.querySelectorAll('.tournament-card');

    function filterTournaments() {
        const typeValue = typeFilter ? typeFilter.value : 'all';
        const surfaceValue = surfaceFilter ? surfaceFilter.value : 'all';
        const dateValue = dateFilter ? dateFilter.value : 'all';
        
        tournamentCards.forEach(card => {
            // Default to showing cards if filters don't exist
            let typeMatch = true;
            let surfaceMatch = true;
            let dateMatch = true;
            
            // Check type filter if it exists
            if (typeFilter) {
                const cardType = card.querySelector('.category')?.className.includes('grand-slam') ? 'grand-slam' : 
                                card.querySelector('.category')?.className.includes('atp') ? 'atp' :
                                card.querySelector('.category')?.className.includes('wta') ? 'wta' : '';
                typeMatch = (typeValue === 'all') || (cardType === typeValue);
            }
            
            // Check surface filter if it exists
            if (surfaceFilter) {
                const cardSurface = card.querySelector('.surface')?.className.includes('hard') ? 'hard' :
                                   card.querySelector('.surface')?.className.includes('clay') ? 'clay' :
                                   card.querySelector('.surface')?.className.includes('grass') ? 'grass' : '';
                surfaceMatch = (surfaceValue === 'all') || (cardSurface === surfaceValue);
            }
            
            // Check date filter if it exists
            if (dateFilter) {
                const isCurrent = card.classList.contains('current');
                const isUpcoming = !isCurrent; // Simplified logic - adjust as needed
                dateMatch = (dateValue === 'all') || 
                           (dateValue === 'current' && isCurrent) || 
                           (dateValue === 'upcoming' && isUpcoming);
            }
            
            // Apply visibility based on filters
            if (typeMatch && surfaceMatch && dateMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Initialize filters if they exist
    if (typeFilter || surfaceFilter || dateFilter) {
        // Set default values
        if (typeFilter) typeFilter.value = 'all';
        if (surfaceFilter) surfaceFilter.value = 'all';
        if (dateFilter) dateFilter.value = 'upcoming';
        
        // Add event listeners
        if (typeFilter) typeFilter.addEventListener('change', filterTournaments);
        if (surfaceFilter) surfaceFilter.addEventListener('change', filterTournaments);
        if (dateFilter) dateFilter.addEventListener('change', filterTournaments);
        
        // Run initial filter
        filterTournaments();
    }

    // Tournament Card Animations
    const animateTournamentCards = function() {
        const cards = document.querySelectorAll('.tournament-card');
        
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
        animateTournamentCards();
        
        // Make sure cards are visible initially
        if (tournamentCards.length > 0) {
            tournamentCards.forEach(card => {
                card.style.display = 'block';
            });
        }
    });
    
    window.addEventListener('scroll', animateTournamentCards);
});