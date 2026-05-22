document.addEventListener('DOMContentLoaded', function() {
    // Animation on scroll for contact page
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
    
    // Form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset error messages
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(msg => msg.textContent = '');
            
            // Validate form
            let isValid = true;
            
            // Validate name
            const name = document.getElementById('name');
            if (name.value.trim() === '') {
                document.getElementById('nameError').textContent = 'Please enter your name';
                isValid = false;
            }
            
            // Validate email
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value.trim() === '') {
                document.getElementById('emailError').textContent = 'Please enter your email';
                isValid = false;
            } else if (!emailRegex.test(email.value)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email';
                isValid = false;
            }
            
            // Validate subject
            const subject = document.getElementById('subject');
            if (subject.value === null || subject.value === '') {
                document.getElementById('subjectError').textContent = 'Please select a subject';
                isValid = false;
            }
            
            // Validate message
            const message = document.getElementById('message');
            if (message.value.trim() === '') {
                document.getElementById('messageError').textContent = 'Please enter your message';
                isValid = false;
            }
            
            // If form is valid, show success message
            if (isValid) {
                contactForm.style.display = 'none';
                document.getElementById('formSuccess').style.display = 'block';
                
                // In a real application, you would submit the form data to a server here
                // For demo purposes, we're just showing the success message
            }
        });
    }
    
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Toggle active class on question
            this.classList.toggle('active');
            
            // Get the answer element
            const answer = this.nextElementSibling;
            
            // Toggle answer visibility
            answer.classList.toggle('active');
            
            // Close other open answers
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question && otherQuestion.classList.contains('active')) {
                    otherQuestion.classList.remove('active');
                    otherQuestion.nextElementSibling.classList.remove('active');
                }
            });
        });
    });
    
    // Newsletter subscription
    const newsletterForms = document.querySelectorAll('.footer-newsletter');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value.trim();
            if (email) {
                alert(`Thank you for subscribing with ${email}`);
                this.querySelector('input[type="email"]').value = '';
            }
        });
    });
});