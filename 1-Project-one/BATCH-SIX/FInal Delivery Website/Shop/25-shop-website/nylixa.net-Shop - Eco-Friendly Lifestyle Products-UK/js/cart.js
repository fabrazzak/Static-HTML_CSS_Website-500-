// Cart System for Nylixa Website

// LocalStorage Functions
function saveCartToStorage() {
  localStorage.setItem("nylixaCart", JSON.stringify(cart));
}

function loadCartFromStorage() {
  const savedCart = localStorage.getItem("nylixaCart");
  return savedCart ? JSON.parse(savedCart) : [];
}

function clearCartFromStorage() {
  localStorage.removeItem("nylixaCart");
}

// Initialize cart with saved data
let cart = loadCartFromStorage();

// DOM Elements
const cartIcon = document.getElementById("cartIcon");
const cartModal = document.getElementById("cartModal");
const closeModal = document.getElementById("closeModal");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const emptyCartMessage = document.getElementById("emptyCartMessage");
const checkoutForm = document.getElementById("checkoutForm");
const placeOrderBtn = document.getElementById("placeOrderBtn");
const successModal = document.getElementById("successModal");
const continueShoppingBtn = document.getElementById("continueShoppingBtn");

// Initialize cart display if elements exist
function initializeCart() {
  if (cartCount) {
    updateCart();
  }

  // Open Cart Modal
  if (cartIcon && cartModal) {
    cartIcon.addEventListener("click", () => {
      cartModal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  }

  // Close Cart Modal
  if (closeModal && cartModal) {
    closeModal.addEventListener("click", () => {
      cartModal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  }

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === cartModal || e.target === successModal) {
      cartModal.style.display = "none";
      successModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Place Order
  if (placeOrderBtn && checkoutForm) {
    placeOrderBtn.addEventListener("click", () => {
      // Validate form
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const phone = document.getElementById("phone");
      const address = document.getElementById("address");

      if (!name.value || !email.value || !phone.value || !address.value) {
        alert("Please fill in all fields");
        return;
      }

      // In a real implementation, you would send this data to your server
      const orderData = {
        customer: {
          name: name.value,
          email: email.value,
          phone: phone.value,
          address: address.value,
        },
        items: cart,
        total: parseFloat(cartTotal.textContent),
      };

      console.log("Order placed:", orderData); // For demonstration

      // Clear cart and localStorage
      cart = [];
      clearCartFromStorage();
      updateCart();

      // Show success modal
      cartModal.style.display = "none";
      successModal.style.display = "flex";
    });
  }

  // Continue Shopping
  if (continueShoppingBtn && successModal) {
    continueShoppingBtn.addEventListener("click", () => {
      successModal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  }
}

// Add to Cart functionality for all pages
function setupAddToCartButtons() {
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      const name = this.getAttribute("data-name");
      const price = parseFloat(this.getAttribute("data-price"));
      const image = this.getAttribute("data-image");

      addToCart(id, name, price, image, this);
    });
  });
}

// Add item to cart
function addToCart(id, name, price, image, buttonElement = null) {
  // Check if item already in cart
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

  // Show added animation if button element is provided
  if (buttonElement) {
    buttonElement.innerHTML = '<i class="fas fa-check"></i> Added';
    setTimeout(() => {
      buttonElement.innerHTML = "Add to Cart";
    }, 1000);
  }
}

// Update Cart Display
function updateCart() {
  // Save to localStorage whenever cart changes
  saveCartToStorage();

  // Update cart count if element exists
  if (cartCount) {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
  }

  // Update cart modal if elements exist
  if (cartItems && cartTotal && emptyCartMessage && checkoutForm) {
    if (cart.length === 0) {
      emptyCartMessage.style.display = "block";
      checkoutForm.style.display = "none";
      cartItems.innerHTML =
        '<p id="emptyCartMessage">Your cart is currently empty.</p>';
    } else {
      emptyCartMessage.style.display = "none";
      checkoutForm.style.display = "block";

      let itemsHTML = "";
      let total = 0;

      cart.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        itemsHTML += `
          <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-info">
              <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
              </div>
              <div>
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
              </div>
            </div>
            <div class="cart-item-quantity">
              <button class="quantity-btn decrease-quantity">-</button>
              <input type="number" class="quantity-input" value="${
                item.quantity
              }" min="1">
              <button class="quantity-btn increase-quantity">+</button>
              <span class="remove-item"><i class="fas fa-trash"></i></span>
            </div>
          </div>
        `;
      });

      cartItems.innerHTML = itemsHTML;
      cartTotal.textContent = total.toFixed(2);

      // Add event listeners to quantity buttons
      setupQuantityControls();
    }
  }
}

// Setup quantity controls
function setupQuantityControls() {
  document.querySelectorAll(".decrease-quantity").forEach((button) => {
    button.addEventListener("click", decreaseQuantity);
  });

  document.querySelectorAll(".increase-quantity").forEach((button) => {
    button.addEventListener("click", increaseQuantity);
  });

  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("change", updateQuantity);
  });

  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", removeItem);
  });
}

// Quantity Functions
function decreaseQuantity(e) {
  const itemElement = e.target.closest(".cart-item");
  const id = itemElement.getAttribute("data-id");
  const item = cart.find((item) => item.id === id);

  if (item.quantity > 1) {
    item.quantity -= 1;
    updateCart();
  }
}

function increaseQuantity(e) {
  const itemElement = e.target.closest(".cart-item");
  const id = itemElement.getAttribute("data-id");
  const item = cart.find((item) => item.id === id);

  item.quantity += 1;
  updateCart();
}

function updateQuantity(e) {
  const itemElement = e.target.closest(".cart-item");
  const id = itemElement.getAttribute("data-id");
  const item = cart.find((item) => item.id === id);
  const newQuantity = parseInt(e.target.value);

  if (newQuantity > 0) {
    item.quantity = newQuantity;
    updateCart();
  } else {
    e.target.value = item.quantity;
  }
}

function removeItem(e) {
  const itemElement = e.target.closest(".cart-item");
  const id = itemElement.getAttribute("data-id");

  cart = cart.filter((item) => item.id !== id);
  updateCart();
}

// Public function to get cart count (can be used on other pages)
function getCartCount() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeCart();
  setupAddToCartButtons();
});
