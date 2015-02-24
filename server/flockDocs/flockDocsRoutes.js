var flockDocsController = require('./flockDocsController.js');

//SUB-ROUTER FOR /api/method
module.exports = function (flockDocsRouter) {
  // app is injected from middlware.js

  flockDocsRouter.get('/:library/:method', flockDocsController.getComments);
  flockDocsRouter.post('/:library/:method', flockDocsController.postComments);
};
