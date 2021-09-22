// /api/users/

const UserService = require("../services/UserService");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/createUser", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).send({ erro: "Dados incompletos" });

  const newUser = {
    name,
    email,
    password,
    localStrategy: true,
  };

  let response = await UserService.CreateUser(newUser);
  res.status(response.statusCode).send(response.payload);
});

router.post("/recoverPassword", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).send({ erro: "Dados incompletos" });

  let response = await UserService.RecoverPassword(email);
  res.status(response.statusCode).send(response.payload);
});

router.post("/resetPassword", async (req, res) => {
  const { email, token, password } = req.body;

  if (!token || !password || !email)
    return res.status(400).send({ erro: "Dados incompletos" });

  let response = await UserService.ResetPassword(email, token, password);

  res.status(response.statusCode).send(response.payload);
});

router.get("/", auth(), async (req, res) => {
  let response = await UserService.FetchUsers();

  res.status(response.statusCode).send(response.payload);
});

router.put("/:id", auth(), async (req, res) => {
  let id = req.params.id;
  let changes = req.body;

  if (!changes)
    return res.status(400).send("Não foram enviados parâmetros para edição.");

  let response = await UserService.EditUser(id, changes);

  res.status(response.statusCode).send(response.payload);
});

router.post("/adminUser", auth(), async (req, res) => {
  let user = req.body;

  if (!user.email)
    return res.status(400).send("Defina um e-mail para o usuário.");

  user.password = user.email;
  user.localStrategy = true;

  let response = await UserService.CreateUser(user);

  res.status(response.statusCode).send(response.payload);
});

module.exports = router;
