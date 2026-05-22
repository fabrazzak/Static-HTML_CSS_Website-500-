// cart.js - Cart functionality for your e-commerce website

// Cart Elements
const cartIcon = document.getElementById("cartIcon");
const cartSidebar = document.getElementById("cartSidebar");
const cartClose = document.getElementById("cartClose");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.querySelector(".cart-count");
const overlay = document.getElementById("overlay");
const addToCartBtns = document.querySelectorAll(".add-to-cart");
const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutModal = document.getElementById("checkoutModal");
const checkoutClose = document.getElementById("checkoutClose");
const checkoutForm = document.getElementById("checkoutForm");
const orderConfirmation = document.getElementById("orderConfirmation");

// Initialize cart from localStorage or empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Update cart UI
function updateCart() {
  // Update cart count
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;

  // Update cart items
  if (cart.length === 0) {
    cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-bag"></i>
                <p>Your cart is empty</p>
                <a href="/shop/" class="btn">Continue Shopping</a>
            </div>
        `;
    cartTotal.style.display = "none";
  } else {
    cartItems.innerHTML = "";
    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
                <div class="cart-item-img">
                    <img src="${item.img}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="cart-item-quantity">
                        <button class="decrease-qty">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-qty">+</button>
                    </div>
                    <p class="cart-item-remove">Remove</p>
                </div>
            `;
      cartItems.appendChild(cartItem);

      // Add event listeners to quantity buttons
      const decreaseBtn = cartItem.querySelector(".decrease-qty");
      const increaseBtn = cartItem.querySelector(".increase-qty");
      const removeBtn = cartItem.querySelector(".cart-item-remove");
      const quantitySpan = cartItem.querySelector(".cart-item-quantity span");

      decreaseBtn.addEventListener("click", () => {
        const itemIndex = cart.findIndex(
          (cartItem) => cartItem.name === item.name
        );
        if (cart[itemIndex].quantity > 1) {
          cart[itemIndex].quantity -= 1;
          quantitySpan.textContent = cart[itemIndex].quantity;
        } else {
          cart.splice(itemIndex, 1);
          cartItem.remove();
        }
        updateCart();
        saveCart();
      });

      increaseBtn.addEventListener("click", () => {
        const itemIndex = cart.findIndex(
          (cartItem) => cartItem.name === item.name
        );
        cart[itemIndex].quantity += 1;
        quantitySpan.textContent = cart[itemIndex].quantity;
        updateCart();
        saveCart();
      });

      removeBtn.addEventListener("click", () => {
        const itemIndex = cart.findIndex(
          (cartItem) => cartItem.name === item.name
        );
        cart.splice(itemIndex, 1);
        cartItem.remove();
        updateCart();
        saveCart();
      });
    });

    // Update totals
    const subtotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    document.getElementById("cartSubtotal").textContent = `$${subtotal.toFixed(
      2
    )}`;
    document.getElementById(
      "cartTotalAmount"
    ).textContent = `$${subtotal.toFixed(2)}`;

    cartTotal.style.display = "block";
  }
}

// Show notification
function showNotification(message) {
  const notification = document.createElement("div");
  notification.style.position = "fixed";
  notification.style.bottom = "20px";
  notification.style.right = "20px";
  notification.style.backgroundColor = "var(--secondary-color)";
  notification.style.color = "white";
  notification.style.padding = "10px 20px";
  notification.style.borderRadius = "4px";
  notification.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  notification.style.zIndex = "1000";
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transition = "opacity 0.5s ease";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 2000);
}

// Add to cart functionality
function setupAddToCartButtons() {
  const addToCartBtns = document.querySelectorAll(".add-to-cart");

  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productCard = btn.closest(".product-card");
      const productName = productCard.querySelector("h3").textContent;
      const productPrice = parseFloat(productCard.getAttribute("data-price"));
      const productImg = productCard.querySelector("img").src;

      // Check if product already in cart
      const existingItem = cart.find((item) => item.name === productName);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          name: productName,
          price: productPrice,
          img: productImg,
          quantity: 1,
        });
      }

      updateCart();
      saveCart();
      showNotification(`${productName} added to cart`);
    });
  });
}

// Initialize cart functionality
function initCart() {
  // Toggle cart sidebar
  if (cartIcon) {
    cartIcon.addEventListener("click", (e) => {
      e.preventDefault();
      cartSidebar.classList.add("active");
      overlay.classList.add("active");
      updateCart();
    });
  }

  if (cartClose) {
    cartClose.addEventListener("click", () => {
      cartSidebar.classList.remove("active");
      overlay.classList.remove("active");
    });
  }

  if (overlay) {
    overlay.addEventListener("click", () => {
      cartSidebar.classList.remove("active");
      checkoutModal.classList.remove("active");
      orderConfirmation.classList.remove("active");
      overlay.classList.remove("active");
    });
  }

  // Checkout flow
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      cartSidebar.classList.remove("active");
      checkoutModal.classList.add("active");
    });
  }

  if (checkoutClose) {
    checkoutClose.addEventListener("click", () => {
      checkoutModal.classList.remove("active");
      overlay.classList.remove("active");
    });
  }

  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();
      checkoutModal.classList.remove("active");
      orderConfirmation.classList.add("active");

      // Clear cart and localStorage
      cart = [];
      localStorage.removeItem("cart");
      updateCart();

      // Redirect after delay
      setTimeout(() => {
        orderConfirmation.classList.remove("active");
        overlay.classList.remove("active");
      }, 3000);
    });
  }

  // Setup add to cart buttons if they exist on this page
  setupAddToCartButtons();

  // Initialize cart on page load
  updateCart();
}

// Initialize cart when DOM is loaded
document.addEventListener("DOMContentLoaded", initCart);
