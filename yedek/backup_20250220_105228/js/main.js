// Automatic language redirect based on country
fetch('https://ipapi.co/json/')
  .then(response => response.json())
  .then(data => {
    if (data.country !== 'TR') {
      window.location.href = 'index-en.html';
    }
  })
  .catch(() => window.location.href = 'index-en.html');

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper slider if it exists
    const swiperElement = document.querySelector('.swiper');
    if (swiperElement) {
        const swiper = new Swiper('.swiper', {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            }
        });
    }

    // Modal functionality
    const modalTriggers = document.querySelectorAll('[data-modal]');
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.dataset.modal;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.remove('hidden');
            }
        });
    });

    // Close modal when clicking outside
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    });

    // Close modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.classList.add('hidden');
            });
        }
    });
});
