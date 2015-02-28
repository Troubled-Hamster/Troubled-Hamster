var reactController = require('./reactController.js');

//SUB-ROUTER FOR /api/method
module.exports = function (reactRouter) {
  // app is injected from middlware.js

  reactRouter.get('/:library/:method', reactController.getMethod);

};
