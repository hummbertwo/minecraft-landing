const BACKEND_URL = "/api/bluemap";

/* =====================================================
   🔹 1. Estado del Servidor
===================================================== */
async function fetchServerStatus() {
  try {
    // BlueMap responde en /api/player/online para la lista de jugadores
    const resPlayers = await fetch("http://smp-hserver.duckdns.org:8100/api/player/online");
    const players = await resPlayers.json();

    // Si esto responde, el server está online
    const resMaps = await fetch("http://smp-hserver.duckdns.org:8100/api/maps");

    const data = {
      online: resMaps.ok,
      players: {
        online: players.length,
        max: 20, // aquí puedes poner el máximo que tenga tu server
        list: players.map(p => p.name)
      }
    };

    updateServerStatus(data);

  } catch (err) {
    updateServerStatus({ online: false, players: { online: 0, max: 0, list: [] } });
  }
}

// correr al cargar y cada 30s
fetchServerStatus();
setInterval(fetchServerStatus, 30000);

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
  window.open("http://smp-hserver.duckdns.org:8100", "_blank");
  });
}




// Inicializar y refrescar cada 60s
fetchPlaytimeRanking();
setInterval(fetchPlaytimeRanking, 60000);


