document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const signInForm = document.getElementById('signInForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  
  // Function to validate email
  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  // Handle form submission
  if (signInForm) {
    signInForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      
      // Validate email
      if (!emailInput || !emailError) return;
      const email = emailInput.value.trim();
      
      if (!validateEmail(email)) {
        emailError.classList.remove('hidden');
        emailInput.classList.add('border-red-500');
        isValid = false;
      } else {
        emailError.classList.add('hidden');
        emailInput.classList.remove('border-red-500');
      }
      
      // Validate password
      if (!passwordInput || !passwordError) return;
      const password = passwordInput.value.trim();
      
      if (password === '') {
        passwordError.classList.remove('hidden');
        passwordInput.classList.add('border-red-500');
        isValid = false;
      } else {
        passwordError.classList.add('hidden');
        passwordInput.classList.remove('border-red-500');
      }
      
      if (isValid) {
        // In a real application, you would send the credentials to your server
        console.log('Login submitted with email:', email);
        
        // For demo purposes, we'll just redirect to a dashboard
        alert('Login successful! Redirecting to dashboard...');
        // window.location.href = 'dashboard.html';
      }
    });
  }
  
  // Toggle switch styling
  const toggleSwitches = document.querySelectorAll('input[type="checkbox"]');
  if (toggleSwitches && toggleSwitches.length > 0) {
    toggleSwitches.forEach(toggle => {
      toggle.addEventListener('change', function() {
        const bgElement = this.nextElementSibling;
        if (bgElement) {
          if (this.checked) {
            bgElement.style.backgroundColor = '#6D5EBA';
          } else {
            bgElement.style.backgroundColor = '';
          }
        }
      });
    });
  }
});