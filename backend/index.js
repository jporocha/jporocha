const result = require('dotenv').config({ path: './.env' })
if (result.error) console.log('Production mode (No env vars from .env file)')

const mongoose = require('./db/mongoose.js')
const app = require('./app.js')

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server is up on port: ${port}`))