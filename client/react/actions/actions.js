var AppDispatcher = require('../dispatcher/appDispatcher');
var Utils = require('../utils/utils');
var Constants = require('../constants/constants')

var Actions = {

  selectLibrary: function(libraryName) {
    AppDispatcher.handleViewAction({
      actionType: Constants.SELECTED_LIBRARY,
      text: libraryName
    });
    Utils.getLibraryHTML(libraryName);
  },

  selectMethod: function(libraryName, methodName) {
    AppDispatcher.handleViewAction({
      actionType: Constants.SELECTED_METHOD,
      text: methodName
    });
    Utils.getStackInfo(libraryName, methodName);
    Utils.getExamples(libraryName, methodName);
  }

}

module.exports = Actions