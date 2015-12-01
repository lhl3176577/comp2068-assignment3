/*
file name: Web_assignment3
Author Name: HongliangLiu(200255269)
website Name:https://hongliangliuassignment3.herokuapp.com.
file information please read readme file.
*/
// Registering npm modules
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


// add mongoose 
var mongoose = require('mongoose');

//additions for authentication
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');

//Router setup
var routes = require('./server/routes/index');
var users = require('./server/routes/users');
var businesses = require('./server/routes/businesses');



//Tolist
var todos = require('./server/routes/todos');
//todolist



var app = express();

//DB setting
// connect to mongodb with mongoose
//mongoose.connect('mongodb://localhost/userDB');
mongoose.connect('mongodb://mike:3176577@ds052408.mongolab.com:52408/businesscontact');
// check connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error: '));
db.once('open', function(callback) {
  console.log('Connected to mongodb');
});


// passport configuration
require('./server/config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, './server/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session setup
app.use(session({
  secret: 'someSecret',
  saveUninitialized: true,
  resave: true
})
);

// more authentication configuration  . Part of passport configuration
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());



app.use('/', routes);
app.use('/users', users);
app.use('/businesses',businesses);
//todoList
app.use('/todos', todos);
//todoList

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
