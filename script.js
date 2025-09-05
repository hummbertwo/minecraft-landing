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
const playBtn = document.getElementById("playBtn");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");
const copyBtn = document.getElementById("copyBtn");
const copyMsg = document.getElementById("copyMsg");
const serverIP = document.getElementById("serverIP");

if (playBtn && popup && closePopup && copyBtn && serverIP && copyMsg) {
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
}


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
  window.open("http://smpcremaserver.duckdns.org:8500", "_blank");
  });
}


/* =====================================================
   🔹 4. Ranking por tiempo de juego
===================================================== */
async function fetchPlaytimeRanking() {
  try {
    const res = await fetch("/api/playtime"); // API interna de Vercel
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

// Inicializar y refrescar cada 60s
fetchPlaytimeRanking();
setInterval(fetchPlaytimeRanking, 60000);


