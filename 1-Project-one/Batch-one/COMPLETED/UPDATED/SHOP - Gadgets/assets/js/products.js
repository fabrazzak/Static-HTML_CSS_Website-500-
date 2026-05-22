document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');
    
    mobileMenuBtn.addEventListener('click', function() {
        navbar.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-bars');
        this.querySelector('i').classList.toggle('fa-times');
    });

    // Cart functionality
    const cartBtn = document.querySelector('.cart-btn');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartClose = document.querySelector('.cart-close');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.total-amount');
    
    let cart = [];
    
    // Toggle cart sidebar
    cartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        cartSidebar.classList.toggle('active');
    });
    
    cartClose.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
    });
    
    // Add to cart functionality
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productId = productCard.dataset.id;
            const productName = productCard.querySelector('h3 a').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            const productImage = productCard.querySelector('.product-image img').src;
            
            // Check if product already in cart
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: parseFloat(productPrice.replace('$', '')),
                    image: productImage,
                    quantity: 1
                });
            }
            
            updateCart();
            
            // Show success feedback
            this.textContent = 'Added!';
            setTimeout(() => {
                this.textContent = 'Add to Cart';
            }, 2000);
        });
    });
    
    // Update cart UI
    function updateCart() {
        // Update cart count
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Update cart items list
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
            cartTotal.textContent = '$0.00';
            return;
        }
        
        let itemsHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            itemsHTML += `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
                        <div class="cart-item-total">$${itemTotal.toFixed(2)}</div>
                    </div>
                    <div class="cart-item-actions">
                        <button class="cart-item-remove"><i class="fas fa-times"></i></button>
                    </div>
                </div>
            `;
        });
        
        cartItems.innerHTML = itemsHTML;
        cartTotal.textContent = `$${total.toFixed(2)}`;
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = this.closest('.cart-item').dataset.id;
                cart = cart.filter(item => item.id !== itemId);
                updateCart();
            });
        });
    }
    
    // Quick view functionality
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    const quickViewModal = document.querySelector('.quick-view-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productId = productCard.dataset.id;
            const productName = productCard.querySelector('h3 a').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            const productOldPrice = productCard.querySelector('.old-price')?.textContent || '';
            const productImage = productCard.querySelector('.product-image img').src;
            const productRating = productCard.querySelector('.stars').innerHTML;
            const productRatingCount = productCard.querySelector('.rating-count').textContent;
            const productCategory = productCard.querySelector('.product-category').textContent;
            
            // In a real implementation, you would fetch more detailed product info here
            const modalBody = document.querySelector('.modal-body');
            modalBody.innerHTML = `
                <div class="quick-view-content">
                    <div class="quick-view-image">
                        <img src="${productImage}" alt="${productName}">
                    </div>
                    <div class="quick-view-details">
                        <span class="product-category">${productCategory}</span>
                        <h2>${productName}</h2>
                        <div class="product-rating">
                            ${productRating}
                            <span class="rating-count">${productRatingCount}</span>
                        </div>
                        <div class="product-price">
                            <span class="current-price">${productPrice}</span>
                            ${productOldPrice ? `<span class="old-price">${productOldPrice}</span>` : ''}
                        </div>
                        <p class="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                        <div class="product-options">
                            <div class="option-group">
                                <label>Color:</label>
                                <div class="color-options">
                                    <button class="color-option" style="background-color: #000000;"></button>
                                    <button class="color-option" style="background-color: #ffffff; border: 1px solid #ddd;"></button>
                                    <button class="color-option" style="background-color: #4285f4;"></button>
                                </div>
                            </div>
                            <div class="option-group">
                                <label>Storage:</label>
                                <div class="storage-options">
                                    <button class="storage-option">64GB</button>
                                    <button class="storage-option">128GB</button>
                                    <button class="storage-option">256GB</button>
                                </div>
                            </div>
                        </div>
                        <div class="product-actions">
                            <div class="quantity-selector">
                                <button class="quantity-btn minus"><i class="fas fa-minus"></i></button>
                                <input type="number" value="1" min="1">
                                <button class="quantity-btn plus"><i class="fas fa-plus"></i></button>
                            </div>
                            <button class="btn btn-primary add-to-cart">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `;
            
            quickViewModal.classList.add('active');
        });
    });
    
    // Close modal
    modalClose.addEventListener('click', function() {
        quickViewModal.classList.remove('active');
    });
    
    modalOverlay.addEventListener('click', function() {
        quickViewModal.classList.remove('active');
    });
    
    // Filter functionality
    const sortBySelect = document.getElementById('sort-by');
    const priceRangeSelect = document.getElementById('price-range');
    const brandSelect = document.getElementById('brand');
    const resetFiltersBtn = document.querySelector('.filter-reset button');
    
    sortBySelect.addEventListener('change', applyFilters);
    priceRangeSelect.addEventListener('change', applyFilters);
    brandSelect.addEventListener('change', applyFilters);
    
    resetFiltersBtn.addEventListener('click', function(e) {
        e.preventDefault();
        sortBySelect.value = 'featured';
        priceRangeSelect.value = 'all';
        brandSelect.value = 'all';
        applyFilters();
    });
    
    function applyFilters() {
        console.log('Applying filters:');
        console.log('Sort by:', sortBySelect.value);
        console.log('Price range:', priceRangeSelect.value);
        console.log('Brand:', brandSelect.value);
        
        // In a real implementation, this would filter and sort the products
        // For now, we'll just log the filter values
    }
    
    // Category filter
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.textContent.trim();
            console.log('Category selected:', category);
            
            // In a real implementation, this would filter products by category
        });
    });
    
    // Wishlist functionality
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            this.querySelector('i').classList.toggle('far');
            this.querySelector('i').classList.toggle('fas');
            
            if (this.classList.contains('active')) {
                // Product added to wishlist
                console.log('Added to wishlist');
            } else {
                // Product removed from wishlist
                console.log('Removed from wishlist');
            }
        });
    });
    
    // Pagination
    const pageBtns = document.querySelectorAll('.page-btn');
    
    pageBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('disabled')) return;
            
            // Remove active class from all buttons
            pageBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            if (!this.querySelector('i')) {
                this.classList.add('active');
            }
            
            const page = this.textContent.trim();
            console.log('Page selected:', page);
            
            // In a real implementation, this would load the selected page
        });
    });
});