document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-card");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const employees = JSON.parse(localStorage.getItem("employees")) || [];

    console.log("Employees from storage:", employees);

    const user = employees.find(emp =>
      emp.email.toLowerCase() === email.toLowerCase() &&
      emp.password === password &&
      emp.role === "User" &&
      emp.status === "Enabled"
    );

    if (user) {
      localStorage.setItem("userSession", JSON.stringify(user));
      alert("Login successful ✅");
      window.location.href = "user/user-dashboard.html";
    } else {
      alert("Invalid credentials or account disabled ❌");
    }
  });
});
