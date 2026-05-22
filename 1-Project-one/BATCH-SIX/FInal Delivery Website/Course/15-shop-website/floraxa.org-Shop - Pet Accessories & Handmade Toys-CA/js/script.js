document.addEventListener("DOMContentLoaded", function () {
  // Initialize cart
  let cart = JSON.parse(localStorage.getItem("floraxa-cart")) || [];
  const cartCount = document.getElementById("cartCount");
  const cartIcon = document.getElementById("cartIcon");
  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotalElement = document.getElementById("cartTotal");
  const emptyCartMessage = document.getElementById("emptyCartMessage");
  const proceedToCheckoutBtn = document.getElementById("proceedToCheckout");
  const checkoutForm = document.getElementById("checkoutForm");
  const placeOrderBtn = document.getElementById("placeOrderBtn");

  // Update cart count
  function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCount) {
      cartCount.textContent = totalItems;
    }
    localStorage.setItem("floraxa-cart", JSON.stringify(cart));
  }

  // Render cart items
  function renderCartItems() {
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
      if (emptyCartMessage) emptyCartMessage.style.display = "block";
      cartItemsContainer.innerHTML = "";
      if (cartTotalElement) cartTotalElement.textContent = "$0.00";
      return;
    }

    if (emptyCartMessage) emptyCartMessage.style.display = "none";
    cartItemsContainer.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const cartItemElement = document.createElement("div");
      cartItemElement.className = "cart-item";
      cartItemElement.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p class="cart-item-price">$${item.price.toFixed(
                          2
                        )} x ${item.quantity}</p>
                    </div>
                </div>
                <button class="cart-item-remove" data-index="${index}">
                    <i class="fas fa-trash"></i>
                </button>
            `;

      cartItemsContainer.appendChild(cartItemElement);
    });

    if (cartTotalElement) cartTotalElement.textContent = `$${total.toFixed(2)}`;

    // Add event listeners to remove buttons
    document.querySelectorAll(".cart-item-remove").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.currentTarget.getAttribute("data-index");
        cart.splice(index, 1);
        renderCartItems();
        updateCartCount();
      });
    });
  }

  // Add to cart functionality
  function addToCart(id, name, price, image, quantity = 1) {
    // Check if item already exists in cart
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id,
        name,
        price,
        image,
        quantity,
      });
    }

    updateCartCount();
    renderCartItems();

    // Show notification
    showCartNotification(name);
  }

  // Show add to cart notification
  function showCartNotification(productName) {
    const notification = document.createElement("div");
    notification.className = "cart-notification";
    notification.innerHTML = `
            <div class="cart-notification-content">
                <i class="fas fa-check-circle"></i>
                <span>${productName} added to cart</span>
            </div>
        `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("show");
    }, 10);

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // Add to cart buttons event listeners
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      const name = button.getAttribute("data-name");
      const price = parseFloat(button.getAttribute("data-price"));
      const image = button.getAttribute("data-image");

      addToCart(id, name, price, image);
      openModal("cartModal");
    });
  });

  // Quick view add to cart
  const quickViewAddToCart = document.getElementById("quickViewAddToCart");
  if (quickViewAddToCart) {
    quickViewAddToCart.addEventListener("click", () => {
      const id = quickViewAddToCart.getAttribute("data-id");
      const name = document.getElementById("quickViewTitle").textContent;
      const price = parseFloat(
        document.getElementById("quickViewPrice").textContent.replace("$", "")
      );
      const image = document.getElementById("mainProductImage").src;
      const quantity = parseInt(document.getElementById("productQty").value);

      addToCart(id, name, price, image, quantity);
      closeModal("quickViewModal");
      openModal("cartModal");
    });
  }

  // Cart icon click
  if (cartIcon) {
    cartIcon.addEventListener("click", () => {
      renderCartItems();
      if (checkoutForm) checkoutForm.style.display = "none";
      if (proceedToCheckoutBtn) proceedToCheckoutBtn.style.display = "block";
      const closeModalBtn = document.querySelector(
        ".checkout-buttons .close-modal"
      );
      if (closeModalBtn) closeModalBtn.style.display = "block";
      openModal("cartModal");
    });
  }

  // Proceed to checkout
  if (proceedToCheckoutBtn) {
    proceedToCheckoutBtn.addEventListener("click", () => {
      if (checkoutForm) checkoutForm.style.display = "block";
      if (proceedToCheckoutBtn) proceedToCheckoutBtn.style.display = "none";
      const closeModalBtn = document.querySelector(
        ".checkout-buttons .close-modal"
      );
      if (closeModalBtn) closeModalBtn.style.display = "none";

      // Scroll to checkout form
      if (checkoutForm) checkoutForm.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Place order
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", () => {
      const name = document.getElementById("checkoutName").value;
      const email = document.getElementById("checkoutEmail").value;
      const phone = document.getElementById("checkoutPhone").value;
      const address = document.getElementById("checkoutAddress").value;

      if (!name || !email || !phone || !address) {
        alert("Please fill in all fields");
        return;
      }

      // In a real app, you would send this data to your server
      const order = {
        customer: { name, email, phone, address },
        items: cart,
        total: cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
        date: new Date().toISOString(),
      };

      console.log("Order placed:", order);

      // Clear cart
      cart = [];
      localStorage.setItem("floraxa-cart", JSON.stringify(cart));
      updateCartCount();

      // Close cart modal and show confirmation
      closeModal("cartModal");
      openModal("orderConfirmation");
    });
  }

  // Modal functionality
  const modals = document.querySelectorAll(".modal");
  const closeModalButtons = document.querySelectorAll(".close-modal");

  // Open modal function
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    }
  }

  // Close modal function
  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  }

  // Close modal when clicking on X button
  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal");
      closeModal(modal.id);
    });
  });

  // Close modal when clicking outside of modal content
  modals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });

  // Initialize cart on page load
  updateCartCount();
  renderCartItems();
});

// Global add to cart function that can be called from other scripts
function addProductToCart(id, name, price, image, quantity = 1) {
  let cart = JSON.parse(localStorage.getItem("floraxa-cart")) || [];

  // Check if item already exists in cart
  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id,
      name,
      price,
      image,
      quantity,
    });
  }

  localStorage.setItem("floraxa-cart", JSON.stringify(cart));

  // Update cart count in the UI if the element exists
  const cartCount = document.getElementById("cartCount");
  if (cartCount) {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
  }

  return cart;
}
