var Method = require('../methods/methodModel.js');
var commentHTMLGenerator = require('./commentHTMLGenerator.js');

module.exports = {
  getComments: function(req, res, next) {
    var libraryName = req.params.library;
    var methodName = req.params.method;
    Method.findOne({name: methodName, library: libraryName})
    .exec().then(function(method) {
      if(!method) {
        commentHTMLGenerator.generateHTML(req, res, []);
      } else {
        commentHTMLGenerator.generateHTML(req, res, method.docHelp);
      }
      res.end();
    });
  },

  postComments: function(req, res, next) {
    var libraryName = req.params.library;
    var methodName = req.params.method;
    var answer = req.body.answer;
    Method.findOne({name: methodName, library: libraryName})
    .exec().then(function(method) {
      if (!method) {
        res.send("Sorry, this method doesn't exist!");
      }
      method.docHelp.push(answer);
      method.save(function(err, method) {
        if (err) {
          console.log('error!')
        } else {
          console.log('method answer successfully saved!')
        }
        res.send('posted');
      });
    });
  }
};
