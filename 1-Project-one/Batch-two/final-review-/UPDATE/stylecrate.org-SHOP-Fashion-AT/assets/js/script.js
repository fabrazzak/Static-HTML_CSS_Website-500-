$(document).ready(function() {
    // Mobile Menu Toggle
    $('.mobile-menu-toggle').click(function() {
        $('.mobile-menu').addClass('active');
        $('body').css('overflow', 'hidden');
    });
    
    $('.mobile-menu-close').click(function() {
        $('.mobile-menu').removeClass('active');
        $('body').css('overflow', 'auto');
    });
    
    // Close mobile menu when clicking on a link
    $('.mobile-menu a').click(function() {
        $('.mobile-menu').removeClass('active');
        $('body').css('overflow', 'auto');
    });
    
    // Cart Sidebar Toggle
    $('.cart-btn').click(function(e) {
        e.preventDefault();
        $('.cart-sidebar').addClass('active');
        $('body').css('overflow', 'hidden');
    });
    
    $('.cart-close').click(function() {
        $('.cart-sidebar').removeClass('active');
        $('body').css('overflow', 'auto');
    });
    
    // Quick View Modal
    $('.quick-view').click(function(e) {
        e.preventDefault();
        const productCard = $(this).closest('.product-card');
        const productName = productCard.find('h3').text();
        const productPrice = productCard.find('.price').text();
        const productImage = productCard.find('img').attr('src');
        
        const modalContent = `
            <div class="quick-view-content">
                <div class="quick-view-image">
                    <img src="${productImage}" alt="${productName}">
                </div>
                <div class="quick-view-details">
                    <h3>${productName}</h3>
                    <div class="price">${productPrice}</div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <div class="product-options">
                        <div class="option">
                            <label>Size</label>
                            <select>
                                <option>S</option>
                                <option>M</option>
                                <option>L</option>
                                <option>XL</option>
                            </select>
                        </div>
                        <div class="option">
                            <label>Color</label>
                            <select>
                                <option>Black</option>
                                <option>White</option>
                                <option>Blue</option>
                                <option>Beige</option>
                            </select>
                        </div>
                        <div class="option">
                            <label>Quantity</label>
                            <input type="number" value="1" min="1">
                        </div>
                    </div>
                    <button class="btn btn-primary add-to-cart">Add to Cart</button>
                </div>
            </div>
        `;
        
        $('.quick-view-modal .modal-body').html(modalContent);
        $('.quick-view-modal').addClass('active');
        $('body').css('overflow', 'hidden');
    });
    
    $('.modal-close').click(function() {
        $('.modal').removeClass('active');
        $('body').css('overflow', 'auto');
    });
    
    // Close modal when clicking outside
    $('.modal').click(function(e) {
        if ($(e.target).hasClass('modal')) {
            $('.modal').removeClass('active');
            $('body').css('overflow', 'auto');
        }
    });
    
    // Add to Cart Functionality
    let cartCount = 0;
    
    $('body').on('click', '.add-to-cart', function() {
        cartCount++;
        $('.cart-count').text(cartCount);
        
        // Show notification
        const notification = $(`
            <div class="cart-notification">
                <i class="fas fa-check"></i> Item added to cart
            </div>
        `);
        
        $('body').append(notification);
        
        setTimeout(function() {
            notification.addClass('show');
        }, 10);
        
        setTimeout(function() {
            notification.removeClass('show');
            setTimeout(function() {
                notification.remove();
            }, 300);
        }, 3000);
        
        // Close modal if it's open
        $('.modal').removeClass('active');
        $('body').css('overflow', 'auto');
    });
    
    // Smooth scrolling for anchor links
    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        
        $('html, body').animate(
            {
                scrollTop: $($(this).attr('href')).offset().top - 100,
            },
            500,
            'linear'
        );
    });
    
    // Header scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.header').addClass('scrolled');
        } else {
            $('.header').removeClass('scrolled');
        }
    });
    
    // Newsletter form submission
    $('.newsletter-form').submit(function(e) {
        e.preventDefault();
        const email = $(this).find('input').val();
        
        // Simple validation
        if (email && email.includes('@')) {
            $(this).html(`
                <div class="newsletter-success">
                    <i class="fas fa-check-circle"></i>
                    <p>Thank you for subscribing!</p>
                </div>
            `);
        }
    });
});

// Add cart notification styles to head
const cartNotificationStyles = `
    <style>
        .cart-notification {
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--secondary-color);
            color: var(--primary-color);
            padding: 15px 25px;
            border-radius: 4px;
            font-weight: 500;
            box-shadow: var(--shadow-lg);
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 1003;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .cart-notification.show {
            opacity: 1;
        }
        
        .header.scrolled {
            padding: 10px 0;
            background-color: rgba(255, 255, 255, 0.95);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .quick-view-content {
            display: flex;
            gap: 30px;
        }
        
        .quick-view-image {
            flex: 1;
        }
        
        .quick-view-image img {
            width: 100%;
            border-radius: 8px;
        }
        
        .quick-view-details {
            flex: 1;
        }
        
        .quick-view-details h3 {
            font-family: var(--font-heading);
            margin-bottom: 15px;
        }
        
        .quick-view-details .price {
            font-size: 1.5rem;
            color: var(--secondary-color);
            margin-bottom: 20px;
            font-weight: 600;
        }
        
        .quick-view-details p {
            margin-bottom: 30px;
            color: var(--gray-color);
        }
        
        .product-options {
            margin-bottom: 30px;
        }
        
        .option {
            margin-bottom: 15px;
        }
        
        .option label {
            display: block;
            margin-bottom: 5px;
            font-weight: 500;
        }
        
        .option select, .option input {
            width: 100%;
            padding: 10px;
            border: 1px solid var(--light-gray);
            border-radius: 4px;
            font-family: inherit;
        }
        
        @media (max-width: 768px) {
            .quick-view-content {
                flex-direction: column;
            }
        }
    </style>
`;

$('head').append(cartNotificationStyles);