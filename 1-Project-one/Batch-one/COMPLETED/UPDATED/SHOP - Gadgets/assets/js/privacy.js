document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });
    
    // Print button functionality (optional)
    const printButton = document.createElement('button');
    printButton.className = 'btn btn-print';
    printButton.innerHTML = '<i class="fas fa-print"></i> Print Policy';
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    const printContainer = document.querySelector('.privacy-intro');
    if (printContainer) {
        printContainer.appendChild(printButton);
    }
});