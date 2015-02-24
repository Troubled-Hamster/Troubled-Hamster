var annotationHTMLGenerator = require('./annotationHTMLGenerator.js');

module.exports = {

  getAnnotation: function(req, res, next) {
    var libraryName = req.params.library;
    var methodName = req.params.method;
    console.log(libraryName + "/" + methodName);
    Method.findOne({name: methodName, library: libraryName})
    .exec().then(function(method) {
      if(!method) {
        annotationHTMLGenerator.generateHTML(req, res, 'HTML not found!');
      } else {
        annotationHTMLGenerator.generateHTML(req, res, method.documentationHTML);
      }
      res.end();
    }, function(err) {
      console.log("ERROR:");
      console.dir(err);
      res.end('error');
    });
  }
};
