const path = require('path'); //* Импорт библиотеки path
const https = require('https');
const http = require('http');
const fs = require('fs');
const express = require("express");
const serverConfig = require("./src/config/serverConfig");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const indexRouter = require("./src/routes/index.routes");

const staticFolder = path.join(__dirname, 'src', 'public', 'dist');

const httpApp = express();

const PORT_HTTPS = process.env.PORT_HTTPS ?? 3000;
const PORT_HTTP = process.env.PORT_HTTP ?? 3000;

const app = express();
serverConfig(app);

// const PORT = process.env.PORT || 2990;

app.use("/api", indexRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(staticFolder, 'index.html')); //* отдаем собранное приложение в index.html
});

app.use(
  '/.well-known/acme-challenge',
  express.static(path.join(__dirname, 'src/public/.well-known/acme-challenge'))
);

const sslOptions = {
  key: fs.readFileSync(
    path.join(
      __dirname,
      'src',
      'public',
      '.well-known',
      'acme-challenge',
      'privkey.pem'
    )
  ),
  cert: fs.readFileSync(
    path.join(
      __dirname,
      'src',
      'public',
      '.well-known',
      'acme-challenge',
      'fullchain.pem'
    )
  ),
};

const httpsServer = https.createServer(sslOptions, app);

http.createServer(httpApp).listen(PORT_HTTP, () => {
  console.log('HTTP Server running on port 80 (redirecting to HTTPS)');
});

httpApp.get('*', (req, res) => {
  res.redirect(`https://${req.headers.host}${req.url}`);
});

httpsServer.listen(PORT_HTTPS, () =>
  console.log(`Мы сидим на порте ${PORT_HTTPS}`)
);

// app.listen(PORT, () => {
//   console.log(`http://localhost:${PORT}`);
// });
