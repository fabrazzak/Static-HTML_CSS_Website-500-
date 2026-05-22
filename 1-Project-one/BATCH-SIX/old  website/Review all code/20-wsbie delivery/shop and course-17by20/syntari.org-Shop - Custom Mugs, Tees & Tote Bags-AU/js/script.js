// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mainNav = document.getElementById("mainNav");

mobileMenuBtn.addEventListener("click", () => {
  mainNav.classList.toggle("active");
  mobileMenuBtn.innerHTML = mainNav.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });

      // Close mobile menu if open
      if (mainNav.classList.contains("active")) {
        mainNav.classList.remove("active");
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      }
    }
  });
});

// Shopping Cart Functionality
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartIcon = document.getElementById("cartIcon");
const cartCount = document.getElementById("cartCount");
const cartModal = document.getElementById("cartModal");
const closeCartModal = document.getElementById("closeCartModal");
const cartItems = document.getElementById("cartItems");
const emptyCartMessage = document.getElementById("emptyCartMessage");
const cartTotal = document.getElementById("cartTotal");
const totalAmount = document.getElementById("totalAmount");
const checkoutForm = document.getElementById("checkoutForm");
const orderForm = document.getElementById("orderForm");
const confirmationModal = document.getElementById("confirmationModal");
const continueShopping = document.getElementById("continueShopping");
const addToCartButtons = document.querySelectorAll(".add-to-cart");

// Update cart count
function updateCartCount() {
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
  cartCount.textContent = totalItems;
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Render cart items
function renderCartItems() {
  if (cart.length === 0) {
    emptyCartMessage.style.display = "block";
    cartTotal.style.display = "none";
    checkoutForm.style.display = "none";
    cartItems.innerHTML =
      '<p id="emptyCartMessage">Your cart is currently empty.</p>';
    emptyCartMessage = document.getElementById("emptyCartMessage");
    return;
  }

  emptyCartMessage.style.display = "none";
  cartTotal.style.display = "flex";
  checkoutForm.style.display = "block";

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
              <div class="cart-item-info">
                  <div class="cart-item-image">
                      <img src="${item.image}" alt="${item.name}">
                  </div>
                  <div>
                      <div class="cart-item-title">${item.name}</div>
                      <div class="cart-item-price">$${item.price.toFixed(
                        2
                      )}</div>
                  </div>
              </div>
              <div class="cart-item-quantity">
                  <button class="quantity-btn decrease" data-index="${index}">-</button>
                  <input type="number" class="quantity-input" value="${
                    item.quantity
                  }" min="1" data-index="${index}">
                  <button class="quantity-btn increase" data-index="${index}">+</button>
                  <span class="remove-item" data-index="${index}"><i class="fas fa-trash"></i></span>
              </div>
          `;
    cartItems.appendChild(cartItem);
  });

  totalAmount.textContent = `$${total.toFixed(2)}`;

  // Add event listeners to quantity buttons
  document.querySelectorAll(".decrease").forEach((btn) => {
    btn.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"));
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
        renderCartItems();
        updateCartCount();
      }
    });
  });

  document.querySelectorAll(".increase").forEach((btn) => {
    btn.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"));
      cart[index].quantity++;
      renderCartItems();
      updateCartCount();
    });
  });

  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("change", function () {
      const index = parseInt(this.getAttribute("data-index"));
      const newQuantity = parseInt(this.value);
      if (newQuantity >= 1) {
        cart[index].quantity = newQuantity;
        renderCartItems();
        updateCartCount();
      }
    });
  });

  document.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"));
      cart.splice(index, 1);
      renderCartItems();
      updateCartCount();
    });
  });
}

// Add to cart functionality
addToCartButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const id = this.getAttribute("data-id");
    const name = this.getAttribute("data-name");
    const price = parseFloat(this.getAttribute("data-price"));
    const image = this.getAttribute("data-image");

    // Check if item already in cart
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
      existingItem.quantity++;
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
    renderCartItems();

    // Show cart modal
    cartModal.style.display = "block";

    // Animate cart icon
    cartIcon.style.transform = "scale(1.2)";
    setTimeout(() => {
      cartIcon.style.transform = "scale(1)";
    }, 300);
  });
});

// Open cart modal
cartIcon.addEventListener("click", () => {
  renderCartItems();
  cartModal.style.display = "block";
});

// Close cart modal
closeCartModal.addEventListener("click", () => {
  cartModal.style.display = "none";
});

// Close modals when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === cartModal) {
    cartModal.style.display = "none";
  }
  if (e.target === confirmationModal) {
    confirmationModal.style.display = "none";
  }
});

// Handle order form submission
orderForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // In a real application, you would send this data to your server
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    items: cart,
    total: totalAmount.textContent,
  };

  console.log("Order submitted:", formData);

  // Clear the cart
  cart = [];
  updateCartCount();
  localStorage.removeItem("cart");

  // Close cart modal and show confirmation
  cartModal.style.display = "none";
  confirmationModal.style.display = "block";

  // Reset form
  orderForm.reset();
});

// Continue shopping button
continueShopping.addEventListener("click", () => {
  confirmationModal.style.display = "none";
  window.location.href = "/shop/";
});

// Initialize cart
updateCartCount();