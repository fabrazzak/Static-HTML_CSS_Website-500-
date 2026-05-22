 // Simple cart functionality
 document.addEventListener('DOMContentLoaded', function() {
    // Cart count update simulation
    const addToCartButtons = document.querySelectorAll('.btn[href="services/"]');
    const cartCount = document.querySelector('.cart-count');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.textContent.includes('Add to Cart')) {
                e.preventDefault();
                let currentCount = parseInt(cartCount.textContent);
                cartCount.textContent = currentCount + 1;
                alert('Item added to cart!');
            }
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with ${email}! You'll receive our fashion updates soon.`);
            this.reset();
        });
    }
});