const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
    console.log(req.user)
    res.status(200).send('Hello World!')
})
router.use('/users', require('./UserRouter.js'))
router.use('/auth', require('./AuthRouter.js'))

module.exports = router;