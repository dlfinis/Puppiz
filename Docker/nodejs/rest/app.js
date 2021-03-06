var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', routes);
app.use('/users', users);
//app.use(express.bodyParser({uploadDir:'/images'}));

//Database connection
var mongoose = require('mongoose');
var address = process.env.MONGODB_PORT_27017_TCP_ADDR;
var port_mongo = process.env.MONGODB_PORT_27017_TCP_PORT;


mongoose.connect('mongodb://' + address + ':'+ port_mongo + '/puppiz', function(err, res) {
	
	
        
	if(err) {
		console.log('ERROR: connecting to Database. ' + err);
	} else {
		console.log('Connected to Database');
		}
		
		
});


var model_users = require('./models/user.js')(app,mongoose);
var model_pets = require('./models/pet.js')(app,mongoose);
var model_searchs = require('./models/search.js')(app,mongoose);
var model_finds = require('./models/find.js')(app,mongoose);
	
var routes_user = require('./routes/user_routes');	
var routes_pet = require('./routes/pet_routes');	
var routes_search = require('./routes/search_routes');	
var routes_find = require('./routes/find_routes');	


app.use('/api', routes_user);

app.use('/api', routes_pet);


app.use('/api', routes_search);


app.use('/api', routes_find);

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
