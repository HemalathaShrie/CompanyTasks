// MOBILE MENU
const menuBtn = document.getElementById('menu-toggle');
const closeBtn = document.getElementById('close-menu');
const overlay = document.getElementById('nav-overlay');

if (menuBtn && overlay) {
  menuBtn.onclick = () => overlay.classList.add('active');
}
if (closeBtn && overlay) {
  closeBtn.onclick = () => overlay.classList.remove('active');
}

// SIMPLE SLIDESHOW
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showNextSlide() {
  if (!slides.length) return;
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}

setInterval(showNextSlide, 4000);
// Add scroll effect to header
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header-main');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
