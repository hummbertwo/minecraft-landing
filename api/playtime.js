// /api/playtime.js
export default function handler(req, res) {
  const ranking = [
    { uuid: "1fb4bb1b-2195-33da-8b2c-54663133bd62", name: "Dann_Galon", playtime: "0.00h", raw: 0 },
    { uuid: "39c30479-0b1b-3d23-bc64-b8d2dfa2175f", name: "nachoconkeso", playtime: "0.00h", raw: 0 },
    { uuid: "d9a88ea6-759a-3271-bd37-89f2d82fceb2", name: "Hummbertwo", playtime: "0.00h", raw: 0 }
  ];

  res.status(200).json(ranking);
}
