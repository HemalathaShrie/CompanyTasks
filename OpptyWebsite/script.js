  let slides = document.querySelectorAll(".slides");
  let dots = document.querySelectorAll(".dot");
  let index = 0;

  function showSlide() {
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");

    index = (index + 1) % slides.length;
  }

  setInterval(showSlide, 4000);

const counters = document.querySelectorAll(".stat-circle h3");

counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute("data-target");
    const current = +counter.innerText;
    const increment = Math.ceil(target / 100);

    if (current < target) {
      counter.innerText = current + increment;
      setTimeout(updateCount, 40);
    } else {
      counter.innerText = target + "+";
    }
  };
  updateCount();
});


