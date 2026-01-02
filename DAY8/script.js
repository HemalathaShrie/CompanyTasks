document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});
let lastScrollTop = 0;
const header = document.getElementById("mainHeader");

window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop > 120) {
    header.style.transform = "translateY(-100%)";
  } else {
    header.style.transform = "translateY(0)";
  }

  lastScrollTop = scrollTop;
});
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

const scrollBtn = document.querySelector(".scroll-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});
const sections = document.querySelectorAll(".animate-section");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        entry.target.classList.remove("active"); // enables re-animation
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(section => observer.observe(section));
document.querySelectorAll('a[href="#home"]').forEach(link => {
  link.addEventListener("click", () => {
    const home = document.getElementById("home");
    home.classList.remove("active");

    setTimeout(() => {
      home.classList.add("active");
    }, 100);
  });
});
function openDemoPanel() {
  document.querySelector('.demo-panel').classList.add('active');
  document.querySelector('.demo-panel-overlay').classList.add('active');
}

function closeDemoPanel() {
  document.querySelector('.demo-panel').classList.remove('active');
  document.querySelector('.demo-panel-overlay').classList.remove('active');
}
