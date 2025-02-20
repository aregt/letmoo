// Automatic language redirect based on country
fetch('https://ipapi.co/json/')
  .then(response => response.json())
  .then(data => {
    if (data.country !== 'TR') {
      window.location.href = 'index-en.html';
    }
  })
  .catch(() => window.location.href = 'index-en.html');

// Initialize Swiper slider
const swiper = new Swiper('.swiper', {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
});

// Modal functionality
const modalTriggers = document.querySelectorAll('[data-modal]');
modalTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    const modalId = trigger.dataset.modal;
    const modal = document.getElementById(modalId);
    modal.classList.remove('hidden');
  });
}});
