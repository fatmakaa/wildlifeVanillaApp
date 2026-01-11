let deferredPrompt = null;

window.addEventListener("beforeinstallprompt", (event) => {
  // Block the browser's default mini-infobar
  event.preventDefault();
  deferredPrompt = event;

  console.log("beforeinstallprompt fired – app is installable.");

  const installButton = document.getElementById("installButton");
  if (installButton) {
    installButton.hidden = false;
  }
});

window.addEventListener("appinstalled", () => {
  console.log("PWA was installed.");
  const installButton = document.getElementById("installButton");
  if (installButton) {
    installButton.hidden = true;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const installButton = document.getElementById("installButton");
  if (!installButton) {
    console.warn("Install button not found in the DOM.");
    return;
  }

  installButton.addEventListener("click", async () => {
    if (!deferredPrompt) {
      console.log("No install prompt is available.");
      alert("Install is not available yet. Check that the app is installable (HTTPS, manifest, service worker).");
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    const result = await deferredPrompt.userChoice;
    console.log("User install choice:", result.outcome);

    if (result.outcome === "accepted") {
      console.log("User accepted the install prompt.");
      installButton.hidden = true;
    } else {
      console.log("User dismissed the install prompt.");
    }

    deferredPrompt = null;
  });
});