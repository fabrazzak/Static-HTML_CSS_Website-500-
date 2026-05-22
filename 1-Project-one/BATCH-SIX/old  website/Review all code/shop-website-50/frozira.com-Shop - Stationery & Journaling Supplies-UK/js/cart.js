// Cart Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Initialize cart elements
  const cartIcon = document.getElementById("cartIcon");
  const cartModal = document.getElementById("cartModal");
  const cartOverlay = document.getElementById("cartOverlay");
  const closeCart = document.getElementById("closeCart");
  const cartItemsContainer = document.getElementById("cartItems");
  const cartCounter = document.getElementById("cartCounter");
  const cartTotal = document.getElementById("cartTotal");
  const cartSubtotal = document.getElementById("cartSubtotal");
  const cartTotalAmount = document.getElementById("cartTotalAmount");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const checkoutModal = document.getElementById("checkoutModal");
  const checkoutOverlay = document.getElementById("checkoutOverlay");
  const continueShopping = document.getElementById("continueShopping");

  // Initialize cart from localStorage or create empty cart
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Update cart counter on page load
  updateCartCounter();

  // Toggle cart modal
  if (cartIcon) cartIcon.addEventListener("click", toggleCart);
  if (cartOverlay) cartOverlay.addEventListener("click", toggleCart);
  if (closeCart) closeCart.addEventListener("click", toggleCart);

  function toggleCart() {
    cartModal.classList.toggle("active");
    cartOverlay.classList.toggle("active");

    if (cartModal.classList.contains("active")) {
      renderCartItems();
    }
  }

  // Add to cart functionality
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      const title = button.getAttribute("data-title");
      const price = parseFloat(button.getAttribute("data-price"));
      const image = button.getAttribute("data-image");

      addToCart(id, title, price, image);

      // Button animation
      button.style.transform = "scale(1.1)";
      setTimeout(() => {
        button.style.transform = "scale(1)";
      }, 300);
    });
  });

  function addToCart(id, title, price, image) {
    // Check if item already exists in cart
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
      // Increase quantity
      existingItem.quantity += 1;
    } else {
      // Add new item
      cart.push({
        id,
        title,
        price,
        image,
        quantity: 1,
      });
    }

    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update UI
    updateCartCounter();
    showAddToCartNotification(title);

    // If cart is open, update the items
    if (cartModal.classList.contains("active")) {
      renderCartItems();
    }
  }

  function updateCartCounter() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCounter) cartCounter.textContent = totalItems;
  }

  function renderCartItems() {
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                </div>
            `;
      cartTotal.style.display = "none";
      return;
    }

    let itemsHTML = "";
    let subtotal = 0;

    cart.forEach((item) => {
      subtotal += item.price * item.quantity;

      itemsHTML += `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${
        item.title
      }" class="cart-item-img">
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.title}</h4>
                        <div class="cart-item-price">$${item.price.toFixed(
                          2
                        )}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn decrease">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn increase">+</button>
                        </div>
                        <span class="remove-item">Remove</span>
                    </div>
                </div>
            `;
    });

    cartItemsContainer.innerHTML = itemsHTML;
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    cartTotalAmount.textContent = `$${subtotal.toFixed(2)}`;
    cartTotal.style.display = "block";

    // Add event listeners to quantity buttons
    document.querySelectorAll(".decrease").forEach((button) => {
      button.addEventListener("click", decreaseQuantity);
    });

    document.querySelectorAll(".increase").forEach((button) => {
      button.addEventListener("click", increaseQuantity);
    });

    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", removeItem);
    });
  }

  function decreaseQuantity(e) {
    const itemId = e.target.closest(".cart-item").getAttribute("data-id");
    const item = cart.find((item) => item.id === itemId);

    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      // Remove item if quantity is 1
      cart = cart.filter((item) => item.id !== itemId);
    }

    updateCart();
  }

  function increaseQuantity(e) {
    const itemId = e.target.closest(".cart-item").getAttribute("data-id");
    const item = cart.find((item) => item.id === itemId);

    item.quantity += 1;
    updateCart();
  }

  function removeItem(e) {
    const itemId = e.target.closest(".cart-item").getAttribute("data-id");
    cart = cart.filter((item) => item.id !== itemId);
    updateCart();
  }

  function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCounter();
    renderCartItems();

    if (cart.length === 0) {
      cartTotal.style.display = "none";
    }
  }

  function showAddToCartNotification(title) {
    const notification = document.createElement("div");
    notification.style.position = "fixed";
    notification.style.bottom = "20px";
    notification.style.right = "20px";
    notification.style.backgroundColor = "var(--primary-color)";
    notification.style.color = "white";
    notification.style.padding = "1rem 2rem";
    notification.style.borderRadius = "4px";
    notification.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
    notification.style.zIndex = "1000";
    notification.style.animation = "fadeIn 0.3s ease";
    notification.textContent = `${title} added to cart!`;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = "fadeOut 0.3s ease";
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 2000);
  }

  // Checkout functionality
  if (checkoutBtn)
    checkoutBtn.addEventListener("click", () => {
      // Clear the cart after checkout
      cart = [];
      localStorage.removeItem("cart");
      updateCartCounter();

      toggleCart();
      showCheckoutModal();

      // Update the cart display immediately
      renderCartItems();
    });

  function showCheckoutModal() {
    checkoutModal.classList.add("active");
    checkoutOverlay.classList.add("active");
  }

  if (continueShopping)
    continueShopping.addEventListener("click", () => {
      checkoutModal.classList.remove("active");
      checkoutOverlay.classList.remove("active");
    });

  if (checkoutOverlay)
    checkoutOverlay.addEventListener("click", () => {
      checkoutModal.classList.remove("active");
      checkoutOverlay.classList.remove("active");
    });

  // View Options Toggle
  const viewButtons = document.querySelectorAll(".view-options button");
  const productGrid = document.querySelector(".product-grid");

  if (viewButtons.length > 0 && productGrid) {
    viewButtons.forEach((button) => {
      button.addEventListener("click", () => {
        viewButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        if (button.querySelector(".fa-list")) {
          productGrid.style.gridTemplateColumns = "1fr";
        } else {
          productGrid.style.gridTemplateColumns =
            "repeat(auto-fill, minmax(250px, 1fr))";
        }
      });
    });
  }

  // Add CSS animations
  const style = document.createElement("style");
  style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(20px); }
        }
    `;
  document.head.appendChild(style);
});
