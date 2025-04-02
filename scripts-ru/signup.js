document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const createAccountForm = document.getElementById('createAccountForm');
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
    if (createAccountForm) {
      createAccountForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate email
        if (emailInput && emailError) {
          const email = emailInput.value.trim();
          
          if (!validateEmail(email)) {
            emailError.classList.remove('hidden');
            emailInput.classList.add('border-red-500');
            isValid = false;
          } else {
            emailError.classList.add('hidden');
            emailInput.classList.remove('border-red-500');
          }
        }
        
        // Validate password
        if (passwordInput && passwordError) {
          const password = passwordInput.value.trim();
          
          if (password.length < 8) {
            passwordError.classList.remove('hidden');
            passwordInput.classList.add('border-red-500');
            isValid = false;
          } else {
            passwordError.classList.add('hidden');
            passwordInput.classList.remove('border-red-500');
          }
        }
        
        // Validate password confirmation
        // if (confirmPasswordInput && confirmPasswordError && passwordInput) {
        //   const password = passwordInput.value.trim();
        //   const confirmPassword = confirmPasswordInput.value.trim();
          
        //   if (password !== confirmPassword) {
        //     confirmPasswordError.classList.remove('hidden');
        //     confirmPasswordInput.classList.add('border-red-500');
        //     isValid = false;
        //   } else {
        //     confirmPasswordError.classList.add('hidden');
        //     confirmPasswordInput.classList.remove('border-red-500');
        //   }
        // }
        
        // Validate terms agreement
        // if (termsCheckbox && !termsCheckbox.checked) {
        //   // Could add a specific error for terms, but for now just prevent submission
        //   isValid = false;
        // }
        
        if (isValid) {
          // In a real application, you would send the data to your server
          console.log('Signup submitted with email:', emailInput.value);
          
          // For demo purposes, we'll just show a success message
          alert('Account created successfully! Redirecting to login...');
          // Redirect to login page
          window.location.href = 'index.html';
        }
      });
    }
    
    // Toggle switch styling
    const toggleSwitches = document.querySelectorAll('input[type="checkbox"]');
    if (toggleSwitches && toggleSwitches.length > 0) {
      toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
          const dotElement = this.parentElement.querySelector('.dot');
          if (this.checked) {
            dotElement.style.transform = 'translateX(100%)';
            this.nextElementSibling.style.backgroundColor = '#6D5EBA';
          } else {
            dotElement.style.transform = 'translateX(0)';
            this.nextElementSibling.style.backgroundColor = '';
          }
        });
      });
    }
  });