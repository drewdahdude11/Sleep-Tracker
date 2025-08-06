document.getElementById("add-entry").addEventListener("click", () => {
  const bedTime = document.getElementById("bed-time").value;
  const wakeTime = document.getElementById("wake-time").value;

  if (!bedTime || !wakeTime) {
    alert("Please fill both times.");
    return;
  }

  // Load existing entries or start fresh
  let entries = JSON.parse(localStorage.getItem("sleepEntries")) || [];

  // Add new entry
  entries.push({ bed_time: bedTime, wake_time: wakeTime });

  // Save back to localStorage
  localStorage.setItem("sleepEntries", JSON.stringify(entries));

  // Update displayed list
  loadEntries();

  // Optional: clear inputs after adding
  document.getElementById("bed-time").value = "";
  document.getElementById("wake-time").value = "";
});

function loadEntries() {
  const entries = JSON.parse(localStorage.getItem("sleepEntries")) || [];
  const logList = document.getElementById("log-list");
  logList.innerHTML = "";

  if (entries.length === 0) {
    logList.innerHTML = "<li>No entries yet.</li>";
    return;
  }

  entries.forEach(({ bed_time, wake_time }) => {
    const li = document.createElement("li");
    li.textContent = `🕒 Bed: ${bed_time}, ☀️ Wake: ${wake_time}`;
    logList.appendChild(li);
  });
}

window.onload = loadEntries;
