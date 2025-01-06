const path = require("path");
const express = require("express");
const serverConfig = require("./src/config/serverConfig");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const indexRouter = require("./src/routes/index.routes");

const app = express();
serverConfig(app);

const PORT = process.env.PORT || 2990;

app.use("/api", indexRouter);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
