document.addEventListener('DOMContentLoaded', function () {
    // Elements
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailFormContainer = document.getElementById('emailFormContainer');
    const codeInputContainer = document.getElementById('codeInputContainer');
    const serverBg = document.querySelector('.server-bg');
    const emailDisplay = document.getElementById('emailDisplay');
    const codeInputs = document.querySelectorAll('[data-code-input]');
    const resendLink = document.getElementById('resendLink');
    const resendDiv = document.getElementById('resendDiv');
    const timerElement = document.getElementById('timer');
    
    // Add reference to the send code button
    const sendCodeBtn = document.getElementById('sendCodeBtn'); // Make sure this ID matches your button
    // Create a span for the "Code sent" message
    const codeSentMessage = document.createElement('span');
    codeSentMessage.id = 'codeSentMessage';
    codeSentMessage.className = 'text-green-500 ml-2 hidden';
    codeSentMessage.textContent = 'Code sent!';
    
    // Add the message after the button if it exists
    if (sendCodeBtn && sendCodeBtn.parentNode) {
        sendCodeBtn.parentNode.appendChild(codeSentMessage);
    }
    
    // Mobile elements
    const mobileOtpContainer = document.getElementById('mobileOtpContainer');
    const mobileEmailDisplay = document.getElementById('mobileEmailDisplay');
    const mobileCodeInputs = document.querySelectorAll('[data-mobile-code-input]');
    const mobileResendLink = document.getElementById('mobileResendLink');
    const mobileResendDiv = document.getElementById('mobileResendDiv');
    const mobileTimerElement = document.getElementById('mobileTimer');
    const mobileOtpError = document.getElementById('mobileOtpError');
    const backButton = document.getElementById('backButton');

    // Set a static OTP
    const STATIC_OTP = "1234";

    // Check if elements exist before using them
    const rememberCheckbox = document.getElementById('remember');

    let timerInterval;
    let mobileTimerInterval;
    let timeLeft = 30;
    let mobileTimeLeft = 30;
    
    // Check if we're on mobile
    const isMobile = window.innerWidth < 768;

    // Progress dots
    const progressDots = document.querySelectorAll('.progress-dots');

    // Back button for mobile view
    if (backButton) {
        backButton.addEventListener('click', function() {
            resetToEmailForm();
        });
    }

    // Initially disable the send code button if it exists
    if (sendCodeBtn) {
        sendCodeBtn.disabled = true;
        sendCodeBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }

    function resetToEmailForm() {
        if (mobileOtpContainer) mobileOtpContainer.style.display = 'none';
        if (emailFormContainer) emailFormContainer.style.display = 'block';
        
        // Reset OTP inputs
        if (mobileCodeInputs && mobileCodeInputs.length > 0) {
            mobileCodeInputs.forEach(input => {
                input.value = '';
            });
        }
        
        // Reset button and message
        if (sendCodeBtn) {
            enableSendButton();
        }
        if (codeSentMessage) {
            codeSentMessage.classList.add('hidden');
        }
        
        clearInterval(mobileTimerInterval);
        updateProgressDots(0);
    }

    // Function to validate email
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Function to disable send button and show sent message
    function disableSendButtonAndShowMessage() {
        if (!sendCodeBtn) return;
        
        sendCodeBtn.disabled = true;
        sendCodeBtn.classList.add('opacity-50', 'cursor-not-allowed');
        sendCodeBtn.textContent = 'Код отправлен!';
        
        // if (codeSentMessage) {
        //     codeSentMessage.classList.remove('hidden');
        // }
        
        // Hide the message after 3 seconds
        // setTimeout(() => {
        //     if (codeSentMessage) {
        //         codeSentMessage.classList.add('hidden');
        //     }
        // }, 3000);
    }
    
    // Function to enable send button
    function enableSendButton() {
        if (!sendCodeBtn || !emailInput) return;
        
        const email = emailInput.value.trim();
        const isValid = email !== '' && validateEmail(email);
        
        if (isValid) {
            sendCodeBtn.disabled = false;
            sendCodeBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            sendCodeBtn.textContent = 'Отправить код';
        }
    }

    // Function to toggle send button state based on email validation
    function toggleSendButtonState() {
        if (!sendCodeBtn || !emailInput) return;
        
        const email = emailInput.value.trim();
        const isValid = email !== '' && validateEmail(email);
        
        if (isValid) {
            sendCodeBtn.disabled = false;
            sendCodeBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
            sendCodeBtn.disabled = true;
            sendCodeBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }

    // Add input event listener to email input to validate in real-time
    if (emailInput) {
        emailInput.addEventListener('change', function() {
            const email = this.value.trim();
            
            if (!validateEmail(email)) {
                // Show error message
                if (emailError) {
                    emailError.textContent = "Email должен быть в формате exp@email.com";
                    emailError.classList.remove('hidden');
                    emailInput.classList.add('border-red-500');
                }
            } else {
                // Hide error message
                if (emailError) {
                    emailError.classList.add('hidden');
                    emailInput.classList.remove('border-red-500');
                }
            }
        });
        emailInput.addEventListener('input', function() {
            // Clear error message as user types
            if (emailError) {
                emailError.classList.add('hidden');
                emailInput.classList.remove('border-red-500');
            }
            
            // Toggle button state based on current input
            toggleSendButtonState();
        });
    }

    // Start timer for OTP resend (desktop)
    function startTimer() {
        if (!timerElement || !resendLink) return; // Guard clause

        clearInterval(timerInterval);
        timeLeft = 30;
        timerElement.textContent = timeLeft;
        resendLink.classList.add('opacity-50', 'cursor-not-allowed');
        resendLink.style.pointerEvents = 'none';
        resendDiv.style.display = 'none';

        timerInterval = setInterval(function () {
            timeLeft--;
            if (timerElement) timerElement.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                if (resendLink) {
                    resendLink.classList.remove('opacity-50', 'cursor-not-allowed');
                    resendLink.style.pointerEvents = 'auto';
                    resendDiv.style.display = 'block';
                }
            }
        }, 1000);
    }
    
    // Start timer for mobile OTP resend
    function startMobileTimer() {
        if (!mobileTimerElement || !mobileResendLink) return; // Guard clause

        clearInterval(mobileTimerInterval);
        mobileTimeLeft = 30;
        mobileTimerElement.textContent = mobileTimeLeft;
        mobileResendDiv.classList.add('hidden');

        mobileTimerInterval = setInterval(function () {
            mobileTimeLeft--;
            if (mobileTimerElement) mobileTimerElement.textContent = mobileTimeLeft;

            if (mobileTimeLeft <= 0) {
                clearInterval(mobileTimerInterval);
                mobileResendDiv.classList.remove('hidden');
            }
        }, 1000);
    }

    // Handle form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!emailInput || !emailError) return; // Guard clause

            const email = emailInput.value.trim();

            if (!validateEmail(email)) {
                emailError.classList.remove('hidden');
                emailInput.classList.add('border-red-500');
                return;
            }

            // Disable button and show message
            disableSendButtonAndShowMessage();

            // Hide error message if previously shown
            emailError.classList.add('hidden');
            emailInput.classList.remove('border-red-500');

            if (isMobile) {
                // Mobile flow - show mobile OTP screen
                if (emailFormContainer) emailFormContainer.style.display = 'none';
                if (mobileOtpContainer) {
                    mobileOtpContainer.style.display = 'block';
                    mobileEmailDisplay.textContent = email;
                    
                    // Focus on first OTP input
                    if (mobileCodeInputs && mobileCodeInputs.length > 0) {
                        mobileCodeInputs[0].focus();
                    }
                    
                    // Start mobile timer
                    startMobileTimer();
                }
            } else {
                // Desktop flow - show OTP on server background
                if (codeInputContainer) {
                    codeInputContainer.classList.remove('hidden');
                    codeInputContainer.classList.add('flex');
                }

                // Blur the server background
                if (serverBg) serverBg.classList.add('blurred');

                // Update email display in OTP view
                if (emailDisplay) emailDisplay.textContent = email;

                // Focus on first OTP input
                if (codeInputs && codeInputs.length > 0) codeInputs[0].focus();

                // Start timer
                startTimer();
            }

            // Update progress dots
            updateProgressDots(1);
        });
    }

    // Add click event for the send code button
    if (sendCodeBtn) {
        sendCodeBtn.addEventListener('click', function(e) {
            if (!loginForm) return;
            
            // Trigger the form submission
            const submitEvent = new Event('submit', { cancelable: true, bubbles: true });
            loginForm.dispatchEvent(submitEvent);
        });
    }

    // OTP verification for desktop
    if (codeInputs && codeInputs.length > 0) {
        // Create error message element for desktop
        const otpErrorMessage = document.createElement('div');
        otpErrorMessage.id = 'otpErrorMessage';
        otpErrorMessage.className = 'text-red-500 mt-2 text-center hidden';
        otpErrorMessage.textContent = 'Неправильный код...';

        // Add error message to DOM
        if (codeInputContainer) {
            const timerText = codeInputContainer.querySelector('.timer-text');
            if (timerText) {
                timerText.parentNode.insertBefore(otpErrorMessage, timerText);
            }
        }

        codeInputs.forEach((input, index) => {
            input.addEventListener('input', function (e) {
                const value = e.target.value;

                // Hide error message when user starts typing again
                otpErrorMessage.classList.add('hidden');

                // Allow only numbers
                if (!/^\d*$/.test(value)) {
                    input.value = '';
                    return;
                }

                // Move to next input after entering a number
                if (value.length === 1 && index < codeInputs.length - 1) {
                    codeInputs[index + 1].focus();
                }

                // Check if all inputs are filled
                const isComplete = Array.from(codeInputs).every(
                    (input) => input.value.length === 1,
                );

                if (isComplete) {
                    // Get the full OTP from all inputs
                    const enteredOTP = Array.from(codeInputs)
                        .map(input => input.value)
                        .join('');

                    // Verify OTP
                    if (enteredOTP === STATIC_OTP) {
                        // Correct OTP
                        otpErrorMessage.classList.add('hidden');

                        // Show success alert and redirect
                        alert('OTP успешно проверен! Перенаправление...');

                        // Simulate a redirect after a short delay
                        setTimeout(() => {
                            console.log('Redirecting to dashboard/reset password page');
                            // window.location.href = 'dashboard.html';
                        }, 1500);

                    } else {
                        // Incorrect OTP
                        otpErrorMessage.classList.remove('hidden');

                        // Clear inputs for retry
                        codeInputs.forEach(input => {
                            input.value = '';
                        });

                        // Focus on first input for retry
                        codeInputs[0].focus();
                    }
                }
            });

            // Keep the existing keydown handler for backspace navigation
            input.addEventListener('keydown', function (e) {
                if (
                    e.key === 'Backspace' &&
                    index > 0 &&
                    input.value.length === 0
                ) {
                    codeInputs[index - 1].focus();
                }
            });
        });
    }
    
    // OTP verification for mobile
    if (mobileCodeInputs && mobileCodeInputs.length > 0) {
        mobileCodeInputs.forEach((input, index) => {
            input.addEventListener('input', function (e) {
                const value = e.target.value;

                // Hide error message when user starts typing again
                if (mobileOtpError) mobileOtpError.classList.add('hidden');

                // Allow only numbers
                if (!/^\d*$/.test(value)) {
                    input.value = '';
                    return;
                }

                // Move to next input after entering a number
                if (value.length === 1 && index < mobileCodeInputs.length - 1) {
                    mobileCodeInputs[index + 1].focus();
                }

                // Check if all inputs are filled
                const isComplete = Array.from(mobileCodeInputs).every(
                    (input) => input.value.length === 1
                );

                if (isComplete) {
                    // Get the full OTP from all inputs
                    const enteredOTP = Array.from(mobileCodeInputs)
                        .map(input => input.value)
                        .join('');

                    // Verify OTP
                    if (enteredOTP === STATIC_OTP) {
                        // Correct OTP
                        if (mobileOtpError) mobileOtpError.classList.add('hidden');

                        // Show success alert and redirect
                        alert('OTP успешно проверен! Перенаправление...');

                        // Simulate a redirect after a short delay
                        setTimeout(() => {
                            console.log('Redirecting to dashboard/reset password page');
                            // window.location.href = 'dashboard.html';
                        }, 1500);

                    } else {
                        // Incorrect OTP
                        if (mobileOtpError) mobileOtpError.classList.remove('hidden');

                        // Clear inputs for retry
                        mobileCodeInputs.forEach(input => {
                            input.value = '';
                        });

                        // Focus on first input for retry
                        mobileCodeInputs[0].focus();
                    }
                }
            });

            // Backspace handler for mobile
            input.addEventListener('keydown', function (e) {
                if (
                    e.key === 'Backspace' &&
                    index > 0 &&
                    input.value.length === 0
                ) {
                    mobileCodeInputs[index - 1].focus();
                }
            });
        });
    }

    // Resend code for desktop
    if (resendLink) {
        resendLink.addEventListener('click', function (e) {
            e.preventDefault();

            if (timeLeft > 0) return;

            const otpErrorMessage = document.getElementById('otpErrorMessage');
            if (otpErrorMessage) otpErrorMessage.classList.add('hidden');

            // Clear inputs
            if (codeInputs && codeInputs.length > 0) {
                codeInputs.forEach((input) => {
                    input.value = '';
                });

                // Focus on first input
                codeInputs[0].focus();
            }

            // Restart timer
            startTimer();
        });
    }
    
    // Resend code for mobile
    if (mobileResendLink) {
        mobileResendLink.addEventListener('click', function (e) {
            e.preventDefault();

            if (mobileTimeLeft > 0) return;

            if (mobileOtpError) mobileOtpError.classList.add('hidden');

            // Clear inputs
            if (mobileCodeInputs && mobileCodeInputs.length > 0) {
                mobileCodeInputs.forEach((input) => {
                    input.value = '';
                });

                // Focus on first input
                mobileCodeInputs[0].focus();
            }

            // Restart timer
            startMobileTimer();
        });
    }

    // Update progress dots
    function updateProgressDots(activeIndex) {
        if (!progressDots || progressDots.length === 0) return;

        progressDots.forEach((dotContainer) => {
            const dots = dotContainer.querySelectorAll('.progress-dot');
            if (!dots || dots.length === 0) return;

            dots.forEach((dot, index) => {
                if (index === activeIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        });
    }

    // Toggle switch styling
    const toggleSwitches = document.querySelectorAll('input[type="checkbox"]');
    if (toggleSwitches && toggleSwitches.length > 0) {
        toggleSwitches.forEach((toggle) => {
            toggle.addEventListener('change', function () {
                const dotElement = this.parentElement.querySelector('.dot');
                if (dotElement) {
                    if (this.checked) {
                        dotElement.style.transform = 'translateX(100%)';
                        this.parentElement.querySelector('div:not(.dot)').style.backgroundColor = '#6D5EBA';
                    } else {
                        dotElement.style.transform = 'translateX(0)';
                        this.parentElement.querySelector('div:not(.dot)').style.backgroundColor = '';
                    }
                }
            });
        });
    }

    // Initialize first progress dot as active
    updateProgressDots(0);
    
    // Initialize send button state based on current email input value
    toggleSendButtonState();
});