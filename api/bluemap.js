export default async function handler(req, res) {
  try {
    const resPlayers = await fetch("http://http://smp-hserver.duckdns.org:8100/api/player/online");
    const players = await resPlayers.json();

    const resMaps = await fetch("http://http://smp-hserver.duckdns.org:8100/api/maps");

    res.status(200).json({
      online: resMaps.ok,
      players: {
        online: players.length,
        max: 20, // aquí pones tu límite real
        list: players.map(p => p.name)
      }
    });
  } catch (err) {
    console.error("Error consultando BlueMap:", err);
    res.status(200).json({
      online: false,
      players: { online: 0, max: 0, list: [] }
    });
  }
}