// about.js - About Page Specific Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Team member hover effects
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            const image = this.querySelector('.team-member__image img');
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
        });
        
        member.addEventListener('mouseleave', function() {
            const image = this.querySelector('.team-member__image img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
    
    // Testimonial card animation
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach((card, index) => {
        // Add delay based on index for staggered animation
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Coverage card hover effects
    const coverageCards = document.querySelectorAll('.coverage-card');
    
    coverageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.coverage-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.color = var(--secondary-color);
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.coverage-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
                icon.style.color = var(--primary-color);
            }
        });
    });
    
    // Mission stats counter animation
    const missionStats = document.querySelectorAll('.mission-stat');
    
    if (missionStats.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(document.querySelector('.mission-stats'));
    }
    
    function animateCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            const duration = 2000; // Animation duration in ms
            const step = target / (duration / 16); // 60fps
            
            let current = 0;
            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    clearInterval(counter);
                    stat.textContent = stat.textContent; // Reset to original with +
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 16);
        });
    }
});