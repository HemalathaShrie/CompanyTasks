/*********** USERNAME SHOWS IN DASHBOARD AFTER LOGIN          *********/
const user = JSON.parse(localStorage.getItem("userSession"));
let employees = JSON.parse(localStorage.getItem("employees")) || [];

if (!user) {
  alert("Please login first");
  window.location.href = "../login-user.html";
}

// Show user info
document.getElementById("username").innerText = user.name;
document.getElementById("username").innerText = user.email;

// Mark user ONLINE
employees = employees.map(emp =>
  emp.email === user.email ? { ...emp, status: "Online" } : emp
);
localStorage.setItem("employees", JSON.stringify(employees));

    /********* Header Logout Button  *********/

function logoutUser() {
  document.body.style.opacity = "0";

  setTimeout(() => {
    // Update status to Offline
    let employees = JSON.parse(localStorage.getItem("employees")) || [];
    employees = employees.map(emp =>
      emp.email === user.email ? { ...emp, status: "Offline" } : emp
    );
    localStorage.setItem("employees", JSON.stringify(employees));

    // Clear session
    localStorage.removeItem("userSession");

    // Redirect
    window.location.href = "../index.html";
  }, 400);
}

let breakStartTime = null;
let breakInterval = null;
let totalBreakSeconds = 0;

// IST CLOCK
function updateIST() {
  const ist = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  document.getElementById("istTime").innerText = "IST: " + ist;
}
setInterval(updateIST, 1000);
updateIST();

// FORMAT TIME
function formatTime(sec) {
  const h = String(Math.floor(sec / 3600)).padStart(2, '0');
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

// BREAK IN
document.getElementById("breakInBtn").onclick = () => {
  breakStartTime = Date.now();
  document.getElementById("statusText").innerText = "On Break";

  document.getElementById("breakInBtn").disabled = true;
  document.getElementById("breakOutBtn").disabled = false;

  breakInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - breakStartTime) / 1000);
    document.getElementById("breakTimer").innerText = formatTime(elapsed);

    if (elapsed >= 3600) {
      document.getElementById("alertText").innerText = "Break Exceeded!";
      document.getElementById("alertCard").classList.add("alert-active");
    }
  }, 1000);
};

// BREAK OUT
document.getElementById("breakOutBtn").onclick = () => {
  clearInterval(breakInterval);

  const elapsed = Math.floor((Date.now() - breakStartTime) / 1000);
  totalBreakSeconds += elapsed;

  document.getElementById("totalBreak").innerText = formatTime(totalBreakSeconds);
  document.getElementById("breakTimer").innerText = "00:00:00";
  document.getElementById("statusText").innerText = "Working";

  document.getElementById("alertText").innerText = "None";
  document.getElementById("alertCard").classList.remove("alert-active");

  document.getElementById("breakInBtn").disabled = false;
  document.getElementById("breakOutBtn").disabled = true;
};
