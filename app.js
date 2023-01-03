const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config({ path: '../../.env' });
const router = require('./routes');
const path = require("path");
const bodyParser = require("express");

// requestMiddleWare, 요청 URL과 요청한 시간을 console.log에 띄워준다.
const requestMiddleware = (req, res, next) => {
  console.log('Request URL:', req.originalUrl, ' - ', new Date());
  next();
};


app.use(express.json());
app.use(requestMiddleware);
app.use(bodyParser.urlencoded({extend : false}));

app.set('view engine', 'ejs'); //view engine이 사용할 Template Engine
app.set('views', 'views');



app.use('/', router);


app.listen(port, () => {
  console.log(
    `
▬▬▬.◙.▬▬▬
═▂▄▄▓▄▄▂
◢◤ █▀▀████▄▄▄▄◢◤
█▄ █ █▄ ███▀▀▀▀▀▀▀╬
◥█████◤ Server is already
══╩══╩═ running on port ${port}
╬═╬
╬═╬ ＼○ノ 세탁하러~ 드가자!!!
╬═╬ /
╬═╬ ノ)
╬═╬
╬═╬
╬═╬
http://localhost:${port}/`,
  );
});

module.exports = app;
