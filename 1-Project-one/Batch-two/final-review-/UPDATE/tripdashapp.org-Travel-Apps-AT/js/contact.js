document.addEventListener('DOMContentLoaded', function() {
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // In a real implementation, you would send this data to your server
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message
            alert('Thank you for your message! We will get back to you within 24 hours.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Toggle active class on question
            this.classList.toggle('active');
            
            // Toggle answer visibility
            const answer = this.nextElementSibling;
            answer.classList.toggle('active');
            
            // Close other open answers if any
            faqQuestions.forEach(q => {
                if (q !== this && q.classList.contains('active')) {
                    q.classList.remove('active');
                    q.nextElementSibling.classList.remove('active');
                }
            });
        });
    });
    
    // Animation on scroll for method cards
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.method-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    const animatedElements = document.querySelectorAll('.method-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});