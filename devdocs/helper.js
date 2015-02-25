var path = require('path');
var fs = require('fs');

// helper method that saves HTML to assets folder
var saveHTML = function(content, lib) {
  var filePath = path.resolve(__dirname + '/../client/react/assets/' + lib + '.html');
  fs.writeFile(filePath, content, function(err) {
    if (err) throw err;
    console.log('html for ' + lib + ' saved!');
  });
}

module.exports = {
  saveHTML: saveHTML
}
