// Shopping Cart Functionality
let cart = [];

// DOM Elements
const cartIcon = document.querySelector(".cart-icon");
const cartCount = document.querySelector(".cart-count");
const cartModal = document.getElementById("cartModal");
const checkoutModal = document.getElementById("checkoutModal");
const confirmationModal = document.getElementById("confirmationModal");
const closeModals = document.querySelectorAll(".close-modal");
const continueShoppingBtn = document.querySelector(".continue-shopping");
const checkoutBtn = document.querySelector(".checkout-btn");
const returnToShopBtn = document.querySelector(".return-to-shop");
const checkoutForm = document.querySelector(".checkout-form");

// Initialize Cart from localStorage
function initCart() {
  const savedCart = localStorage.getItem("mindaxaCart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartCount();
  }

  // Set up event listeners if elements exist on the page
  if (cartIcon) {
    cartIcon.addEventListener("click", () => {
      updateCartModal();
      cartModal.style.display = "block";
    });
  }

  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener("click", () => {
      cartModal.style.display = "none";
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      cartModal.style.display = "none";
      if (checkoutModal) checkoutModal.style.display = "block";
    });
  }

  if (returnToShopBtn) {
    returnToShopBtn.addEventListener("click", () => {
      confirmationModal.style.display = "none";
      window.location.href = "/shop/";
    });
  }

  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();
      checkoutModal.style.display = "none";
      confirmationModal.style.display = "block";

      // Clear the cart
      cart = [];
      updateCartCount();
    });
  }

  // Close Modals
  if (closeModals.length > 0) {
    closeModals.forEach((closeBtn) => {
      closeBtn.addEventListener("click", () => {
        cartModal.style.display = "none";
        if (checkoutModal) checkoutModal.style.display = "none";
        if (confirmationModal) confirmationModal.style.display = "none";
      });
    });
  }

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === cartModal) cartModal.style.display = "none";
    if (checkoutModal && e.target === checkoutModal)
      checkoutModal.style.display = "none";
    if (confirmationModal && e.target === confirmationModal)
      confirmationModal.style.display = "none";
  });
}

// Add to Cart Function
function addToCart(productId, quantity, productData) {
  let product;

  // If productData is provided, use that (for standalone cart functionality)
  if (productData) {
    product = productData;
  } else {
    // Otherwise, try to get from products object (for shop page)
    if (typeof products !== "undefined" && products[productId]) {
      product = products[productId];
    } else {
      console.error("Product not found");
      return;
    }
  }

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: productId,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: quantity,
    });
  }

  updateCartCount();

  // Show visual feedback if on product page
  const addButton = document.querySelector(
    `.add-to-cart[data-id="${productId}"]`
  );
  if (addButton) {
    addButton.textContent = "Added!";
    setTimeout(() => {
      addButton.textContent = "Add to Cart";
    }, 2000);
  }
}

// Update Cart Count
function updateCartCount() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  if (cartCount) cartCount.textContent = totalItems;

  // Save cart to localStorage
  localStorage.setItem("mindaxaCart", JSON.stringify(cart));
}

// Update Cart Modal
function updateCartModal() {
  if (!cartModal) return;

  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotalElement = document.getElementById("cartTotal");

  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p class="empty-cart-message">Your cart is empty</p>';
    cartTotalElement.textContent = "Total: $0.00";
    return;
  }

  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const cartItemElement = document.createElement("div");
    cartItemElement.className = "cart-item";
    cartItemElement.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.title}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                </div>
            </div>
            <div class="cart-item-quantity">
                <button class="decrease-quantity" data-id="${
                  item.id
                }">-</button>
                <span>${item.quantity}</span>
                <button class="increase-quantity" data-id="${
                  item.id
                }">+</button>
            </div>
            <div class="cart-item-remove">
                <button class="remove-item" data-id="${
                  item.id
                }"><i class="fas fa-trash"></i></button>
            </div>
        `;

    cartItemsContainer.appendChild(cartItemElement);
  });

  // Add event listeners to quantity buttons
  document.querySelectorAll(".increase-quantity").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-id");
      const item = cart.find((item) => item.id === productId);
      item.quantity += 1;
      updateCartModal();
      updateCartCount();
    });
  });

  document.querySelectorAll(".decrease-quantity").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-id");
      const item = cart.find((item) => item.id === productId);

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        cart = cart.filter((item) => item.id !== productId);
      }

      updateCartModal();
      updateCartCount();
    });
  });

  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-id");
      cart = cart.filter((item) => item.id !== productId);
      updateCartModal();
      updateCartCount();
    });
  });

  cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
}

// Open Cart Modal from anywhere
function openCartModal() {
  if (cartModal) {
    updateCartModal();
    cartModal.style.display = "block";
  }
}

// Initialize cart when DOM is loaded
document.addEventListener("DOMContentLoaded", initCart);

// Export functions for use in other files if using modules
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = {
    cart,
    addToCart,
    updateCartCount,
    updateCartModal,
    openCartModal,
    initCart,
  };
}
