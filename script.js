const BACKEND_URL = "/api/status";

// =======================
// Función para actualizar UI
// =======================
function updateServerStatus(data) {
  const statusDiv = document.getElementById("status");
  const playersDiv = document.getElementById("players");
  playersDiv.innerHTML = "";

  if (!data.online) {
    statusDiv.textContent = "❌ Servidor Offline";
    statusDiv.style.color = "red";
    playersDiv.innerHTML = "<p>No hay jugadores conectados</p>";
    return;
  }

  statusDiv.textContent = `✅ Online - ${data.players.online}/${data.players.max}`;
  statusDiv.style.color = "lightgreen";

  if (data.players.list && data.players.list.length > 0) {
    data.players.list.forEach(player => {
      const card = document.createElement("div");
      card.className = "player-card";

      const avatar = document.createElement("img");
      avatar.src = `https://minotar.net/avatar/${player}/72`;
      avatar.alt = player;

      const name = document.createElement("div");
      name.className = "player-name";
      name.textContent = player;

      card.appendChild(avatar);
      card.appendChild(name);
      playersDiv.appendChild(card);
    });
  } else {
    playersDiv.innerHTML = "<p>No hay jugadores conectados</p>";
  }
}

// =======================
// Fetch real al servidor
// =======================
async function fetchServerStatus() {
  try {
    const res = await fetch(BACKEND_URL);
    const data = await res.json();
    updateServerStatus(data);
  } catch (err) {
    console.error(err);
    const statusDiv = document.getElementById("status");
    const playersDiv = document.getElementById("players");
    statusDiv.textContent = "⚠️ Error al consultar el servidor";
    statusDiv.style.color = "orange";
    playersDiv.innerHTML = "<p>No se pudo cargar la lista de jugadores</p>";
  }
}

fetchServerStatus();
setInterval(fetchServerStatus, 30000);

// =======================
// Popup para copiar IP
// =======================
const playBtn = document.getElementById("playBtn");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");
const copyBtn = document.getElementById("copyBtn");
const copyMsg = document.getElementById("copyMsg");
const serverIP = document.getElementById("serverIP");

playBtn.addEventListener("click", () => popup.classList.remove("hidden"));
closePopup.addEventListener("click", () => popup.classList.add("hidden"));

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(serverIP.value).then(() => {
    copyMsg.textContent = "✅ IP copiada";
    setTimeout(() => copyMsg.textContent = "", 2000);
  }).catch(() => {
    copyMsg.textContent = "⚠️ Error al copiar";
    setTimeout(() => copyMsg.textContent = "", 2000);
  });
});

// =======================
// Fetch Playtime Ranking
// =======================
// Cambia esta URL por la que ngrok te dio (https://xxxx.ngrok.app)
const BACKEND_PLAYTIME_URL = "https://361dc5aeb5a4.ngrok-free.app/api/playtime";

// =======================
// Fetch Playtime Ranking
// =======================
async function fetchPlaytimeRanking() {
  try {
    const res = await fetch(BACKEND_PLAYTIME_URL);
    if (!res.ok) throw new Error("Error en la respuesta del servidor");

    const data = await res.json();

    const rankingDiv = document.getElementById("ranking");
    rankingDiv.innerHTML = "";

    data.forEach((player, i) => {
      const card = document.createElement("div");
      card.className = "player-card";
      card.innerHTML = `
        <h3>#${i + 1}</h3>
        <img src="https://minotar.net/avatar/${player.uuid}/72" alt="${player.name}" />
        <p>${player.name}</p>
        <p>⏱ ${player.playtime}</p>
      `;
      rankingDiv.appendChild(card);
    });
  } catch (err) {
    console.error("Error al cargar ranking:", err);
    document.getElementById("ranking").innerHTML = "<p>⚠️ No se pudo cargar el ranking</p>";
  }
}

fetchPlaytimeRanking();
setInterval(fetchPlaytimeRanking, 60000); // refresca cada minuto



