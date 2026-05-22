// Cart functionality
document.addEventListener("DOMContentLoaded", function () {
  // Initialize cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Update cart count on page load
  updateCartCount();

  // Cart elements
  const cartModal = document.querySelector(".cart-modal");
  const overlay = document.querySelector(".overlay");
  const cartItemsContainer = document.querySelector(".cart-items");
  const totalAmount = document.querySelector(".total-amount");
  const cartIcon = document.querySelector(".cart-icon");
  const closeCart = document.querySelector(".close-cart");
  const checkoutBtn = document.querySelector(".checkout-btn");

  // Open cart
  if (cartIcon) {
    cartIcon.addEventListener("click", function () {
      cartModal.style.display = "block";
      overlay.style.display = "block";
      renderCartItems();
    });
  }

  // Close cart
  if (closeCart) {
    closeCart.addEventListener("click", function () {
      cartModal.style.display = "none";
      overlay.style.display = "none";
    });
  }

  if (overlay) {
    overlay.addEventListener("click", function () {
      cartModal.style.display = "none";
      overlay.style.display = "none";
    });
  }

  // Add to cart buttons (for shop page)
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      const name = this.getAttribute("data-name");
      const price = parseFloat(this.getAttribute("data-price"));
      const image = this.getAttribute("data-image");

      addToCart(id, name, price, image);

      // Optional: Show a quick confirmation
      const originalText = button.textContent;
      button.textContent = "Added!";
      setTimeout(() => {
        button.textContent = originalText;
      }, 1000);
    });
  });

  // Add to cart function (can be called from any page)
  function addToCart(id, name, price, image) {
    // Check if item already in cart
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

    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update cart count
    updateCartCount();
  }

  // Render cart items
  function renderCartItems() {
    if (cart.length === 0) {
      cartItemsContainer.innerHTML =
        '<p class="empty-cart-message">Your cart is empty</p>';
      totalAmount.textContent = "0.00";
      if (checkoutBtn) checkoutBtn.style.display = "none";
      return;
    }

    if (checkoutBtn) checkoutBtn.style.display = "block";

    let itemsHTML = "";
    let total = 0;

    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      itemsHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${
        item.name
      }" class="cart-item-img">
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <p class="cart-item-price">€${item.price.toFixed(
                          2
                        )} × ${item.quantity} = €${itemTotal.toFixed(2)}</p>
                        <p class="cart-item-remove" data-id="${
                          item.id
                        }">Remove</p>
                    </div>
                </div>
            `;
    });

    cartItemsContainer.innerHTML = itemsHTML;
    totalAmount.textContent = total.toFixed(2);

    // Add event listeners to remove buttons
    const removeButtons = document.querySelectorAll(".cart-item-remove");
    removeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const id = this.getAttribute("data-id");
        removeFromCart(id);
      });
    });
  }

  // Remove from cart
  function removeFromCart(id) {
    cart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
  }

  // Update cart count in navbar
  function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.querySelector(".cart-count");
    if (cartCountElement) {
      cartCountElement.textContent = count;
    }
  }

  // Checkout button
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function () {
      if (cart.length === 0) return;

      // Show checkout form
      const checkoutForm = `
                <div class="checkout-form" style="max-width: 500px; margin: 20px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; font-family: Arial, sans-serif; background-color: #f9f9f9;">
                    <h3 style="text-align: center; margin-bottom: 20px;">Checkout</h3>
                    <form id="order-form">
                        <div class="form-group" style="margin-bottom: 15px;">
                            <label for="name" style="display: block; margin-bottom: 5px; font-weight: bold;">Full Name</label>
                            <input type="text" id="name" required style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                        </div>
                        <div class="form-group" style="margin-bottom: 15px;">
                            <label for="email" style="display: block; margin-bottom: 5px; font-weight: bold;">Email</label>
                            <input type="email" id="email" required style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                        </div>
                        <div class="form-group" style="margin-bottom: 15px;">
                            <label for="phone" style="display: block; margin-bottom: 5px; font-weight: bold;">Phone Number</label>
                            <input type="tel" id="phone" required style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                        </div>
                        <div class="form-group" style="margin-bottom: 15px;">
                            <label for="address" style="display: block; margin-bottom: 5px; font-weight: bold;">Shipping Address</label>
                            <textarea id="address" required style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; resize: vertical;"></textarea>
                        </div>
                        <p class="payment-info" style="font-style: italic; color: #555; margin-bottom: 20px;">Payment will be made upon delivery.</p>
                        <button type="submit" class="btn" style="width: 100%; padding: 10px; background-color: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px;">Place Order</button>
                    </form>
                </div>
            `;

      cartItemsContainer.innerHTML = checkoutForm;

      // Handle form submission
      document
        .getElementById("order-form")
        .addEventListener("submit", function (e) {
          e.preventDefault();

          // In a real implementation, you would send this data to your server
          cart = [];
          localStorage.setItem("cart", JSON.stringify(cart));
          updateCartCount();

          // Show confirmation
          cartItemsContainer.innerHTML = `
                    <div class="order-confirmation" style="text-align: center; padding: 20px;">
                        <i class="fas fa-check-circle" style="font-size: 48px; color: #28a745; margin-bottom: 15px;"></i>
                        <h3>Your order has been successfully placed!</h3>
                        <p>Thank you for your purchase. We'll contact you shortly with delivery details.</p>
                    </div>
                `;

          // Redirect after 3 seconds
          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
        });
    });
  }
});
