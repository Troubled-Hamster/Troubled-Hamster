var morgan      = require('morgan'), // used for logging incoming request
    bodyParser  = require('body-parser'),
    helpers     = require('./helpers.js'), // our custom middleware
    path = require('path');


module.exports = function (app, express) {

  var methodRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../client'));

  app.use('/api/methods', methodRouter); // use method router for all method requests

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  // inject our routers into their respective route files
  require('./methods/methodRoutes.js')(methodRouter);

  app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../client/backbone.html'));
  });
};
