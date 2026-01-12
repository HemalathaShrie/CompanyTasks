// IST TIME
function updateIST() {
  const time = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  document.getElementById("istTime").innerText = "IST: " + time;
}
setInterval(updateIST, 1000);
updateIST();

// CHART
const ctx = document.getElementById("breakChart");
new Chart(ctx, {
  type: "line",
  data: {
    labels: ["9 AM", "11 AM", "1 PM", "3 PM", "5 PM"],
    datasets: [{
      label: "Total Break Minutes",
      data: [20, 45, 30, 70, 40],
      borderWidth: 2,
      tension: 0.4,
    }]
  },
  options: {
    plugins: {
      legend: { labels: { color: "#fff" } }
    },
    scales: {
      x: { ticks: { color: "#aaa" } },
      y: { ticks: { color: "#aaa" } }
    }
  }
});
function logoutAdmin() {
  localStorage.removeItem("adminLoggedIn");
  window.location.href = "login-admin.html";

}
let employees = JSON.parse(localStorage.getItem("employees")) || [];

function renderEmployees() {
  const table = document.getElementById("employeeTable");
  table.innerHTML = "";

  employees.forEach((emp, index) => {
    table.innerHTML += `
      <tr>
        <td>${emp.name}</td>
        <td>${emp.email}</td>
        <td>${emp.role}</td>
        <td>
          <span class="status ${emp.status.toLowerCase()}">${emp.status}</span>
        </td>
        <td>${emp.breakIn || "-"}</td>
        <td>${emp.breakOut || "-"}</td>
        <td>${emp.totalTime || "-"}</td>
        <td>
        <button class="update-btn" onclick="editEmployee(${index})">Update</button>

       <button class="disable-btn ${emp.status === "Disabled" ? "red" : ""}"
          onclick="toggleEmployee(${index})">
    ${emp.status === "Enabled" ? "Disable" : "Enable"}
  </button>

  <button class="delete-btn" onclick="deleteEmployee(${index})">Delete</button>
</td>

      </tr>
    `;
  });

}
  localStorage.setItem("employees", JSON.stringify(employees));

function addEmployee() {
  const name = empName.value.trim();
  const email = empEmail.value.trim();
  const role = empRole.value;

  if (!name || !email) {
    alert("Fill all fields");
    return;
  }


  // Prevent duplicate email
  if (employees.some(e => e.email === email)) {
    alert("Employee already exists");
    return;
  }

  employees.push({
    name,
    email,
    role:"User",
    password: "oppty2026",   // DEFAULT PASSWORD
    status: "Enabled"
  });

  localStorage.setItem("employees", JSON.stringify(employees));

  alert("Employee added successfully ✅");
  renderEmployees();
}


function deleteEmployee(index) {
  if (confirm("Delete this employee?")) {
    employees.splice(index, 1);
    renderEmployees();
  }
}

function toggleEmployee(index) {
  employees[index].status =
    employees[index].status === "Enabled" ? "Disabled" : "Enabled";

  renderEmployees();
}

function editEmployee(index) {
  const emp = employees[index];

  document.getElementById("empName").value = emp.name;
  document.getElementById("empEmail").value = emp.email;
  document.getElementById("empRole").value = emp.role;

  employees.splice(index, 1);
  renderEmployees();
}

document.getElementById("searchUser").addEventListener("keyup", function () {
  const value = this.value.toLowerCase();

  document.querySelectorAll("#employeeTable tr").forEach(row => {
    row.style.display = row.innerText.toLowerCase().includes(value)
      ? ""
      : "none";
  });
});

renderEmployees();
