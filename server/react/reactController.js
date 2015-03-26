var Method = require('../methods/methodModel.js');
var stackETL = require('../stackETLHelpers.js');

module.exports = {

  getMethod: function(req, res, next) {
    var libraryName = req.params.library;
    var methodName = req.params.method;
    console.log(libraryName + "/" + methodName);
    Method.findOne({name: methodName, library: libraryName})
    .exec().then(function(method) {
      console.log(method);
      if(method === null){
        stackETL.getStackOverflowData(libraryName, methodName, 'none', function(stackQA){
          res.send(stackQA);
        });
      } else {
        res.send(method);
      }
    }, function(err) {
      console.log("ERROR:");
      console.dir(err);
    });
  }, 

  getScrollMethod: function(req, res, next) {
    var libraryName = req.params.library;
    var methodName = req.params.method;
    console.log(libraryName + "/" + methodName);
    Method.findOne({scrollKey: methodName, library: libraryName})
    .exec().then(function(method) {
      console.log(method);
      res.send(method);
    }, function(err) {
      console.log("ERROR:");
      console.dir(err);
    });
  }

};