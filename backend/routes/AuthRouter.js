let passport = require('../config/passport')
const express = require('express')
const router = express.Router()

router.get('/facebook', 
  passport.authenticate('facebook', { scope: ['email']}));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: 'http://localhost:8080/login' }), (req, res) => {
    res.redirect('http://localhost:8080/about')
  })

module.exports = router