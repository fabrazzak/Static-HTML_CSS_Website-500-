
// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM elements
const cartIcon = document.getElementById('cartIcon');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const closeCartModal = document.getElementById('closeCartModal');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartTotal = document.getElementById('cartTotal');
const continueShopping = document.getElementById('continueShopping');
const proceedCheckout = document.getElementById('proceedCheckout');
const checkoutModal = document.getElementById('checkoutModal');
const closeCheckoutModal = document.getElementById('closeCheckoutModal');
const checkoutForm = document.getElementById('checkoutForm');
const confirmationModal = document.getElementById('confirmationModal');
const closeConfirmationModal = document.getElementById('closeConfirmationModal');
const backToShop = document.getElementById('backToShop');
const blogModal = document.getElementById('blogModal');
const closeBlogModal = document.getElementById('closeBlogModal');
const blogModalContent = document.getElementById('blogModalContent');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedProducts();
    loadBlogPosts();
    updateCartCount();
    
    // Event listeners
    cartIcon.addEventListener('click', openCartModal);
    closeCartModal.addEventListener('click', closeModal);
    continueShopping.addEventListener('click', closeModal);
    proceedCheckout.addEventListener('click', openCheckoutModal);
    closeCheckoutModal.addEventListener('click', closeModal);
    checkoutForm.addEventListener('submit', placeOrder);
    closeConfirmationModal.addEventListener('click', closeModal);
    backToShop.addEventListener('click', function() {
        closeModal();
        window.location.href = '/shop/';
    });
    closeBlogModal.addEventListener('click', closeModal);
    
    // Close modal when clicking outside content
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal();
        }
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            alert(`Thank you for subscribing with ${email}! You'll receive our newsletter soon.`);
            this.reset();
        });
    }
});

// Load featured products
function loadFeaturedProducts() {
    const productsContainer = document.getElementById('featuredProducts');
    
    featuredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-img">
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Load blog posts
function loadBlogPosts() {
    const blogContainer = document.getElementById('blogPosts');
    
    blogPosts.forEach(post => {
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card';
        blogCard.innerHTML = `
            <img src="${post.image}" alt="${post.title}" class="blog-img">
            <div class="blog-content">
                <p class="blog-date">${post.date}</p>
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <button class="btn btn-outline" onclick="openBlogModal(${post.id})">Read More</button>
            </div>
        `;
        blogContainer.appendChild(blogCard);
    });
}

// Cart functions
function addToCart(productId) {
    const product = featuredProducts.find(p => p.id === productId);
    if (product) {
        // Check if product already in cart
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            const productCopy = {...product};
            productCopy.quantity = 1;
            cart.push(productCopy);
        }
        
        saveCartToStorage();
        updateCartCount();
        updateCartModal();
        
      
    }
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = (item.quantity || 1) + change;
        
        if (item.quantity < 1) {
            removeFromCart(productId);
        } else {
            saveCartToStorage();
            updateCartCount();
            updateCartModal();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartCount();
    updateCartModal();
}

function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    cartCount.textContent = totalItems;
}

function updateCartModal() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        proceedCheckout.disabled = true;
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * (item.quantity || 1);
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-item-img">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.title}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span class="cart-item-qty">${item.quantity || 1}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <div class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    cartTotal.textContent = total.toFixed(2);
    proceedCheckout.disabled = false;
}

// Modal functions
function openCartModal() {
    updateCartModal();
    cartModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function openCheckoutModal() {
    cartModal.style.display = 'none';
    checkoutModal.style.display = 'block';
}

function openBlogModal(postId) {
    const post = blogPosts.find(p => p.id === postId);
    if (post) {
        blogModalContent.innerHTML = post.content;
        blogModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

// Order functions
function placeOrder(e) {
    e.preventDefault();
    
    // In a real application, you would send this data to your server
    const orderData = {
        customer: {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value
        },
        items: cart,
        total: parseFloat(cartTotal.textContent),
        date: new Date().toISOString()
    };
    
    // Clear the cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Close checkout modal and show confirmation
    checkoutModal.style.display = 'none';
    confirmationModal.style.display = 'block';
    
    // Reset form
    checkoutForm.reset();
}

// Make functions available globally
window.addToCart = addToCart;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.openBlogModal = openBlogModal;