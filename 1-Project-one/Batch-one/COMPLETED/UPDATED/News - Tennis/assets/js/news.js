// News Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
 

    // News Filter Functionality
    const categoryFilter = document.getElementById('news-category');
    const dateFilter = document.getElementById('news-date');
    const newsCards = document.querySelectorAll('.news-card');
    const featuredStory = document.querySelector('.featured-story');

    function filterNews() {
        const categoryValue = categoryFilter.value;
        const dateValue = dateFilter.value;
        
        // Get current date for date filtering
        const currentDate = new Date();
        const currentWeek = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

        newsCards.forEach(card => {
            const cardCategory = card.querySelector('.category-label').classList[1];
            const cardDateText = card.querySelector('.date').textContent;
            const cardDate = new Date(cardDateText);
            
            let categoryMatch = (categoryValue === 'all') || (cardCategory === categoryValue);
            let dateMatch = true;
            
            if (dateValue === 'week') {
                dateMatch = cardDate >= currentWeek;
            } else if (dateValue === 'month') {
                dateMatch = cardDate >= currentMonth;
            }
            
            if (categoryMatch && dateMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Also filter featured story if needed
        if (featuredStory) {
            const featuredCategory = featuredStory.querySelector('.category').classList[1];
            const featuredDateText = featuredStory.querySelector('.date').textContent;
            const featuredDate = new Date(featuredDateText);
            
            let featuredCategoryMatch = (categoryValue === 'all') || (featuredCategory === categoryValue);
            let featuredDateMatch = true;
            
            if (dateValue === 'week') {
                featuredDateMatch = featuredDate >= currentWeek;
            } else if (dateValue === 'month') {
                featuredDateMatch = featuredDate >= currentMonth;
            }
            
            if (featuredCategoryMatch && featuredDateMatch) {
                featuredStory.style.display = 'grid';
            } else {
                featuredStory.style.display = 'none';
            }
        }
    }

    // Add event listeners for filters
    if (categoryFilter && dateFilter) {
        categoryFilter.addEventListener('change', filterNews);
        dateFilter.addEventListener('change', filterNews);
    }

    // Newsletter Form Submission (Same as home page)
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            // Simple validation
            if (emailInput.value === '') {
                alert('Please enter your email address');
                return;
            }
            
            // Here you would typically send the data to a server
            alert('Thank you for subscribing to TennisFeedHQ!');
            emailInput.value = '';
        });
    }

    // Article Read Time Calculation
    function calculateReadTime() {
        const articles = document.querySelectorAll('.news-card, .featured-story');
        const wordsPerMinute = 200; // Average reading speed
        
        articles.forEach(article => {
            const content = article.querySelector('p');
            if (content) {
                const text = content.textContent;
                const wordCount = text.split(/\s+/).length;
                const readTime = Math.ceil(wordCount / wordsPerMinute);
                
                // Add read time to meta info
                const meta = article.querySelector('.meta');
                if (meta) {
                    const readTimeElement = document.createElement('span');
                    readTimeElement.className = 'read-time';
                    readTimeElement.innerHTML = `<i class="far fa-clock"></i> ${readTime} min read`;
                    meta.appendChild(readTimeElement);
                }
            }
        });
    }

    // Run read time calculation
    calculateReadTime();

    // Smooth scrolling for anchor links (Same as home page)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation to news cards when they come into view
    const animateNewsCards = function() {
        const cards = document.querySelectorAll('.news-card, .featured-story');
        
        cards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardPosition < windowHeight - 100) {
                card.classList.add('animate');
            }
        });
    };
    
    // Run on load and scroll
    window.addEventListener('load', animateNewsCards);
    window.addEventListener('scroll', animateNewsCards);
});