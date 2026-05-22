document.addEventListener('DOMContentLoaded', function() {
    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function animateTimeline() {
        timelineItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemPosition < windowHeight - 100) {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }
        });
    }
    
    // Set initial state for animation
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger animation on load and scroll
    window.addEventListener('load', animateTimeline);
    window.addEventListener('scroll', animateTimeline);
    
    // Testimonial slider functionality
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');
    const testimonialCount = testimonials.length;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }
    
    // Initialize first testimonial if on mobile
    if (window.innerWidth < 768 && testimonialCount > 0) {
        showTestimonial(0);
        
        // Auto-rotate testimonials every 5 seconds
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialCount;
            showTestimonial(currentTestimonial);
        }, 5000);
    }
    
    // Team member animation
    const teamMembers = document.querySelectorAll('.team-member');
    
    function animateTeamMembers() {
        teamMembers.forEach(member => {
            const memberPosition = member.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (memberPosition < windowHeight - 100) {
                member.style.opacity = '1';
                member.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animation
    teamMembers.forEach(member => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(20px)';
        member.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger animation on load and scroll
    window.addEventListener('load', animateTeamMembers);
    window.addEventListener('scroll', animateTeamMembers);
});