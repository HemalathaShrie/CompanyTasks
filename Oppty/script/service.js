document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-in-out'
    });

    // 2. Navbar Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('py-2', 'shadow-2xl');
            header.classList.remove('py-4');
        } else {
            header.classList.remove('py-2', 'shadow-2xl');
            header.classList.add('py-4');
        }
    });

    // 3. Staggered Card Entrance
    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card, index) => {
        card.setAttribute('data-aos-delay', (index * 100).toString());
    });
});