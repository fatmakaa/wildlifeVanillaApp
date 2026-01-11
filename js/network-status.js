// js/network-status.js

/**
 * Update the network status text and styling based on navigator.onLine.
 */
function updateNetworkStatus() {
  const statusEl = document.getElementById("network-status");
  if (!statusEl) return; // Safety check: element not present on this page

  if (navigator.onLine) {
    statusEl.textContent = "You are online. All features are available.";
    statusEl.classList.remove("offline");
    statusEl.classList.add("online");
  } else {
    statusEl.textContent = "You are offline. Some data may not update until you reconnect.";
    statusEl.classList.remove("online");
    statusEl.classList.add("offline");
  }
}

// Run once when the page has loaded
window.addEventListener("DOMContentLoaded", updateNetworkStatus);

// Listen for changes in network connectivity
window.addEventListener("online", updateNetworkStatus);
window.addEventListener("offline", updateNetworkStatus);