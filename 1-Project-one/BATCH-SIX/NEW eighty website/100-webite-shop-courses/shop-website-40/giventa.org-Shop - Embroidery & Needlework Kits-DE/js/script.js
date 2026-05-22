// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mainNav = document.getElementById("mainNav");

mobileMenuBtn.addEventListener("click", () => {
  mainNav.classList.toggle("active");
  mobileMenuBtn.innerHTML = mainNav.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Cart Functionality
let cart = loadCart(); // Initialize cart from localStorage

// DOM Elements
const cartIcon = document.getElementById("cartIcon");
const cartCount = document.getElementById("cartCount");
const cartModal = document.getElementById("cartModal");
const closeCartModal = document.getElementById("closeCartModal");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const emptyCartMessage = document.getElementById("emptyCartMessage");
const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutModal = document.getElementById("checkoutModal");
const closeCheckoutModal = document.getElementById("closeCheckoutModal");
const checkoutForm = document.getElementById("checkoutForm");
const orderConfirmationModal = document.getElementById(
  "orderConfirmationModal"
);
const closeConfirmationModal = document.getElementById(
  "closeConfirmationModal"
);
const continueShoppingBtn = document.getElementById(
  "continueShoppingBtn"
);
const addToCartButtons = document.querySelectorAll(".add-to-cart");

// Load cart from localStorage
function loadCart() {
  const cartData = localStorage.getItem('cart');
  return cartData ? JSON.parse(cartData) : [];
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Toggle Cart Modal
cartIcon.addEventListener("click", (e) => {
  e.preventDefault();
  cartModal.style.display = "block";
  updateCartDisplay();
});

closeCartModal.addEventListener("click", () => {
  cartModal.style.display = "none";
});

// Close modals when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === cartModal) {
    cartModal.style.display = "none";
  }
  if (e.target === checkoutModal) {
    checkoutModal.style.display = "none";
  }
  if (e.target === orderConfirmationModal) {
    orderConfirmationModal.style.display = "none";
    window.location.href = "/shop/";
  }
});

// Add to Cart
addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.getAttribute("data-id");
    const name = button.getAttribute("data-name");
    const price = parseFloat(button.getAttribute("data-price"));

    // Check if item already in cart
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id,
        name,
        price,
        quantity: 1,
      });
    }

    updateCartCount();
    saveCart(); // Save to localStorage after modification

    // Show visual feedback
    button.textContent = "Added!";
    button.style.backgroundColor = "#4CAF50";
    setTimeout(() => {
      button.textContent = "Add to Cart";
      button.style.backgroundColor = "";
    }, 1000);
  });
});

// Update Cart Count
function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = count;
}

// Update Cart Display
function updateCartDisplay() {
  if (cart.length === 0) {
    emptyCartMessage.style.display = "block";
    cartItems.innerHTML = "";
    cartTotal.textContent = "0.00";
    checkoutBtn.style.display = "none";
    return;
  }

  emptyCartMessage.style.display = "none";
  checkoutBtn.style.display = "block";

  let itemsHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    itemsHTML += `
      <div class="cart-item">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
        </div>
        <div class="cart-item-price">
          $${item.price.toFixed(2)} x ${item.quantity} = $${itemTotal.toFixed(2)}
        </div>
        <button class="remove-item" data-id="${item.id}">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
  });

  cartItems.innerHTML = itemsHTML;
  cartTotal.textContent = total.toFixed(2);

  // Add event listeners to remove buttons
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      removeItemFromCart(id);
    });
  });
}

// Remove item from cart
function removeItemFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  updateCartCount();
  updateCartDisplay();
}

// Checkout Process
checkoutBtn.addEventListener("click", () => {
  cartModal.style.display = "none";
  checkoutModal.style.display = "block";
});

closeCheckoutModal.addEventListener("click", () => {
  checkoutModal.style.display = "none";
});

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();
  checkoutModal.style.display = "none";
  orderConfirmationModal.style.display = "block";

  // Clear cart after successful order
  cart = [];
  saveCart();
  updateCartCount();
  updateCartDisplay();
});

closeConfirmationModal.addEventListener("click", () => {
  orderConfirmationModal.style.display = "none";
  window.location.href = "/shop/";
});

continueShoppingBtn.addEventListener("click", () => {
  orderConfirmationModal.style.display = "none";
  window.location.href = "/shop/";
});

// Initialize cart count on page load
updateCartCount();