// =======================
// Datos de prueba para testear
// =======================
const testData = {
  online: true,
  players: {
    online: 3,
    max: 20,
    list: ["Steve", "Alex", "Notch"]
  }
};

// =======================
// Función para actualizar UI usando datos de prueba
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
// Ejecutar prueba
// =======================
updateServerStatus(testData);
