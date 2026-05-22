document.addEventListener('DOMContentLoaded', function() {
    // Animation on scroll for about page
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
    
    // Animate stats counting
    const animateStats = function() {
        const statNumbers = document.querySelectorAll('.stat-number');
        const speed = 200; // Lower is faster
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const count = parseInt(stat.innerText);
            const increment = Math.ceil(target / speed);
            
            if (count < target) {
                stat.innerText = Math.min(count + increment, target).toLocaleString();
                setTimeout(animateStats, 1);
            }
        });
    };
    
    // Start counting when stats are in view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
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