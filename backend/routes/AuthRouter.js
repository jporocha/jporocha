let passport = require("../config/passport");
const express = require("express");
const router = express.Router();
const address = process.env.REDIRECT;

// Facebook Login
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
  })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: `${address}/login`,
    failureFlash: true,
  }),
  (req, res) => {
    let rota = req.user.role === "admin" ? "dashboard" : "cliente";
    res.redirect(`${address}/${rota}`);
  }
);

// Google Login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${address}/login`,
    failureFlash: true,
  }),
  (req, res) => {
    let rota = req.user.role === "admin" ? "dashboard" : "cliente";
    res.redirect(`${address}/${rota}`);
  }
);

// Local Login
router.post("/login", function (req, res) {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).send("Dados de login inválidos");
  passport.authenticate("local", function (err, user) {
    if (err) return res.status(400).send(err);
    req.login(user, function (fail) {
      if (fail) return res.status(400).send(fail);
      res.status(200).send(user.role);
    });
  })(req, res);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).send("User has logged out...");
});

//
router.get("/user", (req, res) => {
  if (req.user) {
    res.status(200).send(req.user);
  } else {
    res.status(200).send(null);
  }
});

module.exports = router;
