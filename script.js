// Show a welcome message when button is clicked
function showMessage() {
  alert("Hello Aviola! Your demo site is alive!");
}

// Display a live clock
function updateClock() {
  const now = new Date();
  const clock = document.getElementById("clock");
  clock.textContent = now.toLocaleTimeString();
}

// Update clock every second
setInterval(updateClock, 1000);
