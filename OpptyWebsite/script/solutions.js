AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease-in-out'
});

// Optional: Pause control for both tracks
const tracks = document.querySelectorAll('.scroll-track');
tracks.forEach(track => {
    track.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
    });
    
    track.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
    });
});
