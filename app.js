const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config({ path: '../../.env' });
const router = require('./routes');
const cookieParser = require('cookie-parser');

// requestMiddleWare, 요청 URL과 요청한 시간을 console.log에 띄워준다.
const requestMiddleware = (req, res, next) => {
  console.log('Request URL:', req.originalUrl, ' - ', new Date());
  next();
};
app.set('view engine', 'ejs'); //view engine이 사용할 Template Engine
// app.set('views', path.join(__dirname, 'views')); // Template가 있는 디렉토리

app.use(express.json());
app.use(requestMiddleware);
app.use('/', router);
app.use(cookieParser());

app.engine('html', require('ejs').renderFile);

app.get('/list', function (req, res) {
  res.render('sample.ejs');
});

app.listen(port, () => {
  console.log(
    `%c ________________________________________
 Server is already running on port ${port}
 ----------------------------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`,
    'font-family:monospace',
  );
});

module.exports = app;
