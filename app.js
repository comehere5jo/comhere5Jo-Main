const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config({ path: '../../.env' });
const router = require('./routes');
const page = require('./routes/pageranderouter')

// requestMiddleWare, 요청 URL과 요청한 시간을 console.log에 띄워준다.
const requestMiddleware = (req, res, next) => {
  console.log('Request URL:', req.originalUrl, ' - ', new Date());
  next();
};
app.set('view engine', 'ejs'); //view engine이 사용할 Template Engine
app.set('views', __dirname + '/views'); // Template가 있는 디렉토리
app.use(express.json());
app.use(requestMiddleware);
app.use('/', page);
app.use('/api',router)
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
