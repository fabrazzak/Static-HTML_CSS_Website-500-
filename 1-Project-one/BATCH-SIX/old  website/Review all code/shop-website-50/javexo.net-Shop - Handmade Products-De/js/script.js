  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mainNav = document.getElementById("mainNav");
  
  mobileMenuBtn.addEventListener("click", () => {
    mainNav.classList.toggle("active");
  });
  
  // Cart Functionality
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // DOM Elements
  const cartIcon = document.getElementById("cartIcon");
  const cartModal = document.getElementById("cartModal");
  const closeCartModal = document.getElementById("closeCartModal");
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");
  const emptyCartMessage = document.getElementById("emptyCartMessage");
  const continueShopping = document.getElementById("continueShopping");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const checkoutModal = document.getElementById("checkoutModal");
  const closeCheckoutModal = document.getElementById("closeCheckoutModal");
  const confirmationModal = document.getElementById("confirmationModal");
  const closeConfirmationModal = document.getElementById(
    "closeConfirmationModal"
  );
  const backToShop = document.getElementById("backToShop");
  const checkoutForm = document.getElementById("checkoutForm");
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  
  // Save cart to localStorage
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  // Open Cart Modal
  cartIcon.addEventListener("click", () => {
    cartModal.style.display = "block";
    updateCartDisplay();
  });
  
  // Close Cart Modal
  closeCartModal.addEventListener("click", () => {
    cartModal.style.display = "none";
  });
  
  // Continue Shopping Button
  continueShopping.addEventListener("click", () => {
    cartModal.style.display = "none";
  });
  
  // Checkout Button
  checkoutBtn.addEventListener("click", () => {
    cartModal.style.display = "none";
    checkoutModal.style.display = "block";
  });
  
  // Close Checkout Modal
  closeCheckoutModal.addEventListener("click", () => {
    checkoutModal.style.display = "none";
  });
  
  // Close Confirmation Modal
  closeConfirmationModal.addEventListener("click", () => {
    confirmationModal.style.display = "none";
  });
  
  // Back to Shop Button
  backToShop.addEventListener("click", () => {
    confirmationModal.style.display = "none";
    window.location.href = "/shop/";
  });
  
  // Form Submission
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    checkoutModal.style.display = "none";
    confirmationModal.style.display = "block";
  
    // Clear the cart
    cart = [];
    saveCart();
    updateCartCount();
    updateCartDisplay();
  });
  
  // Add to Cart Functionality
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
      updateCartCount();
  
      // Show a quick notification
      const notification = document.createElement("div");
      notification.style.position = "fixed";
      notification.style.bottom = "20px";
      notification.style.right = "20px";
      notification.style.backgroundColor = "#8b5a2b";
      notification.style.color = "white";
      notification.style.padding = "10px 20px";
      notification.style.borderRadius = "4px";
      notification.style.zIndex = "1000";
      notification.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
      notification.textContent = `${name} added to cart!`;
  
      document.body.appendChild(notification);
  
      setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.transition = "opacity 0.5s ease";
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 500);
      }, 2000);
    });
  });
  
  function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById("cartCount");
    
    // Make sure cart count element exists before updating
    if (cartCountElement) {
      cartCountElement.textContent = count;
    }
  }
  
  // Update cart count when page loads
  document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
  });
  // Update Cart Display
  function updateCartDisplay() {
    if (cart.length === 0) {
      emptyCartMessage.style.display = "block";
      cartItems.innerHTML = "";
      cartTotal.textContent = "$0.00";
      checkoutBtn.disabled = true;
      return;
    }
  
    emptyCartMessage.style.display = "none";
    checkoutBtn.disabled = false;
  
    let itemsHTML = "";
    let total = 0;
  
    cart.forEach((item) => {
      total += item.price * item.quantity;
  
      itemsHTML += `
        <div class="cart-item">
          <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.name}</h4>
            <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            <div class="cart-item-quantity">
              <button class="quantity-btn decrease-quantity" data-id="${item.id}">-</button>
              <input type="text" class="quantity-input" value="${item.quantity}" readonly>
              <button class="quantity-btn increase-quantity" data-id="${item.id}">+</button>
              <span class="remove-item" data-id="${item.id}">Remove</span>
            </div>
          </div>
        </div>
      `;
    });
  
    cartItems.innerHTML = itemsHTML;
    cartTotal.textContent = `$${total.toFixed(2)}`;
  
    // Add event listeners to quantity buttons
    document.querySelectorAll(".decrease-quantity").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        const item = cart.find((item) => item.id === id);
  
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          cart = cart.filter((item) => item.id !== id);
        }
  
        saveCart();
        updateCartCount();
        updateCartDisplay();
      });
    });
  
    document.querySelectorAll(".increase-quantity").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        const item = cart.find((item) => item.id === id);
        item.quantity += 1;
  
        saveCart();
        updateCartCount();
        updateCartDisplay();
      });
    });
  
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        cart = cart.filter((item) => item.id !== id);
  
        saveCart();
        updateCartCount();
        updateCartDisplay();
      });
    });
  }
  
