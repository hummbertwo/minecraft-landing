export default function handler(req, res) {
  res.status(200).json({
    online: true,
    players: [
      { name: "Steve", uuid: "123" },
      { name: "Alex", uuid: "456" }
    ]
  });
}
