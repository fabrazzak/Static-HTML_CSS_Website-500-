document.addEventListener('DOMContentLoaded', function() {
    // Testimonial slider functionality
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');
    const testimonialCount = testimonials.length;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }
    
    // Initialize - show all testimonials in grid layout
    if (window.innerWidth >= 768) {
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'block';
        });
    } else {
        showTestimonial(currentTestimonial);
        
        // Auto-rotate testimonials on mobile
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialCount;
            showTestimonial(currentTestimonial);
        }, 5000);
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            testimonials.forEach(testimonial => {
                testimonial.style.display = 'block';
            });
        } else {
            showTestimonial(currentTestimonial);
        }
    });
    
    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .feature-card, .blog-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialize elements with hidden state
    const animatedElements = document.querySelectorAll('.service-card, .feature-card, .blog-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run once on load