// Cart Functionality
class CartSystem {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
    this.initCart();
    this.setupEventListeners();
  }

  initCart() {
    this.updateCartDisplay();
  }

  updateCartDisplay() {
    const totalItems = this.cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    document.querySelectorAll(".cart-count").forEach((el) => {
      el.textContent = totalItems;
    });
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  addToCart(product, quantity = 1) {
    // Check if product already in cart
    const existingItem = this.cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({ ...product, quantity });
    }

    this.updateCartDisplay();
    this.showCartNotification(product.name);
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter((item) => item.id !== productId);
    this.updateCartDisplay();
  }

  showCartNotification(productName) {
    const notification = document.createElement("div");
    notification.className = "cart-notification";
    notification.innerHTML = `${productName} added to cart!`;
    notification.style.position = "fixed";
    notification.style.bottom = "20px";
    notification.style.right = "20px";
    notification.style.backgroundColor = "#8e6c88";
    notification.style.color = "white";
    notification.style.padding = "15px 25px";
    notification.style.borderRadius = "4px";
    notification.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
    notification.style.zIndex = "1000";
    notification.style.animation = "fadeIn 0.3s ease";

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = "fadeOut 0.3s ease";
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  renderCartPopup() {
    const cartPopup = document.getElementById("cartPopup");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const proceedBtn = document.getElementById("proceedBtn");
    const checkoutForm = document.getElementById("checkoutForm");

    if (this.cart.length === 0) {
      cartItems.innerHTML =
        '<p class="empty-cart-message">Your cart is empty</p>';
      cartTotal.textContent = "$0.00";
      if (proceedBtn) proceedBtn.style.display = "none";
      if (checkoutForm) checkoutForm.classList.remove("active");
    } else {
      cartItems.innerHTML = "";
      let total = 0;

      this.cart.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
                    <div class="cart-item-info">
                        <div class="cart-item-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <p class="cart-item-price">$${item.price.toFixed(
                              2
                            )} × ${item.quantity}</p>
                        </div>
                    </div>
                    <button class="cart-item-remove" data-id="${item.id}">
                        <i class="fas fa-times"></i>
                    </button>
                `;
        cartItems.appendChild(cartItem);
      });

      cartTotal.textContent = `$${total.toFixed(2)}`;
      if (proceedBtn) proceedBtn.style.display = "block";
    }
  }

  setupEventListeners() {
    // Cart icon click
    document.querySelectorAll(".cart-icon").forEach((icon) => {
      icon.addEventListener("click", () => {
        const cartPopup = document.getElementById("cartPopup");
        if (cartPopup) {
          this.renderCartPopup();
          cartPopup.classList.add("active");
        }
      });
    });

    // Close cart popup
    const closeCartPopup = document.getElementById("closeCartPopup");
    if (closeCartPopup) {
      closeCartPopup.addEventListener("click", () => {
        document.getElementById("cartPopup").classList.remove("active");
      });
    }

    // Remove item from cart
    document.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("cart-item-remove") ||
        e.target.closest(".cart-item-remove")
      ) {
        const itemId = e.target.classList.contains("cart-item-remove")
          ? e.target.dataset.id
          : e.target.closest(".cart-item-remove").dataset.id;
        this.removeFromCart(itemId);
        this.renderCartPopup();
      }
    });

    // Proceed to checkout
    const proceedBtn = document.getElementById("proceedBtn");
    const checkoutForm = document.getElementById("checkoutForm");
    if (proceedBtn && checkoutForm) {
      proceedBtn.addEventListener("click", () => {
        checkoutForm.classList.add("active");
        proceedBtn.style.display = "none";
        document
          .querySelector(".cart-popup h2")
          .scrollIntoView({ behavior: "smooth" });
      });
    }

    // Order form submission
    const orderForm = document.getElementById("orderForm");
    const thankYouPopup = document.getElementById("thankYouPopup");
    if (orderForm) {
      orderForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // In a real application, you would send this data to your server
        const formData = {
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          phone: document.getElementById("phone").value,
          address: document.getElementById("address").value,
          items: this.cart,
          total: this.cart.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          ),
        };

        console.log("Order submitted:", formData); // For demonstration

        // Clear the cart
        this.cart = [];
        this.updateCartDisplay();

        // Reset form
        orderForm.reset();
        checkoutForm.classList.remove("active");

        // Close cart popup and show thank you popup
        document.getElementById("cartPopup").classList.remove("active");
        if (thankYouPopup) thankYouPopup.classList.add("active");
      });
    }

    // Close thank you popup
    const closeThankYouPopup = document.getElementById("closeThankYouPopup");
    if (closeThankYouPopup) {
      closeThankYouPopup.addEventListener("click", () => {
        thankYouPopup.classList.remove("active");
      });
    }

    // Close popups when clicking outside
    document.querySelectorAll(".popup-overlay").forEach((overlay) => {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          overlay.classList.remove("active");
        }
      });
    });
  }

  // Method to attach add-to-cart functionality to buttons
  attachAddToCartButtons() {
    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", (e) => {
        const product = {
          id: e.target.dataset.id,
          name: e.target.dataset.name,
          price: parseFloat(e.target.dataset.price),
          image: e.target.dataset.image,
          quantity: 1,
        };

        this.addToCart(product);
      });
    });
  }
}

// Initialize cart system when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const cartSystem = new CartSystem();
  cartSystem.attachAddToCartButtons();

  // Make cartSystem available globally if needed
  window.cartSystem = cartSystem;
});
