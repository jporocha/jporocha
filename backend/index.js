const server = require("./config/server.js");
const mongoose = require("./db/mongoose.js");

/* const fs = require("fs");
const https = require("https");
const privateKey = fs.readFileSync("./key.pem");
const certificate = fs.readFileSync("./cert.pem");

const credentials = {
  key: privateKey,
  cert: certificate,
}; */

const port = process.env.PORT || 80;

// let httpsServer = https.createServer(credentials, server);

server.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
