
// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const navMenu = document.getElementById("nav-menu");

mobileMenuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  mobileMenuBtn.innerHTML = navMenu.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Cart Functionality with localStorage
let cart = JSON.parse(localStorage.getItem("virtuno-cart")) || [];
const cartIcon = document.getElementById("cart-icon");
const cartCount = document.querySelector(".cart-count");
const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartSummary = document.getElementById("cart-summary");
const checkoutForm = document.getElementById("checkout-form");
const proceedCheckout = document.getElementById("proceed-checkout");
const continueShopping = document.getElementById("continue-shopping");
const confirmationModal = document.getElementById("confirmation-modal");
const returnToShop = document.getElementById("return-to-shop");


// Add to Cart buttons
const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const product = {
      id: button.getAttribute("data-id"),
      name: button.getAttribute("data-name"),
      price: parseFloat(button.getAttribute("data-price")),
      image: button.getAttribute("data-image"),
      quantity: 1,
    };

    // Check if product already in cart
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push(product);
    }

    updateCart();
    saveCartToLocalStorage();

    // Show "Added to cart" feedback
    const originalText = button.textContent;
    button.textContent = "Added!";
    button.style.backgroundColor = "#4CAF50";

    setTimeout(() => {
      button.textContent = originalText;
      button.style.backgroundColor = "";
    }, 1500);
  });
});

// Toggle cart modal
cartIcon.addEventListener("click", () => {
  cartModal.classList.add("active");
});

closeCart.addEventListener("click", () => {
  cartModal.classList.remove("active");
});

// Continue shopping button
continueShopping.addEventListener("click", () => {
  cartModal.classList.remove("active");
});

// Proceed to checkout button
proceedCheckout.addEventListener("click", () => {
  checkoutForm.style.display = "block";
  proceedCheckout.style.display = "none";
  continueShopping.style.display = "none";
});

// Place order button
document.getElementById("place-order").addEventListener("click", () => {
  // In a real app, you would send this data to your backend
  const orderData = {
    customer: {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      address: document.getElementById("address").value,
    },
    items: cart,
    total: calculateTotal(),
  };

  console.log("Order placed:", orderData); // For demo purposes

  // Show confirmation
  cartModal.classList.remove("active");
  confirmationModal.classList.add("active");

  // Clear cart
  cart = [];
  updateCart();
  saveCartToLocalStorage();
});

// Return to shop button
returnToShop.addEventListener("click", () => {
  confirmationModal.classList.remove("active");
  window.location.href = "/shop/";
});

// Close modals when clicking outside
[cartModal, confirmationModal].forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
});

// Save cart to localStorage
function saveCartToLocalStorage() {
  localStorage.setItem("virtuno-cart", JSON.stringify(cart));
}

// Update cart function
function updateCart() {
  // Update cart count
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
  cartCount.textContent = totalItems;

  // Update cart items display
  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p class="empty-cart-message">Your cart is currently empty.</p>';
    cartSummary.style.display = "none";
    checkoutForm.style.display = "none";
    proceedCheckout.style.display = "none";
    continueShopping.style.display = "none";
  } else {
    cartItemsContainer.innerHTML = "";
    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
                  <div class="cart-item-img">
                      <img src="${item.image}" alt="${item.name}">
                  </div>
                  <div class="cart-item-details">
                      <h4 class="cart-item-title">${item.name}</h4>
                      <p class="cart-item-price">$${item.price.toFixed(
                        2
                      )}</p>
                  </div>
                  <div class="cart-item-actions">
                      <div class="quantity-control">
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
                      <div class="remove-item" data-id="${item.id}">
                          <i class="fas fa-trash"></i>
                      </div>
                  </div>
              `;
      cartItemsContainer.appendChild(cartItem);
    });

    // Update summary
    const subtotal = calculateSubtotal();
    const shipping = 5.99;
    const total = subtotal + shipping;

    document.getElementById(
      "cart-subtotal"
    ).textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("cart-total").textContent = `$${total.toFixed(
      2
    )}`;

    cartSummary.style.display = "block";
    proceedCheckout.style.display = "block";
    continueShopping.style.display = "block";
    checkoutForm.style.display = "none";
  }

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
      saveCartToLocalStorage();
    });
  });

  document.querySelectorAll(".increase").forEach((button) => {
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

// Calculate subtotal
function calculateSubtotal() {
  return cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

// Calculate total
function calculateTotal() {
  return calculateSubtotal() + 5.99; // $5.99 shipping
}

// Initialize cart on page load
updateCart();
