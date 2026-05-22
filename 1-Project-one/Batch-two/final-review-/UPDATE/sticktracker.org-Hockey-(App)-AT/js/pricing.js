document.addEventListener('DOMContentLoaded', function() {
    // Billing toggle functionality
    const billingToggle = document.getElementById('billingToggle');
    const monthlyPrices = document.querySelectorAll('.monthly-price');
    const annualPrices = document.querySelectorAll('.annual-price');
    
    if (billingToggle) {
        billingToggle.addEventListener('change', function() {
            if (this.checked) {
                // Show annual prices
                monthlyPrices.forEach(price => price.style.display = 'none');
                annualPrices.forEach(price => price.style.display = 'block');
            } else {
                // Show monthly prices
                monthlyPrices.forEach(price => price.style.display = 'block');
                annualPrices.forEach(price => price.style.display = 'none');
            }
        });
    }
    
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item h3');
    
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isOpen = answer.style.maxHeight;
            
            // Close all other FAQs
            document.querySelectorAll('.faq-answer').forEach(el => {
                if (el !== answer) {
                    el.style.maxHeight = null;
                }
            });
            
            // Toggle current FAQ
            if (isOpen) {
                answer.style.maxHeight = null;
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
    
    // Initialize first FAQ as open
    if (faqItems.length > 0) {
        faqItems[0].nextElementSibling.style.maxHeight = 
            faqItems[0].nextElementSibling.scrollHeight + 'px';
    }
    
    // Plan card hover effects
    const planCards = document.querySelectorAll('.plan-card');
    
    planCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'var(--shadow-sm)';
        });
    });
});