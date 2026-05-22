document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    
    // Video play buttons
    const playButtons = document.querySelectorAll('.play-btn');
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            // In a real implementation, this would open a video modal or similar
            alert('Video playback would be implemented here!');
        });
    });
    
    // Sticky header on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Initialize any sliders (using a library like Slick would be better for production)
    // This is just a basic implementation
    if (document.querySelector('.players-slider')) {
        let currentPlayerIndex = 0;
        const playerCards = document.querySelectorAll('.player-card');
        const totalPlayers = playerCards.length;
        
        function showPlayer(index) {
            playerCards.forEach(card => card.style.display = 'none');
            playerCards[index].style.display = 'block';
        }
        
        // For demo purposes - in production you'd use a proper slider library
        showPlayer(currentPlayerIndex);
        
        setInterval(() => {
            currentPlayerIndex = (currentPlayerIndex + 1) % totalPlayers;
            showPlayer(currentPlayerIndex);
        }, 3000);
    }
});