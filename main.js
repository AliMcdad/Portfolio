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

  // Initialize typed.js for home page
  if (document.querySelector(".text")) {
    const typed = new Typed(".text", {
      strings: ["Full Stack Developer", "Cybersecurity Researcher", "Product Manager", "Tech Innovator"],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true,
    });
  }

  // Contact form functionality
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      
      const formStatus = document.getElementById("form-status");
      const submitButton = contactForm.querySelector(".send");
      
      // Disable submit button
      submitButton.disabled = true;
      submitButton.value = "Sending...";
      
      // Send email using EmailJS
      emailjs.sendForm("service_your_service_id", "template_your_template_id", contactForm)
        .then(function (response) {
          console.log("SUCCESS!", response.status, response.text);
          formStatus.innerHTML = '<p style="color: #eab63e;">Message sent successfully!</p>';
          contactForm.reset();
        })
        .catch(function (error) {
          console.log("FAILED...", error);
          formStatus.innerHTML = '<p style="color: #ff6b6b;">Failed to send message. Please try again.</p>';
        })
        .finally(function () {
          // Re-enable submit button
          submitButton.disabled = false;
          submitButton.value = "Send Message";
        });
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // Active navigation highlighting
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});
