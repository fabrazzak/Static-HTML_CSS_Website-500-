document.addEventListener('DOMContentLoaded', function() {
    // Form submission handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Here you would normally send the data to a server
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Close all other open answers
            faqQuestions.forEach(q => {
                if (q !== question) {
                    q.classList.remove('active');
                    q.nextElementSibling.classList.remove('active');
                }
            });
            
            // Toggle current question
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            answer.classList.toggle('active');
        });
    });
    
    // Replace Google Maps placeholder with your actual API key
    const mapImg = document.querySelector('.map-container img');
    if (mapImg) {
        // In a real implementation, you would use the Google Maps JavaScript API
        // This is just a placeholder static image
        mapImg.src = "https://maps.googleapis.com/maps/api/staticmap?center=51.5175,-0.1367&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7C51.5175,-0.1367&key=YOUR_API_KEY";
        mapImg.alt = "Map of TennisFeedHQ location in London";
    }
});