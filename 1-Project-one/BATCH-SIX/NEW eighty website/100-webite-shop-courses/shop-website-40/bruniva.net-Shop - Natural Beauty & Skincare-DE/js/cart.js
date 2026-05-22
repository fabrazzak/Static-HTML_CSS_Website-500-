// cart.js

// Cart Class to manage cart functionality
class Cart {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem("bruniva-cart")) || [];
    this.init();
  }

  init() {
    // Initialize cart count on page load
    this.updateCartCount();

    // Set up event listeners if elements exist on the page
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Cart icon click
    document.addEventListener("click", (e) => {
      if (e.target.closest("#cart-icon")) {
        e.preventDefault();
        this.openCartModal();
      }
    });

    // Close cart modal
    if (document.getElementById("close-cart-modal")) {
      document
        .getElementById("close-cart-modal")
        .addEventListener("click", () => {
          this.closeCartModal();
        });
    }

    // Checkout button
    if (document.getElementById("checkout-btn")) {
      document.getElementById("checkout-btn").addEventListener("click", () => {
        this.openCheckoutModal();
      });
    }

    // Close checkout modal
    if (document.getElementById("close-checkout-modal")) {
      document
        .getElementById("close-checkout-modal")
        .addEventListener("click", () => {
          this.closeCheckoutModal();
        });
    }

    // Checkout form submission
    if (document.getElementById("checkout-form")) {
      document
        .getElementById("checkout-form")
        .addEventListener("submit", (e) => {
          this.handleCheckout(e);
        });
    }

    // Close modals when clicking outside
    window.addEventListener("click", (e) => {
      if (e.target === document.getElementById("cart-modal")) {
        this.closeCartModal();
      }
      if (e.target === document.getElementById("checkout-modal")) {
        this.closeCheckoutModal();
      }
      if (e.target === document.getElementById("order-confirmation-modal")) {
        this.closeOrderConfirmationModal();
      }
    });

    // Update cart when navigating back/forward
    window.addEventListener("popstate", () => {
      this.updateCart();
    });
  }

  // Add item to cart
  addToCart(productId, quantity = 1, productData = null) {
    let product;

    // If productData is provided, use it (for pages without the full products object)
    if (productData) {
      product = {
        id: productId,
        name: productData.name,
        price: productData.price,
        image: productData.image,
      };
    } else {
      // Otherwise try to find in products object (for shop page)
      product = window.products?.[productId];
    }

    if (!product) {
      console.error("Product not found");
      return;
    }

    const existingItem = this.cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
      });
    }

    this.updateCart();
    this.openCartModal();
  }

  // Update cart display and localStorage
  updateCart() {
    // Save to localStorage
    localStorage.setItem("bruniva-cart", JSON.stringify(this.cart));

    // Update cart count in header
    this.updateCartCount();

    // Update cart modal if it exists on this page
    if (document.getElementById("cart-items")) {
      this.updateCartModal();
    }
  }

  // Update cart count in header
  updateCartCount() {
    const totalItems = this.cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const cartItemCountElements = document.querySelectorAll(".cart-count");

    // Update all cart count elements (in case there are multiple)
    cartItemCountElements.forEach((element) => {
      element.textContent = totalItems;
    });

    const cartItemCountText = document.getElementById("cart-item-count");
    if (cartItemCountText) {
      cartItemCountText.textContent = `${totalItems} ${
        totalItems === 1 ? "item" : "items"
      }`;
    }
  }

  // Update cart modal content
  updateCartModal() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalPrice = document.getElementById("cart-total-price");

    if (!cartItemsContainer) return;

    if (this.cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="empty-cart-message">
          <p>Your cart is currently empty.</p>
        </div>
      `;
    } else {
      cartItemsContainer.innerHTML = this.cart
        .map(
          (item) => `
            <div class="cart-item" data-id="${item.id}">
              <div class="cart-item-img">
                <img src="${item.image}" alt="${item.name}">
              </div>
              <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-quantity">
                  <button class="quantity-btn decrease-btn">-</button>
                  <input type="text" class="quantity-input" value="${
                    item.quantity
                  }" readonly>
                  <button class="quantity-btn increase-btn">+</button>
                </div>
              </div>
              <div class="cart-item-remove">
                <i class="fas fa-times"></i>
              </div>
            </div>
          `
        )
        .join("");

      // Add event listeners to quantity buttons
      document.querySelectorAll(".decrease-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const itemId = parseInt(e.target.closest(".cart-item").dataset.id);
          const item = this.cart.find((item) => item.id === itemId);

          if (item.quantity > 1) {
            item.quantity -= 1;
          } else {
            this.cart = this.cart.filter((item) => item.id !== itemId);
          }

          this.updateCart();
        });
      });

      document.querySelectorAll(".increase-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const itemId = parseInt(e.target.closest(".cart-item").dataset.id);
          const item = this.cart.find((item) => item.id === itemId);
          item.quantity += 1;
          this.updateCart();
        });
      });

      // Add event listeners to remove buttons
      document.querySelectorAll(".cart-item-remove").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const itemId = parseInt(e.target.closest(".cart-item").dataset.id);
          this.cart = this.cart.filter((item) => item.id !== itemId);
          this.updateCart();
        });
      });
    }

    // Update total price
    const totalPrice = this.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    if (cartTotalPrice) {
      cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
    }
  }

  // Modal control methods
  openCartModal() {
    // Ensure cart is updated before opening
    this.updateCart();
    document.getElementById("cart-modal").style.display = "block";
    document.body.style.overflow = "hidden";
  }

  closeCartModal() {
    document.getElementById("cart-modal").style.display = "none";
    document.body.style.overflow = "auto";
  }

  openCheckoutModal() {
    if (this.cart.length === 0) return;
    this.closeCartModal();
    document.getElementById("checkout-modal").style.display = "block";
  }

  closeCheckoutModal() {
    document.getElementById("checkout-modal").style.display = "none";
    document.body.style.overflow = "auto";
  }

  closeOrderConfirmationModal() {
    document.getElementById("order-confirmation-modal").style.display = "none";
    document.body.style.overflow = "auto";
  }

  // Handle checkout form submission
  handleCheckout(e) {
    e.preventDefault();

    // In a real application, you would send this data to your server
    console.log("Order submitted:", {
      customer: {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
      },
      items: this.cart,
      total: this.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    });

    // Show confirmation
    this.closeCheckoutModal();
    document.getElementById("order-confirmation-modal").style.display = "block";

    // Clear cart only after successful checkout
    this.cart = [];
    localStorage.removeItem("bruniva-cart");
    this.updateCart();

    // Reset form
    e.target.reset();

    // Redirect after 5 seconds
    setTimeout(() => {
      this.closeOrderConfirmationModal();
      window.location.href = "/shop/";
    }, 5000);
  }
}

// Initialize cart when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Check if cart already exists in window
  if (!window.brunivaCart) {
    window.brunivaCart = new Cart();
  } else {
    // If it exists, just update it
    window.brunivaCart.updateCart();
  }

  // Make addToCart available globally
  window.addToCart = (productId, quantity = 1, productData = null) => {
    window.brunivaCart.addToCart(productId, quantity, productData);
  };
});

// Also update cart when page is shown (for browser back/forward)
window.addEventListener("pageshow", () => {
  if (window.brunivaCart) {
    window.brunivaCart.updateCart();
  }
});
