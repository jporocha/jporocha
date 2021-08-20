// /api/users/

const UserService = require("../services/UserService");
const express = require("express");
const router = express.Router();

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

module.exports = router;
