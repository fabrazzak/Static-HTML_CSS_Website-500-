// cart.js - Reusable Cart Module
class Cart {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
    this.initElements();
    this.bindEvents();
    this.updateCart();
  }

  initElements() {
    // Cart UI Elements
    this.cartIcon = document.querySelector(".cart-icon");
    this.cartCount = document.querySelector(".cart-count");
    this.cartModal = document.querySelector(".cart-modal");
    this.closeCart = document.querySelector(".close-cart");
    this.cartItemsContainer = document.querySelector(".cart-items");
    this.emptyCartMessage = document.querySelector(".empty-cart-message");
    this.totalPriceElement = document.querySelector(".total-price");
    this.checkoutBtn = document.querySelector(".checkout-btn");

    // Modals
    this.checkoutModal = document.getElementById("checkout-modal");
    this.confirmationModal = document.getElementById("confirmation-modal");
    this.closeModalButtons = document.querySelectorAll(".close-modal");
    this.checkoutForm = document.getElementById("checkout-form");

    // Notification Element
    this.notification = document.createElement("div");
    this.notification.className = "cart-notification";
    this.notification.innerHTML = `
      <div class="cart-notification-message">
        <i class="fas fa-check-circle"></i>
        <span class="notification-text"></span>
      </div>
    `;
    document.body.appendChild(this.notification);
  }

  bindEvents() {
    // Cart Toggle
    if (this.cartIcon) {
      this.cartIcon.addEventListener("click", () => this.toggleCart());
    }

    if (this.closeCart) {
      this.closeCart.addEventListener("click", () => this.toggleCart(false));
    }

    // Checkout Button
    if (this.checkoutBtn) {
      this.checkoutBtn.addEventListener("click", () => this.handleCheckout());
    }

    // Close Modals
    this.closeModalButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const modal = button.closest(".modal");
        this.closeModal(modal);
      });
    });

    // Outside Click to Close
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        this.closeModal(e.target);
      }
    });

    // Form Submission
    if (this.checkoutForm) {
      this.checkoutForm.addEventListener("submit", (e) =>
        this.handleFormSubmit(e)
      );
    }
  }

  toggleCart(show = null) {
    if (show === null) {
      this.cartModal.classList.toggle("active");
    } else {
      show
        ? this.cartModal.classList.add("active")
        : this.cartModal.classList.remove("active");
    }
    document.body.style.overflow = this.cartModal.classList.contains("active")
      ? "hidden"
      : "auto";
  }

  closeModal(modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  addItem(product, quantity = 1) {
    const existingItem = this.cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({
        ...product,
        quantity: quantity,
      });
    }

    this.saveCart();
    this.showNotification(`${product.name} added to cart`);
  }

  removeItem(productId) {
    this.cart = this.cart.filter((item) => item.id !== productId);
    this.saveCart();
  }

  updateItemQuantity(productId, newQuantity) {
    const item = this.cart.find((item) => item.id === productId);
    if (item) {
      item.quantity = newQuantity;
      this.saveCart();
    }
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
    this.updateCart();
  }

  updateCart() {
    // Update cart count
    const totalItems = this.cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    if (this.cartCount) {
      this.cartCount.textContent = totalItems;
    }

    // Update cart modal
    if (this.cartItemsContainer) {
      if (this.cart.length === 0) {
        if (this.emptyCartMessage)
          this.emptyCartMessage.style.display = "block";
        this.cartItemsContainer.innerHTML = "";
      } else {
        if (this.emptyCartMessage) this.emptyCartMessage.style.display = "none";

        let cartHTML = "";
        let subtotal = 0;

        this.cart.forEach((item) => {
          const itemTotal = item.price * item.quantity;
          subtotal += itemTotal;

          cartHTML += `
            <div class="cart-item" data-id="${item.id}">
              <img src="${item.image}" alt="${
            item.name
          }" class="cart-item-image">
              <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                  <button class="quantity-btn decrease">-</button>
                  <input type="text" class="quantity-input" value="${
                    item.quantity
                  }" readonly>
                  <button class="quantity-btn increase">+</button>
                </div>
                <span class="remove-item">Remove</span>
              </div>
            </div>
          `;
        });

        this.cartItemsContainer.innerHTML = cartHTML;

        // Update total price if element exists
        if (this.totalPriceElement) {
          this.totalPriceElement.textContent = `$${subtotal.toFixed(2)}`;
        }

        // Add event listeners to dynamic elements
        this.cartItemsContainer
          .querySelectorAll(".increase")
          .forEach((button) => {
            button.addEventListener("click", (e) => {
              const itemId = e.target
                .closest(".cart-item")
                .getAttribute("data-id");
              const item = this.cart.find((item) => item.id === itemId);
              this.updateItemQuantity(itemId, item.quantity + 1);
            });
          });

        this.cartItemsContainer
          .querySelectorAll(".decrease")
          .forEach((button) => {
            button.addEventListener("click", (e) => {
              const itemId = e.target
                .closest(".cart-item")
                .getAttribute("data-id");
              const item = this.cart.find((item) => item.id === itemId);
              if (item.quantity > 1) {
                this.updateItemQuantity(itemId, item.quantity - 1);
              } else {
                this.removeItem(itemId);
              }
            });
          });

        this.cartItemsContainer
          .querySelectorAll(".remove-item")
          .forEach((button) => {
            button.addEventListener("click", (e) => {
              const itemId = e.target
                .closest(".cart-item")
                .getAttribute("data-id");
              this.removeItem(itemId);
            });
          });
      }
    }
  }

  showNotification(message) {
    const notificationText =
      this.notification.querySelector(".notification-text");
    notificationText.textContent = message;

    this.notification.classList.add("show");

    setTimeout(() => {
      this.notification.classList.remove("show");
    }, 3000);
  }

  handleCheckout() {
    if (this.cart.length > 0 && this.checkoutModal) {
      this.toggleCart(false);
      this.checkoutModal.style.display = "block";
      document.body.style.overflow = "hidden";
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();

    // In a real app, you would send this data to your server
    console.log("Order submitted:", {
      customer: {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
      },
      items: this.cart,
      total: this.getCartTotal(),
    });

    // Show confirmation
    this.closeModal(this.checkoutModal);
    if (this.confirmationModal) {
      this.confirmationModal.style.display = "block";
      document.body.style.overflow = "hidden";
    }

    // Clear cart after checkout
    this.clearCart();

    // Reset form
    this.checkoutForm.reset();

    // Redirect after 5 seconds
    setTimeout(() => {
      if (this.confirmationModal) {
        this.closeModal(this.confirmationModal);
      }
      window.location.href = "/shop/";
    }, 5000);
  }

  getCartItems() {
    return this.cart;
  }

  getCartTotal() {
    return this.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}

// Initialize Cart when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const cart = new Cart();

  // Make cart instance available globally if needed
  window.VoliraCart = cart;

  // Add event listeners for "Add to Cart" buttons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const product = {
        id: button.getAttribute("data-id"),
        name: button.getAttribute("data-name"),
        price: parseFloat(button.getAttribute("data-price")),
        image: button.getAttribute("data-image"),
      };
      cart.addItem(product);
    });
  });
});
