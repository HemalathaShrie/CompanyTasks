document.addEventListener('DOMContentLoaded', () => {
    // 1. Init Animations
    AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-out-cubic'
    });

    // 2. Sticky Header Logic
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('py-2', 'shadow-lg');
        } else {
            header.classList.remove('py-2', 'shadow-lg');
        }
    });

    // 3. Form Animation on Focus
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('scale-105');
        });
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('scale-105');
        });
    });
});