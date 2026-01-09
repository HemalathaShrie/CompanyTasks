
/****ABOUTUS *******/

let current = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
  slides.forEach(s => s.classList.remove("active"));
  dots.forEach(d => d.classList.remove("active"));

  slides[index].classList.add("active");
  dots[index].classList.add("active");

  current = index;
}

function goSlide(index) {
  showSlide(index);
}
setInterval(() => {
  current = (current + 1) % slides1.length;
  showSlide(current);
}, 4000);