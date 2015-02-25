var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _selection = {};

var changeLibrary = function(libraryName) {
  _selection['library'] = libraryName;
  _selection['method'] = '';
}

var changeMethod = function(methodName) {
  _selection['method'] = methodName;
}

var AppStore = assign({}, EventEmitter.prototype, {

  getSelection: function(){
    _selection['libraries'] = ['underscore', 'backbone', 'node'];
    return _selection;
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
    case SELECTED_LIBRARY:
      text = action.text.trim();
      if(text !== '') {
        changeLibrary(text);
      }
      break;

    case SELECTED_METHOD:
      text = action.text.trim();
      if(text !== ''){
        changeMethod(text);
      }
      break;
  }
});

module.exports = AppStore;