// js/animals.js

document.addEventListener("DOMContentLoaded", () => {
  const listEl = document.getElementById("animalList");
  if (!listEl) return;

  // Extra detail text shown when a card is expanded
  const extraDetailsByName = {
    "Red Fox":
      "This fox is on a long-term rehabilitation plan with daily checks on weight, mobility and appetite. Once the leg has fully healed, staff will slowly re-build fitness before releasing the fox back to nearby woodland.",

    "Hedgehog":
      "The hedgehogs are weighed every few days and kept warm in a quiet room. When they reach a safe winter weight, they are moved to an outdoor pen so they can get used to natural sounds and smells before release.",

    "Barn Owl":
      "The barn owl is practising short flights in a sheltered aviary. Staff carefully monitor wing strength and balance, and avoid unnecessary handling to keep the owl as wild as possible before returning it to the countryside.",

    "Grey Squirrel":
      "This squirrel was admitted dehydrated and underweight. It is now on a high-energy diet and has access to branches and enrichment toys that help it rebuild climbing strength before going back to the trees."
  };

  // Load animals from external JSON file
  fetch("data/animals.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((animals) => {
      renderAnimals(animals, listEl, extraDetailsByName);
    })
    .catch((err) => {
      console.error("Error loading animals:", err);
      listEl.innerHTML =
        '<p style="color:#b91c1c;">Unable to load animals at the moment. Please try again later.</p>';
    });
});

/**
 * Render all animal cards into the list element.
 */
function renderAnimals(animals, listEl, extraDetailsByName) {
  listEl.innerHTML = "";

  animals.forEach((animal) => {
    const card = document.createElement("article");
    card.className = "animal-card";

    const content = document.createElement("div");
    content.className = "animal-content";

    // Image
    const img = document.createElement("img");
    img.className = "animal-image";
    img.src = animal.image;
    img.alt = animal.name;

    // Text block
    const textBlock = document.createElement("div");

    const header = document.createElement("div");
    header.className = "animal-header";

    const nameEl = document.createElement("h3");
    nameEl.className = "animal-name";
    nameEl.textContent = animal.name;

    const locationEl = document.createElement("p");
    locationEl.className = "animal-location";
    locationEl.textContent = animal.enclosure; // e.g. "Woodland enclosure"

    header.appendChild(nameEl);
    header.appendChild(locationEl);

    const descEl = document.createElement("p");
    descEl.className = "animal-description";
    descEl.textContent = animal.description;

    // Extra details – hidden by default (see CSS .animal-extra)
    const extraEl = document.createElement("p");
    extraEl.className = "animal-extra";
    extraEl.textContent =
      extraDetailsByName[animal.name] ||
      "Centre staff record weight, appetite and behaviour to decide when each animal is ready to return to the wild.";

    textBlock.appendChild(header);
    textBlock.appendChild(descEl);
    textBlock.appendChild(extraEl);

    content.appendChild(img);
    content.appendChild(textBlock);

    // Favourites button
    const actions = document.createElement("div");
    actions.className = "animal-actions";

    const favBtn = document.createElement("button");
    favBtn.type = "button";
    favBtn.className = "btn btn-secondary";
    favBtn.textContent = "Add to favourites";

    favBtn.addEventListener("click", (event) => {
      event.stopPropagation(); // don't toggle details
      toggleFavourite(animal);
      favBtn.textContent = "Saved to favourites";
      favBtn.classList.add("btn-disabled");
    });

    actions.appendChild(favBtn);

    card.appendChild(content);
    card.appendChild(actions);

    // Click on the whole card toggles the extra details
    card.addEventListener("click", () => {
      card.classList.toggle("expanded");
    });

    listEl.appendChild(card);
  });
}

/**
 * Very simple favourites storage using localStorage.
 * (Used by favourites.html to read the saved list.)
 */
function toggleFavourite(animal) {
  const key = "jacob-wildlife-favourites";
  const stored = localStorage.getItem(key);
  let favourites = stored ? JSON.parse(stored) : [];

  const exists = favourites.some((a) => a.id === animal.id);
  if (!exists) {
    favourites.push(animal);
    localStorage.setItem(key, JSON.stringify(favourites));
  }
}