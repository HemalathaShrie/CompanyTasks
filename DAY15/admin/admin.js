const session = JSON.parse(localStorage.getItem("session"));
document.getElementById("adminName").innerText = session.email;

let users = JSON.parse(localStorage.getItem("users")) || [];
let breaks = JSON.parse(localStorage.getItem("breaks")) || [];

const userTable = document.getElementById("userTable");
const breakTable = document.getElementById("breakTable");

const totalUsers = document.getElementById("totalUsers");
const onlineUsers = document.getElementById("onlineUsers");
const activeBreaks = document.getElementById("activeBreaks");

// ===== ADD USER =====
function addUser() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const role = document.getElementById("role").value;

  if (!name || !email) {
    alert("Please fill all fields");
    return;
  }

  users.push({
    id: Date.now(),
    name,
    email,
    role,
    active: true,
    online: false
  });

  localStorage.setItem("users", JSON.stringify(users));

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";

  renderUsers();
  renderStats();
}

// ===== RENDER USERS =====
function renderUsers() {
  userTable.innerHTML = "";

  users.forEach(u => {
    userTable.innerHTML += `
      <tr>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>${u.role}</td>
        <td class="${u.active ? 'active' : 'inactive'}">
          ${u.active ? "Active" : "Inactive"}
        </td>
        <td class="${u.online ? 'online' : 'offline'}">
          ${u.online ? "ONLINE" : "OFFLINE"}
        </td>
        <td>
          <button onclick="toggleUser(${u.id})">Toggle</button>
          <button onclick="deleteUser(${u.id})">Delete</button>
        </td>
      </tr>`;
  });
}

function toggleUser(id) {
  users = users.map(u =>
    u.id === id ? { ...u, active: !u.active } : u
  );
  localStorage.setItem("users", JSON.stringify(users));
  renderUsers();
}

function deleteUser(id) {
  users = users.filter(u => u.id !== id);
  localStorage.setItem("users", JSON.stringify(users));
  renderUsers();
  renderStats();
}

// ===== BREAKS =====
function renderBreaks() {
  breakTable.innerHTML = "";

  breaks.forEach(b => {
    breakTable.innerHTML += `
      <tr>
        <td>${b.email}</td>
        <td>${b.type}</td>
        <td>${b.start}</td>
        <td class="${b.status === 'ACTIVE' ? 'active-break' : 'ended'}">
          ${b.status}
        </td>
        <td>${b.end || "-"}</td>
      </tr>`;
  });
}

function renderStats() {
  totalUsers.innerText = users.length;
  onlineUsers.innerText = users.filter(u => u.online).length;
  activeBreaks.innerText = breaks.filter(b => b.status === "ACTIVE").length;
}

renderUsers();
renderBreaks();
renderStats();

/*******DOWNLOAD IN EXCEL ***********/
function downloadCSV() {
  if (breaks.length === 0) {
    alert("No break data available");
    return;
  }

  let csv = "\uFEFF"; // UTF-8 BOM for Excel
  csv += "Email,Break Type,Start Time,End Time,Status\n";

  breaks.forEach(b => {
    csv += `"${b.email}","${b.type}","${b.start}","${b.end || ""}","${b.status}"\n`;
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "break-report.xlsx.csv"; // Excel-friendly
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
