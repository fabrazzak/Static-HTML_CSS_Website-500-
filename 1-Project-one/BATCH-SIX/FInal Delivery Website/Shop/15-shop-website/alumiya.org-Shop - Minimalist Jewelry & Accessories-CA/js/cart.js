
// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Cart Functionality
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.querySelector('.close-cart');
const cartCounter = document.getElementById('cartCounter');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalElement = document.querySelector('.cart-total');
const proceedCheckoutBtn = document.querySelector('.proceed-checkout');
const backToCartBtn = document.querySelector('.back-to-cart');
const checkoutForm = document.querySelector('.checkout-form');
const cartItemsSection = document.querySelector('.cart-items-section');
const thankYouMessage = document.querySelector('.thank-you-message');
const checkoutFormElement = document.getElementById('checkoutForm');

let cart = JSON.parse(localStorage.getItem('alumiya-cart')) || [];

// Initialize cart
function initCart() {
    updateCartCounter();
    renderCartItems();
}

// Update cart counter
function updateCartCounter() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCounter.textContent = totalItems;
    document.querySelector('.cart-count-num').textContent = totalItems;
}

// Render cart items
function renderCartItems() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
        cartTotalElement.innerHTML = '';
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = parseFloat(item.price.replace('$', '')) * item.quantity;
        total += itemTotal;
        
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">${item.price} x ${item.quantity}</p>
                <p class="cart-item-remove" data-index="${index}">Remove</p>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    cartTotalElement.innerHTML = `<p>Total: $${total.toFixed(2)}</p>`;
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            removeFromCart(index);
        });
    });
}

// Add to cart
function addToCart(productId) {
    const productCards = document.querySelectorAll('.product-card');
    let productToAdd = null;
    
    productCards.forEach(card => {
        if (card.getAttribute('data-id') === productId) {
            const name = card.querySelector('h3').textContent;
            const price = card.querySelector('.product-price').textContent;
            const image = card.querySelector('img').src;
            
            productToAdd = {
                id: productId,
                name: name,
                price: price,
                image: image,
                quantity: 1
            };
        }
    });
    
    if (productToAdd) {
        // Check if product already exists in cart
        const existingItemIndex = cart.findIndex(item => item.id === productId);
        
        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push(productToAdd);
        }
        
        // Save to localStorage
        localStorage.setItem('alumiya-cart', JSON.stringify(cart));
        
        // Update UI
        updateCartCounter();
        renderCartItems();
        
        // Show notification
        showNotification('Item added to cart!');
    }
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('alumiya-cart', JSON.stringify(cart));
    updateCartCounter();
    renderCartItems();
    showNotification('Item removed from cart');
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = 'var(--secondary-color)';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '4px';
    notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    notification.style.zIndex = '1000';
    notification.style.animation = 'fadeIn 0.3s ease';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Cart sidebar toggle
cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
});

// Proceed to checkout
proceedCheckoutBtn.addEventListener('click', () => {
    cartItemsSection.style.display = 'none';
    checkoutForm.style.display = 'block';
});

// Back to cart
backToCartBtn.addEventListener('click', () => {
    cartItemsSection.style.display = 'block';
    checkoutForm.style.display = 'none';
});

// Handle checkout form submission
checkoutFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // In a real implementation, you would process the order here
    // For this example, we'll just show the thank you message
    
    checkoutForm.style.display = 'none';
    thankYouMessage.style.display = 'block';
    
    // Clear the cart
    cart = [];
    localStorage.setItem('alumiya-cart', JSON.stringify(cart));
    updateCartCounter();
    
    // After 5 seconds, close the cart and reset
    setTimeout(() => {
        cartSidebar.classList.remove('active');
        setTimeout(() => {
            thankYouMessage.style.display = 'none';
            cartItemsSection.style.display = 'block';
        }, 300);
    }, 5000);
});

// Add to cart button event listeners
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = e.target.closest('.product-card').getAttribute('data-id');
        addToCart(productId);
    });
});

// Blog Modal Functionality
const blogModal = document.getElementById('blogModal');
const blogModalContent = document.getElementById('blogModalContent');
const closeModal = document.querySelector('.close-modal');

document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const blogCard = e.target.closest('.blog-card');
        const blogId = blogCard.getAttribute('data-blog');
        const blogImage = blogCard.querySelector('.blog-image img').src;
        const blogTitle = blogCard.querySelector('h3').textContent;
        const blogDate = blogCard.querySelector('.blog-date').textContent;
        
        // In a real implementation, you would fetch the full blog content here
        // For this example, we'll use the same image and create placeholder content
        const content = `
            <div class="blog-image" style="height: 400px;">
                <img src="${blogImage}" alt="${blogTitle}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="blog-content" style="padding: 30px;">
                <p class="blog-date">${blogDate}</p>
                <h3>${blogTitle}</h3>
                <div class="blog-full-content">
                    <p>This is the full content of the blog post about ${blogTitle.toLowerCase()}. In a real implementation, this would be fetched from a database or CMS.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.</p>
                    <p>Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere.</p>
                    <p>Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet.</p>
                </div>
            </div>
        `;
        
        blogModalContent.innerHTML = content;
        blogModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

closeModal.addEventListener('click', () => {
    blogModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === blogModal) {
        blogModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Newsletter form submission
document.getElementById('newsletterForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = e.target.querySelector('input[type="email"]');
    showNotification('Thank you for subscribing!');
    emailInput.value = '';
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initCart();
    
    // Add animation styles for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(20px); }
        }
    `;
    document.head.appendChild(style);
});
