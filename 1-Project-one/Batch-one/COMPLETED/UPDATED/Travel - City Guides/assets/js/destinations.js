document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const applyFilters = document.getElementById('applyFilters');
    const resetFilters = document.getElementById('resetFilters');
    const regionFilter = document.getElementById('region-filter');
    const interestFilter = document.getElementById('interest-filter');
    const budgetFilter = document.getElementById('budget-filter');
    const destinationCards = document.querySelectorAll('.destination-card');
    
    applyFilters.addEventListener('click', function() {
        const regionValue = regionFilter.value;
        const interestValue = interestFilter.value;
        const budgetValue = budgetFilter.value;
        
        destinationCards.forEach(card => {
            const cardRegion = card.getAttribute('data-region');
            const cardInterest = card.getAttribute('data-interest');
            const cardBudget = card.getAttribute('data-budget');
            
            const regionMatch = regionValue === 'all' || cardRegion === regionValue;
            const interestMatch = interestValue === 'all' || cardInterest === interestValue;
            const budgetMatch = budgetValue === 'all' || cardBudget === budgetValue;
            
            if (regionMatch && interestMatch && budgetMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    resetFilters.addEventListener('click', function() {
        regionFilter.value = 'all';
        interestFilter.value = 'all';
        budgetFilter.value = 'all';
        
        destinationCards.forEach(card => {
            card.style.display = 'block';
        });
    });
    
    // Animation on scroll for destinations page
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
});