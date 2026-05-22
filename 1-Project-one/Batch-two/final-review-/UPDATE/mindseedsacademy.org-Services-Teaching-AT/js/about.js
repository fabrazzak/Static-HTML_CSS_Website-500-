document.addEventListener('DOMContentLoaded', function() {
    // Animate stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.stats');
    
    function animateStats() {
        const sectionPosition = statsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionPosition < screenPosition) {
            statNumbers.forEach(stat => {
                const target = +stat.getAttribute('data-count');
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const counter = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        clearInterval(counter);
                        stat.textContent = target;
                    } else {
                        stat.textContent = Math.floor(current);
                    }
                }, 16);
            });
            
            // Remove event listener after animation
            window.removeEventListener('scroll', animateStats);
        }
    }
    
    // Only animate when stats section comes into view
    window.addEventListener('scroll', animateStats);
    
    // Team member hover effect
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'var(--shadow)';
        });
    });
    
    // Animation on scroll for sections
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.about-intro, .mission, .team-member, .stat-card');
        
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
    const animatedElements = document.querySelectorAll('.about-intro, .mission, .team-member, .stat-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});