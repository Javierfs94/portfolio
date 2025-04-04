export async function loadLanguage(lang) {
  const response = await fetch(`./lang/${lang}.json`);
  return await response.json();
}
