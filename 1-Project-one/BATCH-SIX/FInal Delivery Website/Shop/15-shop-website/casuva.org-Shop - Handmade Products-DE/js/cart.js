// Product Data
const products = [
  {
    id: 1,
    name: "Artisan Ceramic Mug",
    category: "ceramics",
    price: 28.0,
    originalPrice: 35.0,
    image:      "https://roaniris.co/cdn/shop/products/artisan-mug-natural1_720x.jpg?v=1695585399",
    badge: "Bestseller",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Handwoven Storage Basket",
    category: "textiles",
    price: 45.0,
    image:
      "https://images-cdn.ubuy.com.sa/63c0e4897716981e3e782e43-storageworks-handwoven-storage-baskets.jpg",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Walnut Cutting Board",
    category: "woodwork",
    price: 65.0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz-3NX0eNNFskGm3ono8tDS6LrFj4wisyyxQ&s",
    badge: "New",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Natural Soap Collection",
    category: "bath",
    price: 32.0,
    image:
      "https://cdn.shopify.com/s/files/1/1198/8002/files/Complete-Slow-North-Soap-Collection-1_1024x1024.jpg?v=1687451198",
    rating: 4.7,
  },
  {
    id: 5,
    name: "Handcrafted Beaded Necklace",
    category: "jewelry",
    price: 58.0,
    originalPrice: 75.0,
    image:
      "https://img.theloom.in/pwa/catalog/product/cache/2226fcc140c013a71062820e2d717b92/a/u/aurjw03aure2_1_.jpg",
    rating: 4.6,
  },
  {
    id: 6,
    name: "Scented Soy Candle",
    category: "home",
    price: 24.0,
    image:
      "https://www.thebotanicalcandleco.co.uk/cdn/shop/files/P5280462_VSCO_1380x.jpg?v=1717000719",
    badge: "Limited",
    rating: 4.4,
  },
  {
    id: 7,
    name: "Hand-Painted Ceramic Bowl",
    category: "ceramics",
    price: 38.0,
    image:
      "https://res.cloudinary.com/tienda-com/image/upload/f_auto/q_auto/dpr_2.0/v1/products/CM-47",
    rating: 4.7,
  },
  {
    id: 8,
    name: "Macrame Wall Hanging",
    category: "textiles",
    price: 85.0,
    originalPrice: 110.0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB9n0uU65dCl-0HbFl4NQfGOliPwHj0tTHyg&s",
    badge: "Popular",
    rating: 4.9,
  },
  {
    id: 9,
    name: "Wooden Serving Tray",
    category: "woodwork",
    price: 72.0,
    image:
      "https://m.media-amazon.com/images/I/81WJXfATwbL._AC_SL1500_.jpg",
    rating: 4.8,
  },
  {
    id: 10,
    name: "Organic Cotton Throw Blanket",
    category: "textiles",
    price: 95.0,
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    badge: "New",
    rating: 5.0,
  },
  {
    id: 11,
    name: "Hand-Forged Copper Earrings",
    category: "jewelry",
    price: 42.0,
    image:
      "https://silverandearth.indiemade.com/sites/silverandearth.indiemade.com/files/styles/product_image/public/products/textured%20copper%20earrings%20with%20stamped%20pattern%204.jpg?itok=8e2w_y22",
    rating: 4.6,
  },
  {
    id: 12,
    name: "Ceramic Plant Pot Set",
    category: "ceramics",
    price: 55.0,
    originalPrice: 70.0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2VuvBEPoCVR4v4qxu2RswqWeCCqNX3d_olw&s",
    badge: "Bestseller",
    rating: 4.8,
  },
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem("casuvaCart")) || [];
const cartIcon = document.getElementById("cartIcon");
const cartCount = document.getElementById("cartCount");
const cartPopup = document.getElementById("cartPopup");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartSummary = document.getElementById("cartSummary");
const cartActions = document.getElementById("cartActions");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartTotal = document.getElementById("cartTotal");
const overlay = document.getElementById("overlay");
const proceedToCheckout = document.getElementById("proceedToCheckout");
const checkoutPopup = document.getElementById("checkoutPopup");
const closeCheckout = document.getElementById("closeCheckout");
const checkoutForm = document.getElementById("checkoutForm");
const confirmationPopup = document.getElementById("confirmationPopup");
const closeConfirmation = document.getElementById("closeConfirmation");
const productsGrid = document.getElementById("productsGrid");

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  updateCart();
  setupEventListeners();

  if (productsGrid) {
    renderProducts();
  }
});

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("casuvaCart", JSON.stringify(cart));
}

// Render products to the page
function renderProducts() {
  if (!productsGrid) return;

  productsGrid.innerHTML = "";
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    let badge = "";
    if (product.badge) {
      badge = `<span class="product-badge">${product.badge}</span>`;
    }

    let originalPrice = "";
    if (product.originalPrice) {
      originalPrice = `<span class="original-price">$${product.originalPrice.toFixed(
        2
      )}</span>`;
    }

    productCard.innerHTML = `
      ${badge}
      <div class="product-img">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-info">
        <span class="product-category">${getCategoryName(
          product.category
        )}</span>
        <h3>${product.name}</h3>
        <div class="product-price">
          <span class="current-price">$${product.price.toFixed(2)}</span>
          ${originalPrice}
        </div>
        <div class="product-actions">
          <button class="add-to-cart" data-id="${product.id}" data-name="${
      product.name
    }" data-price="${product.price}" data-image="${
      product.image
    }">Add to Cart</button>
          <button class="wishlist-btn"><i class="far fa-heart"></i></button>
        </div>
      </div>
    `;

    productsGrid.appendChild(productCard);
  });
}

// Get category name for display
function getCategoryName(category) {
  const categories = {
    ceramics: "Ceramics",
    textiles: "Textiles",
    woodwork: "Woodwork",
    jewelry: "Jewelry",
    bath: "Bath & Body",
    home: "Home Decor",
  };
  return categories[category] || category;
}

// Set up event listeners
function setupEventListeners() {
  // Cart icon click
  if (cartIcon) {
    cartIcon.addEventListener("click", toggleCart);
  }

  // Close cart
  if (closeCart) {
    closeCart.addEventListener("click", toggleCart);
  }

  // Overlay click
  if (overlay) {
    overlay.addEventListener("click", () => {
      if (cartPopup && cartPopup.classList.contains("active")) {
        toggleCart();
      }
      if (checkoutPopup && checkoutPopup.classList.contains("active")) {
        toggleCheckout();
      }
      if (confirmationPopup && confirmationPopup.classList.contains("active")) {
        toggleConfirmation();
      }
    });
  }

  // Add to cart buttons
  document.addEventListener("click", function (e) {
    if (
      e.target.classList.contains("add-to-cart") ||
      e.target.closest(".add-to-cart")
    ) {
      const button = e.target.classList.contains("add-to-cart")
        ? e.target
        : e.target.closest(".add-to-cart");
      const id = parseInt(button.getAttribute("data-id"));
      const name = button.getAttribute("data-name");
      const price = parseFloat(button.getAttribute("data-price"));
      const image = button.getAttribute("data-image");

      addToCart(id, name, price, image);
    }
  });

  // Proceed to checkout
  if (proceedToCheckout) {
    proceedToCheckout.addEventListener("click", function (e) {
      e.preventDefault();
      toggleCheckout();
    });
  }

  // Close checkout
  if (closeCheckout) {
    closeCheckout.addEventListener("click", toggleCheckout);
  }

  // Submit checkout form
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", function (e) {
      e.preventDefault();
      toggleCheckout();
      toggleConfirmation();
      clearCart();
    });
  }

  // Close confirmation
  if (closeConfirmation) {
    closeConfirmation.addEventListener("click", toggleConfirmation);
  }
}

// Add item to cart
function addToCart(id, name, price, image) {
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
  saveCart();

  // Show cart popup if it's not already open
  if (cartPopup && !cartPopup.classList.contains("active")) {
    toggleCart();
  }
}

// Update cart UI
function updateCart() {
  // Update cart count
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  if (cartCount) {
    cartCount.textContent = totalItems;
  }

  // Update cart items if cart popup exists
  if (cartItems) {
    if (cart.length === 0) {
      cartItems.innerHTML =
        '<p class="empty-cart-message">Your cart is empty</p>';
      if (cartSummary) cartSummary.style.display = "none";
      if (cartActions) cartActions.style.display = "none";
    } else {
      cartItems.innerHTML = "";
      cart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
          <div class="cart-item-img">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="cart-item-details">
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-price">$${(
              item.price * item.quantity
            ).toFixed(2)}</div>
            <div class="cart-item-quantity">
              <button class="quantity-btn minus" data-id="${item.id}">-</button>
              <input type="text" class="quantity-input" value="${
                item.quantity
              }" readonly>
              <button class="quantity-btn plus" data-id="${item.id}">+</button>
            </div>
          </div>
          <button class="remove-item" data-id="${item.id}">
            <i class="fas fa-times"></i>
          </button>
        `;
        cartItems.appendChild(cartItem);
      });

      // Add event listeners for quantity buttons
      document.querySelectorAll(".quantity-btn.minus").forEach((button) => {
        button.addEventListener("click", function () {
          const id = parseInt(this.getAttribute("data-id"));
          updateQuantity(id, -1);
        });
      });

      document.querySelectorAll(".quantity-btn.plus").forEach((button) => {
        button.addEventListener("click", function () {
          const id = parseInt(this.getAttribute("data-id"));
          updateQuantity(id, 1);
        });
      });

      // Add event listeners for remove buttons
      document.querySelectorAll(".remove-item").forEach((button) => {
        button.addEventListener("click", function () {
          const id = parseInt(this.getAttribute("data-id"));
          removeFromCart(id);
        });
      });

      // Update summary
      const subtotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      if (cartSubtotal) cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
      if (cartTotal) cartTotal.textContent = `$${subtotal.toFixed(2)}`;

      if (cartSummary) cartSummary.style.display = "block";
      if (cartActions) cartActions.style.display = "flex";
    }
  }
}

// Update item quantity
function updateQuantity(id, change) {
  const item = cart.find((item) => item.id === id);
  if (item) {
    item.quantity += change;

    if (item.quantity <= 0) {
      removeFromCart(id);
    } else {
      updateCart();
      saveCart();
    }
  }
}

// Remove item from cart
function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
  saveCart();
}

// Clear cart
function clearCart() {
  cart = [];
  updateCart();
  saveCart();
}

// Toggle cart popup
function toggleCart() {
  if (cartPopup) {
    cartPopup.classList.toggle("active");
    overlay.classList.toggle("active");
  }
}

// Toggle checkout popup
function toggleCheckout() {
  if (checkoutPopup) {
    checkoutPopup.classList.toggle("active");
    overlay.classList.toggle("active");

    if (cartPopup && cartPopup.classList.contains("active")) {
      toggleCart();
    }
  }
}

// Toggle confirmation popup
function toggleConfirmation() {
  if (confirmationPopup) {
    confirmationPopup.classList.toggle("active");
    overlay.classList.toggle("active");
  }
}

// Mobile menu functionality
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const overlay = document.querySelector(".overlay");

  function toggleMenu() {
    if (navLinks && overlay) {
      navLinks.classList.toggle("active");
      overlay.classList.toggle("active");
      document.body.style.overflow = navLinks.classList.contains("active")
        ? "hidden"
        : "auto";
    }
  }

  if (hamburger) {
    hamburger.addEventListener("click", toggleMenu);
  }

  if (overlay) {
    overlay.addEventListener("click", toggleMenu);
  }

  // Close menu when clicking on a nav link
  const links = document.querySelectorAll(".nav-links a");
  links.forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks && navLinks.classList.contains("active")) {
        toggleMenu();
      }
    });
  });

  // Handle resize to reset menu state when switching between mobile and desktop
  window.addEventListener("resize", function () {
    if (
      window.innerWidth > 768 &&
      navLinks &&
      navLinks.classList.contains("active")
    ) {
      navLinks.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
});
