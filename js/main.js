import { loadLanguage } from './i18n.js';

const langSelector = document.getElementById("language-select");
const themeToggle = document.getElementById("toggle-theme");

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

// Cambiar tema claro/oscuro
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");
    themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

// Aplicar tema guardado en localStorage
function applyInitialTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.classList.toggle("dark-mode", savedTheme === "dark");
    document.body.classList.toggle("light-mode", savedTheme !== "dark");
    themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";
}

// Inicialización
const initialLang = detectInitialLanguage();
applyInitialTheme();
applyLanguage(initialLang);
