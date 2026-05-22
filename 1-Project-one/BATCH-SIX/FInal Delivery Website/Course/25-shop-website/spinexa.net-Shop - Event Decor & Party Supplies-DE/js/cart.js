// products.js - Product related functionality for all pages

document.addEventListener("DOMContentLoaded", function () {
  // Initialize cart functionality
  initCart();

  // Initialize product filtering if filter elements exist
  if (document.querySelector(".products-filter")) {
    initProductFilters();
  }

  // Initialize wishlist functionality
  initWishlist();

  // Initialize product animations
  initProductAnimations();
});

// Cart Functionality
function initCart() {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const cartCount = document.querySelector(".cart-count");

  // Load cart items from localStorage if available
  let cartItems = localStorage.getItem("cartItems")
    ? parseInt(localStorage.getItem("cartItems"))
    : 0;
  if (cartCount) cartCount.textContent = cartItems;

  // Add to cart functionality
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      if (!this.disabled) {
        cartItems++;
        if (cartCount) cartCount.textContent = cartItems;
        localStorage.setItem("cartItems", cartItems);
        showNotification("Item added to cart!");
      }
    });
  });
}

// Product Filtering
function initProductFilters() {
  const priceRange = document.getElementById("priceRange");
  const productsGrid = document.getElementById("productsGrid");
  const filterButtons = document.querySelectorAll(".filter-btn");

  // Set initial price range display
  if (priceRange) {
    document.querySelector(".price-values span:last-child").textContent =
      "$" + priceRange.value;

    priceRange.addEventListener("input", function () {
      document.querySelector(".price-values span:last-child").textContent =
        "$" + this.value;
      applyFilters();
    });
  }

  // Filter button functionality
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons in the same group
      const parentGroup = this.closest(".filter-group");
      const buttonsInGroup = parentGroup.querySelectorAll(".filter-btn");
      buttonsInGroup.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Apply filters
      applyFilters();
    });
  });

  // Function to apply all filters
  function applyFilters() {
    const selectedCategory =
      document.querySelector(".filter-btn[data-category].active")?.dataset
        .category || "all";
    const maxPrice = parseInt(priceRange?.value) || 200;
    const sortBy =
      document.querySelector(".filter-btn[data-sort].active")?.dataset.sort ||
      "featured";
    const availability =
      document.querySelector(".filter-btn[data-availability].active")?.dataset
        .availability || "all";

    const products = Array.from(productsGrid.querySelectorAll(".product-card"));

    // Filter by category
    if (selectedCategory !== "all") {
      products.forEach((product) => {
        if (product.dataset.category !== selectedCategory) {
          product.style.display = "none";
        } else {
          product.style.display = "";
        }
      });
    } else {
      products.forEach((product) => (product.style.display = ""));
    }

    // Filter by price
    products.forEach((product) => {
      if (parseFloat(product.dataset.price) > maxPrice) {
        product.style.display = "none";
      } else if (product.style.display !== "none") {
        product.style.display = "";
      }
    });

    // Filter by availability
    if (availability === "in-stock") {
      products.forEach((product) => {
        if (product.dataset.stock === "false") {
          product.style.display = "none";
        } else if (product.style.display !== "none") {
          product.style.display = "";
        }
      });
    }

    // Sort products
    let sortedProducts = products.filter((p) => p.style.display !== "none");

    switch (sortBy) {
      case "price-low":
        sortedProducts.sort(
          (a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price)
        );
        break;
      case "price-high":
        sortedProducts.sort(
          (a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price)
        );
        break;
      case "newest":
        sortedProducts.sort(
          (a, b) => new Date(b.dataset.date) - new Date(a.dataset.date)
        );
        break;
      default: // featured
        // Keep original order
        break;
    }

    // Re-append sorted products
    sortedProducts.forEach((product) => {
      productsGrid.appendChild(product);
    });
  }
}

// Wishlist Functionality
function initWishlist() {
  const wishlistButtons = document.querySelectorAll(".wishlist-btn");

  wishlistButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const icon = this.querySelector("i");
      if (icon.classList.contains("far")) {
        icon.classList.remove("far");
        icon.classList.add("fas");
        icon.style.color = "#e83e8c";
        showNotification("Added to wishlist!");
      } else {
        icon.classList.remove("fas");
        icon.classList.add("far");
        icon.style.color = "";
      }
    });
  });
}

// Product Animations
function initProductAnimations() {
  // Create keyframes for notifications
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeOut {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(20px); }
    }
  `;
  document.head.appendChild(style);

  // Simple scroll animation for product sections
  const productSections = document.querySelectorAll(".products-section");

  function checkScroll() {
    productSections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight - 100) {
        section.style.opacity = "1";
        section.style.transform = "translateY(0)";
      }
    });
  }

  // Set initial state
  productSections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(50px)";
    section.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  window.addEventListener("scroll", checkScroll);
  window.addEventListener("load", checkScroll);
  checkScroll();
}

// Helper function to show notifications
function showNotification(message) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.position = "fixed";
  notification.style.bottom = "20px";
  notification.style.right = "20px";
  notification.style.backgroundColor = "#e83e8c";
  notification.style.color = "white";
  notification.style.padding = "10px 20px";
  notification.style.borderRadius = "4px";
  notification.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
  notification.style.zIndex = "1000";
  notification.style.animation = "fadeIn 0.3s ease";

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "fadeOut 0.3s ease";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 2000);
}
