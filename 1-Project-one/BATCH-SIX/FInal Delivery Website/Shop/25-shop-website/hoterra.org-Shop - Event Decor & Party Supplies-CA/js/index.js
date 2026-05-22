// cart.js
document.addEventListener("DOMContentLoaded", function () {
  // Initialize cart from localStorage or create empty array
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // DOM elements
  const cartIcon = document.getElementById("cartIcon");
  const cartCount = document.querySelector(".cart-count");
  const cartModal = document.getElementById("cartModal");
  const closeCartModal = document.getElementById("closeCartModal");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const checkoutModal = document.getElementById("checkoutModal");
  const closeCheckoutModal = document.getElementById("closeCheckoutModal");
  const orderConfirmationModal = document.getElementById(
    "orderConfirmationModal"
  );
  const continueShoppingBtn = document.getElementById("continueShoppingBtn");
  const checkoutForm = document.getElementById("checkoutForm");

  // Products data - should match both pages
  const products = [
    {
      id: 1,
      name: "Wedding Decor Package",
      price: 499,
      image:
        "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 2,
      name: "Birthday Party Package",
      price: 199,
      image:
        "https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 3,
      name: "Corporate Event Package",
      price: 799,
      image:
        "https://images.unsplash.com/photo-1540317580384-e5d500436cd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80",
    },
    {
      id: 4,
      name: "Baby Shower Decor Package",
      price: 299,
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 5,
      name: "Anniversary Decor Package",
      price: 349,
      image:
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 6,
      name: "Graduation Party Package",
      price: 249,
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  // Update cart in localStorage
  function updateLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Update cart count display
  function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCount) {
      cartCount.textContent = count;
      cartCount.style.display = count > 0 ? "flex" : "none";
    }
  }

  // Update cart items display
  function updateCartDisplay() {
    if (!cartItems) return;

    if (cart.length === 0) {
      cartItems.innerHTML =
        '<p class="empty-cart-message">Your cart is currently empty.</p>';
      if (cartTotal) cartTotal.innerHTML = "<h3>Total: $0.00</h3>";
      if (checkoutBtn) checkoutBtn.style.display = "none";
      return;
    }

    if (checkoutBtn) checkoutBtn.style.display = "block";

    let itemsHTML = "";
    let total = 0;

    cart.forEach((item) => {
      const product = products.find((p) => p.id === item.id);
      if (product) {
        const itemTotal = product.price * item.quantity;
        total += itemTotal;

        itemsHTML += `
            <div class="cart-item">
              <div class="cart-item-image">
                <img src="${product.image}" alt="${product.name}">
              </div>
              <div class="cart-item-details">
                <h4>${product.name}</h4>
                <p>$${product.price.toFixed(2)} x ${item.quantity}</p>
              </div>
              <div class="cart-item-total">
                <p>$${itemTotal.toFixed(2)}</p>
                <button class="remove-item" data-id="${item.id}">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          `;
      }
    });

    cartItems.innerHTML = itemsHTML;
    if (cartTotal) cartTotal.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;

    // Add event listeners to remove buttons
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = parseInt(e.currentTarget.getAttribute("data-id"));
        removeFromCart(id);
      });
    });
  }

  // Add to cart function (can be called from any page)
  window.addToCart = function (productId, quantity = 1) {
    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: productId,
        quantity: quantity,
      });
    }

    updateLocalStorage();
    updateCartCount();

    // Show added to cart animation
    if (cartIcon) {
      cartIcon.classList.add("animate");
      setTimeout(() => {
        cartIcon.classList.remove("animate");
      }, 500);
    }
  };

  // Remove from cart function
  function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    updateLocalStorage();
    updateCartCount();
    updateCartDisplay();
  }

  // Open product modal function (can be called from any page)
  window.openProductModal = function (productId) {
    const product = products.find((p) => p.id === productId);
    const productModal = document.getElementById("productModal");
    const productModalContent = document.getElementById("productModalContent");

    if (!product || !productModal || !productModalContent) return;

    const productContent = `
        <div class="product-details-container">
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="product-info">
            <h2>${product.name}</h2>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <div class="product-description">
              <p>${getProductDescription(productId)}</p>
            </div>
            <div class="product-features">
              <h4>Package Includes:</h4>
              <ul>
                ${getProductFeatures(productId)}
              </ul>
            </div>
            <div class="product-actions">
              <button class="btn" onclick="addToCart(${
                product.id
              }); document.getElementById('productModal').style.display='none';">Add to Cart</button>
              <button class="btn btn-outline" onclick="window.location.href='/contact/'">Custom Order</button>
            </div>
          </div>
        </div>
      `;

    productModalContent.innerHTML = productContent;
    productModal.style.display = "block";
  };

  // Helper function to get product descriptions
  function getProductDescription(id) {
    const descriptions = {
      1: "Our premium wedding decor package includes everything you need to transform your venue into a romantic paradise. Perfect for couples who want elegant, stress-free decor that wows their guests.",
      2: "Make birthday celebrations extra special with our themed party packages. Choose from popular themes or customize your own for a unique celebration that guests will remember.",
      3: "Impress clients and employees with our professional corporate event decor. Designed to reflect your brand while creating a sophisticated atmosphere for any business occasion.",
      4: "Celebrate the upcoming arrival of your little one with our adorable baby shower decor. Gender-neutral options available, with customizable color schemes to match your theme.",
      5: "Honor years of love and commitment with our romantic anniversary decor. Perfect for milestone celebrations or intimate vow renewals with family and friends.",
      6: "Celebrate academic achievements in style with our graduation party decor. Customizable with school colors and personal touches to honor the graduate.",
    };

    return (
      descriptions[id] ||
      "Premium event decor package. Please contact us for more details."
    );
  }

  // Helper function to get product features
  function getProductFeatures(id) {
    const features = {
      1: `
          <li>Ceremony backdrop & aisle decorations</li>
          <li>Reception centerpieces</li>
          <li>Sweetheart table decor</li>
          <li>Hanging installations</li>
          <li>Custom color schemes</li>
        `,
      2: `
          <li>Tableware for 20 guests</li>
          <li>Hanging decorations</li>
          <li>Photo backdrop</li>
          <li>Balloon arrangements</li>
          <li>Themed props</li>
        `,
      3: `
          <li>Branded signage</li>
          <li>Stage backdrop</li>
          <li>Table centerpieces</li>
          <li>Lounge area styling</li>
          <li>Registration table decor</li>
        `,
      4: `
          <li>Gender-themed decorations</li>
          <li>Diaper cake centerpiece</li>
          <li>Photo booth backdrop</li>
          <li>Balloon garlands</li>
          <li>Table settings</li>
        `,
      5: `
          <li>Elegant table settings</li>
          <li>Floral arrangements</li>
          <li>Lighting solutions</li>
          <li>Personalized signage</li>
          <li>Photo display setups</li>
        `,
      6: `
          <li>School color-themed decor</li>
          <li>Diploma display centerpiece</li>
          <li>Photo backdrop</li>
          <li>Balloon arches</li>
          <li>Custom signage</li>
        `,
    };

    return features[id] || "";
  }

  // Event listeners
  if (cartIcon) {
    cartIcon.addEventListener("click", () => {
      updateCartDisplay();
      if (cartModal) cartModal.style.display = "block";
    });
  }

  if (closeCartModal) {
    closeCartModal.addEventListener("click", () => {
      if (cartModal) cartModal.style.display = "none";
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cartModal) cartModal.style.display = "none";
      if (checkoutModal) checkoutModal.style.display = "block";
    });
  }

  if (closeCheckoutModal) {
    closeCheckoutModal.addEventListener("click", () => {
      if (checkoutModal) checkoutModal.style.display = "none";
    });
  }

  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener("click", () => {
      if (orderConfirmationModal) orderConfirmationModal.style.display = "none";
      window.location.href = "/";
    });
  }

  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Generate random order number
      const orderNumberEl = document.getElementById("orderNumber");
      if (orderNumberEl) {
        orderNumberEl.textContent = Math.floor(10000 + Math.random() * 90000);
      }

      if (checkoutModal) checkoutModal.style.display = "none";
      if (orderConfirmationModal)
        orderConfirmationModal.style.display = "block";

      // Clear cart
      cart = [];
      updateLocalStorage();
      updateCartCount();

      // Reset form
      checkoutForm.reset();

      // Automatically redirect after 5 seconds
      setTimeout(() => {
        if (orderConfirmationModal)
          orderConfirmationModal.style.display = "none";
        window.location.href = "/services/";
      }, 5000);
    });
  }

  // Close modals when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === cartModal) {
      cartModal.style.display = "none";
    }
    if (e.target === checkoutModal) {
      checkoutModal.style.display = "none";
    }
    if (e.target === orderConfirmationModal) {
      orderConfirmationModal.style.display = "none";
    }
    const productModal = document.getElementById("productModal");
    if (productModal && e.target === productModal) {
      productModal.style.display = "none";
    }
  });

  // Initialize cart count on page load
  updateCartCount();
});
