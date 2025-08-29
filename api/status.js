import util from "minecraft-server-util";

export default async function handler(req, res) {
  try {
    const result = await util.status("smpcremaserver.duckdns.org", 25565);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ online: false });
  }
}
