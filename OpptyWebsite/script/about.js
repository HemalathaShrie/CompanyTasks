document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 1000, // Animation speed
        once: true,     // Animation happens only once
        easing: 'ease-out-quad'
    });

    // 2. Navbar Background Change on Scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shadow-lg');
        } else {
            header.classList.remove('shadow-lg');
        }
    });

    // 3. Simple Form Handling (if needed)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for reaching out! We will contact you soon.');
        });
    });
});