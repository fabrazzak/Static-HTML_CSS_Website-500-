document.addEventListener('DOMContentLoaded', function() {
    // Season selector functionality
    const seasonSelect = document.getElementById('season');
    seasonSelect.addEventListener('change', function() {
        // In a real implementation, this would load the selected season's data
        console.log('Season changed to:', this.value);
        // You would typically fetch new data here and update the standings
    });

    // View options functionality
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // This would toggle between different views of the standings
            const viewType = this.getAttribute('data-view');
            console.log('Switched to view:', viewType);
            // Implement view switching logic here
        });
    });

    // Mobile menu toggle (shared with other pages)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');
    
    mobileMenuBtn.addEventListener('click', function() {
        navbar.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
    });
});