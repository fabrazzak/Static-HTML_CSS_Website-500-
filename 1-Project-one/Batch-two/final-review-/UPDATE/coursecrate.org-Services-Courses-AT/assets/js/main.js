// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenuToggle.querySelector('i').classList.remove('fa-times');
                    mobileMenuToggle.querySelector('i').classList.add('fa-bars');
                }
            }
        });
    });
    
    // Animate stats counter
    const statsSection = document.querySelector('.stats-section');
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;
    
    function animateStats() {
        if (animated) return;
        
        const statsSectionPos = statsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;
        
        if (statsSectionPos < screenPos) {
            animated = true;
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
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
        }
    }
    
    window.addEventListener('scroll', animateStats);
    animateStats(); // Run once in case stats section is already visible
    
    // Learn More simulation
    // document.querySelectorAll('.service-card .btn-outline').forEach(button => {
    //     button.addEventListener('click', function(e) {
    //         if (this.textContent === 'Learn More') {
    //             e.preventDefault();
    //             const originalText = this.textContent;
    //             this.textContent = 'Added to Cart!';
    //             this.classList.add('btn-primary');
    //             this.classList.remove('btn-outline');
                
    //             setTimeout(() => {
    //                 this.textContent = originalText;
    //                 this.classList.remove('btn-primary');
    //                 this.classList.add('btn-outline');
    //             }, 2000);
    //         }
    //     });
    // });
});