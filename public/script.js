const BACKEND_URL = "/api/status";

async function fetchServerStatus() {
  const statusDiv = document.getElementById("status");
  const playersDiv = document.getElementById("players");
  playersDiv.innerHTML = "";

  try {
    const res = await fetch(BACKEND_URL);
    const data = await res.json();

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

  } catch (err) {
    console.error(err);
    statusDiv.textContent = "⚠️ Error al consultar el servidor";
    statusDiv.style.color = "orange";
  }
}

fetchServerStatus();
setInterval(fetchServerStatus, 30000);

// Popup PLAY
const playBtn = document.getElementById("playBtn");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");
const copyBtn = document.getElementById("copyBtn");
const copyMsg = document.getElementById("copyMsg");
const serverIP = document.getElementById("serverIP");

playBtn.addEventListener("click", () => popup.classList.add("visible"));
closePopup.addEventListener("click", () => popup.classList.remove("visible"));
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(serverIP.value).then(() => {
    copyMsg.textContent = "✅ IP copiada";
    setTimeout(() => copyMsg.textContent = "", 2000);
  });
});
