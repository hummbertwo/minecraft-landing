import { status, statusBedrock } from "minecraft-server-util";

export default async function handler(req, res) {
  try {
    const javaData = await status("smp-hserver.duckdns.org", 25565, { timeout: 5000 });
    const bedrockData = await statusBedrock("smp-hserver.duckdns.org", 19135, { timeout: 5000 });

    res.status(200).json({
      online: true,
      players: {
        online: javaData.players.online + bedrockData.players.online,
        max: javaData.players.max || bedrockData.players.max || 50
      }
    });
  } catch {
    res.status(200).json({ online: false, players: { online: 0, max: 0 } });
  }
}
