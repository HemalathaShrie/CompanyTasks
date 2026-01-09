// ===== ADMIN LOGIN =====
function adminLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === "n.hemalatha@oppty.in" && password === "Oppty2025") {
    const session = {
      role: "admin",
      email: email,
      loginTime: new Date().toISOString()
    };

    localStorage.setItem("session", JSON.stringify(session));
    window.location.href = "../admin/admin-dashboard.html";
  } else {
    alert("Invalid Admin Credentials");
  }
}

// ===== USER LOGIN =====
function userLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email && password) {
    const session = {
      role: "user",
      email: email,
      loginTime: new Date().toISOString()
    };

    localStorage.setItem("session", JSON.stringify(session));
    window.location.href = "../user/user-dashboard.html";
  } else {
    alert("Invalid User Credentials");
  }
}

// ===== AUTH GUARD =====
function checkAuth(requiredRole) {
  const session = JSON.parse(localStorage.getItem("session"));

  if (!session || session.role !== requiredRole) {
    alert("Unauthorized Access");
    window.location.href = "../auth/admin-login.html";
  }
}

// ===== LOGOUT =====
function logout() {
  localStorage.removeItem("session");
  window.location.href = "../auth/admin-login.html";
}
