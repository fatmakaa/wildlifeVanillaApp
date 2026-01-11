document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;

  if (!themeToggle || !root) {
    console.warn("Theme toggle or root element not found");
    return;
  }

  function applyTheme(theme) {
    root.classList.remove("light-mode", "dark-mode");

    if (theme === "dark") {
      root.classList.add("dark-mode");
      themeToggle.textContent = "☀️"; // show sun to switch back to light
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.add("light-mode");
      themeToggle.textContent = "🌙"; // show moon to switch to dark
      localStorage.setItem("theme", "light");
    }
  }

  // 1) Check saved preference
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") {
    applyTheme(saved);
  } else {
    // 2) No saved preference → use device setting
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "dark" : "light");
  }

  // 3) Toggle on click
  themeToggle.addEventListener("click", () => {
    const isDark = root.classList.contains("dark-mode");
    applyTheme(isDark ? "light" : "dark");
  });
});