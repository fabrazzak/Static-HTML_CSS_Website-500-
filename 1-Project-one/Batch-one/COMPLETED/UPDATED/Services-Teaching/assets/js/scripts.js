document.addEventListener("DOMContentLoaded", function() {
  const hamburger = document.getElementById("hamburger");
  const navList = document.querySelector(".nav-list");

  hamburger.addEventListener("click", function() {
    navList.classList.toggle("active");
  });
});
