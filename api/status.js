import { status } from "minecraft-server-util";

export default async function handler(req, res) {
  try {
    // Cambia IP y puerto a los de tu servidor
    const result = await status("smpcremaserver.duckdns.org", 25565, { timeout: 5000 });
    
    res.status(200).json({
      online: true,
      players: {
        online: result.players.online,
        max: result.players.max,
        list: result.players.sample ? result.players.sample.map(p => p.name) : []
      }
    });
  } catch (err) {
    console.error(err);
    res.status(200).json({
      online: false,
      players: {
        online: 0,
        max: 0,
        list: []
      }
    });
  }
}
