var Library = require('./library');

module.exports = {
  findMethod: function(req, res, next, lib, methodName){
    Library.findOne({name: lib, methods.name: methodName}).
  },

  addMethod: function(req, res, next, lib, methodName){

  },

  storeQuestions: function(){

  }
}