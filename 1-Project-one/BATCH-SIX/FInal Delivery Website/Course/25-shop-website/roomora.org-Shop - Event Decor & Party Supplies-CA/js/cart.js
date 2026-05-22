// cart.js - Shared cart functionality

// Cart functionality
let cart = JSON.parse(localStorage.getItem("roomora-cart")) || [];

// Update cart count in navbar
function updateCartCount() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelectorAll(".cart-count").forEach((el) => {
    el.textContent = totalItems;
  });
}

// Add to cart function
function addToCart(product, price, quantity = 1, image) {
  // Check if product already in cart
  const existingItem = cart.find((item) => item.product === product);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      product,
      price,
      quantity,
      image,
    });
  }

  updateCart();
  saveCartToLocalStorage();
}

// Update cart UI
function updateCart() {
  updateCartCount();

  const cartItemsContainer = document.querySelector(".cart-items");
  const totalAmountElement = document.querySelector(".total-amount");
  const emptyCartMessage = document.querySelector(".empty-cart-message");
  const proceedCheckoutBtn = document.querySelector(".proceed-checkout");

  if (!cartItemsContainer) return;

  // Update cart items list
  if (cart.length === 0) {
    if (emptyCartMessage) emptyCartMessage.style.display = "block";
    if (cartItemsContainer) cartItemsContainer.innerHTML = "";
    if (proceedCheckoutBtn) proceedCheckoutBtn.disabled = true;
  } else {
    if (emptyCartMessage) emptyCartMessage.style.display = "none";

    let itemsHTML = "";
    let totalAmount = 0;

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      totalAmount += itemTotal;

      itemsHTML += `
        <div class="cart-item">
          <div class="cart-item-img">
            <img src="${item.image || ""}" alt="${item.product}">
          </div>
          <div class="cart-item-details">
            <div class="cart-item-title">${item.product}</div>
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            <div class="cart-item-quantity">
              <button class="decrease-quantity" data-index="${index}">-</button>
              <input type="number" value="${
                item.quantity
              }" min="1" class="quantity-input" data-index="${index}">
              <button class="increase-quantity" data-index="${index}">+</button>
            </div>
          </div>
          <div class="remove-item" data-index="${index}">
            <i class="fas fa-trash"></i>
          </div>
        </div>
      `;
    });

    if (cartItemsContainer) cartItemsContainer.innerHTML = itemsHTML;
    if (totalAmountElement)
      totalAmountElement.textContent = `$${totalAmount.toFixed(2)}`;
    if (proceedCheckoutBtn) proceedCheckoutBtn.disabled = false;

    // Add event listeners to quantity controls
    document.querySelectorAll(".decrease-quantity").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        if (cart[index].quantity > 1) {
          cart[index].quantity -= 1;
          updateCart();
          saveCartToLocalStorage();
        }
      });
    });

    document.querySelectorAll(".increase-quantity").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        cart[index].quantity += 1;
        updateCart();
        saveCartToLocalStorage();
      });
    });

    document.querySelectorAll(".quantity-input").forEach((input) => {
      input.addEventListener("change", (e) => {
        const index = e.target.getAttribute("data-index");
        const newQuantity = parseInt(e.target.value);
        if (newQuantity > 0) {
          cart[index].quantity = newQuantity;
          updateCart();
          saveCartToLocalStorage();
        } else {
          e.target.value = cart[index].quantity;
        }
      });
    });

    document.querySelectorAll(".remove-item").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target
          .closest(".remove-item")
          .getAttribute("data-index");
        cart.splice(index, 1);
        updateCart();
        saveCartToLocalStorage();
      });
    });
  }
}

// Save cart to localStorage
function saveCartToLocalStorage() {
  localStorage.setItem("roomora-cart", JSON.stringify(cart));
}

// Initialize cart on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  // Add event listeners for cart buttons
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const product = btn.getAttribute("data-product");
      const price = parseFloat(btn.getAttribute("data-price"));
      const image = btn.getAttribute("data-image");

      addToCart(product, price, 1, image);

      // Animation feedback
      btn.innerHTML = '<i class="fas fa-check"></i>';
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-plus"></i>';
      }, 1000);
    });
  });

  // Cart modal functionality
  const cartModal = document.querySelector(".cart-modal");
  if (cartModal) {
    const cartIcon = document.querySelector(".cart-icon");
    const closeCartModal = document.querySelector(".cart-modal .close-modal");

    // Open cart modal
    if (cartIcon) {
      cartIcon.addEventListener("click", () => {
        cartModal.style.display = "block";
        document.body.style.overflow = "hidden";
        updateCart();
      });
    }

    // Close cart modal
    if (closeCartModal) {
      closeCartModal.addEventListener("click", () => {
        cartModal.style.display = "none";
        document.body.style.overflow = "auto";
      });
    }

    // Close modal when clicking outside
    window.addEventListener("click", (e) => {
      if (e.target === cartModal) {
        cartModal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });

    // Checkout functionality
    const proceedCheckoutBtn = document.querySelector(".proceed-checkout");
    const backToCartBtn = document.querySelector(".back-to-cart");
    const continueShoppingBtn = document.querySelector(".continue-shopping");
    const placeOrderBtn = document.querySelector(".place-order");
    const returnToShopBtn = document.querySelector(".return-to-shop");
    const cartView = document.querySelector(".cart-view");
    const checkoutForm = document.querySelector(".checkout-form");
    const orderConfirmation = document.querySelector(".order-confirmation");

    function showCartView() {
      if (cartView) cartView.style.display = "block";
      if (checkoutForm) checkoutForm.style.display = "none";
      if (orderConfirmation) orderConfirmation.style.display = "none";
    }

    function showCheckoutForm() {
      if (cartView) cartView.style.display = "none";
      if (checkoutForm) checkoutForm.style.display = "block";
      if (orderConfirmation) orderConfirmation.style.display = "none";
    }

    function showOrderConfirmation() {
      if (cartView) cartView.style.display = "none";
      if (checkoutForm) checkoutForm.style.display = "none";
      if (orderConfirmation) orderConfirmation.style.display = "block";

      // Generate random order number
      const orderNumber = Math.floor(100000 + Math.random() * 900000);
      const orderNumberElement = document.querySelector(".order-number");
      if (orderNumberElement) orderNumberElement.textContent = orderNumber;
    }

    if (proceedCheckoutBtn) {
      proceedCheckoutBtn.addEventListener("click", showCheckoutForm);
    }

    if (backToCartBtn) {
      backToCartBtn.addEventListener("click", showCartView);
    }

    if (continueShoppingBtn) {
      continueShoppingBtn.addEventListener("click", () => {
        if (cartModal) cartModal.style.display = "none";
        document.body.style.overflow = "auto";
      });
    }

    if (returnToShopBtn) {
      returnToShopBtn.addEventListener("click", () => {
        if (cartModal) cartModal.style.display = "none";
        document.body.style.overflow = "auto";
        // Clear cart after order is placed
        cart = [];
        updateCart();
        saveCartToLocalStorage();
      });
    }

    if (placeOrderBtn) {
      document
        .getElementById("checkoutForm")
        ?.addEventListener("submit", (e) => {
          e.preventDefault();
          // In a real implementation, this would submit the order to a server
          showOrderConfirmation();
        });
    }
  }
});
