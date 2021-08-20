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

async function main(from, to, subject, text, html) {
  let info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
}

module.exports = main;
