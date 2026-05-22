// Cart Functionality
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartIcon = document.getElementById("cartIcon");
const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");
const continueShoppingBtn = document.getElementById("continueShoppingBtn");
const checkoutModal = document.getElementById("checkoutModal");
const closeCheckoutModal = document.getElementById("closeCheckoutModal");
const checkoutForm = document.getElementById("checkoutForm");
const orderConfirmationModal = document.getElementById(
  "orderConfirmationModal"
);
const closeOrderConfirmationModal = document.getElementById(
  "closeOrderConfirmationModal"
);
const backToShopBtn = document.getElementById("backToShopBtn");
const addToCartButtons = document.querySelectorAll(".add-to-cart");

// Initialize cart on page load
updateCart();

// Toggle Cart Modal
cartIcon.addEventListener("click", () => {
  cartModal.classList.toggle("active");
});

closeCart.addEventListener("click", () => {
  cartModal.classList.remove("active");
});

continueShoppingBtn.addEventListener("click", () => {
  cartModal.classList.remove("active");
});

// Add to Cart
addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
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

    saveCart();
    updateCart();
    cartModal.classList.add("active");

    // Add animation to cart icon
    cartIcon.classList.add("animate");
    setTimeout(() => {
      cartIcon.classList.remove("animate");
    }, 500);
  });
});

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Update Cart
function updateCart() {
  // Update cart count
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;

  // Update cart items display
  if (cart.length === 0) {
    cartItems.innerHTML =
      '<p class="empty-cart-message">Your cart is empty</p>';
  } else {
    cartItems.innerHTML = "";
    cart.forEach((item) => {
      const cartItemElement = document.createElement("div");
      cartItemElement.className = "cart-item";
      cartItemElement.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
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
                    <span class="remove-item" data-id="${item.id}">Remove</span>
                </div>
            `;
      cartItems.appendChild(cartItemElement);
    });

    // Add event listeners for quantity buttons
    document.querySelectorAll(".decrease").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        const item = cart.find((item) => item.id === id);
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          cart = cart.filter((item) => item.id !== id);
        }
        saveCart();
        updateCart();
      });
    });

    document.querySelectorAll(".increase").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        const item = cart.find((item) => item.id === id);
        item.quantity += 1;
        saveCart();
        updateCart();
      });
    });

    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        cart = cart.filter((item) => item.id !== id);
        saveCart();
        updateCart();
      });
    });
  }

  // Update total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = total.toFixed(2);
}

// Checkout Flow
checkoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (cart.length === 0) return;
  cartModal.classList.remove("active");
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
  updateCart();
});

closeOrderConfirmationModal.addEventListener("click", () => {
  orderConfirmationModal.style.display = "none";
});

backToShopBtn.addEventListener("click", () => {
  orderConfirmationModal.style.display = "none";
  window.location.href = "/shop/";
});
