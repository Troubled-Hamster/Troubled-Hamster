var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Constants = require('../constants/constants')


var CHANGE_EVENT = 'change';

var _examples = {};

var setExamples = function(exampleData) {
  _examples = JSON.parse(exampleData);
}

var ExampleStore = assign({}, EventEmitter.prototype, {

  getExamples: function(){
    return _examples;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListerner: function(callback){
    this.removeListener(CHANGE_EVENT, callback)
  }

});

AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case Constants.EXAMPLES_RETRIEVED:
      setExamples(action.data);
      ExampleStore.emitChange();
      break;
    }

});

module.exports = ExampleStore;