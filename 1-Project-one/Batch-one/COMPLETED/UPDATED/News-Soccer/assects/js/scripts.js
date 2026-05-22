document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // Mobile Menu Toggle
    // ======================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        const menuIcon = mobileMenuBtn.querySelector('i');
        
        mobileMenuBtn.addEventListener('click', function() {
            // Toggle menu and icon
            mainNav.classList.toggle('active');
            const isActive = mainNav.classList.contains('active');
            
            // Change icon based on menu state
            if (isActive) {
                menuIcon.classList.replace('fa-bars', 'fa-times');
            } else {
                menuIcon.classList.replace('fa-times', 'fa-bars');
            }
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.addEventListener('click', function() {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    menuIcon.classList.replace('fa-times', 'fa-bars');
                }
            });
        });
    }
    
    // ======================
    // Filter Functionality (for news, matches, leagues)
    // ======================
    function setupFilter(containerClass, itemClass) {
        const containers = document.querySelectorAll(containerClass);
        
        containers.forEach(container => {
            const filterButtons = container.querySelectorAll('.filter-btn');
            const items = document.querySelectorAll(itemClass);
            
            if (filterButtons.length && items.length) {
                filterButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        // Update active button
                        filterButtons.forEach(btn => btn.classList.remove('active'));
                        this.classList.add('active');
                        
                        // Filter items
                        const filterValue = this.getAttribute('data-filter');
                        items.forEach(item => {
                            item.style.display = (filterValue === 'all' || item.classList.contains(filterValue)) 
                                ? 'block' 
                                : 'none';
                        });
                    });
                });
            }
        });
    }
    
    // Initialize filters for different sections
    setupFilter('.news-filter', '.news-article');
    setupFilter('.matches-filter', '.match-card');
    setupFilter('.leagues-filter', '.league-card');
    
    // ======================
    // Tab Functionality
    // ======================
    function setupTabs(containerClass) {
        const tabContainers = document.querySelectorAll(containerClass);
        
        tabContainers.forEach(container => {
            const tabBtns = container.querySelectorAll('.tab-btn');
            const tabContents = container.querySelectorAll('.tab-content');
            
            if (tabBtns.length && tabContents.length) {
                tabBtns.forEach(btn => {
                    btn.addEventListener('click', function() {
                        const tabId = this.getAttribute('data-tab');
                        
                        // Update active tab button
                        tabBtns.forEach(btn => btn.classList.remove('active'));
                        this.classList.add('active');
                        
                        // Update active tab content
                        tabContents.forEach(content => content.classList.remove('active'));
                        document.getElementById(tabId)?.classList.add('active');
                    });
                });
                
                // Activate first tab if none is active
                if (!container.querySelector('.tab-btn.active')) {
                    tabBtns[0]?.classList.add('active');
                    tabContents[0]?.classList.add('active');
                }
            }
        });
    }
    
    setupTabs('.tab-container');
    
    // ======================
    // Form Submissions
    // ======================
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Handle newsletter forms
            if (this.id === 'newsletter-form') {
                const emailInput = this.querySelector('input[type="email"]');
                
                if (!emailInput.value.includes('@')) {
                    alert('Please enter a valid email address');
                    return;
                }
                
                alert('Thank you for subscribing!');
                emailInput.value = '';
            }
            
            // Add other form handlers as needed
        });
    });
    
    // ======================
    // Animation on Scroll
    // ======================
    function setupScrollAnimation(selector) {
        const elements = document.querySelectorAll(selector);
        
        if (elements.length) {
            // Set initial state
            elements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            });
            
            // Animation function
            const animate = function() {
                elements.forEach((el, index) => {
                    const elPosition = el.getBoundingClientRect().top;
                    const screenPosition = window.innerHeight / 1.2;
                    
                    if (elPosition < screenPosition) {
                        setTimeout(() => {
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                        }, index * 100);
                    }
                });
            };
            
            // Run on load and scroll
            window.addEventListener('load', animate);
            window.addEventListener('scroll', animate);
        }
    }
    
    // Initialize animations for different elements
    setupScrollAnimation('.news-article, .match-card, .league-card, .value-card');
    
    // ======================
    // Other Interactive Elements
    // ======================
    // Add to cart buttons
    document.querySelectorAll('.btn.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const originalText = this.textContent;
            
            this.textContent = 'Added!';
            this.style.backgroundColor = '#28a745';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
            }, 2000);
        });
    });
    
    // Video play buttons
    document.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const videoTitle = this.closest('.video-card')?.querySelector('h3')?.textContent;
            alert(`Now playing: ${videoTitle || 'this video'}`);
        });
    });
    
    // Watch buttons for matches
    document.querySelectorAll('.watch-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const matchCard = this.closest('.match-card');
            const teams = matchCard?.querySelectorAll('.team-name');
            alert(`Now watching: ${teams?.[0]?.textContent || 'Home'} vs ${teams?.[1]?.textContent || 'Away'}`);
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#') {
                document.querySelector(targetId)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Team member hover effects
    document.querySelectorAll('.team-member').forEach(member => {
        member.addEventListener('mouseenter', () => {
            member.querySelector('.member-image img').style.transform = 'scale(1.1)';
        });
        
        member.addEventListener('mouseleave', () => {
            member.querySelector('.member-image img').style.transform = 'scale(1)';
        });
    });
});



document.addEventListener('DOMContentLoaded', function() {
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields');
                return;
            }
            
            if (!email.includes('@')) {
                alert('Please enter a valid email address');
                return;
            }
            
            // In a real implementation, you would send the form data to a server here
            // For this example, we'll just show a success message
            alert(`Thank you, ${name}! Your message has been sent. We'll get back to you soon.`);
            
            // Reset the form
            contactForm.reset();
        });
    }
    
    // FAQ Accordion Functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
    
    // Initialize first FAQ item as open
    if (faqQuestions.length > 0) {
        faqQuestions[0].parentElement.classList.add('active');
    }
});