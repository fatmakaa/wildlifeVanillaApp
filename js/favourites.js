// favourites.js
// Read favourite animals from localStorage and display them.

const favouritesListEl = document.getElementById("favouritesList");
const favouritesEmptyEl = document.getElementById("favouritesEmptyMessage");
const favouritesCountEl = document.getElementById("favouritesCount");
const clearBtn = document.getElementById("clearFavouritesBtn");

function getFavourites() {
  try {
    return JSON.parse(localStorage.getItem("favourites") || "[]");
  } catch (e) {
    console.error("Error reading favourites from localStorage", e);
    return [];
  }
}

function updateCount(count) {
  if (!favouritesCountEl) return;
  if (count === 0) {
    favouritesCountEl.textContent = "You currently have no favourite animals.";
  } else if (count === 1) {
    favouritesCountEl.textContent = "You have 1 favourite animal on this device.";
  } else {
    favouritesCountEl.textContent = `You have ${count} favourite animals on this device.`;
  }
}

function renderFavourites() {
  const favourites = getFavourites();

  // clear existing content
  favouritesListEl.innerHTML = "";

  if (!favourites || favourites.length === 0) {
    favouritesEmptyEl.hidden = false;
    updateCount(0);
    clearBtn.disabled = true;
    clearBtn.classList.add("btn-disabled");
    return;
  }

  favouritesEmptyEl.hidden = true;
  clearBtn.disabled = false;
  clearBtn.classList.remove("btn-disabled");

  favourites.forEach((animal) => {
    const card = document.createElement("article");
    card.className = "animal-card";

    card.innerHTML = `
      <div class="animal-content">
        <img class="animal-image" src="${animal.image}" alt="${animal.name}">
        <div style="flex:1;">
          <div class="animal-header">
            <div>
              <div class="animal-name">${animal.name}</div>
              <div class="animal-location">${animal.location || ""}</div>
            </div>
          </div>
          <p class="animal-description">${animal.description || ""}</p>
        </div>
      </div>
    `;

    favouritesListEl.appendChild(card);
  });

  updateCount(favourites.length);
}

if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    const favourites = getFavourites();
    if (!favourites || favourites.length === 0) {
      return;
    }

    const confirmed = confirm("Are you sure you want to remove all favourite animals from this device?");
    if (!confirmed) return;

    localStorage.removeItem("favourites");
    renderFavourites();
  });
}

// run on load
document.addEventListener("DOMContentLoaded", renderFavourites);