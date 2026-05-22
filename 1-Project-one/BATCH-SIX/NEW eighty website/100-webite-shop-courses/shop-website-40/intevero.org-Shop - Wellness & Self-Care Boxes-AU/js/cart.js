document.addEventListener("DOMContentLoaded", function () {
  // Initialize cart from localStorage or empty array
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // DOM Elements
  const cartIcon = document.querySelector(".cart-icon");
  const cartCount = document.querySelector(".cart-count");
  const cartPopup = document.querySelector(".cart-popup");
  const closePopup = document.querySelectorAll(".close-popup");
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartTotalAmount = document.querySelector(".cart-total-amount");
  const emptyCartMessage = document.querySelector(".empty-cart-message");
  const proceedCheckoutBtn = document.querySelector(".proceed-checkout");
  const checkoutForm = document.querySelector(".checkout-form");
  const checkoutFormElement = document.getElementById("checkoutForm");
  const thankYouPopup = document.querySelector(".thank-you-popup");
  const closeThankYouBtn = document.querySelector(".close-thank-you");

  // Product data (should match your products on both pages)
  const products = {
    1: {
      name: "Serenity Box",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
      description: "A calming collection to help you unwind after a long day.",
    },
    2: {
      name: "Mindful Moments Box",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
      description:
        "Tools and inspiration to cultivate mindfulness in your daily life.",
    },
    3: {
      name: "Renewal Box",
      price: 69.99,
      image:
        "https://images.unsplash.com/photo-1607602132700-06825813a0aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
      description:
        "Refresh and rejuvenate with our premium skincare essentials.",
    },
    4: {
      name: "Sleep Well Box",
      price: 54.99,
      image:
        "https://images.unsplash.com/photo-1595341595379-cf0f0f02da24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      description: "Natural solutions for better sleep and relaxation.",
    },
    5: {
      name: "Stress Relief Box",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
      description: "Everything you need to manage stress and find calm.",
    },
    6: {
      name: "Self-Love Box",
      price: 64.99,
      image:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
      description: "Celebrate yourself with this special collection.",
    },
  };

  // Initialize cart count on page load
  updateCart();

  // Add to Cart
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      const product = products[id];

      // Check if item already exists in cart
      const existingItem = cart.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        });
      }

      updateCart();

      // Show cart popup
      cartPopup.classList.add("active");

      // Animate cart icon
      cartIcon.classList.add("animate");
      setTimeout(() => {
        cartIcon.classList.remove("animate");
      }, 500);
    });
  });

  // Update Cart
  function updateCart() {
    // Save cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items display
    if (cart.length === 0) {
      emptyCartMessage.style.display = "block";
      cartItemsContainer.innerHTML = "";
    } else {
      emptyCartMessage.style.display = "none";
      cartItemsContainer.innerHTML = "";

      cart.forEach((item) => {
        const cartItemElement = document.createElement("div");
        cartItemElement.className = "cart-item";
        cartItemElement.innerHTML = `
                    <div style="display: flex; align-items: center;">
                        <div class="cart-item-img">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="cart-item-info">
                            <h4>${item.name}</h4>
                            <div>Qty: ${item.quantity}</div>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center;">
                        <div class="cart-item-price">$${(
                          item.price * item.quantity
                        ).toFixed(2)}</div>
                        <div class="cart-item-remove" data-id="${
                          item.id
                        }"><i class="fas fa-trash"></i></div>
                    </div>
                `;
        cartItemsContainer.appendChild(cartItemElement);
      });

      // Add event listeners to remove buttons
      const removeButtons = document.querySelectorAll(".cart-item-remove");
      removeButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const id = button.getAttribute("data-id");
          cart = cart.filter((item) => item.id !== id);
          updateCart();
        });
      });
    }

    // Update total amount
    const totalAmount = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    cartTotalAmount.textContent = `$${totalAmount.toFixed(2)}`;
  }

  // Toggle Cart Popup
  cartIcon.addEventListener("click", () => {
    cartPopup.classList.add("active");
    checkoutForm.style.display = "none";
    proceedCheckoutBtn.style.display = "block";
  });

  // Close Popups
  closePopup.forEach((button) => {
    button.addEventListener("click", () => {
      cartPopup.classList.remove("active");
      thankYouPopup.classList.remove("active");
    });
  });

  // Proceed to Checkout
  proceedCheckoutBtn.addEventListener("click", () => {
    checkoutForm.style.display = "block";
    proceedCheckoutBtn.style.display = "none";
  });

  // Submit Checkout Form
  checkoutFormElement.addEventListener("submit", (e) => {
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

    // Show thank you popup
    cartPopup.classList.remove("active");
    thankYouPopup.classList.add("active");

    // Clear cart
    cart = [];
    updateCart();

    // Reset form
    checkoutFormElement.reset();
    checkoutForm.style.display = "none";
    proceedCheckoutBtn.style.display = "block";
  });

  // Close Thank You Popup
  closeThankYouBtn.addEventListener("click", () => {
    thankYouPopup.classList.remove("active");
  });

  // Close popups when clicking outside content
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("popup")) {
      cartPopup.classList.remove("active");
      thankYouPopup.classList.remove("active");
    }
  });
});
