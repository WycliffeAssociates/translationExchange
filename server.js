const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const http = require('http');
const https = require('https');
const sslOptions = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  passphrase: 'translationexchange'
};


app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

http.createServer(app).listen(process.env.PORT || 8080); // app.listen( process.env.PORT || 8080);

https.createServer(sslOptions, app).listen(8443);
