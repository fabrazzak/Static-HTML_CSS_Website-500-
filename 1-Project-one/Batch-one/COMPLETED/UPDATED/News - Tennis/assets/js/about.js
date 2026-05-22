// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {

    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput.value.trim() === '') {
                alert('Please enter your email address');
                return;
            }
            
            // Here you would normally send the data to a server
            alert('Thank you for subscribing! You will receive our next newsletter.');
            emailInput.value = '';
        });
    }
    
    // Team member hover effect for touch devices
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('touchstart', function() {
            this.classList.add('hover');
        });
        
        member.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('hover');
            }, 1000);
        });
    });
});