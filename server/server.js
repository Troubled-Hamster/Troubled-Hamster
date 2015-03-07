var express = require('express');
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;
var user = process.env.mongo_lab_user //|| 'flockdocs';
var password = process.env.mongo_lab_password //|| 'hamster23thesis';

var app = express();

if(user) { //assume prod if mongo_lab_user is set
  mongoose.connect('mongodb://'+user+':'+password+'@ds045531.mongolab.com:45531/flockdocs'); 
  console.log('connected remotely');
  // connect to mongo database named flockdocs
} else {
  mongoose.connect('mongodb://localhost/flockdocs');
  console.log('connected locally');
}


// configure our server with all the middleware and and routing
require('./middleware.js')(app, express);

app.listen(port);
console.log('Server listening on ' + port);

// export our app for testing and flexibility
module.exports = app;
