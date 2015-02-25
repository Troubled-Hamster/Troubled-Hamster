var ServerActions = require('../actions/serverActions');
var request = require('superagent');

var utils = {

  getLibraryHTML: function(libraryName){
    request
      .get('http://localhost:3000/' + libraryName)
      .end(function(err, res){
        ServerActions.dispatchNewLibrary(res);
      });
  },

  getStackInfo: function(libraryName, methodName){
    request
      .get('http://localhost:3000/api/method/' + libraryName + '/' + methodName)
      .end(function(err, res){
        ServerActions.dispatchNewStackInfo(res);
      });
  },

  getExamples: function(methodName){
    request
      .get('http://localhost:3000/flockdocs' + libraryName + '/' + methodName)
      .end(function(err, res){
        ServerActions.dispatchNewExamples(res);
      });
  }

};

module.exports = utils;