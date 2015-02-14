var express = require('express');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/flockdocs'); // connect to mongo database named flockdocs

// configure our server with all the middleware and and routing
require('./middleware.js')(app, express);

app.listen(8000);

// export our app for testing and flexibility
module.exports = app;

