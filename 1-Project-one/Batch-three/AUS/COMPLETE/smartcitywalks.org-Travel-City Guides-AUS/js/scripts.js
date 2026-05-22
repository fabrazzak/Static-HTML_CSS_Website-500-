 // Enhanced mobile menu functionality
 document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.setAttribute('aria-expanded', mainNav.classList.contains('active'));
        
        // Toggle hamburger icon
        const icon = this.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });
    
    // Close menu when clicking on a link (for single page applications)
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            !e.target.closest('.main-nav') && 
            !e.target.closest('.mobile-menu-btn') && 
            mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });
});