const API = "https://YOUR-WORKER.yourname.workers.dev";

async function loadZones() {
  const res = await fetch(API + "/zones");
  const data = await res.json();

  const box = document.getElementById("zones");
  box.innerHTML = "";

  data.result.forEach(z => {
    const d = document.createElement("div");
    d.innerHTML = `
      <b>${z.name}</b>
      <button onclick="purge('${z.id}')">Purge Cache</button>
    `;
    box.appendChild(d);
  });
}

async function purge(zone) {
  await fetch(API + "/purge", {
    method: "POST",
    body: JSON.stringify({ zone })
  });
  alert("Cache purged");
}
