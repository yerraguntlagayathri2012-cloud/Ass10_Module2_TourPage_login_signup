document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signinform");
  const emailInput = document.getElementById("signinEmail");
  const passwordInput = document.getElementById("signinPassword");
  const showPasswordCheck = document.getElementById("showPasswordCheck");
  const rememberMeCheck = document.getElementById("rememberMe");//checbox to save the details of user

  // Clear previous error messages
  function clearErrors() {
    document.getElementById("emailError").textContent = "";
    document.getElementById("passwordError").textContent = "";
  }

  // Display error message
  function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
  }

  // Password visibility toggle
  showPasswordCheck.addEventListener("change", function () {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  });

  // Check if user was remembered
  window.addEventListener("load", () => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      emailInput.value = rememberedEmail;
      rememberMeCheck.checked = true;
    }
  });

  // Validate email format
  function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  // Find user in localStorage
  function findUser(email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.find(
      (user) => user.email === email && user.password === password
    );
  }

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Validation checks
    let isValid = true;

    // Check if email is empty
    if (!email) {
      showError("emailError", "Email is required.");
      isValid = false;
    } else if (!validateEmail(email)) {
      showError("emailError", "Please enter a valid email address.");
      isValid = false;
    }

    // Check if password is empty
    if (!password) {
      showError("passwordError", "Password is required.");
      isValid = false;
    } else if (password.length < 8) {
      showError("passwordError", "Password must be at least 8 characters.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Check if users exist in localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    if (users.length === 0) {
      showError("emailError", "No registered users found. Please sign up first.");
      return;
    }

    // Find matching user
    const user = findUser(email, password);

    if (!user) {
      // Check if email exists but password is wrong
      const emailExists = users.some((u) => u.email === email);
      
      if (emailExists) {
        showError("passwordError", "Incorrect password. Please try again.");
      } else {
        showError("emailError", "No account found with this email. Please sign up.");
      }
      return;
    }

    // Successful login
    // Handle "Remember Me" functionality
    if (rememberMeCheck.checked) {
      localStorage.setItem("rememberedEmail", email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }

    // Save current logged-in user
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");

    // Show success message
    alert(`Welcome back, ${user.fullName}!`);

    // Reset form
    form.reset();
    emailInput.value="";

    // Redirect to dashboard or home page
    window.location.href = "Home.html";
  });

  // Add real-time validation feedback
  emailInput.addEventListener("blur", () => {
    const email = emailInput.value.trim();
    if (email && !validateEmail(email)) {
      showError("emailError", "Please enter a valid email address.");
    } else {
      document.getElementById("emailError").textContent = "";
    }
  });

  passwordInput.addEventListener("blur", () => {
    const password = passwordInput.value;
    if (password && password.length < 8) {
      showError("passwordError", "Password must be at least 8 characters.");
    } else {
      document.getElementById("passwordError").textContent = "";
    }
  });
});