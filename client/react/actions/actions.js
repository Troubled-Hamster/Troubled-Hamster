var AppDispatcher = require('../dispatcher/AppDispatcher');
var Utils = require('../utils/utils');

var Actions = {

  selectLibrary: function(libraryName) {
    AppDispatcher.dispatch({
      actionType: SELECTED_LIBRARY,
      text: libraryName
    });
    Utils.getLibraryHTML(libraryName);
  },

  selectMethod: function(libraryName, methodName) {
    AppDispatcher.dispatch({
      actionType: SELECTED_METHOD,
      text: methodName
    });

    Utils.getStackInfo(libraryName, methodName);
    Utils.getExamples(libraryName, methodName);
  }
}