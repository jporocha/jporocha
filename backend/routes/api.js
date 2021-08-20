const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  console.log("Rota de testes ok.");
  res.status(200).send("Ok");
});
router.use("/users", require("./UserRouter.js"));
router.use("/auth", require("./AuthRouter.js"));

module.exports = router;
