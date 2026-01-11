// animals.js
// Fetch animals from external JSON and display them.
// Also allow user to add an animal to favourites (stored in localStorage).

const animalListElement = document.getElementById("animalList");

async function loadAnimals() {
  try {
    const response = await fetch("data/animals.json");
    const animals = await response.json();

    animals.forEach((animal) => {
      const card = document.createElement("article");
      card.className = "animal-card";

      card.innerHTML = `
        <div class="animal-header">
          <div>
            <div class="animal-name">${animal.name}</div>
            <div class="animal-location">${animal.location}</div>
          </div>
        </div>
        <p class="animal-description">${animal.description}</p>
        <div class="animal-actions">
          <button class="btn-secondary" data-id="${animal.id}">Add to favourites</button>
        </div>
      `;

      animalListElement.appendChild(card);
    });

    // Attach click handlers for favourite buttons
    animalListElement.addEventListener("click", (event) => {
      if (event.target.matches("button[data-id]")) {
        const id = event.target.getAttribute("data-id");
        const animal = animals.find((a) => a.id === id);
        addToFavourites(animal);
      }
    });
  } catch (error) {
    animalListElement.textContent = "Unable to load animals at the moment.";
    console.error(error);
  }
}

function addToFavourites(animal) {
  const existing = JSON.parse(localStorage.getItem("favourites") || "[]");
  // Avoid duplicates
  const already = existing.some((item) => item.id === animal.id);
  if (!already) {
    existing.push(animal);
    localStorage.setItem("favourites", JSON.stringify(existing));
    alert(`${animal.name} added to favourites.`);
  } else {
    alert(`${animal.name} is already in favourites.`);
  }
}

document.addEventListener("DOMContentLoaded", loadAnimals);