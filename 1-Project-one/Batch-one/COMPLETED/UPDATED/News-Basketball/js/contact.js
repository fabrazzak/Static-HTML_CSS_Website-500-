document.addEventListener('DOMContentLoaded', function() {
    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For this example, we'll just show the success message
            
            // Hide form and show success message
            contactForm.style.display = 'none';
            formSuccess.style.display = 'flex';
            
            // Reset form after 5 seconds (for demo purposes)
            setTimeout(function() {
                contactForm.style.display = 'block';
                formSuccess.style.display = 'none';
                contactForm.reset();
            }, 5000);
        });
    }
    
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isOpen = this.classList.contains('active');
            
            // Close all other FAQ items
            faqQuestions.forEach(q => {
                if (q !== this) {
                    q.classList.remove('active');
                    q.nextElementSibling.classList.remove('show');
                }
            });
            
            // Toggle current item
            if (isOpen) {
                this.classList.remove('active');
                answer.classList.remove('show');
            } else {
                this.classList.add('active');
                answer.classList.add('show');
            }
        });
    });
});