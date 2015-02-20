var morgan      = require('morgan'), // used for logging incoming request
    bodyParser  = require('body-parser'),
    helpers     = require('./helpers.js'), // our custom middleware
    path = require('path'),
    jwt = require('jwt-simple');


module.exports = function (app, express) {

  var methodRouter = express.Router();
  var flockDocsRouter = express.Router();
  var annotationRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../client'));

  app.use('/api/methods', methodRouter); // use method router for all method requests
  app.use('/flockdocs', flockDocsRouter);
  app.use('/annotation', annotationRouter);

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  // inject our routers into their respective route files
  require('./methods/methodRoutes.js')(methodRouter);
  require('./flockDocs/flockDocsRoutes.js')(flockDocsRouter);
  require('./annotation/annotationRoutes.js')(annotationRouter);



  app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../client/underscore.html'));
  });

  app.get('/api/token', function(req, res) {
    var consumerKey = process.env.CONSUMER_KEY;
    var secret = process.env.CONSUMER_SECRET;
    var ttl = 86400;
    var date = new Date();
    var token = jwt.encode({
      'consumerKey': consumerKey,
      'userId': 'flockdocs23',
      'issuedAt': date.toISOString(),
      'ttl': ttl
    }, secret);
    res.send(token);
  });

};
