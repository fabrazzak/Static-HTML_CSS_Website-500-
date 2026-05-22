 // Tours Page Specific JavaScript
 document.addEventListener('DOMContentLoaded', function() {
    // Category Filtering
    const categoryBtns = document.querySelectorAll('.category-btn');
    const tourCards = document.querySelectorAll('.tour-card');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.dataset.category;
            
            // Filter tours
            tourCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Add to Cart Functionality
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const cartNotification = document.getElementById('cartNotification');
    const notificationText = document.getElementById('notificationText');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tourName = this.dataset.tour;
            notificationText.textContent = `${tourName} added to cart!`;
            
            // Show notification
            cartNotification.classList.add('show');
            
            // Hide after 3 seconds
            setTimeout(() => {
                cartNotification.classList.remove('show');
            }, 3000);
        });
    });
    
    
});