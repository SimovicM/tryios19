function goToSettings() {
  hideAll();
  document.getElementById("settings").classList.remove("hidden");
}

function goToMessages() {
  hideAll();
  document.getElementById("messages").classList.remove("hidden");
}

function goHome() {
  hideAll();
  document.getElementById("homescreen").classList.remove("hidden");
}

function hideAll() {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.add('hidden');
  });
}
