var Method = require('./methodModel.js');

module.exports = {

  getMethod: function(req, res, next) {
    var libraryName = req.params.library;
    var methodName = req.params.method;
    // console.log(libraryName + "/" + methodName);
    Method.findOne({name: methodName, library: libraryName})
    .exec().then(function(method) {
      if(!method) {
        res.send("Sorry, I couldn't find any relevant questions.");
      }
      res.send(method.topQuestions);
    }, function(err) {
      console.log("ERROR:");
      console.dir(err);
    });
     
  },

  addMethod: function(req, res, next) {
    
  },

  storeQuestions: function(){

  }
};
