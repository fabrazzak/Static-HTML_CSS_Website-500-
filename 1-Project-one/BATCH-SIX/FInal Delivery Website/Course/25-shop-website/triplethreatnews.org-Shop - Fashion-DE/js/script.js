// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mainNav = document.getElementById("mainNav");

mobileMenuBtn.addEventListener("click", () => {
  mainNav.classList.toggle("active");
});

// Shopping Cart Functionality
let cart = [];

// Load cart from localStorage when page loads
function loadCartFromStorage() {
  const savedCart = localStorage.getItem("tripleThreatCart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartCount();
  }
}

// Save cart to localStorage
function saveCartToStorage() {
  localStorage.setItem("tripleThreatCart", JSON.stringify(cart));
}

// Call loadCartFromStorage when page loads
document.addEventListener("DOMContentLoaded", loadCartFromStorage);

// DOM Elements for Cart
const cartIcon = document.getElementById("cartIcon");
const cartCount = document.getElementById("cartCount");
const cartModal = document.getElementById("cartModal");
const closeCartModal = document.getElementById("closeCartModal");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const checkoutForm = document.getElementById("checkoutForm");
const orderConfirmationModal = document.getElementById(
  "orderConfirmationModal"
);
const closeOrderModal = document.getElementById("closeOrderModal");
const continueShoppingBtn = document.getElementById("continueShoppingBtn");
const addToCartButtons = document.querySelectorAll(".add-to-cart");

// Open Cart Modal
cartIcon.addEventListener("click", () => {
  updateCartDisplay();
  cartModal.style.display = "block";
  document.body.style.overflow = "hidden";
});

// Close Cart Modal
closeCartModal.addEventListener("click", () => {
  cartModal.style.display = "none";
  document.body.style.overflow = "auto";
});

// Close Order Confirmation Modal
closeOrderModal.addEventListener("click", () => {
  orderConfirmationModal.style.display = "none";
  document.body.style.overflow = "auto";
});

// Continue Shopping Button
continueShoppingBtn.addEventListener("click", () => {
  orderConfirmationModal.style.display = "none";
  document.body.style.overflow = "auto";
});

// Close modals when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === cartModal) {
    cartModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
  if (e.target === orderConfirmationModal) {
    orderConfirmationModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// Add to Cart Functionality
if (addToCartButtons.length > 0) {
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      const name = button.getAttribute("data-name");
      const price = parseFloat(button.getAttribute("data-price"));
      const image = button.getAttribute("data-image");

      // Check if item already exists in cart
      const existingItem = cart.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id,
          name,
          price,
          image,
          quantity: 1,
        });
      }

      updateCartCount();
      saveCartToStorage();

      // Show added to cart feedback
      button.textContent = "Added!";
      setTimeout(() => {
        button.textContent = "Add to Cart";
      }, 1000);
    });
  });
}

// Update Cart Count
function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = count;
}

// Update Cart Display
function updateCartDisplay() {
  if (cart.length === 0) {
    cartItems.innerHTML =
      '<p class="empty-cart-message">Your cart is empty</p>';
    cartTotal.textContent = "0.00";
    return;
  }

  let itemsHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    itemsHTML += `
            <div class="cart-item">
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)} x ${
      item.quantity
    }</p>
                </div>
                <div class="cart-item-remove" data-id="${item.id}">
                    <i class="fas fa-times"></i>
                </div>
            </div>
        `;
  });

  cartItems.innerHTML = itemsHTML;
  cartTotal.textContent = total.toFixed(2);

  // Add event listeners to remove buttons
  document.querySelectorAll(".cart-item-remove").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      cart = cart.filter((item) => item.id !== id);
      updateCartDisplay();
      updateCartCount();
      saveCartToStorage();
    });
  });
}

// Checkout Form Submission
if (checkoutForm) {
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    cartModal.style.display = "none";
    orderConfirmationModal.style.display = "block";

    // Clear cart
    cart = [];
    updateCartCount();
    saveCartToStorage();

    // Reset form
    checkoutForm.reset();
  });
}

// Blog Modal Functionality
const blogModal = document.getElementById("blogModal");
const closeBlogModal = document.getElementById("closeBlogModal");
const blogModalContent = document.getElementById("blogModalContent");
const readMoreButtons = document.querySelectorAll(".read-more");

// Blog Data
const blogData = {
  1: {
    title: "Top Summer Fashion Trends 2025",
    date: "March 15, 2025",
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    content: `
            <h2>Top Summer Fashion Trends 2025</h2>
            <p class="blog-date">March 15, 2025</p>
            <div class="blog-modal-img">
                <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Summer Fashion Trends">
            </div>
            <div class="blog-modal-text">
                <p>This summer is all about bold colors, lightweight fabrics, and sustainable fashion. Here are the top trends you need to know:</p>
                <h3>1. Vibrant Colors</h3>
                <p>Say goodbye to muted tones. This season is all about electric blues, fiery reds, and sunny yellows. Designers are embracing color in a big way, with many opting for monochromatic looks in these bold hues.</p>
                <h3>2. Eco-Friendly Materials</h3>
                <p>Sustainability continues to dominate the fashion world. Look for pieces made from organic cotton, bamboo, and recycled materials. Many brands are now offering full transparency about their manufacturing processes.</p>
                <h3>3. Oversized Silhouettes</h3>
                <p>Comfort meets style with loose, flowing garments that keep you cool while making a statement. Pair an oversized linen shirt with tailored shorts for the perfect summer look.</p>
                <h3>4. Statement Accessories</h3>
                <p>Chunky jewelry, wide-brimmed hats, and bold sunglasses are must-haves this season. Don't be afraid to mix metals and textures for a truly unique look.</p>
                <p>Remember, the best fashion is what makes you feel confident and comfortable. Use these trends as inspiration, but always stay true to your personal style.</p>
            </div>
        `,
  },
  2: {
    title: "How to Build a Sustainable Wardrobe",
    date: "April 28, 2025",
    image:
      "https://images.unsplash.com/photo-1483181957632-8bda974cbc91?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    content: `
            <h2>How to Build a Sustainable Wardrobe</h2>
            <p class="blog-date">April 28, 2025</p>
            <div class="blog-modal-img">
                <img src="https://images.unsplash.com/photo-1483181957632-8bda974cbc91?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Sustainable Fashion">
            </div>
            <div class="blog-modal-text">
                <p>Creating a sustainable wardrobe is easier than you think. Follow these steps to build a collection that's both stylish and eco-friendly:</p>
                <h3>1. Quality Over Quantity</h3>
                <p>Invest in fewer, higher-quality pieces that will last for years. Look for well-constructed garments with strong seams and durable fabrics.</p>
                <h3>2. Natural Fibers</h3>
                <p>Choose clothing made from natural materials like organic cotton, linen, hemp, and wool. These fibers are biodegradable and often require fewer chemicals to produce.</p>
                <h3>3. Secondhand Shopping</h3>
                <p>Thrift stores, consignment shops, and online resale platforms are treasure troves for unique finds. Giving clothes a second life reduces waste and saves money.</p>
                <h3>4. Care for Your Clothes</h3>
                <p>Extend the life of your garments by washing them less frequently, using cold water, and air drying when possible. Learn basic repairs to fix minor issues.</p>
                <h3>5. Support Ethical Brands</h3>
                <p>Research brands that prioritize fair wages, safe working conditions, and environmentally friendly practices. Many now offer transparency about their supply chains.</p>
                <p>Building a sustainable wardrobe is a journey, not a destination. Start small by making one conscious choice at a time, and soon you'll have a closet that reflects your values without sacrificing style.</p>
            </div>
        `,
  },
  3: {
    title: "The Art of Accessorizing: Elevate Any Outfit",
    date: "April 10, 2025",
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    content: `
            <h2>The Art of Accessorizing: Elevate Any Outfit</h2>
            <p class="blog-date">April 10, 2025</p>
            <div class="blog-modal-img">
                <img src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Accessorizing Outfits">
            </div>
            <div class="blog-modal-text">
                <p>Accessories can transform an ordinary outfit into something extraordinary. Here's how to master the art of accessorizing:</p>
                <h3>1. Start with a Focal Point</h3>
                <p>Choose one statement piece to build your look around, whether it's a bold necklace, colorful scarf, or eye-catching handbag. Let this be the star of your outfit.</p>
                <h3>2. Balance is Key</h3>
                <p>If you're wearing large earrings, consider skipping a necklace. Pair a chunky bracelet with delicate rings. The goal is to create harmony, not competition.</p>
                <h3>3. Mix Textures</h3>
                <p>Combine different materials like leather, metal, and fabric for visual interest. A silk scarf with a metallic bag adds dimension to even the simplest outfit.</p>
                <h3>4. Consider Color</h3>
                <p>Accessories are a great way to introduce pops of color. Choose hues that complement your outfit or go bold with contrasting colors for a dramatic effect.</p>
                <h3>5. Don't Forget Function</h3>
                <p>The best accessories are both stylish and practical. A roomy tote that holds your essentials or a watch that keeps you punctual adds value beyond aesthetics.</p>
                <p>Remember, accessories are an expression of your personality. There are no hard rules—only guidelines to help you discover what works for you. Experiment, have fun, and let your accessories tell your story.</p>
            </div>
        `,
  },
  4: {
    title: "Minimalist Fashion: Less is More",
    date: "March 22, 2025",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    content: `
            <h2>Minimalist Fashion: Less is More</h2>
            <p class="blog-date">March 22, 2025</p>
            <div class="blog-modal-img">
                <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Minimalist Fashion">
            </div>
            <div class="blog-modal-text">
                <p>Minimalist fashion is about intentional choices and quality over quantity. Here's how to embrace this timeless approach to style:</p>
                <h3>1. Define Your Color Palette</h3>
                <p>Choose 3-5 neutral colors that work well together and complement your skin tone. This creates a cohesive wardrobe where everything mixes and matches effortlessly.</p>
                <h3>2. Invest in Quality Basics</h3>
                <p>Build your foundation with well-made essentials: a perfect white shirt, tailored trousers, a little black dress, and comfortable yet stylish shoes.</p>
                <h3>3. Embrace Simple Silhouettes</h3>
                <p>Clean lines and classic cuts never go out of style. Look for pieces with timeless designs that flatter your body shape.</p>
                <h3>4. Mindful Purchasing</h3>
                <p>Before buying, ask yourself: Does this fit my style? Can I wear it multiple ways? Is it made to last? This reduces impulse buys and closet clutter.</p>
                <h3>5. Care for Your Clothes</h3>
                <p>Proper maintenance extends the life of your garments. Follow care instructions, store items properly, and make minor repairs when needed.</p>
                <p>Minimalist fashion isn't about deprivation—it's about curating a wardrobe that reflects your personal style while reducing decision fatigue and environmental impact. When every piece you own is something you love to wear, getting dressed becomes a joy rather than a chore.</p>
            </div>
        `,
  },
  5: {
    title: "Color Theory in Fashion: What Works for You",
    date: "March 5, 2025",
    image:
      "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    content: `
            <h2>Color Theory in Fashion: What Works for You</h2>
            <p class="blog-date">March 5, 2025</p>
            <div class="blog-modal-img">
                <img src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Color Theory in Fashion">
            </div>
            <div class="blog-modal-text">
                <p>Understanding color theory can transform your wardrobe and enhance your natural features. Here's how to use color to your advantage:</p>
                <h3>1. Determine Your Undertones</h3>
                <p>Cool undertones look best in jewel tones and icy pastels, while warm undertones shine in earthy hues and golden shades. Neutral undertones can wear almost any color.</p>
                <h3>2. The Color Wheel</h3>
                <p>Complementary colors (opposite on the wheel) create vibrant contrast. Analogous colors (next to each other) offer harmonious combinations. Monochromatic looks use varying shades of one color.</p>
                <h3>3. Color Psychology</h3>
                <p>Different colors evoke different emotions. Blue conveys trust, red exudes confidence, yellow radiates happiness, and green suggests balance. Choose colors that reflect how you want to feel.</p>
                <h3>4. Seasonal Color Analysis</h3>
                <p>While not strict rules, seasonal palettes can guide your choices: Winters (cool, clear), Springs (warm, bright), Summers (cool, soft), Autumns (warm, muted).</p>
                <h3>5. Practical Tips</h3>
                <p>Use color to highlight your best features—a bright top draws attention upward. Neutral outfits with one pop of color create focal points. Darker shades minimize, lighter shades emphasize.</p>
                <p>Remember, these are guidelines, not rules. The most important factor is how the color makes you feel. If you love a color and feel confident wearing it, that confidence will shine through regardless of traditional color theory.</p>
            </div>
        `,
  },
  6: {
    title: "Denim Styles That Never Go Out of Fashion",
    date: "February 18, 2025",
    image:
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    content: `
            <h2>Denim Styles That Never Go Out of Fashion</h2>
            <p class="blog-date">February 18, 2025</p>
            <div class="blog-modal-img">
                <img src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Denim Styles">
            </div>
            <div class="blog-modal-text">
                <p>Denim is a wardrobe staple that transcends trends. These timeless styles will serve you well for years to come:</p>
                <h3>1. The Classic Blue Jeans</h3>
                <p>A medium-wash, straight-leg jean in a flattering rise works for nearly every body type. Look for 100% cotton for longevity and authentic fade patterns.</p>
                <h3>2. The Denim Jacket</h3>
                <p>A medium-wash trucker jacket layers beautifully over dresses, with tees, or under coats. The slightly cropped length is most versatile.</p>
                <h3>3. The White Jeans</h3>
                <p>Crisp white denim in a straight or slightly tapered cut looks fresh year-round. Choose a weight that's not see-through but still comfortable.</p>
                <h3>4. The Black Skinny Jean</h3>
                <p>An essential for creating sleek silhouettes. The slight stretch in modern denim makes this style both comfortable and flattering.</p>
                <h3>5. The Denim Shirt</h3>
                <p>A lighter wash chambray shirt works as a casual top, light jacket, or layered piece. The versatility makes it worth the investment.</p>
                <h3>Care Tips for Longevity</h3>
                <p>Wash denim inside out in cold water to preserve color. Air dry when possible to prevent shrinkage. For raw denim, wait as long as possible before the first wash to set creases naturally.</p>
                <p>While denim trends come and go, these foundational pieces remain relevant season after season. Invest in quality denim that fits well, and you'll have reliable staples that only get better with time.</p>
            </div>
        `,
  },
};

// Open Blog Modal
readMoreButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const blogId = button.getAttribute("data-blog-id");
    const blog = blogData[blogId];

    if (blog) {
      blogModalContent.innerHTML = blog.content;
      blogModal.style.display = "block";
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    }
  });
});

// Close Blog Modal
closeBlogModal.addEventListener("click", () => {
  blogModal.style.display = "none";
  document.body.style.overflow = "auto"; // Re-enable scrolling
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === blogModal) {
    blogModal.style.display = "none";
    document.body.style.overflow = "auto"; // Re-enable scrolling
  }
});
