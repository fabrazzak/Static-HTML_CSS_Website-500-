// standings.js - Standings Page Specific Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Conference Tab Switching
    const conferenceTabs = document.querySelectorAll('.standings-nav__tab');
    const conferenceContents = document.querySelectorAll('.standings-conference');
    
    if (conferenceTabs.length > 0 && conferenceContents.length > 0) {
        conferenceTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                conferenceTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all conference contents
                conferenceContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // Show selected conference content
                const conference = this.getAttribute('data-conference');
                document.getElementById(`${conference}-standings`).classList.add('active');
            });
        });
    }
    
    // Division Filter
    const divisionFilter = document.getElementById('division-filter');
    if (divisionFilter) {
        divisionFilter.addEventListener('change', function() {
            const selectedDivision = this.value;
            const divisions = document.querySelectorAll('.standings-division');
            
            if (selectedDivision === 'all') {
                divisions.forEach(div => {
                    div.style.display = 'block';
                });
            } else {
                divisions.forEach(div => {
                    if (div.getAttribute('data-division') === selectedDivision) {
                        div.style.display = 'block';
                    } else {
                        div.style.display = 'none';
                    }
                });
            }
        });
    }
    
    // Sort By Functionality
    const sortBySelect = document.getElementById('sort-by');
    if (sortBySelect) {
        sortBySelect.addEventListener('change', function() {
            const sortValue = this.value;
            const activeConference = document.querySelector('.standings-conference.active');
            const tables = activeConference.querySelectorAll('.standings-table table');
            
            tables.forEach(table => {
                const tbody = table.querySelector('tbody');
                const rows = Array.from(tbody.querySelectorAll('tr'));
                
                rows.sort((a, b) => {
                    const aValue = a.querySelector(`td:nth-child(${getColumnIndex(sortValue)})`).textContent;
                    const bValue = b.querySelector(`td:nth-child(${getColumnIndex(sortValue)})`).textContent;
                    
                    if (sortValue === 'team') {
                        return aValue.localeCompare(bValue);
                    } else if (sortValue === 'pct' || sortValue === 'gb') {
                        return parseFloat(bValue) - parseFloat(aValue);
                    } else {
                        return parseInt(bValue) - parseInt(aValue);
                    }
                });
                
                // Remove all rows
                rows.forEach(row => tbody.removeChild(row));
                
                // Add sorted rows
                rows.forEach(row => tbody.appendChild(row));
            });
        });
    }
    
    // Helper function to get column index based on sort value
    function getColumnIndex(sortValue) {
        const columns = {
            'rank': 1,
            'team': 1,
            'wins': 2,
            'losses': 3,
            'pct': 4,
            'gb': 5,
            'home': 6,
            'away': 7,
            'l10': 8,
            'streak': 9
        };
        return columns[sortValue] || 1;
    }
    
    // Highlight team rows on hover
    const teamCells = document.querySelectorAll('.team-cell');
    teamCells.forEach(cell => {
        cell.addEventListener('mouseenter', function() {
            const row = this.closest('tr');
            row.style.backgroundColor = 'rgba(230, 57, 70, 0.1)';
        });
        
        cell.addEventListener('mouseleave', function() {
            const row = this.closest('tr');
            const isEven = row.rowIndex % 2 === 0;
            row.style.backgroundColor = isEven ? '#f9f9f9' : 'white';
        });
    });
    
    // Make team names clickable (would link to team pages in real implementation)
    teamCells.forEach(cell => {
        cell.style.cursor = 'pointer';
        cell.addEventListener('click', function() {
            const teamName = this.querySelector('span').textContent;
            alert(`In a real implementation, this would link to the ${teamName} team page.`);
        });
    });
});