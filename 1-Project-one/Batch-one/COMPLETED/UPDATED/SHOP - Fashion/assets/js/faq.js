document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion Functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Toggle active class on question
            this.classList.toggle('active');
            
            // Toggle answer visibility
            const answer = this.nextElementSibling;
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
            
            // Close other open answers in the same category
            const category = this.closest('.category-questions');
            if (category) {
                category.querySelectorAll('.faq-question').forEach(otherQuestion => {
                    if (otherQuestion !== this && otherQuestion.classList.contains('active')) {
                        otherQuestion.classList.remove('active');
                        otherQuestion.nextElementSibling.style.maxHeight = null;
                    }
                });
            }
        });
    });
    
    // Search Functionality
    const searchInput = document.getElementById('faq-search-input');
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                    // Open matching questions
                    if (searchTerm.length > 2 && !item.querySelector('.faq-question').classList.contains('active')) {
                        item.querySelector('.faq-question').click();
                    }
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Show/hide categories based on visible items
            document.querySelectorAll('.faq-category').forEach(category => {
                const visibleItems = category.querySelectorAll('.faq-item[style="display: block"]');
                if (visibleItems.length > 0) {
                    category.style.display = 'block';
                } else {
                    category.style.display = 'none';
                }
            });
        });
    }
    
    // Highlight search terms in results
    function highlightText(element, term) {
        if (!term) return;
        
        const text = element.textContent;
        const highlightedText = text.replace(new RegExp(term, 'gi'), match => {
            return `<span class="highlight">${match}</span>`;
        });
        
        element.innerHTML = highlightedText;
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Open all FAQ items in the target category
                    if (targetElement.classList.contains('faq-category')) {
                        targetElement.querySelectorAll('.faq-item').forEach(item => {
                            if (!item.querySelector('.faq-question').classList.contains('active')) {
                                item.querySelector('.faq-question').click();
                            }
                        });
                    }
                    
                    // Scroll to the element
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Initialize with first FAQ item open
    if (faqItems.length > 0) {
        faqItems[0].querySelector('.faq-question').click();
    }
});