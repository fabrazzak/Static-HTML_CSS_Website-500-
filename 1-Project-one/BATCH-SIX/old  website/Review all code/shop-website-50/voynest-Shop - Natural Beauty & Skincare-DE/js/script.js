
// Product data
const products = {
    1: {
        id: 1,
        title: "Upcycled Denim Jacket",
        price: 68.00,
        category: "Jackets",
        image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "This unique denim jacket has been upcycled from vintage jeans, giving it a one-of-a-kind look. Each jacket features hand-stitched details and carefully placed distressing for a perfectly worn-in feel."
    },
    2: {
        id: 2,
        title: "Vintage Floral Dress",
        price: 54.00,
        category: "Dresses",
        image: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "A beautiful vintage floral dress from the 1970s, carefully restored to its original beauty. The dress features a flattering A-line silhouette, puffed sleeves, and a delicate floral print."
    },
    3: {
        id: 3,
        title: "Upcycled Cable Knit Sweater",
        price: 62.00,
        category: "Sweaters",
        image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "This cozy cable knit sweater has been upcycled from vintage wool, maintaining its original charm while being reinforced for modern wear. The classic cream color and timeless cable pattern make it a versatile piece."
    },
    4: {
        id: 4,
        title: "Vintage Leather Crossbody",
        price: 78.00,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        description: "This genuine leather crossbody bag from the 1960s has been lovingly restored while maintaining its vintage character. The rich brown leather has developed a beautiful patina over time."
    }
};

// Cart functionality
let cart = [];
const cartCountElement = document.querySelector('.cart-count');
const cartItemsElement = document.querySelector('.cart-items');
const cartTotalElement = document.querySelector('.cart-total-amount');

// Initialize the cart from localStorage if available
if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    updateCartCount();
}

// Update cart count in header
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalItems;
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart popup content
function updateCartPopup() {
    if (cart.length === 0) {
        cartItemsElement.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-bag"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        cartTotalElement.textContent = '$0.00';
        return;
    }

    let cartHTML = '';
    let total = 0;

    cart.forEach(item => {
        const product = products[item.id];
        const itemTotal = product.price * item.quantity;
        total += itemTotal;

        cartHTML += `
            <div class="cart-item" data-id="${product.id}">
                <div class="cart-item-img">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${product.title}</h4>
                    <div class="cart-item-price">$${product.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="decrease-quantity">-</button>
                        <input type="number" value="${item.quantity}" min="1">
                        <button class="increase-quantity">+</button>
                    </div>
                    <div class="cart-item-remove">Remove</div>
                </div>
            </div>
        `;
    });

    cartItemsElement.innerHTML = cartHTML;
    cartTotalElement.textContent = `$${total.toFixed(2)}`;

    // Add event listeners to quantity buttons in cart
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = parseInt(this.closest('.cart-item').getAttribute('data-id'));
            updateCartItemQuantity(itemId, -1);
        });
    });

    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = parseInt(this.closest('.cart-item').getAttribute('data-id'));
            updateCartItemQuantity(itemId, 1);
        });
    });

    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = parseInt(this.closest('.cart-item').getAttribute('data-id'));
            removeFromCart(itemId);
        });
    });
}

// Add to cart function
function addToCart(productId, quantity = 1) {
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            quantity: quantity
        });
    }

    updateCartCount();
    updateCartPopup();
}

// Update cart item quantity
function updateCartItemQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartCount();
            updateCartPopup();
        }
    }
}

// Remove from cart function
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    updateCartPopup();
}

// Blog Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all read more buttons
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    
    // Add click event to each button
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const postId = this.getAttribute('data-id');
            const popup = document.getElementById(`popup-${postId}`);
            
            // Show the corresponding popup
            popup.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Quick View buttons
    document.querySelectorAll('.quick-view').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const popup = document.getElementById(`product-popup-${productId}`);
            
            // Show the corresponding popup
            popup.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Add to cart buttons on product cards
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
            
            // Show a quick notification
            const notification = document.createElement('div');
            notification.style.position = 'fixed';
            notification.style.bottom = '20px';
            notification.style.right = '20px';
            notification.style.backgroundColor = 'var(--primary)';
            notification.style.color = 'white';
            notification.style.padding = '10px 20px';
            notification.style.borderRadius = '5px';
            notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
            notification.style.zIndex = '1000';
            notification.style.transition = 'all 0.3s ease';
            notification.textContent = 'Item added to cart!';
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 2000);
        });
    });
    
    // Add to cart buttons in product popups
    document.querySelectorAll('.add-to-cart-popup').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const popup = this.closest('.product-popup');
            const quantity = parseInt(popup.querySelector('input[type="number"]').value);
            
            addToCart(productId, quantity);
            
            // Close the popup
            popup.closest('.popup-overlay').classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Show a quick notification
            const notification = document.createElement('div');
            notification.style.position = 'fixed';
            notification.style.bottom = '20px';
            notification.style.right = '20px';
            notification.style.backgroundColor = 'var(--primary)';
            notification.style.color = 'white';
            notification.style.padding = '10px 20px';
            notification.style.borderRadius = '5px';
            notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
            notification.style.zIndex = '1000';
            notification.style.transition = 'all 0.3s ease';
            notification.textContent = 'Item added to cart!';
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 2000);
        });
    });
    
    // Cart icon click
    document.querySelector('.cart-icon').addEventListener('click', function(e) {
        e.preventDefault();
        const cartPopup = document.getElementById('cart-popup');
        cartPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateCartPopup();
    });
    
    // Checkout button
    document.querySelector('.checkout-btn').addEventListener('click', function() {
        const cartPopup = document.getElementById('cart-popup');
        const thankYouPopup = document.getElementById('thank-you-popup');
        
        cartPopup.classList.remove('active');
        thankYouPopup.classList.add('active');
        
        // Clear the cart
        cart = [];
        updateCartCount();
        updateCartPopup();
    });
    
    // Continue shopping button
    document.querySelector('.continue-shopping-btn').addEventListener('click', function() {
        const thankYouPopup = document.getElementById('thank-you-popup');
        thankYouPopup.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close popup when clicking close button
    document.querySelectorAll('.close-popup').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.popup-overlay').classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close popup when clicking outside content
    document.querySelectorAll('.popup-overlay').forEach(popup => {
        popup.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Quantity selectors in product popups
    document.querySelectorAll('.quantity-selector .increase').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            input.value = parseInt(input.value) + 1;
        });
    });
    
    document.querySelectorAll('.quantity-selector .decrease').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.nextElementSibling;
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
            }
        });
    });
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }
});
