const BACKEND_URL = "/api/status";

async function fetchServerStatus() {
  const statusDiv = document.getElementById("status");
  const playersDiv = document.getElementById("players");
  playersDiv.innerHTML = "";

  try {
    const res = await fetch(BACKEND_URL);
    const data = await res.json();
    updateServerStatus(data); // reutilizamos la función de prueba
  } catch (err) {
    console.error(err);
    statusDiv.textContent = "⚠️ Error al consultar el servidor";
    statusDiv.style.color = "orange";
    playersDiv.innerHTML = "<p>No se pudo cargar la lista de jugadores</p>";
  }
}

fetchServerStatus();
setInterval(fetchServerStatus, 30000);
