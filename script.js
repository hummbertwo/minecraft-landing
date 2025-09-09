const BACKEND_URL = "/api/status";

/* =====================================================
   🔹 1. Estado del Servidor
===================================================== */
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

// Inicializar y refrescar cada 30s
fetchServerStatus();
setInterval(fetchServerStatus, 30000);


/* =====================================================
   🔹 2. Popup para copiar IP
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const playBtn = document.getElementById("playBtn");
  const modal = document.getElementById("serverModal");
  const closeBtn = document.querySelector(".close-btn");
  const closeModalBtn = document.getElementById("closeModalBtn");

  if (!playBtn || !modal) return;

  // Abrir modal con botón "Jugar Ahora"
  playBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  // Cerrar con la X
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Cerrar con botón "¡Entendido!"
  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Cerrar si se hace click fuera del modal
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});




/* =====================================================
   🔹 3. Reglas del Servidor
===================================================== */
const toggleRulesBtn = document.getElementById("toggleRules");
const rulesList = document.getElementById("rulesList");

if (toggleRulesBtn && rulesList) {
  // Inicia oculto en móvil
  if (window.innerWidth <= 900) {
    rulesList.style.display = "none";
    toggleRulesBtn.textContent = "Mostrar reglas ▾";
  }

  toggleRulesBtn.addEventListener("click", () => {
    const shown = rulesList.style.display !== "none";
    rulesList.style.display = shown ? "none" : "block";
    toggleRulesBtn.textContent = shown ? "Mostrar reglas ▾" : "Ocultar reglas ▴";
  });

  // Ajustar al redimensionar
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      rulesList.style.display = "block";
      toggleRulesBtn.textContent = "Mostrar reglas ▾";
    } else {
      rulesList.style.display = "none";
      toggleRulesBtn.textContent = "Mostrar reglas ▾";
    }
  });

  document.getElementById("joinNowSmall").addEventListener("click", () => {
  window.open("http://smp-hserver.duckdns.org:8500", "_blank");
  });
}




// Inicializar y refrescar cada 60s
fetchPlaytimeRanking();
setInterval(fetchPlaytimeRanking, 60000);


