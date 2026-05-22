// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mainNav = document.getElementById("mainNav");

mobileMenuBtn.addEventListener("click", () => {
  mainNav.classList.toggle("active");
});

// Cart Functionality with LocalStorage
const cartIcon = document.getElementById("cartIcon");
const cartCount = document.getElementById("cartCount");
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartModal = document.getElementById("cartModal");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotalElement = document.getElementById("cartTotal");
const proceedToCheckoutBtn = document.getElementById("proceedToCheckout");
const checkoutModal = document.getElementById("checkoutModal");
const checkoutForm = document.getElementById("checkoutForm");
const thankYouModal = document.getElementById("thankYouModal");
const continueShoppingBtn = document.getElementById("continueShopping");

// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count on page load
updateCartCount();

// Add to cart functionality
addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.getAttribute("data-id");
    const productTitle = button.getAttribute("data-title");
    const productPrice = parseFloat(button.getAttribute("data-price"));
    const productImage = button.getAttribute("data-image");

    // Check if product already in cart
    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: productId,
        title: productTitle,
        price: productPrice,
        image: productImage,
        quantity: 1,
      });
    }

    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update cart count
    updateCartCount();

    // Show notification
    showNotification("Item added to cart!");
  });
});

// Cart icon click - show cart modal
cartIcon.addEventListener("click", () => {
  updateCartModal();
  cartModal.style.display = "block";
});

// Proceed to checkout button
proceedToCheckoutBtn.addEventListener("click", () => {
  cartModal.style.display = "none";
  checkoutModal.style.display = "block";
  checkoutForm.style.display = "block";
});

// Checkout form submission
checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // In a real application, you would process the order here
  // For this demo, we'll just show the thank you modal

  // Generate random order number
  const orderNumber =
    "HZ-" +
    new Date().getFullYear() +
    "-" +
    Math.floor(1000 + Math.random() * 9000);
  document.getElementById("orderNumber").textContent = orderNumber;

  checkoutModal.style.display = "none";
  thankYouModal.style.display = "block";

  // Clear the cart
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
});

// Continue shopping button
continueShoppingBtn.addEventListener("click", () => {
  thankYouModal.style.display = "none";
});

// Close modals when clicking X
document.querySelectorAll(".close-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    this.closest(".modal").style.display = "none";
  });
});

// Close modals when clicking outside
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
  }
});

// Update cart count function
function updateCartCount() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;
}

// Update cart modal function
function updateCartModal() {
  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p class="empty-cart-message">Your cart is empty</p>';
    cartTotalElement.textContent = "0.00";
    proceedToCheckoutBtn.style.display = "none";
    return;
  }

  proceedToCheckoutBtn.style.display = "block";

  let itemsHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    itemsHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${
      item.title
    }" class="cart-item-image">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <div class="cart-item-price">$${itemTotal.toFixed(2)}</div>
                <div class="cart-item-remove" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </div>
            </div>
        `;
  });

  cartItemsContainer.innerHTML = itemsHTML;
  cartTotalElement.textContent = total.toFixed(2);

  // Add event listeners to remove buttons
  document.querySelectorAll(".cart-item-remove").forEach((btn) => {
    btn.addEventListener("click", function () {
      const itemId = this.getAttribute("data-id");
      cart = cart.filter((item) => item.id !== itemId);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      updateCartModal();
      showNotification("Item removed from cart");
    });
  });
}

// Blog Read More Functionality
const readMoreButtons = document.querySelectorAll(".read-more");

readMoreButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const blogId = this.getAttribute("data-blog");
    const blogModal = document.getElementById(`blogModal${blogId}`);
    blogModal.style.display = "block";
  });
});

// Newsletter Form Submission
const newsletterForm = document.getElementById("newsletterForm");

newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailInput = newsletterForm.querySelector('input[type="email"]');

  // Show success message
  showNotification("Thank you for subscribing!");

  // Reset form
  emailInput.value = "";
});

// Show notification function
function showNotification(message) {
  const notification = document.createElement("div");
  notification.style.position = "fixed";
  notification.style.bottom = "20px";
  notification.style.right = "20px";
  notification.style.backgroundColor = "#4CAF50";
  notification.style.color = "white";
  notification.style.padding = "15px 25px";
  notification.style.borderRadius = "4px";
  notification.style.boxShadow = "0 3px 10px rgba(0,0,0,0.2)";
  notification.style.zIndex = "1000";
  notification.style.animation = "fadeIn 0.5s, fadeOut 0.5s 2.5s";
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}
