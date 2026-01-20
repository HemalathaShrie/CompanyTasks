document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Scroll Animations
    AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-out-back'
    });

    // 2. Navbar Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('py-2', 'shadow-lg');
            header.classList.remove('py-4');
        } else {
            header.classList.remove('py-2', 'shadow-lg');
            header.classList.add('py-4');
        }
    });

    // 3. Plan Button Hover Text Change
    const planBtns = document.querySelectorAll('.plan-btn');
    planBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.innerText = "Claim Your Spot →";
        });
        btn.addEventListener('mouseleave', () => {
            btn.innerText = "Enroll Now";
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".animate-word");

    elements.forEach((el) => {
        const words = el.innerText.split(" ");
        el.innerHTML = ""; // Clear original text
        
        words.forEach((word, index) => {
            const span = document.createElement("span");
            span.classList.add("word");
            span.innerText = word + " ";
            // Delay each word slightly
            span.style.transitionDelay = `${index * 0.1}s`;
            el.appendChild(span);
        });
    });

    // Trigger the animation
    setTimeout(() => {
        document.querySelectorAll(".word").forEach(word => {
            word.classList.add("animate");
        });
    }, 300);
});