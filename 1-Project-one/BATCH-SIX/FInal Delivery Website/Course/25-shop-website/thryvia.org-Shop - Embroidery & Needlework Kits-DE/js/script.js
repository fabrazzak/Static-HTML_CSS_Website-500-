
// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mainNav = document.getElementById("mainNav");

mobileMenuBtn.addEventListener("click", () => {
  mainNav.classList.toggle("active");
  mobileMenuBtn.innerHTML = mainNav.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll("nav ul li a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (mainNav.classList.contains("active")) {
      mainNav.classList.remove("active");
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
});

// Shopping Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const cartIcon = document.getElementById("cartIcon");
const cartCount = document.getElementById("cartCount");
const cartModal = document.getElementById("cartModal");
const closeCartModal = document.getElementById("closeCartModal");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const continueShoppingBtn = document.getElementById("continueShopping");
const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutModal = document.getElementById("checkoutModal");
const closeCheckoutModal = document.getElementById("closeCheckoutModal");
const checkoutForm = document.getElementById("checkoutForm");
const orderConfirmationModal = document.getElementById(
  "orderConfirmationModal"
);
const closeOrderConfirmationModal = document.getElementById(
  "closeOrderConfirmationModal"
);
const backToShopBtn = document.getElementById("backToShop");
const addToCartButtons = document.querySelectorAll(".add-to-cart");

// Initialize cart count on page load
updateCartCount();

// Event Listeners
cartIcon.addEventListener("click", openCartModal);
closeCartModal.addEventListener("click", closeCartModalFunc);
continueShoppingBtn.addEventListener("click", closeCartModalFunc);
checkoutBtn.addEventListener("click", openCheckoutModal);
closeCheckoutModal.addEventListener("click", closeCheckoutModalFunc);
checkoutForm.addEventListener("submit", placeOrder);
closeOrderConfirmationModal.addEventListener(
  "click",
  closeOrderConfirmationModalFunc
);
backToShopBtn.addEventListener("click", backToShop);

// Add to cart buttons
addToCartButtons.forEach((button) => {
  button.addEventListener("click", addToCart);
});

// Functions
function openCartModal() {
  cartModal.style.display = "block";
  document.body.style.overflow = "hidden";
  // Load cart from localStorage first
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  // Then render the items
  renderCartItems();
}

function closeCartModalFunc() {
  cartModal.style.display = "none";
  document.body.style.overflow = "auto";
}

function openCheckoutModal() {
  if (cart.length === 0) return;
  checkoutModal.style.display = "block";
  document.body.style.overflow = "hidden";
  closeCartModalFunc();
}

function closeCheckoutModalFunc() {
  checkoutModal.style.display = "none";
  document.body.style.overflow = "auto";
}

function closeOrderConfirmationModalFunc() {
  orderConfirmationModal.style.display = "none";
  document.body.style.overflow = "auto";
}

function backToShop() {
  closeOrderConfirmationModalFunc();
  window.location.href = "/shop/";
}

function addToCart(e) {
  const button = e.target;
  const id = button.getAttribute("data-id");
  const name = button.getAttribute("data-name");
  const price = parseFloat(button.getAttribute("data-price"));
  const image = button.getAttribute("data-image");

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

  updateCartCount();
  saveCartToLocalStorage();
  showAddToCartAnimation(button);
}

function updateCartCount() {
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
  cartCount.textContent = totalItems;
}

function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function showAddToCartAnimation(button) {
  button.textContent = "Added!";
  button.style.backgroundColor = "#4CAF50";

  setTimeout(() => {
    button.textContent = "Add to Cart";
    button.style.backgroundColor = "";
  }, 1000);
}

function renderCartItems() {
  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p class="empty-cart-message">Your cart is empty</p>';
    cartTotal.textContent = "$0.00";
    checkoutBtn.disabled = true;
    return;
  }

  checkoutBtn.disabled = false;

  let html = "";
  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    html += `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(
                      2
                    )}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease-quantity">-</button>
                    <input type="text" class="quantity-input" value="${
                      item.quantity
                    }" readonly>
                    <button class="quantity-btn increase-quantity">+</button>
                </div>
                <button class="remove-item">&times;</button>
            </div>
        `;
  });

  cartItemsContainer.innerHTML = html;
  cartTotal.textContent = `$${total.toFixed(2)}`;

  // Add event listeners to quantity buttons
  document.querySelectorAll(".decrease-quantity").forEach((button) => {
    button.addEventListener("click", decreaseQuantity);
  });

  document.querySelectorAll(".increase-quantity").forEach((button) => {
    button.addEventListener("click", increaseQuantity);
  });

  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", removeItem);
  });
}

function decreaseQuantity(e) {
  const button = e.target;
  const cartItem = button.closest(".cart-item");
  const id = cartItem.getAttribute("data-id");
  const item = cart.find((item) => item.id === id);

  if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    cart = cart.filter((item) => item.id !== id);
  }

  updateCartCount();
  saveCartToLocalStorage();
  renderCartItems();
}

function increaseQuantity(e) {
  const button = e.target;
  const cartItem = button.closest(".cart-item");
  const id = cartItem.getAttribute("data-id");
  const item = cart.find((item) => item.id === id);

  item.quantity += 1;

  updateCartCount();
  saveCartToLocalStorage();
  renderCartItems();
}

function removeItem(e) {
  const button = e.target;
  const cartItem = button.closest(".cart-item");
  const id = cartItem.getAttribute("data-id");

  cart = cart.filter((item) => item.id !== id);

  updateCartCount();
  saveCartToLocalStorage();
  renderCartItems();
}

function placeOrder(e) {
  e.preventDefault();

  // In a real application, you would send the order data to your server here
  console.log("Order placed:", {
    customer: {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      address: document.getElementById("address").value,
    },
    items: cart,
    total: cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ),
  });

  // Clear the cart
  cart = [];
  updateCartCount();
  saveCartToLocalStorage();

  // Close checkout modal and show confirmation
  closeCheckoutModalFunc();
  orderConfirmationModal.style.display = "block";

  // Reset the form
  checkoutForm.reset();
}
