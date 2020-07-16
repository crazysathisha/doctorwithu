var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');
const expressValidator = require('express-validator');

const bodyParser = require('body-parser');
const apiRoutes = require('./routes/routes'); //api routes
var app = express();
app.use(cors());
const port = process.env.PORT || 3000;
const server = require('http').createServer(app);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoutes);
/* app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); */

/* app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:4200'
  })
); */
app.use(
  bodyParser.json({
    limit: '50mb'
  })
);
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);


app.use(cookieParser());
app.use(express.json());

app.use(expressValidator());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
/* const clientListener = require('./middlewares/clientListener');
app.use(async (req, res, next) => {
  await clientListener.clientlistener(req, res, next);
}); */
//Set up default mongoose connection
var mongoDB = config.mongo.url;
mongoose.connect(mongoDB, {
  useNewUrlParser: true
});
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(cookieParser());

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

server.on('listening', function () {
  console.log('Server is running');
});
server.listen(port, function () {
  console.log('Server listening at port %d ', port);
});
module.exports = app;