// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const nav = document.querySelector("nav");

mobileMenuBtn.addEventListener("click", () => {
  nav.classList.toggle("active");
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll("nav ul li a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
  });
});

// Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartIcon = document.querySelector(".cart-icon");
const cartCount = document.querySelector(".cart-count");
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartModal = document.getElementById("cartModal");
const checkoutModal = document.getElementById("checkoutModal");
const confirmationModal = document.getElementById("confirmationModal");
const closeModalButtons = document.querySelectorAll(".close-modal");
const checkoutBtn = document.querySelector(".checkout-btn");
const continueShoppingBtn = document.querySelector(".continue-shopping-btn");
const checkoutForm = document.getElementById("checkoutForm");
const cartItemsContainer = document.querySelector(".cart-items");
const cartTotalPrice = document.getElementById("cart-total-price");
const emptyCartMessage = document.querySelector(".empty-cart-message");




// Save cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Add to cart functionality
addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productCard = button.closest(".product-card");
    const productName = productCard.querySelector("h3").textContent;
    const productPrice = parseFloat(
      productCard
        .querySelector(".product-price")
        .textContent.replace("$", "")
    );
    const productImage = productCard.querySelector(".product-image img").src;

    // Check if product already in cart
    const existingItem = cart.find((item) => item.name === productName);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1,
      });
    }

    updateCart();
    saveCart();

    // Show cart modal
    cartModal.style.display = "block";
  });
});

// Update cart count and items
function updateCart() {
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
  cartCount.textContent = totalItems;

  if (cart.length === 0) {
    emptyCartMessage.style.display = "block";
    cartItemsContainer.innerHTML =
      '<p class="empty-cart-message">Your cart is currently empty.</p>';
    cartTotalPrice.textContent = "0.00";
    return;
  } else {
    emptyCartMessage.style.display = "none";
  }

  let itemsHTML = "";
  let totalPrice = 0;

  cart.forEach((item) => {
    itemsHTML += `
      <div class="cart-item">
          <div class="cart-item-info">
              <div class="cart-item-image">
                  <img src="${item.image}" alt="${item.name}">
              </div>
              <div>
                  <div class="cart-item-name">${item.name}</div>
                  <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
              </div>
          </div>
          <div>
              <span class="quantity-control" data-name="${item.name}">-</span>
              <span class="quantity">${item.quantity}</span>
              <span class="quantity-control" data-name="${item.name}">+</span>
          </div>
      </div>
    `;

    totalPrice += item.price * item.quantity;
  });

  cartItemsContainer.innerHTML = itemsHTML;
  cartTotalPrice.textContent = totalPrice.toFixed(2);

  // Add event listeners to quantity controls
  document.querySelectorAll(".quantity-control").forEach((control) => {
    control.addEventListener("click", () => {
      const productName = control.getAttribute("data-name");
      const item = cart.find((item) => item.name === productName);

      if (control.textContent === "+") {
        item.quantity += 1;
      } else {
        item.quantity -= 1;
        if (item.quantity === 0) {
          cart = cart.filter((i) => i.name !== productName);
        }
      }

      updateCart();
      saveCart();
    });
  });
}

// Initialize cart on page load
updateCart();

// Open cart modal when clicking cart icon
cartIcon.addEventListener("click", () => {
  cartModal.style.display = "block";
});

// Close modals
closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".modal").forEach((modal) => {
      modal.style.display = "none";
    });
  });
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
  }
});

// Proceed to checkout
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) return;

  cartModal.style.display = "none";
  checkoutModal.style.display = "block";
});

// Continue shopping after order confirmation
continueShoppingBtn.addEventListener("click", () => {
  confirmationModal.style.display = "none";
});

// Handle checkout form submission
checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // In a real implementation, you would send this data to your server
  console.log("Order submitted:", {
    customer: {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      address: document.getElementById("address").value,
    },
    items: cart,
    total: parseFloat(cartTotalPrice.textContent),
  });

  // Clear the cart
  cart = [];
  updateCart();
  saveCart();

  // Reset form
  checkoutForm.reset();

  // Show confirmation
  checkoutModal.style.display = "none";
  confirmationModal.style.display = "block";

  // Redirect after delay
  setTimeout(() => {
    confirmationModal.style.display = "none";
    window.location.href = "/shop/";
  }, 5000);
});

