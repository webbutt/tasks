const dateInput = document.getElementById("ddate");
const today = new Date().toISOString().split("T")[0];
dateInput.min = today;