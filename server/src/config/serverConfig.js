require('dotenv').config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const removeHTTPheader = require("../middleware/removeHTTPheader");

const { CLIENT_URL } = process.env;

const corsConfig = {
  origin: [CLIENT_URL],
  credentials: true,
};
const serverConfig = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(cookieParser());
  app.use(cors(corsConfig));
  app.use(removeHTTPheader);
};

module.exports = serverConfig;
