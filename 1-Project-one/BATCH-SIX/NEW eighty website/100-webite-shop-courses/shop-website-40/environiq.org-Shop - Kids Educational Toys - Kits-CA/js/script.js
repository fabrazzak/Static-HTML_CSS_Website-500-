 // Cart Functionality
 let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
 // Update cart count
 function updateCartCount() {
     const count = cart.reduce((total, item) => total + item.quantity, 0);
     document.getElementById('cartCount').textContent = count;
 }
 
 // Add to cart
 document.querySelectorAll('.add-to-cart').forEach(button => {
     button.addEventListener('click', function() {
         const id = this.getAttribute('data-id');
         const name = this.getAttribute('data-name');
         const price = parseFloat(this.getAttribute('data-price'));
         const image = this.getAttribute('data-image');
         
         // Check if item already in cart
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
         localStorage.setItem('cart', JSON.stringify(cart));
         
         // Update cart count
         updateCartCount();
         
         // Show added notification
      
     });
 });
 
 // Cart Modal
 const cartModal = document.getElementById('cartModal');
 const cartIcon = document.getElementById('cartIcon');
 const closeCartModal = document.getElementById('closeCartModal');
 const cartItemsContainer = document.getElementById('cartItems');
 const cartTotal = document.getElementById('cartTotal');
 const checkoutForm = document.getElementById('checkoutForm');
 const totalAmount = document.getElementById('totalAmount');
 
 cartIcon.addEventListener('click', function(e) {
     e.preventDefault();
     renderCart();
     cartModal.style.display = 'block';
 });
 
 closeCartModal.addEventListener('click', function() {
     cartModal.style.display = 'none';
 });
 
 window.addEventListener('click', function(e) {
     if (e.target === cartModal) {
         cartModal.style.display = 'none';
     }
 });
 
 // Render cart items
 function renderCart() {
     if (cart.length === 0) {
         cartItemsContainer.innerHTML = `
             <div class="cart-empty">
                 <p>Your cart is currently empty.</p>
                 <a href="/shop/" class="btn">Continue Shopping</a>
             </div>
         `;
         cartTotal.style.display = 'none';
         checkoutForm.style.display = 'none';
         return;
     }
     
     let itemsHTML = '';
     let total = 0;
     
     cart.forEach(item => {
         total += item.price * item.quantity;
         
         itemsHTML += `
             <div class="cart-item" data-id="${item.id}">
                 <div class="cart-item-img">
                     <img src="${item.image}" alt="${item.name}">
                 </div>
                 <div class="cart-item-details">
                     <div class="cart-item-title">${item.name}</div>
                     <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                 </div>
                 <div class="cart-item-quantity">
                     <button class="quantity-btn decrease">-</button>
                     <span class="quantity">${item.quantity}</span>
                     <button class="quantity-btn increase">+</button>
                     <span class="remove-item"><i class="fas fa-trash"></i></span>
                 </div>
             </div>
         `;
     });
     
     cartItemsContainer.innerHTML = itemsHTML;
     totalAmount.textContent = total.toFixed(2);
     cartTotal.style.display = 'block';
     checkoutForm.style.display = 'block';
     
     // Add event listeners to quantity buttons
     document.querySelectorAll('.increase').forEach(button => {
         button.addEventListener('click', function() {
             const itemId = this.closest('.cart-item').getAttribute('data-id');
             const item = cart.find(item => item.id === itemId);
             item.quantity += 1;
             localStorage.setItem('cart', JSON.stringify(cart));
             renderCart();
             updateCartCount();
         });
     });
     
     document.querySelectorAll('.decrease').forEach(button => {
         button.addEventListener('click', function() {
             const itemId = this.closest('.cart-item').getAttribute('data-id');
             const item = cart.find(item => item.id === itemId);
             
             if (item.quantity > 1) {
                 item.quantity -= 1;
             } else {
                 cart = cart.filter(item => item.id !== itemId);
             }
             
             localStorage.setItem('cart', JSON.stringify(cart));
             renderCart();
             updateCartCount();
         });
     });
     
     document.querySelectorAll('.remove-item').forEach(button => {
         button.addEventListener('click', function() {
             const itemId = this.closest('.cart-item').getAttribute('data-id');
             cart = cart.filter(item => item.id !== itemId);
             localStorage.setItem('cart', JSON.stringify(cart));
             renderCart();
             updateCartCount();
         });
     });
 }
 
 // Order Form Submission
 const orderForm = document.getElementById('orderForm');
 const confirmationModal = document.getElementById('confirmationModal');
 const closeConfirmationModal = document.getElementById('closeConfirmationModal');
 
 orderForm.addEventListener('submit', function(e) {
     e.preventDefault();
     
     // In a real application, you would send this data to your server
     const formData = {
         name: document.getElementById('name').value,
         email: document.getElementById('email').value,
         phone: document.getElementById('phone').value,
         address: document.getElementById('address').value,
         items: cart,
         total: parseFloat(totalAmount.textContent)
     };
     
     console.log('Order submitted:', formData); // For demo purposes
     
     // Clear the cart
     cart = [];
     localStorage.setItem('cart', JSON.stringify(cart));
     updateCartCount();
     
     // Close cart modal and show confirmation
     cartModal.style.display = 'none';
     confirmationModal.style.display = 'block';
     
     // Reset form
     orderForm.reset();
 });
 
 closeConfirmationModal.addEventListener('click', function() {
     confirmationModal.style.display = 'none';
 });
 
 window.addEventListener('click', function(e) {
     if (e.target === confirmationModal) {
         confirmationModal.style.display = 'none';
     }
 });
 
 // Initialize cart count on page load
 updateCartCount();