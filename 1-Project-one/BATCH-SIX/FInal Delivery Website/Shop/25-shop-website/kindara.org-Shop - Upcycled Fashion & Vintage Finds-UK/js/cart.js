// cart.js - Persistent Shopping Cart Functionality

// Initialize cart from localStorage or create empty array
let cart = JSON.parse(localStorage.getItem("kindaraCart")) || [];

// DOM Elements
const cartIcon = document.querySelector(".cart-icon");
const cartCount = document.querySelector(".cart-count");
const cartModal = document.getElementById("cartModal");
const closeModal = document.querySelectorAll(".close-modal");
const cartItemsContainer = document.querySelector(".cart-items");
const cartTotalAmount = document.querySelector(".cart-total-amount");
const emptyCartMessage = document.querySelector(".empty-cart-message");
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const checkoutBtn = document.querySelector(".checkout-btn");
const orderConfirmationModal = document.getElementById(
  "orderConfirmationModal"
);
const continueShoppingBtn = document.querySelector(".continue-shopping-btn");

// Product Modal Elements (if they exist on the page)
const productModal = document.getElementById("productModal");
const modalProductImg = productModal
  ? document.getElementById("modal-product-img")
  : null;
const modalProductName = productModal
  ? document.getElementById("modal-product-name")
  : null;
const modalProductPrice = productModal
  ? document.getElementById("modal-product-price")
  : null;
const modalProductRating = productModal
  ? document.getElementById("modal-product-rating")
  : null;
const modalProductDescription = productModal
  ? document.getElementById("modal-product-description")
  : null;
const modalProductDetails = productModal
  ? document.getElementById("modal-product-details")
  : null;
const modalProductUsage = productModal
  ? document.getElementById("modal-product-usage")
  : null;
const modalAddToCartBtn = productModal
  ? document.getElementById("modal-add-to-cart")
  : null;
const productQtyInput = productModal
  ? document.getElementById("product-qty")
  : null;

// Product data (should match your product IDs)
const products = {
  1: {
    name: "Lavender Essential Oil",
    price: 14.99,
    image: "https://m.media-amazon.com/images/I/81fcxcJ28ZL.jpg",
    description:
      "Lavender essential oil is known for its calming and relaxing properties.",
    details: [
      "100% pure lavender essential oil",
      "Botanical name: Lavandula angustifolia",
    ],
    usage: ["Add 2-3 drops to a diffuser", "Mix with carrier oil for massage"],
  },
  2: {
    name: "Peppermint Essential Oil",
    price: 12.99,
    image:
      "https://cdn-prod.medicalnewstoday.com/content/images/articles/319/319397/peppermint-essential-oil.jpg",
    description: "Peppermint essential oil is invigorating and refreshing.",
    details: [
      "100% pure peppermint essential oil",
      "Botanical name: Mentha piperita",
    ],
    usage: [
      "Inhale directly for mental clarity",
      "Apply to temples for headache relief",
    ],
  },
  3: {
    name: "Eucalyptus Essential Oil",
    price: 15.99,
    image: "https://www.simplyclean.com.au/cdn/shop/files/81.png?v=1728511720",
    description:
      "Eucalyptus essential oil is known for its respiratory benefits.",
    details: [
      "100% pure eucalyptus essential oil",
      "Botanical name: Eucalyptus globulus",
    ],
    usage: [
      "Add to steam inhalation for congestion",
      "Diffuse during cold season",
    ],
  },
  4: {
    name: "Tea Tree Essential Oil",
    price: 13.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbVdwIAQCdZgkRjh8XtNPtpnWjnIBDd4AEEg&s",
    description: "Tea tree essential oil is a powerful antiseptic.",
    details: [
      "100% pure tea tree essential oil",
      "Botanical name: Melaleuca alternifolia",
    ],
    usage: ["Apply diluted to acne spots", "Add to homemade cleaning products"],
  },
  5: {
    name: "Frankincense Essential Oil",
    price: 18.99,
    image:
      "https://ds.rokomari.store/rokomari110/ProductNew20190903/260X372/Rongon_Herbals_Frankincense_essential_oi-Rongon_Herbals-89d4d-295285.png",
    description:
      "Frankincense essential oil is grounding and spiritually uplifting.",
    details: [
      "100% pure frankincense essential oil",
      "Botanical name: Boswellia carterii",
    ],
    usage: [
      "Diffuse during meditation",
      "Apply to skin for anti-aging benefits",
    ],
  },
  6: {
    name: "Relaxation Blend",
    price: 22.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPtmqgGHD_rLBNb7H6zxJpQ8bqkrMTstIghA&s",
    description:
      "Our signature relaxation blend combines lavender, chamomile, and bergamot.",
    details: [
      "Blend of 100% pure essential oils",
      "Contains lavender, chamomile, bergamot",
    ],
    usage: [
      "Apply to wrists and temples when stressed",
      "Use before bedtime for better sleep",
    ],
  },
  7: {
    name: "Focus Roll-on",
    price: 16.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVvpcYcV1WW7QYWlB1bO5WGNjcHafJzOtIDQ&s",
    description:
      "Our focus blend combines peppermint, rosemary, and lemon to enhance mental clarity.",
    details: [
      "Blend of 100% pure essential oils",
      "Contains peppermint, rosemary, lemon",
    ],
    usage: [
      "Apply to back of neck when studying",
      "Use before important meetings",
    ],
  },
  8: {
    name: "Ultrasonic Diffuser",
    price: 39.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuRjBqZgYW7iliwnJuMXEOwLw0G1pToq_Yv16dRVjDukDklG2N3kBO99EEXplcRcg0BL0&usqp=CAU",
    description:
      "Our premium ultrasonic diffuser quietly disperses essential oils into the air.",
    details: ["Capacity: 300ml", "Run time: up to 8 hours", "Auto shut-off"],
    usage: [
      "Add water and 5-10 drops of essential oils",
      "Place in bedroom for better sleep",
    ],
  },
};

// Save cart to localStorage
function saveCartToStorage() {
  localStorage.setItem("kindaraCart", JSON.stringify(cart));
}

// Update cart UI
function updateCart() {
  // Update cart count
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;

  // Save to localStorage
  saveCartToStorage();

  // Update cart modal if it exists on the page
  if (cartItemsContainer) {
    if (cart.length === 0) {
      emptyCartMessage.style.display = "block";
      cartItemsContainer.innerHTML = "";
    } else {
      emptyCartMessage.style.display = "none";

      let cartHTML = "";
      let total = 0;

      cart.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartHTML += `
                    <div class="cart-item" data-id="${item.id}">
                        <div style="display: flex; align-items: center;">
                            <div class="cart-item-img">
                                <img src="${item.image}" alt="${item.name}">
                            </div>
                            <div class="cart-item-info">
                                <h4>${item.name}</h4>
                                <div class="cart-item-price">$${item.price.toFixed(
                                  2
                                )}</div>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center;">
                            <div class="cart-item-quantity">
                                <button class="decrease-quantity"><i class="fas fa-minus"></i></button>
                                <span>${item.quantity}</span>
                                <button class="increase-quantity"><i class="fas fa-plus"></i></button>
                            </div>
                            <div class="remove-item" style="margin-left: 15px;">
                                <i class="fas fa-trash"></i>
                            </div>
                        </div>
                    </div>
                `;
      });

      cartItemsContainer.innerHTML = cartHTML;
      cartTotalAmount.textContent = `$${total.toFixed(2)}`;

      // Add event listeners to quantity buttons
      document.querySelectorAll(".increase-quantity").forEach((button) => {
        button.addEventListener("click", (e) => {
          const itemId = e.target.closest(".cart-item").getAttribute("data-id");
          const item = cart.find((item) => item.id === itemId);
          item.quantity += 1;
          updateCart();
        });
      });

      document.querySelectorAll(".decrease-quantity").forEach((button) => {
        button.addEventListener("click", (e) => {
          const itemId = e.target.closest(".cart-item").getAttribute("data-id");
          const item = cart.find((item) => item.id === itemId);

          if (item.quantity > 1) {
            item.quantity -= 1;
          } else {
            // Remove item if quantity is 1
            cart = cart.filter((item) => item.id !== itemId);
          }

          updateCart();
        });
      });

      document.querySelectorAll(".remove-item").forEach((button) => {
        button.addEventListener("click", (e) => {
          const itemId = e.target.closest(".cart-item").getAttribute("data-id");
          cart = cart.filter((item) => item.id !== itemId);
          updateCart();
        });
      });
    }
  }
}

// Show add to cart animation
function showAddToCartAnimation(button) {
  const btnRect = button.getBoundingClientRect();
  const cartRect = cartIcon.getBoundingClientRect();

  const flyingItem = document.createElement("div");
  flyingItem.style.position = "fixed";
  flyingItem.style.left = `${btnRect.left + btnRect.width / 2}px`;
  flyingItem.style.top = `${btnRect.top}px`;
  flyingItem.style.width = "20px";
  flyingItem.style.height = "20px";
  flyingItem.style.backgroundColor = "var(--accent-color)";
  flyingItem.style.borderRadius = "50%";
  flyingItem.style.zIndex = "1000";
  flyingItem.style.transition = "all 0.5s ease-out";

  document.body.appendChild(flyingItem);

  setTimeout(() => {
    flyingItem.style.left = `${cartRect.left + cartRect.width / 2}px`;
    flyingItem.style.top = `${cartRect.top}px`;
    flyingItem.style.transform = "scale(0.1)";
    flyingItem.style.opacity = "0.5";
  }, 10);

  setTimeout(() => {
    flyingItem.remove();
  }, 510);
}

// Initialize cart on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCart();

  // Add to cart buttons functionality
  if (addToCartButtons) {
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const id = button.getAttribute("data-id");
        const name = button.getAttribute("data-name");
        const price = parseFloat(button.getAttribute("data-price"));
        const image = button.getAttribute("data-image");
        const quantity = 1;

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
        showAddToCartAnimation(button);
      });
    });
  }

  // Product modal functionality (if it exists on the page)
  if (productModal && modalAddToCartBtn) {
    // Open product modal when clicking "Add to Cart" (for demo purposes)
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const id = button.getAttribute("data-id");
        const product = products[id];

        // Fill modal with product data
        modalProductImg.src = product.image;
        modalProductImg.alt = product.name;
        modalProductName.textContent = product.name;
        modalProductPrice.textContent = `$${product.price.toFixed(2)}`;
        modalProductRating.innerHTML = product.rating || "";
        modalProductDescription.textContent = product.description;

        // Clear previous details
        modalProductDetails.innerHTML = "";
        modalProductUsage.innerHTML = "";

        // Add details
        product.details.forEach((detail) => {
          const li = document.createElement("li");
          li.textContent = detail;
          modalProductDetails.appendChild(li);
        });

        // Add usage
        product.usage.forEach((use) => {
          const li = document.createElement("li");
          li.textContent = use;
          modalProductUsage.appendChild(li);
        });

        // Set up add to cart button in modal
        modalAddToCartBtn.onclick = () => {
          const quantity = parseInt(productQtyInput.value);

          // Check if item already in cart
          const existingItem = cart.find((item) => item.id === id);

          if (existingItem) {
            existingItem.quantity += quantity;
          } else {
            cart.push({
              id,
              name: product.name,
              price: product.price,
              image: product.image,
              quantity,
            });
          }

          updateCart();
          showAddToCartAnimation(button);
          productModal.style.display = "none";
          document.body.style.overflow = "auto";
        };

        // Reset quantity
        productQtyInput.value = 1;

        // Show modal
        productModal.style.display = "block";
        document.body.style.overflow = "hidden";
      });
    });

    // Quantity selector in product modal
    if (productModal) {
      document.querySelector(".increase-qty").addEventListener("click", () => {
        productQtyInput.value = parseInt(productQtyInput.value) + 1;
      });

      document.querySelector(".decrease-qty").addEventListener("click", () => {
        if (parseInt(productQtyInput.value) > 1) {
          productQtyInput.value = parseInt(productQtyInput.value) - 1;
        }
      });
    }
  }

  // Open cart modal
  if (cartIcon) {
    cartIcon.addEventListener("click", () => {
      if (cartModal) {
        cartModal.style.display = "block";
        document.body.style.overflow = "hidden";
      }
    });
  }

  // Close modals
  if (closeModal) {
    closeModal.forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll(".modal").forEach((modal) => {
          modal.style.display = "none";
        });
        document.body.style.overflow = "auto";
      });
    });
  }

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      document.querySelectorAll(".modal").forEach((modal) => {
        modal.style.display = "none";
      });
      document.body.style.overflow = "auto";
    }
  });

  // Checkout button functionality
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length > 0) {
        // Validate form
        const name = document.getElementById("checkout-name").value;
        const email = document.getElementById("checkout-email").value;
        const phone = document.getElementById("checkout-phone").value;
        const address = document.getElementById("checkout-address").value;

        if (!name || !email || !phone || !address) {
          alert("Please fill in all required fields");
          return;
        }

        // In a real implementation, you would send the order data to a server here
        // For this demo, we'll just show the confirmation
        if (cartModal) cartModal.style.display = "none";
        if (orderConfirmationModal)
          orderConfirmationModal.style.display = "block";

        // Clear the cart
        cart = [];
        updateCart();

        // Clear the form
        document.getElementById("checkout-name").value = "";
        document.getElementById("checkout-email").value = "";
        document.getElementById("checkout-phone").value = "";
        document.getElementById("checkout-address").value = "";
      }
    });
  }

  // Continue shopping button functionality
  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener("click", () => {
      if (orderConfirmationModal) orderConfirmationModal.style.display = "none";
      document.body.style.overflow = "auto";
      window.location.href = "/shop/";
    });
  }

  // Product sorting (if it exists on the page)
  const sortSelect = document.getElementById("sort-products");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      // In a real implementation, this would sort the products
      // For this demo, we'll just show an alert
      alert(`Products sorted by: ${e.target.value}`);
    });
  }
});
