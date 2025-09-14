// /api/status.js
export default async function handler(req, res) {
  try {
    const SERVER_IP = "189.160.22.235"; // tu IP o dominio
    const SERVER_PORT = 19135; // puerto Bedrock por defecto

    const response = await fetch(`https://api.mcsrvstat.us/bedrock/2/${SERVER_IP}:${SERVER_PORT}`);
    const result = await response.json();

    if (!result.online) {
      return res.status(200).json({
        online: false,
        players: { online: 0, max: 0, list: [] }
      });
    }

    res.status(200).json({
      online: true,
      players: {
        online: result.players?.online || 0,
        max: result.players?.max || 0,
        list: result.players?.list || []
      }
    });
  } catch (err) {
    console.error(err);
    res.status(200).json({
      online: false,
      players: { online: 0, max: 0, list: [] }
    });
  }
}
