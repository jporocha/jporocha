const express = require("express");
const router = express.Router();

router.use("/users", require("./UserRouter.js"));
router.use("/auth", require("./AuthRouter.js"));
router.use("/message", require("./MessageRouter.js"));
router.use("/budget", require("./BudgetRouter.js"));

module.exports = router;
