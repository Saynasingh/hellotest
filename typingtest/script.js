let timerInterval, totalChars = 0, errors = 0, startTime;

const startButton = document.getElementById("startButton");
const retryButton = document.getElementById("retryButton");
const inputText = document.getElementById("inputText");
const displayText = document.getElementById("displayText");
const timeLeft = document.getElementById("timeLeft");
const wpm = document.getElementById("wpm");
const accuracy = document.getElementById("accuracy");
const timerSelect = document.getElementById("timer");
const testDiv = document.getElementById("test");
const resultsDiv = document.getElementById("results");

function startTest() {
  const duration = parseInt(timerSelect.value, 10) * 60;
  totalChars = 0;
  errors = 0;
  startTime = new Date().getTime();
  inputText.disabled = false;
  inputText.focus();
  inputText.value = "";
  wpm.textContent = "0";
  accuracy.textContent = "100%";
  testDiv.classList.remove("hidden");
  resultsDiv.classList.add("hidden");
  startButton.disabled = true;
  startTimer(duration);
}

function startTimer(duration) {
  let timeRemaining = duration;
  timeLeft.textContent = `${Math.floor(timeRemaining / 60)}:${String(
    timeRemaining % 60
  ).padStart(2, "0")}`;
  timerInterval = setInterval(() => {
    timeRemaining -= 1;
    timeLeft.textContent = `${Math.floor(timeRemaining / 60)}:${String(
      timeRemaining % 60
    ).padStart(2, "0")}`;
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      endTest();
    }
  }, 1000);
}

function calculateWPM() {
  const elapsedMinutes = (new Date().getTime() - startTime) / 60000;
  const words = totalChars / 5;
  return Math.round(words / elapsedMinutes);
}

function calculateAccuracy() {
  return Math.round(((totalChars - errors) / totalChars) * 100) || 0;
}

function endTest() {
  inputText.disabled = true;
  const finalWPM = calculateWPM();
  const finalAccuracy = calculateAccuracy();
  document.getElementById("finalWpm").textContent = finalWPM;
  document.getElementById("finalAccuracy").textContent = `${finalAccuracy}%`;
  resultsDiv.classList.remove("hidden");
  testDiv.classList.add("hidden");
  startButton.disabled = false;
}

function updateStats() {
  const typedText = inputText.value;
  const originalText = displayText.textContent;
  totalChars = typedText.length;
  errors = 0;

  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] !== originalText[i]) {
      errors++;
    }
  }

  wpm.textContent = calculateWPM();
  accuracy.textContent = `${calculateAccuracy()}%`;
}

startButton.addEventListener("click", startTest);
retryButton.addEventListener("click", () => location.reload());
inputText.addEventListener("input", updateStats);


// const toggleCheckbox = document.getElementById("modeToggle");
// const body = document.body;

// // Check for saved mode in localStorage
// const savedMode = localStorage.getItem("mode");
// if (savedMode) {
//   body.className = savedMode; // Set the body class directly
//   toggleCheckbox.checked = savedMode === "dark-mode"; // Match the toggle state
// } else {
//   // Default to light mode
//   body.className = "light-mode";
// }

// // Add event listener for toggle change
// toggleCheckbox.addEventListener("change", () => {
//   if (toggleCheckbox.checked) {
//     body.className = "dark-mode";
//     localStorage.setItem("mode", "dark-mode");
//   } else {
//     body.className = "light-mode";
//     localStorage.setItem("mode", "light-mode");
//   }
// });



const toggleCheckbox = document.getElementById("modeToggle");
const mainDiv = document.querySelector(".main");

// Check for saved mode in localStorage
const savedMode = localStorage.getItem("mode");
if (savedMode) {
  mainDiv.className = `main ${savedMode}`; // Set the main div class directly
  toggleCheckbox.checked = savedMode === "dark-mode"; // Match the toggle state
} else {
  // Default to light mode
  mainDiv.className = "main light-mode";
}

// Add event listener for toggle change
toggleCheckbox.addEventListener("change", () => {
  if (toggleCheckbox.checked) {
    mainDiv.className = "main dark-mode"; // Apply dark mode to main div
    localStorage.setItem("mode", "dark-mode");
  } else {
    mainDiv.className = "main light-mode"; // Apply light mode to main div
    localStorage.setItem("mode", "light-mode");
  }
});