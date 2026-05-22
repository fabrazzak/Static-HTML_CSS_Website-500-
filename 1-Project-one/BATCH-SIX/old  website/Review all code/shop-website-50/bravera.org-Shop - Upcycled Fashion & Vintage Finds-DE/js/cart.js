// Cart functionality for Bravera website

// Initialize cart from localStorage or create empty array
let cart = JSON.parse(localStorage.getItem("braveraCart")) || [];

// Update cart count in header
function updateCartCount() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountElement = document.getElementById("headerCartCount");
  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
  }
}

// Calculate cart totals
function calculateCartTotals() {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 5.99;
  const total = subtotal + shipping;

  return {
    subtotal: subtotal.toFixed(2),
    shipping: shipping.toFixed(2),
    total: total.toFixed(2),
  };
}

// Render cart items in modal
function renderCartItems() {
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
            <div class="cart-item-img">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">€${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-id="${
                      item.id
                    }">-</button>
                    <input type="text" class="quantity-input" value="${
                      item.quantity
                    }" readonly>
                    <button class="quantity-btn plus" data-id="${
                      item.id
                    }">+</button>
                </div>
            </div>
        `;
    cartItemsContainer.appendChild(cartItem);
  });

  // Update totals
  const totals = calculateCartTotals();
  document.getElementById("cartSubtotal").textContent = `€${totals.subtotal}`;
  document.getElementById("cartShipping").textContent = `€${totals.shipping}`;
  document.getElementById("cartTotal").textContent = `€${totals.total}`;

  // Add event listeners to quantity buttons
  document.querySelectorAll(".quantity-btn.minus").forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = parseInt(this.getAttribute("data-id"));
      const itemIndex = cart.findIndex((i) => i.id === id);

      if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1) {
          cart[itemIndex].quantity--;
        } else {
          cart.splice(itemIndex, 1);
        }

        saveCart();
        renderCartItems();
        updateCartCount();
      }
    });
  });

  document.querySelectorAll(".quantity-btn.plus").forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = parseInt(this.getAttribute("data-id"));
      const item = cart.find((i) => i.id === id);

      if (item) {
        item.quantity++;
        saveCart();
        renderCartItems();
        updateCartCount();
      }
    });
  });
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("braveraCart", JSON.stringify(cart));
}

// Add to cart functionality
function setupAddToCartButtons() {
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      const id = parseInt(this.getAttribute("data-id"));
      const title = this.getAttribute("data-title");
      const price = parseFloat(this.getAttribute("data-price"));
      const image = this.getAttribute("data-image");

      // Check if item already in cart
      const existingItem = cart.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({
          id,
          title,
          price,
          image,
          quantity: 1,
        });
      }

      saveCart();
      updateCartCount();

      // Show added to cart feedback
      const originalText = button.textContent;
      button.textContent = "Added!";
      button.style.backgroundColor = "var(--secondary-color)";

      setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = "var(--primary-color)";
      }, 1500);
    });
  });
}

// Initialize cart functionality
function initCart() {
  updateCartCount();

  // Cart modal functionality
  const cartModal = document.getElementById("cartModal");
  const cartIcon = document.getElementById("cartIcon");

  if (cartIcon) {
    cartIcon.addEventListener("click", function (e) {
      e.preventDefault();
      renderCartItems();
      if (cartModal) {
        cartModal.style.display = "flex";
      }
    });
  }

  // Close modal when clicking X
  document.querySelectorAll(".modal-close").forEach((closeBtn) => {
    closeBtn.addEventListener("click", function () {
      this.closest(".modal").style.display = "none";
    });
  });

  // Close modal when clicking outside
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });

  // Proceed to checkout button
  const proceedToCheckoutBtn = document.getElementById("proceedToCheckoutBtn");
  if (proceedToCheckoutBtn) {
    proceedToCheckoutBtn.addEventListener("click", function () {
      if (cart.length === 0) return;

      if (cartModal) {
        cartModal.style.display = "none";
      }
      const checkoutModal = document.getElementById("checkoutModal");
      if (checkoutModal) {
        checkoutModal.style.display = "flex";
      }
    });
  }

  // Setup add to cart buttons
  setupAddToCartButtons();
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initCart);
