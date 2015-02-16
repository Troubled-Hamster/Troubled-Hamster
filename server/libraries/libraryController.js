var Library = require('./libraryModel.js');
var fs = require('fs');

module.exports = {

  import: function () {
    fs.readdir('server/libraries/supportedLibraries', function(err, files){
      if (err) {
        console.log(err);
      } else {
        files.forEach(function(file){
          fs.readFile('server/libraries/supportedLibraries/' + file, function(err, data){
            if (err) {
              console.log(err);
            } else {
              data = JSON.parse(data);
              Library.create({name: data.name, methods: data.methods}).then(function(err, lib){
                if (err) {
                  console.log(err);
                } else {
                  console.log(lib);
                }
              });
            }
          })
        })
      }
    })
  }

}

module.exports.import();