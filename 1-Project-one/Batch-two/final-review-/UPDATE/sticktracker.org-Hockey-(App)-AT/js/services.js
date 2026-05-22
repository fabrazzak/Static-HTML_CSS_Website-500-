document.addEventListener('DOMContentLoaded', function() {
    // Service Tabs Functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Add to Cart Functionality
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const cartModal = document.querySelector('.cart-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const itemNameSpan = document.querySelector('.item-name');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceName = this.getAttribute('data-service');
            const servicePrice = this.getAttribute('data-price');
            
            // Update modal with selected item
            itemNameSpan.textContent = serviceName;
            
            // In a real implementation, you would add to cart storage here
            // localStorage or send to server
            
            // Show modal
            cartModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close Modal Functionality
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            cartModal.style.display = 'none';
            document.body.style.overflow = '';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    
    // Animate service cards on scroll
    const animateOnScroll = function() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animated elements
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});