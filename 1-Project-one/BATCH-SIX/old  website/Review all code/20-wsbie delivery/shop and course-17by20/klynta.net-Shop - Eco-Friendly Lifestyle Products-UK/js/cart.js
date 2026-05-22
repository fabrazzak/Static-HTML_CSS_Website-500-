document.addEventListener("DOMContentLoaded", function () {
  // Initialize cart from localStorage or create empty cart
  let cart = JSON.parse(localStorage.getItem("klynta-cart")) || [];

  // DOM Elements
  const cartIcon = document.querySelector(".cart-icon");
  const cartCount = document.querySelector(".cart-count");
  const cartModal = document.getElementById("cartModal");
  const checkoutModal = document.getElementById("checkoutModal");
  const confirmationModal = document.getElementById("confirmationModal");
  const closeModalBtns = document.querySelectorAll(
    ".close-modal, .close-modal-btn"
  );
  const closeConfirmationBtn = document.querySelector(
    ".close-confirmation-btn"
  );
  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotalElement = document.getElementById("cartTotal");
  const checkoutForm = document.getElementById("checkoutForm");
  const checkoutBtn = document.querySelector(".checkout-btn");

  // Initialize cart on page load
  updateCart();

  // Cart icon click handler
  cartIcon.addEventListener("click", openCartModal);

  // Close modal buttons
  closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", closeAllModals);
  });

  // Close confirmation modal button
  closeConfirmationBtn.addEventListener("click", () => {
    confirmationModal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  // Checkout button in cart modal
  checkoutBtn.addEventListener("click", () => {
    cartModal.style.display = "none";
    checkoutModal.style.display = "block";
  });

  // Checkout form submission
  checkoutForm.addEventListener("submit", handleCheckout);

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === cartModal) closeCartModal();
    if (e.target === checkoutModal) closeCheckoutModal();
    if (e.target === confirmationModal) closeConfirmationModal();
  });

  // Add to cart buttons (delegated event listener for dynamic content)
  document.addEventListener("click", function (e) {
    if (
      e.target.classList.contains("add-to-cart") ||
      e.target.closest(".add-to-cart")
    ) {
      const btn = e.target.classList.contains("add-to-cart")
        ? e.target
        : e.target.closest(".add-to-cart");
      e.preventDefault();
      e.stopPropagation();

      const id = btn.getAttribute("data-id");
      const name = btn.getAttribute("data-name");
      const price = parseFloat(btn.getAttribute("data-price"));
      const image = btn.getAttribute("data-image");

      addToCart(id, name, price, image);
      showAddToCartAnimation(btn);
    }
  });

  // Cart item quantity and remove handlers (delegated for dynamic content)
  cartItemsContainer.addEventListener("click", function (e) {
    // Quantity decrease
    if (
      e.target.classList.contains("quantity-decrease") ||
      e.target.closest(".quantity-decrease")
    ) {
      const btn = e.target.classList.contains("quantity-decrease")
        ? e.target
        : e.target.closest(".quantity-decrease");
      const id = btn.getAttribute("data-id");
      updateQuantity(id, -1);
    }

    // Quantity increase
    if (
      e.target.classList.contains("quantity-increase") ||
      e.target.closest(".quantity-increase")
    ) {
      const btn = e.target.classList.contains("quantity-increase")
        ? e.target
        : e.target.closest(".quantity-increase");
      const id = btn.getAttribute("data-id");
      updateQuantity(id, 1);
    }

    // Remove item
    if (
      e.target.classList.contains("cart-item-remove") ||
      e.target.closest(".cart-item-remove")
    ) {
      const btn = e.target.classList.contains("cart-item-remove")
        ? e.target
        : e.target.closest(".cart-item-remove");
      const id = btn.getAttribute("data-id");
      removeFromCart(id);
    }
  });

  // Function to add item to cart
  function addToCart(id, name, price, image, quantity = 1) {
    // Check if item already in cart
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

    updateCart();
  }

  // Function to update item quantity
  function updateQuantity(id, change) {
    const item = cart.find((item) => item.id === id);

    if (item) {
      item.quantity += change;

      // Remove if quantity is 0 or less
      if (item.quantity <= 0) {
        cart = cart.filter((item) => item.id !== id);
      }

      updateCart();
    }
  }

  // Function to remove item from cart
  function removeFromCart(id) {
    cart = cart.filter((item) => item.id !== id);
    updateCart();
  }

  // Function to update cart UI and localStorage
  function updateCart() {
    // Save to localStorage
    localStorage.setItem("klynta-cart", JSON.stringify(cart));

    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? "flex" : "none";

    // Update cart modal content
    if (cart.length === 0) {
      cartItemsContainer.innerHTML =
        '<p class="empty-cart-message">Your cart is empty</p>';
      cartTotalElement.textContent = "$0.00";
      checkoutBtn.disabled = true;
    } else {
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
                <img src="${item.image}" alt="${item.name}">
              </div>
              <div class="cart-item-text">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                  <button class="quantity-btn quantity-decrease" data-id="${
                    item.id
                  }">-</button>
                  <input type="text" class="quantity-input" value="${
                    item.quantity
                  }" readonly>
                  <button class="quantity-btn quantity-increase" data-id="${
                    item.id
                  }">+</button>
                </div>
              </div>
            </div>
            <div class="cart-item-total">$${itemTotal.toFixed(2)}</div>
            <div class="cart-item-remove" data-id="${
              item.id
            }"><i class="fas fa-times"></i></div>
          `;

        cartItemsContainer.appendChild(cartItemElement);
      });

      cartTotalElement.textContent = `$${total.toFixed(2)}`;
      checkoutBtn.disabled = false;
    }
  }

  // Function to show add to cart animation
  function showAddToCartAnimation(button) {
    const btnRect = button.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    const animationElement = document.createElement("div");
    animationElement.style.position = "fixed";
    animationElement.style.width = "20px";
    animationElement.style.height = "20px";
    animationElement.style.backgroundColor = "#27ae60";
    animationElement.style.borderRadius = "50%";
    animationElement.style.left = `${btnRect.left + btnRect.width / 2 - 10}px`;
    animationElement.style.top = `${btnRect.top}px`;
    animationElement.style.pointerEvents = "none";
    animationElement.style.zIndex = "1000";
    document.body.appendChild(animationElement);

    const animation = animationElement.animate(
      [
        {
          left: `${btnRect.left + btnRect.width / 2 - 10}px`,
          top: `${btnRect.top}px`,
          opacity: 1,
          transform: "scale(1)",
        },
        {
          left: `${cartRect.left + cartRect.width / 2 - 10}px`,
          top: `${cartRect.top + cartRect.height / 2 - 10}px`,
          opacity: 0,
          transform: "scale(0.5)",
        },
      ],
      {
        duration: 500,
        easing: "ease-out",
      }
    );

    animation.onfinish = () => {
      document.body.removeChild(animationElement);
    };
  }

  // Function to handle checkout
  function handleCheckout(e) {
    e.preventDefault();

    // In a real implementation, you would send this data to your server
    console.log("Order submitted:", {
      customer: {
        name: document.getElementById("checkoutName").value,
        email: document.getElementById("checkoutEmail").value,
        phone: document.getElementById("checkoutPhone").value,
        address: document.getElementById("checkoutAddress").value,
      },
      items: cart,
      total: cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    });

    // Clear the cart after successful checkout
    cart = [];
    localStorage.removeItem("klynta-cart"); // Clear from localStorage
    updateCart();

    // Show confirmation
    closeCheckoutModal();
    openConfirmationModal();

    // Reset form
    checkoutForm.reset();
  }

  // Modal control functions
  function openCartModal() {
    cartModal.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  function closeCartModal() {
    cartModal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  function openCheckoutModal() {
    checkoutModal.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  function closeCheckoutModal() {
    checkoutModal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  function openConfirmationModal() {
    confirmationModal.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  function closeConfirmationModal() {
    confirmationModal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  function closeAllModals() {
    closeCartModal();
    closeCheckoutModal();
    closeConfirmationModal();
  }
});
