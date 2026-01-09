/* ================= SESSION ================= */
const session = JSON.parse(localStorage.getItem("session"));

document.getElementById("userName").innerText = session.email;
document.getElementById("userEmail").innerText = session.email;

/* ================= USERS ================= */
let users = JSON.parse(localStorage.getItem("users")) || [];
let breaks = JSON.parse(localStorage.getItem("breaks")) || [];

// MARK USER ONLINE
users = users.map(u =>
  u.email === session.email ? { ...u, online: true } : u
);
localStorage.setItem("users", JSON.stringify(users));

/* ================= TIME ================= */
function getISTTime() {
  return new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata"
  });
}
/* ================= START BREAK ================= */
function startBreak(type) {
  const now = new Date();
  const hour = now.getHours();

  if (type === "Lunch" && (hour < 13 || hour > 15)) {
    alert("Lunch allowed only 1 PM – 3 PM");
    return;
  }

  if (breaks.some(b => b.email === session.email && b.status === "ACTIVE"))
    return alert("Already on break");
  const displayName = session.email.split("@")[0];
  breaks.push({
    name: displayName,
    email: session.email,
    type: type,
    start: getISTTime(),
    end: null,
    status: "ACTIVE"
  });

  localStorage.setItem("breaks", JSON.stringify(breaks));
  alert(type + " break started");
  loadBreakTable();
}

/* ================= END BREAK ================= */
function endBreak() {
  const active = breaks.find(
    b => b.email === session.email && b.status === "ACTIVE"
  );

  if (!active) return alert("No active break");

  const diff =
    (new Date() - new Date(active.start)) / (1000 * 60);

  if (active.type === "Lunch" && diff > 60) {
    alert("⚠ Lunch exceeded 1 hour");
  }

  active.end = getISTTime();
  active.status = "ENDED";

  localStorage.setItem("breaks", JSON.stringify(breaks));
  alert("Break ended");
  loadBreakTable();
}

/* LOAD TABLE FOR ALL EMPLOYEES */
function loadBreakTable() {
  const table = document.getElementById("breakTable");
  table.innerHTML = "";

  breaks.forEach(b => {
    table.innerHTML += `
      <tr>
        <td>${b.name}</td>
        <td>${b.email}</td>
        <td style="color:${b.status === 'On Break' ? '#ff4757' : '#2ed573'}">
          ${b.status === "ACTIVE" ? " On Break" : "Working"}
        </td>
        <td>${b.type}</td>
      </tr>
    `;
  });

  updateStats();
}

/* UPDATE COUNTS */
function updateStats() {
  let lunch = breaks.filter(b => b.type === "Lunch" && b.status === "ACTIVE").length;
  let regular = breaks.filter(b => b.type === "Regular" && b.status === "ACTIVE").length;

  document.getElementById("lunchCount").innerText = lunch;
  document.getElementById("regularCount").innerText = regular;
}

/* LOAD ON PAGE OPEN */
loadBreakTable();
