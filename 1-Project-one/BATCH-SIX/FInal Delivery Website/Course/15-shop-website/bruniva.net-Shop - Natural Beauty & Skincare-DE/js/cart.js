 // Mobile Menu Toggle
 const mobileMenuBtn = document.getElementById("mobile-menu-btn");
 const mainNav = document.getElementById("main-nav");

 mobileMenuBtn.addEventListener("click", () => {
   mainNav.classList.toggle("active");
   mobileMenuBtn.innerHTML = mainNav.classList.contains("active")
     ? '<i class="fas fa-times"></i>'
     : '<i class="fas fa-bars"></i>';
 });

 // Close mobile menu when clicking a link
 document.querySelectorAll("#main-nav a").forEach((link) => {
   link.addEventListener("click", () => {
     mainNav.classList.remove("active");
     mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
   });
 });

 // Product data
 const products = {
   1: {
     id: 1,
     name: "Rose Hydrating Facial Toner",
     price: 24.99,
     image:
       "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
     category: "Toner",
     description:
       "Our Rose Hydrating Facial Toner is formulated with organic rose water and hyaluronic acid to refresh, hydrate, and balance your skin pH. Perfect for all skin types, especially dry and sensitive skin.",
   },
   2: {
     id: 2,
     name: "Vitamin C Brightening Serum",
     price: 32.99,
     image:
       "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
     category: "Serum",
     description:
       "This potent Vitamin C serum helps brighten skin tone, reduce dark spots, and boost collagen production. Formulated with 20% vitamin C, ferulic acid, and vitamin E for maximum antioxidant protection.",
   },
   3: {
     id: 3,
     name: "Aloe Vera Gel Moisturizer",
     price: 19.99,
     image:
       "https://paikaree.com.bd/public/uploads/products/photos/moisturizing-gel-snail-99-percent-aloe-vera-soothing-&-moisture---200ml-paikaree.webp",
     category: "Moisturizer",
     description:
       "Pure aloe vera gel enriched with chamomile and green tea extracts to soothe, hydrate, and protect your skin. Lightweight and non-greasy formula perfect for daily use.",
   },
   4: {
     id: 4,
     name: "Charcoal Detox Face Mask",
     price: 27.99,
     image:
       "https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80",
     category: "Mask",
     description:
       "Deep cleansing charcoal mask with bentonite clay to draw out impurities, excess oil, and toxins from your pores. Leaves skin feeling refreshed and revitalized.",
   },
 };

 // Blog data
 const blogs = {
   "natural-skincare-routine": {
     title: "5 Steps to a Perfect Natural Skincare Routine",
     date: "March 15, 2025",
     image:
       "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
     content: `
               <h3>Creating an Effective Natural Skincare Routine</h3>
               <p>Building a skincare routine with natural products doesn't have to be complicated. Follow these five simple steps to achieve healthy, glowing skin using only the power of nature.</p>
               
               <h4>Step 1: Cleanse Gently</h4>
               <p>Start with a natural cleanser that removes impurities without stripping your skin of its natural oils. Look for ingredients like coconut oil, honey, or aloe vera which cleanse while maintaining your skin's moisture barrier.</p>
               
               <h4>Step 2: Tone for Balance</h4>
               <p>A good natural toner helps restore your skin's pH balance after cleansing. Rose water, witch hazel, or green tea make excellent natural toners that soothe and prepare your skin for the next steps.</p>
               
               <h4>Step 3: Treat with Serums</h4>
               <p>Natural serums packed with plant extracts can target specific concerns like aging, dryness, or acne. Vitamin C from citrus fruits, hyaluronic acid from plant sources, or rosehip oil are powerful natural treatments.</p>
               
               <h4>Step 4: Moisturize Daily</h4>
               <p>Even oily skin needs hydration. Natural moisturizers like shea butter, jojoba oil, or aloe vera gel provide essential hydration without clogging pores or causing irritation.</p>
               
               <h4>Step 5: Protect with SPF</h4>
               <p>During the day, always finish with a natural sunscreen. Zinc oxide is a natural mineral that provides excellent broad-spectrum protection without harmful chemicals.</p>
               
               <p>Remember, consistency is key with any skincare routine. Give natural products time to work - you'll be amazed at the results!</p>
           `,
   },
   "aloe-vera-benefits": {
     title: "The Amazing Benefits of Aloe Vera for Your Skin",
     date: "April 28, 2025",
     image:
       "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
     content: `
               <h3>Why Aloe Vera is a Skincare Superstar</h3>
               <p>For centuries, aloe vera has been used for its remarkable healing properties. Modern science confirms what ancient cultures knew - this succulent plant offers incredible benefits for your skin.</p>
               
               <h4>1. Soothes Sunburns and Irritation</h4>
               <p>Aloe vera's most famous benefit is its ability to soothe sunburns. The gel contains compounds like polysaccharides and glycoproteins that reduce inflammation and promote healing. It's also effective for other skin irritations like rashes or minor burns.</p>
               
               <h4>2. Deeply Hydrates Without Greasiness</h4>
               <p>Unlike heavy creams, aloe vera provides deep hydration without leaving a greasy residue. It's perfect for all skin types, especially oily or acne-prone skin that needs moisture without clogging pores.</p>
               
               <h4>3. Fights Acne and Breakouts</h4>
               <p>Aloe contains antimicrobial and anti-inflammatory properties that help combat acne-causing bacteria. It also contains salicylic acid which gently exfoliates and unclogs pores.</p>
               
               <h4>4. Reduces Signs of Aging</h4>
               <p>Packed with antioxidants like vitamins C and E, aloe vera helps combat free radical damage that leads to wrinkles. It also stimulates collagen production for firmer, more youthful skin.</p>
               
               <h4>5. Lightens Dark Spots and Blemishes</h4>
               <p>Aloe contains aloin, a natural depigmenting compound that can help fade hyperpigmentation and even out skin tone with regular use.</p>
               
               <p>To incorporate aloe vera into your routine, use pure aloe gel as a moisturizer, mix it with other natural ingredients for masks, or look for products that feature aloe as a main ingredient.</p>
           `,
   },
   "sustainable-beauty": {
     title: "How to Transition to Sustainable Beauty Products",
     date: "April 10, 2025",
     image:
       "https://earth.org/wp-content/uploads/2021/05/unnamed-100.jpeg",
     content: `
               <h3>Creating an Eco-Friendly Beauty Routine</h3>
               <p>Transitioning to sustainable beauty doesn't mean sacrificing results. With these simple swaps, you can reduce your environmental impact while still enjoying effective skincare and cosmetics.</p>
               
               <h4>1. Choose Products with Sustainable Packaging</h4>
               <p>Look for brands that use recycled materials, glass containers, or refillable systems. Avoid excessive plastic packaging and single-use products whenever possible.</p>
               
               <h4>2. Prioritize Multi-Use Products</h4>
               <p>Reduce your product count by choosing items that serve multiple purposes. A tinted moisturizer with SPF, for example, combines three steps in one.</p>
               
               <h4>3. Support Clean, Green Formulas</h4>
               <p>Opt for products with natural, biodegradable ingredients that won't harm waterways when washed down the drain. Avoid microplastics, synthetic fragrances, and other potentially harmful chemicals.</p>
               
               <h4>4. Consider Your Water Usage</h4>
               <p>Waterless beauty products (like solid shampoos or concentrated serums) reduce water waste in both production and use. They're often more travel-friendly too!</p>
               
               <h4>5. Make Mindful Purchases</h4>
               <p>Instead of constantly trying new products, focus on finding staples that work for you. This reduces waste from discarded products and unnecessary purchases.</p>
               
               <h4>6. DIY When Possible</h4>
               <p>Simple ingredients from your kitchen (like honey, oatmeal, or coconut oil) can be surprisingly effective for many beauty needs, with zero packaging waste.</p>
               
               <p>Remember, sustainability is a journey. Start with a few changes and gradually incorporate more eco-friendly habits into your routine.</p>
           `,
   },
 };

 // Cart Functionality
 let cart = JSON.parse(localStorage.getItem('bruniva-cart')) || [];

 // DOM Elements
 const cartIcon = document.getElementById("cart-icon");
 const cartModal = document.getElementById("cart-modal");
 const closeCartModal = document.getElementById("close-cart-modal");
 const cartItemsContainer = document.getElementById("cart-items");
 const cartItemCount = document.querySelector(".cart-count");
 const cartTotalPrice = document.getElementById("cart-total-price");
 const cartItemCountText = document.getElementById("cart-item-count");
 const checkoutBtn = document.getElementById("checkout-btn");
 const checkoutModal = document.getElementById("checkout-modal");
 const closeCheckoutModal = document.getElementById("close-checkout-modal");
 const checkoutForm = document.getElementById("checkout-form");
 const orderConfirmationModal = document.getElementById("order-confirmation-modal");
 const productModal = document.getElementById("product-modal");
 const closeProductModal = document.getElementById("close-product-modal");
 const productModalBody = document.getElementById("product-modal-body");
 const blogModal = document.getElementById("blog-modal");
 const closeBlogModal = document.getElementById("close-blog-modal");
 const blogModalBody = document.getElementById("blog-modal-body");
 const filterButtons = document.querySelectorAll(".filter-btn");
 const productCards = document.querySelectorAll(".product-card");

 // Initialize cart display
 updateCart();

 // Filter products
 filterButtons.forEach(button => {
   button.addEventListener('click', () => {
     // Remove active class from all buttons
     filterButtons.forEach(btn => btn.classList.remove('active'));
     // Add active class to clicked button
     button.classList.add('active');
     
     const filter = button.dataset.filter;
     
     productCards.forEach(card => {
       if (filter === 'all' || card.dataset.category === filter) {
         card.style.display = 'block';
       } else {
         card.style.display = 'none';
       }
     });
   });
 });

 // Add to Cart Functionality
 document.querySelectorAll('.add-to-cart-btn').forEach(button => {
   button.addEventListener('click', (e) => {
     e.preventDefault();
     const productId = parseInt(button.dataset.productId);
     addToCart(productId);
   });
 });

 // View Product Details
 document.querySelectorAll('.view-btn').forEach(button => {
   button.addEventListener('click', (e) => {
     e.preventDefault();
     const productId = parseInt(button.dataset.productId);
     showProductDetails(productId);
   });
 });

 // View Blog Details
 document.querySelectorAll('.view-blog-btn').forEach(button => {
   button.addEventListener('click', (e) => {
     e.preventDefault();
     const blogId = button.dataset.blogId;
     showBlogDetails(blogId);
   });
 });

 // Add to Cart Function
 function addToCart(productId) {
   const product = products[productId];
   const existingItem = cart.find((item) => item.id === productId);

   if (existingItem) {
     existingItem.quantity += 1;
   } else {
     cart.push({
       id: productId,
       name: product.name,
       price: product.price,
       image: product.image,
       quantity: 1,
     });
   }

   // Save to local storage
   localStorage.setItem('bruniva-cart', JSON.stringify(cart));
   
   updateCart();

   // Show cart modal when adding an item
   cartModal.style.display = "block";
   document.body.style.overflow = "hidden";
 }

 // Show Product Details
 function showProductDetails(productId) {
   const product = products[productId];
   
   productModalBody.innerHTML = `
     <div class="product-detail">
       <div class="product-detail-img">
         <img src="${product.image}" alt="${product.name}">
       </div>
       <div class="product-detail-info">
         <span class="product-category">${product.category}</span>
         <h2>${product.name}</h2>
         <div class="product-price">$${product.price.toFixed(2)}</div>
         <p class="product-description">${product.description}</p>
         <button class="btn add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
       </div>
     </div>
   `;

   // Add event listener to the new Add to Cart button
   productModalBody.querySelector('.add-to-cart-btn').addEventListener('click', (e) => {
     e.preventDefault();
     addToCart(product.id);
   });

   productModal.style.display = "block";
   document.body.style.overflow = "hidden";
 }

 // Show Blog Details
 function showBlogDetails(blogId) {
   const blog = blogs[blogId];
   
   blogModalBody.innerHTML = `
     <div class="blog-detail">
       <div class="blog-detail-img">
         <img src="${blog.image}" alt="${blog.title}">
       </div>
       <div class="blog-detail-content">
         <div class="blog-date">${blog.date}</div>
         <h2>${blog.title}</h2>
         <div class="blog-full-content">
           ${blog.content}
         </div>
       </div>
     </div>
   `;

   blogModal.style.display = "block";
   document.body.style.overflow = "hidden";
 }

 // Update Cart Display
 function updateCart() {
   // Update cart count
   const totalItems = cart.reduce(
     (total, item) => total + item.quantity,
     0
   );
   cartItemCount.textContent = totalItems;
   cartItemCountText.textContent = `${totalItems} ${
     totalItems === 1 ? "item" : "items"
   }`;

   // Update cart items list
   if (cart.length === 0) {
     cartItemsContainer.innerHTML = `
       <div class="empty-cart-message">
         <p>Your cart is currently empty.</p>
       </div>
     `;
   } else {
     cartItemsContainer.innerHTML = cart
       .map(
         (item) => `
           <div class="cart-item" data-id="${item.id}">
             <div class="cart-item-img">
               <img src="${item.image}" alt="${item.name}">
             </div>
             <div class="cart-item-details">
               <h4 class="cart-item-title">${item.name}</h4>
               <div class="cart-item-price">$${item.price.toFixed(2)}</div>
               <div class="cart-quantity">
                 <button class="quantity-btn decrease-btn">-</button>
                 <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                 <button class="quantity-btn increase-btn">+</button>
               </div>
             </div>
             <div class="cart-item-remove">
               <i class="fas fa-times"></i>
             </div>
           </div>
         `
       )
       .join("");

     // Add event listeners to quantity buttons
     document.querySelectorAll(".decrease-btn").forEach((btn) => {
       btn.addEventListener("click", (e) => {
         const itemId = parseInt(e.target.closest(".cart-item").dataset.id);
         const item = cart.find((item) => item.id === itemId);

         if (item.quantity > 1) {
           item.quantity -= 1;
         } else {
           cart = cart.filter((item) => item.id !== itemId);
         }

         // Save to local storage
         localStorage.setItem('bruniva-cart', JSON.stringify(cart));
         updateCart();
       });
     });

     document.querySelectorAll(".increase-btn").forEach((btn) => {
       btn.addEventListener("click", (e) => {
         const itemId = parseInt(e.target.closest(".cart-item").dataset.id);
         const item = cart.find((item) => item.id === itemId);
         item.quantity += 1;
         
         // Save to local storage
         localStorage.setItem('bruniva-cart', JSON.stringify(cart));
         updateCart();
       });
     });

     // Add event listeners to remove buttons
     document.querySelectorAll(".cart-item-remove").forEach((btn) => {
       btn.addEventListener("click", (e) => {
         const itemId = parseInt(e.target.closest(".cart-item").dataset.id);
         cart = cart.filter((item) => item.id !== itemId);
         
         // Save to local storage
         localStorage.setItem('bruniva-cart', JSON.stringify(cart));
         updateCart();
       });
     });
   }

   // Update total price
   const totalPrice = cart.reduce(
     (total, item) => total + item.price * item.quantity,
     0
   );
   cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
 }

 // Open/Close Cart Modal
 cartIcon.addEventListener("click", (e) => {
   e.preventDefault();
   cartModal.style.display = "block";
   document.body.style.overflow = "hidden";
 });

 closeCartModal.addEventListener("click", () => {
   cartModal.style.display = "none";
   document.body.style.overflow = "auto";
 });

 // Close modals when clicking outside
 window.addEventListener("click", (e) => {
   if (e.target === cartModal) {
     cartModal.style.display = "none";
     document.body.style.overflow = "auto";
   }
   if (e.target === checkoutModal) {
     checkoutModal.style.display = "none";
     document.body.style.overflow = "auto";
   }
   if (e.target === orderConfirmationModal) {
     orderConfirmationModal.style.display = "none";
     document.body.style.overflow = "auto";
   }
   if (e.target === productModal) {
     productModal.style.display = "none";
     document.body.style.overflow = "auto";
   }
   if (e.target === blogModal) {
     blogModal.style.display = "none";
     document.body.style.overflow = "auto";
   }
 });

 // Close product modal
 closeProductModal.addEventListener("click", () => {
   productModal.style.display = "none";
   document.body.style.overflow = "auto";
 });

 // Close blog modal
 closeBlogModal.addEventListener("click", () => {
   blogModal.style.display = "none";
   document.body.style.overflow = "auto";
 });

 // Checkout Process
 checkoutBtn.addEventListener("click", () => {
   if (cart.length === 0) return;

   cartModal.style.display = "none";
   checkoutModal.style.display = "block";
 });

 closeCheckoutModal.addEventListener("click", () => {
   checkoutModal.style.display = "none";
   document.body.style.overflow = "auto";
 });

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

   // Clear cart
   cart = [];
   localStorage.removeItem('bruniva-cart');
   updateCart();

   // Reset form
   checkoutForm.reset();

   // Close confirmation after 5 seconds
   setTimeout(() => {
     orderConfirmationModal.style.display = "none";
     document.body.style.overflow = "auto";
   }, 5000);
 });