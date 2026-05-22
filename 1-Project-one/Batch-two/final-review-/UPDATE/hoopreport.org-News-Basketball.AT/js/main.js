// Mobile Menu Toggle
$(document).ready(function() {
    // Mobile menu toggle
    $('.mobile-menu-btn').click(function() {
        $('.main-nav').slideToggle();
    });

    // Smooth scrolling for anchor links
    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        
        $('html, body').animate(
            {
                scrollTop: $($(this).attr('href')).offset().top - 70,
            },
            500,
            'linear'
        );
    });

    // Breaking news ticker
    function newsTicker() {
        const tickerItems = $('.ticker-item');
        let currentIndex = 0;
        
        // Show first item
        $(tickerItems[currentIndex]).addClass('active');
        
        setInterval(() => {
            $(tickerItems[currentIndex]).removeClass('active');
            
            currentIndex = (currentIndex + 1) % tickerItems.length;
            
            $(tickerItems[currentIndex]).addClass('active');
        }, 4000);
    }
    
    newsTicker();

    // Newsletter form submission
    $('.newsletter-form').submit(function(e) {
        e.preventDefault();
        const email = $(this).find('input[type="email"]').val();
        
        // Here you would typically send the email to your server
        // For this demo, we'll just show an alert
        alert(`Thank you for subscribing with ${email}! You'll receive our latest updates soon.`);
        $(this).find('input[type="email"]').val('');
    });

    // Sticky header on scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.header').addClass('scrolled');
        } else {
            $('.header').removeClass('scrolled');
        }
    });

    // Add to cart simulation
    $('.add-to-cart').click(function(e) {
        e.preventDefault();
        const product = $(this).data('product');
        
        // Show notification
        const notification = $(`<div class="cart-notification">${product} added to cart!</div>`);
        $('body').append(notification);
        
        // Animate notification
        notification.css({
            'position': 'fixed',
            'bottom': '20px',
            'right': '20px',
            'background': 'var(--primary-color)',
            'color': 'white',
            'padding': '10px 20px',
            'border-radius': '4px',
            'box-shadow': '0 3px 10px rgba(0,0,0,0.2)',
            'z-index': '1000',
            'transform': 'translateX(200%)',
            'transition': 'transform 0.3s ease'
        });
        
        setTimeout(() => {
            notification.css('transform', 'translateX(0)');
        }, 10);
        
        setTimeout(() => {
            notification.css('transform', 'translateX(200%)');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
        
        // Update cart count
        const currentCount = parseInt($('.cart-count').text()) || 0;
        $('.cart-count').text(currentCount + 1).addClass('updated');
        
        setTimeout(() => {
            $('.cart-count').removeClass('updated');
        }, 300);
    });
});

// Initialize animations when elements come into view
$(window).on('load scroll', function() {
    $('.feature, .service-card, .testimonial-card').each(function() {
        const elementTop = $(this).offset().top;
        const windowHeight = $(window).height();
        const scrollTop = $(window).scrollTop();
        
        if (elementTop < scrollTop + windowHeight - 100) {
            $(this).addClass('animate');
        }
    });
});

// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            mainNav.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle body scroll when menu is open
            document.body.style.overflow = isExpanded ? '' : 'hidden';
        });
        
        // Close menu when clicking on a nav link (for single page applications)
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    mainNav.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && 
                !mainNav.contains(e.target) && 
                !mobileMenuBtn.contains(e.target) &&
                mainNav.getAttribute('aria-expanded') === 'true') {
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mainNav.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Update aria-expanded on window resize
    window.addEventListener('resize', function() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mainNav = document.querySelector('.main-nav');
        
        if (window.innerWidth > 768) {
            if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
            if (mainNav) {
                mainNav.setAttribute('aria-expanded', 'false');
                mainNav.style.maxHeight = '';
                mainNav.style.padding = '';
            }
            document.body.style.overflow = '';
        }
    });
});



    document.addEventListener('DOMContentLoaded', function() {
       
    });