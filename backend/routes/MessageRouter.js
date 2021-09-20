// /api/message/

const express = require("express");
const MessageService = require("../services/MessageService");
const router = express.Router();

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validateEntries(val) {
  return val.trim().length > 0;
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
    content: content,
    sentBy: name,
    phone: phone,
    email,
  };

  let response = await MessageService.NewMessage(newMessage);

  res.status(response.statusCode).send({ msg: response.payload });
});

router.put("/:id", async (req, res) => {
  const changes = {
    repliedBy: req.body,
  };
  const id = req.params.id;

  if (!repliedBy) return res.status(400).send({ msg: "Dados incompletos" });

  let response = await MessageService.EditMessage(id, changes);

  res.status(response.statusCode).send({ msg: response.payload });
});

module.exports = router;
