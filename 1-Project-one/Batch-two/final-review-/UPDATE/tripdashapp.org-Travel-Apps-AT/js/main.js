// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
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
                    mobileMenuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
                }
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.padding = '0.5rem 0';
                header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.padding = '1rem 0';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    }
    
    // Set active navigation link based on current page
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        
        if (currentPath === linkPath || 
            (currentPath.startsWith(linkPath) && linkPath !== '/')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});