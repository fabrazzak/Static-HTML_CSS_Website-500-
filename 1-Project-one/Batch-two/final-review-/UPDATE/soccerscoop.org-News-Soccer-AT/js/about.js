document.addEventListener('DOMContentLoaded', function() {
   
    
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
    
    // Team member hover effect for touch devices
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        let isTouched = false;
        
        member.addEventListener('touchstart', function() {
            isTouched = true;
            setTimeout(() => {
                isTouched = false;
            }, 500);
        });
        
        member.addEventListener('click', function(e) {
            if (isTouched) {
                e.preventDefault();
                this.classList.toggle('active');
            }
        });
    });
    
    // Testimonial carousel functionality for mobile
    const testimonials = document.querySelector('.testimonials-content');
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
    let currentIndex = 0;
    
    if (testimonials) {
        testimonials.addEventListener('touchstart', touchStart);
        testimonials.addEventListener('touchend', touchEnd);
        testimonials.addEventListener('touchmove', touchMove);
        
        // Prevent window scroll on touch
        testimonials.addEventListener('touchstart', function(e) {
            e.preventDefault();
        }, { passive: false });
    }
    
    function touchStart(e) {
        if (window.innerWidth > 768) return;
        
        isDragging = true;
        startPos = e.touches[0].clientX;
        animationID = requestAnimationFrame(animation);
    }
    
    function touchEnd() {
        if (!isDragging) return;
        isDragging = false;
        cancelAnimationFrame(animationID);
        
        const movedBy = currentTranslate - prevTranslate;
        
        if (movedBy < -100 && currentIndex < testimonials.children.length - 1) {
            currentIndex += 1;
        }
        
        if (movedBy > 100 && currentIndex > 0) {
            currentIndex -= 1;
        }
        
        setPositionByIndex();
    }
    
    function touchMove(e) {
        if (!isDragging) return;
        const currentPosition = e.touches[0].clientX;
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
    
    function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    }
    
    function setSliderPosition() {
        testimonials.style.transform = `translateX(${currentTranslate}px)`;
    }
    
    function setPositionByIndex() {
        const testimonialWidth = testimonials.children[0].offsetWidth + 30; // including gap
        currentTranslate = -(currentIndex * testimonialWidth);
        prevTranslate = currentTranslate;
        setSliderPosition();
    }
    
    // Scroll reveal animations
    const scrollReveal = ScrollReveal({
        origin: 'bottom',
        distance: '40px',
        duration: 1000,
        reset: false
    });
    
    scrollReveal.reveal('.intro-content, .mission-card, .team-member, .value-card, .testimonial-card', {
        interval: 200
    });
});