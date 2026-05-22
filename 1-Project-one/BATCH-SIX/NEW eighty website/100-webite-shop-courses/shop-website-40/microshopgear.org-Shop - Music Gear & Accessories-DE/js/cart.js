// Cart functionality
class Cart {
  constructor() {
    this.cart = [];
    this.loadCart();
    this.initElements();
    this.setupEventListeners();
    this.updateCart();
  }

  initElements() {
    // Cart elements
    this.cartIcon = document.querySelector(".cart-icon"); // Changed to class selector
    this.cartModal = document.getElementById("cartModal");
    this.closeCart = document.getElementById("closeCart");
    this.overlay = document.getElementById("overlay");
    this.cartItems = document.getElementById("cartItems");
    this.cartTotal = document.getElementById("cartTotal");
    this.cartSubtotal = document.getElementById("cartSubtotal");
    this.cartCount = document.getElementById("cartCount");
    this.modalCartCount = document.getElementById("modalCartCount");
    this.checkoutBtn = document.getElementById("checkoutBtn");

    // Checkout elements
    this.checkoutModal = document.getElementById("checkoutModal");
    this.cancelCheckout = document.getElementById("cancelCheckout");
    this.checkoutForm = document.getElementById("checkoutForm");

    // Confirmation elements
    this.confirmationModal = document.getElementById("confirmationModal");
    this.closeConfirmation = document.getElementById("closeConfirmation");

    console.log("Cart icon element:", this.cartIcon); // Debugging line
  }

  setupEventListeners() {
    // Cart modal toggle
    if (this.cartIcon) {
      this.cartIcon.addEventListener("click", (e) => {
        e.preventDefault();
        this.toggleCart();
      });
    } else {
      console.error("Cart icon not found!");
    }

    if (this.closeCart) {
      this.closeCart.addEventListener("click", () => this.toggleCart());
    }

    if (this.overlay) {
      this.overlay.addEventListener("click", () => this.closeAllModals());
    }

    // Add to cart buttons
    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        const name = button.getAttribute("data-name");
        const price = parseFloat(button.getAttribute("data-price"));
        this.addToCart(id, name, price);
      });
    });

    // Checkout process
    if (this.checkoutBtn)
      this.checkoutBtn.addEventListener("click", () => this.openCheckout());
    if (this.cancelCheckout)
      this.cancelCheckout.addEventListener("click", () => this.closeCheckout());
    if (this.checkoutForm)
      this.checkoutForm.addEventListener("submit", (e) =>
        this.submitCheckout(e)
      );
    if (this.closeConfirmation)
      this.closeConfirmation.addEventListener("click", () =>
        this.closeConfirmationModal()
      );
  }

  loadCart() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  addToCart(id, name, price) {
    const existingItem = this.cart.find((item) => item.id === id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({
        id,
        name,
        price,
        quantity: 1,
      });
    }

    this.saveCart();
    this.updateCart();
    this.showCartNotification(name);
  }

  showCartNotification(productName) {
    const notification = document.createElement("div");
    notification.className = "cart-notification";
    notification.innerHTML = `
        <i class="fas fa-check"></i>
        <span>${productName} added to cart</span>
      `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("show");
    }, 10);

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  updateCart() {
    // Update cart count
    const totalItems = this.cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    if (this.cartCount) this.cartCount.textContent = totalItems;
    if (this.modalCartCount) this.modalCartCount.textContent = totalItems;

    // Update cart items
    if (this.cartItems) {
      if (this.cart.length === 0) {
        this.cartItems.innerHTML = `
            <div class="empty-cart">
              <i class="fas fa-shopping-cart"></i>
              <p>Your cart is empty</p>
            </div>
          `;
        if (this.cartTotal) this.cartTotal.style.display = "none";
      } else {
        this.cartItems.innerHTML = "";
        this.cart.forEach((item) => {
          const cartItem = document.createElement("div");
          cartItem.className = "cart-item";
          cartItem.innerHTML = `
              <div class="cart-item-img">
                <img src="https://via.placeholder.com/80" alt="${item.name}">
              </div>
              <div class="cart-item-details">
                <h4>${item.name}</h4>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
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
                </div>
                <div class="remove-item" data-id="${item.id}">Remove</div>
              </div>
            `;
          this.cartItems.appendChild(cartItem);
        });

        // Calculate subtotal
        const subtotal = this.cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        if (this.cartSubtotal)
          this.cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        if (this.cartTotal) this.cartTotal.style.display = "block";
      }

      // Add event listeners to quantity buttons
      document.querySelectorAll(".decrease").forEach((button) => {
        button.addEventListener("click", (e) => {
          const id = e.target.getAttribute("data-id");
          this.updateQuantity(id, -1);
        });
      });

      document.querySelectorAll(".increase").forEach((button) => {
        button.addEventListener("click", (e) => {
          const id = e.target.getAttribute("data-id");
          this.updateQuantity(id, 1);
        });
      });

      // Add event listeners to remove buttons
      document.querySelectorAll(".remove-item").forEach((button) => {
        button.addEventListener("click", (e) => {
          const id = e.target.getAttribute("data-id");
          this.removeItem(id);
        });
      });
    }
  }

  updateQuantity(id, change) {
    const item = this.cart.find((item) => item.id === id);

    if (item) {
      item.quantity += change;

      if (item.quantity <= 0) {
        this.cart = this.cart.filter((item) => item.id !== id);
      }

      this.saveCart();
      this.updateCart();
    }
  }

  removeItem(id) {
    this.cart = this.cart.filter((item) => item.id !== id);
    this.saveCart();
    this.updateCart();
  }

  toggleCart() {
    if (this.cartModal) this.cartModal.classList.toggle("active");
    if (this.overlay) this.overlay.classList.toggle("active");
  }

  openCheckout() {
    if (this.cartModal) this.cartModal.classList.remove("active");
    if (this.checkoutModal) this.checkoutModal.classList.add("active");
    if (this.overlay) this.overlay.classList.add("active");
  }

  closeCheckout() {
    if (this.checkoutModal) this.checkoutModal.classList.remove("active");
    if (this.overlay) this.overlay.classList.remove("active");
  }

  submitCheckout(e) {
    e.preventDefault();

    // Process order here (in a real app, you'd send this to a server)
    if (this.checkoutModal) this.checkoutModal.classList.remove("active");
    if (this.confirmationModal) this.confirmationModal.classList.add("active");

    // Clear cart after successful order
    this.cart = [];
    this.saveCart();
    this.updateCart();
  }

  closeConfirmationModal() {
    if (this.confirmationModal)
      this.confirmationModal.classList.remove("active");
    if (this.overlay) this.overlay.classList.remove("active");
  }

  closeAllModals() {
    if (this.cartModal) this.cartModal.classList.remove("active");
    if (this.checkoutModal) this.checkoutModal.classList.remove("active");
    if (this.confirmationModal)
      this.confirmationModal.classList.remove("active");
    if (this.overlay) this.overlay.classList.remove("active");
  }
}

// Initialize cart when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const cart = new Cart();
});
