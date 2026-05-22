document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabs = document.querySelectorAll('.stats-tab');
    const sections = document.querySelectorAll('.stats-section');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and sections
            tabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding section
            const target = this.getAttribute('data-tab');
            document.getElementById(target).classList.add('active');
        });
    });

    // Season filter functionality
    const seasonSelect = document.getElementById('season');
    seasonSelect.addEventListener('change', function() {
        console.log('Season changed to:', this.value);
        // In a real implementation, this would fetch new data
    });

    // Stat category filter functionality
    const categorySelect = document.getElementById('stat-category');
    categorySelect.addEventListener('change', function() {
        console.log('Category changed to:', this.value);
        // In a real implementation, this would sort the tables
    });

    // Mobile menu toggle (shared with other pages)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');
    
    mobileMenuBtn.addEventListener('click', function() {
        navbar.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
    });
});