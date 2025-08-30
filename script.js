async function fetchServerStatus() {
  try {
    const response = await fetch("/api/status");
    const data = await response.json();

    document.getElementById("server-status").textContent =
      data.online ? "🟢 Servidor en línea" : "🔴 Servidor desconectado";

    document.getElementById("server-players").textContent =
      `Jugadores conectados: ${data.players.online} / ${data.players.max}`;
  } catch (error) {
    document.getElementById("server-status").textContent =
      "❌ Error al conectar con el servidor";
    document.getElementById("server-players").textContent = "";
  }
}

fetchServerStatus();
