const result = require('dotenv').config({ path: './backend/config/.env' })
const express = require('express')
if (result.error) console.log('Production mode (No env vars from .env file)')

const server = express()

const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')

server.use(cors())
server.use(helmet())
server.use(compression())
server.use(express.json())

server.use('/', express.static('./frontend/dist'))
server.use('/api', require('../routes/api.js'));

module.exports = server