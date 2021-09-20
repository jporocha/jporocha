const nodemailer = require("nodemailer");

let user = process.env.GMAIL_USER;
let pass = process.env.GMAIL_PASS;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user,
    pass,
  },
});

transporter
  .verify()
  .then(console.log("Conectado ao servidor de e-mails..."))
  .catch(console.error);

async function main(to, subject, text, html) {
  try {
    let info = await transporter.sendMail({
      from: "Neomecânica <neomecanicaengenharia@gmail.com>",
      to,
      subject,
      text,
      html,
    });
    return info;
  } catch (e) {
    return { erro: e };
  }
}

module.exports = main;
