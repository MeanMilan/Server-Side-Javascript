'use strict';

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var bunyan     = require('bunyan');         // load bunyan
var cors       = require('cors');           // enable CORS

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// enable CORS for this app
app.use(cors());

// configure app to use bunyan as logger
var logger = bunyan.createLogger({name: 'ServerSideJs'});

var port = process.env.PORT || 3000;        // set our port

// DB SETUP
// =============================================================================

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/server-side-js'); // connect to our db

// listen to connected event
mongoose.connection.on('connected', function () {
    logger.info('Mongoose connected');
});

// listen to error event
mongoose.connection.on('error', function (err) {
    logger.error('Mongoose connection error: ' + err);
});

// MODELS LOAD
// =============================================================================

var Ninja = require('./models/ninja');

// CONTROLLERS LOAD
// =============================================================================

var ninjaCtrl = require('./controllers/ninja');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all request
var commonMiddleware = function (req, res, next) {
    logger.info('Captured ' + req.method + ' request to ' + req.baseUrl + req.url);
    next(); // make sure to go to the next route
};

// DEFINE error middleware
var errorHandler = function (err, req, res, next) {

    // Here we can define different behavior for different type of errors,
    // for example you can parse mongoose validation errors,
    // or define custom HttpStatus,
    // or ...

    res.status(500).send(err);
};

router.use(commonMiddleware);

// define the route for Ninjas
router.route('/ninja')
    //create a ninja (accessed at POST http://localhost:8080/api/ninja)(remember to set `x-www-form-urlencoded` as format)
    .post(ninjaCtrl.save)
    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(ninjaCtrl.query);

router.route('/ninja/:_id')
    .get(ninjaCtrl.get)
    .post(ninjaCtrl.update)
    .delete(ninjaCtrl.remove);

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function (req, res) {
    res.json({ message: 'Hooray! Welcome to Mean Milan!' });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES 
// =============================================================================
// all of our routes will be prefixed with /api
app.use('/api', router);

// ATTACH the error Middleware
// =============================================================================
app.use(errorHandler);

// START THE SERVER
// =============================================================================
var server = app.listen(port, function(){
    logger.info('Magic happens on port ' + port);
});

// INSTANTIATE SOCKET.IO
// =============================================================================

var io;
exports.io = io = require('socket.io').listen(server);

// LISTEN TO "CONNECTION" EVENT (FROM SOCKET.IO)
// =============================================================================

io.sockets.on('connection', function (socket) {
    socket.emit('connected', {message : 'Welcome to realtime Ninjas'});
});

// LISTEN TO "CREATED" EVENT (FROM MONGOOSE-EVENTFULL)
// =============================================================================

Ninja.on('created', function(ninja) {
    io.emit('created', ninja);
});

// LISTEN TO "REMOVED" EVENT (FROM MONGOOSE-EVENTFULL)
// =============================================================================

Ninja.on('removed', function(ninja) {
    io.emit('deleted', ninja);
});

// LISTEN TO "CHANGED" EVENT (FROM MONGOOSE-EVENTFULL)
// =============================================================================

Ninja.on('changed', function(ninja) {
    io.emit('changed', ninja);
});