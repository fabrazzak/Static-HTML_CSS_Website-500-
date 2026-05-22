document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
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
            }
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput.value) {
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }
    
    // Footer newsletter form submission
    const footerNewsletter = document.querySelector('.footer-newsletter');
    if (footerNewsletter) {
        footerNewsletter.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput.value) {
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }
    
    // Animate elements on scroll
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
    
    // Animate stats counter
    const animateStats = function() {
        const statNumbers = document.querySelectorAll('.stat-number');
        const speed = 200;
        const windowHeight = window.innerHeight;
        
        statNumbers.forEach(stat => {
            const statPosition = stat.getBoundingClientRect().top;
            
            if (statPosition < windowHeight - 100 && !stat.hasAttribute('data-animated')) {
                stat.setAttribute('data-animated', 'true');
                const target = +stat.getAttribute('data-count');
                const count = +stat.innerText;
                const increment = target / speed;
                
                if (count < target) {
                    stat.innerText = Math.ceil(count + increment);
                    setTimeout(animateStats, 1);
                } else {
                    stat.innerText = target;
                }
            }
        });
    };
    
    // Initial checks
    animateOnScroll();
    animateStats();
    
    // Check on scroll
    window.addEventListener('scroll', function() {
        animateOnScroll();
        animateStats();
    });
    
    // Initialize animations when page loads
    window.addEventListener('load', function() {
        animateOnScroll();
        animateStats();
    });
});