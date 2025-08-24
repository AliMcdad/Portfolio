// EmailJS Initialization
(function () {
  emailjs.init("YbhLUOO-mcMhBmV8q"); // Replace with your EmailJS public key
})();

// Simple Mobile Menu - Clean Version
document.addEventListener("DOMContentLoaded", function () {
  console.log("Menu script loaded");

  const menuToggle = document.getElementById("menu-toggle");
  const navbar = document.getElementById("navbar");

  console.log("Menu elements:", { menuToggle: !!menuToggle, navbar: !!navbar });

  if (!menuToggle || !navbar) {
    console.error("Menu elements not found!");
    return;
  }

  // Simple menu toggle function
  function toggleMenu() {
    console.log("Menu toggle clicked");
    navbar.classList.toggle("active");
    menuToggle.classList.toggle("active");
    console.log(
      "Menu state:",
      navbar.classList.contains("active") ? "open" : "closed"
    );
  }

  // Add event listeners
  menuToggle.addEventListener("click", toggleMenu);

  // Close menu when clicking on links
  document.querySelectorAll(".navbar a").forEach((link) => {
    link.addEventListener("click", function () {
      if (navbar.classList.contains("active")) {
        navbar.classList.remove("active");
        menuToggle.classList.remove("active");
      }
    });
  });

  console.log("Menu setup complete");
});
