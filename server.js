require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => app.emit('ready'))
  .catch(e => console.log(e));

const session = require('express-session');
const MongoStore = require('connect-mongo');

const flash = require('connect-flash');

const routes = require('./routes');
const path = require('path');

const csrf = require('csurf');

const { checkCSURFerror, csurfMiddleware } = require('./src/middlewares/loginMiddlewares');

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
  secret: process.env.SECRET,
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 7 * 24 * 60 * 60,
    httpOnly: true
  }
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());

app.use(checkCSURFerror);
app.use(csurfMiddleware);
app.use(routes);

const port = 3333;
app.on('ready', () => app.listen(port, () => {
  console.log(`http://localhost:${port}`);
}))