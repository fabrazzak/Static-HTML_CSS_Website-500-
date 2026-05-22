document.addEventListener('DOMContentLoaded', function() {
    // Product data
    const products = [
        {
            id: 1,
            title: "Floral Summer Dress",
            category: "women",
            price: 49.99,
            oldPrice: 69.99,
            rating: 4.5,
            reviews: 24,
            image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1373&q=80",
            badge: "Sale",
            colors: ["red", "black", "white"],
            sizes: ["S", "M", "L"]
        },
        {
            id: 2,
            title: "Slim Fit Jeans",
            category: "men",
            price: 59.99,
            oldPrice: 79.99,
            rating: 4.2,
            reviews: 18,
            image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
            badge: "Popular",
            colors: ["blue", "black"],
            sizes: ["M", "L", "XL"]
        },
        {
            id: 3,
            title: "Leather Crossbody Bag",
            category: "accessories",
            price: 39.99,
            oldPrice: 49.99,
            rating: 4.7,
            reviews: 32,
            image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1386&q=80",
            badge: "New",
            colors: ["black", "red"],
            sizes: ["One Size"]
        },
        {
            id: 4,
            title: "Striped T-Shirt",
            category: "men",
            price: 24.99,
            oldPrice: null,
            rating: 4.0,
            reviews: 12,
            image: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
            badge: null,
            colors: ["blue", "white", "black"],
            sizes: ["S", "M", "L", "XL"]
        },
        {
            id: 5,
            title: "Denim Jacket",
            category: "women",
            price: 79.99,
            oldPrice: 99.99,
            rating: 4.8,
            reviews: 28,
            image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
            badge: "Bestseller",
            colors: ["blue", "black"],
            sizes: ["S", "M", "L"]
        },
        {
            id: 6,
            title: "Silk Scarf",
            category: "accessories",
            price: 29.99,
            oldPrice: null,
            rating: 4.3,
            reviews: 15,
            image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            badge: null,
            colors: ["red", "green", "blue"],
            sizes: ["One Size"]
        },
        {
            id: 7,
            title: "High Waist Skirt",
            category: "women",
            price: 34.99,
            oldPrice: 44.99,
            rating: 4.1,
            reviews: 19,
            image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            badge: "Sale",
            colors: ["black", "white"],
            sizes: ["XS", "S", "M"]
        },
        {
            id: 8,
            title: "Casual Sneakers",
            category: "men",
            price: 64.99,
            oldPrice: 84.99,
            rating: 4.6,
            reviews: 27,
            image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80",
            badge: "New",
            colors: ["white", "black"],
            sizes: ["M", "L", "XL"]
        },
      
        {
            id: 10,
            title: "Leather Wallet",
            category: "accessories",
            price: 49.99,
            oldPrice: 59.99,
            rating: 4.4,
            reviews: 23,
            image: "https://images.unsplash.com/photo-1548032885-b5e38734688a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
            badge: null,
            colors: ["brown", "black"],
            sizes: ["One Size"]
        },
        {
            id: 11,
            title: "Linen Shirt",
            category: "men",
            price: 44.99,
            oldPrice: null,
            rating: 4.3,
            reviews: 17,
            image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1325&q=80",
            badge: "Eco",
            colors: ["white", "blue", "beige"],
            sizes: ["S", "M", "L", "XL"]
        },
        {
            id: 12,
            title: "Wrap Dress",
            category: "women",
            price: 54.99,
            oldPrice: 64.99,
            rating: 4.7,
            reviews: 31,
            image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1373&q=80",
            badge: "Bestseller",
            colors: ["navy", "red", "black"],
            sizes: ["S", "M", "L"]
        },
        {
            id: 13,
            title: "Aviator Sunglasses",
            category: "accessories",
            price: 34.99,
            oldPrice: 44.99,
            rating: 4.5,
            reviews: 29,
            image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
            badge: "Trending",
            colors: ["gold", "silver", "black"],
            sizes: ["One Size"]
        },
        
        {
            id: 15,
            title: "Knit Cardigan",
            category: "women",
            price: 59.99,
            oldPrice: 79.99,
            rating: 4.6,
            reviews: 26,
            image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
            badge: "Cozy",
            colors: ["cream", "gray", "pink"],
            sizes: ["XS", "S", "M", "L"]
        },
        {
            id: 16,
            title: "Canvas Backpack",
            category: "accessories",
            price: 45.99,
            oldPrice: 55.99,
            rating: 4.8,
            reviews: 38,
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            badge: "Student Favorite",
            colors: ["beige", "black", "navy"],
            sizes: ["One Size"]
        },
        {
            id: 17,
            title: "Tailored Blazer",
            category: "women",
            price: 99.99,
            oldPrice: 129.99,
            rating: 4.9,
            reviews: 45,
            image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
            badge: "Premium",
            colors: ["black", "navy", "gray"],
            sizes: ["S", "M", "L"]
        },
        {
            id: 18,
            title: "Cotton Polo Shirt",
            category: "men",
            price: 34.99,
            oldPrice: null,
            rating: 4.1,
            reviews: 13,
            image: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
            badge: null,
            colors: ["white", "blue", "black"],
            sizes: ["S", "M", "L", "XL"]
        },
        {
            id: 19,
            title: "Statement Necklace",
            category: "accessories",
            price: 29.99,
            oldPrice: 39.99,
            rating: 4.7,
            reviews: 33,
            image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            badge: "New",
            colors: ["gold", "silver"],
            sizes: ["One Size"]
        }
    ];

    // DOM Elements
    const productsGrid = document.querySelector('.products-grid');
    const filterSidebar = document.getElementById('filter-sidebar');
    const filterToggle = document.getElementById('filter-toggle');
    const closeFilters = document.getElementById('close-filters');
    const sortSelect = document.getElementById('sort');
    const priceRange = document.getElementById('price-range');
    const priceMax = document.getElementById('price-max');
    const cartIcon = document.querySelector('.cart-icon');
    const cartCount = document.querySelector('.cart-count');
    const cartModal = document.getElementById('cart-modal');
    const closeCart = document.getElementById('close-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.total-price');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const sizeButtons = document.querySelectorAll('.size-btn');
    const colorButtons = document.querySelectorAll('.color-btn');
    const categoryCheckboxes = document.querySelectorAll('.filter-list input[type="checkbox"]');
    const applyFiltersBtn = document.querySelector('.apply-filters');
    const resetFiltersBtn = document.querySelector('.reset-filters');

    // Cart state
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Initialize the page
    renderProducts(products);
    updateCartCount();

    // Event Listeners
    filterToggle.addEventListener('click', toggleFilterSidebar);
    closeFilters.addEventListener('click', toggleFilterSidebar);
    sortSelect.addEventListener('change', sortProducts);
    priceRange.addEventListener('input', updatePriceRange);
    cartIcon.addEventListener('click', toggleCartModal);
    closeCart.addEventListener('click', toggleCartModal);
    checkoutBtn.addEventListener('click', checkout);
    applyFiltersBtn.addEventListener('click', applyFilters);
    resetFiltersBtn.addEventListener('click', resetFilters);

    // Size and color filter buttons
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            sizeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    colorButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            colorButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Functions
    function renderProducts(productsToRender) {
        productsGrid.innerHTML = '';
        
        if (productsToRender.length === 0) {
            productsGrid.innerHTML = '<p class="no-products">No products match your filters.</p>';
            return;
        }
        
        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            let badgeHTML = '';
            if (product.badge) {
                badgeHTML = `<span class="product-badge">${product.badge}</span>`;
            }
            
            let oldPriceHTML = '';
            if (product.oldPrice) {
                oldPriceHTML = `<span class="old-price">€${product.oldPrice.toFixed(2)}</span>`;
            }
            
            productCard.innerHTML = `
                ${badgeHTML}
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-content">
                    <span class="product-category">${product.category === 'men' ? 'Men' : product.category === 'women' ? 'Women' : 'Accessories'}</span>
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-price">
                        <span class="current-price">€${product.price.toFixed(2)}</span>
                        ${oldPriceHTML}
                    </div>
                    <div class="product-rating">
                        ${generateStarRating(product.rating)}
                        <span>(${product.reviews})</span>
                    </div>
                    <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            
            productsGrid.appendChild(productCard);
        });
        
        // Add event listeners to the new "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    function generateStarRating(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }

    function toggleFilterSidebar() {
        filterSidebar.classList.toggle('active');
    }

    function sortProducts() {
        const sortValue = sortSelect.value;
        let sortedProducts = [...products];
        
        switch (sortValue) {
            case 'price-low':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'name-desc':
                sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case 'newest':
                // Assuming newer products have higher IDs
                sortedProducts.sort((a, b) => b.id - a.id);
                break;
            default:
                // Default sorting (original order)
                break;
        }
        
        renderProducts(sortedProducts);
    }

    function updatePriceRange() {
        const maxPrice = priceRange.value;
        priceMax.textContent = `€${maxPrice}`;
    }

    function addToCart(e) {
        const productId = parseInt(e.target.dataset.id);
        const product = products.find(p => p.id === productId);
        
        // Check if product is already in cart
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        // Update cart in localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count
        updateCartCount();
        
        // Show feedback
        e.target.textContent = 'Added to Cart';
        e.target.style.backgroundColor = 'var(--success)';
        
        setTimeout(() => {
            e.target.textContent = 'Add to Cart';
            e.target.style.backgroundColor = 'var(--primary)';
        }, 2000);
    }

    function updateCartCount() {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = count;
    }

    function toggleCartModal() {
        cartModal.classList.toggle('active');
        
        if (cartModal.classList.contains('active')) {
            renderCartItems();
        }
    }

    function renderCartItems() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-bag"></i>
                    <p>Your cart is empty</p>
                    <a href="index.html" class="btn">Continue Shopping</a>
                </div>
            `;
            cartTotal.textContent = '€0.00';
            return;
        }
        
        let cartHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            total += item.price * item.quantity;
            
            cartHTML += `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.title}</h4>
                        <p class="cart-item-price">€${item.price.toFixed(2)}</p>
                        <div class="cart-item-actions">
                            <div class="quantity-control">
                                <button class="quantity-btn minus">-</button>
                                <input type="text" class="quantity-value" value="${item.quantity}" readonly>
                                <button class="quantity-btn plus">+</button>
                            </div>
                            <button class="remove-item">Remove</button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        cartItemsContainer.innerHTML = cartHTML;
        cartTotal.textContent = `€${total.toFixed(2)}`;
        
        // Add event listeners to quantity buttons
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', updateQuantity);
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', removeItem);
        });
    }

    function updateQuantity(e) {
        const cartItem = e.target.closest('.cart-item');
        const productId = parseInt(cartItem.dataset.id);
        const quantityInput = cartItem.querySelector('.quantity-value');
        let quantity = parseInt(quantityInput.value);
        
        if (e.target.classList.contains('plus')) {
            quantity += 1;
        } else if (e.target.classList.contains('minus') && quantity > 1) {
            quantity -= 1;
        }
        
        // Update cart
        const itemIndex = cart.findIndex(item => item.id === productId);
        if (itemIndex !== -1) {
            cart[itemIndex].quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCartItems();
            updateCartCount();
        }
    }

    function removeItem(e) {
        const cartItem = e.target.closest('.cart-item');
        const productId = parseInt(cartItem.dataset.id);
        
        // Remove from cart
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        renderCartItems();
        updateCartCount();
    }

    function checkout() {
        alert('Checkout functionality would be implemented here!');
        // In a real implementation, this would redirect to a checkout page
    }

    function applyFilters() {
        const maxPrice = parseInt(priceRange.value);
        const selectedSize = document.querySelector('.size-btn.active').dataset.size;
        const selectedColor = document.querySelector('.color-btn.active').dataset.color;
        
        // Get selected categories
        const selectedCategories = [];
        categoryCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedCategories.push(checkbox.id.replace('category-', ''));
            }
        });
        
        // Filter products
        let filteredProducts = products.filter(product => {
            // Price filter
            if (product.price > maxPrice) return false;
            
            // Category filter
            if (!selectedCategories.includes(product.category)) return false;
            
            // Size filter (skip if product doesn't have sizes or is One Size)
            if (product.sizes[0] !== 'One Size' && !product.sizes.includes(selectedSize)) return false;
            
            // Color filter
            if (!product.colors.includes(selectedColor)) return false;
            
            return true;
        });
        
        renderProducts(filteredProducts);
        toggleFilterSidebar();
    }

    function resetFilters() {
        // Reset checkboxes
        categoryCheckboxes.forEach(checkbox => {
            checkbox.checked = true;
        });
        
        // Reset price range
        priceRange.value = 200;
        priceMax.textContent = '€200';
        
        // Reset size and color
        sizeButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector('.size-btn[data-size="M"]').classList.add('active');
        
        colorButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector('.color-btn[data-color="red"]').classList.add('active');
        
        // Reset sort
        sortSelect.value = 'default';
        
        // Render all products
        renderProducts(products);
    }
});



