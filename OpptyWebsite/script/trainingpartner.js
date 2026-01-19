document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS
    AOS.init({
        duration: 1200,
        once: false, // Set to false to see animations again when scrolling up
        easing: 'ease-out-quad'
    });

    // 2. Parallax effect for the fixed frame image on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const frameImg = document.querySelector('.fixed-window img');
        if (frameImg) {
            frameImg.style.transform = `scale(${1 + scrolled * 0.0001}) translateY(${scrolled * 0.02}px)`;
        }
    });

    // 3. Smooth Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});