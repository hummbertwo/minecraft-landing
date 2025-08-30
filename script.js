async function fetchServerStatus() {
  try {
    const response = await fetch("/api/status");
    const data = await response.json();

    // Estado del servidor
    document.getElementById("server-status").textContent =
      data.online ? "🟢 Servidor en línea" : "🔴 Servidor desconectado";

    document.getElementById("server-players").textContent =
      `Jugadores conectados: ${data.players.online} / ${data.players.max}`;

    // Jugadores conectados
    const playerList = document.getElementById("player-list");
    playerList.innerHTML = "";

    if (data.players.online > 0) {
      data.players.sample.forEach(player => {
        const card = document.createElement("div");
        card.className = "player-card";

        card.innerHTML = `
          <img src="https://crafatar.com/avatars/${player.id}?size=80&overlay=true" alt="${player.name}">
          <p>${player.name}</p>
        `;

        playerList.appendChild(card);
      });
    } else {
      playerList.innerHTML = "<p>No hay jugadores conectados 😴</p>";
    }
  } catch (error) {
    document.getElementById("server-status").textContent =
      "❌ Error al conectar con el servidor";
    document.getElementById("server-players").textContent = "";
    document.getElementById("player-list").innerHTML =
      "<p>No se pudo obtener la lista de jugadores</p>";
  }
}

fetchServerStatus();
