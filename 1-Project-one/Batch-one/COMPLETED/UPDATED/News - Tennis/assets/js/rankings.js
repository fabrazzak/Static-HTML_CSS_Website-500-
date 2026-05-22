document.addEventListener('DOMContentLoaded', function() {
  

    // Rankings Tab Functionality
    const rankingTabs = document.querySelectorAll('.rankings-tabs .tab-btn');
    const rankingContents = document.querySelectorAll('.rankings-content');
    
    if (rankingTabs.length > 0 && rankingContents.length > 0) {
        rankingTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all tabs and contents
                rankingTabs.forEach(t => t.classList.remove('active'));
                rankingContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                this.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    // Rankings History Tab Functionality
    const historyTabs = document.querySelectorAll('.history-tabs .tab-btn');
    const historyContents = document.querySelectorAll('.history-content');
    
    if (historyTabs.length > 0 && historyContents.length > 0) {
        historyTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const historyId = this.getAttribute('data-history');
                
                // Remove active class from all tabs and contents
                historyTabs.forEach(t => t.classList.remove('active'));
                historyContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                this.classList.add('active');
                document.getElementById(historyId).classList.add('active');
            });
        });
    }

    // Search Functionality
    const atpSearch = document.getElementById('atp-search');
    const wtaSearch = document.getElementById('wta-search');
    
    function setupSearch(input, tableId) {
        if (input) {
            input.addEventListener('input', function() {
                const searchValue = this.value.toLowerCase();
                const rows = document.querySelectorAll(`#${tableId} .table-row`);
                
                rows.forEach(row => {
                    const playerName = row.querySelector('.col-player a').textContent.toLowerCase();
                    if (playerName.includes(searchValue)) {
                        row.style.display = 'grid';
                    } else {
                        row.style.display = 'none';
                    }
                });
            });
        }
    }
    
    setupSearch(atpSearch, 'atp-singles');
    setupSearch(wtaSearch, 'wta-singles');

    // Set current date
    const currentDateElement = document.getElementById('current-date');
    if (currentDateElement) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        currentDateElement.textContent = new Date().toLocaleDateString('en-US', options);
    }

    // Table row hover effects
    const tableRows = document.querySelectorAll('.table-row');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.02)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
});