// cart.js - Shared cart functionality

// Initialize cart from localStorage or empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// DOM Elements
const cartCount = document.getElementById("cartCount");
const cartIcon = document.getElementById("cartIcon");
const cartModal = document.getElementById("cartModal");
const closeCartModal = document.getElementById("closeCartModal");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const checkoutForm = document.getElementById("checkoutForm");
const orderConfirmationModal = document.getElementById(
  "orderConfirmationModal"
);
const closeConfirmationModal = document.getElementById(
  "closeConfirmationModal"
);

// Update cart count in navbar
function updateCartCount() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  if (cartCount) cartCount.textContent = totalItems;
}

// Update cart display in modal
function updateCartDisplay() {
  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML =
      '<p class="empty-cart-message">Your cart is empty</p>';
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
                    <button class="quantity-btn decrease" data-id="${
                      item.id
                    }">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${
                      item.id
                    }">+</button>
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
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (cartTotal) cartTotal.textContent = `$${total.toFixed(2)}`;
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

// Initialize cart functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Update cart count on page load
  updateCartCount();

  // Cart modal functionality
  if (cartIcon) {
    cartIcon.addEventListener("click", () => {
      if (cartModal) {
        cartModal.style.display = "block";
        document.body.style.overflow = "hidden";
      }
    });
  }

  if (closeCartModal) {
    closeCartModal.addEventListener("click", () => {
      if (cartModal) {
        cartModal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  }

  // Close modals when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === cartModal) {
      cartModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
    if (e.target === orderConfirmationModal) {
      orderConfirmationModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Checkout form submission
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Here you would normally send the order to your backend
      // For this demo, we'll just show the confirmation

      // Close cart modal
      if (cartModal) cartModal.style.display = "none";

      // Show confirmation modal
      if (orderConfirmationModal)
        orderConfirmationModal.style.display = "block";

      // Clear the cart
      cart = [];
      updateCart();

      // Reset form
      checkoutForm.reset();
    });
  }

  // Close confirmation modal
  if (closeConfirmationModal) {
    closeConfirmationModal.addEventListener("click", () => {
      if (orderConfirmationModal) {
        orderConfirmationModal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  }

  // Add event listeners to all add-to-cart buttons
  document.addEventListener("click", function (e) {
    if (
      e.target.classList.contains("add-to-cart") ||
      e.target.closest(".add-to-cart")
    ) {
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
});

// Make functions available globally if needed
window.addToCart = addToCart;
window.updateCart = updateCart;
