export default async function handler(req, res) {
  try {
    const bluemapUrl = "http://smp-hserver.duckdns.org:8100/api/players";
    const response = await fetch(bluemapUrl);
    const players = await response.json();

    res.status(200).json({
      online: true,
      players: {
        online: players.length,
        list: players.map(p => p.name),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(200).json({
      online: false,
      players: { online: 0, list: [] },
    });
  }
}
