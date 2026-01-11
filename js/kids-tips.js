// kids-tips.js
// Show a random wildlife tip for children.

const tips = [
  "Ask an adult to help you put out a shallow dish of water for birds and small animals.",
  "Leave one small corner of your garden a bit wild so insects and hedgehogs can hide there.",
  "If you find a baby bird or animal, do not pick it up. Tell an adult and contact a rescue centre.",
  "Always take your litter home or put it in a bin so animals do not get trapped in it.",
  "Keep dogs on a lead near wildlife areas so they do not disturb nesting birds.",
  "Plant flowers that bees and butterflies like, such as lavender or daisies."
];

const randomTipBtn = document.getElementById("randomTipBtn");
const randomTipText = document.getElementById("randomTipText");

if (randomTipBtn && randomTipText) {
  randomTipBtn.addEventListener("click", () => {
    const index = Math.floor(Math.random() * tips.length);
    const tip = tips[index];
    randomTipText.textContent = tip;
  });
}