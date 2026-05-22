// Contact Page Specific JavaScript
$(document).ready(function() {
    // FAQ accordion functionality
    $('.faq-question').click(function() {
        const faqItem = $(this).parent();
        
        // Close all other FAQ items
        $('.faq-item').not(faqItem).removeClass('active').find('.faq-answer').css({
            'max-height': '0',
            'padding': '0 25px'
        });
        
        // Toggle current FAQ item
        faqItem.toggleClass('active');
        
        if (faqItem.hasClass('active')) {
            const answer = faqItem.find('.faq-answer');
            answer.css('max-height', answer[0].scrollHeight + 'px');
        }
    });

    // Contact form submission
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
        // Get form values
        const name = $('#name').val();
        const email = $('#email').val();
        const subject = $('#subject').val();
        const message = $('#message').val();
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Here you would typically send the form data to your server
        // For this demo, we'll just show a success message
        alert(`Thank you for your message, ${name}! We'll get back to you soon.`);
        
        // Reset form
        this.reset();
    });

    // Smooth scrolling for FAQ section
    $('a[href="#faq"]').click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $('.faq-section').offset().top - 70
        }, 500);
    });
});