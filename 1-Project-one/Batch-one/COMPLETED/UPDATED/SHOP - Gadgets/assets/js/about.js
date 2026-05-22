document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');
    
    if (mobileMenuBtn && navbar) {
        mobileMenuBtn.addEventListener('click', function() {
            // Toggle menu visibility
            navbar.classList.toggle('active');
            
            // Change icon
            const icon = this.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                
                // Disable scroll when menu is open
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                
                // Enable scroll when menu is closed
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.navbar a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                    document.body.style.overflow = '';
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navbar.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Rest of your existing about.js code (stats animation, etc.)
    const statNumbers = document.querySelectorAll('.stat-number');
    // ... keep your existing stat animation code ...
    
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
});