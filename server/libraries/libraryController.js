var Library = require('./libraryModel.js');
var fs = require('fs');
var path = require('path');

module.exports = {

  import: function () {
    fs.readdir('server/libraries/supportedLibraries', function(err, files){
      if (err) {
        console.log(err);
      } else {
        files.forEach(function(file){
	        if(path.extname(file) === '.json') {
            fs.readFile('server/libraries/supportedLibraries/' + file, function(err, data){
              if (err) {
                console.log(err);
              } else {
                data = JSON.parse(data);

                Library.remove({}).exec().then(function(numRemoved) {
                  console.log('Libraries collection cleared. ' + numRemoved + ' documents removed.');
                  Library.create({name: data.name, methods: data.methods}).then(function(lib, err){
                    if (err) {
                      console.log('error!');
                    } else {
                      console.log('Libraries saved!');
                    }
                  });
                });
              }
            })
          }
        })
      }
    })
  }

}

module.exports.import();
