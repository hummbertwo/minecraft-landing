export default function handler(req, res) {
  const rankingData = [
    { name: "Player1", time: 120 },
    { name: "Player2", time: 98 },
    { name: "Player3", time: 75 },
    { name: "Player4", time: 62 },
    { name: "Player5", time: 55 },
    { name: "Player6", time: 40 },
    { name: "Player7", time: 35 },
    { name: "Player8", time: 22 },
    { name: "Player9", time: 15 },
    { name: "Player10", time: 12 }
  ];
  res.status(200).json(rankingData);
}
