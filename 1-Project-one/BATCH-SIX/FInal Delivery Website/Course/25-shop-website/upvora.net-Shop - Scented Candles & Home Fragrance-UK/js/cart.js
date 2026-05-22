// Cart Functionality
const cartIcon = document.getElementById("cart-icon");
const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalContainer = document.getElementById("cart-total");
const cartTotalPrice = document.getElementById("cart-total-price");
const checkoutBtn = document.getElementById("checkout-btn");
const checkoutModal = document.getElementById("checkout-modal");
const cancelCheckout = document.getElementById("cancel-checkout");
const checkoutForm = document.getElementById("checkout-form");
const confirmationModal = document.getElementById("confirmation-modal");
const confirmOk = document.getElementById("confirm-ok");
const overlay = document.getElementById("overlay");

// Initialize cart from localStorage or empty array
let cart = JSON.parse(localStorage.getItem("upvoraCart")) || [];
let cartCount = 0;

// Open/Close Cart Modal
cartIcon.addEventListener("click", () => {
  cartModal.classList.add("active");
  overlay.classList.add("active");
});

closeCart.addEventListener("click", () => {
  cartModal.classList.remove("active");
  overlay.classList.remove("active");
});

// Checkout Process
checkoutBtn.addEventListener("click", () => {
  cartModal.classList.remove("active");
  checkoutModal.classList.add("active");
});

cancelCheckout.addEventListener("click", () => {
  checkoutModal.classList.remove("active");
  overlay.classList.remove("active");
});

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // In a real application, you would send this data to your server
  console.log("Order submitted:", {
    customer: {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      address: document.getElementById("address").value,
    },
    items: cart,
    total: cart.reduce((total, item) => total + item.price * item.quantity, 0),
  });

  // Show confirmation
  checkoutModal.classList.remove("active");
  confirmationModal.classList.add("active");

  // Reset form
  checkoutForm.reset();
});

confirmOk.addEventListener("click", () => {
  confirmationModal.classList.remove("active");
  overlay.classList.remove("active");

  // Clear cart and localStorage
  cart = [];
  localStorage.removeItem("upvoraCart");
  updateCart();

  // Redirect to shop page
  window.location.href = "/shop/";
});

// Add to Cart Function
function addToCart(product) {
  // Check if product already in cart
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += product.quantity;
  } else {
    cart.push(product);
  }

  updateCart();
  saveCartToLocalStorage();
}

// Save cart to localStorage
function saveCartToLocalStorage() {
  localStorage.setItem("upvoraCart", JSON.stringify(cart));
}

// Load cart from localStorage when page loads
function loadCartFromLocalStorage() {
  const savedCart = localStorage.getItem("upvoraCart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCart();
  }
}

// Update Cart
function updateCart() {
  cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelector(".cart-count").textContent = cartCount;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p class="empty-cart-message">Your cart is currently empty.</p>';
    cartTotalContainer.style.display = "none";
  } else {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
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
                    <div class="remove-item" data-id="${item.id}">Remove</div>
                </div>
            `;

      cartItemsContainer.appendChild(cartItem);
    });

    cartTotalPrice.textContent = `$${total.toFixed(2)}`;
    cartTotalContainer.style.display = "block";

    // Add event listeners to quantity buttons
    document.querySelectorAll(".minus").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        const item = cart.find((item) => item.id === id);

        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          cart = cart.filter((item) => item.id !== id);
        }

        updateCart();
        saveCartToLocalStorage();
      });
    });

    document.querySelectorAll(".plus").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        const item = cart.find((item) => item.id === id);
        item.quantity += 1;
        updateCart();
        saveCartToLocalStorage();
      });
    });

    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        cart = cart.filter((item) => item.id !== id);
        updateCart();
        saveCartToLocalStorage();
      });
    });
  }
}

// Initialize cart when page loads
document.addEventListener("DOMContentLoaded", () => {
  loadCartFromLocalStorage();
});

// Add to Cart from Product Cards (if they exist on the page)
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const product = {
      id: button.getAttribute("data-id"),
      name: button.getAttribute("data-name"),
      price: parseFloat(button.getAttribute("data-price")),
      image: button.getAttribute("data-image"),
      quantity: 1,
    };

    addToCart(product);

    // Show added to cart animation
    button.textContent = "Added!";
    setTimeout(() => {
      button.textContent = "Add to Cart";
    }, 1000);
  });
});

// Close modals when clicking on overlay
overlay.addEventListener("click", () => {
  cartModal.classList.remove("active");
  checkoutModal.classList.remove("active");
  confirmationModal.classList.remove("active");
  overlay.classList.remove("active");
});
