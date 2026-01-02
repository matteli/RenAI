const writeApp = async function () {
  loc = await browser.storage.local.get();
  var prompt = loc.prompt + "\n";
  if (apps = document.getElementById("GInterface.Instances[2].Instances[1]_grid_0")) {
    for (let i = 0; i < apps.children.length; i++) {
      if (apps.children[i].id.includes("GInterface.Instances[2].Instances[1]_23_")) {
        const app = apps.children[i].firstChild.firstChild.firstChild.textContent;
        const sanitizedApp = app.replace(/[^a-zA-Z0-9\s.,;!?]/g, '').trim();
        if (sanitizedApp.length > 1) {
          prompt += sanitizedApp;
          prompt += "\n"
        }
      }
    }
  }
  console.log(prompt);
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + loc.cle
  const body = '{"contents": [{"parts":[{"text": "' + prompt + '"}]}]}';
  const res = await fetch(url, {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await res.json();
  console.log(json);
  const response = json["candidates"][0]["content"]["parts"][0]["text"]
  console.log(response);
  if (tApp = document.getElementById('GInterface.Instances[2].Instances[2].Instances[3].Instances[1]_Edition')) {
    tApp.value = response;
    tApp.focus();
  }
}

function createRenAIButton() {
  var img = document.createElement("img");
  img.id = "RenAIStamp";
  img.setAttribute("src", browser.runtime.getURL("icons/stamp-12.png"));
  img.setAttribute("alt", "Tamponne RenAI !!")
  img.addEventListener("click", writeApp, false);
  return img;
}

function existRenAIButton(elmnt) {
  for (let i = 0; i < elmnt.children.length; i++) {
    if (elmnt.children[i].id == "RenAIStamp") {
      return true;
    }
  }
  return false;
}

function addRenAIButton(event) {
  if (box = document.getElementById("GInterface.Instances[2].Instances[2].Instances[3].Instances[1]_ZoneTexte")) {
    bBox = box.children[0].children[1];
    if (existRenAIButton(bBox) == false) {
      bBox.appendChild(createRenAIButton());
    }
  }
}

async function initApp() {
  loc = await browser.storage.local.get();
  const url = "https://generativelanguage.googleapis.com/v1beta/models?key=" + loc.cle
  const res = await fetch(url, {
    method: "GET",
  });
  const json = await res.json();
  if ("error" in json) {
    console.log("clé Gemini non valide");
    return false;
  }
  setInterval(addRenAIButton, 500);
}

initApp();
