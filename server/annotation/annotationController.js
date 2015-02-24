var annotationHTMLGenerator = require('./annotationHTMLGenerator.js');

module.exports = {

  getAnnotation: function(req, res, next) {
    var libraryName = req.params.library;
    var methodName = req.params.method;
    console.log(libraryName + "/" + methodName);
    // Method.findOne({name: methodName, library: libraryName})
    // .exec().then(function(method) {
    //   if(!method) {
    //     stackHTMLGenerator.generateHTML(req, res, []);
    //   } else {
    //     console.log("Method top questions: " + method.topQuestions[0]);
    //
    //     stackHTMLGenerator.generateHTML(req, res, method.topQuestions);
    //   }
    //   res.end();
    // }, function(err) {
    //   console.log("ERROR:");
    //   console.dir(err);
    // });
    annotationHTMLGenerator.generateHTML(req, res, '');
    res.end();
  }
};
