var typed = new Typed(".text", {
  strings: [
    "Full Stack Developer",
    "Cyber Security Researcher",
    "Product Manager",
  ],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

// EmailJS Initialization
(function () {
  emailjs.init("YbhLUOO-mcMhBmV8q"); // Replace with your EmailJS public key
})();

// Mobile menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const navbar = document.getElementById("navbar");

  menuToggle.addEventListener("click", function () {
    navbar.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });

  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll(".navbar a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navbar.classList.remove("active");
      menuToggle.classList.remove("active");
    });
  });

  // Security: Input sanitization function
  function sanitizeInput(str) {
    if (typeof str !== "string") return "";
    return str
      .replace(/[<>]/g, "") // Remove potential HTML tags
      .replace(/javascript:/gi, "") // Remove javascript: protocols
      .replace(/on\w+\s*=/gi, "") // Remove event handlers
      .trim()
      .substring(0, 1000); // Limit length
  }

  // Security: Email validation
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  }

  // Security: Enhanced form validation
  function validateForm(formData) {
    const name = formData.get("from_name");
    const email = formData.get("from_email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // Check for required fields
    if (!name || name.trim().length < 2) {
      return {
        valid: false,
        error: "Name must be at least 2 characters long.",
      };
    }

    if (!email || !isValidEmail(email)) {
      return { valid: false, error: "Please enter a valid email address." };
    }

    if (!message || message.trim().length < 10) {
      return {
        valid: false,
        error: "Message must be at least 10 characters long.",
      };
    }

    // Check for suspicious content
    const suspiciousPatterns = [
      /<script/i,
      /javascript:/i,
      /onclick/i,
      /onerror/i,
      /eval\(/i,
      /document\./i,
      /window\./i,
    ];

    const allContent = `${name} ${email} ${subject} ${message}`;
    if (suspiciousPatterns.some((pattern) => pattern.test(allContent))) {
      return {
        valid: false,
        error:
          "Invalid content detected. Please remove any script tags or JavaScript code.",
      };
    }

    return { valid: true };
  }

  // Contact form handling with enhanced security
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const submitBtn = contactForm.querySelector(".send");

      // Validate form data
      const validation = validateForm(formData);
      if (!validation.valid) {
        formStatus.innerHTML = `<p style="color: #f44336; margin-top: 10px;">✗ ${validation.error}</p>`;
        return;
      }

      // Sanitize inputs before sending
      const sanitizedData = {
        from_name: sanitizeInput(formData.get("from_name")),
        from_email: sanitizeInput(formData.get("from_email")),
        subject: sanitizeInput(formData.get("subject") || "Portfolio Contact"),
        message: sanitizeInput(formData.get("message")),
      };

      // Security: Rate limiting check (simple client-side)
      const lastSubmit = localStorage.getItem("lastContactSubmit");
      const now = Date.now();
      if (lastSubmit && now - parseInt(lastSubmit) < 30000) {
        // 30 seconds
        formStatus.innerHTML =
          '<p style="color: #f44336; margin-top: 10px;">✗ Please wait 30 seconds before sending another message.</p>';
        return;
      }

      // Disable submit button and show loading
      submitBtn.disabled = true;
      submitBtn.value = "Sending...";
      formStatus.innerHTML =
        '<p style="color: #eab63e; margin-top: 10px;">Sending your message...</p>';

      // Create sanitized form element for EmailJS
      const tempForm = document.createElement("form");
      Object.keys(sanitizedData).forEach((key) => {
        const input = document.createElement("input");
        input.name = key;
        input.value = sanitizedData[key];
        tempForm.appendChild(input);
      });

      // Send email using EmailJS with sanitized data
      emailjs.sendForm("service_xw6pa19", "template_h7oxaw7", tempForm).then(
        function () {
          // Success - Store timestamp for rate limiting
          localStorage.setItem("lastContactSubmit", now.toString());
          formStatus.innerHTML =
            '<p style="color: #4CAF50; margin-top: 10px;">✓ Message sent successfully! I\'ll get back to you soon.</p>';
          contactForm.reset();
          submitBtn.value = "Send Message";
          submitBtn.disabled = false;
        },
        function (error) {
          // Error
          console.error("EmailJS error:", error);
          formStatus.innerHTML =
            '<p style="color: #f44336; margin-top: 10px;">✗ Failed to send message. Please try again or contact me directly.</p>';
          submitBtn.value = "Send Message";
          submitBtn.disabled = false;
        }
      );
    });
  }
});
