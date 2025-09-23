// /pages/api/status.js (Next.js) o /api/status.js (Vercel/Node)
import { status } from "minecraft-server-util";

export default async function handler(req, res) {
  try {
    const result = await status("smp-hserver.duckdns.org", 25565, { timeout: 5000 });

    res.status(200).json({
      online: true,
      players: {
        online: result.players.online,
        max: result.players.max,
        list: result.players.sample ? result.players.sample.map(p => p.name) : []
      },
      version: result.version.name,
      motd: result.motd.clean
    });
  } catch (err) {
    console.error("Error consultando servidor:", err.message);
    res.status(200).json({
      online: false,
      players: { online: 0, max: 0, list: [] },
      version: null,
      motd: null
    });
  }
}