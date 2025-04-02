// document.addEventListener('DOMContentLoaded', function() {
//   // Elements
//   const signInForm = document.getElementById('signInForm');
//   const emailInput = document.getElementById('email');
//   const passwordInput = document.getElementById('password');
//   const emailError = document.getElementById('emailError');
//   const passwordError = document.getElementById('passwordError');
  
//   // Function to validate email
//   function validateEmail(email) {
//     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
//   }
  
//   // Handle form submission
//   if (signInForm) {
//     signInForm.addEventListener('submit', function(e) {
//       e.preventDefault();
      
//       let isValid = true;
      
//       // Validate email
//       if (!emailInput || !emailError) return;
//       const email = emailInput.value.trim();
      
//       if (!validateEmail(email)) {
//         emailError.classList.remove('hidden');
//         emailInput.classList.add('border-red-500');
//         isValid = false;
//       } else {
//         emailError.classList.add('hidden');
//         emailInput.classList.remove('border-red-500');
//       }
      
//       // Validate password
//       if (!passwordInput || !passwordError) return;
//       const password = passwordInput.value.trim();
      
//       if (password === '') {
//         passwordError.classList.remove('hidden');
//         passwordInput.classList.add('border-red-500');
//         isValid = false;
//       } else {
//         passwordError.classList.add('hidden');
//         passwordInput.classList.remove('border-red-500');
//       }
      
//       if (isValid) {
//         // In a real application, you would send the credentials to your server
//         console.log('Login submitted with email:', email);
        
//         // For demo purposes, we'll just redirect to a dashboard
//         alert('Login successful! Redirecting to dashboard...');
//         // window.location.href = 'dashboard.html';
//       }
//     });
//   }
  
//   // Toggle switch styling
//   const toggleSwitches = document.querySelectorAll('input[type="checkbox"]');
//   if (toggleSwitches && toggleSwitches.length > 0) {
//     toggleSwitches.forEach(toggle => {
//       toggle.addEventListener('change', function() {
//         const bgElement = this.nextElementSibling;
//         if (bgElement) {
//           if (this.checked) {
//             bgElement.style.backgroundColor = '#6D5EBA';
//           } else {
//             bgElement.style.backgroundColor = '';
//           }
//         }
//       });
//     });
//   }
// });

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
  
  // Add password visibility toggle
  if (passwordInput) {
    // Create password visibility toggle container
    const toggleContainer = document.createElement('div');
    toggleContainer.className = 'absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer';
    toggleContainer.innerHTML = `
      <svg id="passwordEyeShow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6D5EBA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
      <svg id="passwordEyeHide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6D5EBA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="hidden">
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
        <line x1="2" x2="22" y1="2" y2="22"></line>
      </svg>
    `;
    
    // Add relative positioning to password input's parent
    passwordInput.parentElement.style.position = 'relative';
    
    // Add toggle to the DOM
    passwordInput.parentElement.appendChild(toggleContainer);
    
    // Get eye icons
    const eyeShow = document.getElementById('passwordEyeShow');
    const eyeHide = document.getElementById('passwordEyeHide');
    
    // Add click event to toggle password visibility
    toggleContainer.addEventListener('click', function() {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeShow.classList.add('hidden');
        eyeHide.classList.remove('hidden');
      } else {
        passwordInput.type = 'password';
        eyeShow.classList.remove('hidden');
        eyeHide.classList.add('hidden');
      }
    });
  }
  
  // Update error message text
  if (emailError) {
    emailError.textContent = 'Invalid email or password';
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
        // Use same error message as email for consistency
        passwordError.textContent = 'Invalid email or password';
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
        const dotElement = bgElement.nextElementSibling;
        
        if (bgElement) {
          if (this.checked) {
            bgElement.style.backgroundColor = '#6D5EBA';
            dotElement.style.transform = 'translateX(100%)';
            dotElement.style.backgroundColor = '#FFFFFF';
          } else {
            bgElement.style.backgroundColor = '';
            dotElement.style.transform = '';
            dotElement.style.backgroundColor = '';
          }
        }
      });
      
      // Initialize toggle state
      if (toggle.checked) {
        const bgElement = toggle.nextElementSibling;
        const dotElement = bgElement.nextElementSibling;
        bgElement.style.backgroundColor = '#6D5EBA';
        dotElement.style.transform = 'translateX(100%)';
      }
    });
  }
});