// Stats Page Specific JavaScript
$(document).ready(function() {
    // Initialize DataTables
    $('#player-stats-table').DataTable({
        "pageLength": 10,
        "lengthMenu": [10, 25, 50, 100],
        "order": [[4, "desc"]] // Sort by PTS by default
    });
    
    $('#team-stats-table').DataTable({
        "pageLength": 10,
        "lengthMenu": [10, 25, 30],
        "order": [[10, "desc"]] // Sort by +/- by default
    });
    
    $('#advanced-stats-table').DataTable({
        "pageLength": 10,
        "lengthMenu": [10, 25, 50, 100],
        "order": [[2, "desc"]] // Sort by PER by default
    });

    // Stats tab switching
    $('.stats-tab').click(function() {
        // Remove active class from all tabs
        $('.stats-tab').removeClass('active');
        // Add active class to clicked tab
        $(this).addClass('active');
        
        const tab = $(this).data('tab');
        
        // Hide all stats sections
        $('.stats-section').removeClass('active');
        // Show selected stats section
        $(`#${tab}`).addClass('active');
    });

    // Season selector functionality
    $('.stats-filter select').change(function() {
        const section = $(this).closest('.stats-section').attr('id');
        alert(`Loading ${section} data for selected filters...`);
        // In a real implementation, this would fetch the data for the selected filters
    });

    // Search functionality
    $('.stats-search button').click(function(e) {
        e.preventDefault();
        const searchTerm = $(this).siblings('input').val();
        const section = $(this).closest('.stats-section').attr('id');
        
        if (searchTerm === '') return;
        
        alert(`Searching ${section} for "${searchTerm}"...`);
        // In a real implementation, this would filter the table data
    });

    $('.stats-search input').keypress(function(e) {
        if (e.which === 13) { // Enter key
            $(this).siblings('button').click();
        }
    });
});