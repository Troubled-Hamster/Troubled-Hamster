var methodController = require('./methodController.js');

//SUB-ROUTER FOR /api/method
module.exports = function (methodRouter) {
  // app is injected from middlware.js

  methodRouter.get('/:library/:method', methodController.getMethod);

};
