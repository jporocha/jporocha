let passport = require('../config/passport')
const express = require('express')
const router = express.Router()

router.get('/facebook', 
  passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/#/', failureRedirect: '/#/login' }))

module.exports = router