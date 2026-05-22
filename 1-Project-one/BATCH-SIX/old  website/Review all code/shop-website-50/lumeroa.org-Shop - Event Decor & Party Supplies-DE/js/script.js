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
 const cartIcon = document.getElementById("cart-icon");
 const cartDropdown = document.getElementById("cart-dropdown");
 const cartCount = document.getElementById("cart-count");
 const cartItems = document.getElementById("cart-items");
 const cartTotal = document.getElementById("cart-total");
 const addToCartButtons = document.querySelectorAll(".add-to-cart");
 const proceedCheckoutBtn = document.getElementById("proceed-checkout");
 const checkoutModal = document.getElementById("checkout-modal");
 const thankyouModal = document.getElementById("thankyou-modal");
 const checkoutForm = document.getElementById("checkout-form");
 const closeThankyouBtn = document.getElementById("close-thankyou");

 // Initialize cart from localStorage
 let cart = JSON.parse(localStorage.getItem("cart")) || [];

 // Update cart display
 function updateCartDisplay() {
   // Update count
   const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
   cartCount.textContent = itemCount;
   
   // Update items list
   cartItems.innerHTML = '';
   
   if (cart.length === 0) {
     cartItems.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
     cartTotal.textContent = '$0.00';
     return;
   }
   
   let total = 0;
   
   cart.forEach(item => {
     const cartItem = document.createElement('div');
     cartItem.className = 'cart-item';
     cartItem.innerHTML = `
       <img src="${item.image}" alt="${item.name}">
       <div class="cart-item-details">
         <h4 class="cart-item-title">${item.name}</h4>
         <p class="cart-item-price">$${item.price} x ${item.quantity}</p>
       </div>
       <span class="remove-item" data-id="${item.id}">&times;</span>
     `;
     cartItems.appendChild(cartItem);
     
     total += parseFloat(item.price) * item.quantity;
   });
   
   // Update total
   cartTotal.textContent = `$${total.toFixed(2)}`;
   
   // Add event listeners to remove buttons
   document.querySelectorAll('.remove-item').forEach(button => {
     button.addEventListener('click', function() {
       const itemId = this.getAttribute('data-id');
       removeFromCart(itemId);
     });
   });
 }

 // Add to cart
 function addToCart(id, name, price, image) {
   const existingItem = cart.find(item => item.id === id);
   
   if (existingItem) {
     existingItem.quantity += 1;
   } else {
     cart.push({
       id,
       name,
       price,
       image,
       quantity: 1
     });
   }
   
   // Save to localStorage
   localStorage.setItem("cart", JSON.stringify(cart));
   
   // Update display
   updateCartDisplay();
   
   // Show cart dropdown
   cartDropdown.classList.add('active');
   
   // Show confirmation
   alert(`${name} has been added to your cart!`);
 }

 // Remove from cart
 function removeFromCart(id) {
   cart = cart.filter(item => item.id !== id);
   localStorage.setItem("cart", JSON.stringify(cart));
   updateCartDisplay();
   
   // Close dropdown if cart is empty
   if (cart.length === 0) {
     cartDropdown.classList.remove('active');
   }
 }

 // Event listeners for add to cart buttons
 addToCartButtons.forEach(button => {
   button.addEventListener('click', function() {
     const id = this.getAttribute('data-id');
     const name = this.getAttribute('data-name');
     const price = this.getAttribute('data-price');
     const image = this.getAttribute('data-image');
     
     addToCart(id, name, price, image);
   });
 });

 // Toggle cart dropdown
 cartIcon.addEventListener('click', (e) => {
   e.stopPropagation();
   // Only toggle if cart is not empty
   if (cart.length > 0) {
     cartDropdown.classList.toggle('active');
   }
 });

 // Close cart dropdown when clicking outside
 document.addEventListener('click', (e) => {
   if (!cartIcon.contains(e.target) && !cartDropdown.contains(e.target)) {
     cartDropdown.classList.remove('active');
   }
 });

 // Proceed to Checkout
 proceedCheckoutBtn.addEventListener('click', () => {
   cartDropdown.classList.remove('active');
   checkoutModal.style.display = 'block';
   document.body.style.overflow = 'hidden';
 });

 // Close modals
 document.querySelectorAll('.close-modal').forEach(button => {
   button.addEventListener('click', function() {
     const modal = this.closest('.modal, .checkout-modal');
     modal.style.display = 'none';
     document.body.style.overflow = '';
   });
 });

 // Close modals when clicking outside
 window.addEventListener('click', (e) => {
   if (e.target.classList.contains('modal') || e.target.classList.contains('checkout-modal') || e.target.classList.contains('thankyou-modal')) {
     e.target.style.display = 'none';
     document.body.style.overflow = '';
   }
 });

 // Checkout form submission
 checkoutForm.addEventListener('submit', (e) => {
   e.preventDefault();
   
   // Here you would typically send the form data to your server
   // For this demo, we'll just show the thank you message
   
   // Generate a random order number
   const orderNumber = '#LUM' + Math.floor(100000 + Math.random() * 900000);
   document.getElementById('order-number').textContent = orderNumber;
   
   // Close checkout modal and show thank you modal
   checkoutModal.style.display = 'none';
   thankyouModal.style.display = 'block';
   
   // Clear the cart
   cart = [];
   localStorage.removeItem('cart');
   updateCartDisplay();
 });

 // Close thank you modal
 closeThankyouBtn.addEventListener('click', () => {
   thankyouModal.style.display = 'none';
   document.body.style.overflow = '';
 });

 // Initialize cart on page load
 updateCartDisplay();

 // Simple Testimonial Slider
 const testimonials = document.querySelectorAll(".testimonial");
 let currentTestimonial = 0;

 function showTestimonial(index) {
   testimonials.forEach((testimonial) => {
     testimonial.style.display = "none";
   });

   testimonials[index].style.display = "block";
 }

 function nextTestimonial() {
   currentTestimonial = (currentTestimonial + 1) % testimonials.length;
   showTestimonial(currentTestimonial);
 }

 // Show first testimonial initially
 showTestimonial(0);

 // Auto-rotate testimonials every 5 seconds
 setInterval(nextTestimonial, 5000);

 // Blog Modal Functionality
 const readMoreButtons = document.querySelectorAll('.read-more');
 const modals = document.querySelectorAll('.modal');
 const closeModalButtons = document.querySelectorAll('.close-modal');

 // Open modal when Read More is clicked
 readMoreButtons.forEach(button => {
   button.addEventListener('click', function() {
     const blogId = this.getAttribute('data-blog-id');
     const modal = document.getElementById(`blog-modal-${blogId}`);
     modal.style.display = 'block';
     document.body.style.overflow = 'hidden';
   });
 });

 // Smooth scrolling for anchor links
 document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
   anchor.addEventListener("click", function (e) {
     e.preventDefault();

     const targetId = this.getAttribute("href");
     if (targetId === "#") return;

     const targetElement = document.querySelector(targetId);
     if (targetElement) {
       window.scrollTo({
         top: targetElement.offsetTop - 80,
         behavior: "smooth",
       });

       // Close mobile menu if open
       if (mainNav.classList.contains("active")) {
         mainNav.classList.remove("active");
         mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
       }
     }
   });
 });