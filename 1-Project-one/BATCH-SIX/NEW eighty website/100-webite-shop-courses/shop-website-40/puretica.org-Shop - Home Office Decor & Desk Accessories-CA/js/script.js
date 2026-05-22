
// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');

mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    mobileMenuBtn.innerHTML = mainNav.classList.contains('active') ?
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Cart functionality with localStorage
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const cartCountElement = document.querySelector('.cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartPopup = document.getElementById('cartPopup');
const cartIcon = document.querySelector('.cart-icon');

// Initialize cart count from localStorage
updateCartCount();

// Add to cart functionality
addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const productCard = button.closest('.product-card');
        const productTitle = productCard.querySelector('.product-title').textContent;
        const productPrice = parseFloat(productCard.querySelector('.product-price').textContent.replace('$', ''));
        const productImage = productCard.querySelector('.product-image img').src;

        const product = {
            id: Date.now() + index, // Unique ID for each product
            title: productTitle,
            price: productPrice,
            image: productImage,
            quantity: 1
        };

        // Check if product already exists in cart
        const existingItem = cartItems.find(item => item.title === product.title);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push(product);
        }

        // Save to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartCount();

        // Animation for visual feedback
        button.textContent = 'Added!';
        button.style.backgroundColor = '#2ecc71';

        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.style.backgroundColor = '#4a6fa5';
        }, 1000);
    });
});

// Update cart count
function updateCartCount() {
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalItems;
}

// Cart popup functionality
cartIcon.addEventListener('click', () => {
    openCartPopup();
});

function openCartPopup() {
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartTotalElement = document.getElementById('cartTotal');

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
        cartTotalElement.textContent = '0.00';
    } else {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cartItems.forEach((item, index) => {
            total += item.price * item.quantity;

            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
        <div class="cart-item-image">
            <img src="${item.image}" alt="${item.title}">
        </div>
        <div class="cart-item-details">
            <h4 class="cart-item-title">${item.title}</h4>
            <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
        </div>
        <div class="cart-item-quantity">
            <button class="decrease-quantity" data-index="${index}">-</button>
            <span>${item.quantity}</span>
            <button class="increase-quantity" data-index="${index}">+</button>
        </div>
        <div class="cart-item-remove" data-index="${index}">
            <i class="fas fa-times"></i>
        </div>
    `;

            cartItemsContainer.appendChild(cartItemElement);
        });

        cartTotalElement.textContent = total.toFixed(2);

        // Add event listeners for quantity buttons
        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                updateQuantity(index, -1);
            });
        });

        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                updateQuantity(index, 1);
            });
        });

        // Add event listeners for remove buttons
        document.querySelectorAll('.cart-item-remove').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.currentTarget.getAttribute('data-index');
                removeItem(index);
            });
        });
    }

    cartPopup.style.display = 'block';
}

function updateQuantity(index, change) {
    const item = cartItems[index];
    item.quantity += change;

    if (item.quantity < 1) {
        cartItems.splice(index, 1);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
    openCartPopup();
}

function removeItem(index) {
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
    openCartPopup();
}

// Proceed to checkout button
document.getElementById('proceedBtn').addEventListener('click', () => {
    if (cartItems.length === 0) {
        alert('Your cart is empty. Please add items before proceeding.');
        return;
    }

    cartPopup.style.display = 'none';
    document.getElementById('checkoutModal').style.display = 'block';
});

// Checkout form submission
document.getElementById('checkoutForm').addEventListener('submit', (e) => {
    e.preventDefault();

    // In a real implementation, you would process the order here
    const name = document.getElementById('name').value;

    // Save order to localStorage (for demo purposes)
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push({
        id: Date.now(),
        name: name,
        items: cartItems,
        total: parseFloat(document.getElementById('cartTotal').textContent),
        date: new Date().toISOString()
    });
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    cartItems = [];
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();

    // Show confirmation
    document.getElementById('checkoutModal').style.display = 'none';
    document.getElementById('orderConfirmation').style.display = 'block';

    // Reset form
    document.getElementById('checkoutForm').reset();
});

// Continue shopping button
document.getElementById('continueShoppingBtn').addEventListener('click', () => {
    document.getElementById('orderConfirmation').style.display = 'none';
});

// Modal functionality
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.modal-close');

// Close modals when clicking X
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
    });
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
    }
});

// Blog posts data
const blogPosts = [
    {
        id: 1,
        title: "5 Tips for a Minimalist Workspace",
        date: "Jan 15, 2025",
        image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
        content: `
    <h3>5 Tips for a Minimalist Workspace</h3>
    <p class="blog-date">Jan 15, 2025</p>
    <img src="https://images.unsplash.com/photo-1517502884422-41eaead166d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80" alt="Minimalist Workspace" style="width:100%; max-height:300px; object-fit:cover; margin-bottom:20px;">
    <p>Creating a minimalist workspace can significantly improve your focus and productivity. Here are five essential tips:</p>
    <ol>
        <li><strong>Declutter regularly</strong> - Keep only what you need on your desk. A clean space leads to a clear mind.</li>
        <li><strong>Choose multi-functional furniture</strong> - Opt for pieces that serve multiple purposes to reduce items.</li>
        <li><strong>Limit decorations</strong> - Select a few meaningful items rather than many distracting ones.</li>
        <li><strong>Use neutral colors</strong> - Soft, neutral tones create a calm environment that's easy on the eyes.</li>
        <li><strong>Implement smart storage</strong> - Use organizers to keep essentials out of sight but within reach.</li>
    </ol>
    <p>Remember, minimalism isn't about deprivation—it's about creating space for what truly matters in your work life.</p>
`
    },
    {
        id: 2,
        title: "The Ultimate Ergonomic Setup",
        date: "Feb 03, 2025",
        image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
        content: `
    <h3>The Ultimate Ergonomic Setup</h3>
    <p class="blog-date">Feb 03, 2025</p>
    <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80" alt="Ergonomic Workspace" style="width:100%; max-height:300px; object-fit:cover; margin-bottom:20px;">
    <p>An ergonomic workspace is essential for long-term health and productivity. Here's how to create the perfect setup:</p>
    <h4>1. Chair Selection</h4>
    <p>Choose a chair with lumbar support that allows your feet to rest flat on the floor with knees at a 90-degree angle.</p>
    <h4>2. Monitor Position</h4>
    <p>Position your monitor so the top is at or slightly below eye level, about an arm's length away.</p>
    <h4>3. Keyboard and Mouse</h4>
    <p>Keep your keyboard and mouse at a height where your elbows form a 90-110 degree angle.</p>
    <h4>4. Lighting</h4>
    <p>Use adjustable lighting to reduce glare and eye strain. Natural light is ideal when possible.</p>
    <h4>5. Movement</h4>
    <p>Incorporate standing or walking breaks every 30-60 minutes to promote circulation.</p>
    <p>Investing in ergonomics now can prevent chronic pain and improve your work performance in the long run.</p>
`
    },
    {
        id: 3,
        title: "Best Plants for Your Home Office",
        date: "Mar 22, 2025",
        image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        content: `
    <h3>Best Plants for Your Home Office</h3>
    <p class="blog-date">Mar 22, 2025</p>
    <img src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Office Plants" style="width:100%; max-height:300px; object-fit:cover; margin-bottom:20px;">
    <p>Adding plants to your home office can improve air quality, reduce stress, and boost productivity. Here are the best options:</p>
    <h4>1. Snake Plant (Sansevieria)</h4>
    <p>Thrives in low light and requires minimal watering. Excellent for air purification.</p>
    <h4>2. ZZ Plant (Zamioculcas zamiifolia)</h4>
    <p>Nearly indestructible and tolerates low light and irregular watering.</p>
    <h4>3. Pothos (Epipremnum aureum)</h4>
    <p>Fast-growing vine that's easy to care for and helps remove toxins from the air.</p>
    <h4>4. Peace Lily (Spathiphyllum)</h4>
    <p>Beautiful flowering plant that indicates when it needs water by drooping slightly.</p>
    <h4>5. Spider Plant (Chlorophytum comosum)</h4>
    <p>Produces oxygen while purifying the air of harmful substances like formaldehyde.</p>
    <p>Remember to choose plants based on your office's light conditions and your ability to care for them. Even one or two plants can make a significant difference in your workspace environment.</p>
`
    }
];

// Set up blog read more buttons
const readMoreButtons = document.querySelectorAll('.read-more-btn');
readMoreButtons.forEach(button => {
    button.addEventListener('click', () => {
        const blogId = parseInt(button.getAttribute('data-blog-id'));
        openBlogModal(blogId);
    });
});

function openBlogModal(blogId) {
    const blogPost = blogPosts.find(post => post.id === blogId);
    if (blogPost) {
        document.getElementById('blogModalBody').innerHTML = blogPost.content;
        document.getElementById('blogModal').style.display = 'block';
    }
}

// Newsletter form submission
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;

        // Save email to localStorage
        let subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers')) || [];
        subscribers.push(email);
        localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));

        alert(`Thank you for subscribing with ${email}! You'll hear from us soon.`);
        newsletterForm.reset();
    });
}
