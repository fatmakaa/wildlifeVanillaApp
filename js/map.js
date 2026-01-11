// map.js
// Handle "Find my location" and update the map + status text.

const locateBtn = document.getElementById("locateBtn");
const statusEl = document.getElementById("locationStatus");
const mapFrame = document.getElementById("mapFrame");

// Jacob Wildlife Centre approximate location (Liverpool)
const centreLat = 53.4084;
const centreLon = -2.9916;

function setStatus(message) {
  statusEl.textContent = message;
}

function buildOsmUrl(lat, lon) {
  const delta = 0.02; // zoom alanı
  const left = lon - delta;
  const bottom = lat - delta;
  const right = lon + delta;
  const top = lat + delta;

  return `https://www.openstreetmap.org/export/embed.html?bbox=${left}%2C${bottom}%2C${right}%2C${top}&layer=mapnik&marker=${lat}%2C${lon}`;
}

locateBtn.addEventListener("click", () => {
  if (!("geolocation" in navigator)) {
    setStatus("Geolocation is not supported by this browser.");
    return;
  }

  setStatus("Trying to detect your location...");

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const latRounded = latitude.toFixed(4);
      const lonRounded = longitude.toFixed(4);

      setStatus(`Your location: ${latRounded}, ${lonRounded}`);

      // haritayı kullanıcının konumuna zoomla
      const url = buildOsmUrl(latitude, longitude);
      mapFrame.src = url;
    },
    (error) => {
      console.error("Geolocation error:", error);
      switch (error.code) {
        case error.PERMISSION_DENIED:
          setStatus("Location access was denied. You can enable location in your browser settings.");
          break;
        case error.POSITION_UNAVAILABLE:
          setStatus("Location information is unavailable at the moment.");
          break;
        case error.TIMEOUT:
          setStatus("Location request timed out. Please try again.");
          break;
        default:
          setStatus("Unable to detect your location.");
      }
    }
  );
});

// İlk yüklemede: merkez konumuna ayarla (zaten iframe src'de var ama tutarlı olsun)
document.addEventListener("DOMContentLoaded", () => {
  const url = buildOsmUrl(centreLat, centreLon);
  mapFrame.src = url;
});