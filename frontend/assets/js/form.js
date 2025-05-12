document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const timerDisplay = document.getElementById('timer');
  const messageBox = document.getElementById('confirmationMessage');
  const timeSpentText = document.getElementById('timeSpent');
  const newFormButton = document.getElementById('newFormBtn');
  const allInputs = form.querySelectorAll('input, textarea');
  const stars = document.querySelectorAll('.star');
  const ratingField = document.getElementById('ratingValue');

  let startTime = null;
  let timer = null;
  let timerStarted = false;

  // Start timer on first input focus
  allInputs.forEach(input => {
    input.addEventListener('focus', () => {
      if (!timerStarted) {
        startTime = new Date();
        updateTimerDisplay();
        timer = setInterval(updateTimerDisplay, 1000);
        timerStarted = true;
      }
    });
  });

  // Star rating system
  stars.forEach(star => {
    star.addEventListener('click', () => {
      const value = parseInt(star.dataset.value);
      ratingField.value = value;

      // Highlight stars based on selection
      stars.forEach(s => {
        s.classList.toggle('active', parseInt(s.dataset.value) <= value);
      });
    });
  });

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearInterval(timer);

    const timeTaken = new Date() - startTime;
    timeSpentText.textContent = getTimeSpentText(timeTaken);

    messageBox.classList.remove('hidden');
    messageBox.classList.add('visible');

    form.reset();
    stars.forEach(star => star.classList.remove('active'));
    ratingField.value = 0;
  });

  // Show new form and restart timer
  newFormButton.addEventListener('click', () => {
    messageBox.classList.remove('visible');
    setTimeout(() => {
      messageBox.classList.add('hidden');
      startTime = new Date();
      updateTimerDisplay();
      timer = setInterval(updateTimerDisplay, 1000);
    }, 300);
  });

  // Show validation messages
  allInputs.forEach(input => {
    const errorSpan = input.nextElementSibling;

    input.addEventListener('invalid', (e) => {
      e.preventDefault();
      errorSpan.textContent = input.title || getDefaultMessage(input);
      errorSpan.style.display = 'block';
    });

    input.addEventListener('input', () => {
      if (input.validity.valid) {
        errorSpan.style.display = 'none';
      }
    });
  });

  // Update timer text on screen
  function updateTimerDisplay() {
    const now = new Date();
    const timePassed = now - startTime;
    timerDisplay.textContent = formatTime(timePassed);
  }

  // Convert milliseconds to hh:mm:ss
  function formatTime(ms) {
    const sec = Math.floor(ms / 1000) % 60;
    const min = Math.floor(ms / (1000 * 60)) % 60;
    const hrs = Math.floor(ms / (1000 * 60 * 60));
    return `${pad(hrs)}:${pad(min)}:${pad(sec)}`;
  }

  function pad(num) {
    return num.toString().padStart(2, '0');
  }

  // Human-readable time spent
  function getTimeSpentText(ms) {
    const sec = Math.floor(ms / 1000) % 60;
    const min = Math.floor(ms / (1000 * 60)) % 60;
    const hrs = Math.floor(ms / (1000 * 60 * 60));

    let result = '';
    if (hrs) result += `${hrs} hour${hrs > 1 ? 's' : ''} `;
    if (min) result += `${min} minute${min > 1 ? 's' : ''} `;
    if (sec || (!hrs && !min)) result += `${sec} second${sec !== 1 ? 's' : ''}`;
    return result.trim();
  }

  // Default messages for validation
  function getDefaultMessage(input) {
    if (input.type === 'email') return 'Please enter a valid email.';
    if (input.id === 'name') return 'Please enter your name.';
    if (input.id === 'message') return 'Please enter at least 10 characters.';
    return 'This field is required.';
  }
});
