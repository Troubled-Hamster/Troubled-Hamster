var annotationController = require('./annotationController.js');

//SUB-ROUTER FOR /api/method
module.exports = function (annotationRouter) {
  // app is injected from middlware.js

  annotationRouter.get('/:library/:method', annotationController.getAnnotation);

};
