// News Page Specific JavaScript
$(document).ready(function() {
    // News filtering functionality
    $('.filter-btn').click(function() {
        // Remove active class from all buttons
        $('.filter-btn').removeClass('active');
        // Add active class to clicked button
        $(this).addClass('active');
        
        const filter = $(this).data('filter');
        
        if (filter === 'all') {
            // Show all news cards
            $('.news-card').show();
        } else {
            // Hide all news cards
            $('.news-card').hide();
            // Show only cards with matching category
            $(`.news-card[data-category*="${filter}"]`).show();
        }
    });

    // Search functionality
    $('.search-box button').click(function() {
        performSearch();
    });

    $('.search-box input').keypress(function(e) {
        if (e.which === 13) { // Enter key
            performSearch();
        }
    });

    function performSearch() {
        const searchTerm = $('.search-box input').val().toLowerCase();
        
        if (searchTerm === '') {
            $('.news-card').show();
            return;
        }
        
        $('.news-card').each(function() {
            const cardText = $(this).text().toLowerCase();
            if (cardText.includes(searchTerm)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    // Pagination functionality
    $('.page-num, .page-btn').click(function(e) {
        e.preventDefault();
        
        // Remove active class from all page numbers
        $('.page-num').removeClass('active');
        
        if ($(this).hasClass('page-num')) {
            // Add active class to clicked page number
            $(this).addClass('active');
            
            // Here you would typically load the content for the selected page
            // For this demo, we'll just show an alert
            const pageNum = $(this).text();
            alert(`Loading page ${pageNum} content...`);
        } else if ($(this).hasClass('page-btn') && !$(this).hasClass('disabled')) {
            // Handle next/previous buttons
            const currentActive = $('.page-num.active');
            let nextPage;
            
            if ($(this).text().includes('Next')) {
                nextPage = currentActive.next('.page-num');
            } else {
                nextPage = currentActive.prev('.page-num');
            }
            
            if (nextPage.length) {
                currentActive.removeClass('active');
                nextPage.addClass('active');
                
                // Here you would load the content for the new page
                const pageNum = nextPage.text();
                alert(`Loading page ${pageNum} content...`);
            }
        }
    });
});