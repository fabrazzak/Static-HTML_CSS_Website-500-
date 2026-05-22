document.addEventListener('DOMContentLoaded', function() {
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            // Simulate form submission
            emailInput.value = '';
            
            // Show temporary success message
            const successMsg = document.createElement('p');
            successMsg.textContent = 'Thanks for subscribing!';
            successMsg.style.color = 'white';
            successMsg.style.marginTop = '10px';
            this.parentNode.insertBefore(successMsg, this.nextSibling);
            
            // Remove message after 3 seconds
            setTimeout(() => {
                successMsg.remove();
            }, 3000);
        });
    }
    
    // Category Card Animation
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.category-icon');
            icon.style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.category-icon');
            icon.style.transform = 'scale(1)';
        });
    });
    
    // Read More Link Animation
    const readMoreLinks = document.querySelectorAll('.read-more');
    
    readMoreLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'translateX(5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'translateX(0)';
        });
    });
});