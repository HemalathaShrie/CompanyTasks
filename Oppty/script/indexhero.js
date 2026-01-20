document.addEventListener('DOMContentLoaded', function() {
    const bgSlides = document.querySelectorAll('.bg-slide');
    const contents = document.querySelectorAll('.slide-content');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;

    function showSlide(index) {
        // Remove active from everything
        bgSlides.forEach(s => s.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        indicators.forEach(i => i.classList.remove('active'));

        // Activate requested index
        bgSlides[index].classList.add('active');
        contents[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentSlide = index;
    }

    function autoPlay() {
        let next = (currentSlide + 1) % bgSlides.length;
        showSlide(next);
    }

    let timer = setInterval(autoPlay, 5000);

    // Click indicators
    indicators.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            clearInterval(timer);
            showSlide(idx);
            timer = setInterval(autoPlay, 5000);
        });
    });
});

// Intersection Observer for page load fade-up and trigger animations
    const observerOptions = { threshold: 0.5, rootMargin: '0px 0px -100px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          animateCounter(entry.target.querySelector('.stat-number'));
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('.stat-card').forEach(card => observer.observe(card));
    
    // Increment counter animation
    function animateCounter(el) {
      const target = parseInt(el.parentElement.dataset.target);
      const duration = 2000; // 2s animation
      const increment = target / (duration / 16); // ~60fps
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          el.textContent = target.toLocaleString() + (target > 999 ? 'k' : '+');
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current).toLocaleString() + (Math.floor(current) > 999 ? 'k' : '');
        }
      }, 16);
    }
    // Intersection Observer for scroll-triggered animations
const observ = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.step-card').forEach(card => {
                card.classList.add('animate');
            });
        }
    });
}, { threshold: 0.2 });

document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.transform-section');
    observ.observe(section);
});
