const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const knex = require('./db/knex');
const connect = require('connect');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');

var books = require('./routes/books');
var authors = require('./routes/authors');
var users = require('./routes/users');
var auth = require('./routes/auth');

var validate = require('./lib/validations')

var app = express();
require('dotenv').load();

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('short'));

app.disable('x-powered-by');
app.set('port', process.env.PORT || 5000);
app.set('view engine', 'jade');
app.use('/static', express.static(__dirname + '/static'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use(cookieParser());
app.use(session({
  name: 'session',
  keys: [process.env.SESSION_KEY]
}));

// function validate.isLoggedIn (req, res, next) {
//   console.log(req.session);
//   if (!req.session.userId) {
//     res.user = false;
//     next();
//   }
//   else {
//     res.user = true;
//     next()
//   }
// }

app.get('/', validate.isLoggedIn, (req, res) => {
  const user = res.user;
  console.log(user);
  res.render('pages/index', { user: user });
});

app.use(books);
app.use(authors);
app.use(users);
app.use(auth);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(app.get('port'), () => {
  console.log('Listening on ', app.get('port'));
});

module.exports = app;
