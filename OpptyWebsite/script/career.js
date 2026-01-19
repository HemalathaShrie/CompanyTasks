document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Scroll Animations
    AOS.init({
        duration: 1200,
        once: true,
        easing: 'ease-in-out'
    });

    // 2. Form Interaction Effect
    const formFields = document.querySelectorAll('.form-input');
    formFields.forEach(field => {
        field.addEventListener('focus', () => {
            field.parentElement.classList.add('active-field');
        });
    });

    // 3. Simple Dynamic Text Ticker for Job Openings (Optional)
    console.log("Oppty TechHub Careers Page Loaded");
});