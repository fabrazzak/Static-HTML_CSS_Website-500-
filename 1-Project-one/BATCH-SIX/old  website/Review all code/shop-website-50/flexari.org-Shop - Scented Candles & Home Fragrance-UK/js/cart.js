document.addEventListener("DOMContentLoaded", function () {
  // Initialize cart from localStorage or empty array
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // DOM Elements
  const cartIcon = document.querySelector(".cart-icon");
  const cartCount = document.querySelector(".cart-count");
  const cartModal = document.querySelector(".cart-modal");
  const overlay = document.querySelector(".overlay");
  const closeCart = document.querySelector(".close-cart");
  const addToCartBtns = document.querySelectorAll(".add-to-cart");
  const cartItemsContainer = document.querySelector(".cart-items");
  const totalPriceElement = document.querySelector(".total-price");
  const checkoutBtn = document.querySelector(".checkout-btn");
  const checkoutModal = document.querySelector(".checkout-modal");
  const confirmationModal = document.querySelector(".confirmation-modal");
  const placeOrderBtn = document.querySelector(".place-order-btn");

  // Product data (should match your products on both pages)
  const products = {
    "Vanilla Bean": {
      price: 24.99,
      image:
        "https://www.sugarsaltmagic.com/wp-content/uploads/2023/06/Vanilla-Bean-Powder-5FEAT.jpg",
      description:
        "Warm, sweet vanilla with notes of caramel and cream. Perfect for creating a cozy atmosphere.",
    },
    "Lavender Fields": {
      price: 22.99,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmSbzA-yn8U1_J3tKxNbsapZ_vA-Bric2vig&s",
      description:
        "Calming blend of lavender, bergamot and vanilla. Ideal for relaxation and stress relief.",
    },
    "Sandalwood & Amber": {
      price: 26.99,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7QALkLzz4l0za9fgzrVDhfZMwWwPZ-0VSzA&s",
      description:
        "Rich, woody fragrance with warm amber undertones. Creates an elegant, sophisticated ambiance.",
    },
    "Citrus Grove": {
      price: 21.99,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTOjZnKHssVITtv4i7skftYavUe6Md9fwMBQ&s",
      description:
        "Bright and refreshing blend of orange, lemon and grapefruit. Energizing and uplifting.",
    },
    "Rose Garden": {
      price: 25.99,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX_2EajOUmGKFWtFJ0Y7VUBbo0sCJgKalMvA&s",
      description:
        "Romantic floral scent with fresh rose petals and a hint of green stems. Perfect for bedrooms.",
    },
    "Ocean Breeze": {
      price: 23.99,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIXoZP4_3nv_N_fQfLXzhcSAA7hpslga8thg&s",
      description:
        "Fresh aquatic scent with notes of sea salt and driftwood. Brings the seaside indoors.",
    },
    "Spiced Chai": {
      price: 24.99,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFeGIC7FfhD6GG7vhyiaRkx4-EVCjj0M8ueg&s",
      description:
        "Warm and comforting with cinnamon, cardamom and black tea notes. Perfect for autumn.",
    },
    "Fresh Linen": {
      price: 20.99,
      image:
        "https://maplescandles.co.uk/media/com_eshop/products/resized/3-fresh-linen-cr-800x800.jpeg",
      description:
        "Clean and crisp like sun-dried laundry. Great for bathrooms and laundry rooms.",
    },
  };

  // Initialize cart count on page load
  updateCart();

  // Toggle Cart Modal
  cartIcon.addEventListener("click", () => {
    cartModal.classList.add("active");
    overlay.classList.add("active");
  });

  closeCart.addEventListener("click", () => {
    cartModal.classList.remove("active");
    overlay.classList.remove("active");
  });

  overlay.addEventListener("click", () => {
    cartModal.classList.remove("active");
    checkoutModal.classList.remove("active");
    confirmationModal.classList.remove("active");
    overlay.classList.remove("active");
  });

  // Add to Cart
  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productCard = e.target.closest(".product-card");
      const productName = productCard.querySelector("h3").textContent;

      // Check if product already in cart
      const existingItem = cart.find((item) => item.name === productName);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          name: productName,
          price: products[productName].price,
          image: products[productName].image,
          description: products[productName].description,
          quantity: 1,
        });
      }

      updateCart();

      // Show cart modal
      cartModal.classList.add("active");
      overlay.classList.add("active");

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

    cartItemsContainer.innerHTML = "";
    let totalPrice = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty</p>";
      checkoutBtn.style.display = "none";
    } else {
      checkoutBtn.style.display = "block";

      cart.forEach((item, index) => {
        totalPrice += item.price * item.quantity;

        const cartItemElement = document.createElement("div");
        cartItemElement.className = "cart-item";
        cartItemElement.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-info">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <p class="cart-item-price">€${item.price.toFixed(2)}</p>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn minus" data-index="${index}">-</button>
                            <input type="text" class="quantity-input" value="${
                              item.quantity
                            }" readonly>
                            <button class="quantity-btn plus" data-index="${index}">+</button>
                        </div>
                        <p class="remove-item" data-index="${index}">Remove</p>
                    </div>
                `;

        cartItemsContainer.appendChild(cartItemElement);
      });

      // Add event listeners to quantity buttons
      document.querySelectorAll(".quantity-btn.minus").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const index = e.target.getAttribute("data-index");
          if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
            updateCart();
          }
        });
      });

      document.querySelectorAll(".quantity-btn.plus").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const index = e.target.getAttribute("data-index");
          cart[index].quantity += 1;
          updateCart();
        });
      });

      // Add event listeners to remove buttons
      document.querySelectorAll(".remove-item").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const index = e.target.getAttribute("data-index");
          cart.splice(index, 1);
          updateCart();
        });
      });
    }

    totalPriceElement.textContent = `€${totalPrice.toFixed(2)}`;
    cartCount.textContent = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  // Checkout Process
  checkoutBtn.addEventListener("click", () => {
    cartModal.classList.remove("active");
    checkoutModal.classList.add("active");
  });

  placeOrderBtn.addEventListener("click", () => {
    // In a real implementation, you would send the order data to a server here
    checkoutModal.classList.remove("active");
    confirmationModal.classList.add("active");

    // Clear cart after order
    cart = [];
    updateCart();

    // Redirect after 3 seconds
    setTimeout(() => {
      confirmationModal.classList.remove("active");
      overlay.classList.remove("active");
      window.location.href = "/";
    }, 3000);
  });
});
