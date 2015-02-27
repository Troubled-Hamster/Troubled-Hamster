var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Constants = require('../constants/constants')


var CHANGE_EVENT = 'change';

var _selection = {
  // "library" : "Underscore.js",
  // "methods" : [ "each", "map", "reduce", "reduceRight", "find", "filter", "where", "findWhere", "reject", "every", "some", "contains", "invoke", "pluck", "max", "min", "sortBy", "groupBy", "indexBy", "countBy", "shuffle", "sample", "toArray", "size", "partition", "first", "initial", "last", "rest", "compact", "flatten", "without", "union", "intersection", "difference", "uniq", "zip", "unzip", "object", "indexOf", "lastIndexOf", "sortedIndex", "findIndex", "findLastIndex", "range", "bind", "bindAll", "partial", "memoize", "delay", "defer", "throttle", "debounce", "once", "after", "before", "wrap", "negate", "compose", "keys", "allKeys", "values", "mapObject", "pairs", "invert", "object-functions", "findKey", "extend", "extendOwn", "pick", "omit", "defaults", "clone", "tap", "has", "property", "propertyOf", "matcher", "isEqual", "isMatch", "isEmpty", "isElement", "isArray", "isObject", "isArguments", "isFunction", "isString", "isNumber", "isFinite", "isBoolean", "isDate", "isRegExp", "isError", "isNaN", "isNull", "isUndefined", "noConflict", "identity", "constant", "noop", "times", "random", "mixin", "iteratee", "uniqueId", "escape", "unescape", "result", "now", "template", "chain", "value" ],
  // "method": "Hello World"
};

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
    _selection.libraryData = [];
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
    case Constants.SELECTED_LIBRARY:
      console.log('store heard: ' + Constants.SELECTED_LIBRARY);
      text = action.text.trim();
      changeLibrary(text);
      AppStore.emitChange();
      break;

    case Constants.SELECTED_METHOD:
      console.log('store heard: ' + Constants.SELECTED_METHOD);
      text = action.text.trim();
      changeMethod(text);
      AppStore.emitChange();
      break;
  }
});

module.exports = AppStore;
