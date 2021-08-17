const result = require("dotenv").config({ path: "./backend/config/.env" });
if (result.error) console.log("Production mode (No env vars from .env file)");

const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");

const server = express();

server.use("/", express.static("./frontend/dist"));

const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");

server.use(cookieParser());
server.use(bodyParser.json());
server.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 86400000 },
  })
);
server.use(
  cors({
    origin: `${process.env.CORS}`,
    credentials: true,
  })
);

server.use(passport.initialize());
server.use(passport.session());
server.use(helmet());
server.use(compression());
server.use(express.json());

server.use("/api", require("../routes/api.js"));

module.exports = server;
