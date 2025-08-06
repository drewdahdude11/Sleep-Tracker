document.getElementById("add-entry").addEventListener("click", () => {
  const bedTime = document.getElementById("bed-time").value;
  const wakeTime = document.getElementById("wake-time").value;

  if (!bedTime || !wakeTime) {
    alert("Please fill both times.");
    return;
  }

  let entries = JSON.parse(localStorage.getItem("sleepEntries")) || [];
  entries.push({ bed_time: bedTime, wake_time: wakeTime });

  localStorage.setItem("sleepEntries", JSON.stringify(entries));

  loadEntries();

  document.getElementById("bed-time").value = "";
  document.getElementById("wake-time").value = "";
});

document.getElementById("clear-entries").addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all entries?")) {
    localStorage.removeItem("sleepEntries");
    loadEntries();
  }
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
