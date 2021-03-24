const express = require('express')
const app = express()

const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')

app.use(cors())
app.use(helmet())
app.use(compression())
app.use(express.json())

app.use('/', express.static('./frontend/dist'))
app.use('/api', require('./routes/api.js'));

module.exports = app