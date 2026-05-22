
document.addEventListener("DOMContentLoaded", function () {
  // Initialize cart from localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const navLinks = document.getElementById("nav-links");

  mobileMenuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    document.querySelector(".overlay").classList.toggle("active");
  });

  // Cart functionality
  const cartIcon = document.getElementById("cart-icon");
  const cartSidebar = document.querySelector(".cart-sidebar");
  const closeCart = document.querySelector(".close-cart");
  const overlay = document.querySelector(".overlay");
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const proceedBtn = document.getElementById("proceed-btn");
  const checkoutForm = document.getElementById("checkout-form");
  const orderForm = document.getElementById("order-form");
  const thankYouPopup = document.getElementById("thank-you-popup");
  const closeThankYou = document.getElementById("close-thank-you");

  // Update cart count on page load
  updateCartCount();

  // Toggle cart sidebar
  cartIcon.addEventListener("click", function (e) {
    e.preventDefault();
    cartSidebar.classList.add("active");
    overlay.classList.add("active");
    updateCart();
  });

  closeCart.addEventListener("click", function () {
    cartSidebar.classList.remove("active");
    overlay.classList.remove("active");
  });

  overlay.addEventListener("click", function () {
    cartSidebar.classList.remove("active");
    navLinks.classList.remove("active");
    overlay.classList.remove("active");

    // Close all blog popups
    document.querySelectorAll(".blog-popup").forEach((popup) => {
      popup.classList.remove("active");
    });
  });

  // Add to cart functionality
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
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

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      
      updateCart();
      updateCartCount();

      // Show cart sidebar when adding first item
      if (cart.length === 1) {
        cartSidebar.classList.add("active");
        overlay.classList.add("active");
      }
    });
  });

  // Update cart display
  function updateCart() {
    // Update cart items
    if (cart.length === 0) {
      cartItemsContainer.innerHTML =
        '<p class="empty-cart-message">Your cart is empty</p>';
      checkoutForm.classList.remove("active");
      proceedBtn.style.display = "block";
    } else {
      cartItemsContainer.innerHTML = "";
      cart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.name}</h4>
            <p class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</p>
            <button class="remove-item" data-id="${item.id}">Remove</button>
          </div>
        `;
        cartItemsContainer.appendChild(cartItem);
      });

      // Add event listeners to remove buttons
      document.querySelectorAll(".remove-item").forEach((button) => {
        button.addEventListener("click", function () {
          const itemId = button.getAttribute("data-id");
          cart = cart.filter((item) => item.id !== itemId);
          localStorage.setItem('cart', JSON.stringify(cart));
          updateCart();
          updateCartCount();
        });
      });
    }

    // Update total
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  }

  // Update cart count in header
  function updateCartCount() {
    const cartCount = document.querySelector(".cart-count");
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
  }

  // Proceed to checkout
  proceedBtn.addEventListener("click", function () {
    checkoutForm.classList.add("active");
    proceedBtn.style.display = "none";
  });

  // Submit order form
  orderForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // In a real application, you would send the order data to your server here
    console.log("Order submitted:", {
      customer: {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
      },
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    });

    // Show thank you popup
    thankYouPopup.classList.add("active");
    overlay.classList.add("active");

    // Clear the cart
    cart = [];
    localStorage.removeItem('cart');
    updateCart();
    updateCartCount();
    checkoutForm.classList.remove("active");
    proceedBtn.style.display = "block";
    orderForm.reset();
  });

  // Close thank you popup
  closeThankYou.addEventListener("click", function () {
    thankYouPopup.classList.remove("active");
    overlay.classList.remove("active");
    cartSidebar.classList.remove("active");
  });

  // The rest of your existing JavaScript remains the same
  // ...
});
