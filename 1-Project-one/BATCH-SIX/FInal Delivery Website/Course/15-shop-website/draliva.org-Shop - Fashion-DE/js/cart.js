// Product data (would normally come from a database)
const products = {
  1: {
    title: "Summer Floral Dress",
    price: 89.99,
    oldPrice: 129.99,
    category: "Dresses",
    description:
      "This beautiful summer dress features a vibrant floral pattern on lightweight, breathable fabric. The A-line silhouette and adjustable waist tie create a flattering fit for all body types. Perfect for garden parties, brunch dates, or any summer occasion.",
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1636&q=80",
      "https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1526&q=80",
    ],
  },
  2: {
    title: "Classic Denim Jacket",
    price: 129.99,
    oldPrice: null,
    category: "Jackets",
    description:
      "A timeless denim jacket crafted from premium quality denim. Features a regular fit, button-front closure, and multiple pockets. The perfect layering piece for any season.",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1636&q=80",
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1526&q=80",
    ],
  },
  3: {
    title: "Elegant Silk Blouse",
    price: 79.99,
    oldPrice: 99.99,
    category: "Tops",
    description:
      "A luxurious silk blouse with a delicate drape and elegant sheen. Features a classic collar and button-front design that pairs beautifully with both skirts and trousers.",
    images: [
      "https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1636&q=80",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1526&q=80",
    ],
  },
  4: {
    title: "Tailored Wool Pants",
    price: 109.99,
    oldPrice: null,
    category: "Bottoms",
    description:
      "Premium wool trousers with a tailored fit that flatters every figure. Features a high waist, front pleats, and a straight leg for a polished professional look.",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1526&q=80",
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1636&q=80",
      "https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    ],
  },
  5: {
    title: "Casual T-Shirt",
    price: 39.99,
    oldPrice: null,
    category: "Tops",
    description:
      "A comfortable and stylish basic t-shirt made from soft organic cotton. Perfect for layering or wearing on its own for a casual, everyday look.",
    images: [
      "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1636&q=80",
      "https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    ],
  },
  6: {
    title: "Leather Crossbody Bag",
    price: 149.99,
    oldPrice: null,
    category: "Accessories",
    description:
      "A chic and practical crossbody bag crafted from genuine leather. Features multiple compartments, an adjustable strap, and a secure zip closure.",
    images: [
      "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1636&q=80",
      "https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    ],
  },
  7: {
    title: "Knit Sweater",
    price: 79.99,
    oldPrice: null,
    category: "Tops",
    description:
      "A cozy knit sweater made from a blend of merino wool and cashmere for ultimate softness and warmth. Features a relaxed fit and ribbed cuffs for a polished look.",
    images: [
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1636&q=80",
      "https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    ],
  },
  8: {
    title: "Silk Scarf",
    price: 49.99,
    oldPrice: 69.99,
    category: "Accessories",
    description:
      "A luxurious silk scarf with a beautiful floral print. Can be worn around the neck, as a headscarf, or tied to a handbag for an elegant touch.",
    images: [
      "https://gorurghash.com/wp-content/uploads/2021/04/605A5141.jpg",
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1636&q=80",
      "https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    ],
  },
};

// Initialize cart from localStorage
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// Function to update cart count
function updateCartCount() {
  const cartCount = document.querySelector(".cart-count");
  if (cartCount) {
    const totalItems = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    cartCount.textContent = totalItems;
  }
}

// Function to update cart modal
function updateCartModal() {
  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotalElement = document.getElementById("cartTotal");
  const checkoutBtn = document.getElementById("checkoutBtn");

  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = "";

  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty">
        <i class="fas fa-shopping-bag"></i>
        <p>Your cart is empty</p>
        <button class="btn" id="continueShoppingEmpty">Continue Shopping</button>
      </div>
    `;

    const continueShoppingEmpty = document.getElementById(
      "continueShoppingEmpty"
    );
    if (continueShoppingEmpty) {
      continueShoppingEmpty.addEventListener("click", () => {
        const cartModal = document.getElementById("cartModal");
        if (cartModal) cartModal.classList.remove("active");
      });
    }

    if (cartTotalElement) cartTotalElement.textContent = "$0.00";
    if (checkoutBtn) checkoutBtn.style.display = "none";
    return;
  }

  if (checkoutBtn) checkoutBtn.style.display = "block";

  let total = 0;

  cartItems.forEach((item, index) => {
    const product = products[item.id];
    total += product.price * item.quantity;

    const cartItemElement = document.createElement("div");
    cartItemElement.className = "cart-item";
    cartItemElement.innerHTML = `
      <div class="cart-item-img">
        <img src="${product.images[0]}" alt="${product.title}">
      </div>
      <div class="cart-item-details">
        <div class="cart-item-title">${product.title}</div>
        <div class="cart-item-price">$${product.price.toFixed(2)}</div>
        <div class="cart-item-quantity">
          <button class="decrease-quantity" data-index="${index}">-</button>
          <input type="number" value="${
            item.quantity
          }" min="1" class="item-quantity" data-index="${index}">
          <button class="increase-quantity" data-index="${index}">+</button>
        </div>
        <div class="remove-item" data-index="${index}">Remove</div>
      </div>
    `;

    cartItemsContainer.appendChild(cartItemElement);
  });

  if (cartTotalElement) cartTotalElement.textContent = `$${total.toFixed(2)}`;

  // Add event listeners to quantity buttons
  document.querySelectorAll(".decrease-quantity").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
        saveCart();
        updateCartModal();
        updateCartCount();
      }
    });
  });

  document.querySelectorAll(".increase-quantity").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      cartItems[index].quantity++;
      saveCart();
      updateCartModal();
      updateCartCount();
    });
  });

  document.querySelectorAll(".item-quantity").forEach((input) => {
    input.addEventListener("change", (e) => {
      const index = e.target.getAttribute("data-index");
      const newQuantity = parseInt(e.target.value);
      if (newQuantity > 0) {
        cartItems[index].quantity = newQuantity;
        saveCart();
        updateCartModal();
        updateCartCount();
      } else {
        e.target.value = cartItems[index].quantity;
      }
    });
  });

  document.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      cartItems.splice(index, 1);
      saveCart();
      updateCartModal();
      updateCartCount();
      showNotification("Item removed from cart");
    });
  });
}

// Function to save cart to localStorage
function saveCart() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// Function to show notification
function showNotification(message) {
  const notification = document.createElement("div");
  notification.style.position = "fixed";
  notification.style.bottom = "20px";
  notification.style.right = "20px";
  notification.style.backgroundColor = "var(--secondary-color)";
  notification.style.color = "white";
  notification.style.padding = "10px 20px";
  notification.style.borderRadius = "4px";
  notification.style.zIndex = "1000";
  notification.style.boxShadow = "0 3px 10px rgba(0,0,0,0.2)";
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transition = "opacity 0.5s ease";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 2000);
}

// Initialize cart functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Update cart count on page load
  updateCartCount();

  // Cart elements
  const cartIcon = document.getElementById("cartIcon");
  const cartModal = document.getElementById("cartModal");
  const closeCartModal = document.querySelector(".close-cart-modal");
  const checkoutModal = document.getElementById("checkoutModal");

  // Checkout elements
  const nextToPaymentBtn = document.getElementById("nextToPayment");
  const backToShippingBtn = document.getElementById("backToShipping");
  const placeOrderBtn = document.getElementById("placeOrder");
  const cancelCheckoutBtn = document.getElementById("cancelCheckout");
  const continueShoppingBtn = document.getElementById("continueShopping");
  const checkoutSubtotal = document.getElementById("checkoutSubtotal");
  const checkoutTotal = document.getElementById("checkoutTotal");
  const orderNumber = document.getElementById("orderNumber");

  // Product Modal Functionality
  const productModal = document.getElementById("productModal");
  const viewDetailBtns = document.querySelectorAll(".btn-view-details");
  const closeModal = document.querySelector(".close-modal");
  const modalMainImage = document.getElementById("modalMainImage");
  const thumbnails = document.querySelectorAll(".product-thumbnail");
  const quantityInput = document.getElementById("quantity");
  const minusBtn = document.querySelector(".quantity-btn.minus");
  const plusBtn = document.querySelector(".quantity-btn.plus");
  const modalAddToCartBtn = document.querySelector(".btn-add-to-cart-modal");

  // Add to cart from product cards
  document.querySelectorAll(".btn-add-to-cart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const productId = btn.getAttribute("data-product");
      const product = products[productId];

      // Check if item already exists in cart
      const existingItem = cartItems.find((item) => item.id === productId);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        cartItems.push({
          id: productId,
          name: product.title,
          price: product.price,
          quantity: 1,
          image: product.images[0],
        });
      }

      saveCart();
      updateCartCount();
      showNotification(`${product.title} added to cart!`);
    });
  });

  // Add to cart from modal
  if (modalAddToCartBtn) {
    modalAddToCartBtn.addEventListener("click", () => {
      const productTitle =
        document.getElementById("modalProductTitle").textContent;
      const quantity = parseInt(quantityInput.value);

      // Find the product ID
      let productId;
      for (const [id, product] of Object.entries(products)) {
        if (product.title === productTitle) {
          productId = id;
          break;
        }
      }

      if (productId) {
        const product = products[productId];

        // Check if item already exists in cart
        const existingItem = cartItems.find((item) => item.id === productId);

        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          cartItems.push({
            id: productId,
            name: product.title,
            price: product.price,
            quantity: quantity,
            image: product.images[0],
          });
        }

        saveCart();
        updateCartCount();
        showNotification(`${quantity} ${product.title} added to cart!`);

        // Close modal
        if (productModal) {
          productModal.style.display = "none";
          document.body.style.overflow = "auto";
        }
      }
    });
  }

  // Toggle cart modal
  if (cartIcon) {
    cartIcon.addEventListener("click", (e) => {
      e.preventDefault();
      if (cartModal) {
        cartModal.classList.toggle("active");
        updateCartModal();
      }
    });
  }

  // Close cart modal
  if (closeCartModal) {
    closeCartModal.addEventListener("click", () => {
      if (cartModal) cartModal.classList.remove("active");
    });
  }

  // Close cart modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === cartModal) {
      cartModal.classList.remove("active");
    }
  });

  // Proceed to checkout
  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cartModal) cartModal.classList.remove("active");
      if (checkoutModal) {
        checkoutModal.style.display = "block";
        document.body.style.overflow = "hidden";

        // Calculate and display order summary
        const subtotal = cartItems.reduce((total, item) => {
          return total + products[item.id].price * item.quantity;
        }, 0);

        const shipping = 5.99;
        const total = subtotal + shipping;

        if (checkoutSubtotal)
          checkoutSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        if (checkoutTotal) checkoutTotal.textContent = `$${total.toFixed(2)}`;
      }
    });
  }

  // Checkout navigation
  if (nextToPaymentBtn) {
    nextToPaymentBtn.addEventListener("click", () => {
      // Validate shipping form
      const shippingForm = document.getElementById("shippingForm");
      const requiredFields = shippingForm.querySelectorAll("[required]");
      let isValid = true;

      requiredFields.forEach((field) => {
        if (!field.value) {
          isValid = false;
          field.style.borderColor = "red";
        } else {
          field.style.borderColor = "#ddd";
        }
      });

      if (isValid) {
        document.getElementById("step1").style.display = "none";
        document.getElementById("step2").style.display = "block";

        // Update step indicator
        document
          .querySelector('.checkout-step[data-step="1"]')
          .classList.remove("active");
        document
          .querySelector('.checkout-step[data-step="1"]')
          .classList.add("completed");
        document
          .querySelector('.checkout-step[data-step="2"]')
          .classList.add("active");
      }
    });
  }

  if (backToShippingBtn) {
    backToShippingBtn.addEventListener("click", () => {
      document.getElementById("step2").style.display = "none";
      document.getElementById("step1").style.display = "block";

      // Update step indicator
      document
        .querySelector('.checkout-step[data-step="2"]')
        .classList.remove("active");
      document
        .querySelector('.checkout-step[data-step="1"]')
        .classList.add("active");
    });
  }

  // Place order
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", () => {
      // Validate payment form if credit card is selected
      const paymentMethod = document.querySelector(
        'input[name="paymentMethod"]:checked'
      );
      let isValid = true;

      if (paymentMethod && paymentMethod.value === "creditCard") {
        const cardNumber = document.getElementById("cardNumber");
        const expiryDate = document.getElementById("expiryDate");
        const cvv = document.getElementById("cvv");
        const cardName = document.getElementById("cardName");

        if (!cardNumber.value) {
          cardNumber.style.borderColor = "red";
          isValid = false;
        } else {
          cardNumber.style.borderColor = "#ddd";
        }

        if (!expiryDate.value) {
          expiryDate.style.borderColor = "red";
          isValid = false;
        } else {
          expiryDate.style.borderColor = "#ddd";
        }

        if (!cvv.value) {
          cvv.style.borderColor = "red";
          isValid = false;
        } else {
          cvv.style.borderColor = "#ddd";
        }

        if (!cardName.value) {
          cardName.style.borderColor = "red";
          isValid = false;
        } else {
          cardName.style.borderColor = "#ddd";
        }
      }

      if (isValid) {
        // Process order (in a real app, this would send data to a server)
        document.getElementById("step2").style.display = "none";
        document.getElementById("step3").style.display = "block";

        // Update step indicator
        document
          .querySelector('.checkout-step[data-step="2"]')
          .classList.remove("active");
        document
          .querySelector('.checkout-step[data-step="2"]')
          .classList.add("completed");
        document
          .querySelector('.checkout-step[data-step="3"]')
          .classList.add("active");

        // Generate random order number
        if (orderNumber) {
          orderNumber.textContent = Math.floor(10000 + Math.random() * 90000);
        }

        // Clear cart
        cartItems = [];
        saveCart();
        updateCartCount();
      }
    });
  }

  // Cancel checkout
  if (cancelCheckoutBtn) {
    cancelCheckoutBtn.addEventListener("click", () => {
      if (checkoutModal) {
        checkoutModal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  }

  // Continue shopping after checkout
  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener("click", () => {
      if (checkoutModal) {
        checkoutModal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  }

  // Payment method selection
  document.querySelectorAll(".payment-method").forEach((method) => {
    method.addEventListener("click", () => {
      document.querySelectorAll(".payment-method").forEach((m) => {
        m.classList.remove("active");
      });
      method.classList.add("active");
    });
  });

  // Open modal when clicking view details button
  if (viewDetailBtns) {
    viewDetailBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const productId = btn.getAttribute("data-product");
        const product = products[productId];

        // Update modal with product data
        document.getElementById("modalProductTitle").textContent =
          product.title;
        document.getElementById("modalProductCategory").textContent =
          product.category;
        document.getElementById("modalProductDescription").textContent =
          product.description;

        // Update price
        const priceElement = document.getElementById("modalProductPrice");
        priceElement.innerHTML = `$${product.price.toFixed(2)}`;
        if (product.oldPrice) {
          priceElement.innerHTML += ` <span class="old-price">$${product.oldPrice.toFixed(
            2
          )}</span>`;
        }

        // Update main image
        if (modalMainImage) {
          modalMainImage.src = product.images[0];
          modalMainImage.alt = product.title;
        }

        // Update thumbnails
        if (thumbnails) {
          thumbnails.forEach((thumb, index) => {
            if (product.images[index]) {
              thumb.querySelector("img").src = product.images[index];
              thumb.querySelector("img").alt =
                product.title + " thumbnail " + (index + 1);
            }
          });
        }

        // Reset quantity
        if (quantityInput) quantityInput.value = 1;

        // Show modal
        if (productModal) {
          productModal.style.display = "block";
          document.body.style.overflow = "hidden";
        }
      });
    });
  }

  // Close modal
  if (closeModal) {
    closeModal.addEventListener("click", () => {
      if (productModal) {
        productModal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === productModal) {
      productModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
    if (e.target === checkoutModal) {
      checkoutModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Thumbnail click functionality
  if (thumbnails) {
    thumbnails.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        // Remove active class from all thumbnails
        thumbnails.forEach((t) => t.classList.remove("active"));
        // Add active class to clicked thumbnail
        thumb.classList.add("active");
        // Update main image
        if (modalMainImage) {
          modalMainImage.src = thumb.querySelector("img").src;
        }
      });
    });
  }

  // Quantity selector functionality
  if (minusBtn) {
    minusBtn.addEventListener("click", () => {
      let value = parseInt(quantityInput.value);
      if (value > 1) {
        quantityInput.value = value - 1;
      }
    });
  }

  if (plusBtn) {
    plusBtn.addEventListener("click", () => {
      let value = parseInt(quantityInput.value);
      quantityInput.value = value + 1;
    });
  }
});
