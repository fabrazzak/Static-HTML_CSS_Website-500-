document.addEventListener('DOMContentLoaded', function() {
    // Course Filter Functionality
    const categoryFilter = document.getElementById('category');
    const levelFilter = document.getElementById('level');
    const durationFilter = document.getElementById('duration');
    const resetButton = document.getElementById('reset-filters');
    const courseCards = document.querySelectorAll('.course-card');
    
    function filterCourses() {
        const selectedCategory = categoryFilter.value;
        const selectedLevel = levelFilter.value;
        const selectedDuration = durationFilter.value;
        
        courseCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const cardLevel = card.dataset.level;
            const cardDuration = card.dataset.duration;
            
            const categoryMatch = selectedCategory === 'all' || cardCategory === selectedCategory;
            const levelMatch = selectedLevel === 'all' || cardLevel === selectedLevel;
            const durationMatch = selectedDuration === 'all' || (
                (selectedDuration === 'short' && cardDuration === 'short') ||
                (selectedDuration === 'medium' && cardDuration === 'medium') ||
                (selectedDuration === 'long' && cardDuration === 'long')
            );
            
            if (categoryMatch && levelMatch && durationMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    categoryFilter.addEventListener('change', filterCourses);
    levelFilter.addEventListener('change', filterCourses);
    durationFilter.addEventListener('change', filterCourses);
    
    resetButton.addEventListener('click', function() {
        categoryFilter.value = 'all';
        levelFilter.value = 'all';
        durationFilter.value = 'all';
        filterCourses();
    });
    
    // Learn More Functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
   
    });
    
    // Create cart notification style
    const style = document.createElement('style');
    style.textContent = `
        .cart-notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--success-color);
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        .cart-notification.show {
            transform: translateY(0);
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});