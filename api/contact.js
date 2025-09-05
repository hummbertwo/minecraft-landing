// /api/contact.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hummber.km@gmail.com",
      pass: "Betohum.19",
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: "hummber.km@gmail.com",
      subject: "Nuevo mensaje de contacto",
      text: `De: ${email}\n\n${message}`, // incluye el correo del usuario
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}
