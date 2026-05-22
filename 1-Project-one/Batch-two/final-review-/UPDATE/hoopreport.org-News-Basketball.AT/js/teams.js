// Teams Page Specific JavaScript
$(document).ready(function() {
    // Conference tab switching
    $('.tab-btn').click(function() {
        // Remove active class from all buttons
        $('.tab-btn').removeClass('active');
        // Add active class to clicked button
        $(this).addClass('active');
        
        const tab = $(this).data('tab');
        
        // Hide all standings tables
        $('.standings-table').removeClass('active');
        // Show selected standings table
        $(`#${tab}-table`).addClass('active');
    });

    // Season selector functionality
    $('#season').change(function() {
        const season = $(this).val();
        alert(`Loading standings for ${season}-${parseInt(season)+1} season...`);
        // In a real implementation, this would fetch the standings data for the selected season
    });

    // Team card hover effect
    $('.team-card').hover(
        function() {
            $(this).find('.team-logo img').css('transform', 'scale(1.1)');
        },
        function() {
            $(this).find('.team-logo img').css('transform', 'scale(1)');
        }
    );

    // Filter teams by conference when tab is changed
    $('.tab-btn').click(function() {
        const conference = $(this).data('tab');
        
        if (conference === 'eastern') {
            $('.team-card[data-conference="western"]').hide();
            $('.team-card[data-conference="eastern"]').show();
        } else {
            $('.team-card[data-conference="eastern"]').hide();
            $('.team-card[data-conference="western"]').show();
        }
    });
});