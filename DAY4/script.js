const texts = [
  "Practice makes a person perfect",
  "Typing speed improves with consistency",
  "Accuracy matters more than speed"
];

let timer;
let timeLeft = 60;
let currentText = "";

// INIT EmailJS
(function () {
  emailjs.init("lCAxQFU0LaZhXBtAx");
})();

function refreshText() {
  document.getElementById("typingBox").value = "";
  document.getElementById("result").innerHTML = "";
  timeLeft = 60;
  document.getElementById("timer").innerText = timeLeft;

  currentText = texts[Math.floor(Math.random() * texts.length)];
  document.getElementById("randomText").innerText = currentText;
}

function startTest() {
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;
    if (timeLeft <= 0) stopTest();
  }, 1000);
}

function stopTest() {
  clearInterval(timer);

  const typed = document.getElementById("typingBox").value.trim();
  const originalWords = currentText.split(" ");
  const typedWords = typed.split(" ");

  let correct = 0;
  originalWords.forEach((w, i) => {
    if (typedWords[i] === w) correct++;
  });

  const accuracy = Math.round((correct / originalWords.length) * 100);
  const timeTaken = 60 - timeLeft || 1;
  const wpm = Math.round((typedWords.length / timeTaken) * 60);

  document.getElementById("result").innerHTML =
    `Speed: ${wpm} WPM<br>Accuracy: ${accuracy}%`;
}

function sendEmail(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const result = document.getElementById("result").innerText;

  if (!name || !email || !result) {
    alert("Please complete all fields and typing test");
    return;
  }

  const developerEmail = "hemalathayarlagadda530@example.com"; // 👈 YOUR EMAIL

  const params = {
    from_name: name,
    from_email: email,
    message: result,
    to_email: `${email}, ${developerEmail}` // ✅ MULTIPLE RECIPIENTS
  };

  emailjs.send("service_g9ru9nd", "template_mr4m4fl", params)
    .then(() => {
      alert("Result sent to user & developer!");
    })
    .catch(() => {
      alert("Failed to send email!");
    });
}



refreshText();
