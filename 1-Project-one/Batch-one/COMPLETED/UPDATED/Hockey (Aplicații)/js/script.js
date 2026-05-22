// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navUl = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navUl.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
    });
    
    // Add these to the existing script.js file

// Blog page functionality
if (document.querySelector('.blog-page')) {
    // Initialize any blog-specific JavaScript here
    console.log('Blog page loaded');
}

// FAQ page functionality
if (document.querySelector('.faq-content')) {
    // FAQ accordion is already handled in the FAQ page HTML
    console.log('FAQ page loaded');
    
    // Search functionality
    const faqSearch = document.querySelector('.faq-search input');
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    if (faqSearch) {
        faqSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            accordionItems.forEach(item => {
                const question = item.querySelector('.accordion-btn').textContent.toLowerCase();
                const answer = item.querySelector('.accordion-content').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                    
                    // Open matching items
                    const btn = item.querySelector('.accordion-btn');
                    if (!btn.classList.contains('active')) {
                        btn.click();
                    }
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}
// Blog Page Functionality
if (document.querySelector('.blog-page')) {
    // Initialize blog search
    const blogSearch = document.querySelector('.search-widget input');
    if (blogSearch) {
        blogSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const posts = document.querySelectorAll('.blog-post, .blog-post-featured');
            
            posts.forEach(post => {
                const title = post.querySelector('h2, h3').textContent.toLowerCase();
                const excerpt = post.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    }
    
    // Make popular posts clickable
    document.querySelectorAll('.popular-post').forEach(post => {
        post.addEventListener('click', function(e) {
            if (e.target.tagName !== 'A') {
                this.querySelector('a').click();
            }
        });
    });
}

// Privacy Policy page functionality
if (document.querySelector('.privacy-policy')) {
    // Initialize any privacy policy-specific JavaScript here
    console.log('Privacy Policy page loaded');
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
                if (navUl.classList.contains('active')) {
                    navUl.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                }
            }
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            setTimeout(function() {
                contactForm.style.display = 'none';
                document.getElementById('form-success').style.display = 'block';
            }, 1000);
        });
    }
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartNotification = document.getElementById('cart-notification');
    const cartMessage = document.getElementById('cart-message');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceName = this.getAttribute('data-service');
            cartMessage.textContent = `${serviceName} added to your cart!`;
            
            cartNotification.classList.add('show');
            
            setTimeout(function() {
                cartNotification.classList.remove('show');
            }, 3000);
        });
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function() {
            if (navUl.classList.contains('active')) {
                navUl.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            }
        });
    });
    
    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
});