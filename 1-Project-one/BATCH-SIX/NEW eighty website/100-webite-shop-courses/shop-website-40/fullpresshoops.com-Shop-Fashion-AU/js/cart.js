// cart.js - Shared cart functionality for all pages

// Mobile Menu Toggle - Keep this if needed for both pages
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mainNav = document.getElementById("main-nav");

if (mobileMenuBtn && mainNav) {
  mobileMenuBtn.addEventListener("click", () => {
    mainNav.classList.toggle("active");
    mobileMenuBtn.innerHTML = mainNav.classList.contains("active")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll("nav ul li a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mainNav.classList.contains("active")) {
        mainNav.classList.remove("active");
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  });
}

// Shopping Cart Functionality
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Initialize cart elements that exist on both pages
const cartIcon = document.getElementById("cart-icon");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalPrice = document.getElementById("cart-total-price");
const cartActions = document.querySelector(".cart-actions");
const cartTotal = document.querySelector(".cart-total");
const closeModalButtons = document.querySelectorAll(".close-modal");
const checkoutModal = document.getElementById("checkout-modal");
const confirmationModal = document.getElementById("confirmation-modal");
const placeOrderBtn = document.getElementById("place-order-btn");

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Update cart display
function updateCart() {
  // Update cart count
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  if (document.querySelector(".cart-count")) {
    document.querySelector(".cart-count").textContent = cartCount;
  }

  // Update cart items if cart modal elements exist
  if (cartItemsContainer) {
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
                <div class="empty-cart-message" style="padding: 40px; text-align: center;">
                    <i class="fas fa-shopping-bag" style="font-size: 3rem; color: #ddd; margin-bottom: 20px;"></i>
                    <h3>Your cart is empty</h3>
                    <p>Start shopping to add items to your cart</p>
                </div>
            `;
      if (cartTotal) cartTotal.style.display = "none";
      if (cartActions) cartActions.style.display = "none";
    } else {
      cartItemsContainer.innerHTML = "";
      cart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn decrease" data-id="${
                              item.id
                            }">-</button>
                            <input type="text" class="quantity-input" value="${
                              item.quantity
                            }" readonly>
                            <button class="quantity-btn increase" data-id="${
                              item.id
                            }">+</button>
                            <span class="remove-item" data-id="${
                              item.id
                            }"><i class="fas fa-trash"></i></span>
                        </div>
                    </div>
                `;
        cartItemsContainer.appendChild(cartItem);
      });

      // Calculate total
      const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      if (cartTotalPrice) cartTotalPrice.textContent = `$${total.toFixed(2)}`;
      if (cartTotal) cartTotal.style.display = "flex";
      if (cartActions) cartActions.style.display = "flex";
    }

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
        saveCart();
      });
    });

    document.querySelectorAll(".increase").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        const item = cart.find((item) => item.id === id);
        item.quantity += 1;
        updateCart();
        saveCart();
      });
    });

    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        cart = cart.filter((item) => item.id !== id);
        updateCart();
        saveCart();
      });
    });
  }
}

// Add to Cart functionality - works for both pages
document.addEventListener("DOMContentLoaded", () => {
  // Initialize cart display
  updateCart();

  // Handle add to cart buttons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const product = {
        id: button.getAttribute("data-id"),
        name: button.getAttribute("data-name"),
        price: parseFloat(button.getAttribute("data-price")),
        image: button.getAttribute("data-image"),
        quantity: 1,
      };

      // Check if product already in cart
      const existingItem = cart.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push(product);
      }

      updateCart();
      saveCart();

      // Show cart modal if it exists
      if (cartModal) {
        cartModal.style.display = "block";
      }

      // Add animation to cart icon
      if (cartIcon) {
        cartIcon.classList.add("animate");
        setTimeout(() => {
          cartIcon.classList.remove("animate");
        }, 500);
      }
    });
  });

  // Open cart modal when clicking cart icon
  if (cartIcon) {
    cartIcon.addEventListener("click", () => {
      if (cartModal) {
        cartModal.style.display = "block";
      }
    });
  }

  // Close modal when clicking X
  if (closeModalButtons) {
    closeModalButtons.forEach((button) => {
      button.addEventListener("click", () => {
        if (cartModal) cartModal.style.display = "none";
        if (checkoutModal) checkoutModal.style.display = "none";
        if (confirmationModal) confirmationModal.style.display = "none";
        const quickviewModal = document.getElementById("quickview-modal");
        if (quickviewModal) quickviewModal.style.display = "none";
        const blogModal = document.getElementById("blog-modal");
        if (blogModal) blogModal.style.display = "none";
      });
    });
  }

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (cartModal && e.target === cartModal) {
      cartModal.style.display = "none";
    }
    if (checkoutModal && e.target === checkoutModal) {
      checkoutModal.style.display = "none";
    }
    if (confirmationModal && e.target === confirmationModal) {
      confirmationModal.style.display = "none";
    }
    const quickviewModal = document.getElementById("quickview-modal");
    if (quickviewModal && e.target === quickviewModal) {
      quickviewModal.style.display = "none";
    }
    const blogModal = document.getElementById("blog-modal");
    if (blogModal && e.target === blogModal) {
      blogModal.style.display = "none";
    }
  });

  // Checkout button
  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn && checkoutModal) {
    checkoutBtn.addEventListener("click", () => {
      if (cartModal) cartModal.style.display = "none";
      checkoutModal.style.display = "block";
    });
  }

  // Place order button
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", () => {
      // In a real implementation, you would send the order data to your server here
      // For this demo, we'll just show the confirmation

      if (checkoutModal) checkoutModal.style.display = "none";
      if (confirmationModal) confirmationModal.style.display = "block";

      // Clear the cart
      cart = [];
      updateCart();
      saveCart();

      // Redirect after 5 seconds
      setTimeout(() => {
        if (confirmationModal) confirmationModal.style.display = "none";
        window.location.href = "/shop/";
      }, 5000);
    });
  }

  // Mobile filter sidebar toggle (shop page only)
  const mobileFilterBtn = document.getElementById("mobile-filter-btn");
  const shopSidebar = document.getElementById("shop-sidebar");
  const sidebarOverlay = document.getElementById("sidebar-overlay");
  const closeSidebar = document.getElementById("close-sidebar");

  if (mobileFilterBtn && shopSidebar && sidebarOverlay) {
    mobileFilterBtn.addEventListener("click", () => {
      shopSidebar.classList.add("active");
      sidebarOverlay.classList.add("active");
    });
  }

  if (closeSidebar && shopSidebar && sidebarOverlay) {
    closeSidebar.addEventListener("click", () => {
      shopSidebar.classList.remove("active");
      sidebarOverlay.classList.remove("active");
    });
  }

  if (sidebarOverlay && shopSidebar) {
    sidebarOverlay.addEventListener("click", () => {
      shopSidebar.classList.remove("active");
      sidebarOverlay.classList.remove("active");
    });
  }

  // Category tabs (shop page only)
  const categoryTabs = document.querySelectorAll(".category-tab");
  if (categoryTabs.length > 0) {
    categoryTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        categoryTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
      });
    });
  }

  // Size options (shop page only)
  const sizeOptions = document.querySelectorAll(".size-option");
  if (sizeOptions.length > 0) {
    sizeOptions.forEach((option) => {
      option.addEventListener("click", () => {
        sizeOptions.forEach((o) => o.classList.remove("selected"));
        option.classList.add("selected");
      });
    });
  }

  // Quick view size options (shop page only)
  const quickviewSizes = document.querySelectorAll(".quickview-size");
  if (quickviewSizes.length > 0) {
    quickviewSizes.forEach((size) => {
      size.addEventListener("click", () => {
        quickviewSizes.forEach((s) => s.classList.remove("selected"));
        size.classList.add("selected");
      });
    });
  }

  // Widget toggle (shop page only)
  const widgetTitles = document.querySelectorAll(".widget-title");
  if (widgetTitles.length > 0) {
    widgetTitles.forEach((title) => {
      title.addEventListener("click", () => {
        title.classList.toggle("collapsed");
        const content = title.nextElementSibling;
        content.classList.toggle("collapsed");
      });
    });
  }

  // Quick view functionality (shop page only)
  const productCards = document.querySelectorAll(".product-card");
  const quickviewModal = document.getElementById("quickview-modal");

  if (productCards.length > 0 && quickviewModal) {
    productCards.forEach((card) => {
      card.addEventListener("click", (e) => {
        // Don't open quick view if clicking on buttons
        if (
          e.target.closest(".add-to-cart") ||
          e.target.closest(".wishlist-btn")
        ) {
          return;
        }

        // In a real implementation, you would fetch product details based on the clicked product
        // For this demo, we'll just show the modal with placeholder content
        quickviewModal.style.display = "block";
      });
    });
  }

  // Thumbnail click in quick view (shop page only)
  const thumbnails = document.querySelectorAll(".thumbnail");
  const mainImage = document.querySelector(".main-image img");

  if (thumbnails.length > 0 && mainImage) {
    thumbnails.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        mainImage.src = thumb.querySelector("img").src;
      });
    });
  }

  // Quantity controls in quick view (shop page only)
  const quantityInput = document.querySelector(".quickview-quantity input");
  const decreaseBtn = document.querySelector(".quickview-quantity .decrease");
  const increaseBtn = document.querySelector(".quickview-quantity .increase");

  if (decreaseBtn && quantityInput) {
    decreaseBtn.addEventListener("click", () => {
      let value = parseInt(quantityInput.value);
      if (value > 1) {
        quantityInput.value = value - 1;
      }
    });
  }

  if (increaseBtn && quantityInput) {
    increaseBtn.addEventListener("click", () => {
      let value = parseInt(quantityInput.value);
      quantityInput.value = value + 1;
    });
  }
});
