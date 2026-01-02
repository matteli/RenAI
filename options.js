async function saveOptions(e) {
  e.preventDefault();
  await browser.storage.local.set({
    cle: document.querySelector("#cle").value,
    prompt: document.querySelector("#prompt").value
  });
}
async function restoreOptions() {
  res = await browser.storage.local.get();
  if (typeof res.cle !== 'undefined') document.querySelector("#cle").value = res.cle;
  else document.querySelector("#cle").value = "";
  if (typeof res.prompt !== 'undefined') document.querySelector("#prompt").value = res.prompt;
  else document.querySelector("#prompt").value = "Rédige une appréciation sur le même ton de 20 à 30 mots qui résume la liste des appréciations suivantes.";
}
document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);