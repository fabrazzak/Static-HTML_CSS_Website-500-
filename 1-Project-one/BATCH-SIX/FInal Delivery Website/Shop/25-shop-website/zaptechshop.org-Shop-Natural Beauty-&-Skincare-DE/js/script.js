// Cart functionality
let cart = loadCartFromStorage();
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.querySelector(".cart-count");

// Load cart from localStorage
function loadCartFromStorage() {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
}

// Save cart to localStorage
function saveCartToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Update cart UI
function updateCart() {
  // Update cart items display
  if (cartItems) {
    cartItems.innerHTML = "";

    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
        <div class="cart-item-img">
            <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
            <h4 class="cart-item-title">${item.name}</h4>
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            <div class="cart-item-qty">
                <button class="decrease-qty" data-id="${item.id}">-</button>
                <input type="number" value="${item.quantity}" min="1" readonly>
                <button class="increase-qty" data-id="${item.id}">+</button>
                <button class="remove-item" data-id="${
                  item.id
                }" style="margin-left: 10px; background-color: #f1e8e4;">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
      `;

      cartItems.appendChild(cartItem);
    });

    // Attach event listeners to cart item buttons
    attachCartEventListeners();
  }

  // Update cart total
  if (cartTotal) {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    cartTotal.textContent = total.toFixed(2);
  }

  // Update cart count
  if (cartCount) {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
  }
}

// Add product to cart
function addToCart(product, quantity) {
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    });
  }

  saveCartToStorage();
  updateCart();

  // Show cart sidebar if it exists on the page
  const cartSidebar = document.getElementById("cartSidebar");
  const overlay = document.getElementById("overlay");
  if (cartSidebar && overlay) {
    cartSidebar.classList.add("active");
    overlay.classList.add("active");
  }
}

// Remove item from cart
function removeFromCart(itemId) {
  cart = cart.filter((item) => item.id !== itemId);
}

// Attach event listeners to cart item buttons
function attachCartEventListeners() {
  // Increase quantity buttons
  const increaseQtyBtns = document.querySelectorAll(".increase-qty");
  increaseQtyBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const itemId = parseInt(e.target.dataset.id);
      const cartItem = cart.find((item) => item.id === itemId);
      if (cartItem) {
        cartItem.quantity += 1;
        saveCartToStorage();
        updateCart();
      }
    });
  });

  // Decrease quantity buttons
  const decreaseQtyBtns = document.querySelectorAll(".decrease-qty");
  decreaseQtyBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const itemId = parseInt(e.target.dataset.id);
      const cartItem = cart.find((item) => item.id === itemId);
      if (cartItem) {
        if (cartItem.quantity > 1) {
          cartItem.quantity -= 1;
        } else {
          removeFromCart(itemId);
        }
        saveCartToStorage();
        updateCart();
      }
    });
  });

  // Remove item buttons
  const removeItemBtns = document.querySelectorAll(".remove-item");
  removeItemBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const itemId = parseInt(e.target.closest(".remove-item").dataset.id);
      removeFromCart(itemId);
      saveCartToStorage();
      updateCart();
    });
  });
}

// Initialize cart functionality
function initCart() {
  // Cart icon click handler
  const cartIcon = document.getElementById("cartIcon");
  if (cartIcon) {
    cartIcon.addEventListener("click", (e) => {
      e.preventDefault();
      const cartSidebar = document.getElementById("cartSidebar");
      const overlay = document.getElementById("overlay");
      if (cartSidebar && overlay) {
        cartSidebar.classList.add("active");
        overlay.classList.add("active");
      }
    });
  }

  // Close cart button
  const closeCart = document.getElementById("closeCart");
  if (closeCart) {
    closeCart.addEventListener("click", () => {
      const cartSidebar = document.getElementById("cartSidebar");
      const overlay = document.getElementById("overlay");
      if (cartSidebar && overlay) {
        cartSidebar.classList.remove("active");
        overlay.classList.remove("active");
      }
    });
  }

  // Proceed to checkout button
  const proceedBtn = document.getElementById("proceedBtn");
  if (proceedBtn) {
    proceedBtn.addEventListener("click", () => {
      if (cart.length > 0) {
        const checkoutForm = document.getElementById("checkoutForm");
        const cartSidebar = document.getElementById("cartSidebar");
        if (checkoutForm && cartSidebar) {
          checkoutForm.style.display = "block";
          cartSidebar.classList.remove("active");
        }
      }
    });
  }

  // Checkout form submission
  const checkoutForm = document.getElementById("checkoutFormFields");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const checkoutFormDiv = document.getElementById("checkoutForm");
      const thankYouPopup = document.getElementById("thankYouPopup");
      const overlay = document.getElementById("overlay");

      if (checkoutFormDiv) checkoutFormDiv.style.display = "none";
      if (thankYouPopup) thankYouPopup.style.display = "block";
      if (overlay) overlay.classList.add("active");

      // Clear cart after successful order
      cart = [];
      saveCartToStorage();
      updateCart();
    });
  }

  // Close thank you popup
  const closeThankYou = document.getElementById("closeThankYou");
  if (closeThankYou) {
    closeThankYou.addEventListener("click", () => {
      const thankYouPopup = document.getElementById("thankYouPopup");
      const overlay = document.getElementById("overlay");
      if (thankYouPopup) thankYouPopup.style.display = "none";
      if (overlay) overlay.classList.remove("active");
    });
  }

  // Overlay click to close modals
  const overlay = document.getElementById("overlay");
  if (overlay) {
    overlay.addEventListener("click", () => {
      const cartSidebar = document.getElementById("cartSidebar");
      const thankYouPopup = document.getElementById("thankYouPopup");

      if (cartSidebar) cartSidebar.classList.remove("active");
      if (thankYouPopup) thankYouPopup.style.display = "none";
      overlay.classList.remove("active");
    });
  }

  // Initialize cart display
  updateCart();
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initCart);

// Export functions if needed for other scripts
export { addToCart, updateCart, cart };
