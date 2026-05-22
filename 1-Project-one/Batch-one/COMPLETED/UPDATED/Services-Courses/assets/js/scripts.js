document.addEventListener("DOMContentLoaded", function() {
  // Main application namespace to avoid global pollution
  const App = {
    init: function() {
      this.setupMobileNavigation();
      this.setupSmoothScrolling();
      this.initTestimonialSlider();
      this.setupForms();
      this.setupAnimations();
      this.setupCourseDetails();
      this.setupFilters();
      this.setupHoverEffects();
    },

    // Mobile Navigation Toggle
    setupMobileNavigation: function() {
      const hamburger = document.getElementById("hamburger");
      const navList = document.querySelector(".nav-list");
      
      if (!hamburger || !navList) return;

      hamburger.addEventListener("click", function() {
        const isActive = this.classList.toggle("active");
        navList.classList.toggle("active");
        
        // Animate hamburger to X
        const spans = this.querySelectorAll("span");
        spans.forEach((span, index) => {
          if (isActive) {
            span.style.transform = index === 0 ? "rotate(45deg) translate(5px, 5px)" : 
                              index === 1 ? "opacity(0)" : 
                              "rotate(-45deg) translate(5px, -5px)";
          } else {
            span.style.transform = "rotate(0) translate(0)";
            span.style.opacity = index === 1 ? "1" : "";
          }
        });
      });
    },

    // Smooth scrolling for anchor links
    setupSmoothScrolling: function() {
      document.addEventListener("click", (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;
        
        e.preventDefault();
        const targetId = anchor.getAttribute("href");
        const target = document.querySelector(targetId);
        
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: "smooth"
          });
          
          // Close mobile menu if open
          const hamburger = document.getElementById("hamburger");
          const navList = document.querySelector(".nav-list");
          if (navList.classList.contains("active")) {
            hamburger.classList.remove("active");
            navList.classList.remove("active");
            const spans = hamburger.querySelectorAll("span");
            spans.forEach(span => {
              span.style.transform = "rotate(0) translate(0)";
              span.style.opacity = "1";
            });
          }
        }
      });
    },

    // Initialize testimonial slider only on mobile
    initTestimonialSlider: function() {
      const testimonialGrid = document.querySelector(".testimonial-grid");
      if (!testimonialGrid) return;
      
      const testimonials = document.querySelectorAll(".testimonial-card");
      const testimonialCount = testimonials.length;
      let currentTestimonial = 0;
      let sliderInterval;
      
      const setupSlider = () => {
        if (window.innerWidth <= 768) {
          // Convert grid to slider
          testimonialGrid.style.display = "block";
          testimonials.forEach((testimonial, index) => {
            testimonial.style.display = index === 0 ? "block" : "none";
          });
          
          // Auto-rotate testimonials if more than one
          if (testimonialCount > 1 && !sliderInterval) {
            sliderInterval = setInterval(() => {
              currentTestimonial = (currentTestimonial + 1) % testimonialCount;
              testimonials.forEach((testimonial, index) => {
                testimonial.style.display = index === currentTestimonial ? "block" : "none";
                testimonial.style.opacity = "0";
                setTimeout(() => {
                  testimonial.style.opacity = "1";
                }, 50);
              });
            }, 5000);
          }
        } else {
          // Ensure grid layout on desktop
          clearInterval(sliderInterval);
          sliderInterval = null;
          testimonialGrid.style.display = "grid";
          testimonials.forEach(testimonial => {
            testimonial.style.display = "block";
            testimonial.style.opacity = "1";
          });
        }
      };
      
      // Initial setup
      setupSlider();
      
      // Re-initialize on window resize with debounce
      let resizeTimeout;
      window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(setupSlider, 200);
      });
    },

    // Form handling with delegation
    setupForms: function() {
      // Handle all form submissions with delegation
      document.addEventListener("submit", (e) => {
        const form = e.target;
        
        // Contact form handling
        if (form.id === "contactForm") {
          e.preventDefault();
          const formData = new FormData(form);
          const formValues = Object.fromEntries(formData.entries());
          console.log("Form submitted:", formValues);
          alert("Thank you for your message! We'll get back to you soon.");
          form.reset();
        }
        
        // Newsletter form handling
        if (form.classList.contains("newsletter-form")) {
          e.preventDefault();
          const emailInput = form.querySelector("input[type='email']");
          const email = emailInput.value.trim();
          
          if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Please enter a valid email address");
            return;
          }
          
          console.log("Newsletter subscription:", email);
          alert("Thank you for subscribing to our newsletter!");
          emailInput.value = "";
        }
      });
    },

    // Animation setup with Intersection Observer
    setupAnimations: function() {
      if (!('IntersectionObserver' in window)) return;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate");
              if (entry.target.style.opacity === "0") {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
              }
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      
      // Observe all animatable elements
      const animatables = document.querySelectorAll(
        ".feature-card, .course-card, .testimonial-card, .section-header, " +
        ".post-card, .widget, .cta-content"
      );
      
      animatables.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        observer.observe(el);
      });
      
      // Image fallback handler
      document.querySelectorAll("img").forEach(img => {
        img.addEventListener("error", function() {
          const altText = this.alt || "image";
          this.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(altText)}&background=6c63ff&color=fff`;
          this.style.objectFit = "cover";
        });
      });
    },

    // Course details toggle
    setupCourseDetails: function() {
      document.addEventListener("click", (e) => {
        const enrollBtn = e.target.closest(".enroll-btn");
        if (!enrollBtn) return;
        
        e.preventDefault();
        const details = enrollBtn.closest(".service-box").querySelector(".service-details");
        if (!details) return;
        
        details.style.display = details.style.display === "block" ? "none" : "block";
        
        if (details.style.display === "block") {
          details.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      });
    },

    // Filter functionality
    setupFilters: function() {
      const filters = {
        category: document.getElementById("category"),
        level: document.getElementById("level"),
        duration: document.getElementById("duration")
      };
      
      // Only proceed if we have filters
      if (!filters.category && !filters.level && !filters.duration) return;
      
      const handleFilterChange = () => {
        console.log("Filtering courses by:", {
          category: filters.category?.value,
          level: filters.level?.value,
          duration: filters.duration?.value
        });
      };
      
      // Add event listeners to existing filters
      Object.values(filters).forEach(filter => {
        if (filter) filter.addEventListener("change", handleFilterChange);
      });
    },

    // Hover effects with event delegation
    setupHoverEffects: function() {
      // Category hover effects
      document.addEventListener("mouseover", (e) => {
        const categoryLink = e.target.closest(".category-list a");
        if (categoryLink) {
          const icon = categoryLink.querySelector("i");
          if (icon) {
            icon.style.transform = "scale(1.2)";
            icon.style.transition = "transform 0.3s ease";
          }
        }
        
        // Comment link hover effects
        const commentLink = e.target.closest(".comment-author a");
        if (commentLink) {
          commentLink.style.textDecoration = "underline";
        }
      });
      
      document.addEventListener("mouseout", (e) => {
        const categoryLink = e.target.closest(".category-list a");
        if (categoryLink) {
          const icon = categoryLink.querySelector("i");
          if (icon) icon.style.transform = "scale(1)";
        }
        
        const commentLink = e.target.closest(".comment-author a");
        if (commentLink) {
          commentLink.style.textDecoration = "none";
        }
      });
    }
  };

  // Initialize the application
  App.init();
});


document.addEventListener("DOMContentLoaded", function() {
  // Enhanced accordion functionality
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all items first
      accordionItems.forEach(accordion => {
        accordion.classList.remove('active');
      });
      
      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
  
  // Make category cards more interactive
  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.category-icon i');
      icon.style.transform = 'scale(1.1)';
      icon.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
      const icon = card.querySelector('.category-icon i');
      icon.style.transform = 'scale(1)';
    });
  });
});


document.addEventListener("DOMContentLoaded", function() {
  const contactForm = document.getElementById("contactForm");
  
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      // Get form values
      const formData = new FormData(this);
      const formValues = Object.fromEntries(formData.entries());
      
      // Here you would typically send the data to a server
      console.log("Contact form submitted:", formValues);
      
      // Show success message
      alert("Thank you for your message! We'll get back to you soon.");
      
      // Reset form
      this.reset();
    });
  }
});


document.addEventListener('DOMContentLoaded', function() {
  // Toggle password visibility
  const togglePassword = document.querySelector('.toggle-password');
  const passwordInput = document.querySelector('#password');
  
  if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', function() {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      this.querySelector('i').classList.toggle('fa-eye-slash');
    });
  }
  
  // Form submission
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Add your login logic here
      console.log('Login form submitted');
      // You would typically send this data to your server
    });
  }
  
  // Social login buttons
  const socialButtons = document.querySelectorAll('.btn-social');
  socialButtons.forEach(button => {
    button.addEventListener('click', function() {
      const provider = this.classList.contains('google') ? 'Google' : 'GitHub';
      console.log(`Sign in with ${provider} clicked`);
      // Add your social login logic here
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Toggle password visibility (for both login and register pages)
  const togglePasswordButtons = document.querySelectorAll('.toggle-password');
  
  togglePasswordButtons.forEach(button => {
    button.addEventListener('click', function() {
      const input = this.parentElement.querySelector('input');
      const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
      input.setAttribute('type', type);
      this.querySelector('i').classList.toggle('fa-eye-slash');
    });
  });

  // Password strength checker
  const passwordInput = document.getElementById('password');
  if (passwordInput) {
    passwordInput.addEventListener('input', checkPasswordStrength);
  }

  // Confirm password validation
  const confirmPasswordInput = document.getElementById('confirmPassword');
  if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener('input', checkPasswordMatch);
  }

  // Form submission
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validate form
      if (!validateRegistrationForm()) {
        return;
      }
      
      // Form is valid, proceed with registration
      console.log('Registration form submitted');
      // You would typically send this data to your server
      // showSuccessMessage();
    });
  }

  // Social login buttons
  const socialButtons = document.querySelectorAll('.btn-social');
  socialButtons.forEach(button => {
    button.addEventListener('click', function() {
      const provider = this.classList.contains('google') ? 'Google' : 'GitHub';
      console.log(`Sign up with ${provider} clicked`);
      // Add your social registration logic here
    });
  });
});

function checkPasswordStrength() {
  const password = this.value;
  const strengthIndicator = document.getElementById('strengthIndicator');
  const strengthText = document.getElementById('strengthText');
  const requirements = {
    length: document.getElementById('length-req'),
    uppercase: document.getElementById('uppercase-req'),
    number: document.getElementById('number-req'),
    special: document.getElementById('special-req')
  };
  
  let strength = 0;
  
  // Check length
  if (password.length >= 8) {
    strength += 1;
    requirements.length.classList.add('valid');
  } else {
    requirements.length.classList.remove('valid');
  }
  
  // Check uppercase letters
  if (/[A-Z]/.test(password)) {
    strength += 1;
    requirements.uppercase.classList.add('valid');
  } else {
    requirements.uppercase.classList.remove('valid');
  }
  
  // Check numbers
  if (/[0-9]/.test(password)) {
    strength += 1;
    requirements.number.classList.add('valid');
  } else {
    requirements.number.classList.remove('valid');
  }
  
  // Check special characters
  if (/[^A-Za-z0-9]/.test(password)) {
    strength += 1;
    requirements.special.classList.add('valid');
  } else {
    requirements.special.classList.remove('valid');
  }
  
  // Update strength indicator
  const container = this.closest('.form-group');
  container.classList.remove('password-weak', 'password-medium', 'password-strong', 'password-very-strong');
  
  if (strength <= 1) {
    container.classList.add('password-weak');
    strengthText.textContent = 'Weak';
  } else if (strength === 2) {
    container.classList.add('password-medium');
    strengthText.textContent = 'Medium';
  } else if (strength === 3) {
    container.classList.add('password-strong');
    strengthText.textContent = 'Strong';
  } else {
    container.classList.add('password-very-strong');
    strengthText.textContent = 'Very Strong';
  }
}

function checkPasswordMatch() {
  const password = document.getElementById('password').value;
  const confirmPassword = this.value;
  const matchMessage = document.getElementById('passwordMatch');
  
  if (confirmPassword === '') {
    matchMessage.textContent = '';
    return;
  }
  
  if (password === confirmPassword) {
    matchMessage.textContent = 'Passwords match!';
    matchMessage.style.color = '#2ecc71';
  } else {
    matchMessage.textContent = 'Passwords do not match';
    matchMessage.style.color = '#e74c3c';
  }
}

function validateRegistrationForm() {
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const termsChecked = document.getElementById('terms').checked;
  
  // Simple validation - you might want more robust checks
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    alert('Please fill in all required fields');
    return false;
  }
  
  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return false;
  }
  
  if (!termsChecked) {
    alert('You must agree to the Terms of Service and Privacy Policy');
    return false;
  }
  
  return true;
}

function showSuccessMessage() {
  // You could implement a nice success message here
  alert('Registration successful! Welcome to Tech Train Hub');
  // Or redirect to dashboard
  // window.location.href = '/dashboard';
}