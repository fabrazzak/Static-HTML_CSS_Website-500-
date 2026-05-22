document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    mobileMenuClose.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close mobile menu when clicking on a link
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Testimonial slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        
        testimonialCards[index].classList.add('active');
        testimonialDots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });
    
    // Auto-rotate testimonials
    setInterval(() => {
        let nextTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(nextTestimonial);
    }, 5000);
    
    // Animate stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.stats');
    
    function animateStats() {
        const statsPosition = statsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (statsPosition < screenPosition) {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const speed = 200;
                const count = parseInt(stat.textContent);
                const increment = Math.ceil(target / speed);
                
                if (count < target) {
                    stat.textContent = (count + increment).toString();
                    setTimeout(animateStats, 1);
                } else {
                    stat.textContent = target.toString();
                }
            });
            
            // Remove event listener after animation
            window.removeEventListener('scroll', animateStats);
        }
    }
    
    window.addEventListener('scroll', animateStats);
    
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
            }
        });
    });
    
    // Add active class to current page in navigation
    const currentPage = location.pathname.split('/')[1] || 'index.html';
    const navLinks = document.querySelectorAll('.main-nav a, .mobile-menu a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/')[1];
        
        if ((currentPage === '' && linkPath === '') || 
            (linkPath && currentPage.includes(linkPath))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Initialize animations when elements come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .service-card, .benefit-card, .blog-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animated elements
    document.querySelectorAll('.feature-card, .service-card, .benefit-card, .blog-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});