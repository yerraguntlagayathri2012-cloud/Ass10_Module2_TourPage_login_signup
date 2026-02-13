 document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupform");

  //IMP  Password visibility toggles - OUTSIDE submit handler no error will occur if we declare here the change event work
  const passwordInput = document.getElementById("Password");
  const confirmPasswordInput = document.getElementById("CPassword");
  const CBPassword = document.getElementById("CBPassword");
  const CBcPassword = document.getElementById("CBcPassword");

  CBPassword.addEventListener('change', function() {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  });

  CBcPassword.addEventListener('change', function() {
    if (confirmPasswordInput.type === 'password') {
      confirmPasswordInput.type = 'text';
    } else {
      confirmPasswordInput.type = 'password';
    }
  });

  // Password validation function - OUTSIDE submit handler
  function validatePassword(password) {
    if (password.length < 8) {
      return false;
    }
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    return hasLetter && hasNumber;
  }

  // Check if passwords match
  function checkPasswordsMatch(password, confirmPassword) {
    return password === confirmPassword;
  }

  // Save user data to localStorage
  function saveUserData(userData) {
    // Get existing users from localStorage or initialize empty array
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Add new user to the array
    users.push(userData);
    
    // Save back to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    // Also save the current user separately (for easy access)
    localStorage.setItem('currentUser', JSON.stringify(userData));
  }

  // Form submission handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const FName = document.getElementById("FName").value.trim();
    const email = document.getElementById("email").value.trim();
    const Phoneno = document.getElementById("PhoneNo").value.trim();
    const City = document.getElementById("City").value.trim();
    const Password = document.getElementById("Password").value;
    const CPassword = document.getElementById("CPassword").value;

    // Validation patterns
    const nameFNamePattern = /^[A-Za-z ]{3,}$/;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    const PhoneNoPattern = /^\d{10}$/;
    const CityPattern = /^[A-Za-z ]{3,}$/;

    // Validate each field
    if (!nameFNamePattern.test(FName)) {
      alert("Invalid username. Must be at least 3 letters.");
      return;
    }

    if (!emailPattern.test(email)) {
      alert("Invalid Email format.");
      return;
    }

    if (!PhoneNoPattern.test(Phoneno)) {
      alert("Phone Number should contain exactly 10 digits.");
      return;
    }

    if (!CityPattern.test(City)) {
      alert("Please enter a valid City Name (at least 3 letters).");
      return;
    }

    if (!validatePassword(Password)) {
      alert("Password should be at least 8 characters long with a mix of letters and numbers.");
      return;
    }

    if (!checkPasswordsMatch(Password, CPassword)) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    // Check if email already exists
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const emailExists = existingUsers.some(user => user.email === email);
    
    if (emailExists) {
      alert("This email is already registered. Please use a different email.");
      return;
    }

    // Create user object (DON'T store plain password in production!)
    const userData = {
      fullName: FName,
      email: email,
      phone: Phoneno,
      city: City,
      password: Password, // WARNING: In production, NEVER store plain passwords!
      registrationDate: new Date().toISOString()
    };

    // Save user data to localStorage
    saveUserData(userData);

    // If all validations pass
    alert("Account created successfully! Your information has been saved.");
    form.reset();
    
    // Redirect (make sure index.html exists)
    window.location.href = "index.html";
  });
});