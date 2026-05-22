
document.addEventListener('DOMContentLoaded', function () {
  // Initialize cart from localStorage or empty array
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // DOM Elements
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mainNav = document.getElementById("mainNav");
  const cartCount = document.getElementById("cartCount");
  const cartIcon = document.getElementById("cartIcon");
  const cartModal = document.getElementById("cartModal");
  const closeCartModal = document.getElementById("closeCartModal");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const checkoutForm = document.getElementById("checkoutForm");
  const orderConfirmationModal = document.getElementById("orderConfirmationModal");
  const closeConfirmationModal = document.getElementById("closeConfirmationModal");

  // Check if there's cart data in localStorage and show modal if true
  function checkCartOnLoad() {
    if (cart.length > 0) {
      updateCartDisplay();
      cartModal.style.display = "block";
      document.body.style.overflow = "hidden";
    }
  }

  // Call this function when page loads
  

  // Mobile Menu Toggle
  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener("click", () => {
      mainNav.classList.toggle("active");
    });
  }

  // Update cart count in navbar
  function updateCartCount() {
    if (cartCount) {
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      cartCount.textContent = totalItems;
    }
  }

  // Update cart display in modal
  function updateCartDisplay() {
    if (!cartItems) return;

    if (cart.length === 0) {
      cartItems.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
    } else {
      cartItems.innerHTML = "";
      cart.forEach((item) => {
        const cartItemElement = document.createElement("div");
        cartItemElement.className = "cart-item";
        cartItemElement.innerHTML = `
          <div class="cart-item-info">
            <div class="cart-item-image">
              <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
              <h4>${item.name}</h4>
              <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            </div>
          </div>
          <div class="cart-item-quantity">
            <button class="quantity-btn decrease" data-id="${item.id}">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-btn increase" data-id="${item.id}">+</button>
          </div>
        `;
        cartItems.appendChild(cartItemElement);
      });

      // Add event listeners to quantity buttons
      document.querySelectorAll(".decrease").forEach((button) => {
        button.addEventListener("click", () => {
          const id = button.getAttribute("data-id");
          const item = cart.find((item) => item.id === id);

          if (item.quantity > 1) {
            item.quantity -= 1;
          } else {
            cart = cart.filter((item) => item.id !== id);
          }

          updateCart();
        });
      });

      document.querySelectorAll(".increase").forEach((button) => {
        button.addEventListener("click", () => {
          const id = button.getAttribute("data-id");
          const item = cart.find((item) => item.id === id);
          item.quantity += 1;
          updateCart();
        });
      });
    }

    // Update cart total
    if (cartTotal) {
      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      cartTotal.textContent = `$${total.toFixed(2)}`;
    }
  }

  // Update cart and save to localStorage
  function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
  }

  // Add to cart function
  function addToCart(id, name, price, image, openModal = true) {
    // Check if item already exists in cart
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id,
        name,
        price,
        image,
        quantity: 1,
      });
    }

    updateCart();

    // Optionally open the cart modal
    if (openModal && cartModal) {
      cartModal.style.display = "block";
      document.body.style.overflow = "hidden";
    }
  }

  // Update cart count on page load
  updateCartCount();

  // Cart modal functionality
  if (cartIcon && cartModal) {
    cartIcon.addEventListener("click", () => {
      cartModal.style.display = "block";
      document.body.style.overflow = "hidden";
      checkCartOnLoad();
    });
  }

  if (closeCartModal && cartModal) {
    closeCartModal.addEventListener("click", () => {
      cartModal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  }

  // Checkout form submission
  if (checkoutForm && orderConfirmationModal) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Close cart modal
      if (cartModal) cartModal.style.display = "none";

      // Show confirmation modal
      orderConfirmationModal.style.display = "block";

      // Clear the cart
      cart = [];
      updateCart();

      // Reset form
      checkoutForm.reset();
    });
  }

  // Close confirmation modal
  if (closeConfirmationModal && orderConfirmationModal) {
    closeConfirmationModal.addEventListener("click", () => {
      orderConfirmationModal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  }

  // Add event listeners to all add-to-cart buttons
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("add-to-cart") || e.target.closest(".add-to-cart")) {
      const button = e.target.classList.contains("add-to-cart")
        ? e.target
        : e.target.closest(".add-to-cart");
      const id = button.getAttribute("data-id");
      const name = button.getAttribute("data-name");
      const price = parseFloat(button.getAttribute("data-price"));
      const image = button.getAttribute("data-image");

      addToCart(id, name, price, image);

      // Visual feedback
      const originalText = button.textContent;
      button.textContent = "Added!";
      setTimeout(() => {
        button.textContent = originalText;
      }, 1000);
    }
  });

  // Close modals when clicking outside
  window.addEventListener("click", (e) => {
    if (cartModal && e.target === cartModal) {
      cartModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
    if (orderConfirmationModal && e.target === orderConfirmationModal) {
      orderConfirmationModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Blog Modal Functionality
  const blogPosts = [
    {
      id: 1,
      title: "5 Essential Drumming Techniques for Beginners",
      date: "Jan 15, 2025",
      image: "https://www.musicnotes.com/blog/content/images/now/wp-content/uploads/drumming-tips-for-beginners-blog.png",
      excerpt: "Learn the foundational techniques every new drummer should master to build solid skills from the start.",
      content: `
        <h3>5 Essential Drumming Techniques for Beginners</h3>
        <p>Drumming is an exciting journey, and mastering these fundamental techniques will set you on the right path:</p>
        <ol>
          <li><strong>Proper Grip:</strong> Learn the matched grip or traditional grip to hold your drumsticks correctly.</li>
          <li><strong>Basic Rudiments:</strong> Start with single stroke rolls, double stroke rolls, and paradiddles.</li>
          <li><strong>Foot Control:</strong> Develop independence between your hands and feet with basic bass drum patterns.</li>
          <li><strong>Timing Practice:</strong> Always play with a metronome to develop solid timing.</li>
          <li><strong>Dynamic Control:</strong> Practice playing at different volumes to add expression to your playing.</li>
        </ol>
        <p>Remember, consistency is key. Practice these techniques daily for best results!</p>
      `
    },
    {
      id: 2,
      title: "Setting Up Your First Home Recording Studio",
      date: "Feb 03, 2025",
      image: "https://www.m4music.com/image/catalog/Blog%20Images/104789-large.jpg",
      excerpt: "A complete guide to assembling a budget-friendly home studio that delivers professional results.",
      content: `
        <h3>Setting Up Your First Home Recording Studio</h3>
        <p>Creating a home studio doesn't have to break the bank. Here's what you need:</p>
        <h4>Essential Equipment:</h4>
        <ul>
          <li><strong>Computer:</strong> Any modern computer with sufficient RAM and processing power</li>
          <li><strong>DAW (Digital Audio Workstation):</strong> Options like Reaper, GarageBand, or FL Studio</li>
          <li><strong>Audio Interface:</strong> Focusrite Scarlett series offers great value</li>
          <li><strong>Microphone:</strong> A good condenser mic like the Audio-Technica AT2020</li>
          <li><strong>Headphones:</strong> Closed-back headphones for accurate monitoring</li>
        </ul>
        <h4>Room Treatment:</h4>
        <p>Don't overlook acoustic treatment. Even basic foam panels can dramatically improve your recordings.</p>
      `
    },
    {
      id: 3,
      title: "Guitar Maintenance 101: Keep Your Instrument in Top Shape",
      date: "Mar 22, 2025",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8Ml-JX6ePI14_TD56sfuSK8ykc8Yi8AXnIg&s",
      excerpt: "Essential tips and routines to maintain your guitar's playability and extend its lifespan.",
      content: `
        <h3>Guitar Maintenance 101: Keep Your Instrument in Top Shape</h3>
        <p>A well-maintained guitar sounds better and lasts longer. Follow these maintenance tips:</p>
        <h4>Regular Cleaning:</h4>
        <p>Wipe down your guitar after each use with a soft, dry cloth. Use specialized guitar polish occasionally.</p>
        
        <h4>String Care:</h4>
        <p>Change strings every 3-6 months (or more often if you play frequently). Wipe them down after playing.</p>
        
        <h4>Humidity Control:</h4>
        <p>Keep your guitar in a humidity-controlled environment (45-55% relative humidity is ideal).</p>
        
        <h4>Professional Setup:</h4>
        <p>Get a professional setup at least once a year to ensure optimal playability.</p>
      `
    }
  ];

  const blogModal = document.createElement("div");
  blogModal.className = "modal";
  blogModal.id = "blogModal";
  blogModal.innerHTML = `
    <div class="modal-content" style="max-width: 800px;">
      <div class="modal-header">
        <h3 id="blogModalTitle"></h3>
        <span class="close-modal" id="closeBlogModal">&times;</span>
      </div>
      <div class="modal-body" id="blogModalContent">
        <div class="blog-modal-image-container">
          <img id="blogModalImage" src="" alt="" style="max-width: 100%; border-radius: 8px; margin-bottom: 20px;">
          <p id="blogModalDate" style="color: #777; font-size: 0.9rem; margin-bottom: 20px;"></p>
        </div>
        <div id="blogModalBody"></div>
      </div>
    </div>
  `;
  document.body.appendChild(blogModal);

  const closeBlogModal = document.getElementById("closeBlogModal");

  closeBlogModal.addEventListener("click", () => {
    blogModal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  // Add event listeners to blog "Read More" buttons
  document.querySelectorAll(".blog-card .btn").forEach((button, index) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const post = blogPosts[index];

      // Populate modal with blog content
      document.getElementById("blogModalTitle").textContent = post.title;
      document.getElementById("blogModalImage").src = post.image;
      document.getElementById("blogModalImage").alt = post.title;
      document.getElementById("blogModalDate").textContent = post.date;
      document.getElementById("blogModalBody").innerHTML = post.content;

      // Show modal
      blogModal.style.display = "block";
      document.body.style.overflow = "hidden";
    });
  });

  // Close blog modal when clicking outside
  window.addEventListener("click", (e) => {
    if (blogModal && e.target === blogModal) {
      blogModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
});
  