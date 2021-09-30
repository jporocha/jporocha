// /api/users/

const BudgetService = require("../services/BudgetService");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");
const upload = multer();

router.post("/createBudget", auth(), async (req, res) => {
  const {
    client,
    contrato = "",
    profissionalHabilitado,
    tipoProjeto,
  } = req.body;

  if (!client || !profissionalHabilitado || !tipoProjeto)
    return res.status(400).send({ erro: "Dados incompletos" });

  const newJob = {
    client,
    profissionalHabilitado,
    tipoProjeto,
    contrato,
  };

  let response = await BudgetService.CreateJob(newJob);
  res.status(response.statusCode).send(response.payload);
});

router.get("/all", auth(), async (req, res) => {
  let response = await BudgetService.FetchJobs(false);
  res.status(response.statusCode).send(response.payload);
});

router.get("/byId", async (req, res) => {
  let userId = req.user.id;
  let response = await BudgetService.FetchJobs(userId);
  console.log(response);
  res.status(response.statusCode).send(response.payload);
});

router.post(
  "/insertAttachment",
  [auth(), upload.single("attachment")],
  async (req, res) => {
    const { expiration, id } = req.body;
    const file = req.file;

    if (!expiration || !id || !file.originalname)
      return res.status(400).send({ erro: "Dados incompletos" });

    let response = await BudgetService.CreateAttachment(
      id,
      file.buffer,
      file.originalname,
      file.mimetype,
      expiration
    );
    res.status(response.statusCode).send(response.payload);
  }
);

router.post("/anexo", async (req, res) => {
  const file = req.body.file;
  let response = await BudgetService.DownloadAttachment(file.key);
  if (response.statusCode > 300)
    return res.status(401).send("Falha ao buscar arquivo.");
  res.set({
    "Content-Type": file.mimetype,
  });
  res.status(response.statusCode).send(response.payload.Body);
});

module.exports = router;
