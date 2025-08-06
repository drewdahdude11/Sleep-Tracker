window.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("add-entry");
  const clearBtn = document.getElementById("clear-entries");
  const bedInput = document.getElementById("bed-time");
  const wakeInput = document.getElementById("wake-time");
  const logList = document.getElementById("log-list");

  addBtn.addEventListener("click", () => {
    const bedTime = bedInput.value;
    const wakeTime = wakeInput.value;

    if (!bedTime || !wakeTime) {
      alert("Please fill both times.");
      return;
    }

    let entries = JSON.parse(localStorage.getItem("sleepEntries")) || [];
    entries.push({ bed_time: bedTime, wake_time: wakeTime });

    localStorage.setItem("sleepEntries", JSON.stringify(entries));

    loadEntries();

    bedInput.value = "";
    wakeInput.value = "";
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to clear all entries?")) {
        localStorage.removeItem("sleepEntries");
        loadEntries();
      }
    });
  }

  function loadEntries() {
    const entries = JSON.parse(localStorage.getItem("sleepEntries")) || [];
    logList.innerHTML = "";

    if (entries.length === 0) {
      logList.innerHTML = "<li>No entries yet.</li>";
      return;
    }

    entries.forEach(({ bed_time, wake_time }, index) => {
      const li = document.createElement("li");
      li.textContent = `🕒 Bed: ${bed_time}, ☀️ Wake: ${wake_time} `;

      // Create remove button
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.style.marginLeft = "10px";
      removeBtn.style.padding = "2px 8px";
      removeBtn.style.border = "none";
      removeBtn.style.background = "#d9534f";
      removeBtn.style.color = "white";
      removeBtn.style.borderRadius = "5px";
      removeBtn.style.cursor = "pointer";
      removeBtn.title = "Remove this entry";

      removeBtn.addEventListener("click", () => {
        // Remove entry at this index
        entries.splice(index, 1);
        localStorage.setItem("sleepEntries", JSON.stringify(entries));
        loadEntries();
      });

      li.appendChild(removeBtn);
      logList.appendChild(li);
    });
  }

  loadEntries();
});
