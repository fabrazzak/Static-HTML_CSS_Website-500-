document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mainNav = document.getElementById("main-nav");

  mobileMenuBtn.addEventListener("click", () => {
    mainNav.classList.toggle("active");
    mobileMenuBtn.innerHTML = mainNav.classList.contains("active")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  // Cart Functionality
  const cartBtn = document.getElementById("cart-btn");
  const cartModal = document.getElementById("cart-modal");
  const closeCart = document.getElementById("close-cart");
  const overlay = document.getElementById("overlay");
  const addToCartBtns = document.querySelectorAll(".add-to-cart");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.querySelector(".cart-count");
  const checkoutBtn = document.getElementById("checkout-btn");
  const checkoutPopup = document.getElementById("checkout-popup");
  const closeCheckout = document.getElementById("close-checkout");
  const checkoutForm = document.getElementById("checkout-form");
  const confirmationPopup = document.getElementById("confirmation-popup");
  const continueShoppingBtn = document.getElementById("continue-shopping");

  // Initialize cart from localStorage or empty array
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Update cart count on page load
  updateCartCount();

  // Toggle Cart Modal
  cartBtn.addEventListener("click", () => {
    cartModal.classList.add("active");
    overlay.classList.add("active");
    updateCart(); // Ensure cart is up to date when opened
  });

  closeCart.addEventListener("click", () => {
    cartModal.classList.remove("active");
    overlay.classList.remove("active");
  });

  // Add to Cart from Grid
  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = e.target.getAttribute("data-id");
      const productTitle = e.target.getAttribute("data-title");
      const productPrice = parseFloat(e.target.getAttribute("data-price"));
      const productImage = e.target.getAttribute("data-image");

      addToCart({
        id: productId,
        title: productTitle,
        price: productPrice,
        image: productImage,
        quantity: 1,
      });

      // Show cart modal
      cartModal.classList.add("active");
      overlay.classList.add("active");

      // Animation feedback
      e.target.textContent = "Added!";
      setTimeout(() => {
        e.target.textContent = "Add to Cart";
      }, 1000);
    });
  });

  // Add to Cart function
  function addToCart(product) {
    // Check if product already in cart
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push(product);
    }

    // Save to localStorage and update UI
    saveCart();
    updateCartCount();
    updateCart();
  }

  // Update Cart Count
  function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
  }

  // Update Cart Modal
  function updateCart() {
    // Update cart items
    if (cart.length === 0) {
      cartItemsContainer.innerHTML =
        '<p style="text-align: center;">Your cart is empty</p>';
      cartTotal.textContent = "0.00";
      return;
    }

    cartItemsContainer.innerHTML = "";

    cart.forEach((item, index) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
              <div class="cart-item-img">
                  <img src="${item.image}" alt="${item.title}">
              </div>
              <div class="cart-item-info">
                  <h4>${item.title}</h4>
                  <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                  <div class="cart-item-quantity">
                      <button class="quantity-btn decrease" data-index="${index}">-</button>
                      <span>${item.quantity}</span>
                      <button class="quantity-btn increase" data-index="${index}">+</button>
                      <button class="quantity-btn remove" data-index="${index}" style="margin-left: auto;"><i class="fas fa-trash"></i></button>
                  </div>
              </div>
          `;

      cartItemsContainer.appendChild(cartItem);
    });

    // Update total
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    cartTotal.textContent = total.toFixed(2);

    // Add event listeners to quantity buttons
    document.querySelectorAll(".decrease").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        if (cart[index].quantity > 1) {
          cart[index].quantity -= 1;
        } else {
          cart.splice(index, 1);
        }
        saveCart();
        updateCartCount();
        updateCart();
      });
    });

    document.querySelectorAll(".increase").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        cart[index].quantity += 1;
        saveCart();
        updateCartCount();
        updateCart();
      });
    });

    document.querySelectorAll(".remove").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.closest("button").getAttribute("data-index");
        cart.splice(index, 1);
        saveCart();
        updateCartCount();
        updateCart();
      });
    });
  }

  // Save cart to localStorage
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Checkout Flow
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) return;

    cartModal.classList.remove("active");
    checkoutPopup.classList.add("active");
    overlay.classList.add("active");
  });

  closeCheckout.addEventListener("click", () => {
    checkoutPopup.classList.remove("active");
    overlay.classList.remove("active");
  });

  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    checkoutPopup.classList.remove("active");
    confirmationPopup.classList.add("active");

    // Clear cart
    cart = [];
    saveCart();
    updateCartCount();
    updateCart();
  });

  continueShoppingBtn.addEventListener("click", () => {
    confirmationPopup.classList.remove("active");
    overlay.classList.remove("active");
  });

  // Close modals when clicking overlay
  overlay.addEventListener("click", () => {
    cartModal.classList.remove("active");
    checkoutPopup.classList.remove("active");
    confirmationPopup.classList.remove("active");
    overlay.classList.remove("active");
  });
});

// Product data - this should match your products in both home and shop pages
const products = {
  1: {
    title: "Abstract Harmony",
    category: "Abstract",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=745&q=80",
    description:
      "This vibrant abstract piece combines bold colors and fluid shapes to create a sense of movement and harmony. Perfect for adding a modern touch to any space.",
  },
  2: {
    title: "Floral Dreams",
    category: "Floral",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    description:
      "Delicate floral composition with soft pastel tones that bring a peaceful, romantic atmosphere to your home. Printed on premium matte paper for a luxurious look.",
  },
  3: {
    title: "Mountain Majesty",
    category: "Landscape",
    price: 99.99,
    image:
      "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    description:
      "Stunning mountain landscape capturing the grandeur of nature. The detailed print showcases the textures of rock and snow with remarkable clarity.",
  },
  4: {
    title: "Modern Lines",
    category: "Modern",
    price: 69.99,
    image:
      "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
    description:
      "Clean geometric patterns in monochrome create a striking contemporary statement. Ideal for minimalist interiors and office spaces.",
  },
  5: {
    title: "Color Burst",
    category: "Abstract",
    price: 75.99,
    image:
      "https://images.unsplash.com/photo-1531913764164-f85c52e6e654?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=738&q=80",
    description:
      "Energetic explosion of colors that brings life to any room. The high-quality print captures every brushstroke and texture detail.",
  },
  6: {
    title: "Botanical Beauty",
    category: "Floral",
    price: 85.99,
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    description:
      "Detailed botanical illustration featuring exotic flowers and foliage. Printed with archival inks to preserve the vibrant colors for years.",
  },
  7: {
    title: "Ocean Breeze",
    category: "Landscape",
    price: 92.99,
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    description:
      "Serene ocean view with crystal clear waters and dramatic cliffs. The panoramic format makes it perfect for large wall spaces.",
  },
  8: {
    title: "Urban Geometry",
    category: "Modern",
    price: 65.99,
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    description:
      "Architectural elements and urban landscapes combined in a unique geometric composition. Adds a sophisticated edge to modern interiors.",
  },
};
