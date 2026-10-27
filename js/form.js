/**
 * ============================================================================
 * PRASHANTH | FRONTEND DEVELOPER PORTFOLIO - CONTACT FORM VALIDATION
 * Vanilla JavaScript (ES6+), Accessible Validation & Submission Architecture
 * ============================================================================
 */

(function () {
  'use strict';

  // Form DOM Elements
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const charCounter = document.getElementById('char-count');
  const charCounterWrapper = document.getElementById('char-counter');
  const submitBtn = document.getElementById('submit-btn');
  const formStatus = document.getElementById('form-status');

  // Groups and Error Displays
  const fields = {
    name: {
      input: nameInput,
      group: document.getElementById('group-name'),
      error: document.getElementById('name-error'),
      hasBeenBlurred: false,
      hasErrored: false,
      validate: validateName
    },
    email: {
      input: emailInput,
      group: document.getElementById('group-email'),
      error: document.getElementById('email-error'),
      hasBeenBlurred: false,
      hasErrored: false,
      validate: validateEmail
    },
    subject: {
      input: subjectInput,
      group: document.getElementById('group-subject'),
      error: document.getElementById('subject-error'),
      hasBeenBlurred: false,
      hasErrored: false,
      validate: validateSubject
    },
    message: {
      input: messageInput,
      group: document.getElementById('group-message'),
      error: document.getElementById('message-error'),
      hasBeenBlurred: false,
      hasErrored: false,
      validate: validateMessage
    }
  };

  // --------------------------------------------------------------------------
  // 1. VALIDATION RULES & REGEX
  // --------------------------------------------------------------------------

  /**
   * Rule: Full Name
   * - Required
   * - At least 2 characters
   * - Letters and spaces only
   */
  function validateName(value) {
    const trimmed = value.trim();
    if (!trimmed) {
      return { isValid: false, message: 'Please enter your full name.' };
    }
    if (trimmed.length < 2) {
      return { isValid: false, message: 'Name must be at least 2 characters long.' };
    }
    // Only letters (including accents) and single spaces between words
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+([\s'-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
    if (!nameRegex.test(trimmed)) {
      return { isValid: false, message: 'Name should only contain letters and spaces.' };
    }
    return { isValid: true, message: '' };
  }

  /**
   * Rule: Email Address
   * - Required
   * - RFC-compliant standard email format
   */
  function validateEmail(value) {
    const trimmed = value.trim();
    if (!trimmed) {
      return { isValid: false, message: 'Please enter your email address.' };
    }
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
    if (!emailRegex.test(trimmed)) {
      return { isValid: false, message: 'Please enter a valid email address (e.g. name@domain.com).' };
    }
    return { isValid: true, message: '' };
  }

  /**
   * Rule: Subject
   * - Required
   * - At least 3 characters
   */
  function validateSubject(value) {
    const trimmed = value.trim();
    if (!trimmed) {
      return { isValid: false, message: 'Please provide a subject line.' };
    }
    if (trimmed.length < 3) {
      return { isValid: false, message: 'Subject must be at least 3 characters.' };
    }
    return { isValid: true, message: '' };
  }

  /**
   * Rule: Message
   * - Required
   * - 10 to 500 characters
   */
  function validateMessage(value) {
    const trimmed = value.trim();
    if (!trimmed) {
      return { isValid: false, message: 'Please write a message.' };
    }
    if (trimmed.length < 10) {
      return { isValid: false, message: `Message is too short (${trimmed.length}/10 chars minimum).` };
    }
    if (trimmed.length > 500) {
      return { isValid: false, message: 'Message cannot exceed 500 characters.' };
    }
    return { isValid: true, message: '' };
  }

  // --------------------------------------------------------------------------
  // 2. DOM STATE UPDATERS (Errors, Green Valid State & Accessibility)
  // --------------------------------------------------------------------------

  function showFieldError(fieldConfig, errorMessage) {
    const { input, group, error } = fieldConfig;
    fieldConfig.hasErrored = true;

    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    input.setAttribute('aria-invalid', 'true');

    if (group) {
      group.classList.add('has-error');
      group.classList.remove('has-success');
    }

    if (error) {
      error.textContent = errorMessage;
    }
  }

  function clearFieldError(fieldConfig) {
    const { input, group, error } = fieldConfig;

    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    input.setAttribute('aria-invalid', 'false');

    if (group) {
      group.classList.remove('has-error');
      group.classList.add('has-success');
    }

    if (error) {
      error.textContent = '';
    }
  }

  function resetFieldState(fieldConfig) {
    const { input, group, error } = fieldConfig;
    fieldConfig.hasBeenBlurred = false;
    fieldConfig.hasErrored = false;

    input.classList.remove('is-invalid', 'is-valid');
    input.setAttribute('aria-invalid', 'false');

    if (group) {
      group.classList.remove('has-error', 'has-success');
    }

    if (error) {
      error.textContent = '';
    }
  }

  /**
   * Run validation on a specific field and apply UI states
   */
  function checkField(key) {
    const fieldConfig = fields[key];
    const { input, validate } = fieldConfig;
    const result = validate(input.value);

    if (!result.isValid) {
      showFieldError(fieldConfig, result.message);
      return false;
    } else {
      clearFieldError(fieldConfig);
      return true;
    }
  }

  // --------------------------------------------------------------------------
  // 3. EVENT LISTENERS: BLUR & PROGRESSIVE INPUT VALIDATION
  // --------------------------------------------------------------------------

  Object.keys(fields).forEach((key) => {
    const fieldConfig = fields[key];
    const { input } = fieldConfig;

    // Validate on blur
    input.addEventListener('blur', () => {
      fieldConfig.hasBeenBlurred = true;
      checkField(key);
    });

    // Validate on input ONLY after the first error has occurred
    input.addEventListener('input', () => {
      if (fieldConfig.hasErrored) {
        checkField(key);
      }
    });
  });

  // --------------------------------------------------------------------------
  // 4. LIVE CHARACTER COUNTER FOR TEXTAREA
  // --------------------------------------------------------------------------
  if (messageInput && charCounter) {
    function updateCharCounter() {
      const length = messageInput.value.length;
      charCounter.textContent = length;

      if (charCounterWrapper) {
        if (length >= 500) {
          charCounterWrapper.classList.add('is-max');
          charCounterWrapper.classList.remove('is-warning');
        } else if (length >= 450) {
          charCounterWrapper.classList.add('is-warning');
          charCounterWrapper.classList.remove('is-max');
        } else {
          charCounterWrapper.classList.remove('is-warning', 'is-max');
        }
      }
    }

    messageInput.addEventListener('input', updateCharCounter);
    // Initial sync
    updateCharCounter();
  }

  // --------------------------------------------------------------------------
  // 5. STATUS BANNER (Confirmation / Error Display)
  // --------------------------------------------------------------------------
  function setStatus(type, message) {
    if (!formStatus) return;

    formStatus.className = 'form-status';
    if (type === 'success') {
      formStatus.classList.add('form-status--success');
      formStatus.innerHTML = `<strong>Success!</strong> ${message}`;
    } else if (type === 'error') {
      formStatus.classList.add('form-status--error');
      formStatus.innerHTML = `<strong>Error:</strong> ${message}`;
    } else {
      formStatus.style.display = 'none';
      formStatus.innerHTML = '';
      return;
    }
    formStatus.style.display = 'block';
  }

  // --------------------------------------------------------------------------
  // 6. FORM SUBMISSION HANDLER & ENDPOINT INTEGRATION
  // --------------------------------------------------------------------------
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Clear previous banner
    setStatus(null, '');

    // Re-validate ALL fields on submission
    let isFormValid = true;
    let firstInvalidField = null;

    Object.keys(fields).forEach((key) => {
      const isValid = checkField(key);
      if (!isValid) {
        isFormValid = false;
        if (!firstInvalidField) {
          firstInvalidField = fields[key].input;
        }
      }
    });

    // If any validation errors exist, focus the first invalid field
    if (!isFormValid) {
      if (firstInvalidField) {
        firstInvalidField.focus();
      }
      setStatus('error', 'Please fix the errors highlighted in red before sending.');
      return;
    }

    // ------------------------------------------------------------------------
    // PREVENT DOUBLE SUBMISSIONS: Disable button & show spinner
    // ------------------------------------------------------------------------
    submitBtn.disabled = true;
    submitBtn.classList.add('btn--loading');
    const submitBtnText = submitBtn.querySelector('.btn__text');
    const originalText = submitBtnText ? submitBtnText.textContent : 'Send Message';
    if (submitBtnText) submitBtnText.textContent = 'Sending...';

    // Prepare payload
    const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      subject: subjectInput.value.trim(),
      message: messageInput.value.trim(),
      submittedAt: new Date().toISOString()
    };

    try {
      /**
       * REAL BACKEND ENDPOINT INTEGRATION:
       * To wire this form to Formspree, Netlify Forms, or your own serverless API:
       * 
       * Example for Formspree:
       * ----------------------
       * const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
       *   method: "POST",
       *   headers: { "Content-Type": "application/json", "Accept": "application/json" },
       *   body: JSON.stringify(formData)
       * });
       * if (!response.ok) throw new Error("Network response was not ok");
       * 
       * Example for Netlify Forms (Static Site):
       * ----------------------------------------
       * const encoded = new URLSearchParams(new FormData(form)).toString();
       * const response = await fetch("/", {
       *   method: "POST",
       *   headers: { "Content-Type": "application/x-www-form-urlencoded" },
       *   body: encoded
       * });
       */

      // Fallback: Simulated network latency for static hosting demo
      await new Promise((resolve) => setTimeout(resolve, 900));

      // Successful submission
      setStatus(
        'success',
        `Thank you, ${formData.name}! Your message has been received. I will get back to you at ${formData.email} shortly.`
      );

      // Reset form fields and validation states
      form.reset();
      Object.keys(fields).forEach((key) => resetFieldState(fields[key]));
      if (charCounter) charCounter.textContent = '0';
      if (charCounterWrapper) charCounterWrapper.classList.remove('is-warning', 'is-max');

      // Scroll to confirmation message smoothly
      formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    } catch (error) {
      console.error('Submission failed:', error);
      setStatus(
        'error',
        'Sorry, something went wrong while sending your message. Please reach out directly to kunallprassanth@gmail.com.'
      );
    } finally {
      // Re-enable submit button
      submitBtn.disabled = false;
      submitBtn.classList.remove('btn--loading');
      if (submitBtnText) submitBtnText.textContent = originalText;
    }
  });

})();
