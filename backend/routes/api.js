const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => res.status(200).send('Hello World!'))
router.use('/users', require('./user.js'))

module.exports = router;