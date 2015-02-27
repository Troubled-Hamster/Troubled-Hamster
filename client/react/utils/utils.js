var ServerActions = require('../actions/serverActions');
var request = require('superagent');

var utils = {

  getLibraryHTML: function(libraryName){
    request
      .get('http://localhost:3000/' + libraryName)
      .end(function(err, res){
        ServerActions.dispatchNewLibrary(res.body);
      });
  },

  getStackInfo: function(libraryName, methodName){
    request
      .get('http://localhost:3000/api/methods/' + libraryName + '/' + methodName)
      .end(function(err, res){
        ServerActions.dispatchNewStackInfo(res.body);
      });
  },

  getExamples: function(libraryName, methodName){
    request
      .get('http://localhost:3000/flockdocs/' + libraryName + '/' + methodName)
      .end(function(err, res){
        ServerActions.dispatchNewExamples(res.body);
      });
  }

};

module.exports = utils;