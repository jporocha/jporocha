// /api/message/

const express = require("express");
const MessageService = require("../services/MessageService");
const router = express.Router();
const auth = require("../middleware/auth");

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validateEntries(val) {
  return val.trim().length > 0;
}

function sanitizeEntries(val) {
  return val.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

router.post("/", async (req, res) => {
  const { name, email, phone, content } = req.body;

  if (!name || !email || !phone || !content)
    return res.status(400).send({ msg: "Dados incompletos" });

  if (!validateEmail(email))
    return res.status(400).send({ msg: "E-mail inválido." });

  if (!validateEntries(name) || !validateEntries(content))
    return res.status(400).send({ msg: "Nome e/ou mensagem em branco." });

  const newMessage = {
    content: sanitizeEntries(content),
    sentBy: sanitizeEntries(name),
    phone: sanitizeEntries(phone),
    email,
  };

  let response = await MessageService.NewMessage(newMessage);

  res.status(response.statusCode).send({ msg: response.payload });
});

router.get("/", auth(), async (req, res) => {
  let response = await MessageService.FetchMessages();
  res.status(response.statusCode).send({ msg: response.payload });
});

router.put("/:id", auth(), async (req, res) => {
  const changes = req.body;

  const id = req.params.id;

  if (!changes) return res.status(400).send({ msg: "Sem alterações" });

  let response = await MessageService.EditMessage(id, changes);

  res.status(response.statusCode).send({ msg: response.payload });
});

module.exports = router;
