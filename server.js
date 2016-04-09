const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const knex = require('./db/knex');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('short'));

app.disable('x-powered-by');
app.set('port', process.env.PORT || 5000);
// app.set('view engine', 'ejs');
app.set('view engine', 'jade');
app.use('/static', express.static(__dirname + '/static'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

const books = require('./routes/books');
const authors = require('./routes/authors');

app.get('/', (req, res) => {
  res.render('pages/index');
});

app.use('/books', books);
app.use('/authors', authors);

app.listen(app.get('port'), () => {
  console.log('Listening on ', app.get('port'));
});
