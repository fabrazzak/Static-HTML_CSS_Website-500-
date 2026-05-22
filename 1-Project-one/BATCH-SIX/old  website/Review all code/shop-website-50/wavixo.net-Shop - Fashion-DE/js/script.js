// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mainNav = document.getElementById("mainNav");

mobileMenuBtn.addEventListener("click", () => {
  mainNav.classList.toggle("active");
  mobileMenuBtn.innerHTML = mainNav.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll("#mainNav a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("active");
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Shopping Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCounter = document.getElementById("cartCounter");
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartIcon = document.querySelector(".cart-count");
const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutModal = document.getElementById("checkoutModal");
const checkoutForm = document.getElementById("checkoutForm");
const orderConfirmationModal = document.getElementById(
  "orderConfirmationModal"
);
const closeModalButtons = document.querySelectorAll(".close-modal");

// Initialize cart on page load
updateCart();

// Add to cart functionality
addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const product = button.getAttribute("data-product");
    const price = parseFloat(button.getAttribute("data-price"));

    // Check if product already in cart
    const existingItem = cart.find((item) => item.product === product);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        product: product,
        price: price,
        quantity: 1,
      });
    }

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();

    // Show cart modal
    cartModal.style.display = "block";
  });
});

// Update cart display
function updateCart() {
  // Update counter
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
  cartCounter.textContent = totalItems;

  // Update cart modal
  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty</p>";
    cartTotal.textContent = "Total: $0.00";
    checkoutBtn.style.display = "none";
  } else {
    let itemsHTML = "";
    let total = 0;

    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      itemsHTML += `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 15px 0; border-bottom: 1px solid #eee;">
            <div>
                <h4 style="margin-bottom: 5px;">${item.product}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <div>
                <p style="font-weight: bold;">$${itemTotal.toFixed(2)}</p>
                <button class="remove-item" data-product="${item.product}" style="background: none; border: none; color: var(--primary-color); cursor: pointer;">Remove</button>
            </div>
        </div>
      `;
    });

    cartItems.innerHTML = itemsHTML;
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    checkoutBtn.style.display = "block";

    // Add event listeners to remove buttons
    const removeButtons = document.querySelectorAll(".remove-item");
    removeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productToRemove = button.getAttribute("data-product");
        cart = cart.filter((item) => item.product !== productToRemove);
        // Update localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
      });
    });
  }
}

// Cart icon click
cartIcon.addEventListener("click", (e) => {
  e.preventDefault();
  cartModal.style.display = "block";
});

// Checkout button click
checkoutBtn.addEventListener("click", () => {
  cartModal.style.display = "none";
  checkoutModal.style.display = "block";
});

// Checkout form submission
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
    total: cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ),
  });

  // Show confirmation
  checkoutModal.style.display = "none";
  orderConfirmationModal.style.display = "block";

  // Clear cart and localStorage
  cart = [];
  localStorage.removeItem('cart');
  updateCart();

  // Reset form
  checkoutForm.reset();

  // Redirect after 5 seconds
  setTimeout(() => {
    orderConfirmationModal.style.display = "none";
    window.location.href = "/shop/";
  }, 5000);
});

// Close modals
closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    modal.style.display = "none";
  });
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
  }
});
