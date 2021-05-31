const server = require('./config/server.js')
const mongoose = require('./db/mongoose.js')

const port = process.env.PORT || 3000

server.listen(port, () => console.log(`Server is up on port: ${port}`))