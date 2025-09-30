const BACKEND_URL = "/api/server"; // aquí tu endpoint backend

/* ==============================
   🔹 1. Estado del Servidor
============================== */
async function fetchServerStatus() {
  try {
    const res = await fetch(BACKEND_URL);
    const data = await res.json();

    const statusDiv = document.getElementById("status");
    if (data.online) {
      statusDiv.textContent = `✅ Online - ${data.players.online}/${data.players.max}`;
      statusDiv.style.color = "lightgreen";
    } else {
      statusDiv.textContent = "❌ Servidor Offline";
      statusDiv.style.color = "red";
    }
  } catch (err) {
    const statusDiv = document.getElementById("status");
    statusDiv.textContent = "⚠️ Error al consultar el servidor";
    statusDiv.style.color = "orange";
  }
}
fetchServerStatus();
setInterval(fetchServerStatus, 30000);

/* ==============================
   🔹 2. Ranking de Jugadores
============================== */
async function fetchPlaytimeRanking() {
  try {
    const res = await fetch("/api/ranking");
    const ranking = await res.json();

    const list = document.getElementById("rankingList");
    list.innerHTML = "";

    ranking.slice(0, 10).forEach((player, index) => {
      const li = document.createElement("li");
      li.textContent = `#${index + 1} ${player.name} - ${player.time} hrs`;
      list.appendChild(li);
    });
  } catch (err) {
    document.getElementById("rankingList").innerHTML = "<li>No disponible</li>";
  }
}
fetchPlaytimeRanking();
setInterval(fetchPlaytimeRanking, 60000);

/* ==============================
   🔹 3. Modal de IP
============================== */
document.addEventListener("DOMContentLoaded", () => {
  const playBtn = document.getElementById("playBtn");
  const modal = document.getElementById("serverModal");
  const closeBtn = document.querySelector(".close-btn");
  const closeModalBtn = document.getElementById("closeModalBtn");

  playBtn.addEventListener("click", () => modal.style.display = "flex");
  closeBtn.addEventListener("click", () => modal.style.display = "none");
  closeModalBtn.addEventListener("click", () => modal.style.display = "none");
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
});
