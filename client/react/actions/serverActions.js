var AppDispatcher = require('../dispatcher/appDispatcher');
var Constants = require('../constants/constants');

var ServerActions = {

  dispatchNewLibrary: function(libraryHTML){
    AppDispatcher.handleViewAction({
      actionType: Constants.LIBRARY_RETRIEVED,
      html: libraryHTML
    });
  },

  dispatchNewStackInfo: function(stackInfo){
    AppDispatcher.handleViewAction({
      actionType: Constants.STACK_DATA_RETRIEVED,
      data: stackInfo
    });
  },

  dispatchNewExamples: function(examples){
    AppDispatcher.handleViewAction({
      actionType: Constants.EXAMPLES_RETRIEVED,
      data: examples
    });
  }
};

module.exports = ServerActions;