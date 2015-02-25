var AppDispatcher = require('../dispatcher/appDispatcher');

var ServerActions = {

  dispatchNewLibrary: function(libraryHTML){
    AppDispatcher.dispatch({
      actionType: LIBRARY_RETRIEVED,
      html: libraryHTML
    });
  },

  dispatchNewStackInfo: function(stackInfo){
    AppDispatcher.dispatch({
      actionType: STACK_INFO_RETRIEVED,
      data: stackInfo
    });
  },

  dispatchNewExamples: function(examples){
    AppDispatcher.dispatch({
      actionType: EXAMPLES_RETRIEVED,
      data: examples
    });
  }
};

module.exports = ServerActions;