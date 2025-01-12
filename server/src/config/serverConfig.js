require('dotenv').config();
const express = require("express");
const path = require('path');
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
  app.use('/static/images',express.static(path.join(__dirname,'..','public')))

};

module.exports = serverConfig;
