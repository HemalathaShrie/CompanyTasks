 document.querySelector(".login-card").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value; 

  // DEMO ADMIN CREDENTIALS
  const ADMIN_USER = "admin@oppty.in";
  const ADMIN_PASS = "admin123";

  if (username === ADMIN_USER && password === ADMIN_PASS) {

    // Save admin session
    localStorage.setItem("adminLoggedIn", "true");

    alert("Admin login successful ✅");
    window.location.href = "admin/admin-dashboard.html";

  } else {
    alert("Invalid admin credentials ❌");
  }
});