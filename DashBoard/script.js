function openProfile() {
  document.getElementById("profilePanel").classList.add("active");
}

function closeProfile() {
  document.getElementById("profilePanel").classList.remove("active");
}
document.addEventListener("DOMContentLoaded", function () {

  const photoInput = document.getElementById("profilePhoto");
  const photoPreview = document.getElementById("photoPreview");

  if (photoInput) {
    photoInput.addEventListener("change", function () {
      const file = this.files[0];

      if (!file) return;

      // Allow only images
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        this.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = function (e) {
        photoPreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

});
document.querySelector(".profile-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const employee = {
    id: Date.now(),
    fullname: this.querySelector("input[placeholder='Full Name']").value,
    email: this.querySelector("input[type='email']").value,
    gender: this.querySelector("select").value,
    dob: this.querySelectorAll("input[type='date']")[0].value,
    doj: this.querySelectorAll("input[type='date']")[1].value,
    bloodgroup: this.querySelectorAll("select")[1].value,
    aadhaar: this.querySelector("input[placeholder='Aadhaar Number']").value,
    photo: document.getElementById("photoPreview").src,
    breakStatus: "Working",
    breakTime: "—"
  };

  let employees = JSON.parse(localStorage.getItem("employees")) || [];
  employees.push(employee);
  localStorage.setItem("employees", JSON.stringify(employees));

  alert("Information saved successfully ✅");
  closeProfile();
});

document.getElementById("profileForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const reader = new FileReader();
  const file = document.getElementById("profilePhoto").files[0];

  reader.onload = function () {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    users.push({
      name: fullName.value,
      email: email.value,
      role: role.value,
      photo: reader.result,
      status: "Enabled"
    });

    localStorage.setItem("users", JSON.stringify(users));
    alert("User saved successfully");
  };

  if (file) reader.readAsDataURL(file);
});
