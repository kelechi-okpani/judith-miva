const contactForm = document.getElementById('contact-form');
const fullNameInput = document.getElementById('fullname');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const messageInput = document.getElementById('message');
const successBanner = document.getElementById('success-banner');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  let isValid = true;

  // Reset errors
  document.querySelectorAll('.error-text').forEach(el => el.classList.remove('active'));

  // 1. Full Name Validation
  if (fullNameInput.value.trim() === '') {
    showError('name-error', 'Full Name is required.');
    isValid = false;
  }

  // 2. Email Regex Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput.value.trim() === '') {
    showError('email-error', 'Email address is required.');
    isValid = false;
  } else if (!emailRegex.test(emailInput.value.trim())) {
    showError('email-error', 'Please enter a valid email address format.');
    isValid = false;
  }

  // 3. Phone Digits-Only Validation
  const phoneRegex = /^[0-9]+$/;
  if (phoneInput.value.trim() === '') {
    showError('phone-error', 'Phone number is required.');
    isValid = false;
  } else if (!phoneRegex.test(phoneInput.value.trim())) {
    showError('phone-error', 'Phone number must contain only numbers/digits.');
    isValid = false;
  }

  // 4. Message Validation
  if (messageInput.value.trim() === '') {
    showError('message-error', 'Message field cannot be empty.');
    isValid = false;
  }

  // If all fields pass validation
  if (isValid) {
    successBanner.style.display = 'block';
    contactForm.reset();
  } else {
    successBanner.style.display = 'none';
  }
});

function showError(elementId, message) {
  const errorEl = document.getElementById(elementId);
  errorEl.textContent = message;
  errorEl.classList.add('active');
}