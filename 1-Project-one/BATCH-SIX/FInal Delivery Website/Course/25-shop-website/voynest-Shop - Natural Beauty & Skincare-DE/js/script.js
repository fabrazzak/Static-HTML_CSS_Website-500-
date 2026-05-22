// Cart functionality
class Cart {
  constructor() {
    this.cart = [];
    this.init();
  }

  init() {
    // Load cart from localStorage
    if (localStorage.getItem("cart")) {
      this.cart = JSON.parse(localStorage.getItem("cart"));
    }

    // Update cart count on page load
    this.updateCartCount();

    // Set up event listeners
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Cart icon click
    document.querySelector(".cart-icon")?.addEventListener("click", (e) => {
      e.preventDefault();
      this.openCart();
    });

    // Close popup button
    document.querySelector(".close-popup")?.addEventListener("click", () => {
      this.closeCart();
    });

    // Close popup when clicking outside
    document.getElementById("cart-popup")?.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) {
        this.closeCart();
      }
    });

    // Continue shopping button
    document
      .querySelector(".cart-actions .btn-outline")
      ?.addEventListener("click", () => {
        this.closeCart();
      });

    // Checkout button
    document.querySelector(".checkout-btn")?.addEventListener("click", () => {
      this.checkout();
    });

    // Add to cart buttons (delegated event listener)
    document.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("add-to-cart") ||
        e.target.closest(".add-to-cart")
      ) {
        const button = e.target.classList.contains("add-to-cart")
          ? e.target
          : e.target.closest(".add-to-cart");
        const productId = parseInt(button.getAttribute("data-id"));
        this.addToCart(productId);
        this.showNotification("Item added to cart!");
      }

      // Add to cart from popup
      if (
        e.target.classList.contains("add-to-cart-popup") ||
        e.target.closest(".add-to-cart-popup")
      ) {
        const button = e.target.classList.contains("add-to-cart-popup")
          ? e.target
          : e.target.closest(".add-to-cart-popup");
        const productId = parseInt(button.getAttribute("data-id"));
        const popup = button.closest(".product-popup");
        const quantity = parseInt(
          popup.querySelector('input[type="number"]').value
        );

        this.addToCart(productId, quantity);
        popup.closest(".popup-overlay").classList.remove("active");
        document.body.style.overflow = "auto";
        this.showNotification("Item added to cart!");
      }
    });
  }

  openCart() {
    document.getElementById("cart-popup").classList.add("active");
    document.body.style.overflow = "hidden";
    this.updateCartPopup();
  }

  closeCart() {
    document.getElementById("cart-popup").classList.remove("active");
    document.body.style.overflow = "auto";
  }

  updateCartCount() {
    const totalItems = this.cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const cartCountElement = document.querySelector(".cart-count");
    if (cartCountElement) {
      cartCountElement.textContent = totalItems;
    }
    this.saveToLocalStorage();
  }

  updateCartPopup() {
    const cartItemsElement = document.querySelector(".cart-items");
    const cartTotalElement = document.querySelector(".cart-total-amount");

    if (!cartItemsElement || !cartTotalElement) return;

    if (this.cart.length === 0) {
      cartItemsElement.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-bag"></i>
                    <p>Your cart is empty</p>
                </div>
            `;
      cartTotalElement.textContent = "$0.00";
      return;
    }

    let cartHTML = "";
    let total = 0;

    this.cart.forEach((item) => {
      const product = this.getProductData(item.id);
      if (!product) return;

      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      cartHTML += `
                <div class="cart-item" data-id="${product.id}">
                    <div class="cart-item-img">
                        <img src="${product.image}" alt="${product.title}">
                    </div>
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${product.title}</h4>
                        <div class="cart-item-price">$${product.price.toFixed(
                          2
                        )}</div>
                        <div class="cart-item-quantity">
                            <button class="decrease-quantity">-</button>
                            <input type="number" value="${
                              item.quantity
                            }" min="1">
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
    document.querySelectorAll(".decrease-quantity").forEach((button) => {
      button.addEventListener("click", () => {
        const itemId = parseInt(
          button.closest(".cart-item").getAttribute("data-id")
        );
        this.updateCartItemQuantity(itemId, -1);
      });
    });

    document.querySelectorAll(".increase-quantity").forEach((button) => {
      button.addEventListener("click", () => {
        const itemId = parseInt(
          button.closest(".cart-item").getAttribute("data-id")
        );
        this.updateCartItemQuantity(itemId, 1);
      });
    });

    document.querySelectorAll(".cart-item-remove").forEach((button) => {
      button.addEventListener("click", () => {
        const itemId = parseInt(
          button.closest(".cart-item").getAttribute("data-id")
        );
        this.removeFromCart(itemId);
      });
    });
  }

  getProductData(productId) {
    // This should be replaced with your actual product data source
    // For now, using a simple object - you might want to fetch this from an API
    const products = {
      1: {
        id: 1,
        title: "Upcycled Denim Jacket",
        price: 68.0,
        image:
          "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
      2: {
        id: 2,
        title: "Vintage Floral Dress",
        price: 54.0,
        image:
          "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
      3: {
        id: 3,
        title: "Upcycled Cable Knit Sweater",
        price: 62.0,
        image:
          "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
      4: {
        id: 4,
        title: "Vintage Leather Crossbody",
        price: 78.0,
        image:
          "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
      5: {
        id: 5,
        title: "Vintage Denim Jacket",
        price: 72.0,
        image:
          "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
      6: {
        id: 6,
        title: "Retro Floral Dress",
        price: 58.0,
        image:
          "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
      7: {
        id: 7,
        title: "Vintage Wool Sweater",
        price: 65.0,
        image:
          "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
      8: {
        id: 8,
        title: "Vintage Leather Tote",
        price: 85.0,
        image:
          "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
    };

    return products[productId];
  }

  addToCart(productId, quantity = 1) {
    const existingItem = this.cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({
        id: productId,
        quantity: quantity,
      });
    }

    this.updateCartCount();
    this.updateCartPopup();
  }

  updateCartItemQuantity(productId, change) {
    const item = this.cart.find((item) => item.id === productId);

    if (item) {
      item.quantity += change;

      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.updateCartCount();
        this.updateCartPopup();
      }
    }
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter((item) => item.id !== productId);
    this.updateCartCount();
    this.updateCartPopup();
  }

  checkout() {
    this.closeCart();
    this.showNotification("Thank you for your order!", true);
    this.cart = [];
    this.updateCartCount();
    this.updateCartPopup();
  }

  showNotification(message, isSuccess = false) {
    const notification = document.createElement("div");
    notification.className = "cart-notification";
    notification.style.backgroundColor = isSuccess
      ? "var(--primary)"
      : "var(--primary)";
    notification.textContent = message;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
      notification.classList.add("active");
    }, 10);

    // Hide after 2 seconds
    setTimeout(() => {
      notification.classList.remove("active");
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 2000);
  }

  saveToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }
}

// Initialize cart when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const cart = new Cart();
  window.cart = cart; // Make cart available globally if needed
});
