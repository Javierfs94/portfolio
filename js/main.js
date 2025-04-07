import { loadLanguage } from "./i18n.js";

const langSelector = document.getElementById("language-select");
const themeToggle = document.getElementById("toggle-theme");

// Activar todos los tooltips de Bootstrap
const tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
tooltipTriggerList.forEach(function (tooltipTriggerEl) {
  new bootstrap.Tooltip(tooltipTriggerEl);
});

async function applyLanguage(lang) {
  const translations = await loadLanguage(lang);
  for (const key in translations) {
    const element = document.getElementById(key);
    if (element) {
      element.innerHTML = translations[key];
    }
  }
  // Actualiza el selector visualmente y guarda en localStorage
  langSelector.value = lang;
  localStorage.setItem("lang", lang);
}

function detectInitialLanguage() {
  // 1. Si ya hay idioma guardado, úsalo
  const savedLang = localStorage.getItem("lang");
  if (savedLang) return savedLang;

  // 2. Si no, detecta el idioma del navegador
  const browserLang = navigator.language.slice(0, 2);
  return browserLang === "es" ? "es" : "en";
}

langSelector.addEventListener("change", () => {
  applyLanguage(langSelector.value);
});

themeToggle.addEventListener("click", function () {
  // Cambiar tema en el body
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");

  // Cambiar icono de modo
  this.textContent = document.body.classList.contains("dark-mode")
    ? "☀️"
    : "🌙";

  // Guardar el tema actual en localStorage
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark-mode") ? "dark" : "light"
  );
});

// Aplicar tema guardado en localStorage
function applyInitialTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.classList.toggle("dark-mode", savedTheme === "dark");
  document.body.classList.toggle("light-mode", savedTheme !== "dark");

  // Cambiar el icono según el tema
  document.getElementById("toggle-theme").textContent =
    savedTheme === "dark" ? "☀️" : "🌙";
}

// Inicialización
const initialLang = detectInitialLanguage();
applyInitialTheme();
applyLanguage(initialLang);
