// sensors.js
// Use network connectivity information (online/offline) to update the status badge.

const networkStatusElement = document.getElementById("networkStatus");

function updateNetworkStatus() {
  if (!networkStatusElement) return;

  if (navigator.onLine) {
    networkStatusElement.textContent = "Online";
    networkStatusElement.style.backgroundColor = "#bbf7d0";
  } else {
    networkStatusElement.textContent = "Offline";
    networkStatusElement.style.backgroundColor = "#fecaca";
  }
}

window.addEventListener("online", updateNetworkStatus);
window.addEventListener("offline", updateNetworkStatus);

document.addEventListener("DOMContentLoaded", updateNetworkStatus);

//	•	Bu da assignment’taki “extra device capability” kısmını karşılıyor:
//	•	network connectivity information
//	•	İnternet gidince “Offline” yazıyor, renk değişiyor.